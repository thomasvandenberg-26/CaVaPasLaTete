package org.example.handiblog_back.Controllers;


import org.example.handiblog_back.Models.User;
import org.example.handiblog_back.Repository.UserRepository;
import org.example.handiblog_back.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/create")
    public ResponseEntity<User> registerUser(@RequestBody User user)
    {
        logger.info("Données reçues : {}", user.getNom() + " " + user.getPrenom() + " " + user.getEmail() + " " + user.getType());
        User savedUser = userService.createUser(user);
       return ResponseEntity.ok(savedUser);
    }
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user)
    { logger.info("backend test login " + user.getEmail());
        User connectedUser = userService.authenticate(user.getEmail(), user.getPassword());
        if(connectedUser != null)
        {
            return ResponseEntity.ok(connectedUser);
        }
        else{
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Email ou mot de passe incorrect");
        }
    }
    @PostMapping("/update")
    public User updateUserSpecialite(@RequestBody User user)
    {
        return userService.userUpdate(user.getEmail(), user.getPassword());
    }
    @GetMapping("user/id")
    public int getUserId(String email)
    {
        return userService.getUserId(email);
    }

    @GetMapping("{id}/getFirstName")
    public String getUserFirstName(@PathVariable int id )
    {
        return userRepository.findUserFirstNameById(id);
    }
    @GetMapping("{id}/getLastName")
    public String getUserLastName(@PathVariable int id )
    {
        return userRepository.findUserLastNameById(id);
    }
}
