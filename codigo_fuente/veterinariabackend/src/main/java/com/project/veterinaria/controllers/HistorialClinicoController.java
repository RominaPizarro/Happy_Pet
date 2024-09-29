package com.project.veterinaria.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.veterinaria.models.HistorialClinico;
import com.project.veterinaria.repository.IHistorialClinicoRepository;

@RestController
@RequestMapping("api/historialclinico")
public class HistorialClinicoController {
    @Autowired
    private IHistorialClinicoRepository repository;

    @PostMapping("list/{id}")
    public ResponseEntity<Object> list(@PathVariable Integer id) {
        try {
            List<HistorialClinico> data = repository.findByMascota(id);
            return new ResponseEntity<>(data, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("add")
    public ResponseEntity<Object> add(@RequestBody HistorialClinico o) {
        try {
            return new ResponseEntity<>(repository.save(o), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("delete")
    public ResponseEntity<Object> edit(@RequestBody Integer id) {
        try {
            if (repository.findById(id) == null) {
                return new ResponseEntity<>("No existe el HistorialClinico", HttpStatus.BAD_REQUEST);
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
            Optional<HistorialClinico> o = repository.findById(id);

            return new ResponseEntity<>(o.get(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

}
