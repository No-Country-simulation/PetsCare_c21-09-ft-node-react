package com.backend.server.entity;
import com.backend.server.security.entity.Usuario;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Mascota {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idPet;

    private String name;
    private String species;
    private String breed;
    private int age;

    @ManyToOne
    @JoinColumn(name = "idUsuario")
    private Usuario usuario;
}