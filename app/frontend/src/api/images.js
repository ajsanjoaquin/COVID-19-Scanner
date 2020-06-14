import axios from 'axios';

export default axios.create({
  baseURL: 'http://backend:5000'
});