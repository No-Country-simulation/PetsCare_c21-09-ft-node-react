package com.backend.server.DTO;

import com.backend.server.security.util.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DTOUsuarioAdmin {
    private Long idUsuario;
    private String name;
    private String lastName;
    private String username;
    private String email;
    private String phone;
    private String direccion;
    private boolean cuentaBloqueada;
    private boolean usuarioVerificado;
    private Role role;
}
