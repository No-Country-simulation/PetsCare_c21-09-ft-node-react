package com.backend.server.security.controller;
import com.backend.server.security.dto.UsuarioDTO;
import com.backend.server.security.entity.Usuario;
import com.backend.server.security.service.UsuarioServiceInterface;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;


@RestController
@RequestMapping("api/usuario")
@CrossOrigin(origins = "*")
public class UsuarioController {

    @Autowired
    private UsuarioServiceInterface usuarioServiceInterface;

//    Metodo controller para traer el usuario siendo comerciante

    @GetMapping("/by-email/{email}")
    public ResponseEntity<?> findUsuarioByEmail(@PathVariable String email) {
        // Buscar el usuario utilizando el servicio
        Optional<UsuarioDTO> usuarioDTOOpt = usuarioServiceInterface.findByEmailDTO(email);

        // Verificar si se encontró el usuario y devolver la respuesta adecuada
        if (usuarioDTOOpt.isPresent()) {
            // Usuario encontrado, devolver el DTO con un código de estado 200 OK
            return ResponseEntity.ok(usuarioDTOOpt.get());
        } else {
            // Usuario no encontrado, devolver un mensaje de error con un código de estado 404 Not Found
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Usuario no encontrado con email: " + email);
        }
    }

    @GetMapping("/traertodos")
    public ResponseEntity<?> getUsuarios() {
        // Verificar si el usuario está autenticado
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated() || authentication instanceof AnonymousAuthenticationToken) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuario no autenticado");
        }

        // Si está autenticado, proceder con la operación
        return ResponseEntity.ok(usuarioServiceInterface.getUsuarios());
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteUsuario(@PathVariable String id) {
        // Verificar si el usuario está autenticado
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated() || authentication instanceof AnonymousAuthenticationToken) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuario no autenticado");
        }

        // Si está autenticado, proceder con la operación
        if (usuarioServiceInterface.findUsuario(Long.parseLong(id)).isPresent()) {
            usuarioServiceInterface.deleteUsuario(Long.parseLong(id));
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Usuario id:" + id + " Eliminado");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se ha encontrado el elemento a eliminar");
        }
    }

    @PutMapping("/admin/update")
    public ResponseEntity<?> updateUsuario(@RequestBody Usuario usuario) {
        // Verificar si el usuario está autenticado
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated() || authentication instanceof AnonymousAuthenticationToken) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuario no autenticado");
        }

        try {
            Usuario updatedUsuario = usuarioServiceInterface.updateUsuarioData(usuario);
            return ResponseEntity.ok(updatedUsuario);
        } catch (RuntimeException e) {
            // Si se lanza una excepción debido a que el usuario no existe o el ID no es válido
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario no encontrado o ID no válido.");
        } catch (Exception e) {
            // Para cualquier otro tipo de error, como problemas en la base de datos, etc.
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al actualizar los datos del usuario.");
        }
    }

    @GetMapping("/traer/{id}")
    public ResponseEntity<?> findUsuario(@PathVariable(name = "id") String id) {
        // Verificar si el usuario está autenticado
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated() || authentication instanceof AnonymousAuthenticationToken) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuario no autenticado");
        }

        // Si está autenticado, proceder con la operación
        Usuario usuario = usuarioServiceInterface.findUsuario(Long.parseLong(id)).orElse(null);
        return ResponseEntity.ok(usuario);
    }
}

