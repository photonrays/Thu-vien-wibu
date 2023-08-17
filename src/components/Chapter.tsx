import Iconify from "./Iconify";

export default function Chapter() {
    return (
        <div>
            <div className='flex justify-between mt-4'>
                <span>Volumn 1</span>
                <span>Ch.1 - 3</span>
                <span>20 <Iconify icon='ep:arrow-up-bold' className='inline' /></span>
                {/* <span><Iconify icon='ep:arrow-down-bold' /></span> */}
            </div>
            <div className="w-full bg-slate-300">
                <div className="grid grid-cols-chapter-grid p-1">
                    <div>
                        <span className="flex items-center"><Iconify icon='ph:eye' className="inline mr-2" />Ch.23 Holy Night</span>
                        <span className="flex items-center"><Iconify icon='octicon:people-24' className="inline mr-2" />Ah das hot</span>
                    </div>

                    <div>
                        <span className="flex items-center"><Iconify icon='mdi:clock-outline' className="inline mr-2" />5 years ago</span>
                        <span className="flex items-center"><Iconify icon='octicon:person-24' className="inline mr-2" />Heatperson</span>
                    </div>

                    <div>
                        <span className="flex items-center"><Iconify icon='ph:eye' className="inline mr-2" />N/A</span>
                        <span className="flex items-center"><Iconify icon='majesticons:comment-line' className="inline mr-2" />28</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
