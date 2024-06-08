// src/services/orderService.js
import api from './api';

// export const createOrder = async (orderData) => {
//   const response = await api.post('/orders', orderData);
//   return response.data;
// };  

export const createOrder = async (orderData, token) => {
  const response = await api.post('/orders', orderData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getOrdersByUser = async (token) => {
  const response = await api.get('/orders', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
