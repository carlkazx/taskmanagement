package com.example.taskmanagement.user;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Optional;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @GetMapping("/1") // Assuming you want to get the profile of user with ID 1
    public User getUserProfile() {
        // For simplicity, let's create a dummy user
        User dummyUser = new User();
        dummyUser.setId(1L);
        dummyUser.setName("John Doe");
        dummyUser.setEmail("john.doe@example.com");
        return dummyUser;
    }
}

