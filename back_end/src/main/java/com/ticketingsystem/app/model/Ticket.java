package com.ticketingsystem.app.model;

import com.ticketingsystem.app.enums.TICKET_STATUS;
import jakarta.persistence.Entity;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Builder
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "TICKET")
public class Ticket {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ticketId;
    @Enumerated(EnumType.STRING)
    private TICKET_STATUS status;

    Ticket(TICKET_STATUS status) {
        this.status = status;
    }

    @ManyToOne
    @JoinColumn(name = "event_id", nullable = false)
    private Event event;


}