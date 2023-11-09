package com.sd.devicemicroserviceassig1.services;

import com.sd.devicemicroserviceassig1.dtos.DeviceDto;
import com.sd.devicemicroserviceassig1.dtos.ResponseDto;
import com.sd.devicemicroserviceassig1.entities.DeviceEntity;
import com.sd.devicemicroserviceassig1.mappers.DeviceMapper;
import com.sd.devicemicroserviceassig1.repositories.DeviceRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DeviceService {

    private final DeviceRepository deviceRepository;
    private final DeviceMapper deviceMapper;

    public DeviceService(DeviceRepository deviceRepository, DeviceMapper deviceMapper){
        this.deviceMapper = deviceMapper;
        this.deviceRepository = deviceRepository;
    }

    public List<DeviceDto> getDevices(){
        return deviceMapper.toDtos(deviceRepository.findAll());
    }

    public ResponseDto addDevice(DeviceDto deviceDto){
        ResponseDto responseDto = new ResponseDto();
        DeviceEntity device = deviceMapper.toEntity(deviceDto);
        try{
            DeviceEntity saved = deviceRepository.save(device);
            responseDto.setSuccessMessage("Device added with success: " + saved);
        }catch(Exception e){
            responseDto.setErrorMessage("Device failed to add: " + e.getMessage());
        }
        return responseDto;
    }

    public ResponseDto deleteDevice(Long id){
        ResponseDto responseDto = new ResponseDto();
        try{
            DeviceEntity device = deviceRepository.findById(id).get();
            deviceRepository.delete(device);
            responseDto.setSuccessMessage("Device " + device + " removed successfully!");
        }
        catch (Exception e)
        {
            responseDto.setErrorMessage("Device failed to delete: " + e.getMessage());
        }
        return responseDto;
    }

    public ResponseDto updateDevice(Long id, DeviceDto deviceDto){
        ResponseDto responseDto = new ResponseDto();
        DeviceEntity device = deviceRepository.findById(id).orElse(null);
        try{
            device.setAddress(deviceDto.getAddress());
            device.setDescription(deviceDto.getDescription());
            device.setId(deviceDto.getId());
            device.setUserFk(deviceDto.getUserFk());
            device.setConsumption(deviceDto.getConsumption());
            DeviceEntity saved = deviceRepository.save(device);
            responseDto.setSuccessMessage("Device updated successfully: " + saved);
        }
        catch (Exception e){
            responseDto.setErrorMessage("Device failed to update: " + e.getMessage());
        }
        return responseDto;
    }

    public DeviceDto getDevice(Long id){
        return deviceMapper.toDto(deviceRepository.findById(id).orElse(null));
    }

    public List<DeviceDto> getOwnedDevices(Long id) {
        return deviceMapper.toDtos(deviceRepository.findAllDevicesByUserFk(id));
    }
}
