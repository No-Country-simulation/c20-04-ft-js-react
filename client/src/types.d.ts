export interface User {
  id: string
  name?: string
  username: string
  avatar?: string
  email: string
  profile_photo: string
  role: 'user' | 'admin' | 'shelter' | 'sponsor'
}

export interface Post {
  id: string
  content: string
  likes: number
  comments: number
  image?: string
  author: {
    name: string
    username: string
    avatar?: string
  }
  createdAt: string
}
