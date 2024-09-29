package com.project.veterinaria.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.veterinaria.models.Usuario;
import com.project.veterinaria.repository.IUsuarioRepository;

@RestController
@RequestMapping("api/usuario")
public class UsuarioController {
    @Autowired
    private IUsuarioRepository repository;

    @Value("${secret.key.auth}")
    private String secretKey;

    @PostMapping("list")
    public ResponseEntity<Object> list(@RequestBody Usuario o) {
        try {
            return new ResponseEntity<>(repository.filter(o.getUsername() + "%"), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("add")
    public ResponseEntity<Object> add(@RequestBody Usuario o) {
        try {
            return new ResponseEntity<>(repository.save(o), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("edit")
    public ResponseEntity<Object> edit(@RequestBody Usuario o) {
        try {
            Usuario oUsuario = repository.findById(o.getId()).get();
            oUsuario.setPassword(o.getPassword());
            oUsuario.setRol(o.getRol());
            return new ResponseEntity<>(repository.save(oUsuario), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("delete")
    public ResponseEntity<Object> delete(@RequestBody Usuario o) {
        try {
            if (repository.findById(o.getId()) == null) {
                return new ResponseEntity<>("No existe el Usuario", HttpStatus.BAD_REQUEST);
            }

            repository.deleteById(o.getId());

            return new ResponseEntity<>(null, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("find")
    public ResponseEntity<Object> find(@RequestBody Usuario o) {
        try {
            Optional<Usuario> usuario = repository.findById(o.getId());

            return new ResponseEntity<>(usuario.get(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("login")
    public ResponseEntity<Object> login(@RequestBody Usuario o) {
        try {
            System.out.println(o);
            List<Usuario> data = repository.login(o.getUsername(), o.getPassword());

            if (data.isEmpty()) {
                return new ResponseEntity<>("Credenciales incorrectas", HttpStatus.BAD_REQUEST);
            }

            return new ResponseEntity<>(new Object[]{
                data.getFirst(),
                secretKey
            }, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

}
