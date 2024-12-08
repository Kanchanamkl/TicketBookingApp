package com.cricketpulse.app.repository;

import com.cricketpulse.app.entity.Customer;
import com.cricketpulse.app.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Author: Kanchana Kalansooriya
 * Since: 11/10/2024
 */
@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {
    Optional<Customer> findByUser(User user);

}