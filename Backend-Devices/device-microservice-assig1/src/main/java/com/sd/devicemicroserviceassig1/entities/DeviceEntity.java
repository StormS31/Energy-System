package com.sd.devicemicroserviceassig1.entities;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "devices")
public class DeviceEntity {
    public DeviceEntity(){}

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    @Column(name = "description")
    private String description;

    @Column(name = "address")
    private String address;

    @Column(name = "consumption")
    private String consumption;

    @ManyToOne
    @JoinColumn(name = "user_fk", nullable = false)
    private UserEntity userFk;
}
