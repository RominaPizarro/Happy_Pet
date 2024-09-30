package com.project.veterinaria.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.project.veterinaria.models.Cliente;

@Repository
public interface IClienteRepository extends JpaRepository<Cliente, Integer> {
    @Query("SELECT o FROM Cliente o WHERE o.usuario.id = :id")
    List<Cliente> findByUsuario(@Param("id") Integer id);
}
