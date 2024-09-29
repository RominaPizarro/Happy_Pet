package com.project.veterinaria.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.veterinaria.models.Usuario;

@Repository
public interface IUsuarioRepository extends JpaRepository<Usuario, Integer> {
    
}
