import { Link } from "react-router-dom";
import Iconify from "./Iconify";

type Props = {
    iconName?: string;
    name?: string;
}

export function TagItem(props: Props) {
  return (
    <Link to={"/"} className="h-[40px] bg-white rounded-3xl inline-flex items-center px-5 shadow-lg m-2">
          {/* <Iconify icon={props.iconName || "ps:gun"} className="inline mr-1"/> */}
          <span>{props.name}</span>
    </Link>
  )
}
