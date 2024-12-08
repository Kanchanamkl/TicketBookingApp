package com.ticketingsystem.app.controller;

import com.google.gson.Gson;
import com.ticketingsystem.app.dto.AuthenticationResDTO;
import com.ticketingsystem.app.dto.EventDTO;
import com.ticketingsystem.app.model.*;
import com.ticketingsystem.app.repository.EventRepository;
import com.ticketingsystem.app.repository.UserRepository;
import com.ticketingsystem.app.service.EventService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.FileReader;
import java.util.Optional;


@RestController
@RequestMapping("/api/ticketing")
public class TicketingSystemController {
    private final EventService eventService;
    private final EventRepository eventRepository;

    public TicketingSystemController(EventService eventService, EventRepository eventRepository) {
        this.eventService = eventService;
        this.eventRepository = eventRepository;
    }


    @PostMapping("/event")
    public ResponseEntity<EventDTO> createEvent(@RequestBody EventDTO eventDTO) {
        return ResponseEntity.ok(eventService.createEvent(eventDTO));

    }

    @PostMapping("/start_produce_tickets")
    public String startProduceTickets(@RequestParam Long vendorId, @RequestParam Long eventId , @RequestParam int ticketCount) {
        Optional<Event> event = eventRepository.findById(eventId);
        if (event.isPresent()) {
            Vendor vendor = new Vendor(vendorId, eventId, ticketCount, true);
            Thread vendorThread = new Thread(vendor);
            vendorThread.start();

            return "Requested Tickets are being produced.";
        } else {
            return "Event not found";
        }

    }

    @PostMapping("/customer/buy")
    public String buyTickets(@RequestParam Long customerId, @RequestParam Long eventId , @RequestParam int ticketCount) {
        Optional<Event> event = eventRepository.findById(eventId);
        if (event.isPresent()) {
//            Customer customer = new Customer(customerId, eventId, ticketCount);
//            Thread customerThread = new Thread(customer);
//            customerThread.start();

            return "Requested Tickets are being bought.";
        } else {
            return "Event not found";
        }

    }
}
