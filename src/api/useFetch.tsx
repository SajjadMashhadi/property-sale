import { useState, useEffect } from "react";
import axios from "axios";
import { useLocalStorage } from "usehooks-ts";

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

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${JSON.parse(token)}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

//fetch houses
export const useHouses = (page: number, limit: number): UseFetchResult => {
  const [data, setData] = useState<any | null>(null);
  const [dataLength, setDataLength] = useState<number | null>(null);
  const [isPending, setIsPending] = useState<boolean>(true);
  const [error, setError] = useState<any | null>(null);

  const [userId] = useLocalStorage("userId", null);

  useEffect(() => {
    api
      // .get("/600/houses", {
      .get(`/640/houses`, {
        params: {
          _page: page,
          _limit: limit,
          userId,
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
        if (err.status === 401) {
          logout();
        }
        setError(err);
      })
      .finally(() => setIsPending(false));
  }, [page, limit, userId]);

  return { data, dataLength, isPending, error };
};

//fetch a house by id
export const useHouse = (id: string): UseFetchResult => {
  const [data, setData] = useState<any | null>(null);
  const [isPending, setIsPending] = useState<boolean>(true);
  const [error, setError] = useState<any | null>(null);

  useEffect(() => {
    api
      .get(`/600/houses/${id}`)
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
export const getAddress = (lat: number, lng: number) => {
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
export const addHouse = (body) => {
  return new Promise((resolve, reject) => {
    api
      .post("/600/houses", body)
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
      .put(`/600/houses/${id}`, body)
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
      .delete(`/600/houses/${id}`)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

//logout
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
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
