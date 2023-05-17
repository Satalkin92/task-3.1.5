package ru.kata.spring.boot_security.demo.configs;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import ru.kata.spring.boot_security.demo.dao.UserRepository;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;

import javax.annotation.PostConstruct;
import java.util.*;

@Component
public class DataInitializer {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public DataInitializer(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostConstruct
    public void initUser() {
        User userAdmin = new User("admin", "admin", 30, "100", "100");
        Set<Role> role = new HashSet<>();
        role.add(new Role("ROLE_ADMIN"));
        userAdmin.setRoles(role);
        userAdmin.setPassword(passwordEncoder.encode(userAdmin.getPassword()));

        User userUser = new User("user", "user", 30, "200", "200");
        Set<Role> role1 = new HashSet<>();
        role1.add(new Role("ROLE_USER"));
        userUser.setRoles(role1);
        userUser.setPassword(passwordEncoder.encode(userUser.getPassword()));

        userRepository.save(userAdmin);
        userRepository.save(userUser);
    }

}





