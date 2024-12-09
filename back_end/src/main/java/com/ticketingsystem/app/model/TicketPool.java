package com.ticketingsystem.app.model;


import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class TicketPool {
    public final List<Ticket> ticketList;
    private final int ticketPoolSize;

    public TicketPool( int ticketPoolSize) {
        ticketList = Collections.synchronizedList(new ArrayList<>(ticketPoolSize));
        this.ticketPoolSize = ticketPoolSize;
    }

    public synchronized void addTicket(Ticket ticket) {
        ticketList.add(ticket);
        System.out.println(ticketList.size() + " Tickets added to the pool." );
    }

    public synchronized Ticket removeTicket(Ticket ticket) {
        if (ticketList.contains(ticket)) {
            ticketList.remove(ticket);
            return ticket;
        }
        System.out.println("Ticket not found in the pool.");
        return null;

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

    public synchronized List<Ticket> getTicketsRequestedCountByEventId(long eventId, int ticketCount) {
        System.out.println("TicketPool getTicketsRequestedCountByEventId: " + eventId + " Ticket Count: " + ticketCount);
        List<Ticket> tickets = new ArrayList<>();
        for (Ticket ticket : ticketList) {
            if (ticket.getEvent().getEventId() == eventId && ticketCount > 0) {
                tickets.add(ticket);
                ticketCount--;
            }
        }
        return tickets;

    }

}