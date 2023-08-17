import extendRelationship from "@/utils/extendRelationship";
import { axiosInstance } from "./axiosInstance";
import { ExtendChapter } from "./extend";
import { ChapterList, Manga, MangaResponse } from './schema';
import { getPreviousMonthDateTimeUTC } from "./utils";


export const getLatestChapter = async (page: number): Promise<ExtendChapter[]> => {
    const requestParams = {
        limit: 64,
        offset: (page - 1) * 64,
        includes: ["scanlation_group"],
        order: { readableAt: "desc" },
        contentRating: ["safe", "suggestive", "erotica", "pornographic"],
    };

    let chapters: ExtendChapter[] = [];

    const {data, status} = await axiosInstance.get<ChapterList>("chapter", {
        params: requestParams,
    })

    if (status === 200) {
        chapters = data.data.map(c => extendRelationship(c) as ExtendChapter)
    }

    return chapters
}