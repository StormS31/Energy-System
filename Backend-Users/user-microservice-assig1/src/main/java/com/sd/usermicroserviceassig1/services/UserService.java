package com.sd.usermicroserviceassig1.services;

import com.sd.usermicroserviceassig1.dtos.UserDto;
import com.sd.usermicroserviceassig1.entities.UserEntity;
import com.sd.usermicroserviceassig1.mappers.UserMapper;
import com.sd.usermicroserviceassig1.repositories.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private UserRepository userRepository;
    private UserMapper userMapper;
    // delete after adding spring security
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public UserService(UserRepository userRepository, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
    }

    public UserDto login(UserDto credentials){
        UserEntity foundUser = userRepository.findByUsername(credentials.getUsername());
        if (passwordEncoder.matches(credentials.getPassword(), foundUser.getPassword()))
            return userMapper.toDto(foundUser);
        return null;
    }

    public UserDto getUserById(Long id) {
        return userMapper.toDto(userRepository.findById(id).orElse(null));
    }

    public List<UserDto> getUsers(){
        return userMapper.toDtos(userRepository.findAll());
    }

    public UserDto editUser(Long id, UserDto userDto){
        UserEntity dbUser = userRepository.findById(id).orElse(null);
        dbUser.setRole(userDto.getRole());
        dbUser.setFirstName(userDto.getFirstName());
        dbUser.setLastName(userDto.getLastName());
        if(!userDto.getPassword().equals(""))
            dbUser.setPassword(passwordEncoder.encode(userDto.getPassword()));
        userRepository.save(dbUser);
        return userMapper.toDto(dbUser);
    }

    public UserDto addUser(UserDto userDtoToAdd){
        UserEntity userEntityToAdd = userMapper.toEntity(userDtoToAdd);
        userEntityToAdd.setPassword(passwordEncoder.encode(userEntityToAdd.getPassword()));
        userRepository.save(userEntityToAdd);
        return userMapper.toDto(userEntityToAdd);
    }

    public void deleteUser(Long id){
        userRepository.deleteById(id);
    }
}
