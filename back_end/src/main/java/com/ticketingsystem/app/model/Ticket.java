package com.ticketingsystem.app.model;

import jakarta.persistence.Entity;
import jakarta.persistence.*;

@Entity
public class Ticket {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ticketId;
    private boolean status; // Ticket status (SOLD or UNSOLD).


}