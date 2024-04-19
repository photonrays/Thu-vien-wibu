import { GetChapterRequestOptions, getChapter } from "../api/chapter"
import useSWR from 'swr/immutable'
import { Includes, Order } from "../api/static";
import useLatestUpdateMangas from "./useLatestUpdateMangas";
import { MangaContentRating } from "@/api/manga";
import { Chapter } from "@/api/schema";


export default function useLatestChapters(page: number) {
    const date = new Date;
    const requestParams: GetChapterRequestOptions = {
        limit: 64,
        offset: (page - 1) * 64,
        includes: [Includes.SCANLATION_GROUP, Includes.USER],
        order: { readableAt: Order.DESC },
        contentRating: [MangaContentRating.SAFE, MangaContentRating.EROTICA, MangaContentRating.SUGGESTIVE, MangaContentRating.PORNOGRAPHIC],
        translatedLanguage: ['vi']
    };
    const { data, isLoading } = useSWR(['lastestChapter', page, date.getMinutes()], () => getChapter(requestParams))
    const successData = data && data.data.result === "ok" && (data.data)
    const latestChapters: { [key: string]: Chapter[] } = {};

    if (successData && !isLoading) {
        for (const chapter of successData.data) {
            const mangaId = chapter.relationships?.filter(rela => rela.type == "manga")[0].id
            if (!latestChapters[mangaId]) {
                latestChapters[mangaId] = []
            }
            latestChapters[mangaId].push(chapter)
        }
    }

    return useLatestUpdateMangas({ latestChapter: latestChapters, chapterLoading: isLoading, page })
}
