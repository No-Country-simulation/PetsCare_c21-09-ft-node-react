package com.backend.server.DTO.ServicioMapper;

import com.backend.server.DTO.ServicioCardReservaDTO;
import com.backend.server.entity.Servicio;
import com.backend.server.entity.Turno;
import com.backend.server.security.entity.Usuario;
import com.backend.server.security.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
public class MapServicioCardReservaDTO {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public List<ServicioCardReservaDTO> mapServiciosToDTO(List<Servicio> servicios) {
        List<ServicioCardReservaDTO> dtoList = new ArrayList<>();
        for (Servicio servicio : servicios) {
            ServicioCardReservaDTO dto = new ServicioCardReservaDTO();
            dto.setIdServicio(servicio.getIdServicio());
            String nombreServicioFormateado = servicio.getNombreServicio().name().replace("_", " ");
            dto.setNombreServicio(nombreServicioFormateado);
            dto.setLugarFisico(servicio.isLugarFisico());
            dto.setVoyAlLugar(servicio.isVoyAlLugar());
            dto.setObservacion(servicio.getObservacion());
            dto.setPais(servicio.getPais());
            dto.setProvincia(servicio.getProvincia());
            dto.setEstadoDepartamento(servicio.getEstadoDepartamento());
            dto.setDireccionServicio(servicio.getDireccion());
            dto.setImagenServicio(servicio.getImagenServicio());
            dto.setNombreComercio(servicio.getNombreComercio());
            dto.setPricehour(servicio.getPriceHour());
            dto.setLatitud(servicio.getLatitud());
            dto.setLongitud(servicio.getLongitud());

            // Buscar el usuario
            Long idPrestador = servicio.getPrestadorServicio() != null ? servicio.getPrestadorServicio().getIdUsuario() : null;

            if (idPrestador != null) {
                Optional<Usuario> prestadorOpt = usuarioRepository.findById(idPrestador);
                if (prestadorOpt.isPresent()) {
                    Usuario prestador = prestadorOpt.get();
                    dto.setIdUsuarioPrestador(prestador.getIdUsuario());
                    dto.setName(prestador.getName());
                    dto.setLastName(prestador.getLastName());
                    dto.setUsername(prestador.getUsername());
                    dto.setEmail(prestador.getEmail());
                    dto.setPhone(prestador.getPhone());
                    dto.setDireccionUsuario(prestador.getDireccion());

                } else {
                    // Manejar el caso donde el prestador no se encuentra
                    System.out.println("Prestador con ID " + idPrestador + " no encontrado.");
                }
            }

            // Filtrar los turnos no reservados
            List<Turno> turnosNoReservados = servicio.getTurnosDisponibles()
                    .stream()
                    .filter(turno -> !turno.isReservadoTurno()) // reservadoTurno == false
                    .collect(Collectors.toList());

            // Asignar los turnos no reservados al DTO
            dto.setTurnosDisponiblesNoReservados(turnosNoReservados);

            dtoList.add(dto);
        }
        return dtoList;
    }


}
