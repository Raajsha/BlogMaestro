import { Route,Routes } from 'react-router-dom'
import SignUp from './pages/SignUp.jsx'
import LoginPage from './pages/LoginPage.jsx'
import Navbar from './components/Navbar.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import HomePage from './pages/HomePage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import PostDetailsPage from './pages/PostDetailsPage.jsx'
import CreatePost from './pages/CreatePost.jsx'
import EditPost from './pages/EditPost.jsx'

const App = ()  =>{
  return (
    <div className='min-h-screen bg-gradient-to-b from-[#e0e7ff] via-[#a5b4fc] to-[#312e81] '>
      <Navbar />
      <main className="container mx-auto">
        <Routes>
          <Route path = '/' element = {<SignUp />} />
          <Route path = '/login' element = {<LoginPage />} />
          <Route 
            path = '/homepage'
            element = {
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path = '/profile/:id'
            element = {
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute> 
            } 
          />
          <Route 
            path = '/posts/:id' 
            element = {
              <ProtectedRoute>
                <PostDetailsPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path = '/create'
            element = {
              <ProtectedRoute>
                <CreatePost />
              </ProtectedRoute>
            }
          />
          <Route 
            path = '/edit/:id'
            element = {
              <ProtectedRoute>
                <EditPost />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </main>
    </div>
  )
}

export default App
