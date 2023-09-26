import { getLatestChapter } from "@/api/chapter"
import { ExtendChapter } from "@/api/extend"
import useSWR from 'swr'


export default function useLatestChapters(page: number) {
    const {data, isLoading, error} = useSWR<ExtendChapter[]>('latestChapter', () => getLatestChapter(page)) 
    let chapters: Record<string, ExtendChapter[]> = {}
    if (data) {
        const updates: Record<string, ExtendChapter[]> = {}
        for (const chapter of data) {
          // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
          const mangaId = chapter.manga?.id!
          if (!updates[mangaId]) {
            updates[mangaId] = []
          }
          updates[mangaId].push(chapter)
        }
        chapters = updates
      }

    return {chapters: chapters, chaptersLoading: isLoading, error}
}
