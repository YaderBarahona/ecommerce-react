// En tu archivo returnService.js

import api from './api';

export const createReturn = async (returnData, token) => {
  try {
    const response = await api.post('/returns', returnData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getReturnsByUser = async (token) => {
  try {
    const response = await api.get('/returns', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
