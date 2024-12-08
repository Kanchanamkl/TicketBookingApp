package com.cricketpulse.app.controller;


import com.cricketpulse.app.dto.AuthenticationReqDTO;
import com.cricketpulse.app.dto.AuthenticationResDTO;
import com.cricketpulse.app.dto.UserDTO;
import com.cricketpulse.app.entity.User;
import com.cricketpulse.app.enums.ROLE;
import com.cricketpulse.app.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author Kanchana_m
 */
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    @Autowired
    private UserService userService;


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
