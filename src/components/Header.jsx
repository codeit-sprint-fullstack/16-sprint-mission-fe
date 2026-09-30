import { Link, NavLink } from "react-router-dom";
import "./Header.css";
import logo from "../assets/images/logo.png";

function Header() {
  return (
    <header className="site-header">
      <nav>
        <div className="nav-container">
          <div className="nav-left">
            <Link to="/">
              <img src={logo} className="logo" alt="판다마켓 로고" />
            </Link>

            <NavLink
              to="/items"
              end
              className={({ isActive }) =>
                `market-link${isActive ? " is-active" : ""}`
              }
            >
              중고마켓
            </NavLink>
          </div>

          <Link to="/login" className="login-button">
            로그인
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;