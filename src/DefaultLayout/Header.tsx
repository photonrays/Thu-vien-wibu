import { Link, useNavigate } from "react-router-dom"
import { useHeader } from "@/context/useHeader";
import { useState, useEffect, useRef } from 'react'
import { getSearchManga } from "@/api/manga";
import { getMangaTitle } from "@/utils/getTitles";
import getCoverArt from "@/utils/getCoverArt";
import { Icon } from "@iconify/react";
import { Manga } from "@/api/schema";
import { Includes } from "@/api/static";

export default function Header() {
    const { isSidebarOpen, setIsSidebarOpen, isSticky, titleColor } = useHeader();
    const open = () => {
        setIsSidebarOpen(prev => !prev)
    }

    const navigate = useNavigate();

    const [scrollY, setScrollY] = useState(0);
    const [textColor, setTextColor] = useState(titleColor);
    const [searchValue, setSearchValue] = useState('')
    const [searchResult, setSearchResult] = useState<Manga[]>([])
    const [showResult, setShowResult] = useState(false)
    const [searchBarExpand, setSearchBarExpand] = useState(false)

    useEffect(() => {
        if (searchValue.length <= 0) {
            setSearchResult([])
        }
        const delayDebounceFn = setTimeout(() => {
            if (searchValue.length > 0) {
                getSearchManga({ title: searchValue, hasAvailableChapters: 'true', availableTranslatedLanguage: ['vi'], includes: [Includes.COVER_ART] }).then(data => setSearchResult(data.data.data)).catch(e => console.log(e))
            }
        }, 1000)
        return () => clearTimeout(delayDebounceFn)
    }, [searchValue])

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY)
            setTextColor(window.scrollY > 32 ? '#000000' : titleColor);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [scrollY, titleColor]);

    useEffect(() => {
        setTextColor(titleColor)
    }, [titleColor])

    const handleChange = (e: { target: { value: string; }; }) => {
        setSearchValue(e.target.value);
    };

    const onFormSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        navigate(`/tim-kiem?title=${searchValue}`)
        setSearchValue('')

        if (wrapperRef.current) {
            wrapperRef.current.blur();
        }
    }

    console.log("search bar expand: ", searchBarExpand)

    const wrapperRef = useRef<HTMLInputElement>(null);
    const resultRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const { target } = event;
            if (wrapperRef.current && !wrapperRef.current.contains(target as Node) || resultRef.current && !resultRef.current.contains(target as Node)) {
                setShowResult(false)
                setSearchBarExpand(false)

            } if (wrapperRef.current && wrapperRef.current.contains(target as Node) || resultRef.current && resultRef.current.contains(target as Node)) {
                setShowResult(true)
                setSearchBarExpand(true)
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef, resultRef]);

    return (
        <div className={`w-full h-[64px] flex items-center justify-between ${isSticky ? 'sticky' : ''} top-0 bg-white ${scrollY && 'border-b-2 border-primary'} z-20 py-2 pl-6 mb-4`}
            style={{ backgroundColor: `rgba(255, 255, 255, ${Math.max(0, scrollY / 64)})` }}>
            <div className={`font-bold text-2xl flex items-center ${isSidebarOpen ? 'hidden' : 'inline'}`} style={{ color: textColor }}>
                <Icon icon="iconoir:menu-scale" vFlip={true} style={{ color: textColor }} className="hover:cursor-pointer" onClick={open} />
                <Link to={"/"}><Icon icon="raphael:book" className="text-primary text-5xl md:3xl inline-block ml-3" />WibuLib</Link>
            </div>
            <div className='relative mr-4 bg-[#F6F6F6] rounded-lg p-2 md:p-0 ml-auto'>
                <Icon icon="radix-icons:magnifying-glass" className="text-[24px] md:absolute inline top-1/2 md:-translate-y-1/2 left-4" />
                <form onSubmit={onFormSubmit}>
                    <input className={`bg-[#F6F6F6] ${searchBarExpand ? 'w-[600px]' : 'w-[300px]'} p-3 pl-12 text-md text-gray-900 rounded-lg hidden md:block transition-all ease-in focus:w-[600px] outline-primary`}
                        type="search"
                        placeholder="Tìm kiếm truyện, tác giả..."
                        value={searchValue}
                        onChange={handleChange}
                        ref={wrapperRef}
                        onClick={() => setShowResult(true)} />
                </form>
                {showResult && searchResult.length > 0 && <div ref={resultRef} className={`w-[600px] max-h-[600px] overflow-auto bg-white absolute mt-1 rounded-xl px-4`}>
                    <Link to={`/tim-kiem?title=${searchValue}`} className="w-full flex justify-end items-center gap-1 my-2"><p className="">Tìm kiếm nâng cao</p><Icon icon="ph:arrow-right-bold" width={20} height={20} /></Link>
                    {searchResult.map((manga, index) => {
                        console.log(manga)
                        return (
                            <Link to={`/truyen-tranh/${manga.id}`} key={index} className="w-full h-24 flex p-2 bg-gray-100 hover:bg-gray-200 rounded-md my-2">
                                <div className="h-full w-14 shrink-0 rounded-md">
                                    <img src={getCoverArt(manga)} className="w-full h-full object-cover rounded-md" />
                                </div>
                                <div className="flex flex-col justify-center gap-1 ml-2 py-2 grow-0">
                                    <p className="text-lg font-bold line-clamp-2">{getMangaTitle(manga)}</p>
                                </div>
                            </Link>
                        )
                    })}
                </div>}
            </div>

        </div>
    )
}
