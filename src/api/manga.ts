/********************
 * IMPORT STATEMENTS
 ********************/

import { MangaList, ChapterList, MangaResponse, TagResponse, ErrorResponse } from './schema';
import { Order, Includes } from './static';
import * as util from './util';

/*******************
 * ENUM DEFINITIONS
 *******************/

/** Enum for manga reading status */
export enum MangaReadingStatus {
  READING = 'reading',
  ON_HOLD = 'on_hold',
  PLAN_TO_READ = 'plan_to_read',
  DROPPED = 'dropped',
  RE_READING = 're_reading',
  COMPLETED = 'completed',
}

/** Enum for manga content rating */
export enum MangaContentRating {
  SAFE = 'safe',
  SUGGESTIVE = 'suggestive',
  EROTICA = 'erotica',
  PORNOGRAPHIC = 'pornographic',
}

/** Enum for manga publication demographic */
export enum MangaPublicationDemographic {
  NONE = 'none',
  SHOUNEN = 'shounen',
  SHOUJO = 'shoujo',
  JOSEI = 'josei',
  SEINEN = 'seinen',
}

/** Enum for manga publication status */
export enum MangaPublicationStatus {
  COMPLETED = 'completed',
  ONGOING = 'ongoing',
  CANCELLED = 'cancelled',
  HIATUS = 'hiatus',
}

/** Enum for Mangadex manga state */
export enum MangadexMangaState {
  DRAFT = 'draft',
  SUBMITTED = 'submitted',
  PUBLISHED = 'published',
  REJECTED = 'rejected',
}

/*******************
 * TYPE DEFINITIONS
 *******************/

/** Aggregate chapter type used in AggregateVolume for GetMangaIdAggregateResponse */
export type AggregateChapter = {
  chapter: string
  /** UUID formatted string */
  id: string
  /** UUID formatted strings */
  others: string[]
  /** Total number of chapters across filtered languages */
  count: number
};

/** Aggregate volume type for GetMangaIdAggregateResponse */
export type AggregateVolume = {
  volume: string
  /** Total number of chapters in volume across filtered languages */
  count: number
  chapters: Record<string, AggregateChapter>
};

/** Order object for GetSearchMangaRequestOptions */
export type GetSearchMangaOrder = {
  title?: Order
  year?: Order
  createdAt?: Order
  updatedAt?: Order
  latestUploadedChapter?: Order
  followedCount?: Order
  relevance?: Order
  rating?: Order
};

/** Order object for GetMangaIdFeedRequestOptions */
export type GetMangaIdFeedOrder = {
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

/** Request parameters for `GET /manga` */
export type GetSearchMangaRequestOptions = {
  /** Default: 10 */
  limit?: number
  offset?: number
  title?: string
  authors?: string[]
  artists?: string[]
  /** Year of release */
  year?: number
  includedTags?: string[]
  /** Default: AND */
  includedTagsMode?: 'AND' | 'OR'
  excludedTags?: string[]
  /** Default: OR */
  excludedTagsMode?: 'AND' | 'OR'
  status?: MangaPublicationStatus[]
  /** ISO 639-1 standard two or five letter language code */
  originalLanguage?: string[]
  /** ISO 639-1 standard two or five letter language code */
  excludedOriginalLanguage?: string[]
  /** ISO 639-1 standard two or five letter language code */
  availableTranslatedLanguage?: string[]
  publicationDemographic?: MangaPublicationDemographic[]
  /** Manga IDs, limited to 100 per request */
  ids?: string[]
  /** Default: ['safe', 'suggestive', 'erotica'] */
  contentRating?: MangaContentRating[]
  /** DateTime string with following format: YYYY-MM-DDTHH:mm:SS */
  createdAtSince?: string
  /** DateTime string with following format: YYYY-MM-DDTHH:mm:SS */
  updatedAtSince?: string
  /** Default:
   * ```
   * { latestUploadedChapter: 'desc' }
   * ``` */
  order?: GetSearchMangaOrder
  includes?: Includes[]
  hasAvailableChapters?: '0' | '1' | 'true' | 'false'
  /** UUID formatted string */
  group?: string
};

/** Response from `GET /manga` */
export type GetSearchMangaResponse = MangaList;

/** Response from `GET /manga/status` */
export type GetMangaStatusResponse = {
  /** Default: "ok" */
  result: string
  /**
   * Property names in `statuses` are UUID formatted strings
   * 
   * Example:
   * ```
   * {
   *     "result": "ok",
   *     "statuses": {
   *         "b019ea5d-5fe6-44d4-abbc-f546f210884d": "reading"
   *         "2394a5c7-1d2e-461f-acde-18726b9e37d6": "dropped"
   *     }
   * }
   * ```
   */
  statuses: Record<string, MangaReadingStatus>
};

/** Request parameters for `GET /manga/{id}/feed` */
export type GetMangaIdFeedRequestOptions = {
  /**
   * ```console
   * Default: 100
   * Minimum: 1
   * Maximum: 500
   * ```
   */
  limit?: number
  /** Minimum: 0 */
  offset?: number
  /** ISO 639-1 standard two or five letter language code */
  translatedLanguage?: string[]
  /** ISO 639-1 standard two or five letter language code */
  originalLanguage?: string[]
  /** ISO 639-1 standard two or five letter language code */
  excludedOriginalLanguage?: string[]
  contentRating?: MangaContentRating[]
  /** UUID formatted strings */
  excludedGroups?: string[]
  /** UUID formatted strings */
  excludedUploaders?: string[]
  /** Default: 1 */
  includeFutureUpdates?: '0' | '1'
  /** DateTime string with format YYYY-MM-DDTHH:mm:SS */
  createdAtSince?: string
  /** DateTime string with format YYYY-MM-DDTHH:mm:SS */
  updatedAtSince?: string
  /** DateTime string with format YYYY-MM-DDTHH:mm:SS */
  publishAtSince?: string
  order?: GetMangaIdFeedOrder
  includes?: Includes[]
};

/** Response from `GET /manga/{id}/feed` */
export type GetMangaIdFeedResponse = ChapterList;

/** Request parameters for `GET /manga/{id}/aggregate` */
export type GetMangaIdAggregateRequestOptions = {
  /** ISO 639-1 standard two or five letter language code */
  translatedLanguage?: string[]
  /** UUID formatted strings */
  groups?: string[]
};

/** Response from `GET /manga/{id}/aggregate` */
export type GetMangaIdAggregateResponse = {
  /** Default: "ok" */
  result: string
  /** Object containing volumes and their respective chapters */
  volumes: Record<string, AggregateVolume>
};

/** Request parameters for `GET /manga/{id}` */
export type GetMangaIdRequestOptions = {
  includes?: Includes[]
};

/** Response from `GET /manga/{id}` */
export type GetMangaIdResponse = MangaResponse;

/** Response from `GET /manga/{id}/read` */
export type GetMangaIdReadMarkersResponse = {
  result: 'ok'
  /** UUID formatted strings */
  data: string[]
};

/** Request parameters for `GET /manga/read` */
export type GetMangaReadMarkersRequestOptions = {
  /** UUID formatted strings */
  ids: string[]
  /** Group results by manga ID */
  grouped?: boolean
};

/** Response from `GET /manga/read` */
export type GetMangaReadMarkersResponse = {
  result: 'ok'
  /**
   * Type is dependent on value passed into request options `grouped`
   * 
   * For example:
   * 
   * ```console
   * grouped: true
   * data: {
   *     1234abcd-0000-0000-0000-1234abcd5678: [
   *         'abcd1234-1111-1111-1111-abcd1234efab',
   *         'abcd1234-2222-2222-2222-2468acea0246'
   *     ]
   * }
   * 
   * grouped: false
   * data: [
   *     'abcd1234-1111-1111-1111-abcd1234efab',
   *     'abcd1234-2222-2222-2222-2468acea0246'
   * ]
   * ```
   */
  data: string[] | Record<string, string>[];
};

/** Request parameters for `GET /manga/random` */
export type GetMangaRandomRequestOptions = {
  includes?: Includes[]
  contentRating?: MangaContentRating[]
};

/** Response from `GET /manga/random` */
export type GetMangaRandomResponse = MangaResponse;

/** Response from `GET /manga/tag` */
export type GetMangaTagResponse = TagResponse;

/***********************
 * FUNCTION DEFINITIONS
 ***********************/

/**
 * Search for manga.
 * 
 * @param {GetSearchMangaRequestOptions} [options] See {@link GetSearchMangaRequestOptions}
 * @returns A promise that resolves to a {@link GetSearchMangaResponse} object.
 * Will resolve to a {@link ErrorResponse} object on error.
 */
export const getSearchManga = function (options?: GetSearchMangaRequestOptions) {
  const qs = util.buildQueryStringFromOptions(options);
  const path = `/manga${qs}`;

  return util.createHttpsRequestPromise<GetSearchMangaResponse>('GET', path);
};


/**
 * Gets the feed of chapters for the given manga.
 * 
 * @param {string} id UUID formatted string.
 * @param {GetMangaIdFeedRequestOptions} [options] See {@link GetMangaIdFeedRequestOptions}
 * @returns A promise that resolves to a {@link GetMangaIdFeedResponse} object.
 * Will resolve to a {@link ErrorResponse} object on error.
 */
export const getMangaIdFeed = function (id: string, options?: GetMangaIdFeedRequestOptions) {
  if (id === undefined) {
    return Promise.reject('ERROR - getMangaIdFeed: Parameter `id` cannot be undefined');
  } else if (id === '') {
    return Promise.reject('ERROR - getMangaIdFeed: Parameter `id` cannot be blank');
  }

  const qs = util.buildQueryStringFromOptions(options);
  const path = `/manga/${id}/feed${qs}`;

  return util.createHttpsRequestPromise<GetMangaIdFeedResponse>('GET', path);
};

/**
 * Get aggregate manga volume and chapter data.
 * 
 * @param {string} id UUID formatted string.
 * @param {GetMangaIdAggregateRequestOptions} [options] See {@link GetMangaIdAggregateRequestOptions}
 * @returns A promise that resolves to a {@link GetMangaIdAggregateResponse} object.
 * Will resolve to a {@link ErrorResponse} object on error.
 */
export const getMangaIdAggregate = function (id: string, options?: GetMangaIdAggregateRequestOptions) {
  if (id === undefined) {
    return Promise.reject('ERROR - getMangaIdAggregate: Parameter `id` cannot be undefined');
  } else if (id === '') {
    return Promise.reject('ERROR - getMangaIdAggregate: Parameter `id` cannot be blank');
  }

  const qs = util.buildQueryStringFromOptions(options);
  const path = `/manga/${id}/aggregate${qs}`;

  return util.createHttpsRequestPromise<GetMangaIdAggregateResponse>('GET', path);
};

/**
 * Get manga information by ID.
 * 
 * @param {string} id UUID formatted string.
 * @param {GetMangaIdRequestOptions} [options] See {@link GetMangaIdRequestOptions}
 * @returns A promise that resolves to a {@link GetMangaIdResponse} object.
 * Will resolve to a {@link ErrorResponse} object on error.
 */
export const getMangaId = function (id: string, options?: GetMangaIdRequestOptions) {
  if (id === undefined) {
    return Promise.reject('ERROR - getMangaId: Parameter `id` cannot be undefined');
  } else if (id === '') {
    return Promise.reject('ERROR - getMangaId: Parameter `id` cannot be blank');
  }

  const qs = util.buildQueryStringFromOptions(options);
  const path = `/manga/${id}${qs}`;

  return util.createHttpsRequestPromise<GetMangaIdResponse>('GET', path);
};

/**
 * Get a random manga.
 * 
 * @param {GetMangaRandomRequestOptions} [options] See {@link GetMangaRandomRequestOptions}
 * @returns A promise that resolves to a {@link GetMangaRandomResponse} object
 */
export const getMangaRandom = function (options?: GetMangaRandomRequestOptions) {
  const qs = util.buildQueryStringFromOptions(options);
  const path = `/manga/random${qs}`;
  return util.createHttpsRequestPromise<GetMangaRandomResponse>('GET', path);
};

/**
 * Get manga tag list. This function takes no parameters.
 * 
 * @returns A promise that resolves to a {@link GetMangaTagResponse} object
 */
export const getMangaTag = function () {
  const path = `/manga/tag`;
  return util.createHttpsRequestPromise<GetMangaTagResponse>('GET', path);
};
