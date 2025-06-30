import { useState } from "react"
import { Link,useNavigate } from "react-router"
import  { useAuth } from '../context/AuthContext.jsx'
import { User,Mail,Lock,Eye,EyeOff } from 'lucide-react'

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const {register} = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name] : e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if(formData.password !== formData.confirmPassword){
      alert('Passwords do not match')
      return
    }

    setLoading(true)

    const result = await register(formData.username,formData.email,formData.password)

    if(result.success) {
      navigate('/login')
    }

    setLoading(false)
  }
  return (
    <div className="max-w-md mx-auto mt-4">
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
          <p className="text-gray-600 mt-2">Join our community today</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 " size = {20} />
              <input 
                type="text"
                id = 'username'
                name = 'username'
                value = {formData.username}
                onChange = {handleChange}
                required
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-transparent"
                placeholder="Enter your username" 
              />
        
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 " size = {20}/>
              <input 
                type ="email"
                id = "email"
                name = "email"
                value = {formData.email}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size ={20} />
              <input
                type = {showPassword ? 'text' : 'password'}
                id = "password"
                name = "password"
                value = {formData.password}
                onChange = {handleChange}
                required
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder = "Enter a password"
              />
              <button 
                type = "button" 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 tranform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPassword ? <EyeOff size = {20} /> : <Eye size = {20} />}
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
              Confirm your password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size ={20} />
              <input
                type = {showConfirmPassword ? 'text' : 'password'}
                id = "confirmPassword"
                name = "confirmPassword"
                value = {formData.confirmPassword}
                onChange = {handleChange}
                required
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder = "Enter a password"
              />
              <button 
                type = "button" 
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 tranform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showConfirmPassword ? <EyeOff size = {20} /> : <Eye size = {20} />}
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            disabled = {loading}
            className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{''}
            <Link to='/login' className = 'text-primary-600 hover:text-primary-700 font-medium'>
              Sign in 
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignUp
