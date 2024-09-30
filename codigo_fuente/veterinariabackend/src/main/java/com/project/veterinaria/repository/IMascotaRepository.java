package com.project.veterinaria.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.project.veterinaria.models.Mascota;

@Repository
public interface IMascotaRepository extends JpaRepository<Mascota, Integer> {
    @Query("SELECT o FROM Mascota o WHERE o.cliente.id = :id AND o.nombre LIKE :filter")
    List<Mascota> findByCliente(@Param("id") Integer id, @Param("filter") String filter);
}
