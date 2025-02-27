package com.transfercreditmatch.controllers;

import com.transfercreditmatch.dto.LoginRequest;
import com.transfercreditmatch.dto.RegisterRequest;
import com.transfercreditmatch.entities.User;
import com.transfercreditmatch.services.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        try {
            User newUser = authService.register(
                request.getName(),
                request.getEmail(),
                request.getPassword(),
                request.getRole().toUpperCase()  // if your enum is uppercase
            );
            return ResponseEntity.ok("User registered with ID: " + newUser.getUserId());
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            User user = authService.login(request.getEmail(), request.getPassword());
            return ResponseEntity.ok("Login successful for user: " 
                    + user.getName() 
                    + " with role: " + user.getRole());
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
