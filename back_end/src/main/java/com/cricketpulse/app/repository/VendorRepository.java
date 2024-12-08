package com.cricketpulse.app.repository;

import com.cricketpulse.app.entity.Vendor;
import com.cricketpulse.app.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface VendorRepository extends JpaRepository<Vendor, Long> {
  Optional<Vendor> findByUser(User user);
}

