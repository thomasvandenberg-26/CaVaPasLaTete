package com.cvplt.cvpltbackend.Controllers;


import com.cvplt.cvpltbackend.Models.User;
import com.cvplt.cvpltbackend.Repository.UserRepository;
import com.cvplt.cvpltbackend.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

// ajouter plusieurs endpoints entre l'utilisateur que j'ai créer dans
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    private UserService userService  ;
    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;

    public UserController(UserService userService, UserRepository userRepository) {
        this.userService = userService;
        this.userRepository = userRepository;
    }

    @PostMapping("/create")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        User savedUser = userService.createUser(user);
        if (savedUser == null) {
            // il existe 
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("Un compte existe déjà avec cet email");
        }
        savedUser.setPassword(null);
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
    @PatchMapping("/update/")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity updateUserProperties(@RequestBody User pUser)
    {

        Optional<User> user = Optional.ofNullable(userRepository.findUserById(pUser.getId()));
        if(user.isEmpty())
        {
            return ResponseEntity.notFound().build();
        }

        // Quels modifications faire
        User userExisteDeja = user.get();
        String propertiesModifie = "l'utilisateur id : " + pUser.getId() + " a bien été modifié : ";
        if (pUser.getNom() != null && !pUser.getNom().isEmpty())
        {
            userExisteDeja.setNom(pUser.getNom());
           propertiesModifie += "nom, ";
        }
        if (pUser.getPrenom() != null && !pUser.getPrenom().isEmpty())
        {
            userExisteDeja.setPrenom(pUser.getPrenom());
            propertiesModifie += "prenom, ";
        }
        if (pUser.getEmail() != null && !pUser.getEmail().isEmpty()){
            userExisteDeja.setEmail(pUser.getEmail());
            propertiesModifie += "email, ";
        }
        if (pUser.getSpecialite() != null && !pUser.getSpecialite().isEmpty()){
            userExisteDeja.setSpecialite(pUser.getSpecialite());
            propertiesModifie += "specialite, ";

        }
        userRepository.save(userExisteDeja);

        return ResponseEntity.ok(propertiesModifie);
    }
    @GetMapping("user/{email}")
    public int getUserId(@PathVariable String email)
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
