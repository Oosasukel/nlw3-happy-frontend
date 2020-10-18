import axios from 'axios';

const api = axios.create({
  baseURL: 'https://nlw3-happy.herokuapp.com'
})

export default api;