package com.backend.server.javaMailSender;

import com.backend.server.javaMailSender.emailDTO.EmailDTO;
import com.backend.server.javaMailSender.emailDTO.EmailDTOVerify;
import com.backend.server.javaMailSender.util.CodeVerifyService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/mail")
@CrossOrigin(origins = "*")
public class MailController {

    @Autowired
    private IEmailService emailService;

    @Autowired
    private CodeVerifyService codeVerifyService;

    @PostMapping("/sendemail")
    public ResponseEntity<?> receiveRequestEmail(@RequestBody EmailDTO emailDTO){

        System.out.println("Mensaje Recibido " + emailDTO);

        emailService.sendEmail(emailDTO.getToUser(), emailDTO.getSubject(), emailDTO.getMessage());

        Map<String, String> response = new HashMap<>();
        response.put("estado", "Enviado");

        return ResponseEntity.ok(response);
    }

    @PostMapping("/sendverifyemail")
    public ResponseEntity<Map <String, String>> sendVerifyemail(@RequestBody EmailDTOVerify emailDTOVerify){
        System.out.println("Mensaje Recibido " + emailDTOVerify);

        emailService.sendEmailVerify(emailDTOVerify.getToUser(), emailDTOVerify.getSubject(), emailDTOVerify.getMessage());

        Map<String, String> response = new HashMap<>();
        response.put("estado", "Enviado");
        response.put("Verificar", "Verifica el codigo es Span");

        return ResponseEntity.ok(response);
    }



}
