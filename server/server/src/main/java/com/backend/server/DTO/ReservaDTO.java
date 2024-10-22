package com.backend.server.DTO;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;



@Data
public class ReservaDTO {

    private Long idReserva;

    private LocalDate fechaReserva;

    private Long idUsuarioQueReserva;

    private Long idPrestadorServicio;

    private Long idMascota;

    private List<Long> idTurnos;
}

