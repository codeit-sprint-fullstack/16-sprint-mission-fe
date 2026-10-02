import logo from '../assets/logo_panda.png'
import {Link} from "react-router";

const Navbar = () => {
    return (
        <nav
            className="flex flex-row w-4/5 max-w-300 mx-auto h-15 justify-between border-b border-gray-200 text-xs lg:text-lg md:text-xl"
        >
            <div className="flex flex-row gap-4 items-center">
                <Link to="/"><img src={logo} alt="Panda Logo" className="w-20 lg:w-40"/></Link>
                <Link to="" className="text-sm">자유게시판</Link>
                <Link to="/items" className="text-sm">중고마켓</Link>
            </div>
            <button className="btn-primary h-3/4 self-center">로그인</button>
        </nav>
    );
};

export default Navbar;