import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const get = async <T>(endpoint: string) => {
  const response = await instance.get<T>(endpoint);
  return response;
};

const post = async <T, U>(endpoint: string, payload: U): Promise<T> => {
  const response = await instance.post<T>(endpoint, payload);
  return response.data;
};

export { get, post };
