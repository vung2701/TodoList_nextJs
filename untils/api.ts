
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? process.env.BASE_URL : 'http://localhost:3000',
  // other options
});

export default api;
