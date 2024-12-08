package com.ticketingsystem.app.model;


import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class TicketPool {
    private final List<Ticket> ticketList;
    private final int ticketPoolSize;

    public TicketPool( int ticketPoolSize) {
        ticketList = Collections.synchronizedList(new ArrayList<>(ticketPoolSize));
        this.ticketPoolSize = ticketPoolSize;
    }

    public synchronized void addTicket(Ticket ticket) {
        ticketList.add(ticket);
        System.out.println(ticketList.size() + " tickets added to the pool.->" );
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

    public synchronized int getAvailableTicketsByEventId(long eventId){
        int count = 0;
        for (Ticket ticket : ticketList) {
            if (ticket.getEvent().getEventId()==eventId) {
                count++;
            }
        }
        return count;
    }
}