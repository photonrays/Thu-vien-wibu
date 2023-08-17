import { Link } from "react-router-dom"
import Iconify from "../components/Iconify"
export default function Header() {
    return (
        <div className="w-full flex items-center justify-between sticky top-0 bg-white z-20">
            <h1 className="text-[#1C1C1C] font-bold text-5xl"><a href="/">Thư viện wibu</a></h1>
            <div className='relative h-[69px] mr-4'>
                <Iconify icon="radix-icons:magnifying-glass" style={{fontSize: '24px'}} className="absolute left-4 top-5"/>
                <input type="search" className="bg-[#F6F6F6] block w-full p-5 pl-12 text-sm text-gray-900 rounded-lg" placeholder="Tìm kiếm truyện, tác giả..." />
            </div>
        </div>
    )
}
