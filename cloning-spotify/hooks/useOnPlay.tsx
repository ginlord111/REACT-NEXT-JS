import { Songs } from "@/types"
import usePlayer from "./usePlayer"
import useAuthModal from "./useAuthModal"
import { useUser } from "./useUserhooks"


const useOnPlay = (songs:Songs[]) =>{
    const player = usePlayer()
    const authmodal = useAuthModal()
    const {user} = useUser()
    
    const OnPlay = (id:string) =>{
        if(!user) {
            return authmodal.onOpen()
        }
         player.setId(id)
         player.setIds(songs.map((song)=> song.id))
    }
    return OnPlay;
}


export default useOnPlay;