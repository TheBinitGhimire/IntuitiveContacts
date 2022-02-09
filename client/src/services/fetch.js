import axios from "axios";

export const getRequest = async (url, token) => {
  const res = await axios.get(`http://localhost:1337/api/${url}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res;
};

export const postRequest = async (url, post, token) => {
  const res = await axios.post(`http://localhost:1337/api/${url}`, post, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res;
};

export const putRequest = async (url, post, token) => {
  const res = await axios.put(`http://localhost:1337/api/${url}`, post, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res;
};

export const deleteRequest = async (url, token) => {
  const res = await axios.delete(`http://localhost:1337/api/${url}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res;
};
