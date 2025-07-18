import axios from 'axios';

const API_URL = 'http://localhost:8080/api'; // Asegúrate que coincide con tu backend

const api = axios.create({
    baseURL: API_URL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Interceptor para manejar errores
api.interceptors.response.use(
    response => response.data,
    error => {
        console.error('API Error:', error.response?.data || error.message);
        throw error.response?.data || { message: 'Error de conexión con el servidor' };
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