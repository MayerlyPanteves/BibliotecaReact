package edu.sena.bibliotecaspring.service.impl;

import edu.sena.bibliotecaspring.model.Libro;
import edu.sena.bibliotecaspring.repository.LibroRepository;
import edu.sena.bibliotecaspring.service.LibroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class LibroServiceImpl implements LibroService {

    @Autowired
    private LibroRepository libroRepository;

    @Override
    public List<Libro> findAll() {
        return libroRepository.findAll();
    }

    @Override
    public Libro findById(Long id) {
        return libroRepository.findById(id).orElse(null);
    }

    @Override
    public Libro save(Libro libro) {
        return libroRepository.save(libro);
    }

    @Override
    public Libro update(Libro libro) {
        if (libroRepository.existsById(libro.getId())) {
            return libroRepository.save(libro);
        }
        return null;
    }

    @Override
    public boolean deleteById(Long id) {
        if (libroRepository.existsById(id)) {
            libroRepository.deleteById(id);
            return true;
        }
        return false;
    }

    @Override
    public List<Libro> findByTitulo(String titulo) {
        return libroRepository.findByTituloContainingIgnoreCase(titulo);
    }

    @Override
    public List<Libro> findByAutor(String autor) {
        return libroRepository.findByAutorContainingIgnoreCase(autor);
    }
}