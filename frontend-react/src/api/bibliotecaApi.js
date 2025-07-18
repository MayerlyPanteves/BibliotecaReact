import axios from 'axios';

// Configuración global de axios
const api = axios.create({
    baseURL: 'http://localhost:8080/api',
    timeout: 10000, // 10 segundos de timeout
    headers: {
        'Content-Type': 'application/json'
    }
});

// Interceptor para manejar errores
api.interceptors.response.use(
    response => response.data,
    error => {
        console.error('Error en la petición:', error);
        throw new Error(error.response?.data?.message || 'Error de conexión con el servidor');
    }
);

export default {
    // Libros
    getLibros: () => api.get('/libros'),
    crearLibro: (libro) => api.post('/libros', libro),
    actualizarLibro: (id, libro) => api.put(`/libros/${id}`, libro),
    eliminarLibro: (id) => api.delete(`/libros/${id}`),

    // DVDs
    getDVDs: () => api.get('/dvds'),
    crearDVD: (dvd) => api.post('/dvds', dvd),
    actualizarDVD: (id, dvd) => api.put(`/dvds/${id}`, dvd),
    eliminarDVD: (id) => api.delete(`/dvds/${id}`),

    // Revistas
    getRevistas: () => api.get('/revistas'),
    crearRevista: (revista) => api.post('/revistas', revista),
    actualizarRevista: (id, revista) => api.put(`/revistas/${id}`, revista),
    eliminarRevista: (id) => api.delete(`/revistas/${id}`)
};