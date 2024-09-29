package com.project.veterinaria.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.veterinaria.models.Programacion;

@Repository
public interface IProgramacionRepository extends JpaRepository<Programacion, Integer> {
    
}
