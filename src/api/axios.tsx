import axios from "axios";
import { House, UserRegister } from "../utils/types";

interface Params {
  _page?: number;
  _limit?: number;
  userId?: number;
}

export const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer `,
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${JSON.parse(token)}`;
      //   config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export function get(url: string, params?: Params) {
  return new Promise((resolve, reject) => {
    api
      .get(url, { params })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function post(url: string, body: UserRegister | House) {
  return new Promise((resolve, reject) => {
    api
      .post(url, body)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function deleteMethod(url: string) {
  return new Promise((resolve, reject) => {
    api
      .delete(url)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function put(url: string, body: House) {
  return new Promise((resolve, reject) => {
    api
      .put(url, body)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
