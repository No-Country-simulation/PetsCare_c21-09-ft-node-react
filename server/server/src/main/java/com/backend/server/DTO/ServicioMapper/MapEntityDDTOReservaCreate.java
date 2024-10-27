package com.backend.server.DTO.ServicioMapper;

import com.backend.server.DTO.ReservaDTO;
import com.backend.server.DTO.ResponseDTOReserva;
import com.backend.server.entity.Mascota;
import com.backend.server.entity.Reserva;
import com.backend.server.entity.Servicio;
import com.backend.server.entity.Turno;
import com.backend.server.exceptionHandler.NotFoundException;
import com.backend.server.repository.MascotaRepository;
import com.backend.server.repository.TurnoRepository;
import com.backend.server.security.entity.Usuario;
import com.backend.server.security.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class MapEntityDDTOReservaCreate {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private MascotaRepository mascotaRepository;

    @Autowired
    private TurnoRepository turnoRepository;

    //Metodo para mapear el DTO de la reserva que manda al usuario a las entidades correspondientes de la base de datos
    public Reserva convertToEntity(ReservaDTO reservaDTO) {
        Reserva reserva = new Reserva();


        reserva.setFechaReserva(reservaDTO.getFechaReserva());


        Usuario usuario = usuarioRepository.findById(reservaDTO.getIdUsuarioQueReserva())
                .orElseThrow(() -> new NotFoundException("Usuario no encontrado con ID: " + reservaDTO.getIdUsuarioQueReserva()));
        reserva.setUsuarioQueReserva(usuario);

        Usuario prestador = usuarioRepository.findById(reservaDTO.getIdPrestadorServicio())
                .orElseThrow(() -> new NotFoundException("Prestador de servicio no encontrado con ID: " + reservaDTO.getIdPrestadorServicio()));
        reserva.setPrestadorServicio(prestador);

        if (reservaDTO.getIdMascota() != null) {
            Mascota mascota = mascotaRepository.findById(reservaDTO.getIdMascota())
                    .orElseThrow(() -> new NotFoundException("Mascota no encontrada con ID: " + reservaDTO.getIdMascota()));
            reserva.setMascotaReserva(mascota);
        }

        List<Turno> turnos = reservaDTO.getIdTurnos().stream()
                .map(id -> turnoRepository.findById(id)
                        .orElseThrow(() -> new NotFoundException("Turno no encontrado con ID: " + id)))
                .collect(Collectors.toList());

        reserva.setTurnos(turnos);

        return reserva;
    }


//    Metodo para usar luego que se realiza la reserva, que convierta esos datos en
//    una respuesta para ser enviada a ambos usuarios

    public ResponseDTOReserva convertToResponseDTOReserva(Reserva reserva) {

        ResponseDTOReserva responseDTO = new ResponseDTOReserva();
        responseDTO.setIdReserva(reserva.getIdReserva());


        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        String fechaReserva = reserva.getFechaReserva().format(formatter);
        responseDTO.setFechaReserva(fechaReserva);

        // usuario que realiza la reserva
        responseDTO.setNombreUsuarioQueReserva(reserva.getUsuarioQueReserva().getName() + " " + reserva.getUsuarioQueReserva().getLastName());
        responseDTO.setEmailUsuarioQueReserva(reserva.getUsuarioQueReserva().getEmail());

        //  prestador de servicio
        responseDTO.setNombrePrestadorServicio(reserva.getPrestadorServicio().getName() + " " + reserva.getPrestadorServicio().getLastName());
        responseDTO.setEmailPrestadorServicio(reserva.getPrestadorServicio().getEmail());
        responseDTO.setNumeroTelefonicoPrestadorServicio(reserva.getPrestadorServicio().getPhone());

        // Datos del servicio
        Servicio servicio = reserva.getServicio();
        if (servicio != null) {
            responseDTO.setTipoServicio(servicio.getNombreServicio());
        }

        // mascota
        if (reserva.getMascotaReserva() != null) {
            responseDTO.setNombreMascota(reserva.getMascotaReserva().getName());
            responseDTO.setEspecieMascota(reserva.getMascotaReserva().getSpecies());
        }

        List<String> turnosDetalles = reserva.getTurnos().stream()
                .map(turno -> "Fecha: " + turno.getFechaTurno() + " Hora: " + turno.getHoraTurno())
                .collect(Collectors.toList());
        responseDTO.setTurnosDetalles(turnosDetalles);

        return responseDTO;
    }

}
