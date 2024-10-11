package com.backend.server.service.serviceMascota;
import com.backend.server.entity.Mascota;
import java.util.List;
import java.util.Optional;

public interface MascotaServiceInterface {
    List<Mascota> getMascotas();

    Optional<Mascota> findMascotaById(Long id);

    Mascota saveMascota(Mascota mascota);

    void deleteMascota(Long id);
}