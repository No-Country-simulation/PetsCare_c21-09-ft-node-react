package com.backend.server.security.entity;
import com.backend.server.ServicioPackage.Servicio;
import com.backend.server.TurnoPackage.Turno;
import com.backend.server.security.util.Role;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Usuario implements UserDetails {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long idUsuario;
    private String name;
    private String lastName;
    @Column(unique = true)
    private String username;
    @Column(unique = true)
    private String email;
    private String phone;
    private String direccion;
    private String password;

//Para luego darle uso a estos atributos, faltan esas clases
//
//    private List<Mascota> misMascotas;
//
//    private List<Reserva> misReservasHechas;
//
//    private List<Reserva> misServiciosReservados;

    private List<Turno> misTurnosDisponibles;

    private List<Servicio> misServiciosOfrecidos;

    private String codigoVerificacion;

    private Integer intentosVerificacion;

    private Boolean cuentaBloqueada;


    private String codigoSetPassword;

    private boolean habilitadoCambiarPassword;

    private boolean usuarioVerificado;

    @Enumerated(EnumType.STRING)
    private Role role;



//Implementaciones de user details


    @JsonIgnore
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority("ROLE_" + role.name()));

        // Agrega roles adicionales según sea necesario
        if (role == Role.ADMINISTRADOR) {
            authorities.add(new SimpleGrantedAuthority("ROLE_USUARIO"));
            authorities.add(new SimpleGrantedAuthority("ROLE_PRESTADORSERVICIO"));
        } if (role == Role.PRESTADORSERVICIO) {
            authorities.add(new SimpleGrantedAuthority("ROLE_USUARIO"));
        }

        return authorities;
    }



    @Override
    public String getPassword() {
        return password;
    }


    @Override
    public String getUsername() {
        return username;
    }


    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return !cuentaBloqueada;
    }

    @Override
    public boolean isEnabled() {
        return !cuentaBloqueada;
    }


    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }


}
