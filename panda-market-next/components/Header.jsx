'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import './header.css';

function Header() {
  const pathname = usePathname();

  // 자유게시판: /article 로 시작하는 경로일 때 활성화
  const isArticleActive = pathname.startsWith('/article') || pathname.startsWith('/upload');

  // 중고마켓: /items 또는 상품 등록(/register) 경로일 때 활성화
  const isItemsActive = pathname.startsWith('/items') || pathname.startsWith('/register');

  return (
    <header>
      <div className="header-menu-wrapper">
        <div className="header-logo">
          <Link href="/">
            <img className="logo-pc" src="/asset/Group 19.png" alt="판다마켓로고" />
            <img className="logo-mobile" src="/asset/logomobile.png" alt="판다마켓로고" />
          </Link>
        </div>

        <Link
          href="/article"
          className={`header-menu-slot ${isArticleActive ? 'active' : ''}`}
        >
          자유게시판
        </Link>
        <Link
          href="/items"
          className={`header-menu-slot ${isItemsActive ? 'active' : ''}`}
        >
          중고마켓
        </Link>
      </div>
      <Link href="/login">
        <button className="login-button">
          로그인
        </button>
      </Link>
    </header>
  );
}

export default Header;
