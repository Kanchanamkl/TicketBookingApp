package com.cricketpulse.app.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;

/**
 * @author : Kanchana Kalansooriya
 * @since 8/17/2024
 */
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
