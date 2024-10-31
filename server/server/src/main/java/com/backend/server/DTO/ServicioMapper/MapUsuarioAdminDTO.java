package com.backend.server.DTO.ServicioMapper;

import com.backend.server.DTO.DTOUsuarioAdmin;
import com.backend.server.security.entity.Usuario;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class MapUsuarioAdminDTO {
    public List<DTOUsuarioAdmin> convertEntityToDTO(List<Usuario> listaUsuarios) {
        return listaUsuarios.stream()
                .map(usuario -> new DTOUsuarioAdmin(
                        usuario.getIdUsuario(),
                        usuario.getName(),
                        usuario.getLastName(),
                        usuario.getUsername(),
                        usuario.getEmail(),
                        usuario.getPhone(),
                        usuario.getDireccion(),
                        usuario.isCuentaBloqueada(),
                        usuario.isUsuarioVerificado(),
                        usuario.getRole()
                ))
                .collect(Collectors.toList());
    }
}
