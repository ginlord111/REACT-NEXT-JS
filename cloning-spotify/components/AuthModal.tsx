import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Auth } from "@supabase/auth-ui-react";
import { useRouter } from "next/navigation";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useSession } from "@supabase/auth-helpers-react";
import {useEffect} from 'react';
import Modal from "./Modal";
import useAuthModal from "@/hooks/useAuthModal";
const AuthModal = () => {
    const session = useSession()
  const { isOpen, onClose } = useAuthModal();
  const router = useRouter();
  const supabaseClient = useSupabaseClient();
  const onChange = () => {
    if (isOpen) {
      onClose();
    }
  };

  useEffect(() => {
    if(session){
        router.refresh();
        onClose();
    }
}, [session, onClose, router])

  return (
    <Modal
      title="Welcome Back"
      description="Login to your Account"
      isOpen={isOpen}
      onChange={onChange}
    >
      <Auth
      magicLink
        supabaseClient={supabaseClient}
        view="sign_up"
        theme="dark"
        providers={["github"]}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: "#404040",
                brandAccent: "#22c55e",
              },
            },
          },
        }}
      ></Auth>
    </Modal>
  );
};

export default AuthModal;
