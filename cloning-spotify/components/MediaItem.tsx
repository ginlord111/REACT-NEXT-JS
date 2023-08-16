'use client'
import { Songs } from "@/types";
import useLoadImage from "@/hooks/useLoadImage";
import Image from "next/image";
interface MediaItemProps{
    data:Songs;
    onClick?:(id:string)=>any;
}

const MediaItem:React.FC<MediaItemProps> = ({data, onClick}) => {
    const imageUrl = useLoadImage(data);
  return (
    <div className="relative flex items-center gap-x-3 cursor-pointer hover:bg-neutral-800/50 w-full p-2 rounded-md" onClick={()=>onClick(data.id)}>
        <div className="relative rounded-md min-h-[48px] min-w-[48px] overflow-hidden">
            <Image fill className="object-cover" alt="IMAGES" src={imageUrl || ""}/>
        </div>
        <div className="flex flex-col gap-y-1 overflow-hidden ">
            <p className="text-white truncate">{data.title}</p>
            <p className="text-neutral-400 truncate text-sm">{data.author}</p>
        </div>
    </div>
  )
}

export default MediaItem