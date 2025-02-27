package com.transfercreditmatch.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

/**
 * A minimal security configuration that allows all requests without requiring authentication.
 * Keeping the "spring-boot-starter-security" dependency in our pom.xml, but this config
 * overrides default security so we can test endpoints with no login.
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            // Disable CSRF if you're not using form submissions
            .csrf().disable()

            // Authorize all requests without authentication
            .authorizeRequests()
            .anyRequest().permitAll()

            // Disable HTTP Basic or any other login prompt
            .and()
            .httpBasic().disable();
    }
}
