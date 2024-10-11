package com.backend.server.controller;
import com.backend.server.entity.Mascota;
import com.backend.server.service.serviceMascota.MascotaServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/api/mascotas")
@CrossOrigin(origins = "http://localhost:8085")
public class MascotaController {

    @Autowired
    private MascotaServiceInterface mascotaService;

    @GetMapping("/listar")
    public List<Mascota> listarMascotas() {
        return mascotaService.getMascotas();
    }

    @GetMapping("/buscar/{id}")
    public ResponseEntity<?> obtenerMascotaPorId(@PathVariable Long id) {
        Optional<Mascota> mascotaOpt = mascotaService.findMascotaById(id);
        if (mascotaOpt.isPresent()) {
            return ResponseEntity.ok(mascotaOpt.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Mascota no encontrada");
        }
    }

    @PostMapping("/agregar")
    public ResponseEntity<Mascota> agregarMascota(@RequestBody Mascota mascota) {
        Mascota nuevaMascota = mascotaService.saveMascota(mascota);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevaMascota);
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<?> eliminarMascota(@PathVariable Long id) {
        if (mascotaService.findMascotaById(id).isPresent()) {
            mascotaService.deleteMascota(id);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Mascota eliminada");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Mascota no encontrada");
        }
    }
}