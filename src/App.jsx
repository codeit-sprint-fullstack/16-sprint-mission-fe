import Layout from './component/Layout.jsx'
import {BrowserRouter, Route, Routes} from "react-router";

function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/"></Route>
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}

export default App
