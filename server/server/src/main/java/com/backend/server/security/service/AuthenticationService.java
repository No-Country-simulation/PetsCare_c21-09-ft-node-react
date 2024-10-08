package com.backend.server.security.service;
import com.backend.server.security.dto.AuthenticationRequest;
import com.backend.server.security.dto.AuthenticationResponse;
import com.backend.server.security.entity.Usuario;
import com.backend.server.security.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class AuthenticationService {

  @Autowired
  private AuthenticationManager authenticationManager;

  @Autowired
  private UsuarioRepository usuarioRepository;

  @Autowired
  private JwtService jwtService;

    public AuthenticationResponse login(AuthenticationRequest authRequest) {

        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                authRequest.getEmail(), authRequest.getPassword()

        );

        authenticationManager.authenticate(authToken);


        Usuario usuario = usuarioRepository.findByEmail(authRequest.getEmail()).get();

        String jwt = jwtService.generateToken(usuario, (Map<String, Object>) generateExtraClaims(usuario));

        return  new AuthenticationResponse(jwt);


    }

    private Object generateExtraClaims(Usuario usuario) {

        Map<String, Object> extraClaims = new HashMap<>();


        extraClaims.put("sub", usuario.getUsername());
        extraClaims.put("email", usuario.getEmail());
        extraClaims.put("idUser", usuario.getIdUsuario());
        extraClaims.put("role", usuario.getRole().name());
        extraClaims.put("permissions", usuario.getAuthorities());

        return extraClaims;
    }
}
