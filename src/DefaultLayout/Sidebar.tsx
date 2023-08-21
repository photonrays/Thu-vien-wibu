import Iconify from "../components/Iconify";
import Avatar from '@/assets/avatar.png'

type Props = {
    activePage: string; // The currently active page's name or identifier
};

export default function Sidebar({ activePage }: Props) {
    return (
        <div className='sticky w-[90px] h-full bg-slate-100 flex flex-col shrink-0 items-center justify-between gap-10 py-5 top-0'>
            <Iconify icon="raphael:books" width={60} className="text-primary" />
            <div className="flex flex-col items-center gap-10 -mt-40">
                <Iconify icon="mingcute:grid-2-line" width={36} color="#C4C4C4" />
                {/* <Iconify icon="mingcute:grid-2-fill" width={36} color="#C4C4C4"/> */}
                <Iconify icon="mdi:bell-outline" width={36} color="#C4C4C4" />
                {/* <Iconify icon="mdi:bell" width={36} color="#C4C4C4"/> */}
                <Iconify icon="material-symbols:bookmark-outline" width={36} color="#C4C4C4" />
                {/* <Iconify icon="material-symbols:bookmark" width={36} color="#C4C4C4"/> */}
                <Iconify icon="eva:settings-outline" width={36} color="#C4C4C4" />
                {/* <Iconify icon="eva:settings-fill" width={36} color="#C4C4C4"/> */}
            </div>
            <div className="flex flex-col items-center justify-evenly gap-6">
                <img src={Avatar} alt="avatar" className="w-[50px] h-[50px] object-cover rounded-full border-2 border-primary" />
                <Iconify icon="mi:log-out" width={36} color="#C4C4C4" />
            </div>
        </div>
    )
}