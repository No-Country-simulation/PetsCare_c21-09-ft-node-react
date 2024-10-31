package com.backend.server.DTO;

import com.backend.server.entity.Turno;
import com.backend.server.util.EnumNombreServicio;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ServicioCardReservaDTO {

    private Long idServicio;
    private String nombreServicio;
    private  String nombreComercio;
    private String imagenServicio;
    private boolean lugarFisico;
    private boolean voyAlLugar;
    private String observacion;
    private String pais;
    private String provincia;
    private String estadoDepartamento;
    private String direccionServicio;
    private String pricehour;
    private double latitud;
    private double longitud;


    private Long idUsuarioPrestador;
    private String name;
    private String lastName;
    private String username;
    private String email;
    private String phone;
    private String direccionUsuario;

    // lista de turnos no reservados
    private List<Turno> turnosDisponiblesNoReservados;




}
