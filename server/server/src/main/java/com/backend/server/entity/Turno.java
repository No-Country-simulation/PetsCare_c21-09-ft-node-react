package com.backend.server.entity;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


import java.time.LocalDate;
import java.time.LocalTime;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Turno {

   @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long idTurno;

    private LocalDate fechaTurno;

    private LocalTime horaTurno;

    private boolean reservadoTurno;


    @ManyToOne
    @JoinColumn(name = "idServicio")
    @JsonBackReference
    private Servicio servicio;




}
