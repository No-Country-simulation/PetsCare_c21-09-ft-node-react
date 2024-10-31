//package com.backend.server.subidaArchivos.util;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.core.env.Environment;
//import org.springframework.stereotype.Component;
//
//@Component
//public class StorageFileUtil {
//
//    private final Environment environment;
//    private final String storageLocation;
//
//    @Autowired
//    public StorageFileUtil(Environment environment) {
//        this.environment = environment;
//        this.storageLocation = determineStorageLocation();
//    }
//
//    private String determineStorageLocation() {
//        String activeProfile = environment.getActiveProfiles().length > 0
//                ? environment.getActiveProfiles()[0]
//                : "default";
//
//        if ("prod".equals(activeProfile)) {
//            return environment.getProperty("storage.location.prod");
//        } else {
//            return environment.getProperty("storage.location.dev");
//        }
//    }
//
//    public String getStorageLocation() {
//        return storageLocation;
//    }
//}
