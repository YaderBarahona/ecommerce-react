// src/redux/reducers/authReducer.js
import { REGISTER_SUCCESS, LOGIN_SUCCESS } from '../actions/authActions';

const initialState = {
  token: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
      };
    default:
      return state;
  }
};

export default authReducer;
