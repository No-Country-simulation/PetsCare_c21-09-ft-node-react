package com.backend.server.entity;
import com.backend.server.security.entity.Usuario;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Servicio {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long idServicio;

    private String nombreServicio;

    private boolean lugarFisico;

    private boolean voyAlLugar;

    private String observacion;

    private String pais;
    private String provincia;
    private String estadoDepartamento;
    private String direccion;


    @ManyToOne
    @JoinColumn(name = "idUsuario")
    @JsonIgnore
    private Usuario prestadorServicio;

    @OneToMany(mappedBy = "servicio", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Turno> turnosDisponibles = new ArrayList<>();


}
