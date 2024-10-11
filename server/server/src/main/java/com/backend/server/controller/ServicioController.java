package com.backend.server.controller;
import com.backend.server.entity.Servicio;
import com.backend.server.exceptionHandler.NotFoundException;
import com.backend.server.service.serviceServicio.ServicioServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/servicios")
public class ServicioController {

    @Autowired
    private ServicioServiceInterface servicioService;

    @GetMapping("/allservicios")
    public ResponseEntity<List<Servicio>> getAllServicios() {
        List<Servicio> servicios = servicioService.getAllServicios();
        return new ResponseEntity<>(servicios, HttpStatus.OK);
    }

    @GetMapping("/buscar/{id}")
    public ResponseEntity<Servicio> getServicioById(@PathVariable Long id) {
        Optional<Servicio> servicio = servicioService.findServicioById(id);
        return servicio.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseThrow(() -> new NotFoundException("Servicio no encontrado con el ID: " + id));
    }

    @PostMapping("/crearservicio")
    public ResponseEntity<Servicio> createServicio(@RequestBody Servicio servicio) {
        Servicio nuevoServicio = servicioService.saveServicio(servicio);
        return new ResponseEntity<>(nuevoServicio, HttpStatus.CREATED);
    }

    @PutMapping("/modificar/{id}")
    public ResponseEntity<Servicio> updateServicio(@PathVariable Long id, @RequestBody Servicio servicio) {
        Optional<Servicio> servicioExistente = servicioService.findServicioById(id);
        if (servicioExistente.isPresent()) {
            servicio.setIdServicio(id);
            Servicio actualizadoServicio = servicioService.saveServicio(servicio);
            return new ResponseEntity<>(actualizadoServicio, HttpStatus.OK);
        } else {
            throw new NotFoundException("Servicio no encontrado con el ID: " + id);
        }
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<Void> deleteServicio(@PathVariable Long id) {
        servicioService.deleteServicioById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}