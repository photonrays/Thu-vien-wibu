import Iconify from "./Iconify";

type Props = {
    iconName?: string;
    name?: string;
}

export function Tag(props: Props) {
  return (
    <div className="h-[40px] bg-white rounded-3xl inline-flex items-center px-5 drop-shadow-md m-2">
        <Iconify icon={props.iconName || "ps:gun"} className="inline mr-1"/>
        <span>{props.name}</span>
    </div>
  )
}
