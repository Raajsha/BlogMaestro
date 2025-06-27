//Shows the recent posts
import { useState, useEffect } from "react";
import { postsAPI } from "../services/api.js";
import PostCard from '../components/PostCard.jsx';
import {Search, Filter} from 'lucide-react'

const HomePage = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredPosts, setFilteredPosts] = useState([])

  useEffect(() => {
    fetchPosts()
  },[])

  useEffect(() => {
    if(searchTerm) {
      const filtered = posts.filter( post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (post.tags&& post.tags.toLowerCase().includes(searchTerm.toLowerCase()))
      )
      setFilteredPosts(filtered)
    } else {
      setFilteredPosts(posts)
    } 
  },[searchTerm,posts])

  const fetchPosts = async () => {
    try {
      const response = await postsAPI.getAll()
      setPosts(response.data)
    } catch (error) {
     console.error('Error fetching posts:',error) 
    } finally {
      setLoading(false)
    }
  }

  if(loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mt-6 text-gray-900 mb-4">
          Welcome To BlogApp
        </h1>
        <p className="text-xl text-gray-600">
          Discover amazing stories and write some of your own too
        </p>
      </div>

      <div className="mb-8">
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size = {20} />
          <input
            type="text"
            placeholder="Search Posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent" />
        </div>
      </div>

      {filteredPosts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            {searchTerm ? 'No posts found matching your search' : 'No posts available yet'}
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
          {filteredPosts.map((post) => (
            <PostCard key= {post.id} post = {post} />
          ))}
        </div>
      )}
    </div>
  )
}

export default HomePage
