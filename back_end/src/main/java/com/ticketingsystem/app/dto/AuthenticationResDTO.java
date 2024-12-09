package com.ticketingsystem.app.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationResDTO {
    String Id;
    String username;
    String role;
    String firstName;
    String lastName;
    String profilePic;
    String message;
    HttpStatus responseCode;
}
