package edu.sena.bibliotecaspring;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = "edu.sena.bibliotecaspring")
public class BibliotecaSpringApplication {

    public static void main(String[] args) {
        SpringApplication.run(BibliotecaSpringApplication.class, args);
    }
}