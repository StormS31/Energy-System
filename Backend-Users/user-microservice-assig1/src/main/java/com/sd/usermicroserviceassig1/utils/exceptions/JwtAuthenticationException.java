package com.sd.usermicroserviceassig1.utils.exceptions;

public class JwtAuthenticationException extends RuntimeException{
    public JwtAuthenticationException(final Exception ex){
        super(ex);
    }
}
