package com.ticketingsystem.app.model;
import com.ticketingsystem.app.enums.TICKET_STATUS;
import com.ticketingsystem.app.repository.EventRepository;
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
    private static boolean isStop = false;
    private static long eventId=0;
    private static final Object lock = new Object();



    public Vendor(Long vendorId, Event event, int ticketCount , TicketPool ticketPool ,EventRepository eventRepository) {
        this.event = event;
        this.vendorId = vendorId;
        this.ticketCount = ticketCount;
        this.ticketPool=ticketPool;
        this.eventRepository=eventRepository;
    }


    @Override
    public void run() {
        try {
            while (!Thread.currentThread().isInterrupted()) {

                Event event_ = fetchUpdatedEvent(event.getEventId());
                if (event_.isProducingTickets()) {
                    Ticket ticket = new Ticket(event_,TICKET_STATUS.UNSOLD);

                    ticketPool.addTicket(ticket);
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