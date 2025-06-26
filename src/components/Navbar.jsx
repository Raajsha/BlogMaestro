import {Link,useNavigate} from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import {PenTool,User,LogOut,Home} from 'lucide-react'

const Navbar = () => {
    const {user, logout, isAutheticated} = useAuth();
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/')
    }
  return (
    <nav className='bg-white shadow-lg border-b border-gray-200'>
        <div className="container mx-auto px-4">
            <div className="flex justify-between items-center h-16">
                <Link to ="/"
                className='flex items-center space-x-2 text-x1 font-bold text-primary-600 hover:text-primary-700 transition-colors'>
                    <Home size={24} />
                    <span>BlogMaestro</span>
                </Link>

                <div className="flex items-center space-x-4">
                    {isAutheticated ? (
                        <>
                            <Link 
                            to ="/create"
                            className='flex items-center space-x-1 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors'
                            >
                                <PenTool size = {16} />
                                <span>Write a new blog</span>
                            </Link>

                            <Link 
                            to ={`profile/${user.user}`}
                            className='flex items-center space-x-1 text-gray-700 hover:text-primary-600 transition-colors'>
                                <User size = {16}/>
                                <span>{user.name}</span>
                            </Link>

                            <button
                            onClick  = {handleLogout}
                            className='flex items-center space-x-1 text-gray-700 hover:text-red-600 transition-colors'>
                                <LogOut size = {16} />
                                <span>Logout</span>
                            </button>
                        </>
                    ): (
                        <>
                            <Link
                            to = '/login'
                            className='tex-gray-700 hover:text-primary-600 transition-colors'>
                                Login
                            </Link>

                            <Link
                            to = '/register'
                            className='bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors'>
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    </nav>
  )
}

export default Navbar
