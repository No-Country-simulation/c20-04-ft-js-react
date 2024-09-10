import ChatBoxIcon from '@/icons/ChatBox'
import PawIcon from '@/icons/PawIcon'
import { stringAvatar } from '@/utils/avatar'
import { ShareOutlined } from '@mui/icons-material'
import { Avatar, Box, Typography, IconButton, Card } from '@mui/material'
import type { Post } from '@/types'
import { relativeTime } from '@/utils/time'
import { useState } from 'react'
import PawFillIcon from '@/icons/PawFill'

export default function Post({ post }: { post: Post }) {
  const [liked, setLiked] = useState(false)

  const toggleLike = () => {
    setLiked((l) => !l)
  }

  return (
    <Card elevation={0} className='max-w-[450px] space-y-4 w-full px-4 py-4 rounded-lg border transition-colors border-neutral-300 dark:border-neutral-700'>
      <Box className='flex items-center'>
        <Avatar
          {...stringAvatar(post.author.name.toUpperCase())}
          alt={post.author.name.toUpperCase()}
          src={post.author.avatar}
        />
        <Box>
          <Typography>@{post.author.username}</Typography>
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
          className='px-4 sm:px-0'
        >
          {post.content}
        </Typography>

        {post.image && (
          <img
            className='rounded-md overflow-hidden'
            src={post.image}
            alt={`image from post ${post.id}`}
          />
        )}
      </Box>

      <Box className='flex justify-between gap-x-4 items-center md:max-w-lg px-4 sm:px-0'>
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
            {post.likes.toLocaleString()}
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
            {post.comments.toLocaleString()}
          </Typography>
        </Box>
        <IconButton size='small'>
          <ShareOutlined fontSize='small' />
        </IconButton>
      </Box>
    </Card>
  )
}
