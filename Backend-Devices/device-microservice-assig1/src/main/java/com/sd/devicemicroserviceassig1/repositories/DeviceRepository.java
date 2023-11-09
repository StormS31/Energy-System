package com.sd.devicemicroserviceassig1.repositories;

import com.sd.devicemicroserviceassig1.entities.DeviceEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DeviceRepository extends JpaRepository<DeviceEntity, Long> {
    @Query(value = "SELECT * FROM devices WHERE user_fk = ?1", nativeQuery = true)
    List<DeviceEntity> findAllDevicesByUserFk(Long id);

}
