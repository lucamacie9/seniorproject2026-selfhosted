package com.transfercreditmatch.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    // In-memory user details for testing
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.inMemoryAuthentication()
            .withUser("adminUser").password("{noop}adminPass").roles("ADMIN")
            .and()
            .withUser("directorUser").password("{noop}directorPass").roles("DIRECTOR")
            .and()
            .withUser("studentUser").password("{noop}studentPass").roles("STUDENT");
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .csrf().disable()
            .authorizeRequests()
                // Open authentication endpoints
                .antMatchers("/api/auth/**").permitAll()
                // Allow institutions, programs, and knowledge_units to be accessed by everyone
                .antMatchers("/api/institutions/**", "/api/programs/**", "/api/knowledge_units/**").permitAll()
                // Restrict course endpoints to ADMIN and DIRECTOR only
                .antMatchers("/api/courses/**").hasAnyRole("ADMIN", "DIRECTOR")
                // Restrict DELETE operations on user endpoints to ADMIN and DIRECTOR only
                .antMatchers(HttpMethod.DELETE, "/api/users/**").hasAnyRole("ADMIN", "DIRECTOR")
                // All other endpoints require authentication
                .anyRequest().authenticated()
            .and()
            // Use HTTP Basic for testing purposes
            .httpBasic();
    }
}
