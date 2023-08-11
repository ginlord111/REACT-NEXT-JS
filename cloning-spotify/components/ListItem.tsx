"use client";
import Image from "next/image";
import { FaPlay } from "react-icons/fa";
import { useRouter } from "next/navigation";
interface ListItemProps {
  href?: string;
  image: string;
  name: string;
}
const ListItem: React.FC<ListItemProps> = ({ href, image, name }) => {
  const router = useRouter();
  return (
    <button
      className="relative group flex items-center rounded-md overflow-hidden gap-x-4 bg-neutral-100/10 hover:bg-neutral-100/20 transition pr-4"
      onClick={() => router.push("/liked")}
    >
      <div className="relative min-w-[64px] min-h-[64px]">
        <Image src={image} alt="IMAGE" className="object-cover" fill />
      </div>
      <p className="font-medium">{name}</p>
      <div className="rounded-full absolute opacity-0 transition flex items-center justify-center p-4 right-5 bg-green-500 group-hover:opacity-100 hover:scale-110 drop-shadow-md">
        <FaPlay className="text-black" />
      </div>
    </button>
  );
};

export default ListItem;
