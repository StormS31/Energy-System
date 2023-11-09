package com.sd.usermicroserviceassig1.controllers;

import com.sd.usermicroserviceassig1.config.JwtTokenService;
import com.sd.usermicroserviceassig1.dtos.ResponseDto;
import com.sd.usermicroserviceassig1.dtos.UserDto;
import com.sd.usermicroserviceassig1.services.UserService;
import com.sd.usermicroserviceassig1.utils.exceptions.LoginUtilService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RequestMapping("/users")
@RestController
public class UserController {
    private final UserService userService;
    private final JwtTokenService jwtTokenService;

    public UserController(UserService userService, JwtTokenService jwtTokenService) {
        this.userService = userService;
        this.jwtTokenService = jwtTokenService;
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody UserDto credentials, HttpServletResponse httpServletResponse){
        String jwt = "";
        UserDto user = userService.login(credentials);
        if(user != null){
            jwt = jwtTokenService.createJwtToken(user.getId(), LoginUtilService.getRole(user.getRole()));
            httpServletResponse.addCookie(LoginUtilService.createJwtCookie(jwt));
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/get-users")
    public ResponseEntity<List<UserDto>> getUsers(){
        return ResponseEntity.ok(userService.getUsers());
    }

    @GetMapping("/get-user/{id}")
    public ResponseEntity<UserDto> getUserById(@PathVariable("id") Long id){
        return ResponseEntity.ok(userService.getUserById(id));
    }

    @PutMapping("/edit-user/{id}")
    public ResponseEntity<UserDto> editUser(@PathVariable("id") Long id, @RequestBody UserDto userToEdit){
        return ResponseEntity.ok(userService.editUser(id, userToEdit));
    }

    @PostMapping("/add-user")
    public ResponseEntity<UserDto> addUser(@RequestBody UserDto userToAdd){
        return ResponseEntity.ok(userService.addUser(userToAdd));
    }

    @DeleteMapping("/delete-user/{id}")
    public ResponseEntity<ResponseDto> deleteUser(@PathVariable("id") Long id){
        userService.deleteUser(id);
        return ResponseEntity.ok(new ResponseDto("success", ""));
    }
}