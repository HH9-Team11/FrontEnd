import instance from '../lib/axios';

export const userApis = {
  login: () => instance.post('/user/login'),
};
