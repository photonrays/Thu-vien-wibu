import { getExtendedMangaList, GetSearchMangaRequestOptions, MangaContentRating } from "@/api/manga"
import { Includes, Order } from "@/api/static";
import useSWR from 'swr'


export default function useMangaRanking(page: number) {
    const requestParams: GetSearchMangaRequestOptions = {
        includes: [Includes.COVER_ART],
        order: { followedCount: Order.DESC },
        contentRating: [MangaContentRating.SAFE, MangaContentRating.SUGGESTIVE],
        hasAvailableChapters: "true",
        limit: 15,
        offset: (page - 1) * 15,
        availableTranslatedLanguage: ['vi']
      };
    const {data, isLoading} = useSWR('mangaRanking', () => getExtendedMangaList(requestParams)) 

    return {ranking: data, rankingLoading: isLoading}
}
