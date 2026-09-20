import { useEffect } from 'react'

import './App.css'

import AuthPage from './pages/AuthPage'
import LandingPage from './pages/LandingPage'
import { trackPageView } from './analytics'

function App() {
  const path = window.location.pathname

  useEffect(() => {
    trackPageView(path)
  }, [path])

  if (path === '/login') {
    return <AuthPage mode="login" />
  }

  if (path === '/signup') {
    return <AuthPage mode="signup" />
  }

  return <LandingPage />
}

export default App
