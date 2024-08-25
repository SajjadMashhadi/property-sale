import { useState, useEffect } from "react";
import axios from "axios";

interface UserRegister {
  email: string;
  password: string;
}

interface UseFetchResult {
  data: any | null;
  dataLength?: number | null;
  isPending: boolean;
  error: any | null;
}

const api = axios.create({
  baseURL: "http://localhost:3000",
});

//fetch houses
export const useHouses = (page: number, limit: number): UseFetchResult => {
  const [data, setData] = useState<any | null>(null);
  const [dataLength, setDataLength] = useState<number | null>(null);
  const [isPending, setIsPending] = useState<boolean>(true);
  const [error, setError] = useState<any | null>(null);

  useEffect(() => {
    api
      .get("/houses", {
        params: {
          _page: page,
          _limit: limit,
        },
      })
      .then((res) => {
        setData(res.data);
        setError(null);
        setIsPending(false);
        console.log(res.data); // access your data which is limited to "10" per page
        setDataLength(res.headers["x-total-count"]); // length of your data without page limit
      })
      .catch((err) => setError(err))
      .finally(() => setIsPending(false));
  }, [page]);

  return { data, dataLength, isPending, error };
};

export const useHouse = (id: string): UseFetchResult => {
  const [data, setData] = useState<any | null>(null);
  const [isPending, setIsPending] = useState<boolean>(true);
  const [error, setError] = useState<any | null>(null);

  useEffect(() => {
    api
      .get(`/houses/${id}`)
      .then((res) => {
        setData(res.data);
        setError(null);
        setIsPending(false);
        console.log(res.data);
      })
      .catch((err) => setError(err))
      .finally(() => setIsPending(false));
  }, [id]);

  return { data, isPending, error };
};

//add house
export const addHouse = (body): void => {
  api
    .post("/houses", body)
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => console.log(err));
};

//login
export const login = (body: UserRegister) => {
  return new Promise((resolve, reject) => {
    api
      .post("/login", body)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

//signup
export const signup = (body: UserRegister) => {
  return new Promise((resolve, reject) => {
    api
      .post("/users", body)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
