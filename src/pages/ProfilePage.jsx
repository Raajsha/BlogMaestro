import {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import PostCard from '../components/PostCard.jsx'
import { usersAPI } from '../services/api.js'
import {User, Calendar, FileText} from 'lucide-react'

const ProfilePage = () => {
  const [loading, setLoading] = useState(true)
  const {id} = useParams()
  const [profile, setProfile] = useState(null)
  const [posts, setPosts] = useState([])
  const {user: currentUser} = useAuth()

  useEffect(() => {
    fetchProfile()
    fetchUserPosts()
  },[id])

  const fetchProfile = async () => {
    try {
      const response = await usersAPI.getProfile(id)
      setProfile(response.data)
    } catch (error) {
      console.error('Error fetching user details: ',error)
    }
  }

  const fetchUserPosts = async () => {
    try {
      const response = await usersAPI.getUserPosts(id)
      setPosts(response.data)
    } catch (error) {
      console.error('Error fetching posts: ',error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US',{
      year: 'numeric',
      month: 'long',
      day : 'numeric'
    })
  }

  if(loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if(!profile) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">Profile not found</p>
      </div>
    )
  }

  const isOwnProfile = currentUser && currentUser.user === id
  return (
    <div className='max-w-4xl mx-auto'>
      <div className="bg-white rounded-2xl shadow-mg mt-2 p-8 mb-8 animate-fade-in">
        <div className="flex items-center space-x-6">
          <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center">
            <User className='text-primary-600' size = {32} />
          </div>

          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {profile.username}
              {isOwnProfile && <span className='text-sm text-gray-500 ml-2'>(You)</span>}
            </h1>

            <div className="flex items-center space-x-6 text-gray-600">
              <div className="flex items-center space-x-1">
                <Calendar size = {16} />
                <span>Joined {formatDate(profile.createdAt)}</span>
              </div>
              <div className="flex items-center space-x-1">
              <FileText size = {16} />
              <span>{posts.length} posts</span>  
              </div>  
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {isOwnProfile ? 'Your posts' : `Posts by ${profile.username}`}
        </h2>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            {isOwnProfile ? `You don't have any posts yet` : 'This user has yet to open up'}
          </p>
        </div>
      ): (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
          {posts.map((post) => {
            <PostCard key = {post._id} post= {post} /> 
          })}
        </div>
      )}
    </div>
  )
}

export default ProfilePage
 