import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'

const Layout = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen justify-between">
            <Navbar />
            <main>
                {children}
            </main>
            <Footer />
        </div>
    )
}

export default Layout;