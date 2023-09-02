import { axiosInstance } from './axiosInstance';
import { GetMangasStatisticResponse, MangaStatistic } from './schema';

export type GetMangasStatisticRequestOptions = {
    manga: string[]
}

export const getMangaStatistic = async (mangaId: string): Promise<MangaStatistic> => {
    const { data } = await axiosInstance.get<GetMangasStatisticResponse>(`statistics/manga/${mangaId}`)

    return data.statistics[mangaId]
}