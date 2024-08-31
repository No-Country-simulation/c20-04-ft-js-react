import HomeIcon from "@/icons/HomeIcon";
import LogOutIcon from "@/icons/LogOutIcon";
import MailIcon from "@/icons/MailIcon";
import SettingsIcon from "@/icons/SettingsIcon";
import UserIcon from "@/icons/UserIcon";

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
    name: 'Perfil',
    path: '/me',
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

export default function SideNavBar() {
  return (
    <section className='h-[93svh] border border-neutral-300 px-5 py-10 border-t-0 border-b-0'>
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
            <route.icon />
            <span>{route.name}</span>
          </a>
        ))}
      </nav>
    </section>
  );
}
