import { AxiosError } from "axios";

export interface UserRegister {
  email: string;
  password: string;
}

export interface UseFetchHouseResult {
  data: House | null;
  dataLength?: number | null;
  isPending: boolean;
  error: AxiosError | null;
}

export interface UseFetchHousesResult {
  data: House[] | null;
  dataLength?: number | null;
  isPending: boolean;
  error: AxiosError | null;
}

export interface House {
  address: string;
  description: string;
  phone: string;
  position: { lat: number; lng: number };
  id: number;
  userId: number;
}
export interface HouseForm {
  address: string;
  description: string;
  phone: string;
  position: { lat: number; lng: number };
}
