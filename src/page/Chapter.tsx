/* eslint-disable react-hooks/exhaustive-deps */
import { getMangaById } from '@/api/manga'
import Dropdown from '@/components/Dropdown/Dropdown'
import { useHeader } from '@/context/useHeader'
import { useManga } from '@/context/useManga'
import useChapter from '@/hooks/useChapter'
import useChapterList from '@/hooks/useChapterList'
import useChapterPages from '@/hooks/useChapterPages'
import useReadingHistory from '@/hooks/useReadingHistory'
import getChapterTitle from '@/utils/getChapterTitle'
import getCoverArt from '@/utils/getCoverArt'
import { getMangaTitle, getMangaTitleByChapter } from '@/utils/getTitles'
import { Icon } from '@iconify/react'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

// type SettingProp = {
//     pageType: "Single Page" | "Double Page" | "Long Strip",
//     pageLimit: "No Limit" | "Fit Width" | "Fit Height",
//     readDirection: "Right To Left" | "Left To Right",
//     headerRef: "Header Hidden" | "Header Shown",
//     progressBar: "Normal Progress" | "Progress Hidden" | "Progress Lightbar"
// }

export default function Chapter() {
    const { id } = useParams()
    const { setIsSticky, setIsSidebarOpen } = useHeader()
    const [chapterIndex, setChapterIndex] = useState<number>(0)
    const [isOpen, setIsOpen] = useState(false)
    const [currPage, setCurrPage] = useState(1)
    const [isDD1Open, setDD1IsOpen] = useState(false)
    const [isDD2Open, setDD2IsOpen] = useState(false)
    // const [settings, setSettings] = useState()
    const { manga, setManga } = useManga()
    const { addHistory } = useReadingHistory()
    const { chapter, chapterLoading } = useChapter(id)
    const { chapters, chapterIdList, chaptersLoading } = useChapterList(chapter?.manga?.id);
    const { chapterPages, pageList, chapterPagesLoading } = useChapterPages(id)

    const navigate = useNavigate();


    useEffect(() => {
        if (manga != null && manga?.id == chapter?.manga?.id) {
            addHistory(manga.id, {
                mangaTitle: getMangaTitle(manga),
                cover: getCoverArt(manga),
                chapterTitle: getChapterTitle(chapter),
                chapterId: chapter.id,
            })
            setChapterIndex(chapterIdList.indexOf(chapter.id))
        } else if (chapter?.manga) {
            getMangaById(chapter.manga?.id).then(data => setManga(data)).catch(e => console.log(e))
            setChapterIndex(chapterIdList.indexOf(chapter.id))
        }
    }, [manga, chapter])

    useEffect(() => {
        setIsSticky(false)
        setIsSidebarOpen(false)

        return () => setIsSticky(true)
    }, [id])

    useEffect(() => {
        if (chapterIdList.length > 0)
        navigate(`/chuong/${chapterIdList[chapterIndex]}`)
    }, [chapterIndex])

    console.log("re-render")

    return (
        <div className='relative transition-all'>
            <div className='mx-4'>
                <div className='w-full mb-4'>
                    {chapterLoading ? <p>Loading</p> : <p className='text-xl'>{getChapterTitle(chapter!)}</p>}
                    <Link to={`/truyen-tranh/${chapter?.manga?.id || ''}`} className='text-lg text-primary'>{getMangaTitleByChapter(chapter)}</Link>
                    <div className='grid grid-cols-3 gap-3 mt-2'>
                        <span className='text-center p-1 rounded-md bg-gray-100'>{chapter?.attributes.chapter ? `Ch. ${chapter?.attributes.chapter}` : 'Oneshot'}</span>
                        <span className='text-center p-1 rounded-md bg-gray-100'>{`Tr. ${currPage || NaN}/${pageList.length}`}</span>
                        <div className='text-center p-1 rounded-md bg-gray-100' onClick={() => setIsOpen(prev => !prev)}>Menu</div>
                    </div>
                </div>
                {chapterPagesLoading ? <div>Loading</div> : chapterPages.length > 0 && chapterPages.map((obj, index) => <img key={index} src={obj} className='mx-auto mb-1 max-w-[1000px] w-full' loading='lazy' />)}
            </div>

            {/* Menu */}
            <div className={`fixed top-0 right-0 w-[300px] h-screen transition-all ${isOpen ? 'mr-0' : 'mr-[-300px]'} bg-white p-4 shadow-2xl`}>
                <Icon icon='ph:x-bold' className="text-4xl rounded-full p-2 hover:cursor-pointer hover:bg-slate-200" onClick={() => setIsOpen(false)} />
                <div className='flex items-center gap-4 my-2'>
                    <Icon icon='octicon:book-16' className='text-2xl shrink-0' />
                    <Link to={`/truyen-tranh/${chapter?.manga?.id || ''}`} className='text-lg text-primary'>{getMangaTitleByChapter(chapter)}</Link>
                </div>

                <div className='flex items-center gap-4 mb-6'>
                    <Icon icon='fluent-mdl2:page' className='text-2xl shrink-0' />
                    <p className='text-lg'>{chapter?.attributes.chapter ? `Ch. ${chapter?.attributes.chapter}` : 'Oneshot'}</p>
                </div>

                <div className='flex gap-2 mb-2'>
                    <button className='bg-gray-200 px-1 py-4 rounded-md hover:bg-gray-300 disabled:hover:bg-gray-200 disabled:opacity-50' onClick={() => setCurrPage(prev => Number(prev) - 1)} disabled={currPage <= 1}><Icon icon='mingcute:left-line' className='text-2xl' /></button>
                    <div className='grow' onClick={() => { setDD1IsOpen(prev => !prev); setDD2IsOpen(false) }}>
                        <Dropdown
                            title='Trang'
                            isOpen={isDD1Open}
                            state={currPage}
                            setState={setCurrPage}
                            data={pageList} />
                    </div>
                    <button className='bg-gray-200 px-1 py-4 rounded-md hover:bg-gray-300 disabled:hover:bg-gray-200 disabled:opacity-50' onClick={() => setCurrPage(prev => Number(prev) + 1)} disabled={currPage >= pageList.length}><Icon icon='mingcute:right-line' className='text-2xl' /></button>
                </div>

                <div className='flex gap-2 mb-2'>
                    <button className='bg-gray-200 px-1 py-4 rounded-md hover:bg-gray-300 disabled:hover:bg-gray-200 disabled:opacity-50' onClick={() => setChapterIndex(prev => Number(prev) - 1)} disabled={chapterIndex <= 0}><Icon icon='mingcute:left-line' className='text-2xl' /></button>
                    <div className='grow' onClick={() => { setDD2IsOpen(prev => !prev); setDD1IsOpen(false) }}>
                        <Dropdown
                            title='Chương'
                            isOpen={isDD2Open}
                            state={chapter?.attributes.chapter}
                            setState={setChapterIndex}
                            chapters={chapters}
                        />
                    </div>
                    <button className='bg-gray-200 px-1 py-4 rounded-md hover:bg-gray-300 disabled:hover:bg-gray-200 disabled:opacity-50' onClick={() => setChapterIndex(prev => Number(prev) + 1)} disabled={chapterIndex >= chapterIdList.length}><Icon icon='mingcute:right-line' className='text-2xl' /></button>
                </div>

            </div>
        </div>
    )
}