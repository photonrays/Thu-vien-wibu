import { Tag as TagType } from "@/api/schema";
import { Link } from "react-router-dom";

export default function Tag({data, contentRating}: {data?: TagType, contentRating?: "safe" | "suggestive" | "erotica" | "pornographic"}) {
    return <Link to={"/"} className={`text-xs font-bold px-1 uppercase rounded-sm ${contentRating ? 'text-white bg-primary' : 'bg-slate-200'}`}>{contentRating ? contentRating : data ? data.attributes.name['en'] : "reincarnation"}</Link>
  }