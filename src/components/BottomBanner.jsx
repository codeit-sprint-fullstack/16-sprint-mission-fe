import bottomBannerImage from '../assets/home/bottom-banner-image.png'

function BottomBanner() {
  return (
    <section className="bottom-banner">
      <div className="bottom-banner-content">
        <h2>믿을 수 있는<br></br>판다마켓 중고 거래</h2>
        <img src={bottomBannerImage} alt="판다 캐릭터들이 후기를 주고받는 모습" />
      </div>
    </section>
  )
}

export default BottomBanner
