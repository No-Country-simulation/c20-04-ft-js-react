'use client'

import { User } from '../../../types'
import { Avatar } from '@mui/material'
import { stringAvatar } from '@/utils/avatar'
import { useRef, useState } from 'react'

export default function SuggestedUsers() {

  const filtersDiv = useRef<HTMLDivElement>(null)
  const [filters, setFilters] = useState<string[]>(["filter1", "filter2", "filter3"]);
  const users: User[] = [
    {
      id: '1',
      username: 'tino_',
      name: 'Valentino',
      role: 'user',
      email: 'fakeemail@gmail.com',
      avatar: 'https://images.stockcake.com/public/2/9/1/291076a4-fcf8-4639-9de9-31a885091c31_medium/dogs-enjoying-outdoors-stockcake.jpg'
    },
    {
      id: '2',
      username: 'javiercito_',
      name: 'Javier',
      role: 'user',
      email: 'fakeemail2@gmail.com',
      avatar: 'https://pbs.twimg.com/profile_images/612148081442865152/5YaxW8F5_400x400.jpg'
    },
    {
      id: '3',
      username: 'pedro_',
      name: 'Pedro',
      role: 'user',
      email: 'fakeemail3@gmail.com',
      avatar: 'https://petmeetly.com/wp-content/uploads/2023/10/Dogs-Petmeetly.jpg'
    }
  ]

  const handleShowFilters = () => {
    if (filtersDiv.current !== null && filtersDiv.current.className.includes('flex')) {
      filtersDiv.current.className = filtersDiv.current.className.replace(/\s*(flex-col|flex)\s*/g, '')
      filtersDiv.current.className += ' hidden'
      return
    }
    if (filtersDiv.current !== null && filtersDiv.current.className.includes('hidden')) {
      filtersDiv.current.className = filtersDiv.current.className.replace(/\s*hidden/g, '')
      filtersDiv.current.className += ' flex flex-col'
      return
    }
  }

  const handleDeleteFilters = (filter: string) => {
    setFilters(prevFilters => prevFilters.filter(e => e !== filter)); // Actualiza el estado
  };

  return (
    <>
      <div
        className='p-4 flex flex-row'
      >
        <div className='grow flex flex-row flex-wrap gap-4 mr-4'>
          {filters.length > 0 ? filters?.map(filter =>
            <div
              key={filter}
              className='flex flex-row gap-4 outline outline-1 outline-medium-purple-400 rounded-full px-2 w-fit duration-300 hover:bg-neutral-200 hover:dark:bg-neutral-800'
            >{filter}
              <button onClick={() => handleDeleteFilters(filter)} className='text-red-800'>x</button>
            </div>) : <p>No filters applied.</p>}
        </div>
        <button onClick={handleShowFilters} className='flex flex-row'>
          <span className='mr-4'>Filters</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
          </svg>
        </button>
      </div>

      <div
        ref={filtersDiv}
        className='hidden bg-medium-purple-400 dark:bg-medium-purple-700 rounded-xl p-4 gap-4 text-white'
      >
        <div className='flex flex-row justify-between w-full items-center'>
          <p>Filters:</p>
          <button onClick={handleShowFilters} className='bg-medium-purple-400 px-1 rounded-xl duration-300 hover:text-red-800'>X</button>
        </div>
        <div>
          <p>Age</p>
        </div>
        <div>
          <p>Type of pet</p>
        </div>
      </div>

      <div
        className='p-4 flex flex-col gap-4'
      >
        {users ? users?.map(user => <div
          id={user.id}
          key={user.id}
          className='flex flex-row gap-4 items-center outline outline-1 outline-medium-purple-400 rounded-full p-4'
        >
          {user.avatar ? <img className='h-12 w-12 rounded-full' src={user.avatar} /> : <Avatar {...stringAvatar(user.username.toString())} className='h-12 w-12 text-sm font-semibold' />}
          <div className='flex flex-col grow dark:text-white'>
            {user.name}
            <span className='text-neutral-500'>{user.username}</span>
          </div>
          <button className='bg-medium-purple-500 text-white p-2 rounded-xl duration-300 hover:bg-medium-purple-800'>Follow</button>
        </div>) : <p>There are no users to suggest.</p>}
      </div>
    </>
  )
}

