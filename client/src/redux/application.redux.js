import {
  GET_PROFILE,
  GET_CONTACTS,
  CREATE_CONTACT,
  UPDATE_CONTACT,
  DELETE_CONTACT,
} from "../services/types";

const initialState = {
  id: null,
  name: null,
  picture: null,
  email: null,
  phone: null,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFILE:
      return {
        ...state,
        id: action.payload.id,
        name: action.payload.name,
        picture: action.payload.picture,
        email: action.payload.email,
        phone: action.payload.phone,
      };
    default:
      return state;
  }
};

export default appReducer;
