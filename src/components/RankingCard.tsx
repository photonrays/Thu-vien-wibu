import { ExtendManga } from "@/api/extend";
import getCoverArt from "@/utils/getCoverArt";
import { getMangaTitle } from "@/utils/getTitles";
import { Link } from "react-router-dom";

export default function RankingCard({data, rank}: {data: ExtendManga, rank: number}) {
    return (
        <div className="flex items-center">
            <div className="w-8 h-20 shrink-0 text-center flex items-center text-2xl font-bold">{rank + 1}</div>
            <Link to={`truyen-tranh/${data.id}`} className="h-20 mb-3 flex relative border-b-2 pb-1 grow">
                <div className="h-full w-14 shrink-0">
                    <img src={getCoverArt(data)} className="w-full h-full object-cover rounded-md" />
                </div>
                <div className="flex flex-col justify-center gap-1 ml-2 py-2 grow-0">
                    <p className="text-lg font-bold line-clamp-2">{getMangaTitle(data)}</p>
                </div>
            </Link>
        </div>
    )
}