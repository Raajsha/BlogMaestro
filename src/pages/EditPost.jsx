import {useState, useEffect} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { postsAPI } from '../services/api.js'
import {Edit2, Tag, FileText, Book} from 'lucide-react'
import toast from 'react-hot-toast'

const EditPost = () => {
    const [loading, setLoading] = useState(false)
    const  {id} = useParams()
    const {user} = useAuth()
    const [formData,setFormData] = useState({
        title: '',
        content: '',
        tags : ''
    })
    const navigate = useNavigate()
    const [initialLoading, setInitialLoading] = useState(true)

    useEffect(() => {
        fetchPost()
    },[id])

    const fetchPost = async () => {
        try {
            const response = await postsAPI.getById(id)
            const post = response.data

            if(post.author._id !== user.user){
                toast.error('You are not authorized to edit this post')
                navigate('/homepage')
                return
            }
            setFormData({
                title: post.title,
                content : post.content,
                tags : post.tags || ''
            })
        } catch (error) {
            toast.error('Post not found')
            navigate('/homepage')
        } finally {
            setInitialLoading(false)
        }
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            await postsAPI.update(id,formData)
            toast.success('Post updated successfully')
            navigate(`/post/${id}`)
        } catch (error) {
            toast.error('Failed to update post')
        } finally {
            setLoading(false)
        }
    }

    if(initialLoading) {
        return (
            <div className="flex items-center justify-center min-h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
        )
    }
  return (
    <div className='max-w-2xl mx-auto mt-10'>
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="flex items-center space-x-2 mb-8">
            <Edit2 className='text-primary-600' size = {24} />
            <h1 className="text-3xl font-bold text-gray-900">Edit Post</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                    Title
                </label>
                <div className="relative">
                    <FileText className="absolute left-3 top-3 text-gray-400" size = {20} />
                    <input 
                      type = 'text'
                      name = 'title'
                      id = 'title'
                      value = {formData.title}
                      onChange = {handleChange}
                      required
                      className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent'
                      placeholder = 'Enter your blog title'
                    />
                </div>
            </div>

            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                    Content
                </label>
                <div className="relative">
                    <Book className="absolute left-3 top-3 text-gray-400" size = {20} />
                    <input 
                      type = 'text'
                      name = 'content'
                      id = 'content'
                      value = {formData.content}
                      onChange = {handleChange}
                      required
                      className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent'
                      placeholder = 'Enter your blog content'
                    />
                </div>
            </div>
            <div>
                <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
                    Title
                </label>
                <div className="relative">
                    <Tag className="absolute left-3 top-3 text-gray-400" size = {20} />
                    <input 
                      type = 'text'
                      name = 'tags'
                      id = 'tags'
                      value = {formData.tags}
                      onChange = {handleChange}
                      required
                      className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent'
                      placeholder = 'Enter your tags'
                    />
                </div>
            </div>

            <div className="flex space-x-4">
                <button 
                  type = 'submit'
                  disabled = {loading}
                  className='flex bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'>
                    {loading ? 'Updating Blog' : 'Update your Blog'}
                </button>
                <button 
                  type = 'button'
                  onClick = {() => navigate(`/post/${id}`)}
                  className='px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 hover:text-red-500 transition-colors'>
                    Cancel
                </button>
            </div>
        </form>
      </div>
    </div>
  )
}

export default EditPost
