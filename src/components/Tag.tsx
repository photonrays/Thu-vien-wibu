import { Tag as TagType } from "@/api/schema";
import { Link } from "react-router-dom";

export default function Tag({data}: {data?: TagType}) {
    return <Link to={"/"} className='text-xs font-bold bg-slate-200 px-1 uppercase rounded-sm'>{data ? data.attributes.name['en'] : "reincarnation"}</Link>
  }