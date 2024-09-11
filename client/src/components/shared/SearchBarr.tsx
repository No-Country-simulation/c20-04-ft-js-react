'use client'

import XIcon from '@/icons/X'
import { useAppDispatch } from '@/redux/hooks'
import { toggleSearch } from '@/redux/slices/searchSlice'
import { stringAvatar } from '@/utils/avatar'
import { Avatar, IconButton } from '@mui/material'
import Link from 'next/link'
import { FormEvent, useState } from 'react'

const users = [
  {
    id: crypto.randomUUID(),
    name: 'David Garcia',
    username: 'dagamdev',
    avatar:
      'https://cdn.discordapp.com/avatars/717420870267830382/1806c954b62e7e03e83aacddb4e250f0.webp?size=60'
  },
  {
    id: crypto.randomUUID(),
    username: 'passkey_3'
  },
  {
    id: crypto.randomUUID(),
    name: 'Qutool bot',
    username: 'qtl',
    avatar:
      'https://cdn.discordapp.com/avatars/935707268090056734/d1cf86141f8e36e274b445375c7f0e82.webp?size=60'
  },
  {
    id: crypto.randomUUID(),
    name: 'User name',
    username: 'username'
  },
  {
    id: crypto.randomUUID(),
    username: 'passkey_3'
  },
  {
    id: crypto.randomUUID(),
    name: 'Qutool bot',
    username: 'qtl',
    avatar:
      'https://cdn.discordapp.com/avatars/935707268090056734/d1cf86141f8e36e274b445375c7f0e82.webp?size=60'
  },
  {
    id: crypto.randomUUID(),
    name: 'User Name',
    username: 'username'
  },
  {
    id: crypto.randomUUID(),
    username: 'passkey_3'
  },
  {
    id: crypto.randomUUID(),
    name: 'Qutool bot',
    username: 'qtl',
    avatar:
      'https://cdn.discordapp.com/avatars/935707268090056734/d1cf86141f8e36e274b445375c7f0e82.webp?size=60'
  },
  {
    id: crypto.randomUUID(),
    name: 'User Name',
    username: 'username'
  },
  {
    id: crypto.randomUUID(),
    username: 'passkey_3'
  },
  {
    id: crypto.randomUUID(),
    name: 'Qutool bot',
    username: 'qtl',
    avatar:
      'https://cdn.discordapp.com/avatars/935707268090056734/d1cf86141f8e36e274b445375c7f0e82.webp?size=60'
  },
  {
    id: crypto.randomUUID(),
    name: 'User Name',
    username: 'username'
  },
  {
    id: crypto.randomUUID(),
    username: 'passkey_3'
  },
  {
    id: crypto.randomUUID(),
    name: 'Qutool bot',
    username: 'qtl',
    avatar:
      'https://cdn.discordapp.com/avatars/935707268090056734/d1cf86141f8e36e274b445375c7f0e82.webp?size=60'
  },
  {
    id: crypto.randomUUID(),
    name: 'User Name',
    username: 'username'
  },
  {
    id: crypto.randomUUID(),
    username: 'passkey_3'
  },
  {
    id: crypto.randomUUID(),
    name: 'Qutool bot',
    username: 'qtl',
    avatar:
      'https://cdn.discordapp.com/avatars/935707268090056734/d1cf86141f8e36e274b445375c7f0e82.webp?size=60'
  },
  {
    id: crypto.randomUUID(),
    name: 'User Name',
    username: 'username'
  }
]

export default function SearchBarr({ movile }: { movile?: boolean }) {
  const [openSuggestions, setOpenSuggestions] = useState(false)
  const dispatch = useAppDispatch()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  const closeSearch = () => {
    dispatch(toggleSearch())
  }

  return (
<<<<<<< HEAD
    <form
      onSubmit={handleSubmit}
      className={
        ' ' +
        (movile
          ? 'max-h-dvh flex flex-col'
          : 'relative h-[42px] hidden md:block')
      }
    >
      <div
        className={
          movile ? 'flex items-center justify-between gap-x-4 px-5 py-4' : ''
        }
      >
        <input
          onFocus={() => setOpenSuggestions(true)}
          onBlur={() => setOpenSuggestions(false)}
          className={
            'bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-[20px] py-2 px-4 outline-none transition-colors focus:border-neutral-400 dark:focus:border-neutral-600 ' +
            (movile ? 'flex-1' : openSuggestions ? 'rounded-b-none' : '')
          }
          type='search'
          placeholder='Buscar'
        />
        {movile && (
          <IconButton onClick={closeSearch}>
            <XIcon />
          </IconButton>
        )}
      </div>
      <ul
        className={
          movile
            ? 'overflow-y-scroll flex-1 max-h-full'
            : 'bg-neutral-200 dark:bg-neutral-800 rounded-b-lg max-h-[360px] overflow-auto ' +
            (openSuggestions
              ? 'border-x border-b border-neutral-300 dark:border-neutral-700'
              : 'h-0')
        }
      >
        {users.map((user) => (
          <Link
            key={user.id}
            href={`/profile/${user.username}`}
            className={
              'flex items-center cursor-pointer transition-colors hover:bg-neutral-300 hover:dark:bg-neutral-700 ' +
              (movile ? 'px-5 py-3 gap-x-2' : 'px-4 py-2 gap-x-1')
            }
          >
            <Avatar
              className={movile ? 'size-12' : 'size-10'}
              {...stringAvatar(user.name ?? user.username)}
              src={user.avatar}
              alt={user.avatar && `${user.username}'s avatar`}
            />
            <p className='flex flex-col'>
              {user.name && <span className='font-semibold'>{user.name}</span>}
              <span
                className={
                  user.name
                    ? (movile ? '' : 'text-sm ') + 'text-neutral-600 dark:text-neutral-400'
                    : 'font-semibold'
                }
              >
                @{user.username}
              </span>
            </p>
          </Link>
        ))}
      </ul>
    </form>
=======
    <input
      className='border bg-neutral-100 dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700 rounded-full py-2 px-4 mb-10 outline-none transition-colors focus:border-black dark:focus:border-white'
      type='search'
      name='search'
      placeholder='Buscar'
      autoComplete='off'
    />
>>>>>>> 6a79f17c5658f9bfa321fa77998b7b46040c6772
  )
}
