package org.example.handiblog_back.Services;

import org.example.handiblog_back.Models.User;
import org.example.handiblog_back.Repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
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

    public boolean authenticate(String email, String password)
    {
        User user = userRepository.findUserByEmail(email);
        if(user == null)
        {
            return false;
        }
        return encoder.matches(password,user.getPassword());
    }
}
