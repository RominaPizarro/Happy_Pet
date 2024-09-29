package com.project.veterinaria.models;

import java.util.Date;

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
public class Cita {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(nullable=false)
    private Integer cancelado = 0;
    @Column(nullable=false)
    private Date fechaRegistro;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "mascotaid", nullable = false)
    Mascota mascota;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "veterinarioid", nullable = false)
    Veterinario veterinario;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "horarioid", nullable = false)
    Horario horario;
}
