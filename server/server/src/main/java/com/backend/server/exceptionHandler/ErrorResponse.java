package com.backend.server.exceptionHandler;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class ErrorResponse {

    private LocalDateTime timestamp;
    private String mensajeError;
    private String detalle;
}
