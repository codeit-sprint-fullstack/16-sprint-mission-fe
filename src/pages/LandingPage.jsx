import Banner from '../components/Banner.jsx'
import IntroCard from '../components/IntroCard.jsx'
import panda_img1 from "../assets/panda_img1.png"
import panda_img2 from "../assets/panda_img2.png"
import img_landing_1 from "../assets/img_landing_1.png"
import img_landing_2 from "../assets/img_landing_2.png"
import img_landing_3 from "../assets/img_landing_3.png"

const LandingPage = () => {
    return (
        <div className="flex flex-col w-full">
            <Banner imgSrc={panda_img1} title={<>일상의 모든 물건을 <br/> 거래해 보세요</>} buttonText="구경하러 가기"/>
            <div className="px-40 py-20">
                <IntroCard
                    imgSrc={img_landing_1}
                    tag="Hot Item"
                    title={<>인기 상품을 <br/> 확인해 보세요</>}
                    text={<>가장 HOT한 중고거래 물품을 <br/> 판다 마켓에서 확인해 보세요</>}
                />
            </div>
            <div className="px-40 py-20">
                <IntroCard
                    imgSrc={img_landing_2}
                    tag="Search"
                    title={<>구매를 원하는 <br/> 상품을 검색하세요</>}
                    text={<>구매하고 싶은 물품은 검색해서 <br/> 쉽게 찾아보세요</>}
                    reverse={true}
                />
            </div>
            <div className="px-40 py-20">
                <IntroCard
                    imgSrc={img_landing_3}
                    tag="Register"
                    title={<>판매를 원하는 <br/> 상품을 등록하세요</>}
                    text={<>어떤 물건이든 판매하고 싶은 상품을 <br/> 쉽게 등록하세요</>}
                />
            </div>
            <Banner imgSrc={panda_img2} title={<>믿을 수 있는 <br/> 판다마켓 중고 거래</>}/>
        </div>
    );
};

export default LandingPage;