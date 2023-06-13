import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NODE_ENV === "production" ? "https://todo-list-next-js-chi.vercel.app" : "http://localhost:3000",
});

export default api;