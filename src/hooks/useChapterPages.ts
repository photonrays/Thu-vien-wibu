import { getAtHomeServerChapterId } from "@/api/atHome"
import useSWR from 'swr/immutable'


export default function useChapterPages(id: string | null | undefined) {
    console.log("fetching chapter's pages...")
    let chapterPages: string[] = []
    let pageList: number[] = []
    const { data, isLoading } = useSWR(id ? ['chapterPages', id] : null, () => getAtHomeServerChapterId(id!))
    if (data) {
        chapterPages = data
        pageList = Array.from({ length: data.length }, (_, index) => index + 1)
    }


    return { chapterPages, chapterPagesLoading: isLoading, pageList }
}
