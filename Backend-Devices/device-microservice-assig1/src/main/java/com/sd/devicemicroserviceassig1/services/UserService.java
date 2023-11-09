package com.sd.devicemicroserviceassig1.services;

import com.sd.devicemicroserviceassig1.dtos.ResponseDto;
import com.sd.devicemicroserviceassig1.entities.DeviceEntity;
import com.sd.devicemicroserviceassig1.entities.UserEntity;
import com.sd.devicemicroserviceassig1.repositories.DeviceRepository;
import com.sd.devicemicroserviceassig1.repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final DeviceRepository deviceRepository;

    public UserService(UserRepository userRepository, DeviceRepository deviceRepository) {
        this.userRepository = userRepository;
        this.deviceRepository = deviceRepository;
    }

    public ResponseDto addUser(Long id){
        ResponseDto responseDto = new ResponseDto();
        try{
            UserEntity toSave = new UserEntity();
            toSave.setUserId(id);
            UserEntity savedUser = userRepository.save(toSave);
            responseDto.setSuccessMessage("User saved: " + savedUser.toString());
        }
        catch (Exception e){
            responseDto.setErrorMessage("User failed to save: " + e.getMessage());
        }
        return responseDto;
    }

    public ResponseDto deleteUser(Long id){
        ResponseDto responseDto = new ResponseDto();
        try{
            UserEntity user = userRepository.findById(id).get();
            List<DeviceEntity> devices = deviceRepository.findAllDevicesByUserFk(id);
            for(DeviceEntity device: devices){
                System.out.println(device);
                deviceRepository.delete(device);
            }
            userRepository.delete(user);
            responseDto.setSuccessMessage("Device " + user + " removed successfully!");
        }
        catch (Exception e)
        {
            responseDto.setErrorMessage("Device failed to delete: " + e.getMessage());
        }
        return responseDto;
    }
}
