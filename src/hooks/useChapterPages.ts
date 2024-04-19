import { getAtHomeServerChapterId } from "@/api/atHome"
import useSWR from 'swr/immutable'


export default function useChapterPages(id: string | null | undefined) {
    console.log("fetching chapter's pages...")
    let pageList: number[] = []
    // const { data, isLoading } = useSWR(id ? ['chapterPages', id] : null, () => getAtHomeServerChapterId(id!))
    // if (data) {
    //     chapterPages = data
    //     pageList = Array.from({ length: data.length }, (_, index) => index + 1)
    // }

    const { data, isLoading } = useSWR(id ? ['chapter-pages', id] : null, () => getAtHomeServerChapterId(id!, {
        forcePort443: false
    }))
    const successData = data && data.data?.chapter
    const pages = successData ? successData.data.map(originalData => `${data.data.baseUrl}/data/${successData.hash}/${originalData}`) : []
    pageList = Array.from({ length: pages.length }, (_, index) => index + 1)

    return { pages, chapterPagesLoading: isLoading, pageList }
}
