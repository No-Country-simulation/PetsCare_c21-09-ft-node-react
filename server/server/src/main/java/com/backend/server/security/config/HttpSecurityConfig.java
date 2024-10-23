package com.backend.server.security.config;
import com.backend.server.security.config.filter.JwtAuthenticationFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.stereotype.Component;
import org.springframework.web.cors.CorsConfiguration;

import java.util.List;


@Configuration
@EnableWebSecurity
@Component
public class HttpSecurityConfig {

    @Autowired
    private AuthenticationProvider authenticationProvider;

    @Autowired
    private JwtAuthenticationFilter authenticationFilter;




    @Bean
    public SecurityFilterChain securityFilterChain (HttpSecurity http) throws Exception {

        http
                .cors(cors -> cors.configurationSource(request -> {
                    CorsConfiguration config = new CorsConfiguration();
                    config.setAllowedOrigins(List.of("http://localhost:5173"));
                    config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
                    config.setAllowedHeaders(List.of("*"));
                    config.setAllowCredentials(true);
                    return config;
                }))
                .csrf( csrfConfig -> csrfConfig.disable())
                .sessionManagement(sessionMangConfig -> sessionMangConfig.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authenticationProvider)
                .authorizeHttpRequests( authConfig ->{
//                    authConfig.requestMatchers("/error").permitAll();
                    authConfig.requestMatchers(
                            "/swagger-ui.html",
                            "/swagger-ui/**",
                            "/v3/api-docs/**",
                            "/v3/api-docs.yaml",
                            "/v3/api-docs.json",
                            "/swagger-resources/**",
                            "/webjars/**"
                    ).permitAll();
                    authConfig.requestMatchers(HttpMethod.OPTIONS, "/**").permitAll();
                    authConfig.requestMatchers(HttpMethod.POST, "/api/auth/**").permitAll();
                    authConfig.requestMatchers(HttpMethod.POST, "/api/mail/sendemail").permitAll();
                    authConfig.requestMatchers(HttpMethod.POST, "/api/mail/sendverifyemail").permitAll();
                    authConfig.requestMatchers(HttpMethod.POST, "/api/auth/login").permitAll();

                    authConfig.requestMatchers(HttpMethod.GET, "/api/mascotas/listar").permitAll();
                    authConfig.requestMatchers(HttpMethod.GET, "/api/mascotas/buscar/{id}").permitAll();
                    authConfig.requestMatchers(HttpMethod.GET, "/api/mascotas/usuario/{userId}").hasRole("USUARIO");

                    authConfig.requestMatchers(HttpMethod.POST, "/api/mascotas/agregar").hasRole("USUARIO");

                    authConfig.requestMatchers(HttpMethod.DELETE, "/api/mascotas/eliminar/{id}").hasRole("USUARIO");


                    authConfig.requestMatchers(HttpMethod.GET, "/api/servicios/allservicios").permitAll();
                    authConfig.requestMatchers(HttpMethod.GET, "/api/servicios/buscar/**").permitAll();
                    authConfig.requestMatchers(HttpMethod.POST, "/api/servicios/crearservicio").hasRole("PRESTADORSERVICIO");
                    authConfig.requestMatchers(HttpMethod.PUT, "/api/servicios/modificar/{id}").hasRole("PRESTADORSERVICIO");
                    authConfig.requestMatchers(HttpMethod.DELETE, "/api/servicios/eliminar/{id}").hasRole("PRESTADORSERVICIO");
                    authConfig.requestMatchers(HttpMethod.GET, "/api/servicios/buscarpornombreservicioyfecha").permitAll();
                    authConfig.requestMatchers(HttpMethod.GET, "/api/servicios/usuario/**").permitAll();


                    authConfig.requestMatchers(HttpMethod.GET, "/api/turnos/todos").permitAll();
                    authConfig.requestMatchers(HttpMethod.GET, "/api/turnos/{idTurno}").permitAll();
                    authConfig.requestMatchers(HttpMethod.GET, "/api/turnos/fecha/{fechaTurno}").permitAll();
                    authConfig.requestMatchers(HttpMethod.GET, "/api/turnos/servicio/**").hasRole("USUARIO");
                    authConfig.requestMatchers(HttpMethod.GET, "/api/turnos/disponibles").hasRole("USUARIO");
                    authConfig.requestMatchers(HttpMethod.GET, "/api/turnos/disponibles/servicio/**").hasRole("USUARIO");
                    authConfig.requestMatchers(HttpMethod.GET, "/api/turnos/disponibles/servicio/{idServicio}/fecha/{fechaTurno}/hora/{horaTurno}").hasRole("USUARIO");
                    authConfig.requestMatchers(HttpMethod.POST, "/api/turnos/agregarturnos").hasRole("PRESTADORSERVICIO");
                    authConfig.requestMatchers(HttpMethod.DELETE, "/api/turnos/delete/{idTurno}").hasRole("PRESTADORSERVICIO");

                    authConfig.requestMatchers(HttpMethod.POST, "/api/reserva/nueva").hasRole("USUARIO");


                    authConfig.requestMatchers(HttpMethod.PUT, "/api/usuario/admin/update").hasRole("ADMINISTRADOR");
                    authConfig.requestMatchers(HttpMethod.GET, "/api/usuario/**").hasRole("ADMINISTRADOR");
                    authConfig.requestMatchers(HttpMethod.DELETE, "/api/usuario/**").hasRole("ADMINISTRADOR");
                    authConfig.requestMatchers(HttpMethod.POST, "/api/auth/setpassword1").permitAll();
                    authConfig.requestMatchers(HttpMethod.POST, "/api/auth/setpassword2").permitAll();
                    authConfig.requestMatchers(HttpMethod.POST, "/api/auth/setpassword3").permitAll();

                    authConfig.anyRequest().denyAll();



                })
                .addFilterBefore(authenticationFilter, UsernamePasswordAuthenticationFilter.class);

                return http.build();
    }






}
