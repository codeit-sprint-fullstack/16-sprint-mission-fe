import {Link} from "react-router";

const Footer = () => {
    return (
        <div className="text-white bg-gray-900 flex flex-row justify-around h-20">
            <p>©codeit - 2024</p>
            <div>
                <Link to="" className="mx-2">Privacy Policy</Link>
                <Link to="" className="mx-2">FAQ</Link>
            </div>
            <div>
                <img src="" alt=""/>
                <img src="" alt=""/>
                <img src="" alt=""/>
                <img src="" alt=""/>
            </div>
        </div>
    );
}

export default Footer;