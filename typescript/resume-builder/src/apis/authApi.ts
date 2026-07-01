import axios from "axios";

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export const registerUser = async (data: RegisterPayload) => {
  const response = await axios.post("/api/auth/register", data, {
    withCredentials: true,
  });

  return response.data;
};

export const loginUser = async (data: LoginPayload) => {
  const response = await axios.post("/api/auth/login", data, {
    withCredentials: true,
  });

  return response.data;
};

