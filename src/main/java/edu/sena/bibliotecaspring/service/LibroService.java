package edu.sena.bibliotecaspring.service;

import edu.sena.bibliotecaspring.model.Libro;
import java.util.List;

public interface LibroService {
    List<Libro> findAll();
    Libro findById(Long id);
    Libro save(Libro libro);
    Libro update(Libro libro);
    boolean deleteById(Long id);
    List<Libro> findByTitulo(String titulo);
    List<Libro> findByAutor(String autor);
}