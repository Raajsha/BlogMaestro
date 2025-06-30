import {Link} from 'react-router-dom'
import { Calendar, User, Tag } from 'lucide-react'

const PostCard = ({post}) => {
    const formatDate = (datestring) => {
        return new Date(datestring).toLocaleDateString('en-US',{
            year: 'numeric',
            month : 'long',
            day: 'numeric'
        })
    }

  return (
    <div className='bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden animate-fade-in'>
      <div className="p-6">
        <Link to = {`/posts/${post._id}`}>
          <h2 className='text-x1 font-semibold text-gray-900 mb-3 hover:text-primary-600 transition-colors line-slamp-2'>
            {post.title}
          </h2>
        </Link>

        <p className='text-gray-600 mb-4 line-clamp-3'>
            {post.content.substring(0,150)}...
        </p>

        <div className='flex items-center justify-between text-sm text-gray-500'>
            <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                    <User size = {14} />
                    <span>{post.author.username}</span>
                </div>
                <div className="flex items-center space-x-1">
                    <Calendar size = {14} />
                    <span>{formatDate(post.createdAt)}</span>
                </div>
            </div>

            {post.tags && (
                <div className="flex items-center space-x-1">
                    <Tag size = {14} />
                    <span className='bg-primary-100 text-primary-800 px-2 py-1 rounded-full text-xs'>
                        {post.tags}
                    </span>
                </div>
            )}
        </div>
      </div>
    </div>
  )
}

export default PostCard
