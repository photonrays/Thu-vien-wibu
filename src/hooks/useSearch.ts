import { ExtendManga } from "@/api/extend"
import { GetSearchMangaRequestOptions, getMangaList } from "@/api/manga"
import extendRelationship from "@/utils/extendRelationship"
import useSWR from 'swr'


export default function useSearch(option: GetSearchMangaRequestOptions) {
    const { data, isLoading } = useSWR(option ? ['searchManga', option] : null, () => getMangaList(option))
    let mangas: ExtendManga[] = []

    if (data) {
        mangas = data.data.map(mg => extendRelationship(mg) as ExtendManga)
    }

    return { mangaList: mangas, data, mangaListLoading: isLoading }
}
