import instance, { formDataAxios } from '../lib/axios';

export const userApis = {
  login: () => instance.post('/user/login'),
  signup: (formData: any) => formDataAxios.post('/user/signup', formData),
};
