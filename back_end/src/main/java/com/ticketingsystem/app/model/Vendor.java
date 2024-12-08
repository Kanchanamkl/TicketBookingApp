package com.ticketingsystem.app.model;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

public class Vendor implements Runnable {
    private long vendorId;
    private Long eventId;
    private int ticketCount;
    private  boolean producingTickets;

    public Vendor(Long vendorId, Long eventId, int ticketCount , boolean producingTickets) {
        this.eventId = eventId;
        this.vendorId = vendorId;
        this.ticketCount = ticketCount;
        this.producingTickets = false;
    }

    public void startProduceTickets() {
        producingTickets = true;
    }

    public void stopProduceTickets() {
        producingTickets = false;
    }

    @Override
    public void run() {
        try {
            while (!Thread.currentThread().isInterrupted()) {
                if (producingTickets) {
                    // Logic to produce tickets
                    System.out.println("Vendor " + vendorId + " is producing tickets for event " + eventId);
                }
                Thread.sleep(1000);
            }
        } catch (InterruptedException e) {
            System.out.println("Vendor " + vendorId + " interrupted.");
        }
    }
}