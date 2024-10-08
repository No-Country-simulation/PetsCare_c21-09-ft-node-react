package com.backend.server.security.config.filter;
import com.backend.server.security.entity.Usuario;
import com.backend.server.security.repository.UsuarioRepository;
import com.backend.server.security.service.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;
import java.util.Optional;


@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final static Logger log = LogManager.getLogger(JwtAuthenticationFilter.class);


    @Autowired
    private JwtService jwtService;

    @Autowired
    private UsuarioRepository usuarioRepository;

    private final UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request, @NonNull HttpServletResponse response, @NonNull FilterChain filterChain) throws ServletException, IOException {

        final String authHeader = request.getHeader("Authorization");

        // Verificar si el encabezado contiene el token JWT
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        String jwt = authHeader.substring(7);

        log.info("dentro de doFilter se obtiene este jwt: " + jwt);

        // Extraer el email desde el token JWT
        String email = jwtService.extractEmail(jwt);
        log.info(email);

        // Verificar si el email es válido y si no hay autenticación en el contexto actual
        if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {

            Optional<Usuario> usuarioA = usuarioRepository.findByEmail(email);

            // Asegurarse de que el usuario existe en la base de datos
            if (usuarioA.isPresent()) {
                Usuario usuario = usuarioA.get();
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        usuario, null, usuario.getAuthorities()
                );

                log.info(usuario.getAuthorities());

                // Establecer el contexto de seguridad
                SecurityContextHolder.getContext().setAuthentication(authToken);
            } else {
                log.warn("Usuario no encontrado para el email: " + email);
                SecurityContextHolder.clearContext();
            }
        }

        filterChain.doFilter(request, response);
    }

}
