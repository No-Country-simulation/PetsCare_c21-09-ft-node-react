package com.backend.server.service.serviceServicio;
import com.backend.server.entity.Servicio;
import java.util.List;
import java.util.Optional;

public interface ServicioServiceInterface {

    List<Servicio> getAllServicios();

    Servicio saveServicio(Servicio servicio);


    void deleteServicioById(Long id);

    Optional<Servicio> findServicioById(Long id);


}
