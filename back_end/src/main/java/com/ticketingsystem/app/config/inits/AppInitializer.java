package com.ticketingsystem.app.config.inits;

import com.ticketingsystem.app.model.Configuration;
import com.ticketingsystem.app.model.TicketPool;
import com.ticketingsystem.app.dto.UserDTO;
import com.ticketingsystem.app.enums.ROLE;
import com.ticketingsystem.app.exception.UserAlreadyExistsException;
import com.ticketingsystem.app.repository.EventRepository;
import com.ticketingsystem.app.repository.TicketRepository;
import com.ticketingsystem.app.service.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.io.File;

@Component
public class AppInitializer implements CommandLineRunner {

    private final UserService userService;
    private final EventRepository eventRepository;
    private final TicketRepository ticketRepository;
    private TicketPool ticketPool;

    public AppInitializer(UserService userService, EventRepository eventRepository, TicketRepository ticketRepository) {
        this.userService = userService;
        this.eventRepository = eventRepository;
        this.ticketRepository = ticketRepository;
    }

    @Override
    public void run(String... args) throws Exception {

        try {
            initializeAdminUsers();
            initializeEventTicketProducingState();
            initializeTicketTable();
            initializeEventTable();

            File configFile = new File("src/main/resources/config.json");


            if (configFile.exists()) {
                Configuration config = Configuration.loadFromJson("src/main/resources/config.json");
                System.out.println("Loaded configurations  : " + config);

            } else {
                System.out.println("Configuration file not found. Please run the CLI tool first.");
            }
        } catch (Exception e) {
            System.out.println("Failed to initialize system: " + e.getMessage());
        }
    }

    private void initializeAdminUsers() {
        UserDTO adminUser = new UserDTO(
                "Admin",
                "User",
                "admin@gmail.com",
                "admin@123",
                ROLE.ADMIN,
                null, // phoneNumber
                null, // address
                null, // gender
                null, // nic
                null, //
                null
        );

        try {
            userService.createAdmin(adminUser);
        } catch (UserAlreadyExistsException e) {
            // Log the exception and continue
            System.err.println("Admin user already exists: " + e.getMessage());
        }
    }

    private void initializeEventTicketProducingState(){
        eventRepository.findAll().forEach(event -> {
            event.setProducingTickets(false);
            eventRepository.save(event);
        });
    }

    private void initializeTicketTable(){
        ticketRepository.deleteAll();
    }

    private void initializeEventTable(){

    eventRepository.findAll().forEach(event -> {
        event.setTotalTickets(0);
        eventRepository.save(event);
    });

    }

}