package com.project.veterinaria.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.veterinaria.repository.IProgramacionRepository;

@RestController
@RequestMapping("api/usuario")
public class ProgramacionController {
    @Autowired
    private IProgramacionRepository repository;

    @PostMapping("list")
    public ResponseEntity<Object> list() {
        try {
            return new ResponseEntity<>(repository.findAll(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
