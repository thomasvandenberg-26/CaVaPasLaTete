package org.example.handiblog_back.Controllers;


import org.example.handiblog_back.Models.User;
import org.example.handiblog_back.Repository.UserRepository;
import org.example.handiblog_back.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);
    @Autowired
    private UserService userService  ;

     @PostMapping("/create")
    public ResponseEntity<User> registerUser(@RequestBody User user)
    {
        logger.info("Données reçues : {}", user.getNom() + " " + user.getPrenom() + " " + user.getEmail() + " " + user.getType());
        User savedUser = userService.createUser(user);
       return ResponseEntity.ok(savedUser);
    }
    @PostMapping("/login")
    public boolean login(@RequestBody User user)
    {
        return userService.authenticate(user.getEmail(), user.getPassword());
    }
    @PostMapping("/update")
    public User updateUserSpecialite(@RequestBody User user)
    {
        return userService.userUpdate(user.getEmail(), user.getPassword());
    }
}
