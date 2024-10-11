package com.backend.server.service.serviceMascota;
import com.backend.server.entity.Mascota;
import com.backend.server.repository.MascotaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MascotaService implements MascotaServiceInterface {

    @Autowired
    private MascotaRepository mascotaRepository;

    @Override
    public List<Mascota> getMascotas() {
        return mascotaRepository.findAll();
    }

    @Override
    public Optional<Mascota> findMascotaById(Long id) {
        return mascotaRepository.findById(id);
    }

    @Override
    public Mascota saveMascota(Mascota mascota) {
        return mascotaRepository.save(mascota);
    }

    @Override
    public void deleteMascota(Long id) {
        mascotaRepository.deleteById(id);
    }
}
