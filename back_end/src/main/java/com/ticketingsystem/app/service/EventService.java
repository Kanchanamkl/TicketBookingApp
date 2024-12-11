package com.ticketingsystem.app.service;

import com.ticketingsystem.app.dto.AuthenticationResDTO;
import com.ticketingsystem.app.dto.EventDTO;
import com.ticketingsystem.app.model.Event;
import com.ticketingsystem.app.model.User;
import com.ticketingsystem.app.repository.EventRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@RequiredArgsConstructor
public class EventService {
    private final EventRepository eventRepository;


    public EventDTO createEvent(EventDTO eventDTO) {
        Event event =Event.builder()
                .eventName(eventDTO.getEventName())
                .eventDate(eventDTO.getEventDate())
                .eventTime(eventDTO.getEventTime())
                .location(eventDTO.getLocation())
                .isProducingTickets(false)
                .build();
       eventRepository.save(event);

        return EventDTO.builder()
                .eventName(eventDTO.getEventName())
                .eventDate(eventDTO.getEventDate())
                .build();
    }
}