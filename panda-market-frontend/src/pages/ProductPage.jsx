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

function ProductPage() {

    //각각 베스트 상품, 판매중인 상품
    const [bestList, setBest] = useState([]);
    const [productList, setProductList] = useState([]);
    //파라미터 4개
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [orderBy, setOrderBy] = useState("recent");
    const [keyword, setKeyword] = useState("");
    //일반 상품 정렬기능 드롭다운 on/off
    const [showOptions, setOptions] = useState(false);
    //각각 베스트 상품, 일반 상품용
    const getBestProductList = async (page, pageSize, orderBy, keyword) => {

        try {
            const res = await axios.get(
                `https://panda-market-api.vercel.app/products`, {
                params: {
                    page: page,
                    pageSize: pageSize,
                    orderBy: orderBy,
                    keyword: keyword
                }
            }
            );
            setBest(res.data.list);
            // console.log("항목", res.data.list);


        } catch (error) {
            console.log(error);
        }
    }

    const getRegularProductList = async (page, pageSize, orderBy, keyword) => {

        try {
            const res = await axios.get(
                `https://panda-market-api.vercel.app/products`, {
                params: {
                    page: page,
                    pageSize: pageSize,
                    orderBy: orderBy,
                    keyword: keyword
                }
            }
            );
            setProductList(res.data.list);

            // console.log("항목", res.data.list);

        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        getBestProductList(1, 4, "favorite", "");
        getRegularProductList(page, pageSize, orderBy, keyword);
    }, [page, pageSize, orderBy, keyword]);

    return (
        <>
            <div>
                <Header/>

                <div class="item-page-wrapper">

                    <div class="item-page-center">
                        <div class="item-page-best-section">
                            <div class="item-page-best-header">
                                <p>베스트 상품</p>
                            </div>
                            <div class="item-page-best-list">
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

                        <div class="item-page-regular-section">
                            <div class="item-page-regular-header">
                                <p>판매 중인 상품</p>
                                <div class="item-page-regular-right">
                                    <div class="item-page-input-wrapper">
                                        <img className="search-icon" src="./asset/ic_search.png" alt="검색" />
                                        <input
                                            className="item-regular-search"
                                            placeholder="검색할 상품을 입력해주세요"
                                            value={keyword}
                                            onChange={(e) => setKeyword(e.target.value)}
                                        />

                                    </div>


                                    <div className="item-regular-upload-button">상품 등록하기</div>

                                    <div className="item-regular-sort-selector" onClick={() => setOptions(prev => !prev)}>
                                        <p className = "item-regular-sort-tag">{orderBy === "recent"? `최신순`:`좋아요순`}</p>
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



                            <div class="item-page-regular-list">
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
                            <div className='item-page-bar'></div>
                        </div>


                    </div>

                </div>



                <Footer/>

            </div>


        </>
    );
}

export default ProductPage;