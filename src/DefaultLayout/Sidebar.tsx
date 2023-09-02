import { useState } from "react";
import Iconify from "../components/Iconify";
import { useHeader } from "@/context/useHeader";
import { Link } from "react-router-dom";

type Props = {
    activePage: string; // The currently active page's name or identifier
    className?: string
};

export default function Sidebar({ activePage, className = '' }: Props) {
    const { isSidebarOpen, setIsSidebarOpen } = useHeader();

    // return (
    //     <div>
    //         <div className={`lg:sticky sticky ${isSidebarOpen ? 'flex' : 'hidden'} w-[90px] max-w-[90px] h-screen bg-slate-100 lg:flex flex-col shrink-0 items-center justify-between gap-10 py-5 top-0 left-0 z-50 ${className}`}>
    //             <Link to={"/"}><Iconify icon="raphael:book" className="text-primary text-6xl md:3xl"/></Link>
    //             <div className="flex flex-col items-center gap-10 -mt-40">
    //                 <Iconify icon="mingcute:grid-2-line" className="text-[#C4C4C4] text-4xl"/>
    //                 {/* <Iconify icon="mingcute:grid-2-fill" className="text-[#C4C4C4] text-3xl" */}
    //                 <Iconify icon="mdi:bell-outline" className="text-[#C4C4C4] text-4xl" />
    //                 {/* <Iconify icon="mdi:bell" className="text-[#C4C4C4] text-4xl"/> */}
    //                 <Iconify icon="material-symbols:bookmark-outline" className="text-[#C4C4C4] text-4xl" />
    //                 {/* <Iconify icon="material-symbols:bookmark" className="text-[#C4C4C4] text-4xl"/> */}
    //                 <Iconify icon="eva:settings-outline" className="text-[#C4C4C4] text-4xl" />
    //                 {/* <Iconify icon="eva:settings-fill" className="text-[#C4C4C4] text-4xl"/> */}
    //             </div>
    //             <div className="flex flex-col items-center justify-evenly gap-6">
    //                 <img src={Avatar} alt="avatar" className="w-[50px] h-[50px] object-cover rounded-full border-2 border-primary" />
    //                 <Iconify icon="mi:log-out" width={36} color="#C4C4C4" />
    //             </div>
    //         </div>
    //     </div>
    // )

    return (
        <div>
            <div className={`lg:sticky fixed overflow-y-auto ${isSidebarOpen ? 'ml-0' : 'ml-[-256px]'} w-[256px] h-screen bg-slate-100 flex flex-col shrink-0 items-center gap-2 p-4 top-0 left-0 z-50 transition-all ${className}`}>
                <div className="flex items-center justify-between w-full">
                    <Link to={"/"} className="text-2xl font-bold"><Iconify icon="raphael:book" className="text-primary text-5xl md:3xl inline" />WibuLib</Link>
                    <Iconify icon='ph:x-bold' className="text-4xl rounded-full p-2 hover:cursor-pointer hover:bg-slate-200" onClick={() => setIsSidebarOpen(false)} />
                </div>

                <span className="w-full bg-primary rounded-md p-2 flex items-center gap-1"><Iconify icon='carbon:home' className="text-xl inline" />Trang chu</span>
                <span className="w-full rounded-md p-2  flex items-center gap-1"><Iconify icon='material-symbols:bookmark-outline' className="text-xl inline" />Theo doi</span>
                <span className="w-full bg-primary rounded-md px-5 py-1">Thu vien</span>
                <span className="w-full rounded-md px-5 py-1">Danh sach</span>
                <span className="w-full rounded-md px-5 py-1">Lich su</span>
                <span className="w-full rounded-md p-2  flex items-center gap-1"><Iconify icon='octicon:book-16' className="text-xl inline" />Tim kiem</span>
                <span className="w-full rounded-md px-5 py-1">Tim kiem nang cao</span>
                <span className="w-full rounded-md px-5 py-1">Lich su</span>
                <span className="w-full rounded-md px-5 py-1">Cap nhat moi nhat</span>
                <span className="w-full rounded-md px-5 py-1">Truyen ngau nhien</span>
            </div>
        </div>
    )
}
