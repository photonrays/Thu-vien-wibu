import { GetSearchMangaRequestOptions, getMangaList } from "@/api/manga"
import { Includes } from "@/api/static"
import useSWR from "swr"

export default function useSearch(options: GetSearchMangaRequestOptions) {
    if (!options.includes) {
        options.includes = [Includes.COVER_ART]
    }
    const { data, isLoading } = useSWR(['search-manga', options], () => getMangaList(options))

    return { data, isLoading }
}