import { ExtendManga } from "../api/extend";
import placeholder from "@/assets/No-Image-Placeholder.png";

export default function getCoverArt(manga: ExtendManga | null | undefined) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const CorsProxy = import.meta.env.VITE_APP_CORS_PROXY;

  if (!manga) return placeholder;
  if (manga.cover_art?.attributes) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return `${CorsProxy}image/https://uploads.mangadex.org/covers/${manga.id}/${manga.cover_art.attributes.fileName}.256.jpg`;
  }
  return placeholder;
}
