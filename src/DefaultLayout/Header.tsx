import { Link } from "react-router-dom"
import Iconify from "../components/Iconify"
import { useTheme } from "@/context/ThemeContext";

export default function Header() {
    const { isScrolled } = useTheme();

    console.log(isScrolled)

    return (
        <div className={`w-full flex items-center justify-between sticky top-0 bg-white ${isScrolled ? '' : 'bg-opacity-0'} z-20 py-2`}>
            <h1 className="text-[#1C1C1C] font-bold text-5xl"><Link to={"/"}>Thư viện wibu</Link></h1>
            <div className='relative mr-4'>
                <Iconify icon="radix-icons:magnifying-glass" style={{fontSize: '24px'}} className="absolute top-1/2 -translate-y-1/2 left-4"/>
                <input type="search" className="bg-[#F6F6F6] block w-full p-3 pl-12 text-sm text-gray-900 rounded-lg" placeholder="Tìm kiếm truyện, tác giả..." />
            </div>
        </div>
    )
}
