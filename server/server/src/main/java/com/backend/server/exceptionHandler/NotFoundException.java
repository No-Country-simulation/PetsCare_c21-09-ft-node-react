package com.backend.server.exceptionHandler;

public class NotFoundException extends RuntimeException{

    public NotFoundException (String mensaje){
        super(mensaje);
    }
}
