export default function SearchBarr() {
  return (
    <input
      className='border bg-neutral-100 dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700 rounded-full py-2 px-4 mb-10 outline-none transition-colors focus:border-black dark:focus:border-white'
      type='search'
      name='search'
      placeholder='Buscar'
      autoComplete='off'
    />
  )
}