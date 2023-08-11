
import Header from "@/components/Header";
import Image from "next/image";
import LikedComponents from "./components/LikedComponents";
import getLikedSongs from "@/actions/getLikedSongs";
export const revalidate =0;
const Liked = async () =>{
  const likedSongs = await getLikedSongs()
return(
  <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
  <Header className="h-[35vh]">
  <div className="flex relative top-[40px] gap-x-6 mb-4 items-center ">
    <div className="relative h-32 w-32 lg:h-44 lg:w-44 ">
      <Image src='/liked.png' alt="IMAGE" className="object-cover" fill  />
  </div>
  <div className=" flex flex-col gap-y-3  overflow-hidden truncate  justify-center ">
  <p className="text-sm text-white font-semibold">Playlist</p>
  <p className="md:text-7xl text-[30px] font-semibold">Liked Songs</p>
  </div>
</div>
  </Header>
 <LikedComponents song={likedSongs} />
  </div>
)
}
export default Liked