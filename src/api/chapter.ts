/********************
 * IMPORT STATEMENTS
 ********************/

import { MangaContentRating } from './manga';
import type { ChapterList, ChapterResponse, ReferenceExpansionChapter, ChapterEdit, Response } from './schema';
import { Includes, Order } from './static';
import extendRelationship from "@/utils/extendRelationship";
import { axiosInstance } from "./axiosInstance";
import { ExtendChapter } from "./extend";



/*******************
 * TYPE DEFINITIONS
 *******************/

/** Order object for GetChapterRequestOptions */
export type GetChapterOrder = {
    createdAt?: Order
    updatedAt?: Order
    publishAt?: Order
    readableAt?: Order
    volume?: Order
    chapter?: Order
};

/***********************
 * API REQUEST/RESPONSE
 ***********************/

/** Request parameters for `GET /chapter` */
export type GetChapterRequestOptions = {
    /**
     * ```console
     * Default: 10
     * Minimum: 0
     * Maximum: 100
     * ```
     */
    limit?: number
    offset?: number
    /** UUID formatted strings (limited to 100 per request) */
    ids?: string[]
    title?: string
    /** UUID formatted strings */
    groups?: string[]
    /** UUID formatted string(s) */
    uploader?: string | string[]
    /** UUID formatted string */
    manga?: string
    volume?: string | string[]
    chapter?: string | string[]
    /** ISO 639-1 standard two or five letter language code */
    translatedLanguage?: string[]
    /** ISO 639-1 standard two or five letter language code */
    originalLanguage?: string[]
    /** ISO 639-1 standard two or five letter language code */
    excludedOriginalLanguage?: string[]
    contentRating?: MangaContentRating[]
    /** UUID formatted string */
    excludedGroups?: string[]
    /** UUID formatted string */
    excludedUploaders?: string[]
    /** Default: '1' */
    includeFutureUpdates?: '0' | '1'
    includeEmptyPages?: 0 | 1
    includeFuturePublishAt?: 0 | 1
    includeExternalUrl?: 0 | 1
    /** DateTime formatted as YYYY-MM-DDTHH:mm:SS */
    createdAtSince?: string
    /** DateTime formatted as YYYY-MM-DDTHH:mm:SS */
    updatedAtSince?: string
    /** DateTime formatted as YYYY-MM-DDTHH:mm:SS */
    publishAtSince?: string
    order?: GetChapterOrder
    includes?: ReferenceExpansionChapter
};

/** Response from `GET /chapter` */
export type GetChapterResponse = ChapterList;

/** Request parameters for `GET /chapter/{id}` */
export type GetChapterIdRequestOptions = {
    includes?: ReferenceExpansionChapter
};

/** Response from `GET /chapter/{id}` */
export type GetChapterIdResponse = ChapterResponse;

/** Request parameters for `PUT /chapter/{id}` */
export type PutChapterIdRequestOptions = ChapterEdit;

/** Response from `PUT /chapter/{id}` */
export type PutChapterIdResponse = ChapterResponse;

/** Response from `DELETE /chapter/{id}` */
export type DeleteChapterIdResponse = Response;

/***********************
 * FUNCTION DEFINITIONS
 ***********************/

export const getChapterList = async (requestParams: GetChapterRequestOptions): Promise<ExtendChapter[]> => {
    let chapters: ExtendChapter[] = [];

    const { data } = await axiosInstance.get<GetChapterResponse>("chapter", {
        params: requestParams,
    })

    if (data) {
        chapters = data.data.map(c => extendRelationship(c) as ExtendChapter)
    }

    return chapters
}

export const getChapterById = async(chapterId: string): Promise<ExtendChapter | null> => {
    const requestParams: GetChapterIdRequestOptions = {
        includes: [Includes.MANGA, Includes.SCANLATION_GROUP, Includes.USER],
    };

    const {data} = await axiosInstance.get<GetChapterIdResponse>(`chapter/${chapterId}`, {
        params: requestParams
    })
    if (data) {
        return extendRelationship(data.data) as ExtendChapter
    }
    return null
}