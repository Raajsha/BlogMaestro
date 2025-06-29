import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { postsAPI } from "../services/api.js";
import { PenTool, Tag, FileText, Book } from "lucide-react";
import toast from "react-hot-toast";

const CreatePost = () => {
    const [formData, setFormData] = useState({
        title : '',
        content : '',
        tags : ''
    })
    const [loading, setLoading] = useState(false)
    const {user} = useAuth()
    const navigate = useNavigate()

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
            await postsAPI.create({
                ...formData,
                author: user.user
            })
            toast.success('Thank you for sharing your thoughts')
            navigate('/homepage')
        } catch (error) {
            toast.error('Failed to create blog')
            console.error('Failed to create blog: ',error)
        } finally {
            setLoading(false)
        }
    } 
  return (
    <div className="max-w-2xl mx-auto mt-10">
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="flex items-center space-x-2 mb-8">
            <PenTool className="text-primary-600" size = {24} />
            <h1 className="text-3xl font-bold text-gray-900">Create a new Blog</h1> 
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                    Title
                </label>
                <div className="relative">
                    <FileText className="absolute left-3 top-3 -translate-y-1 text-gray-400" />
                    <input 
                      type = 'text'
                      name = 'title'
                      id = 'title'
                      value = {formData.title}
                      onChange = {handleChange}
                      required
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder = 'Enter the title' 
                    />
                </div>
            </div>

            <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                    Content
                </label>
                <div className="relative">
                    <Book className="absolute left-3 top-3 -translate-y-1 text-gray-400" size = {24} />
                    <input 
                      type = 'text'
                      name = 'content'
                      id = 'content'
                      value = {formData.content}
                      onChange = {handleChange}
                      required
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder = 'Speak your mind' 
                    />
                </div>
            </div>

            <div>
                <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
                    Tags
                </label>
                <div className="relative">
                    <Tag className="absolute left-3 top-3 -translate-y-1 text-gray-400" />
                    <input 
                      type = 'text'
                      name = 'tags'
                      id = 'tags'
                      value = {formData.tags}
                      onChange = {handleChange}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder = 'Tag it(eg. programming, tech etc..)' 
                    />
                </div>
            </div>

            <div className="flex items-center justify-center space-x-4">
                <button 
                  type="submit"
                  disabled = {loading}
                  className="flex bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
                    {loading ? 'Sharing it with everyone' : 'Share it with everyone'}
                </button>
                <button 
                  type = 'button'
                  onClick = {() => navigate('/homepage')}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 hover:text-red-500 transition-colors">
                    Cancel
                  </button>
            </div>
        </form>
      </div>
    </div>
  )
}

export default CreatePost
