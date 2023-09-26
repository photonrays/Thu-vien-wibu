import { ExtendChapter } from "@/api/extend"
import { getMangaFeed } from "@/api/manga"
import useSWR from 'swr'


export default function useChapterList(mangaId: string) {
    let chapters: Record<string, ExtendChapter[]> = {}
    const { data, isLoading } = useSWR(`manga/${mangaId}/feed`, () => getMangaFeed(mangaId))
    if (data) {
        const sortedChapters: Record<string, ExtendChapter[]> = {}
        for (const chapter of data) {
            const volume = chapter.attributes.volume || '-1'
            if (!sortedChapters[volume]) {
                sortedChapters[volume] = []
            }
            sortedChapters[volume].push(chapter)
        }
        chapters = sortedChapters
    }

    return { chapters, data, isLoading }
}
