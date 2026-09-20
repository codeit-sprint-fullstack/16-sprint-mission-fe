import AuthForm from '../components/AuthForm'
import SocialLogin from '../components/SocialLogin'
import logoImage from '../assets/logo/panda-market-logo.png'

const authFields = {
  login: [
    { label: '이메일', type: 'email', placeholder: '이메일을 입력해주세요' },
    { label: '비밀번호', type: 'password', placeholder: '비밀번호를 입력해주세요' },
  ],
  signup: [
    { label: '이메일', type: 'email', placeholder: '이메일을 입력해주세요' },
    { label: '닉네임', type: 'text', placeholder: '닉네임을 입력해주세요' },
    { label: '비밀번호', type: 'password', placeholder: '비밀번호를 입력해주세요' },
    { label: '비밀번호 확인', type: 'password', placeholder: '비밀번호를 다시 한 번 입력해주세요' },
  ],
}

const authPageContent = {
  login: {
    title: '로그인',
    submitText: '로그인',
    helperText: '판다마켓이 처음이신가요?',
    helperLink: 'signup',
    helperLinkText: '회원가입',
  },
  signup: {
    title: '회원가입',
    submitText: '회원가입',
    helperText: '이미 회원이신가요?',
    helperLink: 'login',
    helperLinkText: '로그인',
  },
}

function AuthPage({ mode }) {
  const content = authPageContent[mode]

  return (
    <main className="auth-page">
      <section className="auth-panel" aria-labelledby="auth-title">
        <a className="auth-logo" href="/" aria-label="판다마켓 홈">
          <img src={logoImage} alt="판다마켓" />
        </a>
        <h1 id="auth-title" className="sr-only">
          {content.title}
        </h1>
        <AuthForm fields={authFields[mode]} submitText={content.submitText} />
        <SocialLogin />
        <p className="auth-helper">
          {content.helperText} <a href={content.helperLink}>{content.helperLinkText}</a>
        </p>
      </section>
    </main>
  )
}

export default AuthPage
