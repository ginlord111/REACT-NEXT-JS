import { Songs } from "@/types";
import {cookies} from 'next/headers';
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
export const getSongs = async ():Promise<Songs[]> =>{
const supabase = createServerComponentClient({
cookies:cookies,
}) 

const {data, error} = await supabase.from('songs').select('*').order('created_at', {ascending:false});
console.log(data)
if(error){
    console.log(error);
}
return (data as any) || []
}

export default getSongs;  