package com.backend.server.exceptionHandler;

public class InvalidDataException extends RuntimeException{

    public InvalidDataException (String mensaje){
        super(mensaje);
    }

}
