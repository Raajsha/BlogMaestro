import {useState,useEffect} from 'react'
import {useParams, useNavigate, Link} from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { postsAPI } from '../services/api.js'
import CommentSection from '../components/CommentSection.jsx'
import {Calendar, Tag, User, Edit2, Trash2, ArrowLeft} from 'lucide-react'
import toast from 'react-hot-toast'

const PostDetailsPage = () => {
    const {id} = useParams()
    const {user} = useAuth()
    const navigate = useNavigate()
    const [post,setPost] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchPost()
    },[id])

    const fetchPost = async () => {
        try {
            const response = await postsAPI.getById(id)
            setPost(response.data)
            console.log(response.data)
        } catch (error) {
            console.error('Error fetching post: ',error)
            toast.error('Post not found')
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async () => {
        if(!window.confirm('Are you sure you want to delete this post?')) return
        try {
            const response = await postsAPI.delete(id)
            toast.success('Post deleted successfully')
            navigate('/homepage')
        } catch (error) {
            toast.error('Failed to delete post')
        }
    }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US',{
            year : 'numeric',
            month : 'long',
            day : 'numeric',
            hour: '2-digit',
            minute : '2-digit'
        })
    }
    
    if(loading) {
        return (
            <div className="flex items-center justify-center min-h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
        )
    }
    
    if(!post) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500 text-lg">Post not found</p>
                <Link to ='/homepage' className='text-primary-600 hover:text-primary-700 mt-4 inline-block '>
                    Go back to Home
                </Link>
            </div>
        )
    }

    const isAuthor = user && user.user === post.author._id
  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={() => navigate('/homepage')}
        className="flex items-center space-x-2 text-black opacity-65 hover:text-primary-600  mt-3 mb-3 transition-colors"
      >
        <ArrowLeft size={20} />
        <span>Back to posts</span>
      </button>

      <article className="bg-white rounded-lg shadow-md overflow-hidden animate-fade-in">
        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {post.title}
              </h1>
              
              <div className="flex items-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <User size={16} />
                  <span>{post.author.username}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar size={16} />
                  <span>{formatDate(post.createdAt)}</span>
                </div>
                {post.tags && (
                  <div className="flex items-center space-x-1">
                    <Tag size={16} />
                    <span className="bg-primary-100 text-primary-800 px-2 py-1 rounded-full">
                      {post.tags}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {isAuthor && (
              <div className="flex space-x-2 ml-4">
                <Link
                  to={`/edit/${post._id}`}
                  className="flex items-center space-x-1 bg-primary-600 text-white px-3 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  <Edit2 size={16} />
                  <span>Edit</span>
                </Link>
                <button
                  onClick={handleDelete}
                  className="flex items-center space-x-1 bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                  <Trash2 size={16} />
                  <span>Delete</span>
                </button>
              </div>
            )}
          </div>

          <div className="prose max-w-none">
            <div className="text-gray-800 leading-relaxed whitespace-pre-wrap">
              {post.content}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 p-8">
            <CommentSection postId = {post._id} />
        </div>
      </article>
    </div>
  )
}

export default PostDetailsPage
