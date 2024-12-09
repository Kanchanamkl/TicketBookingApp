package com.ticketingsystem.app.repository;

import com.ticketingsystem.app.model.Event;
import com.ticketingsystem.app.model.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface TicketRepository extends JpaRepository<Ticket, Long> {
    Optional<Ticket> findById(Long id);
}
