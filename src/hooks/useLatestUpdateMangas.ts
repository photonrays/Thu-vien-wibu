import useSWR, { KeyedMutator } from 'swr/immutable'
import { GetSearchMangaRequestOptions, MangaContentRating, getSearchManga } from '../api/manga';
import { Includes } from '../api/static';
import { Chapter, ChapterList, ErrorResponse, Manga, MangaList } from '@/api/schema';

type Props = {
    latestChapter: {
        [key: string]: Chapter[];
    },
    chapterLoading: boolean,
    page: number,
    mutate: KeyedMutator<{
        data: ErrorResponse | ChapterList;
        statusCode?: number | undefined;
        statusMessage?: string | undefined;
    }>
}

export default function useLatestUpdateMangas({ latestChapter, chapterLoading, mutate, page }: Props) {
    const requestParams: GetSearchMangaRequestOptions = {
        includes: [Includes.COVER_ART],
        ids: Object.keys(latestChapter),
        contentRating: [MangaContentRating.EROTICA, MangaContentRating.PORNOGRAPHIC, MangaContentRating.SAFE, MangaContentRating.SUGGESTIVE],
        hasAvailableChapters: "true",
        availableTranslatedLanguage: ['en'],
        limit: 64
    };

    const { data, isLoading } = useSWR(!chapterLoading ? ['lastestUpdates', page] : null, () => getSearchManga(requestParams))
    const successData = data && data.data.result === "ok" && (data.data)
    const updates: { [key: string]: { manga: Manga, chapterList: Chapter[] } } = {}
    const latestChapters = {} as { [key: string]: Chapter[] };


    if (successData && !isLoading) {
        for (const manga of (successData as MangaList).data) {
            updates[manga.id] = { manga, chapterList: latestChapters[manga.id] }
        }
    }

    return { latestUpdates: updates, latestUpdatesLoading: isLoading, mutateLatestChapter: mutate }
}