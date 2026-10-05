import Layout from './components/Layout.jsx'
import HomePage from './pages/HomePage.jsx'
import LandingPage from './pages/LandingPage.jsx'
import MarketPage from './pages/MarketPage.jsx'
import ProductCreatePage from './pages/ProductCreatePage.jsx'
import {BrowserRouter, Route, Routes} from "react-router";

function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<LandingPage />}></Route>
                    <Route path="/items" element={<MarketPage />}></Route>
                    <Route path="/registration" element={<ProductCreatePage />}></Route>
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}

export default App
