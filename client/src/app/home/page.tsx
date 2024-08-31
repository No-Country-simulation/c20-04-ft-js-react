
import Header from '@/components/Header/Header'
import SideNavBar from '@/components/shared/SideNavBar'
import ThemeSwitcher from '@/components/shared/ThemeSwitcher'
import { Box } from '@mui/material'

export default function Home() {
  return (
    <main className='min-h-dvh max-w-screen-xl mx-auto'>
      <Header />
      <div className='flex'>
        <SideNavBar />
        <Box p={5} gap={4} sx={{
          display: 'flex', flexDirection: 'column', width: '100% ', borderRight: '1px solid #e0e0e0'
        }}>
          < ThemeSwitcher />
        </Box>
      </div>
    </main >
  )
}
