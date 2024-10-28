package com.backend.server.controller;
import com.backend.server.entity.Mascota;
import com.backend.server.exceptionHandler.DatabaseException;
import com.backend.server.exceptionHandler.InvalidDataException;
import com.backend.server.exceptionHandler.NotFoundException;
import com.backend.server.security.entity.Usuario;
import com.backend.server.security.service.impl.UsuarioService;
import com.backend.server.service.serviceMascota.MascotaServiceInterface;
import com.backend.server.subidaArchivos.service.Impl.UploadFilesServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;
import java.util.Optional;


@RestController
@RequestMapping("/api/mascotas")
@CrossOrigin(origins = "http://localhost:5173")
public class MascotaController {

    @Autowired
    private MascotaServiceInterface mascotaService;

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private UploadFilesServiceImpl uploadFilesService;

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

    @PutMapping("/update/{id}")
    public ResponseEntity<Mascota> updateMascota(@PathVariable Long id, @RequestBody Mascota mascota) {
        try {
            Mascota updatedMascota = mascotaService.updateMascota(id, mascota);
            return ResponseEntity.ok(updatedMascota);
        } catch (NotFoundException e) {
            return ResponseEntity.status(404).body(null);
        } catch (InvalidDataException e) {
            return ResponseEntity.status(400).body(null);
        } catch (DatabaseException e) {
            return ResponseEntity.status(500).body(null);
        }
    }

    @PostMapping("/agregar")
    public ResponseEntity<?> agregarMascota(
            @RequestParam("name") String name,
            @RequestParam("species") String species,
            @RequestParam("breed") String breed,
            @RequestParam("age") int age,
            @RequestParam("vaccinated") boolean vaccinated,
            @RequestParam("personality") String personality,
            @RequestParam("weight") double weight,
            @RequestParam("details") String details,
            @RequestParam("idUsuario") Long idUsuario,
            @RequestParam("imagenMascota") MultipartFile imagenMascota) throws Exception {

        // Buscar el usuario al que pertenece la mascota para luego asignarle ese usuario a
//        la mascoat
        Optional<Usuario> usuario = usuarioService.findUsuario(idUsuario);
        if (!usuario.isPresent()) {
            throw new NotFoundException("Usuario no encontrado con ID: " + idUsuario);
        }

        // Verificar que la imagen haya sido proporcionada
        if (imagenMascota.isEmpty()) {
            throw new InvalidDataException("La imagen de la mascota es requerida.");
        }


        String rutaImagen = uploadFilesService.handleFileUpload(imagenMascota);

        //instanciar la mascota
        Mascota nuevaMascota = new Mascota();
        nuevaMascota.setName(name);
        nuevaMascota.setSpecies(species);
        nuevaMascota.setBreed(breed);
        nuevaMascota.setAge(age);
        nuevaMascota.setVaccinated(vaccinated);
        nuevaMascota.setPersonality(personality);
        nuevaMascota.setWeight(weight);
        nuevaMascota.setDetails(details);
        nuevaMascota.setImagePet(rutaImagen);
        nuevaMascota.setUsuario(usuario.get());

        // Guardar la mascota
        Mascota mascotaGuardada = mascotaService.saveMascota(nuevaMascota);

        return new ResponseEntity<>(mascotaGuardada, HttpStatus.CREATED);
    }


    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<?> eliminarMascota(@PathVariable Long id) {
        try {
            if (mascotaService.findMascotaById(id).isPresent()) {
                mascotaService.deleteMascota(id);
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Mascota eliminada");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Mascota no encontrada");
            }
        } catch (DataIntegrityViolationException e) { // Error de restricción de clave externa. mascota con reservas no se elimina
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Error: Mascota tiene reservas asignadas");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al eliminar la mascota");
        }
    }

    @GetMapping("/usuario/{userId}")
    public ResponseEntity<List<Mascota>> getMascotasByUsuarioId(@PathVariable Long userId) {
        try {
            List<Mascota> mascotas = mascotaService.getMascotasByUsuarioId(userId);
            if (mascotas.isEmpty()) {
                return ResponseEntity.noContent().build();
            }
            return ResponseEntity.ok(mascotas);
        } catch (DatabaseException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}