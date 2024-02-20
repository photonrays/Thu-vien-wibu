import { ExtendManga } from "@/api/extend";
import getCoverArt from "@/utils/getCoverArt";
import { getMangaTitle } from "@/utils/getTitles";
import { Link } from "react-router-dom";

export default function Card({ manga }: { manga: ExtendManga }) {
    return (
        <Link to={`/truyen-tranh/${manga.id}`} className="w-full max-w-[238px] max-h-[338px] bg-gray-300 relative rounded-md overflow-hidden">
            <img src={getCoverArt(manga)} className="w-full h-full object-cover" />
            <div
                className='absolute bottom-0 h-1/2 w-full bg-gradient-to-b from-transparent to-[#000000] transition-all'></div>
            <p className="absolute bottom-0 text-white text-sm sm:text-md lg:text-lg p-2">{getMangaTitle(manga)}</p>
        </Link>
    )
}
