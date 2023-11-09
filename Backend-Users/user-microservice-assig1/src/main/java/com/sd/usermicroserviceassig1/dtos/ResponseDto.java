package com.sd.usermicroserviceassig1.dtos;

import lombok.Data;

@Data
public class ResponseDto {
    private String succesMessage;
    private String errorMessage;

    public ResponseDto(String succesMessage, String errorMessage) {
        this.succesMessage = succesMessage;
        this.errorMessage = errorMessage;
    }
}
