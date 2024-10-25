package com.backend.server.javaMailSender;

public interface IEmailService {

    void sendEmail(String[] toUser, String subject, String message);

    void sendEmailVerify(String toUser, String subject, String message);


}