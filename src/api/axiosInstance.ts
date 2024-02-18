import axios from "axios";

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const CorsProxy = import.meta.env.VITE_APP_CORS_PROXY;

export const axiosInstance = axios.create({
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  baseURL: `${CorsProxy}https://api.mangadex.org/`,
});
