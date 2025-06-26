import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import {Toaster} from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
        <Toaster
         position = 'top-right'
         toastOptions = {{
          duration : 4000,
          style: {
            background: '#363636',
            color: '#fff'
          }
         }}
        />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
)
