package ru.kata.spring.boot_security.demo.service;

import ru.kata.spring.boot_security.demo.model.User;

import java.util.List;
import java.util.Optional;

public interface UserService {

    Optional<User> findUserByUsername(String username);

    void addUser(User user);

    void updateUser(Long id, User user);

    void deleteUser(Long id);

    User getUser(Long id);

    List<User> getUsers();

}
