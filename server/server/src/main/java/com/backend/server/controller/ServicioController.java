package com.backend.server.controller;
import com.backend.server.DTO.ServicioCardReservaDTO;
import com.backend.server.DTO.ServicioUsuarioDTO;
import com.backend.server.entity.Servicio;
import com.backend.server.exceptionHandler.InvalidDataException;
import com.backend.server.exceptionHandler.NotFoundException;
import com.backend.server.security.entity.Usuario;
import com.backend.server.security.service.impl.UsuarioService;
import com.backend.server.service.serviceServicio.ServicioServiceInterface;
import com.backend.server.subidaArchivos.service.Impl.UploadFilesServiceImpl;
import com.backend.server.subidaArchivos.util.EnumNombreServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/servicios")
@CrossOrigin(origins = "http://localhost:5173")
public class ServicioController {

    @Autowired
    private ServicioServiceInterface servicioService;

    @Autowired
    private UploadFilesServiceImpl uploadFilesService;

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping("/allservicios")
    public ResponseEntity<List<Servicio>> getAllServicios() {
        List<Servicio> servicios = servicioService.getAllServicios();
        return new ResponseEntity<>(servicios, HttpStatus.OK);
    }


    @GetMapping("/allserviciosramdom")
    public ResponseEntity<List<ServicioCardReservaDTO>> getAllServiciosRamdom() {
        try {
            // Llamar al servicio que va a devolver un DTO
            List<ServicioCardReservaDTO> serviciosDTO = servicioService.findServicioramdom();

            if (serviciosDTO.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }

            return ResponseEntity.ok(serviciosDTO);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }



    @GetMapping("/enum/{nombreServicio}")
    public ResponseEntity<List<ServicioCardReservaDTO>> getServiciosPorNombreServicio(@PathVariable EnumNombreServicio nombreServicio) {
        try {
            // Llamar al servicio que va a devolver un DTO
            List<ServicioCardReservaDTO> serviciosDTO = servicioService.findServicioByNombreServicio(nombreServicio);

            if (serviciosDTO.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }

            return ResponseEntity.ok(serviciosDTO);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/buscar/{id}/{idUsuario}")
    public ResponseEntity<ServicioUsuarioDTO> getServicioUsuarioById(@PathVariable Long id, @PathVariable Long idUsuario) {

        // Buscar servicio por ID
        Optional<Servicio> servicio = servicioService.findServicioById(id);
        if (!servicio.isPresent()) {
            throw new NotFoundException("Servicio no encontrado con el ID: " + id);
        }

        // Buscar usuario por ID
        Optional<Usuario> usuario = usuarioService.findUsuario(idUsuario);
        if (!usuario.isPresent()) {
            throw new NotFoundException("Usuario no encontrado con el ID: " + idUsuario);
        }

        // Crear el DTO combinando los datos del servicio y usuario
        ServicioUsuarioDTO servicioUsuarioDTO = new ServicioUsuarioDTO(
                servicio.get().getIdServicio(),
                servicio.get().getNombreServicio(),
                servicio.get().isLugarFisico(),
                servicio.get().isVoyAlLugar(),
                servicio.get().getObservacion(),
                servicio.get().getPais(),
                servicio.get().getProvincia(),
                servicio.get().getEstadoDepartamento(),
                servicio.get().getDireccion(),
                usuario.get().getIdUsuario(),
                usuario.get().getName(),
                usuario.get().getLastName(),
                usuario.get().getUsername(),
                usuario.get().getEmail(),
                usuario.get().getPhone(),
                usuario.get().getDireccion()
        );

        return new ResponseEntity<>(servicioUsuarioDTO, HttpStatus.OK);
    }
    @PostMapping("/crearservicio")
    public ResponseEntity<?> createServicio(
            @RequestParam("nombreServicio") EnumNombreServicio nombreServicio,
            @RequestParam("nombreComercio") String nombreComercio,
            @RequestParam("observacion") String observacion,
            @RequestParam("lugarFisico") boolean lugarFisico,
            @RequestParam("voyAlLugar") boolean voyAlLugar,
            @RequestParam("pais") String pais,
            @RequestParam("provincia") String provincia,
            @RequestParam("estadoDepartamento") String estadoDepartamento,
            @RequestParam("direccion") String direccion,
            @RequestParam("latitud") double latitud,
            @RequestParam("longitud") double longitud,
            @RequestParam("idUsuario") Long idUsuario,
            @RequestParam("imagenServicio") MultipartFile imagenServicio) {

        try {
            // Verificar si el usuario existe
            Optional<Usuario> usuario = usuarioService.findUsuario(idUsuario);
            if (!usuario.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Usuario no encontrado con ID: " + idUsuario);
            }

            // Validar la imagen
            if (imagenServicio == null || imagenServicio.isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("La imagen del servicio es requerida.");
            }

            // Subir la imagen del servicio
            String rutaImagen = uploadFilesService.handleFileUpload(imagenServicio);

            // Crear el nuevo servicio
            Servicio nuevoServicio = new Servicio();
            nuevoServicio.setNombreServicio(nombreServicio);
            nuevoServicio.setNombreComercio(nombreComercio);
            nuevoServicio.setObservacion(observacion);
            nuevoServicio.setLugarFisico(lugarFisico);
            nuevoServicio.setVoyAlLugar(voyAlLugar);
            nuevoServicio.setPais(pais);
            nuevoServicio.setProvincia(provincia);
            nuevoServicio.setEstadoDepartamento(estadoDepartamento);
            nuevoServicio.setDireccion(direccion);
            nuevoServicio.setLatitud(latitud);
            nuevoServicio.setLongitud(longitud);
            nuevoServicio.setImagenServicio(rutaImagen);
            nuevoServicio.setPrestadorServicio(usuario.get());

            // Guardar
            Servicio servicioGuardado = servicioService.saveServicio(nuevoServicio);


            return new ResponseEntity<>(servicioGuardado, HttpStatus.CREATED);

        } catch (Exception e) {

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Ocurrió un error al crear el servicio: " + e.getMessage());
        }
    }


    @PutMapping("/modificar/{id}")
    public ResponseEntity<String> updateServicio(@PathVariable Long id, @RequestBody ServicioUsuarioDTO dto) {
        try {
            // Buscar el servicio
            Servicio servicioExistente = servicioService.findServicioById(id)
                    .orElseThrow(() -> new NotFoundException("Servicio no encontrado con el ID: " + id));

//            try {
//                CategoriaEnum categoria = CategoriaEnum.valueOf(dto.getCategoria().toUpperCase());
//                servicioExistente.setCategoria(categoria);
//            } catch (IllegalArgumentException e) {
//                throw new InvalidDataException("Categoría no válida: " + dto.getCategoria());
//            }
            // Buscar el usuario
            Usuario usuarioExistente = usuarioService.findUsuario(dto.getIdUsuario())
                    .orElseThrow(() -> new NotFoundException("Usuario no encontrado con el ID: " + dto.getIdUsuario()));

            // Mapear los nuevos valores del servicio
            servicioExistente.setNombreServicio(dto.getNombreServicio());
            servicioExistente.setLugarFisico(dto.isLugarFisico());
            servicioExistente.setVoyAlLugar(dto.isVoyAlLugar());
            servicioExistente.setObservacion(dto.getObservacion());
            servicioExistente.setPais(dto.getPais());
            servicioExistente.setProvincia(dto.getProvincia());
            servicioExistente.setEstadoDepartamento(dto.getEstadoDepartamento());
            servicioExistente.setDireccion(dto.getDireccionServicio());

            // Mapear los nuevos valores del usuario
            usuarioExistente.setName(dto.getName());
            usuarioExistente.setLastName(dto.getLastName());
            usuarioExistente.setUsername(dto.getUsername());
            usuarioExistente.setEmail(dto.getEmail());
            usuarioExistente.setPhone(dto.getPhone());
            usuarioExistente.setDireccion(dto.getDireccionUsuario());

            // Asignar el usuario al servicio
            servicioExistente.setPrestadorServicio(usuarioExistente);

            // Guardar los cambios del servicio y usuario
            usuarioService.save(usuarioExistente);
            servicioService.saveServicio(servicioExistente);

            return ResponseEntity.ok("Servicio y usuario actualizados correctamente");

        } catch (StackOverflowError e) {

            return ResponseEntity.status(HttpStatus.CONFLICT).body("Los cambios se guardaron, pero ocurrió un error de visualización.");
        } catch (Exception e) {
            // Manejar cualquier otra excepción
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ocurrió un error al actualizar el servicio y usuario.");
        }
    }



    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<Void> deleteServicio(@PathVariable Long id) {
        servicioService.deleteServicioById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/buscarpornombreservicioyfecha")
    public ResponseEntity<List<Servicio>> buscarServicioPorNombreYFecha(
            @RequestParam String nombreServicio,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fechaTurno) {

        try {
            List<Servicio> servicios = servicioService.findServicioByNombreAndFechaTurno(nombreServicio, fechaTurno);
            if (servicios.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
            return ResponseEntity.ok(servicios);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }


    @GetMapping("/usuario/{idUsuario}")
    public ResponseEntity<List<Servicio>> getServiciosPorUsuario(@PathVariable Long idUsuario) {
        List<Servicio> servicios = servicioService.findServiciosByUsuarioId(idUsuario);
        if (servicios.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.ok(servicios);
    }
}
