import Modal from "./Modal";
import useUploadModal from "@/hooks/useUploadModal";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import Input from "./Input";
import { useState } from "react";
import Button from "./Button";
import { Toaster, toast } from "react-hot-toast";
import { useUser } from "@/hooks/useUserhooks";
import uniqid from "uniqid";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
const UploadModal = () => {
  const uploadModal = useUploadModal();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user } = useUser();
  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      author: "",
      title: "",
      songs: null,
      images: null,
    },
  });
  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true);
      const songFile = values.song?.[0];
      const imageFile = values.image?.[0];

      if (!songFile || !imageFile || !user) {
        toast.error("Missing Fields");
        return;
      }
      const uniqueID = uniqid();
      const { data: songData, error: songError } = await supabaseClient.storage
        .from("songs")
        .upload(`songs-${values.title}-${uniqueID}`, songFile, {
          cacheControl: "3600",
          upsert: false,
        });
        if(songError){
          setIsLoading(false);
          return toast.error('Failed song Upload');
        }

        const { data: imageData, error: imageError } = await supabaseClient.storage
        .from("images")
        .upload(`image-${values.title}-${uniqueID}`, imageFile, {
          cacheControl: "3600",
          upsert: false,
        });

        if(imageError){
          setIsLoading(false);
          return toast.error('Failed image Upload');
        }

        const {error:supaBaseError} = await supabaseClient.from('songs').insert({
          user_id:user.id,
          title:values.title,
          author:values.author,
          image_path:imageData.path,
          song_path:songData.path,
        })

        if(supaBaseError){
          setIsLoading(false);
          return toast.error(supaBaseError.message);
        }
        
        router.refresh();
        setIsLoading(false);
        toast.success('Songs Created');
        reset();
        uploadModal.onClose();

    } catch (error) {
      toast.error("Something Went Wrong in Uploading file");
    }
  };
  const onChange = () => {
    if (uploadModal.isOpen) {
      reset();
      return uploadModal.onClose();
    }
  };

  return (
    <Modal
      title="Add a song"
      description="Upload an mp3 file"
      isOpen={uploadModal.isOpen}
      onChange={onChange}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
        <Input
          id="title"
          disabled={isLoading}
          {...register("title", { required: true })}
          placeholder="Song Title"
        />
        <Input
          id="author"
          disabled={isLoading}
          {...register("author", { required: true })}
          placeholder="Song Author"
        />
        <div>
          <div className="pb-1">Select a Song File </div>
          <Input
            id="song"
            type="file"
            disabled={isLoading}
            accept=".mp3"
            {...register("song", { required: true })}
          />
        </div>
        <div>
          <div className="pb-1">Select a Song Image </div>
          <Input
            id="image"
            type="file"
            disabled={isLoading}
            accept="image/*"
            {...register("image", { required: true })}
          />
        </div>
        <Button disabled={isLoading} type="submit">
          Create
        </Button>
      </form>
    </Modal>
  );
};

export default UploadModal;
