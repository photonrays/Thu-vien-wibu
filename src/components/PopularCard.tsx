import Tag from './Tag';
import { ExtendManga } from '@/api/extend';
import getCoverArt from '@/utils/getCover';
import { Link } from 'react-router-dom';

export default function PopularCard({ data }: { data: ExtendManga }) {
    const coverArt = getCoverArt(data);

    return (
        <Link to={`/truyen-tranh/${data.id}`} className='relative flex h-[290px] p-4 rounded-lg'>
            {/* Background image */}
            <img src={`${coverArt}`}
                className="absolute left-0 top-0 w-[150%] h-[150%] object-cover blur-lg opacity-20 z-[-2] rounded-lg" alt="Background" />
            {/* Book cover */}
            <div className='flex-shrink-0 overflow-hidden max-w-[190px] rounded-lg'>
                <img src={coverArt} alt="Book Cover" className='object-contain h-full rounded-lg'/>
            </div>
            {/* Book details */}
            <div className='ml-4 flex flex-col flex-grow'>
                <div className='flex flex-col'>
                    <span className='text-4xl font-bold line-clamp-2'>{data.attributes.title['en']}</span>
                    <div className='flex gap-2 mt-2'>
                        {data.attributes.tags.map((obj, index) => {
                            if (obj.attributes.group === 'genre') {
                                return <Tag key={index} data={obj} />
                            }
                        })}
                    </div>
                </div>
                {/* Description */}
                <div className='overflow-y-auto flex-grow mt-2'>
                    <p className='text-sm overflow-hidden'>
                        {data.attributes?.description['en']}
                        {data.attributes?.description['en']}
                    </p>
                </div>
                {/* Author */}
                <p className='mt-2'>Mikata Hozumi, Oyaji Sou</p>
            </div>
        </Link>
    )
}
