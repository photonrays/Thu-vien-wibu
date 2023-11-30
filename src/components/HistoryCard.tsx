import { readingHistory } from "@/hooks/useReadingHistory";
import Iconify from "./Iconify";
import { Link } from "react-router-dom";

export function HistoryCard({id, history, handleDelete}: {id: string, history: readingHistory, handleDelete: () => void}) {
  return (
    <div className="w-full h-24 mb-6 flex relative border-b-2 pb-1">
      <Link to={`truyen-tranh/${id}`} className="h-full w-auto shrink-0">
        <img src={history.cover} className="w-full h-full object-contain rounded-md" />
      </Link>
      <div className="flex flex-col justify-center gap-1 ml-2 py-2">
        <Link to={`truyen-tranh/${id}`} className="text-lg font-bold line-clamp-2">{history.mangaTitle}</Link>
        <Link to={`chuong/${history.chapterId}`} className="line-clamp-1">{history.chapterTitle}</Link>
      </div>
      <div className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-[#E75C62] hover:text-white cursor-pointer rounded-md" onClick={handleDelete}><Iconify icon="mdi:trash-outline" height={24} width={24} /></div>
    </div>
  );
}
