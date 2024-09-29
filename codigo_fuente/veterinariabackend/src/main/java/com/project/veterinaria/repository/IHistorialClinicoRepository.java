package com.project.veterinaria.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.project.veterinaria.models.HistorialClinico;

@Repository
public interface IHistorialClinicoRepository extends JpaRepository<HistorialClinico, Integer> {
    @Query("SELECT o FROM HistorialClinico o WHERE o.mascota.id = :id")
    List<HistorialClinico> findByMascota(@Param("id") Integer id);
}
