package com.project.veterinaria.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.project.veterinaria.models.Veterinario;

@Repository
public interface IVeterinarioRepository extends JpaRepository<Veterinario, Integer> {
    @Query("SELECT o FROM Veterinario o WHERE o.nombres LIKE :filter OR o.apellidos LIKE :filter OR o.especialidad LIKE :filter OR o.identificacion LIKE :filter")
    List<Veterinario> filter(@Param("filter") String filter);

    @Query("SELECT o FROM Veterinario o WHERE o.usuario.id = :id")
    List<Veterinario> findByUsuario(@Param("id") Integer id);
}
