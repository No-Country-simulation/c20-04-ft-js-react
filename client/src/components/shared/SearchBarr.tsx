'use client'

import XIcon from '@/icons/X'
import CircularProgress from '@mui/material/CircularProgress';
import { useAppDispatch } from '@/redux/hooks'
import { toggleSearch } from '@/redux/slices/searchSlice'
import { stringAvatar } from '@/utils/avatar'
import { Avatar, IconButton } from '@mui/material'
import Link from 'next/link'
import { FormEvent, useEffect, useRef, useState } from 'react'
import { useGetUserSearchMutation } from '@/redux/apiSlices/userQueryApi'
import SearchIcon from '@mui/icons-material/Search';

export default function SearchBarr({ movile }: { movile?: boolean }) {
  const [openSuggestions, setOpenSuggestions] = useState(false);
  const [searchUser, setSearchUser] = useState<string>('');
  const [errorSearch, setErrorSearch] = useState<string>('');

  const dispatch = useAppDispatch();
  const [getUserSearch, { isLoading, error, data }] = useGetUserSearchMutation();

  const wrapperRef = useRef<HTMLFormElement>(null); 

  const handleClickOutside = (event: MouseEvent) => {

    if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
      setOpenSuggestions(false);
    }
  };

  useEffect(() => {
    if (openSuggestions) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openSuggestions]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchUser !== '') {
      if (searchUser.trim()) {
        getUserSearch(searchUser.toLocaleLowerCase());
        setOpenSuggestions(true);
      }
    } else {
      window.alert("Please write a username");
    }
  };

  const closeSearch = () => {
    dispatch(toggleSearch());
  };

  useEffect(() => {
    if (data?.errors) {
      setErrorSearch('User could not be found');
      setTimeout(() => {
        setErrorSearch('');
      }, 3000);
    }
  }, [data?.errors]);

  return (
    <form
      onSubmit={handleSubmit}
      ref={wrapperRef} 
      className={movile ? 'max-h-dvh flex flex-col' : 'relative h-[42px] hidden md:block'}
    >
      <div className={movile ? 'flex items-center justify-between gap-x-4 px-5 py-4' : 'flex relative'}>
        <input
          onFocus={() => setOpenSuggestions(true)}
          className={
            'bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-[20px] py-2 px-4 outline-none transition-colors focus:border-neutral-400 dark:focus:border-neutral-600 flex-1 ' +
            (movile ? '' : openSuggestions ? 'rounded-b-none' : '')
          }
          type='search'
          placeholder='Search by username'
          value={searchUser}
          onChange={(e) => setSearchUser(e.target.value)}
          style={{ paddingRight: '40px' }}
        />

        {!movile && (
          <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
          >
            {isLoading ? (
              <CircularProgress size={20} style={{ color: '#8C52FF' }} />
            ) : (
              <SearchIcon style={{ color: '#8C52FF' }} />
            )}
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
              'border-x border-b border-neutral-300 dark:border-neutral-700 w-full absolute z-10'
          }
        >
          {isLoading && (
            <div className='flex justify-center m-[.6rem]'>
              <CircularProgress size={40} style={{ color: '#8C52FF' }} />
            </div>
          )}

          {errorSearch && <li className="px-4 py-2 text-red-500">User could not be found</li>}

          {data?.data?.getUserSearch?.length > 0 ? (
            data.data.getUserSearch.map((user: any) => (
              <Link
                key={user._id}
                href={`/profile/${user.username}`}
                className={
                  'flex items-center cursor-pointer transition-colors hover:bg-neutral-300 hover:dark:bg-neutral-700 ' +
                  (movile ? 'px-5 py-3 gap-x-2' : 'px-4 py-2 gap-x-1')
                }
              >
                <Avatar
                  className={movile ? 'size-12' : 'size-10'}
                  {...stringAvatar(user.name ?? user.username)}
                  src={user.profile_photo}
                  alt={user.profile_photo && `${user.username}'s avatar`}
                />
                <p className="flex flex-col">
                  {user.name && (
                    <span className="font-semibold">{user.name}</span>
                  )}
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
            ))
          ) : (
            <li className="px-4 py-2 text-neutral-600">No users found</li>
          )}
        </ul>
      )}
    </form>
  );
}