'use client'

//? redux
import { useAppSelector } from '@/redux/hooks'

import HomeIcon from '@/icons/HomeIcon'
import LogOutIcon from '@/icons/LogOutIcon'
import SettingsIcon from '@/icons/SettingsIcon'
import UserIcon from '@/icons/UserIcon'
import SearchBarr from './SearchBarr'
import { usePathname, useRouter } from 'next/navigation'
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
import { useLogoutMutation } from '@/redux/apiSlices/authApi'
import { setUser } from "@/redux/slices/userSlice";
import { useDispatch } from "react-redux";


export default function SideNavBar() {
  const user = useAppSelector(state => state.userReducer.user)
  const pathname = usePathname()
  const dispatch = useDispatch();
  const router = useRouter()
  const [logout] = useLogoutMutation()

  const inRoute = (routeName: string) => pathname.includes(routeName)

  const handleLogout = () => {
    const attemptRefreshToken = async () => {
      try {
        const response = await logout({}).unwrap();
        if (response.code == 200) {
          router.push('/login')
          dispatch(setUser(response.data));
        }
      } catch (error) {
        console.log(error);
      }
    }

    attemptRefreshToken();
  }

  return (
    <Paper component='section' elevation={0} sx={{ borderRadius: '0' }}
      className='sidenavbar z-50 md:sticky md:top-[85.1px] border-neutral-300 dark:border-neutral-700 px-4 md:px-5 py-3 md:py-10 
      border-t md:space-y-10 md:border-t-0 md:border-x order-last md:order-none fixed bottom-0 md:bottom-auto w-full md:w-auto'
    >
      <SearchBarr />

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
        {user && <NavLink
          link={{
            href: 'messages',
            name: 'Messages'
          }}
          pathname={pathname}
        >
          {inRoute('messages') ? <ChatBoxFillIcon /> : <ChatBoxIcon />}
        </NavLink>}
        {user && <NavLink
          link={{
            href: `suggestedUsers`,
            name: 'Suggested Users'
          }}
          pathname={pathname}
        >
          {inRoute('suggested-users') ? <AddCircleIcon /> : <AddCircleIcon />}
        </NavLink>}
        <NavLink
          link={{
            href: 'settings',
            name: 'Settings'
          }}
          pathname={pathname}
        >
          {inRoute('settings') ? <SettingsFillIcon /> : <SettingsIcon />}
        </NavLink>
        {user && <button
          onClick={() => handleLogout()}
          className='flex text-neutral-400 dark:text-neutral-500 gap-x-4 py-2 px-4 items-center font-semibold rounded-md md:rounded-full md:border border-transparent transition md:hover:text-black md:dark:hover:text-white md:hover:border-neutral-300 md:dark:hover:border-neutral-700 md:flex'
        >
          <LogOutIcon />
        </NavLink>}
        {user && <Link href={`/profile/${user.username}`} className='md:hidden'>
          <Avatar {...stringAvatar('User Name')} className='size-8 text-sm font-semibold' />
        </Link>}
      </nav>
    </Paper>
  )
}

