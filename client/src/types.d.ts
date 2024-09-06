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