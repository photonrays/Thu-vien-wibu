import { axiosInstance } from "./axiosInstance"

export const getPopularManga = async() => {
    return await axiosInstance.get('')
}