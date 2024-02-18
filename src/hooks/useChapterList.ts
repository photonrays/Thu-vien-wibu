import { ExtendChapter } from "@/api/extend";
import { getMangaFeed } from "@/api/manga";
import useSWR from "swr";

export default function useChapterList(mangaId: string | null | undefined) {
  console.log("fetching chapter list...");
  let chapters: Record<string, ExtendChapter[]> = {};
  const ids: string[] = [];
  const { data, isLoading } = useSWR(
    mangaId ? [`mangaFeed`, mangaId] : null,
    () => getMangaFeed(mangaId!)
  );
  if (data) {
    console.log(data);
    const sortedChapters: Record<string, ExtendChapter[]> = {};
    for (const chapter of data) {
      const volume = chapter.attributes.volume || -1;
      if (!sortedChapters[volume]) {
        sortedChapters[volume] = [];
      }
      sortedChapters[volume].push(chapter);
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

  return { chapters, chaptersLoading: isLoading, chapterIdList: ids };
}
