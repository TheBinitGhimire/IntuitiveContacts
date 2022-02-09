import { createStore } from "redux";
import reducer from "./reducer";

const initialState = {
  auth: {
    authenticated: false,
  },
  app: {
    id: null,
    name: null,
    picture: null,
    email: null,
    phone: null,
  },
};

if (localStorage.authorizationJWT) {
  initialState.auth.authenticated = true;
}

const store = createStore(reducer, initialState);

export { store };
