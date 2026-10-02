import {useState} from "react";

const ProductCreatePage = () => {

    const [tagList, setTagList] = useState([]);
    const addTag = (tag) => {
        if (tag && !tagList.includes(tag)) {
            setTagList([...tagList, tag]);
        }
    };

    return (
        <div>
            <form method="post" className="flex flex-col gap-4 p-4 max-w-200 w-3/4 mx-auto">
                <div className="flex flex-row justify-between">
                    <h1 className="font-bold text-lg">상품 등록하기</h1>
                    <button type="submit" className="btn-primary hover:cursor-pointer">등록</button>
                </div>
                <label htmlFor="product-name" className="font-bold">상품명</label>
                <input type="text" id="product-name" className="input-primary" placeholder="상품명을 입력해주세요" />
                <label htmlFor="product-description" className="font-bold">상품 소개</label>
                <textarea id="product-description" className="input-primary h-50" placeholder="상품 소개를 입력해주세요" />
                <label htmlFor="product-price" className="font-bold">판매 가격</label>
                <input type="number" id="product-price" className="input-primary" placeholder="판매 가격을 입력해주세요" />
                <label htmlFor="product-tag" className="font-bold">태그</label>
                <input onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        const tag = e.target.value;
                        addTag(tag);
                        e.target.value = '';
                    }
                }} type="text" id="product-tag" className="input-primary" placeholder="태그를 입력해주세요" />
                <div className="flex flex-row gap-2">
                    {tagList.map((tag, index) => (
                        <span key={index} className="flex items-center gap-2 bg-[#F3F4F6] py-1 px-3 rounded-full">
                            #{tag.toLowerCase().replace(/\s+/g, '')}
                            <button
                                type="button"
                                onClick={() => {
                                    setTagList(tagList.filter((_, i) => i !== index))
                                }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="24" viewBox="0 0 22 24" fill="none" className="hover:cursor-pointer">
                                  <circle cx="11" cy="12" r="10" fill="#9CA3AF"/>
                                  <path d="M7.08057 8L15.0806 16" stroke="#F9FAFB" stroke-width="1.8" stroke-linecap="round"/>
                                  <path d="M15 8L7 16" stroke="#F9FAFB" stroke-width="1.8" stroke-linecap="round"/>
                                </svg>
                            </button>
                        </span>
                    ))}
                </div>
            </form>
        </div>
    );
};

export default ProductCreatePage;