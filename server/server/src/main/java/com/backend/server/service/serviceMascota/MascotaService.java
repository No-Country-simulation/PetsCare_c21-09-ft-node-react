package com.backend.server.service.serviceMascota;
import com.backend.server.entity.Mascota;
import com.backend.server.exceptionHandler.DatabaseException;
import com.backend.server.exceptionHandler.InvalidDataException;
import com.backend.server.exceptionHandler.NotFoundException;
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
        try {
            return mascotaRepository.findAll();
        } catch (Exception e) {
            throw new DatabaseException("Error al obtener la lista de mascotas", e);
        }
    }

    @Override
    public Optional<Mascota> findMascotaById(Long id) {
        try {
            return mascotaRepository.findById(id)
                    .or(() -> {
                        throw new NotFoundException("Mascota no encontrada con ID: " + id);
                    });
        } catch (NotFoundException e) {
            throw e;
        } catch (Exception e) {
            throw new DatabaseException("Error al buscar la mascota", e);
        }
    }

    @Override
    public Mascota saveMascota(Mascota mascota) {
        try {

            if (mascota.getName() == null || mascota.getName().isEmpty()) {
                throw new InvalidDataException("El nombre de la mascota no puede estar vacío");
            }


            return mascotaRepository.save(mascota);
        } catch (IllegalArgumentException e) {
            throw new InvalidDataException("Los datos proporcionados para la mascota no son válidos");
        } catch (Exception e) {
            throw new DatabaseException("Error al guardar la mascota", e);
        }
    }

    @Override
    public void deleteMascota(Long id) {
        try {
            if (!mascotaRepository.existsById(id)) {
                throw new NotFoundException("Mascota no encontrada con ID: " + id);
            }
            mascotaRepository.deleteById(id);
        } catch (NotFoundException e) {
            throw e;
        } catch (Exception e) {
            throw new DatabaseException("Error al eliminar la mascota", e);
        }
    }

    @Override
    public List<Mascota> getMascotasByUsuarioId(Long idUsuario) {
        try {
            return mascotaRepository.findByUsuarioIdUsuario(idUsuario);
        } catch (Exception e) {
            throw new DatabaseException("Error al obtener las mascotas por el ID de usuario", e);
        }
    }
}

