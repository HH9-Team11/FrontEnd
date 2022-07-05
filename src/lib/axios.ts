import axios from 'axios';

const instance = axios.create({
  baseURL: '3.35.19.47',
  timeout: 3000,
  headers: {
    'content-type': 'application/json;charset=UTF-8',
    accept: 'application/json',
  },
});

export default instance;
