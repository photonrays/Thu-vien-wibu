import { ExtendChapter, ExtendManga } from "@/api/extend";
import { getMangasByIds } from "@/api/manga";
import useLatestChapters from "@/hooks/useLatestChapters";
import { createContext, useContext, useState, useEffect } from "react";

type LatestUpdateProps = {
    chapterList: ExtendChapter[],
    manga: ExtendManga
}

interface MangaContextProps {
    manga: ExtendManga | null;
    setManga: React.Dispatch<React.SetStateAction<ExtendManga | null>>;
    latestUpdates: Record<string, LatestUpdateProps>;
    setLatestUpdates: React.Dispatch<React.SetStateAction<Record<string, LatestUpdateProps>>>;
}

export const MangaContext = createContext<MangaContextProps>({
    manga: null,
    setManga: () => null,
    latestUpdates: {},
    setLatestUpdates: () => null,
});

export function MangaProvider({ children }: { children: React.ReactNode }) {
    const [manga, setManga] = useState<ExtendManga | null>(null)
    const [latestChapters, setLatestChapters] = useState<Record<string, ExtendChapter[]>>({})
    const [latestUpdates, setLatestUpdates] = useState<Record<string, LatestUpdateProps>>({});

    const { chapters, chaptersLoading } = useLatestChapters(1)

    useEffect(() => {
        if (chapters && !chaptersLoading) {
            const updates: Record<string, ExtendChapter[]> = {}
            for (const chapter of chapters) {
                // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
                const mangaId = chapter.manga?.id!
                if (!updates[mangaId]) {
                    updates[mangaId] = []
                }
                updates[mangaId].push(chapter)
                setLatestChapters(updates)
            }
        }
    }, [chapters, chaptersLoading])

    useEffect(() => {
        if (Object.entries(latestChapters).length > 0) {
            console.log(latestChapters)
            getMangasByIds(Object.keys(latestChapters)).then(data => {
                const updates: Record<string, LatestUpdateProps> = {}
                Object.entries(data).forEach(([mangaId, manga]) => updates[mangaId] = { manga, chapterList: latestChapters[mangaId] })
                setLatestUpdates(updates)
            }).catch(e => console.log(e))
        }
    }, [latestChapters])

    console.log(latestUpdates)


    return (
        <MangaContext.Provider value={{ manga, setManga, latestUpdates, setLatestUpdates }}>
            {children}
        </MangaContext.Provider>
    );
}

export const useManga = () => useContext(MangaContext);
