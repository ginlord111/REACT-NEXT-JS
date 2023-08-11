"use client";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useUser } from "@/hooks/useUserhooks";
import useAuthModal from "@/hooks/useAuthModal";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { toast } from "react-hot-toast";
interface LikeButtonProps {
  songID: string;
}

const LikeButton: React.FC<LikeButtonProps> = ({ songID }) => {
  const router = useRouter();
  const authmodal = useAuthModal();
  const { user } = useUser();
  const [liked, setLiked] = useState<boolean>(false);
  const { supabaseClient } = useSessionContext();
  useEffect(() => {
    if (!user?.id) {
      return;
    }
    const fetchData = async () => {
      const { data, error } = await supabaseClient
        .from("liked_songs")
        .select("*")
        .eq("user_id", user.id)
        .eq("songs_id", songID)
        .single();
      if (!error && data) {
        setLiked(true);
      }
    };
    fetchData();
  }, [user?.id, supabaseClient, songID, router]);
  const Icon = liked ? AiFillHeart : AiOutlineHeart;

  const handleLike = async () => {
    if (!user) {
      authmodal.onOpen();
    }
    if (liked) {
      const { error } = await supabaseClient
        .from("liked_songs")
        .delete()
        .eq("user_id", user?.id)
        .eq("songs_id", songID);
      if (error) {
        toast.error(error.message);
      } else {
        setLiked(false);
        toast.success("Remove from your liked songs");
      }
    } else {
      const { error } = await supabaseClient
        .from("liked_songs")
        .insert({ user_id: user?.id, songs_id: songID });
      if (error) {
        toast.error(error.message);
      } else {
        setLiked(true);
        toast.success("Added to Your Liked Songs");
      }
    }
    router.refresh();
  };
  return (
    <button onClick={handleLike} className="hover:opacity-75">
      <Icon color={liked ? "#22c55e" : "none"} size={25} />
    </button>
  );
};

export default LikeButton;
