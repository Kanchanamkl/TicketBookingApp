package com.ticketingsystem.app.dto;

import com.ticketingsystem.app.enums.ROLE;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {

    private String firstName;
    private String lastName;
    private String username;
    private String password;
    private ROLE role;
    private String phoneNumber;
    private String address;
    private String gender;
    private String nic;
    private LocalDate dob;
    private String specialize;
}