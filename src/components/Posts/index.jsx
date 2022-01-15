import './style.css'

import { PostCard } from '../PostCard'

export const Posts = ({ posts }) => {
  return (
    <div className='posts'>
      {posts.map(post => (
        <PostCard
          id={post.id}
          title={post.title}
          cover={post.cover}
          body={post.body}
        />
      ))}
    </div>
  )
}