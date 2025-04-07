package org.example.handiblog_back.Repository;

import org.example.handiblog_back.Models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

public interface UserRepository extends JpaRepository<User, Long> {

    User findUserByEmail(String email);
    @Modifying
    @Transactional
    @Query("UPDATE User u SET u.specialite = :specialite WHERE u.email = :email")
    User updateSpecialiteByEmail(String email, String specialite);

    @Query("SELECT u.id FROM User u where u.email = :email")
     int findIdByEmail(String email);

}
