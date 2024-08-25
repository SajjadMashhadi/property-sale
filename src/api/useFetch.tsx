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
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer `,
  },
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
        setDataLength(res.headers["x-total-count"]);
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      })
      .finally(() => setIsPending(false));
  }, [page, limit]);

  return { data, dataLength, isPending, error };
};

//fetch a house by id
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
      })
      .catch((err) => setError(err))
      .finally(() => setIsPending(false));
  }, [id]);

  return { data, isPending, error };
};

//add house
export const addHouse = (body) => {
  return new Promise((resolve, reject) => {
    api
      .post("/houses", body)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

//add house
export const editHouse = (id, body) => {
  return new Promise((resolve, reject) => {
    api
      .put(`/houses/${id}`, body)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

//delete house
export const deleteHouse = (id: string) => {
  return new Promise((resolve, reject) => {
    api
      .delete(`/houses/${id}`)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

//login
export const login = (body: UserRegister) => {
  return new Promise((resolve, reject) => {
    api
      .post("/login", body)
      .then((response) => {
        console.log(response.data.accessToken);
        api.defaults.headers.common = {
          Authorization: `Bearer ${response.data.accessToken}`,
        };
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
