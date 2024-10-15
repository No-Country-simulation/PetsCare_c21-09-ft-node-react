package com.backend.server.exceptionHandler;

public class DatabaseException extends RuntimeException{

    public DatabaseException (String mensaje, Exception e){
        super(mensaje, e);
    }

}
