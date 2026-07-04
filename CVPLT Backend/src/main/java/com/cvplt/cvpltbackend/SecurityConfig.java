package com.cvplt.cvpltbackend;

import com.cvplt.cvpltbackend.Models.User;
import com.cvplt.cvpltbackend.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

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
                .cors(Customizer.withDefaults()) // Configure le CORS
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
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration publicConfig = new CorsConfiguration();
        publicConfig.addAllowedOrigin("http://localhost:4200");
        publicConfig.addAllowedMethod("*");
        publicConfig.addAllowedHeader("*");
        publicConfig.setAllowCredentials(false); // pas de credentials



        CorsConfiguration privateConfig = new CorsConfiguration();
        privateConfig.addAllowedOrigin("http://localhost:4200");
        privateConfig.addAllowedMethod("*");
        privateConfig.addAllowedHeader("*");
        privateConfig.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", privateConfig);
        source.registerCorsConfiguration("/api/users/create", publicConfig);
        return source;
    }
}
