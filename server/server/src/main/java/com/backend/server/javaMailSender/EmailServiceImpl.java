package com.backend.server.javaMailSender;

import com.backend.server.DTO.ResponseDTOReserva;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailServiceImpl implements IEmailService{

    @Value("${email.sender}")
    private String emailUser;

    @Autowired
    private JavaMailSender mailSender;

    @Override
    public void sendEmail(String[] toUser, String subject, String message) {

        SimpleMailMessage mailMessage = new SimpleMailMessage();

        mailMessage.setFrom(emailUser);
        mailMessage.setTo(toUser);
        mailMessage.setSubject(subject);
        mailMessage.setText(message);

        mailSender.send(mailMessage);
    }

    @Override
    public void sendEmailVerify(String toUser, String subject, String message) {
        SimpleMailMessage mailMessage = new SimpleMailMessage();

        mailMessage.setFrom(emailUser);
        mailMessage.setTo(toUser);
        mailMessage.setSubject(subject);
        mailMessage.setText(message);

        mailSender.send(mailMessage);
    }



    // Método para enviar email al usuario que realiza la reserva
    public void sendReservaEmailToUsuario(ResponseDTOReserva responseDTO) {
        String subject = "Confirmación de reserva";
        String message = "Estimado " + responseDTO.getNombreUsuarioQueReserva() + ",\n\n" +
                "Su reserva ha sido realizada exitosamente para la fecha: " + responseDTO.getFechaReserva() + ".\n\n" +
                "Detalles de los turnos:\n" + String.join("\n", responseDTO.getTurnosDetalles()) + "\n\n" +
                "Detalles de la mascota:\n" +
                "- Nombre: " + responseDTO.getNombreMascota() + "\n" +
                "- Especie: " + responseDTO.getEspecieMascota() + "\n\n" +
                "Servicio reservado: " + responseDTO.getTipoServicio() + "\n\n" +
                "Prestador de servicio: " + responseDTO.getNombrePrestadorServicio() + " (Email: " + responseDTO.getEmailPrestadorServicio() + ")\n\n" +
                "Numero telefonico: " + responseDTO.getNumeroTelefonicoPrestadorServicio()+
                "Atentamente El equipo de reservas Cuidados Peludos,\n";

        sendEmail(new String[]{responseDTO.getEmailUsuarioQueReserva()}, subject, message);
    }


    // Método para enviar email al prestador de servicio

    // Método para enviar email al prestador de servicio
    public void sendReservaEmailToPrestador(ResponseDTOReserva responseDTO) {
        String subject = "Nueva reserva recibida";
        String message = "Estimado " + responseDTO.getNombrePrestadorServicio() + ",\n\n" +
                "Se ha realizado una nueva reserva por parte de " + responseDTO.getNombreUsuarioQueReserva() + " (Email: " + responseDTO.getEmailUsuarioQueReserva() + ") " +
                "para la fecha: " + responseDTO.getFechaReserva() + ".\n\n" +
                "Detalles de los turnos reservados:\n" + String.join("\n", responseDTO.getTurnosDetalles()) + "\n\n" +
                "Detalles de la mascota:\n" +
                "- Nombre: " + responseDTO.getNombreMascota() + "\n" +
                "- Especie: " + responseDTO.getEspecieMascota() + "\n\n" +
                "Datos del cliente:\n" +
                "- Nombre: " + responseDTO.getNombreUsuarioQueReserva() + "\n" +
                "- Email: " + responseDTO.getEmailUsuarioQueReserva() + "\n\n" +
                "Atentamente,\n" +
                "El equipo de reservas Cuidados Peludos";

        sendEmail(new String[]{responseDTO.getEmailPrestadorServicio()}, subject, message);
    }

}