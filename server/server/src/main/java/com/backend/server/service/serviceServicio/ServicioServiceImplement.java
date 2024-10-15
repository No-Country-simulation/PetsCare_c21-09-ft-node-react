package com.backend.server.service.serviceServicio;
import com.backend.server.repository.ServicioRepository;
import com.backend.server.entity.Servicio;
import com.backend.server.exceptionHandler.DatabaseException;
import com.backend.server.exceptionHandler.InvalidDataException;
import com.backend.server.exceptionHandler.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ServicioServiceImplement implements ServicioServiceInterface {

    @Autowired
    private ServicioRepository servicioRepository;

    @Override
    public List<Servicio> getAllServicios() {
        try {
            return servicioRepository.findAll();
        } catch (Exception e) {
            throw new DatabaseException("Error al obtener la lista de servicios", e);
        }
    }

    @Override
    public Servicio saveServicio(Servicio servicio) {
        try {
            return servicioRepository.save(servicio);
        } catch (IllegalArgumentException e) {
            throw new InvalidDataException("Los datos proporcionados para el servicio no son válidos");
        } catch (Exception e) {
            throw new DatabaseException("Error al guardar el servicio", e);
        }
    }

    @Override
    public void deleteServicioById(Long id) {
        try {
            if (!servicioRepository.existsById(id)) {
                throw new NotFoundException("El servicio con ID " + id + " no fue encontrado.");
            }
            servicioRepository.deleteById(id);
        } catch (NotFoundException e) {
            throw e;
        } catch (Exception e) {
            throw new DatabaseException("Error al eliminar el servicio", e);
        }
    }

    @Override
    public Optional<Servicio> findServicioById(Long id) {
        try {
            return servicioRepository.findById(id)
                    .or(() -> {
                        throw new NotFoundException("El servicio con ID " + id + " no fue encontrado.");
                    });
        } catch (NotFoundException e) {
            throw e;
        } catch (Exception e) {
            throw new DatabaseException("Error al buscar el servicio", e);
        }
    }

    @Override
    public List<Servicio> findServicioByNombreAndFechaTurno(String nombreServicio, LocalDate fechaTurno) {
       try{
           List<Servicio> servicios = servicioRepository.findByNombreServicioContaining(nombreServicio);
           List<Servicio> serviciosConTurnosDisponibles = new ArrayList<>();

           for (Servicio servicio : servicios) {
               boolean tieneTurnosDisponibles = servicio.getTurnosDisponibles().stream()
                       .anyMatch(turno -> turno.getFechaTurno().isEqual(fechaTurno) && !turno.isReservadoTurno());

               if (tieneTurnosDisponibles) {
                   serviciosConTurnosDisponibles.add(servicio);
               }
           }

           return serviciosConTurnosDisponibles;
       } catch (Exception e){
        throw new DatabaseException("Error al buscar el servicio", e);
       }
    }

}
