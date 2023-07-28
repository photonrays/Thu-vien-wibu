import { useState, useEffect } from "react";
import { prominent } from 'color.js';
import Iconify from '../components/Iconify';
import NoImg from '../assets/No-Image-Placeholder.png';
import { useNavigate } from 'react-router-dom'

type Props = {
  ranking?: number;
  image?: string;
  bookmarked: boolean;
  detail?: {
    title: string;
    chapter: string;
    time: string;
  }
};

export function Card(props: Props) {
  const navigate = useNavigate();

  const [prominentColor, setProminentColor] = useState<string>("rgb(0,0,0)");

  useEffect(() => {
    if (props.image && props.ranking) {
      prominent(props.image, { amount: 1 })
        .then(color => {
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          const colorString = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
          setProminentColor(colorString);
        })
        .catch(err => console.log(err));
    }
  }, [props.image, props.ranking]);

  return (
    <div className='flex items-center'>
      {props.ranking && <span style={{ color: prominentColor }} className='text-[240px] w-[140px] text-center font-bold tracking-tighter mr-[-36px]'>
        {props.ranking}
      </span>}
      <div className="relative w-[180px] hover:cursor-pointer" onClick={() => navigate("/truyen-tranh/:id")}>
        <img src={props.image || NoImg} className='object-fit rounded-3xl' />
        {/* {props.bookmarked ? (
          <Iconify icon='material-symbols:bookmark' className='absolute -top-5 right-0 z-10' width={50} color='#e75c62' />
        ) : (
          <>
            <Iconify icon='material-symbols:bookmark' className='absolute -top-5 right-0 z-10' width={50} color='#fff' />
            <Iconify icon='material-symbols:bookmark-outline' className='absolute -top-5 right-0 z-10' width={50} color='#e75c62' />
          </>
        )} */}
        {props.detail && <div className="p-4 bg-white">
          <p className="font-bold max-h-18 overflow-hidden">{props.detail.title}</p>
          <div className="flex justify-between text-sm text-slate-500">
            <p>{props.detail.chapter}</p>
            <p>{props.detail.time}</p>
          </div>
        </div>}
      </div>
    </div>
  );
}
