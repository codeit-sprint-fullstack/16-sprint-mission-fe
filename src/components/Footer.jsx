import facebookIcon from '../assets/social/facebook-logo.svg'
import instagramIcon from '../assets/social/instagram-logo.svg'
import twitterIcon from '../assets/social/twitter-logo.svg'
import youtubeIcon from '../assets/social/youtube-logo.svg'

const socialLinks = [
  { name: 'Facebook', icon: facebookIcon, href: 'https://www.facebook.com/' },
  { name: 'Twitter', icon: twitterIcon, href: 'https://x.com/' },
  { name: 'YouTube', icon: youtubeIcon, href: 'https://www.youtube.com/' },
  { name: 'Instagram', icon: instagramIcon, href: 'https://www.instagram.com/' },
]

function Footer() {
  return (
    <footer className="site-footer">
      <p>@codeit - 2024</p>
      <nav aria-label="푸터 링크">
        <a href="https://example.com/privacy_policy">Privacy Policy</a>
        <a href="https://example.com/faq">FAQ</a>
      </nav>
      <ul className="social-links" aria-label="소셜 링크">
        {socialLinks.map((link) => (
          <li key={link.name}>
            <a href={link.href} aria-label={link.name}>
              <img src={link.icon} alt="" />
            </a>
          </li>
        ))}
      </ul>
    </footer>
  )
}

export default Footer
