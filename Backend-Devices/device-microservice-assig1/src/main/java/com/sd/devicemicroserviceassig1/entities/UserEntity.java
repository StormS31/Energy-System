package com.sd.devicemicroserviceassig1.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Set;

@Table(name = "users")
@Entity
@Data
public class UserEntity {
    @Id
    @Column(name = "user_id")
    private Long userId;

    @OneToMany(mappedBy = "userFk", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private Set<DeviceEntity> devices;
}
