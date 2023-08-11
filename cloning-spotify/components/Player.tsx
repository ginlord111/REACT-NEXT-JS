'use client';

import usePlayer from "@/hooks/usePlayer"
import getSongById from "@/hooks/getSongById";
import useLoadSongUrl from "@/hooks/useLoadSongUrl";

const Player = () => {
    const player = usePlayer();
    const {song} = getSongById(player.activeId);
    const songUrl = useLoadSongUrl(song!)
    
    if(!player.activeId || !songUrl || !song){
      return null;
    }

  return (
    <div className="bg-black fixed bottom-0 w-full py-2 h-[80px] px-4">Player</div>
  )
}

export default Player