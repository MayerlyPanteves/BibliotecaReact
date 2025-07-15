package edu.sena.bibliotecaspring.controller;

import edu.sena.bibliotecaspring.model.Libro;
import edu.sena.bibliotecaspring.service.LibroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/libros")
@CrossOrigin(origins = "http://localhost:3000")
public class LibroController {

    @Autowired
    private LibroService libroService;

    @GetMapping
    public ResponseEntity<List<Libro>> listarLibros() {
        List<Libro> libros = libroService.findAll();
        return ResponseEntity.ok(libros);
    }

    @PostMapping
    public ResponseEntity<Libro> crearLibro(@RequestBody Libro libro) {
        Libro nuevoLibro = libroService.save(libro);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevoLibro);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Libro> obtenerLibro(@PathVariable Long id) {
        Libro libro = libroService.findById(id);
        if (libro != null) {
            return ResponseEntity.ok(libro);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Libro> actualizarLibro(@PathVariable Long id, @RequestBody Libro libro) {
        // Verificar que el ID coincida
        if (!id.equals(libro.getId())) {
            return ResponseEntity.badRequest().build();
        }

        Libro libroActualizado = libroService.update(libro);
        if (libroActualizado != null) {
            return ResponseEntity.ok(libroActualizado);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarLibro(@PathVariable Long id) {
        boolean eliminado = libroService.deleteById(id);
        if (eliminado) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Método adicional para búsqueda
    @GetMapping("/buscar")
    public ResponseEntity<List<Libro>> buscarLibros(
            @RequestParam(required = false) String titulo,
            @RequestParam(required = false) String autor) {

        if (titulo != null && !titulo.isEmpty()) {
            return ResponseEntity.ok(libroService.findByTitulo(titulo));
        } else if (autor != null && !autor.isEmpty()) {
            return ResponseEntity.ok(libroService.findByAutor(autor));
        }
        return ResponseEntity.ok(libroService.findAll());
    }
}