import { getAtHomeServerChapterId } from '@/api/atHome'
import { getChapterById } from '@/api/chapter'
import { ExtendChapter } from '@/api/extend'
import Iconify from '@/components/Iconify'
import { useHeader } from '@/context/useHeader'
import getChapterTitle from '@/utils/getChapterTitle'
import { getMangaTitle, getMangaTitleByChapter } from '@/utils/getTitles'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function Chapter() {
    const { id, page } = useParams()
    const { setIsSticky, setIsScrolled, setIsSidebarOpen } = useHeader()
    const [chapterPages, setChapterPages] = useState<string[]>([])
    const [chapter, setChapter] = useState<ExtendChapter | null>(null)
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        setIsSticky(false)
        setIsSidebarOpen(false)
        setIsScrolled(0)
        if (id) {
            getAtHomeServerChapterId(id)
                .then(data => setChapterPages(data))
                .catch(err => console.log(err))
            getChapterById(id)
                .then(data => setChapter(data))
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
                        <span className='text-center p-1 rounded-md bg-gray-100'>Tr. 1/24</span>
                        <div className='text-center p-1 rounded-md bg-gray-100' onClick={() => setIsOpen(prev => !prev)}>Menu</div>
                    </div>
                </div>
                {chapterPages.length > 0 && chapterPages.map((obj, index) => <img key={index} src={obj} className='mx-auto mb-1 max-w-[1000px]' loading='lazy' />)}
            </div>
            <div className={`fixed top-0 right-0 w-[300px] h-screen transition-all ${isOpen ? 'mr-0' : 'mr-[-300px]'} bg-white p-4 shadow-2xl`}>
                <Iconify icon='ph:x-bold' className="text-4xl rounded-full p-2 hover:cursor-pointer hover:bg-slate-200" onClick={() => setIsOpen(false)} />
                <div className='flex items-center gap-4 my-2'>
                    <Iconify icon='octicon:book-16' className='text-2xl shrink-0' />
                    <Link to={`/truyen-tranh/${chapter?.manga?.id || ''}`} className='text-lg text-primary'>{getMangaTitleByChapter(chapter)}</Link>
                </div>

                <div className='flex items-center gap-4'>
                    <Iconify icon='fluent-mdl2:page' className='text-2xl shrink-0' />
                    <p className='text-lg'>{chapter?.attributes.chapter ? `Ch. ${chapter?.attributes.chapter}` : 'Oneshot'}</p>
                </div>
            </div>
        </div>
    )
}
