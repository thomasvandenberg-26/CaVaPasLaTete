package com.cvplt.cvpltbackend.UserDto;

import com.cvplt.cvpltbackend.Models.User;
import lombok.Getter;
import lombok.Setter;

public class UserDto {
    private Long id;

    @Setter
    @Getter
    private String prenom;
    @Setter
    @Getter
    private String nom;
    @Setter
    @Getter
    private String specialite;

    @Setter
    @Getter
    private String description;


}
