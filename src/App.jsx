import { useState } from 'react'
import { Route,Routes } from 'react-router-dom'
import SignUp from './pages/SignUp.jsx'
import LoginPage from './pages/LoginPage.jsx'
import Navbar from './components/Navbar.jsx'

const App = ()  =>{
  return (
    <div className='min-h-screen bg-gray-50'>
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path = '/' element = {<SignUp />} />
          <Route path = '/login' element = {<LoginPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
