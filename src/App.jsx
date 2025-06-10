import { useState } from 'react'
import viteLogo from '/vite.svg'
import { Route,Routes } from 'react-router'
import SignUpPage from './pages/SignUpPage.jsx'

const App = ()  =>{
  return (
    <div className='relative h-full w-full ' data-theme = 'coffee'>
      <Routes>
        <Route path = '/' element = {<SignUpPage />} />
      </Routes>
    </div>
  )
}

export default App
