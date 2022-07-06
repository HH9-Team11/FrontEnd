import axios from 'axios';

axios.defaults.withCredentials = true;

const instance = axios.create({
  baseURL: 'http://3.35.19.47',
  timeout: 3000,
  headers: {
    'content-type': 'application/json;charset=UTF-8',
    accept: 'application/json',
  },
});
export const formDataAxios = axios.create({
  baseURL: 'http://3.35.19.47',
  timeout: 3000,
  headers: {
    'content-type': 'multipart/form-data',
  },
});

export default instance;
