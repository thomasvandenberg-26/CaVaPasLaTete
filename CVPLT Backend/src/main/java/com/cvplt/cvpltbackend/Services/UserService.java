package com.cvplt.cvpltbackend.Services;

import com.cvplt.cvpltbackend.Models.User;
import com.cvplt.cvpltbackend.Repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.DigestUtils;

@Service
public class UserService {
    private static final Logger log = LoggerFactory.getLogger(UserService.class);
    @Autowired
    private UserRepository userRepository;

    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
    private User savedUser;
    public User createUser ( User user){
        String email = user.getEmail();

    String pwdMd5 = DigestUtils.md5DigestAsHex(user.getPassword().getBytes());
    String bcryptPwd = encoder.encode(user.getPassword());
    if(userRepository.findUserByEmail(email) == null){}
        {  savedUser = userRepository.save(new User( user.getType(), user.getPrenom(),user.getNom(),user.getEmail(),bcryptPwd));
            log.info( "Create User : données recues : " + user.getEmail() + "; " );
        }
       return savedUser;
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
    public User userUpdate(String email, String specialite)
    {
        return userRepository.updateSpecialiteByEmail(email, specialite);
    }
    public int getUserId(String email)
    {
        return userRepository.findIdByEmail(email);
    }
}

