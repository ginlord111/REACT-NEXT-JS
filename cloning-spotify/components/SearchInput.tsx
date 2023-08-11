'use client';  
import useDebounce from "@/hooks/useDebounce";
import { useRouter } from "next/navigation";
import {useState, useEffect} from 'react';
import Input  from "./Input";
import qs from 'query-string';
const SearchInput = () => {
    const router = useRouter();
    const [value, setValue] = useState<string>('');
    const debouncedValue = useDebounce<string>(value, 500);

    useEffect(() =>{
 const query = {title:debouncedValue};
 
        const url = qs.stringifyUrl({
            url:'/search',
            query:query
        });
        router.push(url);
    },[debouncedValue, router])
  return (
   <Input value={value} onChange={(e)=>setValue(e.target.value)} placeholder="What do you want to listen to?"/>
  )
}

export default SearchInput