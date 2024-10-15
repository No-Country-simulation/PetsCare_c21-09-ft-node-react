package com.backend.server.repository;

import com.backend.server.entity.Servicio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ServicioRepository extends JpaRepository<Servicio, Long> {
//    Este es usado para el buscador de la aapp
    List<Servicio> findByNombreServicioContaining(String nombreServicio);
}
