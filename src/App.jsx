import { useState } from 'react'
import { Route,Routes } from 'react-router-dom'
import SignUp from './pages/SignUp.jsx'

const App = ()  =>{
  return (
    <div data-theme = 'coffee'>
      <Routes>
        <Route path = '/' element = {<SignUp />} />
      </Routes>
    </div>
  )
}

export default App
