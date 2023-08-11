import { Songs } from "@/types";
import {cookies} from 'next/headers';
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
const getUserSongs = async ():Promise<Songs[]> =>{
const supabase = createServerComponentClient({
cookies:cookies,
}) 
const {data:sessionData, error:sessionError} = await supabase.auth.getSession();

if(sessionError){
    console.log(sessionError.message);
}
const {data, error} = await supabase.from('songs').select('*').eq('user_id', sessionData.session?.user.id).order('created_at', {ascending:false});
if(error){
    console.log(error)
}
console.log(data)
return (data as any) || []
}

export default getUserSongs;  