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

            if (fileSize > maxFileSize){
                return ("Superado size the img, more 5MB");
            }

            if (
                    !fileOriginalName.endsWith(".jpg") &&
                            !fileOriginalName.endsWith(".jpeg") &&
                            !fileOriginalName.endsWith(".png") &&
                            !fileOriginalName.endsWith(".webp")
            ){

                return "Only .jpg, .jpeg , .png , .webp";
            }

            String fileExtension = fileOriginalName.substring(fileOriginalName.lastIndexOf("."));

            String newFileName = fileName + fileExtension;

            File folder = new File(storageFileUtil.getStorageLocation().toString());


            if(!folder.exists()){
                folder.mkdirs();
            }
            String absolutePath = folder.getAbsolutePath();

            Path path = Paths.get(absolutePath + File.separator + newFileName);
            System.out.println("Ruta del archivo: " + path.toString());
            Files.write(path, bytes);


                    return newFileName;



        }catch (Exception e){
            e.printStackTrace();
            return "Error al manejar la carga del archivo: " + e.getMessage();


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
