package com.backend.server.DTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ServicioUsuarioDTO {

    private Long idServicio;
    private String nombreServicio;
    private boolean lugarFisico;
    private boolean voyAlLugar;
    private String observacion;
    private String pais;
    private String provincia;
    private String estadoDepartamento;
    private String direccionServicio;

    private Long idUsuario;
    private String name;
    private String lastName;
    private String username;
    private String email;
    private String phone;
    private String direccionUsuario;
}
