import { FaRegHeart } from "react-icons/fa";

const ProductCard = ({img, name, price, favCount}) => {

    return (
        <div className="flex flex-col gap-2">
            <img src={img} alt={name} className="w-full h-40 object-cover rounded-lg"/>
            <p className="text-xs">{name}</p>
            <p className="text-sm font-bold">{price.toLocaleString()}원</p>
            <div className="flex flex-row items-center gap-1">
                <FaRegHeart className="h-3"/>
                <p className="text-xs">{favCount}</p>
            </div>
        </div>
    );
};

export default ProductCard;