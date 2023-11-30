import { Tag } from "@/api/schema";
import { Link } from "react-router-dom";


export function TagItem({item}: {item: Tag}) {
  return (
    <Link to={`/tim-kiem/${item.id}`} className="h-[40px] bg-white rounded-3xl inline-flex items-center px-5 shadow-lg m-2">
          {/* <Iconify icon={props.iconName || "ps:gun"} className="inline mr-1"/> */}
          <span>{item.attributes.name.en}</span>
    </Link>
  )
}
