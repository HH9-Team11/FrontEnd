import instance, { formDataAxios } from '../lib/axios';

interface Login {
  username: string;
  password: string;
}
export const userApis = {
  login: (data: Login) => instance.post('/user/login', data),
  signup: (formData: any) => formDataAxios.post('/user/signup', formData),
};
