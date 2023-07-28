import NoImg from '../assets/No-Image-Placeholder.png'

type Props = {
    image?: string;
    title?: string;
    chapter?: string;
    description?: string;
}


export function DetailCard(props: Props) {
  return (
    <div>
        <div className="flex p-4">
            <img src={props.image || NoImg} className='w-24 h-24 object-cover rounded-2xl shrink-0'/>
            <div className='ml-2'>
                <p className='text-lg font-bold'>{props.title || ""}</p>
                <p className='text-sm text-slate-500'>{props.chapter || ""}</p>
                <p className=''>{props.description || ""}</p>
            </div>
        </div>
        <hr className='mx-10'></hr>
    </div>
  )
}
