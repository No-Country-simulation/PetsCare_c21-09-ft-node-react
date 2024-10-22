package com.backend.server.controller;

import com.backend.server.entity.Servicio;
import com.backend.server.entity.Turno;
import com.backend.server.exceptionHandler.NotFoundException;
import com.backend.server.service.serviceTurno.TurnoServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/turnos")
@CrossOrigin(origins = "http://localhost:5173")
public class TurnoController {

    @Autowired
    private TurnoServiceInterface turnoService;

    @GetMapping("/todos")
    public ResponseEntity<List<Turno>> getAllTurnos() {
        try {
            List<Turno> turnos = turnoService.getAllTurnos();
            return ResponseEntity.ok(turnos);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/{idTurno}")
    public ResponseEntity<Turno> getTurnoById(@PathVariable Long idTurno) {
        try {
            Optional<Turno> turno = turnoService.getTurnoById(idTurno);
            return turno.map(ResponseEntity::ok)
                    .orElseThrow(() -> new NotFoundException("Turno con ID " + idTurno + " no encontrado."));
        } catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/fecha/{fechaTurno}")
    public ResponseEntity<List<Turno>> getTurnosByFecha(@PathVariable LocalDate fechaTurno) {
        try {
            List<Turno> turnos = turnoService.getTurnosByFecha(fechaTurno);
            return ResponseEntity.ok(turnos);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/servicio/{idServicio}")
    public ResponseEntity<List<Turno>> getTurnosByServicio(@PathVariable Long idServicio) {
        try {
            Servicio servicio = new Servicio();
            servicio.setIdServicio(idServicio);
            List<Turno> turnos = turnoService.getTurnosByServicio(servicio);
            return ResponseEntity.ok(turnos);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/disponibles")
    public ResponseEntity<List<Turno>> getTurnosDisponibles() {
        try {
            List<Turno> turnosDisponibles = turnoService.getTurnosDisponibles();
            return ResponseEntity.ok(turnosDisponibles);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/disponibles/servicio/{idServicio}")
    public ResponseEntity<List<Turno>> getTurnosDisponiblesPorServicio(@PathVariable Long idServicio) {
        try {
            Servicio servicio = new Servicio();
            servicio.setIdServicio(idServicio);
            List<Turno> turnos = turnoService.getTurnosByServicioAndReservadoTurnoFalse(servicio);
            return ResponseEntity.ok(turnos);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/disponibles/servicio/{idServicio}/fecha/{fechaTurno}/hora/{horaTurno}")
    public ResponseEntity<List<Turno>> getTurnosByServicioFechaHora(
            @PathVariable Long idServicio,
            @PathVariable LocalDate fechaTurno,
            @PathVariable LocalTime horaTurno
    ) {
        try {
            Servicio servicio = new Servicio();
            servicio.setIdServicio(idServicio);
            List<Turno> turnos = turnoService.getTurnosByServicioFechaHoraAndReservadoTurnoFalse(servicio, fechaTurno, horaTurno);
            return ResponseEntity.ok(turnos);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PostMapping("/agregarturnos")
    public ResponseEntity<List<Turno>> createTurnos(@RequestBody List<Turno> turnos) {
        try {
            // Guardar cada turno en la base de datos
            List<Turno> nuevosTurnos = turnoService.createTurnos(turnos);
            return ResponseEntity.status(HttpStatus.CREATED).body(nuevosTurnos);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
    @DeleteMapping("/delete/{idTurno}")
    public ResponseEntity<Void> deleteTurno(@PathVariable Long idTurno) {
        try {
            turnoService.deleteTurno(idTurno);
            return ResponseEntity.noContent().build();
        } catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}

