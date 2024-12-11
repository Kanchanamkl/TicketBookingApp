package com.ticketingsystem.app.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class EventDTO {
    private String eventName;
    private int totalTickets;
    private int maxTicketCount;
    private LocalDate eventDate;
    private LocalTime eventTime;
    private String location;

}
