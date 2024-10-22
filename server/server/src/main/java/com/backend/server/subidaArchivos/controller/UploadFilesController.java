package com.backend.server.subidaArchivos.controller;
import com.backend.server.subidaArchivos.service.IUploadFilesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/upload")
public class UploadFilesController {

    @Autowired
    private IUploadFilesService uploadFilesService;

    @PostMapping("/imglocal")
    private ResponseEntity<String> uploadLocal(@RequestParam(name = "file") MultipartFile file) throws Exception{
        uploadFilesService.handleFileUpload(file);
        return (ResponseEntity.status(HttpStatus.CREATED).body("La imagen local fue agregada con exito"));

    }

}
