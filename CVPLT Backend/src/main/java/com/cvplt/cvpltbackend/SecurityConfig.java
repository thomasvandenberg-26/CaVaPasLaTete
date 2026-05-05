package com.cvplt.cvpltbackend;

import com.cvplt.cvpltbackend.Models.User;
import com.cvplt.cvpltbackend.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final UserRepository userRepository;
    public SecurityConfig(UserRepository userRepository)
    {
        this.userRepository = userRepository;
    }
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // Désactive CSRF uniquement si ce n'est pas nécessaire
                .cors(cors -> cors.configure(http)) // Configure le CORS
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/users/create").permitAll()
                        .requestMatchers("/api/users/login").permitAll()
                        .anyRequest().authenticated() // Permet toutes les requêtes pour l'instant
                ).httpBasic(withDefaults());
        return http.build();
    }

    // @formatter:off
    @Bean
    public UserDetailsService userDetailsService() {
        return email -> {
            User user = userRepository.findUserByEmail(email);
            if (user == null) {
                throw new UsernameNotFoundException("Utilisateur non trouvé : " + email);
            }
            return  org.springframework.security.core.userdetails.User.withUsername(user.getEmail())
                    .password(user.getPassword())
                    .roles("USER")
                    .build();
        };

    }
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    // @formatter:on

}
