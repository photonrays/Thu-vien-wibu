import useSWR from 'swr/immutable'
import { GetSearchMangaRequestOptions, MangaContentRating, getSearchManga } from '../api/manga';
import { Includes } from '../api/static';
import { Chapter, Manga } from '@/api/schema';

type Props = {
    latestChapter: {
        [key: string]: Chapter[];
    },
    chapterLoading: boolean,
    page: number
}

export default function useLatestUpdateMangas({ latestChapter, chapterLoading, page }: Props) {
    const requestParams: GetSearchMangaRequestOptions = {
        includes: [Includes.COVER_ART],
        ids: Object.keys(latestChapter),
        contentRating: [MangaContentRating.EROTICA, MangaContentRating.PORNOGRAPHIC, MangaContentRating.SAFE, MangaContentRating.SUGGESTIVE],
        hasAvailableChapters: "true",
        availableTranslatedLanguage: ['vi'],
        limit: 64
    };

    const { data, isLoading } = useSWR(!chapterLoading ? ['lastestUpdates', page] : null, () => getSearchManga(requestParams))
    const successData = data && data.data.result === "ok" && (data.data)
    const updates: { [key: string]: { manga: Manga, chapterList: Chapter[] } } = {}

    if (successData && !isLoading) {
        for (const manga of successData.data) {
            updates[manga.id] = { manga, chapterList: latestChapter[manga.id] }
        }
    }

    return { latestUpdates: updates, latestUpdatesLoading: isLoading }
}