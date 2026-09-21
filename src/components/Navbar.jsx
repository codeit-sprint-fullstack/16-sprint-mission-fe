import logo from '../assets/logo_panda.png'

const Navbar = () => {
    return (
        <nav
            className="flex flex-row justify-around border-b border-gray-200"
        >
            <div className="flex flex-row gap-4">
                <img src={logo} alt="Panda Logo" className="w-40"/>
                <button>자유게시판</button>
                <button>중고마켓</button>
            </div>
            <button className="btn-primary self-center">로그인</button>
        </nav>
    );
};

export default Navbar;