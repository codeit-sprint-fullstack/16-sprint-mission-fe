'use client';

import { useState, useEffect } from 'react';
import './productpage.css';
import BestProductCard from '@/components/BestProductCard.jsx';
import RegularProductCard from '@/components/RegularProductCard.jsx';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ProductPage() {
  const router = useRouter();

  // 한번에 불러오는 데이터 갯수 (SSR 안전 처리)
  const getPageSize = () => {
    if (typeof window === 'undefined') return 10;
    if (window.innerWidth <= 767) {
      return 4;
    }
    if (window.innerWidth <= 1023) {
      return 6;
    }
    return 10;
  };

  // 각각 베스트 상품, 판매중인 상품
  const [bestList, setBest] = useState([]);
  const [productList, setProductList] = useState([]);
  // 파라미터 4개
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [orderBy, setOrderBy] = useState('recent');
  const [keyword, setKeyword] = useState('');
  // 페이지 그룹, 총 상품
  const [pageGroup, setPageGroup] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  // 일반 상품 정렬기능 드롭다운 on/off
  const [showOptions, setOptions] = useState(false);

  // 클라이언트 마운트 시 초기 pageSize 계산 및 리사이즈 이벤트 등록
  useEffect(() => {
    setPageSize(getPageSize());

    const handleResize = () => {
      const newPageSize = getPageSize();
      setPageSize((prevSize) => {
        if (newPageSize !== prevSize) {
          setPage(1);
          setPageGroup(0);
          return newPageSize;
        }
        return prevSize;
      });
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // 베스트 상품 및 일반 상품 데이터 로딩
  const getBothProductList = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API || 'https://one6-sprint-mission-be.onrender.com';

      // 인기 상품
      const bestRes = await axios.get(
        `${apiUrl}/products`,
        {
          params: {
            page: 1,
            pageSize: 4,
            orderBy: 'favorite',
            keyword: '',
          },
        }
      );

      // 일반 상품
      const regularRes = await axios.get(
        `${apiUrl}/products`,
        {
          params: {
            page,
            pageSize,
            orderBy,
            keyword,
          },
        }
      );

      setBest(bestRes.data.list || []);
      setProductList(regularRes.data.list || []);
      setTotalCount(regularRes.data.totalCount || 0);
    } catch (error) {
      console.error('상품 목록 조회 오류:', error);
    }
  };

  useEffect(() => {
    getBothProductList();
  }, [page, pageSize, orderBy, keyword]);

  return (
    <div className="item-page-wrapper">
      <div className="item-page-center">
        <div className="item-page-best-section">
          <div className="item-page-best-header">
            <p>베스트 상품</p>
          </div>
          <div className="item-page-best-list">
            {bestList.slice(0, 4).map((p) => (
              <BestProductCard
                key={p.id}
                id={p.id}
                name={p.name}
                description={p.description}
                price={p.price}
                tags={p.tags}
                favoriteCount={p.favoriteCount}
                images={p.images}
              />
            ))}
          </div>
        </div>

        <div className="item-page-regular-section">
          <div className="item-page-regular-header">
            <p className="item-page-regular-title">판매 중인 상품</p>
            <div className="item-page-regular-right">
              <div className="item-page-input-wrapper">
                <img className="search-icon" src="/asset/ic_search.png" alt="검색" />
                <input
                  className="item-regular-search"
                  placeholder="검색할 상품을 입력해주세요"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
              </div>

              <Link href="/register" className="item-regular-upload-button">
                상품 등록하기
              </Link>

              <div className="item-regular-sort-selector" onClick={() => setOptions((prev) => !prev)}>
                <p className="item-regular-sort-tag">{orderBy === 'recent' ? '최신순' : '좋아요순'}</p>
                <img className="sort-select-icon" src="/asset/Triangle.png" alt="정렬" />
                {showOptions && (
                  <div className="item-regular-sort-selector-modal">
                    <div className="item-regular-sort-option-cell" onClick={() => setOrderBy('recent')}>
                      최신순
                    </div>
                    <div className="item-regular-sort-option-cell" onClick={() => setOrderBy('favorite')}>
                      좋아요순
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="item-page-regular-list">
            {productList &&
              productList.map((p) => (
                <RegularProductCard
                  key={p.id}
                  id={p.id}
                  name={p.name}
                  description={p.description}
                  price={p.price}
                  tags={p.tags}
                  favoriteCount={p.favoriteCount}
                  images={p.images}
                />
              ))}
          </div>

          <div className="item-page-bar">
            <button
              className="page-button"
              onClick={() => {
                setPage((pageGroup - 1) * 5 + 1);
                setPageGroup(pageGroup - 1);
              }}
              disabled={pageGroup === 0}
            >
              &lt;
            </button>

            {[1, 2, 3, 4, 5].map((num) => {
              const pageNumber = pageGroup * 5 + num;
              if (pageNumber > Math.ceil(totalCount / pageSize)) {
                return null;
              }

              return (
                <button
                  key={pageNumber}
                  onClick={() => setPage(pageNumber)}
                  className={`page-button ${page === pageNumber ? 'active-page' : ''}`}
                >
                  {pageNumber}
                </button>
              );
            })}

            <button
              className="page-button"
              onClick={() => {
                setPage(pageGroup * 5 + 6);
                setPageGroup(pageGroup + 1);
              }}
              disabled={totalCount - page <= 5}
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

