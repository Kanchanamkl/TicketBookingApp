package com.ticketingsystem.app.model;

import com.ticketingsystem.app.enums.TICKET_STATUS;
import com.ticketingsystem.app.repository.EventRepository;
import com.ticketingsystem.app.repository.TicketRepository;
import com.ticketingsystem.app.repository.UserRepository;

import java.util.List;

public class Customer extends User implements Runnable {
    private final long customerId;
    private final long eventId;
    private final TicketPool ticketPool;
    private final int ticketCount;
    private final int retrievalInterval;
    private TicketRepository ticketRepository;
    private UserRepository userRepository;
    private EventRepository eventRepository;

    public Customer(long customerId, long eventId, int ticketCount, TicketPool ticketPool, int retrievalInterval, UserRepository userRepository, TicketRepository ticketRepository, EventRepository eventRepository) {
        this.customerId = customerId;
        this.eventId = eventId;
        this.ticketCount = ticketCount;
        this.ticketPool = ticketPool;
        this.retrievalInterval = retrievalInterval;
        this.userRepository = userRepository;
        this.ticketRepository = ticketRepository;
        this.eventRepository = eventRepository;
    }

    @Override
    public void run() {
        while (!Thread.currentThread().isInterrupted()) {
            List<Ticket> openToBuyTickets = ticketPool.getTicketsRequestedCountByEventId(eventId, ticketCount);
            Event event = eventRepository.findById(eventId).orElse(null);
            if (openToBuyTickets.isEmpty()) {
                System.out.println("Thread :[" + Thread.currentThread().getId() + "] :" + "Thread :[" + Thread.currentThread().getId() + "] :" + "could not find any tickets for event " + eventId);

            } else {
                for (Ticket ticket : openToBuyTickets) {
                    ticket.setCustomer(userRepository.findById(customerId).orElse(null));
                    ticket.setStatus(TICKET_STATUS.SOLD);
                    ticketRepository.save(ticket);

                    event.setTotalTickets(event.getTotalTickets() - 1);
                    eventRepository.save(event);

                    System.out.print("Thread :[" + Thread.currentThread().getId() + "] :" + "Customer " + customerId + " bought ticket with ID " + ticket.getTicketId() + " for event " + eventId + " | ");
                    ticketPool.removeTicket(ticket);
                    System.out.println("Thread :[" + Thread.currentThread().getId() + "] :" + " Ticket with ID " + ticket.getTicketId() + " removed from the pool.");
                }

            }

            Thread.currentThread().interrupt();

        }
    }
}