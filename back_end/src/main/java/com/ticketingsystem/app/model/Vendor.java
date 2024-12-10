package com.ticketingsystem.app.model;
import com.ticketingsystem.app.enums.TICKET_STATUS;
import com.ticketingsystem.app.repository.EventRepository;
import com.ticketingsystem.app.repository.TicketRepository;
import com.ticketingsystem.app.repository.UserRepository;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.util.Objects;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Vendor extends User implements Runnable {
    private long vendorId;
    private Event event;
    private int ticketCount;
    private TicketPool ticketPool;
    private EventRepository eventRepository;
    private UserRepository userRepository;
    private TicketRepository ticketRepository;
    private static boolean isStop = false;
    private static long eventId=0;
    private static final Object lock = new Object();



    public Vendor(Long vendorId, Event event, int ticketCount , TicketPool ticketPool , EventRepository eventRepository , UserRepository userRepository, TicketRepository ticketRepository) {
        this.event = event;
        this.vendorId = vendorId;
        this.ticketCount = ticketCount;
        this.ticketPool=ticketPool;
        this.eventRepository=eventRepository;
        this.userRepository=userRepository;
        this.ticketRepository=ticketRepository;
    }


    @Override
    public void run() {
        try {
            while (!Thread.currentThread().isInterrupted()) {
                // producing tickets to pool
                Event event_ = fetchUpdatedEvent(event.getEventId());
                User vendor = userRepository.findById(vendorId).orElse(null);
                if (event_.isProducingTickets()) {
                    Ticket ticket = new Ticket(event_,vendor,null,TICKET_STATUS.UNSOLD);
                    ticketRepository.save(ticket);
                    ticketPool.addTicket(ticket);

                    event_.setTotalTickets(event_.getTotalTickets() + 1);
                    eventRepository.save(event_);

                    System.out.println("Vendor " + vendorId + " is producing tickets for event " + event.getEventId());
                }
                Thread.sleep(1000);
                synchronized (lock) {
                    while (isStop && eventId == event.getEventId()) {
                        event_.setProducingTickets(false);
                        eventRepository.save(event_);
                        System.out.println("Vendor " + vendorId + " is not producing tickets for event " + event.getEventId());
                        lock.wait();
                        Thread.currentThread().interrupt();
                    }
                }
            }
        } catch (InterruptedException e) {
            System.out.println("Vendor " + vendorId + " interrupted.");
        }
    }


    private Event fetchUpdatedEvent(long eventId) {
        return eventRepository.findById(eventId).orElse(null);

    }

    public static void setIsStop(boolean isStopExecution, long eventId_) {
        synchronized (lock) {
            isStop = isStopExecution;
            eventId = eventId_;
            if (!isStop) {
                lock.notifyAll(); // Resume thread if paused
            }
        }
    }
}