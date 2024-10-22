package com.backend.server.service.serviceTurno;

import com.backend.server.entity.Servicio;
import com.backend.server.entity.Turno;
import com.backend.server.exceptionHandler.DatabaseException;
import com.backend.server.exceptionHandler.NotFoundException;
import com.backend.server.repository.TurnoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Service
public class TurnoServiceImplement implements TurnoServiceInterface{

    @Autowired
    private TurnoRepository turnoRepository;

    @Override
    public List<Turno> getAllTurnos() {
        try {
            return turnoRepository.findAll();
        } catch (Exception e) {
            throw new DatabaseException("Error al obtener todos los turnos", e);
        }
    }

    @Override
    public Optional<Turno> getTurnoById(Long idTurno) {
        try {
            Optional<Turno> turno = turnoRepository.findById(idTurno);
            if (turno.isEmpty()) {
                throw new NotFoundException("Turno con ID " + idTurno + " no encontrado.");
            }
            return turno;
        } catch (NotFoundException e) {
            throw e;
        } catch (Exception e) {
            throw new DatabaseException("Error al buscar el turno con ID " + idTurno, e);
        }
    }

    @Override
    public List<Turno> getTurnosByFecha(LocalDate fecha) {
        try {
            return turnoRepository.findByFechaTurno(fecha);
        } catch (Exception e) {
            throw new DatabaseException("Error al obtener los turnos por fecha", e);
        }
    }

    @Override
    public List<Turno> getTurnosByServicio(Servicio servicio) {
        try {
            return turnoRepository.findByServicio(servicio);
        } catch (Exception e) {
            throw new DatabaseException("Error al obtener los turnos por servicio", e);
        }
    }

    @Override
    public List<Turno> getTurnosDisponibles() {
        try {
            return turnoRepository.findByReservadoTurnoFalse();
        } catch (Exception e) {
            throw new DatabaseException("Error al obtener los turnos disponibles", e);
        }
    }

    @Override
    public List<Turno> getTurnosByServicioAndReservadoTurnoFalse(Servicio servicio) {
        try {
            return turnoRepository.findByServicioAndReservadoTurnoFalse(servicio);
        } catch (Exception e) {
            throw new DatabaseException("Error al obtener los turnos disponibles por servicio", e);
        }
    }

    @Override
    public List<Turno> getTurnosByServicioFechaHoraAndReservadoTurnoFalse(
            Servicio servicio,
            LocalDate fechaTurno,
            LocalTime horaTurno
    ) {
        try {
            return turnoRepository.findByServicioAndReservadoTurnoFalseAndFechaTurnoAndHoraTurno(
                    servicio, fechaTurno, horaTurno
            );
        } catch (Exception e) {
            throw new DatabaseException("Error al obtener los turnos por servicio, fecha y hora", e);
        }
    }

    @Override
    public List<Turno> createTurnos(List<Turno> turnos) {
        try {
            for (Turno turno : turnos) {
                turno.setReservadoTurno(false);  // Marcar todos los turnos como no reservados por defecto
            }
            return turnoRepository.saveAll(turnos);  // Guardar todos los turnos en la base de datos
        } catch (Exception e) {
            throw new DatabaseException("Error al crear los turnos.", e);
        }
    }


    @Override
    public void deleteTurno(Long idTurno) {
        try {
            Optional<Turno> turno = turnoRepository.findById(idTurno);
            if (turno.isEmpty()) {
                throw new NotFoundException("Turno con ID " + idTurno + " no encontrado.");
            }
            turnoRepository.deleteById(idTurno);
        } catch (NotFoundException e) {
            throw e;
        } catch (Exception e) {
            throw new DatabaseException("Error al eliminar el turno con ID " + idTurno, e);
        }
    }
}
