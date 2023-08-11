
import {cookies} from 'next/headers';
import getSongs from "./getSongs";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
const getUserSongsByTitle = async (title:string) =>{
const supabase = createServerComponentClient({
cookies:cookies,
}) 

if(!title){
    const allSongs = await getSongs();
    return allSongs;
}
const {data, error} = await supabase.from('songs').select('*').ilike('title', `%${title}%`).order('created_at', {ascending:false})
if(error){
    console.log(error)
}
return (data as any) || []
}
export default getUserSongsByTitle;  