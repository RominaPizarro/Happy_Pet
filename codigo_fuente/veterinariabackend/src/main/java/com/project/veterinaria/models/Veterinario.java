package com.project.veterinaria.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.Data;

@Data
@Entity
public class Veterinario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(nullable=false)
    private String nombres;
    @Column(nullable=false)
    private String apellidos;
    @Column(nullable=false)
    private String identificacion;
    @Column(nullable=false)
    private String especialidad;
    private String telefono;
    private String email;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "usuarioid", nullable = false)
    Usuario usuario;
}
