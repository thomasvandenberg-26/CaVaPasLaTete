package org.example.handiblog_back.Models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Enumerated(EnumType.STRING)
    @Getter
    private Type type;
    @Getter
    private String prenom;

    @Setter
    @Getter
    private String nom;

    @Getter
    @Setter
    private String email;

    @Getter
    @Setter
    private String password;


    public User( Type type,String prenom , String nom, String email ,String password) {
        this.type = type;
        this.email = email;
        this.prenom = prenom;
        this.nom = nom;
        this.password = password;

    }

    public User(){

    }

    public User(String email, String prenom, String nom, String password) {
    }


}
