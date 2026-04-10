import api from '../api/axios';

export const loginRequest = (data) => {
  return api.post('/auth/login', data);
};

export const registerRequest = (data) => {
  return api.post('/auth/register', data);
};

export const profileRequest = (token) => {
  return api.get('/profile', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};