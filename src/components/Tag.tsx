import { Tag as TagType } from "@/api/schema";
import { Link } from "react-router-dom";

export default function Tag({ data, contentRating }: { data?: TagType, contentRating?: "safe" | "suggestive" | "erotica" | "pornographic" }) {
  return data ?
    <Link to={`/tim-kiem?includes[]=cover_art&order[followedCount]=desc&limit=30&availableTranslatedLanguage[]=vi&includedTags[]=${data.id}`} className={`text-xs font-bold px-1 uppercase rounded-sm ${contentRating ? 'text-white bg-primary' : 'bg-slate-200'}`}>
      {contentRating ? contentRating : data ? data.attributes.name['en'] : "reincarnation"}
    </Link> :
    null
}