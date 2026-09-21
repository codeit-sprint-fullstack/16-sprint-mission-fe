import ProductCard from '../components/ProductCard.jsx'
import {useEffect, useState} from "react";

const HomePage = () => {
    let orderMethod = 'favorite';
    let pageNumber = 30;
    let pageSize = 10;
    const [products, setProducts] = useState([]);
    const [productsByFavcount, setProductsByFavcount] = useState([]);

    useEffect(() => {
        fetch(`https://panda-market-api.vercel.app/products?page=3&orderBy=${orderMethod}&pageSize=4`)
            .then(response => response.json())
            .then(data => {setProductsByFavcount(data.list)})
            .catch(error => console.log(error));

        fetch(`https://panda-market-api.vercel.app/products?page=${pageNumber}&pageSize=${pageSize}`)
            .then(response => response.json())
            .then(data => {setProducts(data.list)})
            .catch(error => console.log(error));
    }, []);

    console.log(products);

    return (
        <div className="m-auto w-2/3">
            <div className="my-6">
                <h1 className="my-4">베스트 상품</h1>
                <div className="grid grid-cols-4 grid-rows-1 gap-4">
                    {
                        productsByFavcount.map((item) => {
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
            <div className="my-6">
                <div className="my-4 flex flex-row justify-between h-8">
                    <h1>판매 중인 상품</h1>
                    <div className="flex text-xs gap-4">
                        <input className="p-2 bg-[#F3F4F6] rounded-lg" type="text" placeholder="검색할 삼품을 입력해주세요"/>
                        <button className="btn-primary text-xs h-8">상품 등록하기</button>
                        <select className="border rounded-lg p-2" name="" id="">
                            <option value="최신순">최신순</option>
                            <option value="좋아요순">좋아요순</option>
                        </select>
                    </div>
                </div>
                <div className="grid grid-cols-5 grid-rows-2 gap-4">
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
        </div>
    );
};

export default HomePage;