package com.backend.server.DTO.ServicioMapper;
import com.backend.server.DTO.VerReservasDTO;
import com.backend.server.entity.Reserva;
import com.backend.server.entity.Servicio;
import com.backend.server.entity.Turno;
import com.backend.server.repository.ServicioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
public class MapVerReservasDTO {

    @Autowired
    private ServicioRepository servicioRepository;
    public  VerReservasDTO toVerReservaDTO(Reserva reserva) {
//                Saco id servicio desde el turno

        return new VerReservasDTO(
                // Datos de la reserva
                reserva.getIdReserva(),
                reserva.getFechaReserva(),

                // Datos del usuario que realiza la reserva
                reserva.getUsuarioQueReserva().getIdUsuario(),
                reserva.getUsuarioQueReserva().getName(),
                reserva.getUsuarioQueReserva().getLastName(),
                reserva.getUsuarioQueReserva().getEmail(),
                reserva.getUsuarioQueReserva().getPhone(),

                // Datos del prestador de servicio
                reserva.getPrestadorServicio().getIdUsuario(),
                reserva.getPrestadorServicio().getName(),
                reserva.getPrestadorServicio().getLastName(),
                reserva.getPrestadorServicio().getEmail(),
                reserva.getPrestadorServicio().getPhone(),

                // Datos de la mascota asociada a la reserva
                reserva.getMascotaReserva().getIdPet(),
                reserva.getMascotaReserva().getName(),
                reserva.getMascotaReserva().getSpecies(),
                reserva.getMascotaReserva().getBreed(),
                reserva.getMascotaReserva().getAge(),

                // Datos de los turnos asociados a la reserva
                reserva.getTurnos().stream().map(Turno::getIdTurno).collect(Collectors.toList()),
                reserva.getTurnos().stream().map(Turno::getFechaTurno).collect(Collectors.toList()),
                reserva.getTurnos().stream().map(Turno::getHoraTurno).collect(Collectors.toList())




        );
    }
}
