package com.backend.server.service.serviceReserva;
import com.backend.server.DTO.VerReservasDTO;
import com.backend.server.entity.Reserva;
import com.backend.server.entity.Turno;
import com.backend.server.security.entity.Usuario;
import java.util.List;
import java.util.Optional;

public interface ReservaServiceInterface {

    List<Reserva> getAllReservas();

    Optional<Reserva> getReservaById(Long idReserva);

    Reserva createReserva(Reserva reserva);

    void deleteReserva(Long idReserva);

    List<VerReservasDTO> getReservasByUsuario(Usuario usuario);

    List<VerReservasDTO> getReservasByPrestador(Usuario prestadorServicio);

    List<Reserva> getReservasByTurno(Turno turno);

}
