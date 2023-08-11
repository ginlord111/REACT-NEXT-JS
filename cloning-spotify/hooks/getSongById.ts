import { useEffect, useMemo, useState } from "react";
import { Songs } from "@/types";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { toast } from "react-hot-toast";
const getSongById = (id?: string) => {
  const [song, setSong] = useState<Songs | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const { supabaseClient } = useSessionContext();

  useEffect(() => {
    if (!id) {
      return;
    }
    setIsLoading(true);

    const fetchSong = async () => {
      const { data, error } = await supabaseClient
        .from("songs")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        toast.error(error.message);
      }
      setSong(data as Songs);
      setIsLoading(false);
    };
    fetchSong();
  }, [id, supabaseClient]);

  return useMemo(
    () => ({
      isLoading,
      song
    }),
    [isLoading, song]
  );
};

export default getSongById;

// const {song} = getSongbyid
