import { IoHomeOutline } from 'react-icons/io5';
import { CiUser, CiMail } from 'react-icons/ci';
import { IoSettingsOutline, IoLogOutOutline } from 'react-icons/io5';

const routes = [
  {
    name: 'Home',
    path: '/',
    icon: IoHomeOutline
  },
  {
    name: 'Mensajes',
    path: '/messages',
    icon: CiMail
  },
  {
    name: 'Perfil',
    path: '/me',
    icon: CiUser
  },
  {
    name: 'Configuracíon',
    path: '/settings',
    icon: IoSettingsOutline
  },
  {
    name: 'Cerrar sesión',
    path: '/log-out',
    icon: IoLogOutOutline
  }
];

export default function SideNavBar() {
  return (
    <section className='border border-neutral-300 px-5 py-10 h-full border-t-0'>
      <input
        className='border border-neutral-300 rounded-full py-2 px-4 mb-10 outline-none transition-colors focus:border-black'
        type='search'
        placeholder='Buscar'
      />

      <nav className='grid gap-y-5'>
        {routes.map((route) => (
          <a
            key={route.path}
            href={route.path}
            className='flex gap-x-4 py-2 px-4 items-center font-semibold rounded-full border border-transparent transition text-black/60 hover:text-black hover:border-neutral-300'
          >
            <route.icon className='size-8' />
            <span>{route.name}</span>
          </a>
        ))}
      </nav>
    </section>
  );
}
