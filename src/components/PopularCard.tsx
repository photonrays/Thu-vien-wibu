import Tag from './Tag';
import { ExtendManga } from '@/api/extend';
import getCoverArt from '@/utils/getCoverArt';
import { getMangaTitle } from '@/utils/getTitles';
import { Link } from 'react-router-dom';

export default function PopularCard({ data }: { data: ExtendManga }) {
    const coverArt = getCoverArt(data);
    const artist = data?.artist?.attributes?.name || ''
    const author = data?.author?.attributes?.name || ''

    return (
        <Link to={`/truyen-tranh/${data.id}`} className='relative flex h-[290px] p-4 rounded-lg transition-all'>
            {/* Background image */}
            <div className="absolute left-0 top-0 w-full h-full z-[-2] rounded-xl overflow-hidden">
                <img src={`${coverArt}`} alt="Background" loading='lazy' className='object-cover w-full h-full blur-lg opacity-20' />
            </div>
            {/* Book cover */}
            <div className='flex-shrink-0 overflow-hidden max-w-[190px] h-full rounded-lg'>
                <img src={coverArt} alt="Book Cover" className='object-contain h-full rounded-lg' loading='lazy' />
            </div>
            {/* Book details */}
            <div className='ml-4 h-full flex flex-col'>
                <div className='shrink-0 mb-2'>
                    <span className='text-4xl font-bold line-clamp-2'>{getMangaTitle(data)}</span>
                    <div className='flex gap-2 mt-2'>
                        {data?.attributes.contentRating === "suggestive" && <Tag contentRating={data?.attributes.contentRating} />}
                        {data.attributes.tags.map((obj, index) => {
                            if (obj.attributes.group === 'genre') {
                                return <Tag key={index} data={obj} />
                            }
                        })}
                    </div>
                </div>
                {/* Description */}
                <div className='overflow-y-auto grow mb-2'>
                    <p className='text-sm overflow-hidden'>
                        {data.attributes?.description['en']}
                        {data.attributes?.description['en']}
                    </p>
                </div>
                {/* Author */}
                <p>{author === artist ? author : author + ", " + artist}</p>
            </div>
        </Link>
    )
}
