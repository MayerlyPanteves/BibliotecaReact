import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

export default {
    // Operaciones para Libros
    getLibros: () => axios.get(`${API_URL}/libros`),
    crearLibro: (libro) => axios.post(`${API_URL}/libros`, libro),
    actualizarLibro: (id, libro) => axios.put(`${API_URL}/libros/${id}`, libro),
    eliminarLibro: (id) => axios.delete(`${API_URL}/libros/${id}`),

    // Operaciones para DVDs
    getDVDs: () => axios.get(`${API_URL}/dvds`),
    crearDVD: (dvd) => axios.post(`${API_URL}/dvds`, dvd),
    // ...similar para actualizar y eliminar

    // Operaciones para Revistas
    getRevistas: () => axios.get(`${API_URL}/revistas`),
    // ...otros métodos
};