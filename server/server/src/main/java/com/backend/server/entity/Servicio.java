package com.backend.server.entity;
import com.backend.server.security.entity.Usuario;
import com.backend.server.util.EnumNombreServicio;
import com.fasterxml.jackson.annotation.*;
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
@JsonIgnoreProperties({"prestadorServicio"})
public class Servicio {

   @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long idServicio;

    private String nombreComercio;

    @Enumerated(EnumType.STRING)
    private EnumNombreServicio nombreServicio;

    private boolean lugarFisico;

    private boolean voyAlLugar;

    private String observacion;

    private String pais;
    private String provincia;
    private String estadoDepartamento;
    private String direccion;

    private String imagenServicio;

    private double latitud;
    private double longitud;


    @OneToOne
    @JoinColumn(name = "idUsuario", referencedColumnName = "idUsuario")
    @JsonBackReference
    private Usuario prestadorServicio;

    @OneToMany(mappedBy = "servicio", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Turno> turnosDisponibles = new ArrayList<>();


}
