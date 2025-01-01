import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter as Router } from 'react-router-dom'
import UserContext from './context/UserContext'
import CaptainContext from './context/CaptainContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <UserContext>
        <CaptainContext>
          <App />
        </CaptainContext>
      </UserContext>
    </Router>
  </StrictMode>,
)
