package edu.sena.bibliotecaspring.config; // Ajusta el paquete según tu estructura

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**") // Permite CORS para todas las rutas bajo /api
                .allowedOrigins("http://localhost:3000") // Permite solo requests desde tu frontend React
                .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS") // Métodos permitidos
                .allowedHeaders("*") // Headers permitidos
                .allowCredentials(true) // Permite cookies y autenticación
                .maxAge(3600); // Tiempo de cache para las opciones CORS (1 hora)
    }
}