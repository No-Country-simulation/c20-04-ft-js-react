'use client'

//? redux
import { useAppSelector } from '@/redux/hooks'

import HomeIcon from '@/icons/HomeIcon'
import LogOutIcon from '@/icons/LogOutIcon'
import SettingsIcon from '@/icons/SettingsIcon'
import UserIcon from '@/icons/UserIcon'
import SearchBarr from './SearchBarr'
import { usePathname } from 'next/navigation'
import { Avatar, Paper } from '@mui/material'
import HomeFillIcon from '@/icons/HomeFill'
import ChatBoxIcon from '@/icons/ChatBox'
import ChatBoxFillIcon from '@/icons/ChatBoxFill'
import UserFillIcon from '@/icons/UserFill'
import SettingsFillIcon from '@/icons/SettingsFill'
import NavLink from './NavLink'
import AddCircleIcon from '@/icons/AddCircle'
import Link from 'next/link'
import { stringAvatar } from '@/utils/avatar'


export default function SideNavBar() {
  const user = useAppSelector(state => state.userReducer.user)
  const pathname = usePathname()

  const inRoute = (routeName: string) => pathname.includes(routeName)

  return (
    <Paper component='section' elevation={0} sx={{ borderRadius: '0' }}
      className='sidenavbar z-50 md:sticky md:top-[85.1px] border-neutral-300 dark:border-neutral-700 px-0 md:px-5 py-2 md:py-10 
      border-t md:border-t-0 md:border-x order-last md:order-none fixed bottom-0 md:bottom-auto w-full md:w-auto'
    >
      <div className='hidden md:block'>
        <SearchBarr />
      </div>

      <nav className='flex justify-between md:flex-col md:gap-5'>
        <NavLink
          link={{
            href: 'home',
            name: 'Home'
          }}
          pathname={pathname}
        >
          {inRoute('home') ? <HomeFillIcon /> : <HomeIcon />}
        </NavLink>
        {user && <NavLink
          link={{
            href: `profile/${user.username}`,
            name: 'Profile'
          }}
          pathname={pathname}
          className='hidden md:flex'
        >
          {inRoute('profile') ? <UserFillIcon /> : <UserIcon />}
        </NavLink>}
        <NavLink
          link={{
            href: 'messages',
            name: 'Messages'
          }}
          pathname={pathname}
        >
          {inRoute('messages') ? <ChatBoxFillIcon /> : <ChatBoxIcon />}
        </NavLink>
        <NavLink
          link={{
            href: `suggestedUsers`,
            name: 'Suggested Users'
          }}
          pathname={pathname}
        >
          {inRoute('suggested-users') ? <AddCircleIcon /> : <AddCircleIcon />}
        </NavLink>
        <NavLink
          link={{
            href: 'settings',
            name: 'Settings'
          }}
          pathname={pathname}
        >
          {inRoute('settings') ? <SettingsFillIcon /> : <SettingsIcon />}
        </NavLink>
        {user && <NavLink
          link={{
            href: 'log-out',
            name: 'Log out'
          }}
          pathname={pathname}
          className='hidden md:flex'
        >
          <LogOutIcon />
        </NavLink>}
        {user && <Link href={`/profile/${user.username}`} className='flex items-center py-2 px-4 md:hidden'>
          <Avatar {...stringAvatar('User Name')} className='size-8 text-sm font-semibold' />
        </Link>}
      </nav>
    </Paper>
  )
}

