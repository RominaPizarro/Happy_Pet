package com.project.veterinaria.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.veterinaria.models.Veterinario;

@Repository
public interface IVeterinarioRepository extends JpaRepository<Veterinario, Integer> {
    
}
