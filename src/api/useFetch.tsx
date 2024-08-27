import { useState, useEffect } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useLocalStorage } from "usehooks-ts";

interface UserRegister {
  email: string;
  password: string;
}

interface UseFetchHouseResult {
  data: House | null;
  dataLength?: number | null;
  isPending: boolean;
  error: AxiosError | null;
}

interface UseFetchHousesResult {
  data: House[] | null;
  dataLength?: number | null;
  isPending: boolean;
  error: AxiosError | null;
}

interface House {
  address: string;
  description: string;
  phone: string;
  position: { lat: number; lng: number };
  id: number;
  userId: number;
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
      api
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
    } else {
      api

        .get(`/houses`, {
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

//edit house
export const editHouse = (id: string, body: House) => {
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
