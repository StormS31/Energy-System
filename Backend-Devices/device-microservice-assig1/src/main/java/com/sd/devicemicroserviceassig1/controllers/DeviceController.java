package com.sd.devicemicroserviceassig1.controllers;

import com.sd.devicemicroserviceassig1.dtos.DeviceDto;
import com.sd.devicemicroserviceassig1.dtos.ResponseDto;
import com.sd.devicemicroserviceassig1.services.DeviceService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/devices")
@CrossOrigin("*")
public class DeviceController {
    private DeviceService deviceService;

    public DeviceController(DeviceService deviceService){
        this.deviceService = deviceService;
    }

    @PostMapping("/add-device")
    public ResponseEntity<ResponseDto> addDevice(@RequestBody DeviceDto deviceDto){
        return ResponseEntity.ok(deviceService.addDevice(deviceDto));
    }

    @DeleteMapping("/delete-device/{id}")
    public ResponseEntity<ResponseDto> deleteDevice(@PathVariable Long id){
        return ResponseEntity.ok(deviceService.deleteDevice(id));
    }

    @PutMapping("/edit-device/{id}")
    public ResponseEntity<ResponseDto> updateDevice(@RequestBody DeviceDto deviceDto, @PathVariable Long id){
        return ResponseEntity.ok(deviceService.updateDevice(id, deviceDto));
    }

    @GetMapping("/get-devices")
    public ResponseEntity<List<DeviceDto>> getDevices(){
        return ResponseEntity.ok(deviceService.getDevices());
    }

    @GetMapping("/get-device/{id}")
    public ResponseEntity<DeviceDto> getDevice(@PathVariable Long id) {
        return ResponseEntity.ok(deviceService.getDevice(id));
    }

    @GetMapping("/get-owned-devices/{id}")
    public ResponseEntity<List<DeviceDto>> getOwnedDevices(@PathVariable Long id){
        return ResponseEntity.ok(deviceService.getOwnedDevices(id));
    }

}
