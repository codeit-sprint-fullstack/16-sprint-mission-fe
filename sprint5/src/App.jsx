import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MarketPage from './pages/MarketPage/MarketPage'
import MainPage from './pages/MainPage/MainPage'
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import ProductDetailPage from "./pages/ProductDetailPage/ProductDetailPage";


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<MainPage />}
          />

          <Route
            path="/items"
            element={<MarketPage />}
          />

          <Route
            path="/registration"
            element={<RegistrationPage />}
          />

          <Route
            path="/items/:id"
            element={<ProductDetailPage />}
          />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
