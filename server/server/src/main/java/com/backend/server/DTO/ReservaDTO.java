package com.backend.server.DTO;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;

@Data
public class ReservaDTO {

    @NotNull
    private Long idUsuarioQueReserva;

    @NotNull
    private List<Long> idTurnos;

    @NotNull
    private Long idPrestadorServicio;

    private String fechaReserva;
}
