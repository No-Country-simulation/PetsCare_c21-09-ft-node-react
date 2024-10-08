package com.backend.server.javaMailSender.util;

import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class CodeVerifyService {

    public String generarCodigoVerificacion() {
        // Generar un número de 4 dígitos aleatorio
        Random random = new Random();
        int numero = 1000 + random.nextInt(9000);
        return String.valueOf(numero);
    }
}
