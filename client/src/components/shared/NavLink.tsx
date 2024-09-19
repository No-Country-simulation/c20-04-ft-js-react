import Link from "next/link";

export default function NavLink({ link, pathname, className, children }: {
  link: {
    href: string
    name: string
  }
  pathname: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <Link
      href={'/' + link.href}
      className={
        'flex gap-x-4 md:py-2 md:px-4 items-center font-semibold rounded-md md:rounded-full md:border border-transparent transition md:hover:text-black md:dark:hover:text-white md:hover:border-neutral-300 md:dark:hover:border-neutral-700 ' +
        (pathname.includes(link.href) ? 'text-black dark:text-white ' : 'text-neutral-400 dark:text-neutral-500 ') + className ?? ''
      }
    >
      {children}
      <span className='hidden md:inline'>{link.name}</span>
    </Link>
  )
}