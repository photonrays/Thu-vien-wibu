import axios from "axios";

const CorsProxy = '';

export const axiosInstance = axios.create({
  baseURL: `${CorsProxy}https://api.mangadex.org/`,
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Modify the request config here if needed
    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Add CORS headers to the response
    response.headers['Access-Control-Allow-Origin'] = '*';
    response.headers['Access-Control-Allow-Methods'] = 'GET, OPTIONS';
    response.headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept';

    // Return the modified response
    return response;
  },
  (error) => {
    // Handle response error
    return Promise.reject(error);
  }
);
