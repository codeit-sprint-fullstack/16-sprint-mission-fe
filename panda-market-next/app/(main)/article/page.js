'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

import BestArticleCard from '@/components/BestArticleCard.jsx';
import RegularArticleCard from '@/components/RegularArticleCard.jsx';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import './articlepage.css';

export default function ArticlePage() {
    // 각각 베스트 게시글, 일반 게시글
    const [bestArticle, setBest] = useState([]);
    const [articleList, setArticleList] = useState([]);

    // 쿼리 파라미터 상태
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [orderBy, setOrderBy] = useState('recent');
    const [keyword, setKeyword] = useState('');

    // 무한 스크롤 및 로딩 상태
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    // 관찰 대상 타겟 ref
    const observerRef = useRef(null);

    // 게시글 정렬 드롭다운 열림/닫힘
    const [showOptions, setOptions] = useState(false);

    // 베스트 게시글 조회
    const getBestArticleList = async () => {
        try {
            const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API || 'https://one6-sprint-mission-be.onrender.com';
            const bestRes = await axios.get(`${apiUrl}/articles`, {
                params: {
                    page: 1,
                    pageSize: 5,
                    orderBy: 'favorite',
                    keyword: '',
                },
            });
            setBest(bestRes.data.list || []);
        } catch (error) {
            console.error('베스트 게시글 조회 오류:', error);
        }
    };

    // 일반 게시글 조회
    const getRegular = useCallback(async (targetPage, isReset = false) => {
        if (isLoading) return;
        setIsLoading(true);

        try {
            const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API || 'https://one6-sprint-mission-be.onrender.com';
            const regularRes = await axios.get(`${apiUrl}/articles`, {
                params: {
                    page: targetPage,
                    pageSize,
                    orderBy,
                    keyword,
                },
            });

            const newList = regularRes.data.list || [];
            const totalCount = regularRes.data.totalCount;

            setArticleList((prev) => (isReset ? newList : [...prev, ...newList]));

            if (
                newList.length < pageSize ||
                (totalCount !== undefined &&
                    (isReset ? newList.length : articleList.length + newList.length) >= totalCount)
            ) {
                setHasMore(false);
            } else {
                setHasMore(true);
            }
        } catch (error) {
            console.error('게시글 조회 오류:', error);
        } finally {
            setIsLoading(false);
        }
    }, [pageSize, orderBy, keyword, isLoading, articleList.length]);

    // 초기 마운트 시 베스트 게시글 불러오기
    useEffect(() => {
        getBestArticleList();
    }, []);

    // 정렬(orderBy)이나 검색어(keyword) 변경 시 1페이지로 리셋 및 재조회
    useEffect(() => {
        setPage(1);
        setHasMore(true);
        getRegular(1, true);
    }, [orderBy, keyword]);

    // page 증가 시 다음 페이지 목록 추가 요청 (2페이지 이상일 때)
    useEffect(() => {
        if (page > 1) {
            getRegular(page, false);
        }
    }, [page]);

    // IntersectionObserver로 하단 도달 감지
    useEffect(() => {
        if (!hasMore || isLoading) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setPage((prevPage) => prevPage + 1);
                }
            },
            { threshold: 0.5 }
        );

        const currentTarget = observerRef.current;
        if (currentTarget) {
            observer.observe(currentTarget);
        }

        return () => {
            if (currentTarget) {
                observer.unobserve(currentTarget);
            }
        };
    }, [hasMore, isLoading]);

    return (
        <div className="article-page-wrapper">
            <div className="article-page-center">
                <div className="article-page-best-section">
                    <div className="article-page-best-header">
                        <p>베스트 게시글</p>
                    </div>
                    <div className="article-page-best-list">
                        {bestArticle.slice(0, 3).map((p) => (
                            <BestArticleCard
                                key={p.id}
                                id={p.id}
                                title={p.title}
                                content={p.content}
                                favoriteCount={p.favoriteCount}
                            />
                        ))}
                    </div>
                </div>

                <div className="article-page-regular-section">
                    <div className="article-page-regular-header">
                        <div className="article-page-header-container">
                            <p>게시글</p>
                            <Link href="/upload" className="article-regular-upload-button">
                                글쓰기
                            </Link>
                        </div>

                        <div className="article-page-header-container">
                            <div className="article-page-input-wrapper">
                                <img className="search-icon" src="/asset/ic_search.png" alt="검색" />
                                <input
                                    className="article-regular-search"
                                    placeholder="검색할 글을 입력해주세요"
                                    value={keyword}
                                    onChange={(e) => setKeyword(e.target.value)}
                                />
                            </div>

                            <div className="article-regular-sort-selector" onClick={() => setOptions((prev) => !prev)}>
                                <p className="article-regular-sort-tag">{orderBy === 'recent' ? '최신순' : '좋아요순'}</p>
                                <img className="sort-select-icon" src="/asset/Triangle.png" alt="정렬" />
                                {showOptions && (
                                    <div className="article-regular-sort-selector-modal">
                                        <div className="article-regular-sort-option-cell" onClick={() => setOrderBy('recent')}>
                                            최신순
                                        </div>
                                        <div className="article-regular-sort-option-cell" onClick={() => setOrderBy('favorite')}>
                                            좋아요순
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="article-page-regular-list">
                            {articleList &&
                                articleList.map((p) => (
                                    <RegularArticleCard
                                        key={p.id}
                                        id={p.id}
                                        title={p.title}
                                        content={p.content}
                                        createdAt={p.createdAt}
                                        favoriteCount={p.favoriteCount}
                                    />
                                ))}
                        </div>

                        
                        <div ref={observerRef} style={{ height: '20px', margin: '16px 0', textAlign: 'center' }}>
                            {isLoading && <p style={{ color: '#888' }}>게시글을 불러오는 중...</p>}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
