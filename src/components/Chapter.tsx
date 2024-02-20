import { formatNowDistance } from "@/utils/dateFns";
import { ExtendChapter } from "@/api/extend";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useState } from "react";

function ChapterDetail({ chapter }: { chapter: ExtendChapter }) {
    return (
        <Link to={`/chuong/${chapter.id}`} className="grid sm:grid-cols-chapter-grid grid-cols-2 p-2 bg-slate-100 mb-2 hover:bg-slate-300">
            <div>
                <span className="flex items-center"><Icon icon='ph:eye' className="inline mr-2" /><span className="line-clamp-1">Chương {chapter.attributes.chapter}</span></span>
                <span className="flex items-center"><Icon icon='octicon:people-24' className="inline mr-2" /><span className="line-clamp-1">{chapter.scanlation_group?.attributes?.name}</span></span>
                <span className="flex items-center sm:hidden"><Icon icon='octicon:person-24' className="inline mr-2" /><span className="line-clamp-1">{chapter.scanlation_group?.attributes?.name}</span></span>
            </div>

            <div className="sm:block hidden">
                <span className="flex items-center"><Icon icon='mdi:clock-outline' className="inline mr-2" />{formatNowDistance(new Date(chapter.attributes?.readableAt)) || ""}</span>
                <span className="flex items-center"><Icon icon='octicon:person-24' className="inline mr-2" />{chapter.user?.attributes?.username}</span>
            </div>

            <div className="justify-self-end">
                <span className="flex items-center sm:justify-center justify-end"><Icon icon='ph:eye' className="inline mr-2" />N/A</span>
                <span className="flex items-center sm:justify-center justify-end"><Icon icon='majesticons:comment-line' className="inline mr-2" />28</span>
                <span className="flex items-center sm:justify-center justify-end sm:hidden"><Icon icon='mdi:clock-outline' className="inline mr-2" />5 years ago</span>
            </div>
        </Link>
    )
}

export default function Chapter({ volume, chapterList }: { volume?: string, chapterList?: ExtendChapter[] }) {
    const [collapse, setCollapse] = useState(false)

    return (
        <div>
            <div className='flex justify-between mt-4'>
                <div className="flex-1"><p className="text-left">{volume && volume !== '-1' ? `Tập ${volume}` : 'Không có tập'}</p></div>
                <div className="flex-1"><p className="text-center">{chapterList && chapterList?.length > 0 ? `Chương ${chapterList[chapterList?.length - 1].attributes.chapter || 'N/A'} - ${chapterList[0].attributes.chapter || 'N/A'}` : 'N/A'}</p></div>
                <div className="flex-1"><p className="text-right">{chapterList?.length} <Icon icon="ep:arrow-down-bold" className={`transition-all inline cursor-pointer ${collapse ? 'rotate-180' : ''}`} onClick={() => setCollapse(prev => !prev)} /></p></div>
            </div>
            <div className={`w-full transition-all ${collapse ? 'h-0 overflow-hidden' : 'h-full'}`}>
                {chapterList?.map((obj, index) => <ChapterDetail key={index} chapter={obj} />)}
            </div>
        </div>
    )
}
