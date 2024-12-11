package org.example;
import model.Configuration;

import java.util.Scanner;

public class Main {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        Configuration config = new Configuration();


        config.setMaxTicketPoolSize(promptForPositiveInt(scanner, "Enter max pool size of tickets: "));


        config.setTicketReleaseRate(promptForPositiveInt(scanner, "Enter the ticket release rate (ms): "));


        config.setCustomerRetrievalRate(promptForPositiveInt(scanner, "Enter the customer retrieval rate (ms): "));




        System.out.println("Configuration saved: " + config);
        try {
            config.saveToJson("../../back_end/src/main/resources/config.json");
            System.out.println("Configuration saved to file.");
        } catch (Exception e) {
            System.out.println("Failed to save configuration: " + e.getMessage());
        }
    }

    private static int promptForPositiveInt(Scanner scanner, String prompt) {
        int value;
        while (true) {
            System.out.print(prompt);
            if (scanner.hasNextInt()) {
                value = scanner.nextInt();
                if (value > 0) break;
            }
            System.out.println("Invalid input! Please enter a positive number.");
            scanner.nextLine(); // Clear the invalid input
        }
        return value;
    }
}