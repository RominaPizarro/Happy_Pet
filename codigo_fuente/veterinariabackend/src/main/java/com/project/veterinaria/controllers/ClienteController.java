package com.project.veterinaria.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.veterinaria.models.Cliente;
import com.project.veterinaria.repository.IClienteRepository;

@RestController
@RequestMapping("api/cliente")
public class ClienteController {
    @Autowired
    private IClienteRepository repository;

    @PostMapping("list")
    public ResponseEntity<Object> list(@RequestBody String filter) {
        try {
            return new ResponseEntity<>(repository.findAll(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("add")
    public ResponseEntity<Object> add(@RequestBody Cliente o) {
        try {
            return new ResponseEntity<>(repository.save(o), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("edit")
    public ResponseEntity<Object> edit(@RequestBody Cliente o) {
        try {
            Cliente oCliente = repository.findById(o.getId()).get();
            oCliente.setApellidos(o.getApellidos());
            oCliente.setNombres(o.getNombres());
            oCliente.setEmail(o.getEmail());
            oCliente.setDireccion(o.getDireccion());
            oCliente.setIdentificacion(o.getIdentificacion());
            oCliente.setTelefono(o.getTelefono());
            return new ResponseEntity<>(repository.save(oCliente), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("delete")
    public ResponseEntity<Object> edit(@RequestBody Integer id) {
        try {
            if (repository.findById(id) == null) {
                return new ResponseEntity<>("No existe el Cliente", HttpStatus.BAD_REQUEST);
            }

            repository.deleteById(id);

            return new ResponseEntity<>("OK", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("find")
    public ResponseEntity<Object> find(@RequestBody Cliente ob) {
        try {
            Optional<Cliente> o = repository.findById(ob.getId());

            return new ResponseEntity<>(o.get(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("findbyusuario")
    public ResponseEntity<Object> findByUsuario(@RequestBody Cliente ob) {
        try {
            List<Cliente> o = repository.findByUsuario(ob.getId());

            return new ResponseEntity<>(o.getFirst(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

}
