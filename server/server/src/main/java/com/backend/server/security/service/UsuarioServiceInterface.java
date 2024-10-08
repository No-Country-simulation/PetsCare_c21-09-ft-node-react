package com.backend.server.security.service;
import com.backend.server.security.dto.UsuarioDTO;
import com.backend.server.security.entity.Usuario;


import java.util.List;
import java.util.Optional;

public interface UsuarioServiceInterface {

    public List<Usuario> getUsuarios ();

    public Usuario save (Usuario usuario);

    public Usuario updateUsuarioData(Usuario usuario);

    public void deleteUsuario (Long id);

    public Optional<Usuario> findUsuario (Long id);


    Optional<Usuario> findByUsername(String username);

    public Optional<Usuario> findByEmail(String email);


    public Optional<UsuarioDTO> findByEmailDTO(String email);



}
