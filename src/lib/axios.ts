import axios, { AxiosRequestConfig } from 'axios';
import Cookies from 'universal-cookie';

axios.defaults.withCredentials = true;
const cookies = new Cookies();

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

instance.interceptors.request.use((config: AxiosRequestConfig) => {
  let accessToken = '';
  
  config.headers!['Content-Type'] = 'application/json; charset=utf-8';
  config.headers!['Access-Control-Allow-Origin'] = '*';
  config.headers!['Access-Control-Allow-Credentials'] = true;
  if(cookies.get("accessToken")){
    const aToken = cookies.get("accessToken");
    accessToken = aToken.substr(7);
    config.headers!['Authorization'] = `Bearer ${accessToken}`;
  }
  config.headers!.withCredentials = true;
  return config;
});

export default instance;
