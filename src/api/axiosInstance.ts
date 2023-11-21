import axios from "axios";

// const CORS = import.meta.env.VITE_CORS_URL
const CorsProxy = 'https://justcors.com/tl_2864b64/';

export const axiosInstance = axios.create({
    baseURL: `${CorsProxy}https://api.mangadex.org/`,
})