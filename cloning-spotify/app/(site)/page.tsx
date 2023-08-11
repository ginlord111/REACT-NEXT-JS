import Header from "@/components/Header"
import ListItem from "@/components/ListItem";
import getSongs from "@/actions/getSongs";
import PageContent from "./components/PageContent";
export const revalidate =  0;
export const Home = async () => {
  const songs = await getSongs();
  return (
   <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
  <Header>
    <div>
      <h1 className="font-semibold text-3xl text-white mb-4">Welcome Back
      </h1>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 mt-4">

  <ListItem image='/liked.png' name='Liked Songs'/>
    </div>
  </Header>
  <div className="mb-2 mt-2 px-6">
    <div className="flex justify-between items-center">
      <h1 className="text-white font-semibold text-2xl">Newest Song</h1>
    </div>
    <div>
    <PageContent song={songs}/>
    </div>
  </div>
   </div>
  )
} 
export default Home;
