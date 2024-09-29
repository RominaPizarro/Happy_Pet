package com.project.veterinaria.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Data
@Entity
public class Mascota {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(nullable=false)
    private String nombre;
    @Column(nullable=false)
    private Integer edad;
    @Column(nullable=false)
    private Double peso;
    private String raza;
    private String descripcion;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "clienteid", nullable = false)
    Cliente cliente;
}
