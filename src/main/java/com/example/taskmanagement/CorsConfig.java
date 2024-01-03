package com.example.taskmanagement;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                        .allowedOrigins("http://localhost:5173") // Adjust as needed
                        .allowedMethods("GET", "POST", "PUT", "DELETE")
                        .allowCredentials(true) // Include if you're dealing with cookies or sessions
                        .maxAge(3600); // Cache preflight requests for 1 hour, adjust as needed
            }
        };
    }
}
