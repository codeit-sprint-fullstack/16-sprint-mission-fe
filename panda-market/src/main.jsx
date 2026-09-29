import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.scss'
import App from './App.jsx'

// React 앱을 root 요소에 렌더링하는 시작 파일
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
