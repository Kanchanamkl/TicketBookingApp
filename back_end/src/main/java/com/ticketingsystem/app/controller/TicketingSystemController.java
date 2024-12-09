package com.ticketingsystem.app.controller;

import com.google.gson.Gson;
import com.ticketingsystem.app.dto.AuthenticationResDTO;
import com.ticketingsystem.app.dto.EventDTO;
import com.ticketingsystem.app.model.*;
import com.ticketingsystem.app.repository.EventRepository;
import com.ticketingsystem.app.repository.UserRepository;
import com.ticketingsystem.app.service.EventService;
import com.ticketingsystem.app.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.FileReader;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/ticketing")
public class TicketingSystemController {
    private final EventService eventService;
    private final EventRepository eventRepository;
    private static final TicketPool ticketPool = new TicketPool(1000); // Example capacity
    private final UserService userService;
    private final UserRepository userRepository;

    public TicketingSystemController(EventService eventService, EventRepository eventRepository, UserService userService, UserRepository userRepository) {
        this.eventService = eventService;
        this.eventRepository = eventRepository;
        this.userService = userService;
        this.userRepository = userRepository;
    }


    @PostMapping("/event")
    public ResponseEntity<EventDTO> createEvent(@RequestBody EventDTO eventDTO) {
        return ResponseEntity.ok(eventService.createEvent(eventDTO));

    }

    @PostMapping("/start_produce_tickets")
    public String startProduceTickets(@RequestParam Long vendorId, @RequestParam Long eventId, @RequestParam int ticketCount) {

        Event event = eventRepository.findById(eventId).orElse(null);

        if (event == null) {
            return "Event not found";
        }else if(event.isProducingTickets()){
            System.out.println("Ticket producing are bean processing for Event "+eventId + " by Vendor "+vendorId);
            return "Ticket producing are bean processing for Event "+eventId + " by Vendor "+vendorId;
        } else {
            Vendor.setIsStop(false, event.getEventId());
            User user = userRepository.findById(vendorId).orElse(null);
            if (user == null) {
                return "User not found";
            } else {
                event.setProducingTickets(true);
                eventRepository.save(event);

                Vendor vendor = new Vendor(user.getUserId(), event, ticketCount, ticketPool, eventRepository);
                new Thread(vendor).start();
                return "Requested Tickets are being produced.";
            }

        }

    }

    @PostMapping("/stop_produce_tickets")
    public String stopProduceTickets(@RequestParam Long vendorId, @RequestParam Long eventId) {
        Event event = eventRepository.findById(eventId).get();

        event.setProducingTickets(false);
        eventRepository.save(event);
        Vendor.setIsStop(true, event.getEventId());
        return "Requested Tickets producing are being stopped.";
    }

    @PostMapping("/customer/buy")
    public String buyTickets(@RequestParam Long customerId, @RequestParam Long eventId, @RequestParam int ticketCount) {
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

    @GetMapping("/ticket_count")
    public ResponseEntity<Integer> getTicketCount(@RequestParam Long eventId) {
        Event event = eventRepository.findById(eventId).orElse(null);
        if (event == null) {
            return ResponseEntity.notFound().build();
        }
        int ticketCount = ticketPool.getAvailableTicketsByEventId(eventId);
        return ResponseEntity.ok(ticketCount);
    }
}
