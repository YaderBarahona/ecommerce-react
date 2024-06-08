// src/services/api.js
import axios from 'axios';

const api = axios.create({
  // baseURL: 'http://localhost:5000/api', 
  baseURL: 'https://backend-nodejs-express.onrender.com/api', 
});

export default api;
