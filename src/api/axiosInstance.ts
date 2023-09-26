import axios from "axios";

// const CORS = import.meta.env.VITE_CORS_URL

export const axiosInstance = axios.create({
    baseURL: `https://api.mangadex.org/`,
    // proxy: {
    //     protocol: 'http',
    //     host: '172.17.10.154',
    //     port: 8080
    // }
})