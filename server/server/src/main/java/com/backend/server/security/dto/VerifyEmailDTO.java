package com.backend.server.security.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class VerifyEmailDTO {

    private String emailAEnviar;

    private String codigoVerificacionIngresado;
}
