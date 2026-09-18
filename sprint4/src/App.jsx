import { useState } from 'react'
import MarketPage from './pages/MarketPage/MarketPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <MarketPage/>
    </>
  )
}

export default App
