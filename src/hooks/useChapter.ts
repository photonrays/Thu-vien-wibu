import { getChapterById } from "@/api/chapter"
import useSWR from 'swr'


export default function useChapter(id: string | null | undefined) {
    const { data, isLoading } = useSWR(id ? ['chapter', id] : null, () => getChapterById(id!))

    return { chapter: data, chapterLoading: isLoading }
}
