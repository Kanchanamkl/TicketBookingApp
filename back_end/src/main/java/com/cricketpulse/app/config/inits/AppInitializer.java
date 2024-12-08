package com.cricketpulse.app.config.inits;
import com.cricketpulse.app.dto.UserDTO;
import com.cricketpulse.app.enums.ROLE;
import com.cricketpulse.app.exception.UserAlreadyExistsException;
import com.cricketpulse.app.service.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

/**
 * @author : Kanchana Kalansooriya
 * @since 11/12/2024
 */


@Component
public class AppInitializer implements CommandLineRunner {

    private final UserService userService;

    public AppInitializer(UserService userService ) {
        this.userService = userService;
    }

    @Override
    public void run(String... args) throws Exception {
        initializeAdminUsers();
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
                null, // dob
                "https://firebasestorage.googleapis.com/v0/b/restarantappfilerepo.appspot.com/o/profilePics%2Fadmin%2Fadminuser.png?alt=media&token=9bb9ee2d-f870-4aea-8dd1-3ad83b6d21c8",// specialize
                null// profilePic
        );

        try {
            userService.createAdmin(adminUser);
        } catch (UserAlreadyExistsException e) {
            // Log the exception and continue
            System.err.println("Admin user already exists: " + e.getMessage());
        }
    }


}