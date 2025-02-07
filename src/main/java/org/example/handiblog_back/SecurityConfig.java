package org.example.handiblog_back;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // Désactive CSRF uniquement si ce n'est pas nécessaire
                .cors(cors -> cors.configure(http)) // Configure le CORS
                .authorizeHttpRequests(auth -> auth
                        .anyRequest().permitAll() // Permet toutes les requêtes pour l'instant
                );

        return http.build();
    }
}
