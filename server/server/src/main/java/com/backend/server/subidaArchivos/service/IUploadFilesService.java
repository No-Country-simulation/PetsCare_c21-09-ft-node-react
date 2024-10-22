package com.backend.server.subidaArchivos.service;

import org.springframework.web.multipart.MultipartFile;

public interface IUploadFilesService {

    String handleFileUpload (MultipartFile file) throws Exception;


    void deleteFile(String imagenComercio);
}
