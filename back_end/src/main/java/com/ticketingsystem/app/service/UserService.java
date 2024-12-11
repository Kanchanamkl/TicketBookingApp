package com.ticketingsystem.app.service;


import com.ticketingsystem.app.dto.AuthenticationReqDTO;
import com.ticketingsystem.app.dto.AuthenticationResDTO;
import com.ticketingsystem.app.dto.UserDTO;
import com.ticketingsystem.app.model.Vendor;
import com.ticketingsystem.app.model.Customer;
import com.ticketingsystem.app.enums.ROLE;
import com.ticketingsystem.app.exception.UserAlreadyExistsException;
import com.ticketingsystem.app.exception.UserNotFoundException;
import com.ticketingsystem.app.model.User;
import com.ticketingsystem.app.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    private final AuthenticationManager authenticationManager;

    @Transactional
    public User updateUser(Long id, UserDTO userDTO) {
        User user = userRepository.findById(id).orElseThrow(() -> new UserNotFoundException("User not found"));
        user.setFirstName(userDTO.getFirstName());
        user.setLastName(userDTO.getLastName());
        user.setUsername(userDTO.getUsername());
        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        User updatedUser = userRepository.save(user);



        return updatedUser;
    }

    @Transactional
    public AuthenticationResDTO createUser(UserDTO userDTO) {
        System.out.println("user-name :" + userDTO.getUsername());
        boolean isUserPresent = userRepository.findByUsername(userDTO.getUsername()).isPresent();

        if (isUserPresent) {
            throw new UserAlreadyExistsException("User Already Exists in the system");
        } else {
            User user = User.builder()
                    .firstName(userDTO.getFirstName())
                    .lastName(userDTO.getLastName())
                    .username(userDTO.getUsername())
                    .password(passwordEncoder.encode(userDTO.getPassword()))
                    .role(userDTO.getRole())
                    .build();

            userRepository.save(user);


        }
        return AuthenticationResDTO.builder()
                .username(userDTO.getUsername())
                .firstName(userDTO.getFirstName())
                .lastName(userDTO.getLastName())
                .role(userDTO.getRole().toString())
                .build();
    }


    @Transactional
    public boolean deleteUser(Long id) {
            User user = userRepository.findById(id).orElseThrow(() -> new UserNotFoundException("Sorry, user not found"));

//            if (user.getRole().equals(ROLE.VENDOR)) {
//                Vendor vendor = vendorRepository.findByUser(user).orElseThrow(() -> new UserNotFoundException("Vendor not found"));
//                vendorRepository.delete(vendor);
//            } else if (user.getRole().equals(ROLE.CUSTOMER)) {
//                Customer customer = customerRepository.findByUser(user).orElseThrow(() -> new UserNotFoundException("Customer not found"));
//                customerRepository.delete(customer);
//
//            }
//

            userRepository.delete(user);
            return true;
    }

    public AuthenticationResDTO authenticateUser(AuthenticationReqDTO request) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var user = userRepository.findByUsername(request.getEmail()).orElseThrow();
        return AuthenticationResDTO.builder()
                .Id(user.getUserId().toString())
                .username(user.getUsername())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .role(user.getRole().toString())
                .profilePic(user.getProfilePic())
                .message("")
                .responseCode(HttpStatus.OK)
                .build();
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public List<User> getUsersByRole(ROLE role) {
        return userRepository.findAll().stream()
                .filter(user -> user.getRole().equals(role))
                .collect(Collectors.toList());
    }

    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("Sorry, no user found with the Id :" + id));
    }

    @Transactional
    public AuthenticationResDTO createAdmin(UserDTO userDTO) {
        boolean isUserPresent = userRepository.findByUsername(userDTO.getUsername()).isPresent();

        if (isUserPresent) {
            throw new UserAlreadyExistsException("User Already Exists in the system");
        } else {
            User user = User.builder()
                    .firstName(userDTO.getFirstName())
                    .lastName(userDTO.getLastName())
                    .username(userDTO.getUsername())
                    .password(passwordEncoder.encode(userDTO.getPassword()))
                    .role(ROLE.ADMIN) // Set the role to ADMIN
                    .build();

            userRepository.save(user);
        }
        return AuthenticationResDTO.builder()
                .username(userDTO.getUsername())
                .firstName(userDTO.getFirstName())
                .lastName(userDTO.getLastName())
                .role(ROLE.ADMIN.toString())
                .build();
    }

}
