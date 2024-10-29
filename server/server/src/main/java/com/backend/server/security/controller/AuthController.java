package com.backend.server.security.controller;
import com.backend.server.javaMailSender.MailController;
import com.backend.server.javaMailSender.emailDTO.EmailDTOVerify;
import com.backend.server.javaMailSender.util.CodeVerifyService;
import com.backend.server.security.dto.AuthenticationRequest;
import com.backend.server.security.dto.AuthenticationResponse;
import com.backend.server.security.dto.UsuarioDTO;
import com.backend.server.security.dto.VerifyEmailDTO;
import com.backend.server.security.entity.Usuario;
import com.backend.server.security.service.AuthenticationService;
import com.backend.server.security.service.JwtService;
import com.backend.server.security.service.UsuarioServiceInterface;
import com.backend.server.security.util.ResponseApiCustom;
import com.backend.server.security.util.Role;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.security.SecureRandom;
import java.util.Map;
import java.util.Optional;


@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

   private final static Logger log = LogManager.getLogger(AuthController.class);

    @Autowired
    private UsuarioServiceInterface usuarioServiceInterface;

    @Autowired
     private MailController mailController;

    @Autowired
     private CodeVerifyService codeVerifyService;

    @Autowired
    private JwtService jwtService;

    @Value("${security.jwt.secret-key}")
    private  String SECRET_KEY;


    int strength = 10;
    BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder(strength, new SecureRandom());

    @Autowired
    private AuthenticationService authenticationService;

    @PostMapping("/cliente")
    public ResponseEntity<?> crearUsuario(@RequestBody UsuarioDTO usuarioDTO) {
        String email = usuarioDTO.getEmail();

        // Verificar si el email ya existe
        if (usuarioServiceInterface.findByEmail(email).isPresent()) {
            String mensajeError = "El correo electrónico " + email + " ya está registrado.";
            ResponseApiCustom response = new ResponseApiCustom("Error", mensajeError);
            return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
        }

//        Mapeo el dto a la entidad de Usuario
        Usuario usuario = new Usuario();
        usuario.setEmail(usuarioDTO.getEmail());
        usuario.setPassword(bCryptPasswordEncoder.encode(usuarioDTO.getPassword()));
        usuario.setUsername(usuarioDTO.getUsername());
        usuario.setPhone(usuarioDTO.getPhone());
        usuario.setName(usuarioDTO.getName());
        usuario.setLastName(usuarioDTO.getLastName());
        usuario.setRole(Role.USUARIO);

        // se inicializan los campos en valores distintos a nulos
        usuario.setCuentaBloqueada(false);
        usuario.setHabilitadoCambiarPassword(false);
        usuario.setUsuarioVerificado(false);
        usuario.setIntentosVerificacion(0);

        // genero 4 digitos para el envio al email
        String codeVerify = codeVerifyService.generarCodigoVerificacion();
        usuario.setCodigoVerificacion(codeVerify);

        // se envia por email el código de verificación
        String subject = "Código de Verificación";
        String message = "Tu código de verificación es: " + codeVerify;
        EmailDTOVerify emailDTOVerify = new EmailDTOVerify(email, subject, message);
        mailController.sendVerifyemail(emailDTOVerify);

        // Guardar el usuario en la base de datos
        Usuario createdUsuario = usuarioServiceInterface.save(usuario);

        ResponseApiCustom response = new ResponseApiCustom("Usuario creado exitosamente: ", usuario.getName());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/prestador")
    public ResponseEntity<?> crearUsuario2(@RequestBody UsuarioDTO usuarioDTO) {
        String email = usuarioDTO.getEmail();

        // Verificar si el email ya existe
        if (usuarioServiceInterface.findByEmail(email).isPresent()) {
            String mensajeError = "El correo electrónico " + email + " ya está registrado.";
            ResponseApiCustom response = new ResponseApiCustom("Error", mensajeError);
            return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
        }

//        Mapeo el dto a la entidad de Usuario
        Usuario usuario = new Usuario();
        usuario.setEmail(usuarioDTO.getEmail());
        usuario.setPassword(bCryptPasswordEncoder.encode(usuarioDTO.getPassword()));
        usuario.setUsername(usuarioDTO.getUsername());
        usuario.setPhone(usuarioDTO.getPhone());
        usuario.setName(usuarioDTO.getName());
        usuario.setLastName(usuarioDTO.getLastName());
        usuario.setRole(Role.PRESTADORSERVICIO);

        // se inicializan los campos en valores distintos a nulos
        usuario.setCuentaBloqueada(false);
        usuario.setHabilitadoCambiarPassword(false);
        usuario.setUsuarioVerificado(false);
        usuario.setIntentosVerificacion(0);

        // genero 4 digitos para el envio al email
        String codeVerify = codeVerifyService.generarCodigoVerificacion();
        usuario.setCodigoVerificacion(codeVerify);

        // se envia por email el código de verificación
        String subject = "Código de Verificación";
        String message = "Tu código de verificación es: " + codeVerify;
        EmailDTOVerify emailDTOVerify = new EmailDTOVerify(email, subject, message);
        mailController.sendVerifyemail(emailDTOVerify);

        // Guardar el usuario en la base de datos
        Usuario createdUsuario = usuarioServiceInterface.save(usuario);

        ResponseApiCustom response = new ResponseApiCustom("Usuario creado exitosamente: ", usuario.getName());
        return ResponseEntity.ok(response);
    }




    @PostMapping("/verifycode")
    public ResponseEntity<?> verificarCuenta(@RequestBody VerifyEmailDTO verifyEmailDTO) {

        String emailAEnviar = verifyEmailDTO.getEmailAEnviar();
        String codigoVerificacionIngresado = verifyEmailDTO.getCodigoVerificacionIngresado();

        Optional<Usuario> usuarioOptional = usuarioServiceInterface.findByEmail(emailAEnviar);

        if (usuarioOptional.isPresent()) {
            Usuario usuario = usuarioOptional.get();

            if (usuario.isAccountNonLocked()) {
                usuario.setIntentosVerificacion(usuario.getIntentosVerificacion() + 1);

                if (usuario.getIntentosVerificacion() > 10) {
                    usuario.setCuentaBloqueada(true); // Bloquear la cuenta
                    usuarioServiceInterface.save(usuario);
                    String mensajeError = "Ingresaste más de 10 veces un código de verificación, tu cuenta ha sido bloqueada. Comunícate con soporte técnico.";
                    ResponseApiCustom response = new ResponseApiCustom("Error", mensajeError);
                    return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
                }

                String codigoVerificacionAlmacenado = usuario.getCodigoVerificacion();

                if (codigoVerificacionAlmacenado.equals(codigoVerificacionIngresado)) {
                    usuario.setUsuarioVerificado(true);
                    usuario.setIntentosVerificacion(0); // Resetear los intentos después de la verificación exitosa
                    usuarioServiceInterface.save(usuario);

                    ResponseApiCustom response = new ResponseApiCustom("Success", "Usuario verificado correctamente.");
                    return ResponseEntity.ok(response);
                } else {
                    usuarioServiceInterface.save(usuario);
                    String mensajeError = "Código de verificación incorrecto.";
                    ResponseApiCustom response = new ResponseApiCustom("Error", mensajeError);
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
                }
            } else {
                String mensajeError = "Tu cuenta está bloqueada. Comunícate con soporte técnico.";
                return ResponseEntity.status(HttpStatus.LOCKED).body(new ResponseApiCustom("Error", mensajeError));
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se encontró un usuario con el correo electrónico proporcionado.");
        }
    }





@PostMapping("/login")
public ResponseEntity<AuthenticationResponse> login(@RequestBody AuthenticationRequest authRequest) {
    Optional<Usuario> usuarioOptional = usuarioServiceInterface.findByEmail(authRequest.getEmail());

    if (usuarioOptional.isPresent()) {
        Usuario usuario = usuarioOptional.get();

        // Verificar si la cuenta del usuario está bloqueada
        if (!usuario.isAccountNonLocked()) {
            String mensajeError = "Tu cuenta está bloqueada debido a múltiples intentos fallidos. Comunícate con soporte técnico.";
            log.warn("Intento de inicio de sesión en cuenta bloqueada");
            return ResponseEntity.status(HttpStatus.LOCKED)
                    .body(new AuthenticationResponse(mensajeError));
        }

        // Verificar si la contraseña proporcionada es correcta
        boolean isPasswordCorrect = bCryptPasswordEncoder.matches(authRequest.getPassword(), usuario.getPassword());
        if (!isPasswordCorrect) {
            log.warn("La contraseña ingresada es incorrecta");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new AuthenticationResponse("La contraseña ingresada es incorrecta"));
        }

        // Si la contraseña es correcta, verificar si el usuario está verificado
        if (usuario.isUsuarioVerificado()) {
            AuthenticationResponse jwtDTO = authenticationService.login(authRequest);
            log.info("Usuario logueado con éxito");
            return ResponseEntity.status(HttpStatus.OK).body(jwtDTO);
        } else {

            usuario.setIntentosVerificacion(usuario.getIntentosVerificacion() + 1);

            if (usuario.getIntentosVerificacion() > 10) {
                String mensajeError = "Ingresaste más de 10 veces un código de verificación, comunícate con soporte técnico.";
                return ResponseEntity.status(HttpStatus.CONFLICT).body(new AuthenticationResponse(mensajeError));
            }
// Generar y enviar un nuevo código de verificación
            String nuevoCodigoVerificacion = codeVerifyService.generarCodigoVerificacion();
            usuario.setCodigoVerificacion(nuevoCodigoVerificacion);
            usuarioServiceInterface.save(usuario);

            String subject = "Nuevo Código de Verificación";
            String message = "Tu nuevo código de verificación es: " + nuevoCodigoVerificacion;
            EmailDTOVerify emailDTOVerify = new EmailDTOVerify(usuario.getEmail(), subject, message);
            mailController.sendVerifyemail(emailDTOVerify);

            log.warn("Usuario no verificado, se envió un nuevo código de verificación");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new AuthenticationResponse("Usuario no verificado. Se ha enviado un nuevo código de verificación."));
        }
    } else {
        log.warn("Usuario no encontrado");
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(new AuthenticationResponse("El email ingresado no pertenece a un usuario"));
    }
}



    // controllers para seteo de password

    @PostMapping("/setpassword1")
    public ResponseEntity<?> verifyEmailAndSendEmail(@RequestBody Map<String, String> requestbody)  {

        String email = requestbody.get("email");

        Optional<Usuario> optionalUsuario = usuarioServiceInterface.findByEmail(email);

        System.out.println(optionalUsuario);
        if (optionalUsuario.isPresent()) {
            Usuario usuario = optionalUsuario.get();

            String codeVerify = codeVerifyService.generarCodigoVerificacion();

            usuario.setCodigoSetPassword(codeVerify);

            String subject = "Este es su código para restablecer su contraseña " + usuario.getName() + ". Si usted no inició el restablecimiento de la misma, omita este mensaje y no comparta el código con nadie.";
            String message = "Tu código de verificación es: " + codeVerify;
            EmailDTOVerify emailDTOVerify = new EmailDTOVerify(email, subject, message);

            System.out.println("Se esta por enviar un codigo para restablecer password");

            mailController.sendVerifyemail(emailDTOVerify);

            System.out.println("Se Envio el codigo a: "+ usuario.getName() +" al email: " +usuario.getEmail());

            usuarioServiceInterface.save(usuario);

            String mensaje = "Por favor, verifica tu correo electrónico y utiliza el código de verificación proporcionado para completar el proceso.";
            ResponseApiCustom response = new ResponseApiCustom("Success", mensaje);
            return ResponseEntity.ok(response);
        } else {

            return ResponseEntity.badRequest().body("No se encontró ningún usuario con el correo electrónico proporcionado, verifica el mismo y vuelve a intentar.");
        }
    }

    @PostMapping("/setpassword2")
    public ResponseEntity<?> verifyCodeCorrect(@RequestBody Map<String, String> request) {


        String email = request.get("email");
        String codigo = request.get("codigo");
        Optional<Usuario> optionalUsuario = usuarioServiceInterface.findByEmail(email);

        if (optionalUsuario.isPresent()) {
            Usuario usuario = optionalUsuario.get();
            if (usuario.getCodigoSetPassword().equals(codigo)){
                usuario.setHabilitadoCambiarPassword(true);
                usuarioServiceInterface.save(usuario);
                ResponseApiCustom response = new ResponseApiCustom("Success", "Ingresa tu nueva password");
                return ResponseEntity.ok(response);
            }else{
                ResponseApiCustom response = new ResponseApiCustom("Error", "No coinciden los codigos");
                return ResponseEntity.badRequest().body(response);

            }
        } else {
            throw new RuntimeException("Hubo un error en el servicio de verificación de código para el restablecimiento de contraseña. Disculpe las molestias.");
        }
    }

    @PostMapping("/setpassword3")
    public ResponseEntity<?> IngressNewPassword(@RequestBody Map<String, String> request) {

        String email = request.get("email");
        String password = request.get("password");
        try {
            Optional<Usuario> optionalUsuario = usuarioServiceInterface.findByEmail(email);


            Usuario usuario = optionalUsuario.get();
            if (usuario.isHabilitadoCambiarPassword()) {


                // Generar el hash de la contraseña antes de guardar el usuario
                usuario.setPassword(bCryptPasswordEncoder.encode(password));
                usuario.setHabilitadoCambiarPassword(false);
                usuarioServiceInterface.save(usuario);

                ResponseApiCustom response = new ResponseApiCustom("Success", "Su password fue restablecida exitosamente");
                return ResponseEntity.ok(response);

            }else{
                ResponseApiCustom response = new ResponseApiCustom("Error", "El usuario no esta habilitado a cambiar password");
                return ResponseEntity.badRequest().body(response);
            }
        } catch (Exception e) {
            ResponseApiCustom response = new ResponseApiCustom("Error", e.getMessage());
            return ResponseEntity.internalServerError().body(response);

        }
    }




}