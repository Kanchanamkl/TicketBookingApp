package model;
import com.google.gson.Gson;

import java.io.*;


public class Configuration implements Serializable {
    private int maxTicketPoolSize;
    private int ticketReleaseRate;
    private int customerRetrievalRate;

    // Getters and Setters
    public int getMaxTicketPoolSize() { return maxTicketPoolSize; }
    public void setMaxTicketPoolSize(int maxTicketPoolSize) { this.maxTicketPoolSize = maxTicketPoolSize; }

    public int getTicketReleaseRate() { return ticketReleaseRate; }
    public void setTicketReleaseRate(int ticketReleaseRate) { this.ticketReleaseRate = ticketReleaseRate; }

    public int getCustomerRetrievalRate() { return customerRetrievalRate; }
    public void setCustomerRetrievalRate(int customerRetrievalRate) { this.customerRetrievalRate = customerRetrievalRate; }


    // Save to JSON file
    public void saveToJson(String filePath) throws IOException {
        Gson gson = new Gson();
        try (Writer writer = new FileWriter(filePath)) {
            gson.toJson(this, writer);
        }
    }

    // Load from JSON file
    public static Configuration loadFromJson(String filePath) throws IOException {
        Gson gson = new Gson();
        try (Reader reader = new FileReader(filePath)) {
            return gson.fromJson(reader, Configuration.class);
        }
    }
}
