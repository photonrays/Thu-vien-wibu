import { ExtendManga } from "../api/extend";
import placeholder from '@/assets/No-Image-Placeholder.png'

export default function getCoverArt(manga: ExtendManga | null | undefined) {
    const CorsProxy = '';

    if (!manga) return placeholder
    if (manga.cover_art?.attributes) {
        return `${CorsProxy}https://uploads.mangadex.org/covers/${manga.id}/${manga.cover_art.attributes.fileName}.256.jpg`
    }
    return placeholder
}