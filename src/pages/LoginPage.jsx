//Login page
import { useState } from "react";
import {Link,useNavigate} from 'react-router-dom';
import { useAuth } from "../context/AuthContext.jsx";
import { User,Mail,Lock,Eye,EyeOff } from 'lucide-react';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email : '',
    password : ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading ,setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name] : e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)

    const result = await login(formData.email,formData.password)

    if(result.success) navigate('/homepage')
    setLoading(false)
  }
  return (
    <div className="max-w-md mx-auto mt-8">
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
          <p className="text-gray-600 mt-2">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Adress
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 trxt-gray-400" size = {20} />
              <input 
                type="email" 
                id = "email"
                name = "email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent" 
                placeholder = "Login with your email"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size = {20}/>
              <input 
                type= {showPassword ? 'text' : 'password'} 
                id = "password"
                name = "password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-12 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent" 
                placeholder = "Enter your password"
              />

              <button 
                type="button" 
                onClick = {() => setShowPassword(!showPassword)} 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPassword ? <EyeOff size = {20} /> : <Eye size = {20} />}
              </button>
            </div>
          </div>

          <button 
            type="submit"
            disabled = {loading}
            className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
              {loading ? 'Logging in' : 'Login'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <Link to = '/' className="text-primary-600 hover:text-primary-700 font-medium">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
