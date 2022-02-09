import { getRequest, postRequest, putRequest, deleteRequest } from "./fetch";
import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  GET_PROFILE,
  LOADING,
} from "./types";

import { isExpired } from "react-jwt";

export const checkToken = async () => {
  if (isExpired(localStorage.getItem("authorizationJWT"))) {
    const res = await postRequest("sys/refresh", {
      email: localStorage.email,
      refreshToken: localStorage.refreshToken,
    });
    localStorage.setItem("authorizationJWT", res.data.token.accessToken);
    localStorage.setItem("refreshToken", res.data.token.refreshToken);
  }
};

export const signInUser = async (data, dispatch) => {
  try {
    dispatch({ type: LOADING, payload: { loading: true } });
    const res = await postRequest("sys/signin", data);
    localStorage.setItem("authorizationJWT", res.data.token.accessToken);
    localStorage.setItem("refreshToken", res.data.token.refreshToken);
    localStorage.setItem("email", res.data.user.email);
    localStorage.setItem("picture", res.data.user.picture);
    dispatch({ type: AUTH_USER, payload: res.data.user });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
      payload: "There was an error. Please try again later!",
    });
  }
};

export const signUpUser = async (data, dispatch) => {
  try {
    dispatch({ type: LOADING, payload: { loading: true } });
    const res = await postRequest("sys/signup", data);
    localStorage.setItem("authorizationJWT", res.data.token.accessToken);
    localStorage.setItem("refreshToken", res.data.token.refreshToken);
    localStorage.setItem("email", res.data.user.email);
    localStorage.setItem("picture", res.data.user.picture);
    dispatch({ type: AUTH_USER, payload: res.data.user });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
      payload: "There was an error. Please try again later!",
    });
  }
};

export const signOutUser = async (dispatch) => {
  try {
    dispatch({ type: LOADING, payload: { loading: true } });
    await getRequest("sys/logout");
    if (localStorage.authorizationJWT) {
      localStorage.removeItem("authorizationJWT");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("email");
      localStorage.removeItem("picture");
    }
    dispatch({ type: UNAUTH_USER });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
      payload: "There was an error. Please try again later!",
    });
  }
};

export const getProfile = async (dispatch) => {
  try {
    dispatch({ type: LOADING, payload: { loading: true } });
    const res = await getRequest("app/profile", localStorage.authorizationJWT);
    dispatch({ type: GET_PROFILE, payload: res.data });
    return res.data;
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
      payload: "There was an error. Please try again later!",
    });
  }
};

export const getContacts = async () => {
  const res = await getRequest("app/contacts", localStorage.authorizationJWT);
  return res.data;
};

export const getContactProfile = async (cid) => {
  const res = await getRequest(
    "app/contacts/" + cid,
    localStorage.authorizationJWT
  );
  return res.data;
};

export const createContact = async (data) => {
  const res = await postRequest(
    "app/contacts",
    data,
    localStorage.authorizationJWT
  );
  return res.data;
};

export const updateContact = async (cid, data) => {
  const res = await putRequest(
    "app/contacts/" + cid,
    data,
    localStorage.authorizationJWT
  );
  return res.data;
};

export const deleteContact = async (cid) => {
  const res = await deleteRequest(
    "app/contacts/" + cid,
    localStorage.authorizationJWT
  );
  return res.data;
};
