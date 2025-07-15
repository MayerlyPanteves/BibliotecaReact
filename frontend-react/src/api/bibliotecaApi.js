import axios from 'axios';

const API_URL = 'http://localhost:8080/api'; // Asegúrate que coincide con tu backend

export default {
    // Operaciones para Libros
    getLibros() {
        return axios.get(`${API_URL}/libros`);
    },
    crearLibro(libro) {
        return axios.post(`${API_URL}/libros`, libro);
    },
    actualizarLibro(id, libro) {
        return axios.put(`${API_URL}/libros/${id}`, libro);
    },
    eliminarLibro(id) {
        return axios.delete(`${API_URL}/libros/${id}`);
    },

    // Operaciones para DVDs (ajusta según tu modelo)
    getDVDs() {
        return axios.get(`${API_URL}/dvds`);
    },
    crearDVD(dvd) {
        return axios.post(`${API_URL}/dvds`, dvd);
    },
    // ...similar para actualizar y eliminar

    // Operaciones para Revistas
    getRevistas() {
        return axios.get(`${API_URL}/revistas`);
    },
    // ...otros métodos para revistas
};