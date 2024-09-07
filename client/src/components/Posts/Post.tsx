import ChatBoxIcon from '@/icons/ChatBox'
import PawIcon from '@/icons/PawIcon'
import { stringAvatar } from '@/utils/avatar'
import { ShareOutlined } from '@mui/icons-material'
import { Avatar, Box, Typography, IconButton, Card } from '@mui/material'
import type { Post } from '@/types'

export default function Post({ post }: { post: Post }) {

  return (
    <Card elevation={0} className='max-w-[450px] space-y-4 w-full px-4 py-4 rounded-lg border transition-colors border-neutral-300 dark:border-neutral-700'>
      <Box className='flex items-center'>
        <Avatar
          {...stringAvatar(post.author.name.toUpperCase())}
          alt={post.author.name.toUpperCase()}
          src={post.author.avatar}
        />
        <Box>
          <Typography>
            @{post.author.username}
          </Typography>
          <Typography color='text.secondary' className='text-xs'>
            Hace 3 hora(s)
          </Typography>
        </Box>
      </Box>
      {post.image && <img src={post.image} alt={`image from post ${post.id}`} />}
      <Typography
        variant='body1'
        color='text.primary'
        sx={{ mb: 2, wordBreak: 'break-word' }}
      >
        {post.content}
      </Typography>

      <Box
        className='flex justify-between items-center max-w-sm'
      >
        <Box className='flex justify-between gap-x-4'>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton size='small'>
              <PawIcon className='size-6' />
            </IconButton>
            <Typography
              variant='body2'
              color='text.secondary'
              sx={{ ml: 0.5 }}
            >
              {post.likes.toLocaleString()}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
        </Box>

        <IconButton size='small'>
          <ShareOutlined fontSize='small' />
        </IconButton>
      </Box>
    </Card>
  )
}
