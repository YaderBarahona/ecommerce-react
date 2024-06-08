// src/redux/actions/authActions.js
import { register, login } from '../../services/authService';

export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export const registerUser = (userData) => async (dispatch) => {
  try {
    const data = await register(userData);
    dispatch({ type: REGISTER_SUCCESS, payload: data });
  } catch (error) {
    console.error(error);
  }
};

export const loginUser = (userData) => async (dispatch) => {
  try {
    const data = await login(userData);
    dispatch({ type: LOGIN_SUCCESS, payload: data });
  } catch (error) {
    console.error(error);
  }
};
