package com.sd.devicemicroserviceassig1.repositories;

import com.sd.devicemicroserviceassig1.entities.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {
}
