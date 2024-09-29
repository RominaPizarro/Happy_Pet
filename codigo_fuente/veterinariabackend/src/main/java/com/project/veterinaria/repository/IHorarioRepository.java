package com.project.veterinaria.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.project.veterinaria.models.Horario;

@Repository
public interface IHorarioRepository extends JpaRepository<Horario, Integer> {

    @Query("SELECT o FROM Horario o WHERE o.veterinario.id = :id")
    List<Horario> findByVeterinario(@Param("id") Integer id);

    @Query("SELECT o FROM Horario o WHERE o.veterinario.id = :id AND DATE(o.fecha) = DATE(:fecha)")
    List<Horario> findByDate(@Param("id") Integer id, @Param("fecha") String fecha);

}
