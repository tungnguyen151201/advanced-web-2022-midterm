import axios from 'axios';

// Custom api
const instance = axios.create({
  baseURL: 'http://localhost:3001',
});

export default instance;
