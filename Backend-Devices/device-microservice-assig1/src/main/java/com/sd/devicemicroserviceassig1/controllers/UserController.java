package com.sd.devicemicroserviceassig1.controllers;

import com.sd.devicemicroserviceassig1.dtos.ResponseDto;
import com.sd.devicemicroserviceassig1.services.DeviceService;
import com.sd.devicemicroserviceassig1.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@CrossOrigin("*")
public class UserController {
    private UserService userService;

    public UserController(UserService userService){
        this.userService = userService;
    }

    @PostMapping("/add-user/{id}")
    public ResponseEntity<ResponseDto> addUser(@PathVariable("id") Long id){
        return ResponseEntity.ok(userService.addUser(id));
    }

    @DeleteMapping("/delete-user/{id}")
    public ResponseEntity<ResponseDto> deleteUser(@PathVariable("id") Long id){
        return ResponseEntity.ok(userService.deleteUser(id));
    }
}
