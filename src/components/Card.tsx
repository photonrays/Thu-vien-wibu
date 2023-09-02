import { useState, useEffect } from "react";
import { average } from 'color.js';
import NoImg from '@/assets/No-Image-Placeholder.png';
import { Link } from 'react-router-dom'
import { Manga } from "@/api/schema";
import { ExtendManga } from "@/api/extend";
import getCoverArt from "@/utils/getCoverArt";

type Props = {
  manga: ExtendManga
  detail?: false
  ranking?: number
};

export function Card(props: Props) {
  const [prominentColor, setProminentColor] = useState<string>("rgb(0,0,0)");
  const imageUrl = getCoverArt(props.manga)

  useEffect(() => {
    if (imageUrl && props.ranking) {
      average(imageUrl, { amount: 1 })
        .then(color => {
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          const colorString = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
          setProminentColor(colorString);
        })
        .catch(err => console.log(err));
    }
  }, [imageUrl, props.ranking]);

  return (
    <div className='flex items-center'>
      {props.ranking && <span style={{ color: prominentColor }} className='text-[240px] w-[140px] text-center font-bold tracking-tighter mr-[-36px]'>
        {props.ranking}
      </span>}
      <Link className="relative w-[180px] h-[250px] bg-black rounded-xl hover:cursor-pointer flex items-center" to={`/truyen-tranh/:id/`}>
        <img src={imageUrl || NoImg} className='object-fit w-[180px]' />
      </Link>
    </div>
  );
}
