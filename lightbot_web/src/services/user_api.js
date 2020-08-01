import axios from 'axios';

const api = axios.create({
  baseURL: '/user',
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.response.use(
  res => res,
  err => {
    if (err.response.data.msg === 'Token is not valid') {
      //logout
    }
    return Promise.reject(err);
  }
);

export default api;