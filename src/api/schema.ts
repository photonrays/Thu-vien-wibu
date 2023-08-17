import { Links } from "./static";

export type MangaRequest = {
    title?: LocalizedString
    altTitles?: LocalizedString[]
    description?: LocalizedString
    /** UUID formatted strings */
    authors?: string[]
    /** UUID formatted strings */
    artists?: string[]
    links?: object
    /** Pattern: `^[a-z]{2}(-[a-z]{2})?$` */
    originalLanguage?: string
    lastVolume?: string | null
    lastChapter?: string | null
    publicationDemographic?: 'shounen' | 'shoujo' | 'josei' | 'seinen' | null
    status?: 'completed' | 'ongoing' | 'cancelled' | 'hiatus'
    year?: number | null
    contentRating?: 'safe' | 'suggestive' | 'erotica' | 'pornographic'
    chapterNumbersResetOnNewVolume?: boolean
    /** UUID formatted strings */
    tags?: string[]
    /** UUID formatted string */
    primaryCover?: string | null
    version?: number
};

export type MangaResponse = {
    result: 'ok' | 'error'
    response: string
    data: Manga
};

export type Manga = {
    /** UUID formatted string */
    id: string;
    type: "manga";
    attributes: MangaAttributes;
    relationships: Relationship[];
};

export type GetSearchMangaOrder = {
    title?: "asc" | "desc"
    year?: "asc" | "desc"
    createdAt?: "asc" | "desc"
    updatedAt?: "asc" | "desc"
    latestUploadedChapter?: "asc" | "desc"
    followedCount?: "asc" | "desc"
    relevance?: "asc" | "desc"
    rating?: "asc" | "desc"
};

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
    status?: "ongoing" | "completed" | "hiatus" | "cancelled"
    originalLanguage?: string[]
    excludedOriginalLanguage?: string[]
    availableTranslatedLanguage?: string[]
    publicationDemographic?: ("shounen" | "shoujo" | "josei" | "seinen" | "none")[]
    ids?: string[]
    /** Default: ['safe', 'suggestive', 'erotica'] */
    contentRating?: ("safe" | "suggestive" | "erotica" | "pornographic")[]
    /** DateTime string with following format: YYYY-MM-DDTHH:mm:SS */
    createdAtSince?: string
    /** DateTime string with following format: YYYY-MM-DDTHH:mm:SS */
    updatedAtSince?: string
    order?: GetSearchMangaOrder
    includes?: ("manga" | "cover_art" | "author" | "artist" | "tag" | "creator")[]
    hasAvailableChapters?: '0' | '1' | 'true' | 'false'
    /** UUID formatted string */
    group?: string
};

export type MangaList = {
    result: string
    response: string
    data: Manga[]
    limit: number
    offset: number
    total: number
};

export type LocalizedString = Record<string, string>;

export type MangaAttributes = {
    title: LocalizedString;
    altTitles: LocalizedString[];
    description: LocalizedString;
    isLocked: boolean;
    links: Links;
    originalLanguage: string;
    lastVolume: string | null;
    lastChapter: string | null;
    publicationDemographic: "shounen" | "shoujo" | "josei" | "seinen" | null;
    status: "completed" | "ongoing" | "cancelled" | "hiatus";
    year: number | null;
    contentRating?: ("safe" | "suggestive" | "erotica" | "pornographic")[];
    chapterNumbersResetOnNewVolume: boolean;
    availableTranslatedLanguages: any[];
    /** UUID formatted string */
    latestUploadedChapter: string;
    tags: Tag[];
    state: "draft" | "submitted" | "published" | "rejected";
    version: number;
    createdAt: string;
    updatedAt: string;
};

export type TagResponse = {
    result: string
    response: string
    data: Tag[]
    limit: number
    offset: number
    total: number
}


export type Tag = {
    id: string;
    type: "tag";
    attributes: TagAttributes;
    relationships: Relationship[];
};

export type TagAttributes = {
    name: LocalizedString;
    description: LocalizedString;
    group: "content" | "format" | "genre" | "theme";
    version: number;
};

export type Chapter = {
    /** UUID formatted string */
    id: string
    type: 'chapter'
    attributes: ChapterAttributes
    relationships: Relationship[]
};

export type ChapterAttributes = {
    title: string | null
    volume: string | null
    chapter: string | null
    pages: number
    translatedLanguage: string
    uploader: string
    externalUrl: string | null
    version: number
    createdAt: string
    updatedAt: string
    publishAt: string
    readableAt: string
};


export type ChapterRequest = {
    title?: string | null
    volume?: string | null
    chapter?: string | null
    translatedLanguage?: string
    groups?: string[]
    version?: number
};

export type ChapterList = {
    result: string
    response: string
    data: Chapter[]
    limit: number
    offset: number
    total: number
};

export type CoverResponse = {
    result: string
    /** Default: "entity" */
    response: string
    data: Cover
};

export type Cover = {
    /** UUID formatted string */
    id: string
    type: 'cover_art'
    attributes: CoverAttributes
    relationships: Relationship[]
};

export type CoverAttributes = {
    volume: string | null
    fileName: string
    description: string | null
    locale: string | null
    version: number
    createdAt: string
    updatedAt: string
};


export type AuthorResponse = {
    result: string
    response: string
    data: Author
};

export type Author = {
    /** UUID formatted string */
    id: string
    type: 'author'
    attributes: AuthorAttributes
    relationships: Relationship[]
};

export type AuthorAttributes = {
    name: string
    imageUrl: string
    biography: LocalizedString
    /** Pattern: ^https?:\/\/twitter\.com(\/|$) */
    twitter: string | null
    /** Pattern: ^https?:\/\/([\w-]+\.)?pixiv\.net(\/|$) */
    pixiv: string | null
    /** Pattern: ^https?:\/\/([\w-]+\.)?melonbooks\.co\.jp(\/|$) */
    melonBook: string | null
    /** Pattern: ^https?:\/\/([\w-]+\.)?fanbox\.cc(\/|$) */
    fanBox: string | null
    /** Pattern: ^https?:\/\/([\w-]+\.)?booth\.pm(\/|$) */
    booth: string | null
    /** Pattern: ^https?:\/\/([\w-]+\.)?nicovideo\.jp(\/|$) */
    nicoVideo: string | null
    /** Pattern: ^https?:\/\/([\w-]+\.)?skeb\.jp(\/|$) */
    skeb: string | null
    /** Pattern: ^https?:\/\/([\w-]+\.)?fantia\.jp(\/|$) */
    fantia: string | null
    /** Pattern: ^https?:\/\/([\w-]+\.)?tumblr\.com(\/|$) */
    tumblr: string | null
    /** Pattern: ^https?:\/\/www\.youtube\.com(\/|$) */
    youtube: string | null
    /** Pattern: ^https?:\/\/([\w-]+\.)?weibo\.(cn|com)(\/|$) */
    weibo: string | null
    /** Pattern: ^https?:\/\/([\w-]+\.)?naver\.com(\/|$) */
    naver: string | null
    /** Pattern: ^https?:\/\/ */
    website: string | null
    version: number
    createdAt: string
    updatedAt: string
};

export type ScanlationGroupResponse = {
    result: 'ok'
    /** Default: "entity" */
    response: string
    data: ScanlationGroup
};

export type ScanlationGroup = {
    /** UUID formatted string */
    id: string
    type: 'scanlation_group'
    attributes: ScanlationGroupAttributes
    relationships: Relationship[]
};

export type ScanlationGroupAttributes = {
    name: string
    altNames: LocalizedString[]
    website: string | null
    ircServer: string | null
    ircChannel: string | null
    discord: string | null
    contactEmail: string | null
    description: string | null
    /** Pattern: `^https?://` */
    twitter: string | null
    /** ```console
     * Maximum length: 128
     * Pattern: ^https:\/\/www\.mangaupdates\.com\/(group|publisher)(s\.html\?id=\d+|\/[\w-]+\/?([\w-]+)?(\/)?)$
     */
    mangaUpdates: string | null
    /** Pattern: `^[a-z]{2}(-[a-z]{2})?$` */
    focusedLanguage: string[] | null
    locked: boolean
    official: boolean
    inactive: boolean
    /**
     * Should respect ISO 8601 duration specifications: https://en.wikipedia.org/wiki/ISO_8601#Durations
     * 
     * Pattern: `^(P([1-9]|[1-9][0-9])D)?(P?([1-9])W)?(P?T(([1-9]|1[0-9]|2[0-4])H)?(([1-9]|[1-5][0-9]|60)M)?(([1-9]|[1-5][0-9]|60)S)?)?$`
     */
    publishDelay: string
    /** ```console
     * Minimum: 1
     * ``` */
    version: number
    createdAt: string
    updatedAt: string
};

export type User = {
    /** UUID formatted string */
    id: string
    type: 'user'
    attributes: UserAttributes
    relationships: Relationship[]
};

export type UserAttributes = {
    username: string
    roles: string[]
    /** ```console
     * Minimum: 1
     * ``` */
    version: number
};


export type Relationship = {
    /** UUID formatted string */
    id: string;
    type: string;
    /** Only present if you are on a Manga entity and a Manga relationship */
    related:
    | "monochrome"
    | "main_story"
    | "adapted_from"
    | "based_on"
    | "prequel"
    | "side_story"
    | "doujinshi"
    | "same_franchise"
    | "shared_universe"
    | "sequel"
    | "spin_off"
    | "alternate_story"
    | "alternate_version"
    | "preserialization"
    | "colored"
    | "serialization";
    /** If Reference Expansion is applied, contains objects attributes */
    attributes: any[] | null;
};
