import Banner from '../components/Banner.jsx'
import panda_img1 from "../assets/panda_img1.png"
import panda_img2 from "../assets/panda_img2.png"

const LandingPage = () => {
    return (
        <div className="flex flex-col max-h-screen">
            <Banner imgSrc={panda_img1} text="일상의 모든 물건을 거래해 보세요" buttonText="구경하러 가기"/>
            <Banner imgSrc={panda_img2} text="믿을 수 있는 판다마켓 중고 거래"/>
        </div>
    );
};

export default LandingPage;