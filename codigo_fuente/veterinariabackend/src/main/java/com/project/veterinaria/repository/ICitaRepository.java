package com.project.veterinaria.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.veterinaria.models.Cita;

@Repository
public interface ICitaRepository extends JpaRepository<Cita, Integer> {
    
}
