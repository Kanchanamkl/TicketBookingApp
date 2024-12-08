package com.cricketpulse.app.service;

import com.cricketpulse.app.entity.Event;
import com.cricketpulse.app.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class EventService {

    private EventRepository eventRepository;

    // Create a new event
    public Event createEvent(String name, int totalTickets, Date eventDate) {
        Event event = new Event();
        event.setName(name);
        event.setTotalTickets(totalTickets);
        event.setAvailableTickets(totalTickets);
        event.setEventDate(eventDate);
        return eventRepository.save(event);
    }

    // Get an event by ID
    public Event getEvent(Long eventId) {
        return eventRepository.findById(eventId).orElseThrow(() -> new RuntimeException("Event not found"));
    }
}