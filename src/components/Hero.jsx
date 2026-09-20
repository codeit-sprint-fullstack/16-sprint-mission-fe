import heroImage from '../assets/home/hero-image.png'

function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <div className="hero-copy">
          <h1>
            일상의 모든 물건을
            <br className="mobile-only-break" /> 거래해 보세요
          </h1>
          <a className="primary-button" href="/item">
            구경하러 가기
          </a>
        </div>
        <img src={heroImage} alt="판다 캐릭터와 상자가 있는 판다마켓 히어로 이미지" />
      </div>
    </section>
  )
}

export default Hero
