/* eslint-disable react-hooks/exhaustive-deps */
import { getAtHomeServerChapterId } from '@/api/atHome'
import { getChapterById } from '@/api/chapter'
import { ExtendChapter } from '@/api/extend'
import Dropdown from '@/components/Dropdown/Dropdown'
import Iconify from '@/components/Iconify'
import { useHeader } from '@/context/useHeader'
import { useManga } from '@/context/useManga'
import useChapterList from '@/hooks/useChapterList'
import useReadingHistory from '@/hooks/useReadingHistory'
import getChapterTitle from '@/utils/getChapterTitle'
import getCoverArt from '@/utils/getCoverArt'
import { getMangaTitle, getMangaTitleByChapter } from '@/utils/getTitles'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

// type SettingProp = {
//     pageType: "Single Page" | "Double Page" | "Long Strip",
//     pageLimit: "No Limit" | "Fit Width" | "Fit Height",
//     readDirection: "Right To Left" | "Left To Right",
//     headerRef: "Header Hidden" | "Header Shown",
//     progressBar: "Normal Progress" | "Progress Hidden" | "Progress Lightbar"
// }

export default function Chapter() {
    const { id, page } = useParams()
    const { setIsSticky, setIsSidebarOpen } = useHeader()
    const [chapterPages, setChapterPages] = useState<string[]>([])
    const [chapter, setChapter] = useState<ExtendChapter | null>(null)
    const [chapterIndex, setChapterIndex] = useState<number>(1)
    const [isOpen, setIsOpen] = useState(false)
    const [currPage, setCurrPage] = useState(Number(page))
    const [pageList, setPageList] = useState<number[]>([])
    const [isDD1Open, setDD1IsOpen] = useState(false)
    const [isDD2Open, setDD2IsOpen] = useState(false)
    // const [settings, setSettings] = useState()
    const { data } = useChapterList(chapter?.manga?.id || '0');
    const {manga} = useManga()
    const {addHistory} = useReadingHistory()

    useEffect(() => {
        if (manga && chapter) {
            console.log("this run")

            addHistory(manga.id, {
                mangaTitle: getMangaTitle(manga),
                cover: getCoverArt(manga),
                chapterTitle: getChapterTitle(chapter),
                chapterId: chapter.id,
            })
        }
    }, [manga, chapter])

    useEffect(() => {
        setIsSticky(false)
        setIsSidebarOpen(false)
        if (id) {
            getAtHomeServerChapterId(id)
                .then(data => {
                    setChapterPages(data);
                    setPageList(Array.from({ length: data.length }, (_, index) => index + 1))
                })
                .catch(err => console.log(err))
            getChapterById(id)
                .then(data => { console.log(data); setChapter(data) })
                .catch(err => console.log(err))
        }
        return () => setIsSticky(true)
    }, [id])

    return (
        <div className='relative transition-all'>

            <div className='mx-4'>
                <div className='w-full mb-4'>
                    <p className='text-xl'>{getChapterTitle(chapter)}</p>
                    <Link to={`/truyen-tranh/${chapter?.manga?.id || ''}`} className='text-lg text-primary'>{getMangaTitleByChapter(chapter)}</Link>
                    <div className='grid grid-cols-3 gap-3 mt-2'>
                        <span className='text-center p-1 rounded-md bg-gray-100'>{chapter?.attributes.chapter ? `Ch. ${chapter?.attributes.chapter}` : 'Oneshot'}</span>
                        <span className='text-center p-1 rounded-md bg-gray-100'>{`Tr. ${currPage || NaN}/${pageList.length}`}</span>
                        <div className='text-center p-1 rounded-md bg-gray-100' onClick={() => setIsOpen(prev => !prev)}>Menu</div>
                    </div>
                </div>
                {chapterPages.length > 0 && chapterPages.map((obj, index) => <img key={index} src={obj} className='mx-auto mb-1 max-w-[1000px] w-full' loading='lazy' />)}
            </div>

            {/* Menu */}
            <div className={`fixed top-0 right-0 w-[300px] h-screen transition-all ${isOpen ? 'mr-0' : 'mr-[-300px]'} bg-white p-4 shadow-2xl`}>
                <Iconify icon='ph:x-bold' className="text-4xl rounded-full p-2 hover:cursor-pointer hover:bg-slate-200" onClick={() => setIsOpen(false)} />
                <div className='flex items-center gap-4 my-2'>
                    <Iconify icon='octicon:book-16' className='text-2xl shrink-0' />
                    <Link to={`/truyen-tranh/${chapter?.manga?.id || ''}`} className='text-lg text-primary'>{getMangaTitleByChapter(chapter)}</Link>
                </div>

                <div className='flex items-center gap-4 mb-6'>
                    <Iconify icon='fluent-mdl2:page' className='text-2xl shrink-0' />
                    <p className='text-lg'>{chapter?.attributes.chapter ? `Ch. ${chapter?.attributes.chapter}` : 'Oneshot'}</p>
                </div>

                <div className='flex gap-2 mb-2'>
                    <button className='bg-gray-200 px-1 py-4 rounded-md hover:bg-gray-300'><Iconify icon='mingcute:left-line' className='text-2xl' onClick={() => setCurrPage(prev => Number(prev) - 1)} /></button>
                    <div className='grow' onClick={() => { setDD1IsOpen(prev => !prev); setDD2IsOpen(false) }}>
                        <Dropdown
                            title='Trang'
                            isOpen={isDD1Open}
                            state={currPage}
                            setState={setCurrPage}
                            data={pageList} />
                    </div>
                    <button className='bg-gray-200 px-1 py-4 rounded-md hover:bg-gray-300'><Iconify icon='mingcute:right-line' className='text-2xl' onClick={() => setCurrPage(prev => Number(prev) + 1)} /></button>
                </div>

                <div className='flex gap-2 mb-2'>
                    <button className='bg-gray-200 px-1 py-4 rounded-md hover:bg-gray-300'><Iconify icon='mingcute:left-line' className='text-2xl' onClick={() => setChapterIndex(prev => Number(prev) - 1)} /></button>
                    <div className='grow' onClick={() => { setDD2IsOpen(prev => !prev); setDD1IsOpen(false) }}>
                        <Dropdown
                            title='Chương'
                            isOpen={isDD2Open}
                            state={chapterIndex}
                            setState={setChapterIndex}
                            data={data?.map(c => c.attributes.chapter)}
                        />
                    </div>
                    <button className='bg-gray-200 px-1 py-4 rounded-md hover:bg-gray-300'><Iconify icon='mingcute:right-line' className='text-2xl' onClick={() => setChapterIndex(prev => Number(prev) + 1)} /></button>
                </div>

            </div>
        </div>
    )
}



{/* <div className='bg-gray-200 grow rounded-md relative transition-all flex flex-col justify-center pl-3' onClick={() => { setDD2IsOpen(prev => !prev); setDD1IsOpen(false) }}>
                        <span className='block text-sm'>Chương</span>
                        <span className='block'>Chương {chapter?.attributes.chapter}</span>
                        <Dropdown items={["1", "2", "3", "4"]} isOpen={isDD2Open} state={chapter} setState={setChapter} />
                    </div> */}