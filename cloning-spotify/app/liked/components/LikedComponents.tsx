'use client'
import { Songs } from "@/types";
import MediaItem from "@/components/MediaItem";
import LikeButton from "@/components/LikeButton";
import useOnPlay from "@/hooks/useOnPlay";
interface LikedComponentsProps{
    song:Songs[];
}

const LikedComponents:React.FC<LikedComponentsProps> = ({song}) => {
  const onPlay = useOnPlay(song)
  if(song.length===0){
    return(
      <div className="flex flex-col gap-y-2 w-full px-6 mt-[40px]">
        <p className="text-sm text-neutral-400 font-semibold">No Liked Songs yet</p>
        </div>
    )
  }
  return (
    <div className="flex flex-col gap-y-2 w-full px-6 mt-[40px]">
     {song.map((item) =>(
        <div className="flex items-center gap-x-4 w-full">
        <div className="flex-1">
            <MediaItem data={item} onClick={(id:string) =>{onPlay(id)}} />
        </div>
        <LikeButton songID={item.id} />
    </div>
     ))}
      
      </div>
  )
}

export default LikedComponents