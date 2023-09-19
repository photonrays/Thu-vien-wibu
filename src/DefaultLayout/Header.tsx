import { Link } from "react-router-dom"
import Iconify from "../components/Iconify"
import { useHeader } from "@/context/useHeader";
import { useState, useEffect } from 'react'

export default function Header() {
    const { isSidebarOpen, setIsSidebarOpen, isSticky, titleColor } = useHeader();
    const open = () => {
        setIsSidebarOpen(prev => !prev)
    }

    const [scrollY, setScrollY] = useState(0);
    const [textColor, setTextColor] = useState(titleColor);


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

    return (
        <div className={`w-full h-[64px] flex items-center justify-between ${isSticky ? 'sticky' : ''} top-0 bg-white ${scrollY && 'border-b-2 border-primary'} z-20 py-2 pl-6 mb-4`}
            style={{ backgroundColor: `rgba(255, 255, 255, ${Math.max(0, scrollY / 64)})` }}>
            <div className={`font-bold text-2xl flex items-center ${isSidebarOpen ? 'hidden' : 'inline'}`} style={{ color: textColor }}>
                <Iconify icon="iconoir:menu-scale" vFlip={true} style={{ color: textColor }} className="hover:cursor-pointer" onClick={open} />
                <Link to={"/"}><Iconify icon="raphael:book" className="text-primary text-5xl md:3xl inline-block ml-3" />WibuLib</Link>
            </div>
            {/* <Link to={"/"}><Iconify icon="raphael:book" className="text-primary text-6xl md:3xl inline md:hidden" /></Link> */}
            {/* <Iconify icon="iconoir:menu-scale" vFlip={true} className="text-3xl lg:hidden inline" style={{color: titleColor}} onClick={open}/> */}
            <div></div>
            <div className='relative mr-4 bg-[#F6F6F6] rounded-lg p-2 md:p-0'>
                <Iconify icon="radix-icons:magnifying-glass" className="text-[24px] md:absolute inline top-1/2 md:-translate-y-1/2 left-4" />
                <input type="search" className="bg-[#F6F6F6] w-full p-3 pl-12 text-sm text-gray-900 rounded-lg hidden md:block" placeholder="Tìm kiếm truyện, tác giả..." />
            </div>
        </div>
    )
}
