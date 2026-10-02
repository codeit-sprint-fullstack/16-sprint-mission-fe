import {useState} from "react";

const ProductCreatePage = () => {

    const [tagList, setTagList] = useState([]);

    return (
        <div>
            <form method="post" className="flex flex-col gap-4 p-4 max-w-200 w-3/4 mx-auto">
                <div className="flex flex-row justify-between">
                    <h1 className="font-bold text-lg">상품 등록하기</h1>
                    <button type="submit" className="btn-primary">등록</button>
                </div>
                <label htmlFor="product-name" className="font-bold">상품명</label>
                <input type="text" id="product-name" className="input-primary" placeholder="상품명을 입력해주세요" />
                <label htmlFor="product-description" className="font-bold">상품 소개</label>
                <textarea id="product-description" className="input-primary h-50" placeholder="상품 소개를 입력해주세요" />
                <label htmlFor="product-price" className="font-bold">판매가격</label>
                <input type="number" id="product-price" className="input-primary" placeholder="판매 가격을 입력해주세요" />
                <label htmlFor="product-tag" className="font-bold">태그</label>
                <input type="text" id="product-tag" className="input-primary" placeholder="태그를 입력해주세요" />
                <div>
                    {tagList.map((tag, index) => (
                        <span key={index}>{tag}</span>
                    ))}
                </div>
            </form>
        </div>
    );
};

export default ProductCreatePage;