import { useState, useEffect } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useLocalStorage } from "usehooks-ts";
import { deleteMethod, get, post, put } from "./axios";
import {
  UserRegister,
  House,
  UseFetchHouseResult,
  UseFetchHousesResult,
} from "../utils/types";

//fetch houses
export const useHouses = (
  page: number,
  limit: number,
  userHouses: boolean
): UseFetchHousesResult => {
  const [data, setData] = useState<House[] | null>(null);
  const [dataLength, setDataLength] = useState<number | null>(null);
  const [isPending, setIsPending] = useState<boolean>(true);
  const [error, setError] = useState<AxiosError | null>(null);

  const [userId] = useLocalStorage("userId", null);

  useEffect(() => {
    if (userHouses) {
      get("/640/houses", {
        _page: page,
        _limit: limit,
        userId,
      })
        .then((res) => {
          setData(res.data);
          setError(null);
          setIsPending(false);
          setDataLength(res.headers["x-total-count"]);
        })
        .catch((err) => {
          console.log(err);
          if (err.status === 401) {
            logout();
          }
          setError(err);
        })
        .finally(() => setIsPending(false));
    } else {
      get("/houses", {
        _page: page,
        _limit: limit,
      })
        .then((res) => {
          setData(res.data);
          setError(null);
          setIsPending(false);
          setDataLength(res.headers["x-total-count"]);
        })
        .catch((err) => {
          setError(err);
        })
        .finally(() => setIsPending(false));
    }
  }, [page, limit, userId, userHouses]);

  return { data, dataLength, isPending, error };
};

//fetch a house by id
export const useHouse = (id: string): UseFetchHouseResult => {
  const [data, setData] = useState<House | null>(null);
  const [isPending, setIsPending] = useState<boolean>(true);
  const [error, setError] = useState<AxiosError | null>(null);

  useEffect(() => {
    get(`/houses/${id}`)
      .then((res) => {
        setData(res.data);
        setError(null);
        setIsPending(false);
      })
      .catch((err) => {
        setError(err);
        console.log(err);
      })
      .finally(() => setIsPending(false));
  }, [id]);

  return { data, isPending, error };
};

//get the address from location (lat,lng)
export const getAddress = (
  lat: number,
  lng: number
): Promise<AxiosResponse> => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
      )
      .then((response) => {
        resolve(response);
      })
      .catch((error) => reject(error));
  });
};

//add house
export const addHouse = (body: House) => {
  return post("/600/houses", body);
};

//edit house
export const editHouse = (id: number, body: House) => {
  return put(`/600/houses/${id}`, body);
};

//delete house
export const deleteHouse = (id: string) => {
  return deleteMethod(`/600/houses/${id}`);
};

//logout
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
};

//login
export const login = (body: UserRegister) => {
  return new Promise((resolve, reject) => {
    post("/login", body)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

//signup
export const signup = (body: UserRegister) => {
  return post("/users", body);
};
