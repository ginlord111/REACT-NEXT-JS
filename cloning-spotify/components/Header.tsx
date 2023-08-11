'use client';

import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import {RxCaretLeft, RxCaretRight} from 'react-icons/rx';
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import {useUser} from '@/hooks/useUserhooks';
import Button from "./Button";
import useAuthModal from "@/hooks/useAuthModal";
import {createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { FaUserAlt } from "react-icons/fa";
import  {toast} from 'react-hot-toast';
interface HeaderProps {
    children:React.ReactNode;
    className?:string;
}
const Header:React.FC<HeaderProps> = ({children, className}) => {
  const router = useRouter()
  const authModal = useAuthModal();
  const supabase = createClientComponentClient();
  const handleLogout =async () =>{
      const {error} = await supabase.auth.signOut();
      if(error){
     toast.error(error.message)
      }
      else{
        router.refresh()
        toast.success('Logout Succesffully')
      }
  }
const {user} = useUser();
  return (
    <div className={twMerge(`h-fit bg-gradient-to-b from-emerald-800 p-6`, className)}>
      <div className="w-full mb-4 flex items-center justify-between">
        <div className="hidden md:flex gap-x-2 items-center">
          <button onClick={()=>router.back()} className="flex bg-black items-center justify-center rounded-full hover:opacity-75 transition"> <RxCaretLeft size={35} className='text-white' /></button>
          <button onClick={()=>router.forward()} className="flex bg-black items-center justify-center rounded-full hover:opacity-75 transition"> <RxCaretRight size={35} className='text-white' /></button>
        </div>
        <div className="flex md:hidden gap-x-2 items-center">
          <button className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition"><HiHome className='text-black' size={20}/></button>
          <button className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition"><BiSearch className='text-black' size={20}/></button>
        </div>
        <div className="flex justify-between items-center gap-x-4">
         {user ? (<div className="flex gap-x-4 "><Button className="bg-white font px-6 py-2 font-bold" onClick={handleLogout}>Log Out</Button>
       <Button className="bg-white" onClick={()=> router.push('/account')}><FaUserAlt className=''/></Button>
         </div>) : (
         
          <>
          <Button className="bg-transparent text-neutral-300 font-medium">
            Sign Up
          </Button>

          <Button className="bg-white px-6 py-2" onClick={authModal.onOpen} >
           Login
          </Button>
        
          </>
          )}
        </div>
      </div>
      {children}
    </div>
      
    )
}

export default Header