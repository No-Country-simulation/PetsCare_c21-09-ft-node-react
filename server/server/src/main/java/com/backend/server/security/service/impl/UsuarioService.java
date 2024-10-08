package com.backend.server.security.service.impl;
import com.backend.server.security.dto.UsuarioDTO;
import com.backend.server.security.entity.Usuario;
import com.backend.server.security.repository.UsuarioRepository;
import com.backend.server.security.service.UsuarioServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService implements UsuarioServiceInterface {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Override
    public List<Usuario> getUsuarios() {
        List<Usuario> listaUsuarios = usuarioRepository.findAll();
        return listaUsuarios;
    }

    @Override
    public Usuario save(Usuario usuario) {
        if (usuario.getIdUsuario() != null && usuarioRepository.existsById(usuario.getIdUsuario())) {
            return usuarioRepository.save(usuario);
        } else {
            // Si el usuario no tiene ID o no existe en la base de datos, guarda un nuevo registro
            return usuarioRepository.saveAndFlush(usuario);
        }
    }

    @Override
    public Usuario updateUsuarioData(Usuario usuario) {
        if (usuario.getIdUsuario() != null && usuarioRepository.existsById(usuario.getIdUsuario())) {
            return usuarioRepository.save(usuario);
        } else {
            throw new RuntimeException("Usuario no encontrado o ID no válido");
        }
    }


    @Override
    public void deleteUsuario(Long id) {
        usuarioRepository.deleteById(id);
    }

    @Override
    public Optional<Usuario> findUsuario(Long id) {
        try {
            return usuarioRepository.findById(id);
        } catch (Exception e) {

            e.printStackTrace();


            return Optional.empty();
        }
    }

    @Override
    public Optional<Usuario> findByUsername(String username) {
        return usuarioRepository.findByUsername(username);
    }

    @Override
    public Optional<Usuario> findByEmail(String email) {
      try { return usuarioRepository.findByEmail(email);
      }catch (Exception e){throw new RuntimeException(e.getMessage());
    }
}

    @Override
    public Optional<UsuarioDTO> findByEmailDTO(String email) {
        return Optional.empty();
    }


}
