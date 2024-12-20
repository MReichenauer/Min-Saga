import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const get = async <T>(endpoint: string) => {
  try {
    const response = await instance.get<T>(endpoint);
    return response;
  } catch (error) {
    console.error("Error in get", error);
    throw new Error("Error in get");
  }
};

const post = async <T, U>(endpoint: string, payload: U): Promise<T> => {
  try {
    const response = await instance.post<T>(endpoint, payload);
    return response.data;
  } catch (error) {
    console.error("Error in post", error);
    throw new Error("Error in post");
  }
};

export { get, post };
