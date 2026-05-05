package com.cvplt.cvpltbackend.Services;

import com.cvplt.cvpltbackend.Models.User;
import com.cvplt.cvpltbackend.Repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.DigestUtils;

@Service
public class UserService {
    private static final Logger log = LoggerFactory.getLogger(UserService.class);
    @Autowired
    private UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private User savedUser;

    public UserService(UserRepository userRepository ,PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    public User createUser(User user) {
        // Vérifie si l'email existe déjà
        User userExistant = userRepository.findUserByEmail(user.getEmail());
        if (userExistant != null) { // il existe
            return null; // ou lancer une exception
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public User authenticate(String email, String password)
    {
        PasswordEncoder encoder = new BCryptPasswordEncoder();
        User user = userRepository.findUserByEmail(email);

        log.info("test login" + user.getEmail());
        if(encoder.matches(password,user.getPassword()))
        {
            savedUser = user;
            log.info("get nom : " + savedUser.getNom());
            log.info("mdp: success");
            
        }
        else {
            savedUser = null;

        }
        return savedUser;
    }
    public int getUserId(String email)
    {
        return userRepository.findIdByEmail(email);
    }
}

