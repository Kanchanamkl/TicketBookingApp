package com.cricketpulse.app.exception;

/**
 * @author : Kanchana Kalansooriya
 * @since 11/10/2024
 */
public class UserAlreadyExistsException extends RuntimeException {
    public UserAlreadyExistsException(String message) {
        super(message);
    }
}
