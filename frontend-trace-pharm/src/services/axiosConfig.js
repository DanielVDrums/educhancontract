import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:4000', // Asegúrate de que esta URL coincida con la del backend
});

export default instance;
