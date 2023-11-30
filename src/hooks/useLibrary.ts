import useLocalStorage from "./useLocalStorage";

export type readingHistory = {
    mangaTitle: string,
    cover: string,
    chapterId: string,
    chapterTitle: string,
}

export default function useLibrary() {
    const [history, setHistory] = useLocalStorage<Record<string, readingHistory>>('library', {})

    const addHistory = (mangaId: string, data: readingHistory) => {
        setHistory((value) => ({ [mangaId]: data, ...value, }))
    }

    const removeHistory = (mangaId: string) => {
        setHistory((value) => {
            delete value[mangaId]
            return { ...value }
        })
    }

    return { history, setHistory, addHistory, removeHistory }
}