import { axiosInstance } from "./axiosInstance"
import { getPreviousMonthDateTimeUTC } from "./utils"
import { GetSearchMangaRequestOptions, MangaList, TagResponse } from "./schema"
import extendRelationship from "@/utils/extendRelationship";
import { ExtendManga } from "./extend";

export const getPopularNewTitle = async (): Promise<ExtendManga[]> => {
  const requestParams = {
    includes: ["cover_art"],
    order: { followedCount: "desc" },
    contentRating: ["safe", "suggestive"],
    hasAvailableChapters: "true",
    createdAtSince: getPreviousMonthDateTimeUTC(),
  };

  let mangas: ExtendManga[] = []

  const {data, status} = await axiosInstance.get<MangaList>("manga", {
    params: requestParams,
  })

  if (status === 200) {
    mangas = data.data.map(mg => extendRelationship(mg) as ExtendManga)
  }

  return mangas;
}

// export async function getMangas(options: GetSearchMangaRequestOptions): Promise<MangaList> {
//   const requestParams = {
//     includes: ["cover_art"],
//     order: { followedCount: "desc" },
//     contentRating: ["safe", "suggestive"],
//     hasAvailableChapters: "true",
//     createdAtSince: getPreviousMonthDateTimeUTC(),
//   };

//   const {data} = await axiosInstance.get<MangaList>("manga", {
//     params: requestParams,
//   })

//   return data;
// }


export const getLastestUpdates = async (page: number): Promise<ExtendManga[]> => {
  const requestParams: GetSearchMangaRequestOptions = {
    includes: ["cover_art"],
    order: { followedCount: "desc" },
    hasAvailableChapters: "true",
    limit: 15,
    offset: (page - 1) * 15
  };

  let mangas: ExtendManga[] = []

  const {data, status} = await axiosInstance.get<MangaList>("manga", {
    params: requestParams,
  })

  if (status === 200) {
    mangas = data.data.map(mg => extendRelationship(mg) as ExtendManga)
  }

  return mangas;
}


export const getMangasByIds = async (mangaIds: string[]): Promise<Record<string, ExtendManga>> => {
  const requestParams: GetSearchMangaRequestOptions = {
    includes: ["cover_art"],
    ids: mangaIds,
    contentRating: ["safe", "suggestive", "erotica", "pornographic"],
    hasAvailableChapters: "true",
    limit: 100
  };

  const {data, status} = await axiosInstance.get<MangaList>("manga", {
    params: requestParams,
  });

  let mangas: ExtendManga[] = []
  const updates: Record<string, ExtendManga> = {}

  if (status === 200) {
    mangas = data.data.map(mg => extendRelationship(mg) as ExtendManga)
    for (const manga of mangas) {
      if (!updates[manga.id]) {
        updates[manga.id] = manga
      }
    }
  }

  return updates;
}

export const getTag = async(): Promise<TagResponse> => {
  const response = await axiosInstance.get<TagResponse>("manga/tag")

  return response.data
}