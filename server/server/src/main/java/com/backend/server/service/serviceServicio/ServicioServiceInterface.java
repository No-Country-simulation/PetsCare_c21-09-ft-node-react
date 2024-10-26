package com.backend.server.service.serviceServicio;
import com.backend.server.DTO.ServicioCardReservaDTO;
import com.backend.server.entity.Servicio;
import com.backend.server.util.EnumNombreServicio;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface ServicioServiceInterface {

    List<Servicio> getAllServicios();

    Servicio saveServicio(Servicio servicio);


    void deleteServicioById(Long id);

    Optional<Servicio> findServicioById(Long id);

    List<Servicio> findServicioByNombreAndFechaTurno(String nombreServicio, LocalDate fechaTurno);

    List<Servicio> findServiciosByUsuarioId(Long idUsuario);

    List<ServicioCardReservaDTO> findServicioByNombreServicio(EnumNombreServicio nombreServicio);


    List<ServicioCardReservaDTO> findServicioramdom();

}
