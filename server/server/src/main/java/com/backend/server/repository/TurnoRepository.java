package com.backend.server.repository;

import com.backend.server.entity.Servicio;
import com.backend.server.entity.Turno;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Repository
public interface TurnoRepository extends JpaRepository<Turno, Long> {

    List<Turno> findByFechaTurno(LocalDate fechaTurno);

    List<Turno> findByServicio(Servicio servicio);

    List<Turno> findByServicioAndReservadoTurnoFalse(Servicio servicio);

    List<Turno> findByReservadoTurnoFalse();

    List<Turno> findByServicioAndReservadoTurnoFalseAndFechaTurnoAndHoraTurno(
            Servicio servicio,
            LocalDate fechaTurno,
            LocalTime horaTurno
    );
}
