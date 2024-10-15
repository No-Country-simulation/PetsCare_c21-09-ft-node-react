package com.backend.server.service.serviceReserva;

import com.backend.server.entity.Reserva;
import com.backend.server.entity.Turno;
import com.backend.server.exceptionHandler.DatabaseException;
import com.backend.server.exceptionHandler.InvalidDataException;
import com.backend.server.exceptionHandler.NotFoundException;
import com.backend.server.repository.ReservaRepository;
import com.backend.server.repository.TurnoRepository;
import com.backend.server.security.entity.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReservaServiceImplement implements ReservaServiceInterface{


    @Autowired
    private ReservaRepository reservaRepository;


    @Autowired
    private TurnoRepository turnoRepository;

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
            // Verificar que la reserva exista
            if (reserva == null || reserva.getUsuarioQueReserva() == null || reserva.getTurnos() == null || reserva.getTurnos().isEmpty()) {
                throw new InvalidDataException("Datos inválidos para crear la reserva.");
            }


            for (Turno turno : reserva.getTurnos()) {
                Optional<Turno> turnoExistente = turnoRepository.findById(turno.getIdTurno());
                if (turnoExistente.isPresent() && turnoExistente.get().isReservadoTurno()) {
                    throw new InvalidDataException("El turno " + turnoExistente.get().getHoraTurno() + " ya está reservado.");
                }
            }


            Reserva nuevaReserva = reservaRepository.save(reserva);

            //setear a true el atributo reservadoTurno
            for (Turno turno : reserva.getTurnos()) {
                turno.setReservadoTurno(true);
                turnoRepository.save(turno);
            }

            return nuevaReserva;
        } catch (Exception e) {
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
}
