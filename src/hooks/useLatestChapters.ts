import { getChapterList, GetChapterRequestOptions } from "@/api/chapter"
import { ExtendChapter } from "@/api/extend"
import { MangaContentRating } from "@/api/manga";
import { Includes, Order } from "@/api/static";
import useSWR from 'swr'


export default function useLatestChapters(page: number) {
  const requestParams: GetChapterRequestOptions = {
    limit: 64,
    offset: (page - 1) * 64,
    includes: [Includes.SCANLATION_GROUP],
    order: { readableAt: Order.DESC },
    contentRating: [MangaContentRating.SAFE, MangaContentRating.EROTICA, MangaContentRating.SUGGESTIVE, MangaContentRating.PORNOGRAPHIC],
    translatedLanguage: ['vi']
};
  const { data, isLoading } = useSWR<ExtendChapter[]>(['lastestChapter', page], () => getChapterList(requestParams))
  
  return { chapters: data, chaptersLoading: isLoading }
}
