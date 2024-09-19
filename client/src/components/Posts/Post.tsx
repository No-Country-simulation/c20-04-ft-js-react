import ChatBoxIcon from '@/icons/ChatBox'
import PawIcon from '@/icons/PawIcon'
import { stringAvatar } from '@/utils/avatar'
import { ShareOutlined } from '@mui/icons-material'
import { Avatar, Box, Typography, IconButton, Card } from '@mui/material'
import type { Post } from '@/types'
import { relativeTime } from '@/utils/time'
import { useState } from 'react'
import PawFillIcon from '@/icons/PawFill'
import Image from 'next/image'

export default function Post({ post, onClick, className, selected }: { post: Post, onClick?: () => void, className?: string, selected?: boolean }) {
  const [liked, setLiked] = useState(false)

  const toggleLike = () => {
    setLiked((l) => !l)
  }

  return (
    <Card onClick={onClick} elevation={0} className={`max-w-[450px] space-y-4 w-full p-4 rounded-lg border transition-colors border-neutral-300 dark:border-neutral-700 ${className} ${selected && "border-neutral-500 dark:border-neutral-400"}`}>
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
