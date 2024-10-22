package com.backend.server.service.serviceReserva;

import com.backend.server.DTO.ReservaDTO;
import com.backend.server.DTO.ResponseDTOReserva;
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
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ReservaServiceImplement implements ReservaServiceInterface{

    private static final Logger log = LoggerFactory.getLogger(ReservaServiceImplement.class);


    @Autowired
    private ReservaRepository reservaRepository;


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
    public Reserva createReserva(Reserva reserva) {
        try {

            if (reserva == null || reserva.getUsuarioQueReserva() == null || reserva.getTurnos() == null || reserva.getTurnos().isEmpty()) {
                log.warn("Datos inválidos para crear la reserva. Reserva o sus datos son nulos.");
                throw new InvalidDataException("Datos inválidos para crear la reserva.");
            }

            // Logs de validación
            log.info("Creando reserva para usuario con ID: {}", reserva.getUsuarioQueReserva().getIdUsuario());
            log.info("Validando turnos seleccionados para la reserva.");

            for (Turno turno : reserva.getTurnos()) {
                Optional<Turno> turnoExistente = turnoRepository.findById(turno.getIdTurno());
                if (turnoExistente.isPresent()) {
                    log.info("Turno ID: {}, reservadoTurno: {}", turnoExistente.get().getIdTurno(), turnoExistente.get().isReservadoTurno());
                    if (turnoExistente.get().isReservadoTurno()) {
                        log.warn("El turno {} ya está reservado.", turnoExistente.get().getHoraTurno());
                        throw new InvalidDataException("El turno " + turnoExistente.get().getHoraTurno() + " ya está reservado.");
                    }
                }
            }

            // Guardar la reserva
            Reserva nuevaReserva = reservaRepository.save(reserva);
            log.info("Reserva creada exitosamente con ID: ", nuevaReserva.getIdReserva());

            // Actualizar los turnos como reservados
            for (Turno turno : reserva.getTurnos()) {
                turno.setReservadoTurno(true);
                turnoRepository.save(turno);
                log.info("Turno {} marcado como reservado.", turno.getHoraTurno());
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
    public List<Reserva> getReservasByUsuario(Usuario usuario) {
        try {
            return reservaRepository.findByUsuarioQueReserva(usuario);
        } catch (Exception e) {
            throw new DatabaseException("Error al obtener las reservas del usuario", e);
        }
    }

    @Override
    public List<Reserva> getReservasByPrestador(Usuario prestadorServicio) {
        try {
            return reservaRepository.findByPrestadorServicio(prestadorServicio);
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

//Metodo para mapear el DTO de la reserva que manda al usuario a las entidades correspondientes de la base de datos
public Reserva convertToEntity(ReservaDTO reservaDTO) {
    Reserva reserva = new Reserva();


    reserva.setFechaReserva(reservaDTO.getFechaReserva());


    Usuario usuario = usuarioRepository.findById(reservaDTO.getIdUsuarioQueReserva())
            .orElseThrow(() -> new NotFoundException("Usuario no encontrado con ID: " + reservaDTO.getIdUsuarioQueReserva()));
    reserva.setUsuarioQueReserva(usuario);

    Usuario prestador = usuarioRepository.findById(reservaDTO.getIdPrestadorServicio())
            .orElseThrow(() -> new NotFoundException("Prestador de servicio no encontrado con ID: " + reservaDTO.getIdPrestadorServicio()));
    reserva.setPrestadorServicio(prestador);

    if (reservaDTO.getIdMascota() != null) {
        Mascota mascota = mascotaRepository.findById(reservaDTO.getIdMascota())
                .orElseThrow(() -> new NotFoundException("Mascota no encontrada con ID: " + reservaDTO.getIdMascota()));
        reserva.setMascotaReserva(mascota);
    }

    List<Turno> turnos = reservaDTO.getIdTurnos().stream()
            .map(id -> turnoRepository.findById(id)
                    .orElseThrow(() -> new NotFoundException("Turno no encontrado con ID: " + id)))
            .collect(Collectors.toList());

    reserva.setTurnos(turnos);

    return reserva;
}


//    Metodo para usar luego que se realiza la reserva, que convierta esos datos en
//    una respuesta para ser enviada a ambos usuarios

    public ResponseDTOReserva convertToResponseDTOReserva(Reserva reserva) {

        ResponseDTOReserva responseDTO = new ResponseDTOReserva();
        responseDTO.setIdReserva(reserva.getIdReserva());


        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        String fechaReserva = reserva.getFechaReserva().format(formatter);
        responseDTO.setFechaReserva(fechaReserva);

        // usuario que realiza la reserva
        responseDTO.setNombreUsuarioQueReserva(reserva.getUsuarioQueReserva().getName() + " " + reserva.getUsuarioQueReserva().getLastName());
        responseDTO.setEmailUsuarioQueReserva(reserva.getUsuarioQueReserva().getEmail());

        //  prestador de servicio
        responseDTO.setNombrePrestadorServicio(reserva.getPrestadorServicio().getName() + " " + reserva.getPrestadorServicio().getLastName());
        responseDTO.setEmailPrestadorServicio(reserva.getPrestadorServicio().getEmail());
        responseDTO.setNumeroTelefonicoPrestadorServicio(reserva.getPrestadorServicio().getPhone());

        // Datos del servicio
        Servicio servicio = reserva.getServicio();
        if (servicio != null) {
            responseDTO.setTipoServicio(servicio.getNombreServicio());
        }

        // mascota
        if (reserva.getMascotaReserva() != null) {
            responseDTO.setNombreMascota(reserva.getMascotaReserva().getName());
            responseDTO.setEspecieMascota(reserva.getMascotaReserva().getSpecies());
        }

        // turnos
        List<String> turnosDetalles = reserva.getTurnos().stream()
                .map(turno -> "Fecha: " + turno.getFechaTurno() + " Hora: " + turno.getHoraTurno())
                .collect(Collectors.toList());
        responseDTO.setTurnosDetalles(turnosDetalles);

        return responseDTO;
    }


}
