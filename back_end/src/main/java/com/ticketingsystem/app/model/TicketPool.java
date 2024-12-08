package com.ticketingsystem.app.model;


import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class TicketPool {
    private final List<Ticket> ticketList;

    public TicketPool(int capacity) {
        ticketList = Collections.synchronizedList(new ArrayList<>(capacity));
    }

    public synchronized void addTickets(List<Ticket> tickets) {
        ticketList.addAll(tickets);
        System.out.println(tickets.size() + " tickets added to the pool.");
    }

    public synchronized Ticket removeTicket() {
        if (!ticketList.isEmpty()) {
            Ticket ticket = ticketList.remove(0);
            System.out.println("Ticket removed from the pool.");
            return ticket;
        } else {
            System.out.println("No tickets available to remove.");
            return null;
        }
    }

    public synchronized int getAvailableTickets() {
        return ticketList.size();
    }
}