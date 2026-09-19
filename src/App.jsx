import Layout from './components/Layout.jsx'
import HomePage from './pages/HomePage.jsx'
import {BrowserRouter, Route, Routes} from "react-router";

function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<HomePage />}></Route>
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}

export default App
