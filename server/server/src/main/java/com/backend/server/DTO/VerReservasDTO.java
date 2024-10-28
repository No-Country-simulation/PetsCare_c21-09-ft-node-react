package com.backend.server.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
@Data
@AllArgsConstructor
public class VerReservasDTO {

    private Long idReserva;
    private LocalDate fechaReserva;

    // Atributos del usuario que realiza la reserva
    private Long usuarioIdReserva;
    private String usuarioNombreReserva;
    private String usuarioApellidoReserva;
    private String usuarioEmailReserva;
    private String usuarioTelefonoReserva;

    // Atributos del prestador del servicio
    private Long prestadorId;
    private String prestadorNombre;
    private String prestadorApellido;
    private String prestadorEmail;
    private String prestadorTelefono;

    // Atributos de la mascota
    private Long mascotaId;
    private String mascotaNombre;
    private String mascotaEspecie;
    private String mascotaRaza;
    private int mascotaEdad;

    // Atributos de los turnos
    private List<Long> turnosId;
    private List<LocalDate> turnosFecha;
    private List<LocalTime> turnosHora;
}
