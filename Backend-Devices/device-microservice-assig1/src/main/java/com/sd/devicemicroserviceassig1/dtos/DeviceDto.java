package com.sd.devicemicroserviceassig1.dtos;

import com.sd.devicemicroserviceassig1.entities.UserEntity;
import lombok.Data;

@Data
public class DeviceDto {
    private Long id;
    private String description;
    private String address;
    private String consumption;
    private UserEntity userFk;
}
