package com.backend.server.entity;

import com.backend.server.security.entity.Usuario;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Reserva {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long idReserva;

    private LocalDate fechaReserva;

    @ManyToOne
    @JoinColumn(name = "idUsuarioReserva")
    private Usuario usuarioQueReserva;

    @ManyToMany
    @JoinTable(
            name = "reserva_turnos",
            joinColumns = @JoinColumn(name = "idReserva"),
            inverseJoinColumns = @JoinColumn(name = "idTurno")
    )
    private List<Turno> turnos;



    @ManyToOne
    @JoinColumn(name = "idUsuarioPrestaServicio")
    private Usuario prestadorServicio;

    @ManyToOne
    @JoinColumn(name = "idMascota")
    private Mascota mascotaReserva;


    @Transient // se obtiene el servicio del turno
    private Servicio servicio;


    public Servicio getServicio() {
        if (this.turnos != null && !this.turnos.isEmpty()) {
            return this.turnos.get(0).getServicio(); // Tomar el servicio del primer turno
        }
        return null;
    }
}
