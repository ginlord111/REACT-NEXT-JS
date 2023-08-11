'use client';

import { MyUserContextProvider } from "@/hooks/useUserhooks";

type UserProvider = {
children:React.ReactNode;
}
const UserProvider:React.FC<UserProvider> = ({children}) => {
  return (
   <MyUserContextProvider>
    {children}
   </MyUserContextProvider>
  )
}

export default UserProvider