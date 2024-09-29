package com.project.veterinaria.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class Programacion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(nullable=false)
    private String horaInicio;
    @Column(nullable=false)
    private String horaFin;
    @Column(nullable=false)
    private Integer activo = 1;
}
