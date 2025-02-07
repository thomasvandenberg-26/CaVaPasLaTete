package org.example.handiblog_back.Repository;

import org.example.handiblog_back.Models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    User findUserByEmail(String email);
}
