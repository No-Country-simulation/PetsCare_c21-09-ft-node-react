package com.backend.server.subidaArchivos.service.Impl;
import com.backend.server.subidaArchivos.service.IUploadFilesService;
import com.backend.server.subidaArchivos.util.StorageFileUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class UploadFilesServiceImpl implements IUploadFilesService {

    @Autowired
    private StorageFileUtil storageFileUtil;


    @Override
    public String handleFileUpload(MultipartFile file) throws Exception {
        try {
            String fileName = UUID.randomUUID().toString();
            byte[] bytes = file.getBytes();
            String fileOriginalName = file.getOriginalFilename();
            long fileSize = file.getSize();
            long maxFileSize = 5 * 1024 * 1024;

            if (fileSize > maxFileSize) {
                throw new Exception("El tamaño de la imagen supera los 5 MB.");
            }

            if (!fileOriginalName.endsWith(".jpg") &&
                    !fileOriginalName.endsWith(".jpeg") &&
                    !fileOriginalName.endsWith(".png") &&
                    !fileOriginalName.endsWith(".webp")) {
                throw new Exception("Formato de imagen no soportado. Solo se permiten .jpg, .jpeg, .png, .webp.");
            }

            String fileExtension = fileOriginalName.substring(fileOriginalName.lastIndexOf("."));
            String newFileName = fileName + fileExtension;

            File folder = new File(storageFileUtil.getStorageLocation().toString());
            if (!folder.exists()) {
                folder.mkdirs();
            }
            Path path = Paths.get(folder.getAbsolutePath() + File.separator + newFileName);
            Files.write(path, bytes);

            return newFileName;

        } catch (Exception e) {
            throw new Exception("Error al manejar la carga del archivo: " + e.getMessage(), e);
        }
    }
    @Override
    public void deleteFile(String imagenComercio) {
        // Verificar si la imagen es nula o vacía
        if (imagenComercio == null || imagenComercio.isEmpty()) {
            System.out.println("No hay imagen para eliminar.");
            return;
        }

        // Construir la ruta completa de la imagen en el sistema de archivos
        try {
            String imgPath = storageFileUtil.getStorageLocation() + File.separator + imagenComercio;
            Path path = Paths.get(imgPath);

            // Verificar si el archivo existe y eliminarlo
            if (Files.exists(path)) {
                Files.delete(path);
                System.out.println("Imagen eliminada: " + imgPath);
            } else {
                System.out.println("La imagen no existe en el sistema de archivos: " + imgPath);
            }
        } catch (Exception e) {
            System.err.println("Error al eliminar la imagen: " + e.getMessage());
        }
    }

}
