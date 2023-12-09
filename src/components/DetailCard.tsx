import { ExtendChapter, ExtendManga } from '@/api/extend'
import NoImg from '@/assets/No-Image-Placeholder.png'
import getChapterTitle from '@/utils/getChapterTitle'
import getCoverArt from '@/utils/getCoverArt'
import { formatNowDistance } from '@/utils/dateFns'
import { Link } from 'react-router-dom'
import { Icon } from '@iconify/react'

type Props = {
  manga?: ExtendManga
  chapter: ExtendChapter
}

export function DetailCard(props: Props) {
  if (props.manga == undefined) {
    return <div>Loading</div>
  }

  return (
    <div>
      <div className="flex p-4">
        <Link to={`/truyen-tranh/${props.manga.id}`} className='inline-block w-28 h-28 rounded-2xl shrink-0'><img src={getCoverArt(props.manga) || NoImg} className='w-full h-full object-cover rounded-2xl' /></Link>
        <div className='ml-2 flex flex-col justify-between w-full text-ellipsis'>
          <Link to={`/truyen-tranh/${props.manga.id}`} className='text-lg font-bold mb-1 line-clamp-2 break-all'>{props.manga?.attributes?.title['en'] || ""}</Link>
          <Link to={`/chuong/${props.chapter.id}`} className='text-sm text-slate-500 mb-1 line-clamp-1'>{getChapterTitle(props.chapter) || ""}</Link>
          <div className='flex items-center justify-between gap-2'>
            <p className='text-sm text-slate-500 items-center line-clamp-1'>
              <Icon icon='fluent:people-16-regular' className='inline mr-1' />
              {props.chapter.scanlation_group?.attributes?.name || ""}
            </p>
            <p className='text-sm text-slate-500 flex-shrink-0'>
              {formatNowDistance(new Date(props.chapter.attributes?.readableAt)) || ""}
            </p>
          </div>
        </div>
      </div>
      <hr className='mx-10'></hr>
    </div>
  )
}
