import ThemeSwitcher from '@/components/shared/ThemeSwitcher'
import { Box } from '@mui/material'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Home'
}

export default function Home() {
  return (
    <Box p={5} gap={4} sx={{
      display: 'flex', flexDirection: 'column', width: '100% ', borderRight: '1px solid #e0e0e0'
    }}>
      < ThemeSwitcher />
    </Box>
  )
}
