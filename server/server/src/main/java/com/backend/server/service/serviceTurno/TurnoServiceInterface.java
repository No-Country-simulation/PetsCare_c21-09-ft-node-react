package com.backend.server.service.serviceTurno;

import com.backend.server.entity.Servicio;
import com.backend.server.entity.Turno;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

public interface TurnoServiceInterface {

    List<Turno> getAllTurnos();

    Optional<Turno> getTurnoById(Long idTurno);

    List<Turno> getTurnosByFecha(LocalDate fecha);

    List<Turno> getTurnosByServicio(Servicio servicio);

    List<Turno> getTurnosDisponibles();

    List<Turno> getTurnosByServicioAndReservadoTurnoFalse(Servicio servicio);

    List<Turno> getTurnosByServicioFechaHoraAndReservadoTurnoFalse(
            Servicio servicio,
            LocalDate fechaTurno,
            LocalTime horaTurno
    );

    List<Turno> createTurnos(List<Turno> turnos);

    void deleteTurno(Long idTurno);
}
