import { Songs } from "@/types";
import React, { useEffect } from "react";
import MediaItem from "./MediaItem";
import LikeButton from "./LikeButton";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import {HiSpeakerXMark, HiSpeakerWave} from 'react-icons/hi2';
import Slider from "./Slider";
import usePlayer from "@/hooks/usePlayer";
import {useState} from 'react';
import useSound from 'use-sound';

interface PlayerContentProps {
  song: Songs;
  songUrl: string;
}
const PlayerContent: React.FC<PlayerContentProps> = ({ song, songUrl }) => {
    const [vol, setVol] = useState<number>(0.3)
    const [isPlaying, setIsPlaying] = useState<boolean>(false)
    const Icon = isPlaying ? BsPauseFill : BsPlayFill;
  const VolumeIcon = vol===0 ? HiSpeakerXMark : HiSpeakerWave;
  const player = usePlayer()

  const onPlayNext = () =>{
    if(player.ids.length===0){
        return;
    }
    const currentIndex = player.ids.findIndex((id) => id===player.activeId);
    const nextSong = player.ids[currentIndex +1];
    // can i change this to player.activeid +1?

    if(!nextSong){
    return player.setId(player.ids[0])
    }
    player.setId(nextSong)
  }

  const onPlayPrevious = () =>{
    if(player.ids.length===0){
        return;
    }
    const currentIndex = player.ids.findIndex((id) => id===player.activeId);
    const previousSong = player.ids[currentIndex -1];
    // can i change this to player.activeid +1?

    if(!previousSong){
    return player.setId(player.ids[player.ids.length -1])
    }

    player.setId(previousSong)
  }

  const [play, {pause, sound}] = useSound(
    songUrl,
    {
        volume:vol,
        onplay: () => setIsPlaying(true),
        onend:() => {
            setIsPlaying(false)
            onPlayNext()
        },
        onpause: () => setIsPlaying(false),
        format:['mp3']
    }
        )
        useEffect(() =>{
            sound?.play()


            return () => {
                sound?.unload()
            }
        }, [sound])

const handlePlay = () => {
    if(!isPlaying){
        play()
    }
    else{
        pause()
    }
}
const toggleMute = () =>{
     if(vol ===0){
        setVol(1)
     }
     else{
        setVol(0)
     }
}
  return (
    <div className="grid grid-cols-3 md:grid-cols-3 h-full">
      <div className="flex w-full justify-start">
        <div className="flex items-center gap-x-4">
          <MediaItem data={song} />
          <LikeButton songID={song.id} />
        </div>
      </div>
      <div className="flex md:hidden col-auto justify-end items-center">
        <div className="h-10 w-10 flex items-center justify-center rounded-full bg-white p-1 cursor-pointer">
          <Icon size={30} className="text-black"  onClick={handlePlay} />
        </div>
      </div>
      <div className="hidden h-full md:flex justify-center items-center w-full gap-x-6 max-w-[722px]">
        <AiFillStepBackward
          size={30}
          className="text-neutral-400 cursor-pointer hover:text-white transition"
          onClick={onPlayPrevious}
        />
      
      <div className="flex items-center justify-center h-10 rounded-full bg-white p-1 cursor-pointer">
        <Icon size={30} className="text-black" onClick={handlePlay} />
      </div>
      <AiFillStepForward
        onClick={onPlayNext}
        size={30}
        className="text-neutral-400 hover:text-white transition cursor-pointer"
      />
      </div>
      <div className="flex w-full justify-end pl-[25px]">
        <div className="flex items-center gap-x-2 w-[120px] ">
            <VolumeIcon onClick={toggleMute } size={34} className='cursor-pointer'/>
            <Slider value={vol} onChange={(value) => setVol(value)}/>
        </div>
      </div>
    </div>
  );
};

export default PlayerContent;
