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
  _id: string
  text: string
  likereport: []
  comment: Comment[]
  url_img?: string
  user: {
    name: string
    username: string
    avatar?: string
  }
  createdAt: string
}

export interface Comment {
  text: string
  user: {
    name: string
    username: string
    profile_photo?: string
  }
}