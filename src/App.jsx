import { useState } from 'react'
import { Route,Routes } from 'react-router-dom'
import SignUp from './pages/SignUp.jsx'
import LoginPage from './pages/LoginPage.jsx'
import Navbar from './components/Navbar.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import HomePage from './pages/HomePage.jsx'

const App = ()  =>{
  return (
    <div className='min-h-screen bg-gray-50 overflow-visible'>
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
            </ProtectedRoute>} />
        </Routes>
      </main>
    </div>
  )
}

export default App
