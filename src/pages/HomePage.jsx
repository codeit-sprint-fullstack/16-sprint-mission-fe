import ProductCard from '../components/ProductCard.jsx'
import {useEffect, useRef, useState} from "react";

const HomePage = () => {
    let pageSize = 10;
    const [products, setProducts] = useState([]);
    const [productsByFavcount, setProductsByFavcount] = useState([]);
    const [productOrder, setProductOrder] = useState('recent');
    const [pageNumber, setPageNumber] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const [keyword, setKeyword] = useState("");
    const timerRef = useRef(null);

    useEffect(() => {
        fetch(`https://panda-market-api.vercel.app/products?page=1&orderBy=favorite&pageSize=4`)
            .then(response => response.json())
            .then(data => {setProductsByFavcount(data.list)})
            .catch(error => console.log(error));
    }, []);

    useEffect(() => {
        fetch(`https://panda-market-api.vercel.app/products?page=${pageNumber}&pageSize=${pageSize}&orderBy=${productOrder}&keyword=${keyword}`)
            .then(response => response.json())
            .then(data => {
                setProducts(data.list);
                setPageCount(Math.ceil(data.totalCount / pageSize));
            })
            .catch(error => console.log(error));
    }, [productOrder, pageNumber, keyword]);

    // Pagination login
    const maxVisiblePages = 5;

    // 1. Determine group (0 for 1-5, 1 for 6-10, etc.)
        const currentGroup = Math.floor((pageNumber - 1) / maxVisiblePages);

    // 2. Determine start page (1, 6, 11, 16...)
        const startPage = currentGroup * maxVisiblePages + 1;

    // 3. Determine end page (cap at pageCount)
        const endPage = Math.min(startPage + maxVisiblePages - 1, pageCount);

    // 4. Determine how many buttons to render right now
    const visiblePageCount = Math.max(0, endPage - startPage + 1);

    return (
        <div className="m-auto w-2/3">
            <div className="my-10">
                <h1 className="my-4 font-bold">베스트 상품</h1>
                <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
                    {productsByFavcount.slice(0, 4).map((item, index) => {
                        // index 0: Always visible (1 item for mobile)
                        // index 1: Visible from md upwards (2 items total for tablet)
                        // index 2 & 3: Visible only on lg upwards (4 items total for desktop)
                        const visibilityClass =
                            index === 0 ? "block" :
                                index === 1 ? "hidden md:block" :
                                    "hidden lg:block";
                        return (
                            <div key={item.id} className={visibilityClass}>
                                <ProductCard
                                    img={item.images[0]}
                                    name={item.name}
                                    price={item.price}
                                    favCount={item.favoriteCount}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="my-10">
                <div className="my-4 flex flex-row justify-between h-8">
                    <h1 className="font-bold" >판매 중인 상품</h1>
                    <div className="flex text-xs gap-4">
                        {/* Product search */}
                        <input
                            className="p-2 bg-[#F3F4F6] rounded-lg"
                            type="text"
                            placeholder="검색할 상품을 입력해주세요"
                            onChange={(e) => {
                                const value = e.target.value;

                                if (timerRef.current) clearTimeout(timerRef.current);
                                timerRef.current = setTimeout(() => {
                                    setPageNumber(1);
                                    setKeyword(value);
                                }, 300)
                            }}
                        />
                        <button className="btn-primary text-xs h-8">상품 등록하기</button>
                        <select className="border rounded-lg p-2"
                                value={productOrder}
                                onChange={(e) => setProductOrder(e.target.value)}>
                            <option value="recent">최신순</option>
                            <option value="favorite">좋아요순</option>
                        </select>
                    </div>
                </div>
                {
                    products.length === 0 ? <p>검색 결과 없습니다...</p> :
                        <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 grid-rows-2 gap-4">
                            {
                                products.map((item) => {
                                    return <ProductCard
                                        key={item.id}
                                        img={item.images[0]}
                                        name={item.name}
                                        price={item.price}
                                        favCount={item.favoriteCount}
                                    />
                                })
                            }
                        </div>
                }
            </div>
            <div className="my-4 flex flex-row gap-2 justify-center">
                {/* Previous Page Button */}
                <button
                    onClick={() => setPageNumber(pageNumber - 1)}
                    disabled={pageNumber === 1}
                    className="border border-gray-200 w-10 aspect-square rounded-4xl disabled:bg-gray-200 hover:cursor-pointer"
                >
                    {"<"}
                </button>
                {Array.from({ length: visiblePageCount }).map((_, index) => {
                    const actualPageNum = startPage + index;
                    return (
                        <button
                            key={actualPageNum}
                            onClick={() => setPageNumber(actualPageNum)}
                            className={`${
                                pageNumber === actualPageNum ? "bg-brand text-white" : "bg-white text-black"
                            } border border-gray-200 w-10 aspect-square rounded-4xl font-semibold hover:cursor-pointer`}
                        >
                            {actualPageNum}
                        </button>
                    );
                })}
                {/* Next Page Button */}
                <button
                    onClick={() => setPageNumber(pageNumber + 1)}
                    disabled={pageNumber === pageCount || pageCount === 0}
                    className="border border-gray-200 w-10 aspect-square rounded-4xl disabled:bg-gray-200 hover:cursor-pointer"
                >
                    {">"}
                </button>
            </div>
        </div>
    );
};

export default HomePage;