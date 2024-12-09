package com.ticketingsystem.app.controller;


import com.ticketingsystem.app.dto.AuthenticationReqDTO;
import com.ticketingsystem.app.dto.AuthenticationResDTO;
import com.ticketingsystem.app.dto.UserDTO;
import com.ticketingsystem.app.model.User;
import com.ticketingsystem.app.enums.ROLE;
import com.ticketingsystem.app.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;


    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResDTO>authenticateUser(@RequestBody AuthenticationReqDTO request) {
        return ResponseEntity.ok(userService.authenticateUser(request));
    }
    @GetMapping("/get_users")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/get-users-by-role")
    public List<User> getUsersByRole(@RequestParam ROLE role) {
        return userService.getUsersByRole(role);
    }
    @PostMapping("/create-user")
    public  ResponseEntity<AuthenticationResDTO> createUser(@RequestBody UserDTO userDTO) {
        return ResponseEntity.ok(userService.createUser(userDTO));
    }
    @PutMapping("/update-user")
    public ResponseEntity<User> updateUser(@RequestParam Long id, @RequestBody UserDTO userDTO) {
        return ResponseEntity.ok(userService.updateUser(id, userDTO));
    }

    @DeleteMapping("/delete-user")
    public ResponseEntity<String> deleteUser(@RequestParam Long id) {
        boolean isDeleted = userService.deleteUser(id);

        if (isDeleted) {
            return ResponseEntity.ok("User deleted successfully.");
        } else {
            return ResponseEntity.status(404).body("User not found.");
        }
    }

    @GetMapping("/get-user")
    public User getUserById(@RequestParam Long id){
        return userService.getUserById(id);
    }


}
