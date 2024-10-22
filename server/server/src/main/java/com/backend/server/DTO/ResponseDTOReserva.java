package com.backend.server.DTO;

import lombok.Data;
import java.util.List;

@Data
public class ResponseDTOReserva {

    private Long idReserva;
    private String fechaReserva;


    private String nombreUsuarioQueReserva;
    private String emailUsuarioQueReserva;


    private String nombrePrestadorServicio;
    private String emailPrestadorServicio;
    private String numeroTelefonicoPrestadorServicio;


    private String nombreMascota;
    private String especieMascota;

    private String tipoServicio;


    private List<String> turnosDetalles;
}

