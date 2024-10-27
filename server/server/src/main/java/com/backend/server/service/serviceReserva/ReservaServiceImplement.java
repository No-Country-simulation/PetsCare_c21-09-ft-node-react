package com.backend.server.service.serviceReserva;

import com.backend.server.DTO.ReservaDTO;
import com.backend.server.DTO.ResponseDTOReserva;
import com.backend.server.DTO.ServicioMapper.MapVerReservasDTO;
import com.backend.server.DTO.VerReservasDTO;
import com.backend.server.entity.Mascota;
import com.backend.server.entity.Reserva;
import com.backend.server.entity.Servicio;
import com.backend.server.entity.Turno;
import com.backend.server.exceptionHandler.DatabaseException;
import com.backend.server.exceptionHandler.InvalidDataException;
import com.backend.server.exceptionHandler.NotFoundException;
import com.backend.server.repository.MascotaRepository;
import com.backend.server.repository.ReservaRepository;
import com.backend.server.repository.TurnoRepository;
import com.backend.server.security.entity.Usuario;
import com.backend.server.security.repository.UsuarioRepository;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ReservaServiceImplement implements ReservaServiceInterface{

    private static final Logger log = LoggerFactory.getLogger(ReservaServiceImplement.class);


    @Autowired
    private ReservaRepository reservaRepository;


    @Autowired
    private MapVerReservasDTO mapVerReservasDTO;

    @Autowired
    private TurnoRepository turnoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private MascotaRepository mascotaRepository;

    @Override
    public List<Reserva> getAllReservas() {
        try {
            return reservaRepository.findAll();
        } catch (Exception e) {
            throw new DatabaseException("Error al obtener todas las reservas", e);
        }
    }

    @Override
    public Optional<Reserva> getReservaById(Long idReserva) {
        try {
            Optional<Reserva> reserva = reservaRepository.findById(idReserva);
            if (reserva.isEmpty()) {
                throw new NotFoundException("Reserva con ID " + idReserva + " no encontrada.");
            }
            return reserva;
        } catch (NotFoundException e) {
            throw e;
        } catch (Exception e) {
            throw new DatabaseException("Error al buscar la reserva por ID " + idReserva, e);
        }
    }

    @Override
    @Transactional
    public Reserva createReserva(Reserva reserva) {
        try {
            if (reserva == null || reserva.getUsuarioQueReserva() == null || reserva.getTurnos() == null || reserva.getTurnos().isEmpty()) {
                log.warn("Datos inválidos para crear la reserva. Reserva o sus datos son nulos.");
                throw new InvalidDataException("Datos inválidos para crear la reserva.");
            }

            // Logs de validación inicial
            log.info("Creando reserva para usuario con ID: {}", reserva.getUsuarioQueReserva().getIdUsuario());
            log.info("Validando turnos seleccionados para la reserva.");

            // Validar y marcar cada turno como reservado
            List<Turno> turnosReservados = new ArrayList<>();
            for (Turno turno : reserva.getTurnos()) {
                Optional<Turno> turnoExistente = turnoRepository.findById(turno.getIdTurno());
                if (turnoExistente.isPresent()) {
                    Turno turnoActual = turnoExistente.get();
                    log.info("Turno ID: {}, reservadoTurno: {}", turnoActual.getIdTurno(), turnoActual.isReservadoTurno());

                    // Verificar si el turno ya está reservado
                    if (turnoActual.isReservadoTurno()) {
                        log.warn("El turno {} ya está reservado.", turnoActual.getHoraTurno());
                        throw new InvalidDataException("El turno " + turnoActual.getHoraTurno() + " ya está reservado.");
                    }

                    // Marcar el turno como reservado y añadirlo a la lista
                    turnoActual.setReservadoTurno(true);
                    turnosReservados.add(turnoActual);
                    log.info("Turno ID {} marcado como reservado.", turnoActual.getIdTurno());
                } else {
                    throw new NotFoundException("Turno no encontrado con ID: " + turno.getIdTurno());
                }
            }

            // Guardar la reserva
            Reserva nuevaReserva = reservaRepository.save(reserva);
            log.info("Reserva creada exitosamente con ID: {}", nuevaReserva.getIdReserva());

            // Guardar los turnos actualizados en bloque para asegurar la consistencia
            turnoRepository.saveAll(turnosReservados);

            // Confirmar que los turnos están guardados correctamente en la base de datos
            for (Turno turno : turnosReservados) {
                Turno turnoActualizado = turnoRepository.findById(turno.getIdTurno())
                        .orElseThrow(() -> new NotFoundException("Turno no encontrado tras actualización"));
                log.info("Estado en BD - Turno ID: {}, reservadoTurno: {}", turnoActualizado.getIdTurno(), turnoActualizado.isReservadoTurno());
            }

            return nuevaReserva;

        } catch (InvalidDataException e) {
            log.error("Error al crear la reserva: Datos inválidos. {}", e.getMessage());
            throw e;
        } catch (Exception e) {
            log.error("Error al crear la reserva. Mensaje: {}", e.getMessage());
            throw new DatabaseException("Error al crear la reserva.", e);
        }
    }




    @Override
    public void deleteReserva(Long idReserva) {
        try {
            Optional<Reserva> reserva = reservaRepository.findById(idReserva);
            if (reserva.isEmpty()) {
                throw new NotFoundException("Reserva con ID " + idReserva + " no encontrada.");
            }
            reservaRepository.deleteById(idReserva);
        } catch (NotFoundException e) {
            throw e;
        } catch (Exception e) {
            throw new DatabaseException("Error al eliminar la reserva con ID " + idReserva, e);
        }
    }

    @Override
    public List<VerReservasDTO> getReservasByUsuario(Usuario usuario) {
        try {
            List<Reserva> lasReservas = reservaRepository.findByUsuarioQueReserva(usuario);
            return lasReservas.stream()
                    .map(mapVerReservasDTO::toVerReservaDTO)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            throw new DatabaseException("Error al obtener las reservas del usuario", e);
        }
    }

    @Override
    public List<VerReservasDTO> getReservasByPrestador(Usuario prestadorServicio) {
        try {
            List<Reserva> lasReservas = reservaRepository.findByPrestadorServicio(prestadorServicio);
            return lasReservas.stream()
                    .map(mapVerReservasDTO::toVerReservaDTO)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            throw new DatabaseException("Error al obtener las reservas del prestador de servicio", e);
        }
    }
    @Override
    public List<Reserva> getReservasByTurno(Turno turno) {
        try {
            return reservaRepository.findByTurnos(turno);
        } catch (Exception e) {
            throw new DatabaseException("Error al obtener las reservas por turno", e);
        }
    }



}
