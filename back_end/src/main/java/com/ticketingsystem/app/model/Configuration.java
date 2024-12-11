package com.ticketingsystem.app.model;

import com.google.gson.Gson;

import java.io.*;

public class Configuration {
    private int maxTicketPoolSize;
    private int ticketReleaseRate;
    private int customerRetrievalRate;


    public int getMaxTicketPoolSize() { return maxTicketPoolSize; }
    public void setMaxTicketPoolSize(int maxTicketPoolSize) { this.maxTicketPoolSize = maxTicketPoolSize; }

    public int getTicketReleaseRate() { return ticketReleaseRate; }
    public void setTicketReleaseRate(int ticketReleaseRate) { this.ticketReleaseRate = ticketReleaseRate; }

    public int getCustomerRetrievalRate() { return customerRetrievalRate; }
    public void setCustomerRetrievalRate(int customerRetrievalRate) { this.customerRetrievalRate = customerRetrievalRate; }


    public static Configuration loadFromJson(String filePath) throws IOException {
        Gson gson = new Gson();
        try (Reader reader = new FileReader(filePath)) {
            return gson.fromJson(reader, Configuration.class);
        }
    }

    @Override
    public String toString() {
        return "Configuration{" +
                "totalTickets=" + maxTicketPoolSize +
                ", ticketReleaseRate=" + ticketReleaseRate +
                ", customerRetrievalRate=" + customerRetrievalRate +
                '}';
    }
}