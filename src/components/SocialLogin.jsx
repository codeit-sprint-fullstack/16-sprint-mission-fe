import googleIcon from '../assets/logo/google_icon.png'
import kakaoIcon from '../assets/logo/kakao_icon.png'

function SocialLogin() {
  return (
    <div className="social-login">
      <span>간편 로그인하기</span>
      <div>
        <a href="https://www.google.com/" aria-label="구글로 로그인">
          <img src={googleIcon} alt="" />
        </a>
        <a href="https://www.kakaocorp.com/page/" aria-label="카카오로 로그인">
          <img src={kakaoIcon} alt="" />
        </a>
      </div>
    </div>
  )
}

export default SocialLogin
