import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import './header.css'


function Header() {


    return (
        <header>
          <div class="logo">
            <a href="./index.html">
              <img src="./asset/Group 19.png" alt="판다마켓로고" />
            </a>
          </div>
          <a href="./html/login.html">
            <button class="login-button">
              로그인
            </button>
          </a>
        </header>
    )

}
export default Header