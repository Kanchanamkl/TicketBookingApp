package com.ticketingsystem.app.model;

public class Customer extends User implements Runnable {
    private final String customerId;
    private final TicketPool ticketPool;
    private final int retrievalInterval;

    public Customer(String customerId, TicketPool ticketPool, int retrievalInterval) {
        this.customerId = customerId;
        this.ticketPool = ticketPool;
        this.retrievalInterval = retrievalInterval;
    }

    @Override
    public void run() {
        try {
            while (!Thread.currentThread().isInterrupted()) {

                Thread.sleep(retrievalInterval);
            }
        } catch (InterruptedException e) {
            System.out.println("Customer " + customerId + " interrupted.");
        }
    }
}