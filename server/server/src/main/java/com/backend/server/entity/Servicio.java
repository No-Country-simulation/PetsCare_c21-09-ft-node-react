package com.backend.server.entity;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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


}
