import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:300/api/',
  withCredentials: true,
})