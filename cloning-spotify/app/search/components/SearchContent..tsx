'use client';
import MediaItem from "@/components/MediaItem";
import { Songs } from "@/types";
import LikeButton from "@/components/LikeButton";
import useOnPlay from "@/hooks/useOnPlay";
interface SearchContentProps{
    songs:Songs[]
}

const SearchContent:React.FC<SearchContentProps> = ({songs}) => {
    const onPlay = useOnPlay(songs)
    if(songs.length===0){
        return (
            <p className="text-neutral-400 flex flex-col gap-y-2 w-full px-6 ">No Songs found</p>
        )
    }
  return (
    <div className="flex flex-col gap-y-2 w-full px-6">
     {songs.map((item) =>(
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

export default SearchContent