package com.cvplt.cvpltbackend.Repository;

import com.cvplt.cvpltbackend.Models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface UserRepository extends JpaRepository<User, Long> {

    User findUserByEmail(String email);
    @Modifying
    @Transactional
    @Query("UPDATE User u SET u.specialite = :specialite WHERE u.email = :email")
    User updateSpecialiteByEmail(String email, String specialite);

    @Query("SELECT u.id FROM User u where u.email = :email")
     int findIdByEmail(String email);

    @Query("SELECT u.prenom FROM User u where u.id = :id ")
     String findUserFirstNameById(@Param("id") int id);

    @Query("SELECT u.nom FROM User u where u.id = :id ")
    String findUserLastNameById(@Param("id") int id);


}
