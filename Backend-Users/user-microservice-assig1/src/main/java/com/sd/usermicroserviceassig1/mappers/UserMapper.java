package com.sd.usermicroserviceassig1.mappers;

import com.sd.usermicroserviceassig1.dtos.UserDto;
import com.sd.usermicroserviceassig1.entities.UserEntity;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserDto toDto(UserEntity user);
    UserEntity toEntity(UserDto dto);
    List<UserDto> toDtos(List<UserEntity> users);
}
