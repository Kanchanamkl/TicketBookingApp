package com.ticketingsystem.app.model;
import com.ticketingsystem.app.enums.TICKET_STATUS;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

public class Vendor extends User implements Runnable {
    private long vendorId;
    private Event event;
    private int ticketCount;
    private TicketPool ticketPool;

    public Vendor(Long vendorId, Event event, int ticketCount , TicketPool ticketPool) {
        this.event = event;
        this.vendorId = vendorId;
        this.ticketCount = ticketCount;
        this.ticketPool=ticketPool;
    }


    @Override
    public void run() {
        try {
            while (!Thread.currentThread().isInterrupted()) {
                if (event.isProducingTickets()) {
                    Ticket ticket = new Ticket(TICKET_STATUS.UNSOLD);

                    ticketPool.addTicket(ticket);
                    System.out.println("Vendor " + vendorId + " is producing tickets for event " + event.getEventId());
                }else{
                    System.out.println("Vendor " + vendorId + " is not producing tickets for event " + event.getEventId());
                }
                Thread.sleep(1000);
            }
        } catch (InterruptedException e) {
            System.out.println("Vendor " + vendorId + " interrupted.");
        }
    }
}