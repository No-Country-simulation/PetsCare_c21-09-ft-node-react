package com.backend.server.repository;

import com.backend.server.entity.Reserva;
import com.backend.server.entity.Turno;
import com.backend.server.security.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReservaRepository extends JpaRepository<Reserva, Long> {

    List<Reserva> findByUsuarioQueReserva(Usuario usuario);
    List<Reserva> findByPrestadorServicio(Usuario prestadorServicio);
    List<Reserva> findByTurnos(Turno turno);
}
