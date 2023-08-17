import { ExtendManga } from "../api/extend";
import placeholder from '@/assets/No-Image-Placeholder.png'

export default function getCoverArt(manga: ExtendManga | undefined) {
    if (!manga) return placeholder
    if (manga.cover_art?.attributes) {
        return `https://mangadex.org/covers/${manga.id}/${manga.cover_art.attributes.fileName}.256.jpg`
    }
    return placeholder
}