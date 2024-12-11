package com.ticketingsystem.app.model;


import org.hibernate.query.sqm.mutation.internal.cte.CteInsertHandler;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class TicketPool {
    public final List<Ticket> ticketList;
    private final int maxPoolSize;
    public final int ticketReleaseRate;

    public TicketPool( int maxPoolSize, int ticketReleaseRate) {
        ticketList = Collections.synchronizedList(new ArrayList<>());
        this.maxPoolSize = maxPoolSize;
        this.ticketReleaseRate = ticketReleaseRate;
        System.out.println("Ticket Pool initialized with max pool size: " + maxPoolSize);
    }

    public synchronized void addTicket(Ticket ticket) {
        ticketList.add(ticket);
    }

    public synchronized Ticket removeTicket(Ticket ticket) {
        if (ticketList.contains(ticket)) {
            ticketList.remove(ticket);
            return ticket;
        }
        System.out.println("Thread :["+Thread.currentThread().getId()+"] :"+"Ticket not found in the pool.");
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
        System.out.println("Thread :["+Thread.currentThread().getId()+"] :"+"TicketPool getTicketsRequestedCountByEventId: " + eventId + " Ticket Count: " + ticketCount);
        List<Ticket> tickets = new ArrayList<>();
        for (Ticket ticket : ticketList) {
            if (ticket.getEvent().getEventId() == eventId && ticketCount > 0) {
                tickets.add(ticket);
                ticketCount--;
            }
        }
        return tickets;

    }public synchronized boolean isTicketPoolSizeExceeded() {
        return ticketList.size() >= maxPoolSize;
    }



}