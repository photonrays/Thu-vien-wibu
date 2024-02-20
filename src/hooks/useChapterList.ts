import { ExtendChapter } from "@/api/extend";
import { getMangaFeed } from "@/api/manga";
import extendRelationship from "@/utils/extendRelationship";
import useSWR from "swr";

export default function useChapterList(mangaId: string | null | undefined, page: number) {
  console.log("fetching chapter list...");
  let chapters: Record<string, ExtendChapter[]> = {};
  const ids: string[] = [];
  const { data, isLoading } = useSWR(
    mangaId ? [`mangaFeed`, mangaId, page] : null,
    () => getMangaFeed(mangaId!, page)
  );
  if (data) {
    const sortedChapters: Record<string, ExtendChapter[]> = {};
    for (const chapter of data.data) {
      const volume = chapter.attributes.volume || -1;
      if (!sortedChapters[volume]) {
        sortedChapters[volume] = [];
      }
      sortedChapters[volume].push(extendRelationship(chapter) as ExtendChapter);
    }
    chapters = sortedChapters;

    const sortedVolumes = Object.keys(sortedChapters).sort(
      (a, b) => Number(b) - Number(a)
    );
    for (const volume of sortedVolumes) {
      const chapterList = sortedChapters[volume];
      for (const chapter of chapterList) {
        ids.push(chapter.id);
      }
    }
  }

  return { chapters, total: data?.total, offset: data?.limit, limit: data?.limit, chaptersLoading: isLoading, chapterIdList: ids };
}
