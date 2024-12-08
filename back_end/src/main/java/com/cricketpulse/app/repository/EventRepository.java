package com.cricketpulse.app.repository;


import com.cricketpulse.app.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepository extends JpaRepository<Event, Long> {
}