import { AUTH_USER, UNAUTH_USER, AUTH_ERROR } from "../services/types";

const initialState = {
  authenticated: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_USER:
      return { ...state, error: "", authenticated: true };
    case UNAUTH_USER:
      return { ...state, error: "", authenticated: false };
    case AUTH_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default authReducer;
