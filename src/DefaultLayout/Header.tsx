import { Link } from "react-router-dom"
import Iconify from "../components/Iconify"
import { useHeader } from "@/context/useHeader";

export default function Header() {
    const { isScrolled, isSidebarOpen, setIsSidebarOpen, titleColor, isSticky } = useHeader();
    const open = () => {
        setIsSidebarOpen(prev => !prev)
    }

    return (
        <div className={`w-full h-[64px] flex items-center justify-between ${isSticky ? 'sticky' : ''} top-0 bg-white ${isScrolled && 'border-b-2 border-primary'} z-20 py-2 pl-6 mb-4`}
            style={{ backgroundColor: `rgba(255, 255, 255, ${isScrolled > 64 ? 1 : isScrolled / 64})` }}>
            <div className={`font-bold text-2xl flex items-center ${isSidebarOpen ? 'hidden' : 'inline'}`} style={{ color: titleColor }}>
                <Iconify icon="iconoir:menu-scale" vFlip={true} style={{ color: titleColor }} onClick={open} />
                <Iconify icon="raphael:book" className="text-primary text-5xl md:3xl inline ml-3" />
                <Link to={"/"}>WibuLib</Link>
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
