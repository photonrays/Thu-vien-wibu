import { getExtendedMangaList, GetSearchMangaRequestOptions, MangaContentRating } from "@/api/manga"
import { Includes, Order } from "@/api/static";
import { getPreviousMonthDateTimeUTC } from "@/api/utils";
import useSWR from 'swr'


export default function usePopularNewTitles() {
    const requestParams: GetSearchMangaRequestOptions = {
        includes: [Includes.COVER_ART, Includes.AUTHOR, Includes.ARTIST],
        order: { followedCount: Order.DESC },
        contentRating: [MangaContentRating.SAFE, MangaContentRating.SUGGESTIVE],
        hasAvailableChapters: "true",
        createdAtSince: getPreviousMonthDateTimeUTC(),
        availableTranslatedLanguage: ["vi"]
      };
    const {data, isLoading} = useSWR('popularNewTitle', () => getExtendedMangaList(requestParams)) 

    return {populars: data, popularLoading: isLoading}
}
