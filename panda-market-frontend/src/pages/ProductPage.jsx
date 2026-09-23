import { useState, useEffect } from 'react'
import '../css/reset.css';
import '../css/variables.css';
import '../css/pandaroot.css';
import '../css/productpage.css'
import BestProductCard from '../components/BestProductCard.jsx';
import RegularProductCard from '../components/RegularProductCard.jsx';
import axios from 'axios';
import api from '../api/axiosInstance.js';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import { Navigate, useNavigate } from 'react-router-dom';

function ProductPage() {

    const navigate = useNavigate();
    //한번에 불러오는 데이터 갯수
    const getPageSize = () => {
        if (window.innerWidth <= 767) {
            return 4;
        }

        if (window.innerWidth <= 1023) {
            return 6;
        }

        return 10;
    };
    //각각 베스트 상품, 판매중인 상품
    const [bestList, setBest] = useState([]);
    const [productList, setProductList] = useState([]);
    //파라미터 4개
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(getPageSize());
    const [orderBy, setOrderBy] = useState("recent");
    const [keyword, setKeyword] = useState("");
    //페이지 그룹, 총 상품
    const [pageGroup, setPageGroup] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    //일반 상품 정렬기능 드롭다운 on/off
    const [showOptions, setOptions] = useState(false);

    //기기에 따라 페이지 항목 수 조정

    useEffect(() => {
        const handleResize = () => {
            const newPageSize = getPageSize();

            if (newPageSize !== pageSize) {
                setPageSize(newPageSize);
                setPage(1);
                setPageGroup(0);
            }
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [pageSize]);

    //각각 베스트 상품, 일반 상품용 데이터 로딩하기


    const getBothProductList = async () => {
        try {

            // 인기 상품
            const bestRes = await axios.get(
                'https://one6-sprint-mission-be.onrender.com/api/products',
                {
                    params: {
                        page: 1,
                        pageSize: 4,
                        orderBy: "favorite",
                        keyword: ""
                    }
                }
            );

            // 일반 상품
            const regularRes = await axios.get(
                'https://one6-sprint-mission-be.onrender.com/api/products',
                {
                    params: {
                        page,
                        pageSize,
                        orderBy,
                        keyword
                    }
                }
            );

            setBest(bestRes.data.list);
            setProductList(regularRes.data.list);
            setTotalCount(regularRes.data.totalCount);

        } catch (error) {
            console.log(error);
        }
    };



    useEffect(() => {
        getBothProductList();
    }, [page, pageSize, orderBy, keyword]);


    return (
        <>
            <div>
                <Header />

                <div className="item-page-wrapper">

                    <div className="item-page-center">
                        <div className="item-page-best-section">
                            <div className="item-page-best-header">
                                <p>베스트 상품</p>
                            </div>
                            <div className="item-page-best-list">
                                {bestList
                                    .slice(0, 4)
                                    .map((p) => (
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
                                        <img className="search-icon" src="./asset/ic_search.png" alt="검색" />
                                        <input
                                            className="item-regular-search"
                                            placeholder="검색할 상품을 입력해주세요"
                                            value={keyword}
                                            onChange={(e) => setKeyword(e.target.value)}
                                        />

                                    </div>


                                    <div className="item-regular-upload-button" onClick={() => { navigate('/register') }}>상품 등록하기</div>

                                    <div className="item-regular-sort-selector" onClick={() => setOptions(prev => !prev)}>
                                        <p className="item-regular-sort-tag">{orderBy === "recent" ? `최신순` : `좋아요순`}</p>
                                        <img className="sort-select-icon" src="./asset/Triangle.png" alt="검색" />
                                        {showOptions && (
                                            <div className="item-regular-sort-selector-modal">
                                                <div className='item-regular-sort-option-cell' onClick={() => setOrderBy("recent")}>최신순</div>
                                                <div className='item-regular-sort-option-cell' onClick={() => setOrderBy("favorite")}>좋아요순</div>
                                            </div>
                                        )}

                                    </div>


                                </div>

                            </div>



                            <div className="item-page-regular-list">
                                {productList && productList.map((p) => (
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

                            <div className='item-page-bar'>
                                <button className="page-button"
                                    onClick={() => {
                                        setPage((pageGroup - 1) * 5 + 1);
                                        setPageGroup(pageGroup - 1);
                                    }}
                                    disabled={pageGroup === 0}>
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

                                <button className="page-button"
                                    onClick={() => {
                                        setPage(pageGroup * 5 + 6);
                                        setPageGroup(pageGroup + 1);
                                    }}
                                    disabled={totalCount - page <= 5}>
                                    &gt;
                                </button>
                                {/* 총{totalCount}개 현재 페이지그룹{pageGroup} 현재페이지{page} */}
                            </div>
                        </div>


                    </div>

                </div>



                <Footer />

            </div>


        </>
    );
}

export default ProductPage;