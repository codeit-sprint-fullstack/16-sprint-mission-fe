import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import ProductCard from "../components/ProductCard.jsx";
import SortDropdown from "../components/SortDropdown.jsx";
import "../styles/market.css";
import { useEffect, useState } from "react";
import { getProducts } from "../api/products.js";
import usePageSize from "../hooks/usePageSize.js";

function MarketPage() {
    const [bestProducts, setBestProducts] = useState([]);
    const [products, setProducts] = useState([]);
    const [keyword, setKeyword] = useState("");
    const [orderBy, setOrderBy] = useState("recent");
    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const { productPageSize: pageSize, bestPageSize } = usePageSize();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const bestProductData = await getProducts({
                    page: 1,
                    pageSize: bestPageSize,
                    orderBy: "favorite",
                });

                const productData = await getProducts({
                    page,
                    pageSize,
                    orderBy,
                    keyword,
                });

                setBestProducts(bestProductData.list);
                setProducts(productData.list);
                setTotalCount(productData.totalCount);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, [page, keyword, orderBy, pageSize, bestPageSize]);

    useEffect(() => {
        setPage(1);
    }, [keyword, orderBy, pageSize]);

    const totalPages = Math.ceil(totalCount / pageSize);
    const pageGroup = Math.floor((page - 1) / 5);
    const startPage = pageGroup * 5 + 1;
    const endPage = Math.min(startPage + 4, totalPages);

    return (
        <>
            <Header />

            <main className="market-main">
                <section className="market-section">
                    <h2 className="market-section-title">베스트 상품</h2>

                    <div className="best-product-grid">
                        {bestProducts.map((product) => (
                            <ProductCard
                                key={product.id}
                                image={product.images[0]}
                                name={product.name}
                                price={product.price}
                                favoriteCount={product.favoriteCount}
                            />
                        ))}
                    </div>
                </section>

                <section className="market-section">
                    <div className="market-toolbar">
                        <div className="market-toolbar-top">
                            <h2 className="market-section-title">판매 중인 상품</h2>

                            <button className="market-register-button">
                                상품 등록하기
                            </button>
                        </div>

                        <div className="market-toolbar-bottom">
                            <label className="market-search-wrap">
                                <svg aria-hidden="true" viewBox="0 0 24 24">
                                    <path d="m21 21-4.35-4.35m2.35-5.65a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z" />
                                </svg>

                                <input
                                    className="market-search"
                                    type="text"
                                    aria-label="상품 검색"
                                    placeholder="검색할 상품을 입력해주세요"
                                    value={keyword}
                                    onChange={(e) => setKeyword(e.target.value)}
                                />
                            </label>

                            <SortDropdown
                                value={orderBy}
                                onChange={setOrderBy}
                            />
                        </div>
                    </div>

                    <div className="product-grid">
                        {products.map((product) => (
                            <ProductCard
                                key={product.id}
                                image={product.images[0]}
                                name={product.name}
                                price={product.price}
                                favoriteCount={product.favoriteCount}
                            />
                        ))}
                    </div>
                </section>

                <div className="pagination">
                    <button
                        className="pagination-arrow"
                        aria-label="이전 페이지 그룹"
                        onClick={() => setPage(Math.max(1, startPage - 1))}
                        disabled={startPage === 1}
                    >
                        <svg aria-hidden="true" viewBox="0 0 24 24"><path d="m15 18-6-6 6-6" /></svg>
                    </button>

                    {Array.from(
                        { length: endPage - startPage + 1 },
                        (_, index) => {
                            const pageNumber = startPage + index;

                            return (
                                <button
                                    key={pageNumber}
                                    className={page === pageNumber ? "active" : ""}
                                    onClick={() => setPage(pageNumber)}
                                >
                                    {pageNumber}
                                </button>
                            );
                        }
                    )}

                    <button
                        className="pagination-arrow"
                        aria-label="다음 페이지 그룹"
                        onClick={() => setPage(Math.min(totalPages, endPage + 1))}
                        disabled={endPage === totalPages}
                    >
                        <svg aria-hidden="true" viewBox="0 0 24 24"><path d="m9 18 6-6-6-6" /></svg>
                    </button>
                </div>


            </main>

            <Footer />
        </>
    );
}

export default MarketPage;
