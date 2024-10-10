package com.backend.server.security.service;

import com.backend.server.security.entity.Mascota;

import java.util.List;
import java.util.Optional;

public interface MascotaServiceInterface {
    List<Mascota> getMascotas();

    Optional<Mascota> findMascotaById(Long id);

    Mascota saveMascota(Mascota mascota);

    void deleteMascota(Long id);
}