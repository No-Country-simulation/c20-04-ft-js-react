'use client'

import XIcon from '@/icons/X'
import CircularProgress from '@mui/material/CircularProgress';
import { useAppDispatch } from '@/redux/hooks'
import { toggleSearch } from '@/redux/slices/searchSlice'
import { stringAvatar } from '@/utils/avatar'
import { Avatar, IconButton } from '@mui/material'
import Link from 'next/link'
import { FormEvent, useEffect, useState } from 'react'
import { useGetUserByUsernameMutation } from '@/redux/apiSlices/userQueryApi'

export default function SearchBarr({ movile }: { movile?: boolean }) {
  const [openSuggestions, setOpenSuggestions] = useState(false)
  const [searchUser, setSearchUser] = useState<string>('')

  const [errorSearch, setErrorSearch] = useState<string>('')

  const dispatch = useAppDispatch()

  const [getUserByUsername, { isLoading, error, data }] = useGetUserByUsernameMutation()
  console.log(data)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(searchUser !== ""){
      if (searchUser.trim()) {
        // Trigger the mutation to search for the user
        getUserByUsername(searchUser.toLocaleLowerCase())
        setOpenSuggestions(true)
      }
    } else {
      window.alert("please write a username")
    }
  }

  const closeSearch = () => {
    dispatch(toggleSearch())
  }

  useEffect(()=> {
    if(data?.errors){
      setErrorSearch('user could not be found')

    setTimeout(()=> {
      setErrorSearch('')
    },3000)
    }
  },[data?.errors])

  return (
    <form
      onSubmit={handleSubmit}
      className={movile ? 'max-h-dvh flex flex-col' : 'relative h-[42px] hidden md:block'}
    >
      <div className={movile ? 'flex items-center justify-between gap-x-4 px-5 py-4' : 'flex'}>
        <input
          onBlur={() => setOpenSuggestions(false)}
          onFocus={() => setOpenSuggestions(true)}
          className={
            'bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-[20px] py-2 px-4 outline-none transition-colors focus:border-neutral-400 dark:focus:border-neutral-600 flex-1 ' +
            (movile ? '' : openSuggestions ? 'rounded-b-none' : '')
          }
          type='search'
          placeholder='Search by username'
          value={searchUser}
          onChange={(e) => setSearchUser(e.target.value)}
        />

        {/* Search Button */}
        {!movile && (
          <button
            type="submit"
            className="ml-2 bg-[#8C52FF] text-white px-4 py-2 rounded-full hover:bg-blue-600"
          >
            Search
          </button>
        )}

        {movile && (
          <IconButton onClick={closeSearch}>
            <XIcon />
          </IconButton>
        )}
      </div>

      {openSuggestions && (
        <ul
          className={
            movile
              ? 'overflow-y-scroll flex-1 max-h-full'
              : 'bg-neutral-200 dark:bg-neutral-800 rounded-b-lg max-h-[360px] overflow-auto ' +
                'border-x border-b border-neutral-300 dark:border-neutral-700 max-w-[249px]'
          }
        >
          {/* Loading State */}
          {isLoading 
          && <div className='flex justify-center m-[.6rem]'>
            <CircularProgress size={40} style={{ color: '#8C52FF',  }} />
          </div> 
          }

          {/* Error State */}
          {errorSearch && <li className="px-4 py-2 text-red-500">user could not be found</li>}

          {/* Render user search result only if data exists */}
          {data?.data?.getUserByUsername && (
            <Link
              key={data.data.getUserByUsername._id}
              href={`/profile/${data.data.getUserByUsername.username}`}
              className={
                'flex items-center cursor-pointer transition-colors hover:bg-neutral-300 hover:dark:bg-neutral-700 ' +
                (movile ? 'px-5 py-3 gap-x-2' : 'px-4 py-2 gap-x-1')
              }
            >
              <Avatar
                className={movile ? 'size-12' : 'size-10'}
                {...stringAvatar(
                  data.data.getUserByUsername.name ?? data.data.getUserByUsername.username
                )}
                src={data.data.getUserByUsername.profile_photo}
                alt={data.data.getUserByUsername.profile_photo && `${data.data.getUserByUsername.username}'s avatar`}
              />
              <p className="flex flex-col">
                {data.data.getUserByUsername.name && (
                  <span className="font-semibold">{data.data.getUserByUsername.name}</span>
                )}
                <span
                  className={
                    data.data.getUserByUsername.name
                      ? (movile ? '' : 'text-sm ') + 'text-neutral-600 dark:text-neutral-400'
                      : 'font-semibold'
                  }
                >
                  @{data.data.getUserByUsername.username}
                </span>
              </p>
            </Link>
          )}
        </ul>
      )}
    </form>
  )
}
