import Sidebar from '@/components/Sidebar'
import './globals.css'
import type { Metadata } from 'next'
import { Figtree} from 'next/font/google'
import SupabaseProvider from '@/SupabaseProvider'
import UserProvider from '@/providers/UserProvider'
import ModalProvider from '@/providers/ModalProvider';
import ToasterProvider from '@/providers/ToasterProvider';
import getUserSongs from '@/actions/getUserSongs'
import Player from '@/components/Player'
const font= Figtree({ subsets: ['latin'] })
export const revalidate = 0;
export const metadata: Metadata = {
  title: 'Spotify Clone',
  description: 'Generated by create next app',
}

export default async function RootLayout({
  children,  
}: {
  children: React.ReactNode
}) {
const userSongs = await getUserSongs();
  return (
    <html lang="en">
      <body className={font.className}>
      <ToasterProvider />
        <SupabaseProvider>
          <UserProvider>
        <ModalProvider />
        <Sidebar userSongs = {userSongs}>
        {children}
        </Sidebar>
        <Player />
        </UserProvider>
        </SupabaseProvider>
        </body>
    </html>
  )
}
