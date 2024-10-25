package com.backend.server.repository;

import com.backend.server.entity.Servicio;
import com.backend.server.security.entity.Usuario;
import com.backend.server.subidaArchivos.util.EnumNombreServicio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ServicioRepository extends JpaRepository<Servicio, Long> {
//    Este es usado para el buscador de la aapp
    List<Servicio> findByNombreServicioContaining(String nombreServicio);

//    traer servicio por id usuario
List<Servicio> findByPrestadorServicio(Usuario usuario);

    List<Servicio> findByNombreServicio(EnumNombreServicio nombreServicio);

}
