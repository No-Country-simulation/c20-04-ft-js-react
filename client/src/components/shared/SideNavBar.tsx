'use client'

//? redux
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

import HomeIcon from '@/icons/HomeIcon'
import LogOutIcon from '@/icons/LogOutIcon'
import MailIcon from '@/icons/MailIcon'
import SettingsIcon from '@/icons/SettingsIcon'
import UserIcon from '@/icons/UserIcon'
import SearchBarr from './SearchBarr'
import Link from 'next/link'
import { usePathname } from 'next/navigation'


export default function SideNavBar() {

  const userName = useSelector((state: RootState)=> state.userReducer.user?.username)

  const routes = [
    {
      name: 'Home',
      path: '/',
      icon: HomeIcon
    },
    {
      name: 'Mensajes',
      path: '/messages',
      icon: MailIcon
    },
    {
      name: 'Profile',
      path: `/profile/${userName}`,
      icon: UserIcon
    },
    {
      name: 'Configuracíon',
      path: '/settings',
      icon: SettingsIcon
    },
    {
      name: 'Cerrar sesión',
      path: '/log-out',
      icon: LogOutIcon
    }
  ];

  const pathname = usePathname()

  return (
    <section
      className='border-neutral-300 dark:border-neutral-700 px-3 md:px-5 py-2 md:py-10 
      border-t md:border-t-0 md:border-x order-last md:order-none absolute md:static bottom-0 md:bottom-auto w-full md:w-auto'
    >
      <div className='hidden md:block'>
        <SearchBarr />
      </div>

      <nav className='flex justify-between md:flex-col md:gap-5'>
        {routes.map(({ icon: Icon, ...props }, i) => (
          <Link
            key={props.path}
            href={props.path}
            className={
              'flex gap-x-4 py-2 px-4 items-center font-semibold rounded-md md:rounded-full border border-transparent transition hover:text-black dark:hover:text-white hover:border-neutral-300 dark:hover:border-neutral-700 ' +
              (pathname === props.path ? 'text-black dark:text-white ' : 'text-black/50 dark:text-white/50 ') +
              (i + 1 === routes.length ? 'hidden md:flex' : '')
            }
          >
            <Icon />
            <span className='hidden md:inline'>{props.name}</span>
          </Link>
        ))}
      </nav>
    </section>
  )


}

