import { ExtendChapter, ExtendManga } from '@/api/extend'
import NoImg from '@/assets/No-Image-Placeholder.png'
import getChapterTitle from '@/utils/getChapterTitle'
import getCoverArt from '@/utils/getCoverArt'
import Iconify from './Iconify'
import { formatNowDistance } from '@/utils/dateFns'

type Props = {
  manga: ExtendManga
  chapter: ExtendChapter
}

export function DetailCard(props: Props) {
  return (
    <div>
      <div className="flex p-4 max-h-26">
        <img src={getCoverArt(props.manga) || NoImg} className='w-24 h-24 object-cover rounded-2xl shrink-0' />
        <div className='ml-2 flex flex-col justify-between w-full text-ellipsis'>
          <p className='text-lg font-bold mb-1 line-clamp-2 break-all'>{props.manga?.attributes?.title['en'] || ""}</p>
          <p className='text-sm text-slate-500 mb-1 line-clamp-1'>{getChapterTitle(props.chapter) || ""}</p>
          <div className='flex items-center justify-between gap-2'>
            <p className='text-sm text-slate-500 items-center line-clamp-1'>
              <Iconify icon='fluent:people-16-regular' className='inline mr-1' />
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
