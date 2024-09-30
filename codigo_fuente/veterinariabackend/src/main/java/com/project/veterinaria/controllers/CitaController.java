package com.project.veterinaria.controllers;

import java.text.SimpleDateFormat;
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

import com.project.veterinaria.models.Cita;
import com.project.veterinaria.repository.ICitaRepository;

@RestController
@RequestMapping("api/cita")
public class CitaController {
    @Autowired
    private ICitaRepository repository;

    @PostMapping("list/{id}")
    public ResponseEntity<Object> list(@PathVariable Integer id) {
        try {
            List<Cita> data = repository.findByCliente(id);
            return new ResponseEntity<>(data, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("listbyveterinario/{id}")
    public ResponseEntity<Object> listVeterinario(@PathVariable Integer id, @RequestBody Cita o) {
        try {
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
            List<Cita> data = repository.findByVeterinario(id, sdf.format(o.getFechaRegistro()));
            return new ResponseEntity<>(data, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("add")
    public ResponseEntity<Object> add(@RequestBody Cita o) {
        try {
            return new ResponseEntity<>(repository.save(o), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("delete")
    public ResponseEntity<Object> delete(@RequestBody Cita o) {
        try {
            Cita cita = repository.findById(o.getId()).get();
            if (cita == null) {
                return new ResponseEntity<>("No existe el Cita", HttpStatus.BAD_REQUEST);
            }

            cita.setCancelado(1);

            return new ResponseEntity<>(repository.save(cita), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("find")
    public ResponseEntity<Object> find(@RequestBody Cita ob) {
        try {
            Optional<Cita> o = repository.findById(ob.getId());

            return new ResponseEntity<>(o.get(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

}
