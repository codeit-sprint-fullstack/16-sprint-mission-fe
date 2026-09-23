import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import './header.css'


function Header() {

const navigate = useNavigate()

  return (
    <header>
      <div class="header-menu-wrapper">
        <div class="header-logo" onClick={() =>{navigate('/')}}>
          <div href="./index.html">
            <img className = "logo-pc" src="./asset/Group 19.png" alt="판다마켓로고" />
            <img className = "logo-mobile" src="./asset/logomobile.png" alt="판다마켓로고" />
          </div>
        </div>

        <p class="header-menu-slot">자유게시판</p>
        <p class="header-menu-slot">중고마켓</p>
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