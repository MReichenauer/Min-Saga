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

export { get };
