import React from 'react';
import Link from 'next/link';
import { IconType } from 'react-icons';
import {twMerge} from 'tailwind-merge';
interface SidebarItemProps {
    icons:IconType;
    label:string;
    active?:boolean;
    href:string;
 
}
const SidebarItem:React.FC<SidebarItemProps> = ({icons:Icon, label,active,href}) => {
  return (
<Link href={href} className={twMerge(`h-auto w-full items-center gap-x-4 text-base font-md cursor-pointer hover:text-white transition text-neutral-400 py-1`, active && "text-white")} style={{display:'flex'}}>
<Icon size={26}></Icon>
<p className='truncate w-full'>{label}</p>
    
</Link>
  );
}

export default SidebarItem