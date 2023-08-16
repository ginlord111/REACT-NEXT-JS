"use client";
import React from "react";
import { TbPlaylist } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";
import { useUser } from "@/hooks/useUserhooks";
import useAuthModal from "@/hooks/useAuthModal";
import useUploadModal from "@/hooks/useUploadModal";
import MediaItem from "./MediaItem";
import { Songs } from "@/types";
import useOnPlay from "@/hooks/useOnPlay";
interface LibraryProps {
  songs: Songs[];
}
const Library: React.FC<LibraryProps> = ({ songs }) => {
  const uploadModal = useUploadModal();
  const onPlay = useOnPlay(songs)
  const { user } = useUser();
  const authModal = useAuthModal();
  const onClick = () => {
    if (!user) {
      return authModal.onOpen();
    } else {
      return uploadModal.onOpen();
    }
  };
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-5 pt-4">
        <div className="inline-flex items-center gap-x-2">
          <TbPlaylist size={26} className="text-neutral-400" />
          <p className="text-neutral-400 font-medium text-base">Your Library</p>
        </div>
        <AiOutlinePlus
          onClick={onClick}
          size={20}
          className="text-neutral-400 hover:text-white transition cursor-pointer"
        />
      </div>
      <div className="flex flex-col gap-y-2 mt-4 px-3">
        {songs.map((item) => (
          <MediaItem key={item.id} data={item} onClick={(id:string) => {onPlay(id)}} />
        ))}
      </div>
    </div>
  );
};

export default Library;
