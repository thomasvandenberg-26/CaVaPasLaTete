package com.cvplt.cvpltbackend.Models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Enumerated(EnumType.STRING)
    private Type type;
    private String prenom;
    private String nom;
    private String email;
    private String password;
    private String specialite;
    private String description;

    public User( Type type,String prenom , String nom, String email ,String password) {
        this.type = type;
        this.email = email;
        this.prenom = prenom;
        this.nom = nom;
        this.password = password;

    }


}
