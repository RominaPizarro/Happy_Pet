package com.project.veterinaria.controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.veterinaria.models.Veterinario;
import com.project.veterinaria.repository.IVeterinarioRepository;

@RestController
@RequestMapping("api/veterinario")
public class VeterinarioController {
    @Autowired
    private IVeterinarioRepository repository;

    @PostMapping("list")
    public ResponseEntity<Object> list(@RequestBody String filter) {
        try {
            return new ResponseEntity<>(repository.findAll(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("add")
    public ResponseEntity<Object> add(@RequestBody Veterinario o) {
        try {
            return new ResponseEntity<>(repository.save(o), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("edit")
    public ResponseEntity<Object> edit(@RequestBody Veterinario o) {
        try {
            Veterinario oVeterinario = repository.findById(o.getId()).get();
            oVeterinario.setApellidos(o.getApellidos());
            oVeterinario.setNombres(o.getNombres());
            oVeterinario.setEmail(o.getEmail());
            oVeterinario.setEspecialidad(o.getEspecialidad());
            oVeterinario.setIdentificacion(o.getIdentificacion());
            oVeterinario.setTelefono(o.getTelefono());
            return new ResponseEntity<>(repository.save(oVeterinario), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("delete")
    public ResponseEntity<Object> edit(@RequestBody Integer id) {
        try {
            if (repository.findById(id) == null) {
                return new ResponseEntity<>("No existe el Veterinario", HttpStatus.BAD_REQUEST);
            }

            repository.deleteById(id);

            return new ResponseEntity<>("OK", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("find")
    public ResponseEntity<Object> find(@RequestBody Integer id) {
        try {
            Optional<Veterinario> o = repository.findById(id);

            return new ResponseEntity<>(o.get(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

}
