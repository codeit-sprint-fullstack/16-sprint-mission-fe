import React from "react";
import { Link, NavLink } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/">
          판다마켓
        </Link>

        <nav>
          <NavLink
            to="/items"
            style={({ isActive }) => ({
              color: isActive ? "#3692FF" : "#4B5563",
            })}
          >
            중고마켓
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;