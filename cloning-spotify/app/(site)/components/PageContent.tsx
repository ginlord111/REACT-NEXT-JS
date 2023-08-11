'use client';
import { Songs } from "@/types";
import SongItem from "../SongItem";
import useOnPlay from "@/hooks/useOnPlay";
interface PageContentProps{
song:Songs[];
}
const PageContent:React.FC<PageContentProps> = ({song}) => {
  const onPlay = useOnPlay(song)
    if(song.length===0){
        return (
            <div className="mt-4 text-neutral-400">No Songs Available</div>
        ) 
    }
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8
     gap-4 mt-4">
      {song.map((item )=> (
        <SongItem data={item} key={item.id} onClick={(id:string)=>onPlay(id)}/>
      ))}
    </div>
  )
}

export default PageContent