package com.sd.usermicroserviceassig1.dtos;

import lombok.Data;

@Data
public class UserDto {
    private Long id;
    private String username;
    private String role;
    private String firstName;
    private String lastName;
    private String password;

    public UserDto(){}
}
