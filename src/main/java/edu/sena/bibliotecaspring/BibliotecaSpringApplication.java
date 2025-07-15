package edu.sena.bibliotecaspring;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan("edu.sena.bibliotecaspring.model")
@EnableJpaRepositories("edu.sena.bibliotecaspring.repository")
@ComponentScan("edu.sena.bibliotecaspring")
public class BibliotecaSpringApplication {
    public static void main(String[] args) {
        SpringApplication.run(BibliotecaSpringApplication.class, args);
    }
}