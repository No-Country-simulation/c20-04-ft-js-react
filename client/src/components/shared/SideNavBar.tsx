import HomeIcon from '@/icons/HomeIcon';
import path from 'path';

const routes = [
  {
    name: 'Home',
    path: '/',
    icon: <HomeIcon />
  },
  {
    name: 'Mensajes',
    path: '/messages',
    icon: <HomeIcon />
  },
  {
    name: 'Perfil',
    path: '/me',
    icon: <HomeIcon />
  },
  {
    name: 'Configuracíon',
    path: '/settings',
    icon: <HomeIcon />
  },
  {
    name: 'Cerrar sesión',
    path: '/log-out',
    icon: <HomeIcon />
  }
];

export default function SideNavBar() {
  return (
    <section className='border border-gray-500 px-5 py-10'>
      <input
        className='border border-gray-500 rounded-full py-2 px-4 mb-10'
        type='search'
        placeholder='Buscar'
      />

      <nav className='grid gap-y-10'>
        {routes.map((route) => (
          <a
            key={route.path}
            href={route.path}
            className='flex gap-x-4 items-center font-semibold border hover:border-gray-500'
          >
            {route.icon}
            <span>{route.name}</span>
          </a>
        ))}
      </nav>
    </section>
  );
}
