'use client'

import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import SearchBarr from "./SearchBarr"
import { Paper } from "@mui/material"

export default function MovileSearch() {
  const openSearch = useAppSelector(state => state.search)
  const dispatch = useAppDispatch()

  console.log('open search: ', openSearch)

  return openSearch ? (
    <Paper className='fixed z-50 top-0 left-0 w-dvw h-dvh'>
      <SearchBarr movile />
    </Paper>
  ) : null
}
