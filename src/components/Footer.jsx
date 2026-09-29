import {Link} from "react-router";
import logo_fb from "../assets/logo_fb.png";
import logo_ig from "../assets/logo_ig.png";
import logo_yt from "../assets/logo_yt.png";
import logo_x from "../assets/logo_x.png";

const Footer = () => {
    return (
        <div className="py-4 text-white bg-gray-900 flex flex-row justify-around h-20">
            <p>©codeit - 2026</p>
            <div>
                <Link to="" className="mx-2">Privacy Policy</Link>
                <Link to="" className="mx-2">FAQ</Link>
            </div>
            <div className="flex flex-row gap-2">
                <Link to="https://www.facebook.com/"><img src={logo_fb} alt="FB logo" className="w-5"/></Link>
                <Link to="https://x.com/"><img src={logo_x} alt="X logo" className="w-5"/></Link>
                <Link to="https://www.youtube.com/"><img src={logo_yt} alt="YT logo" className="w-5"/></Link>
                <Link to="https://www.instagram.com/"><img src={logo_ig} alt="IG logo" className="w-5"/></Link>
            </div>
        </div>
    );
}

export default Footer;