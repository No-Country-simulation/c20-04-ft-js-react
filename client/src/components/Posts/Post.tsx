import ChatBoxIcon from '@/icons/ChatBox'
import PawIcon from '@/icons/PawIcon'
import { stringAvatar } from '@/utils/avatar'
import { ShareOutlined, MoreVert } from '@mui/icons-material'
import { Avatar, Box, Typography, IconButton, Card, Menu, MenuItem } from '@mui/material'
import type { Post as PostType } from '@/types'
import { relativeTime } from '@/utils/time'
import { useState, MouseEvent } from 'react'
import PawFillIcon from '@/icons/PawFill'
import Image from 'next/image'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'

export default function Post({ post, onClick, menu, className, selected }: { post: PostType, onClick?: () => void, menu: boolean, className?: string, selected?: boolean }) {
  const [liked, setLiked] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const user = useAppSelector(state => state.userReducer.user)
  const dispatch = useAppDispatch()

  const toggleLike = () => {
    setLiked((l) => !l)
  }

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
    event.stopPropagation()
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleOptionClick = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    handleClose()
  }

  return (
    <Card
      onClick={onClick}
      elevation={0}
      className={`max-w-[450px] space-y-4 w-full p-4 rounded-lg border transition-colors border-neutral-300 dark:border-neutral-700 ${className} ${selected && "border-neutral-500 dark:border-neutral-400"}`}
    >
      <Box className='flex items-center'>
        <Avatar
          {...stringAvatar(post.user.name?.toUpperCase() || post.user.username?.toUpperCase())}
          alt={post.user.username.toUpperCase()}
          src={post.user.avatar}
        />
        <Box>
          <Typography>@{post.user.username}</Typography>
          <Typography
            color='text.secondary'
            className='text-xs'
          >
            {relativeTime(post.createdAt)}
          </Typography>
        </Box>
        {menu && (
          <>
            <IconButton
              size='small'
              onClick={handleClick}
              sx={{ ml: 'auto' }}
            >
              <MoreVert />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              onMouseDown={(e) => e.stopPropagation()}
              onClick={(e) => e.stopPropagation()}
            >
              {user?.id === post.user._id && (
                <>
                  <MenuItem onClick={handleOptionClick}>Editar</MenuItem>
                  <MenuItem onClick={handleOptionClick}>Eliminar</MenuItem>
                </>
              )}
              <MenuItem onClick={handleOptionClick}>Reportar</MenuItem>
            </Menu>
          </>
        )}
      </Box>

      <Box className='space-y-4'>
        <Typography
          color='text.primary'
          sx={{ wordBreak: 'break-word' }}
          className='px-0'
        >
          {post.text}
        </Typography>

        {post.url_img && (
          <Image
            className='rounded-md overflow-hidden'
            width={500}
            height={500}
            src={post.url_img}
            alt={`image from post ${post._id}`}
          />
        )}
      </Box>

      <Box className='flex justify-between gap-x-4 items-center md:max-w-lg px-0'>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            size='small'
            onClick={toggleLike}
          >
            {liked ? (
              <PawFillIcon className='size-6' />
            ) : (
              <PawIcon className='size-6' />
            )}
          </IconButton>
          <Typography
            variant='body2'
            color='text.secondary'
            sx={{ ml: 0.5 }}
          >
            {post.likereport.length.toLocaleString()}
          </Typography>
        </Box>
        <Box
          sx={{ display: 'flex', alignItems: 'center' }}
          className='mr-auto sm:mr-0'
        >
          <IconButton size='small'>
            <ChatBoxIcon className='size-6' />
          </IconButton>
          <Typography
            variant='body2'
            color='text.secondary'
            sx={{ ml: 0.5 }}
          >
            {post.comment.length.toLocaleString()}
          </Typography>
        </Box>
        <IconButton size='small'>
          <ShareOutlined fontSize='small' />
        </IconButton>
      </Box>
    </Card>
  )
}
