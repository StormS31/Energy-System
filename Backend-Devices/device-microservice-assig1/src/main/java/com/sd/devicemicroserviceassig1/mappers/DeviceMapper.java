package com.sd.devicemicroserviceassig1.mappers;

import com.sd.devicemicroserviceassig1.dtos.DeviceDto;
import com.sd.devicemicroserviceassig1.entities.DeviceEntity;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface DeviceMapper {
    DeviceDto toDto(DeviceEntity device);
    DeviceEntity toEntity(DeviceDto dto);
    List<DeviceDto> toDtos(List<DeviceEntity> devices);
}
