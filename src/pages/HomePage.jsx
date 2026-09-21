import ProductCard from '../components/ProductCard.jsx'
import {useEffect, useState} from "react";
import { SlArrowLeft } from "react-icons/sl";


const HomePage = () => {
    let pageSize = 10;
    const [products, setProducts] = useState([]);
    const [productsByFavcount, setProductsByFavcount] = useState([]);
    const [productOrder, setProductOrder] = useState('recent');
    const [pageNumber, setPageNumber] = useState(1);

    useEffect(() => {
        fetch(`https://panda-market-api.vercel.app/products?page=2&orderBy=favorite&pageSize=4`)
            .then(response => response.json())
            .then(data => {setProductsByFavcount(data.list)})
            .catch(error => console.log(error));
    }, []);

    useEffect(() => {
        fetch(`https://panda-market-api.vercel.app/products?page=${pageNumber}&pageSize=${pageSize}&orderBy=${productOrder}`)
            .then(response => response.json())
            .then(data => {setProducts(data.list)})
            .catch(error => console.log(error));
    }, [productOrder, pageNumber]);

    console.log(products);

    return (
        <div className="m-auto w-2/3">
            <div className="my-6">
                <h1 className="my-4">베스트 상품</h1>
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
            <div className="my-6">
                <div className="my-4 flex flex-row justify-between h-8">
                    <h1>판매 중인 상품</h1>
                    <div className="flex text-xs gap-4">
                        <input className="p-2 bg-[#F3F4F6] rounded-lg" type="text" placeholder="검색할 삼품을 입력해주세요"/>
                        <button className="btn-primary text-xs h-8">상품 등록하기</button>
                        <select className="border rounded-lg p-2"
                                value={productOrder}
                                onChange={(e) => setProductOrder(e.target.value)}>
                            <option value="recent">최신순</option>
                            <option value="favorite">좋아요순</option>
                        </select>
                    </div>
                </div>
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
            </div>
            <div className="my-4 flex flex-row gap-2 justify-center">
                <button onClick={() => setPageNumber(pageNumber-1)} disabled={pageNumber === 1} className="border border-gray-200 w-10 aspect-square rounded-4xl">{"<"}</button>
                <button onClick={() => setPageNumber(1)} className={`${pageNumber === 1 ? "bg-brand text-white" : "bg-white text-black"} border border-gray-200 w-10 aspect-square rounded-4xl font-semibold`}>1</button>
                <button onClick={() => setPageNumber(2)} className={`${pageNumber === 2 ? "bg-brand text-white" : "bg-white text-black"} border border-gray-200 w-10 aspect-square rounded-4xl font-semibold`}>2</button>
                <button onClick={() => setPageNumber(3)} className={`${pageNumber === 3 ? "bg-brand text-white" : "bg-white text-black"} border border-gray-200 w-10 aspect-square rounded-4xl font-semibold`}>3</button>
                <button onClick={() => setPageNumber(4)} className={`${pageNumber === 4 ? "bg-brand text-white" : "bg-white text-black"} border border-gray-200 w-10 aspect-square rounded-4xl font-semibold`}>4</button>
                <button onClick={() => setPageNumber(5)} className={`${pageNumber === 5 ? "bg-brand text-white" : "bg-white text-black"} border border-gray-200 w-10 aspect-square rounded-4xl font-semibold`}>5</button>
                <button onClick={() => setPageNumber(pageNumber+1)} disabled={pageNumber === 5} className="border border-gray-200 w-10 aspect-square rounded-4xl">{">"}</button>
            </div>
        </div>
    );
};

export default HomePage;