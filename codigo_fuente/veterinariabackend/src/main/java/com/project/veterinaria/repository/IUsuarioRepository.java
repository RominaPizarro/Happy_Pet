package com.project.veterinaria.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.project.veterinaria.models.Usuario;

@Repository
public interface IUsuarioRepository extends JpaRepository<Usuario, Integer> {
    @Query("SELECT o FROM Usuario o WHERE o.username = :username AND o.password = :password")
    List<Usuario> login(@Param("username") String username, @Param("password") String password);

    @Query("SELECT o FROM Usuario o WHERE o.username LIKE :filter")
    List<Usuario> filter(@Param("filter") String filter);

}
