import { JSX } from 'react'

interface User {
  username: string
  token: string
  role: 'USER' | 'ADMIN'
}

interface HomePageProps {
  user: User | null
  theme: 'default' | 'golden' | 'rainbow'
  setTheme: (theme: 'default' | 'golden' | 'rainbow') => void
}

const HomePage = ({ user, theme, setTheme }: HomePageProps): JSX.Element => {
  return (
    <div className="content-window showcase-container">
      <h1 className="showcase-header">Welcome to My CV!</h1>
      <div className="info-box" style={{paddingBottom: 20}}>
        <p>Here you will find dedicated showcases of my projects and technical skills.</p>
        <p>Feel free to explore the site and check out the guestbook.</p>
        <p>You can sign up to unlock extra layout features, or choose to post comments freely as a guest.</p>
        <strong>By signing up, you can try out the custom "Golden" and "Rainbow" themes on this site below!</strong>
      </div>
      {user && (
        <div className="theme-selector-group">
          <button
            className={`button ${theme === 'default' ? 'active-theme-btn' : ''}`}
            onClick={() => setTheme('default')}
          >
            Default
          </button>
          <button
            className={`button ${theme === 'golden' ? 'active-theme-btn' : ''}`}
            onClick={() => setTheme('golden')}
          >
            Golden
          </button>
          <button
            className={`button ${theme === 'rainbow' ? 'active-theme-btn' : ''}`}
            onClick={() => setTheme('rainbow')}
          >
            Rainbow
          </button>
        </div>
      )}
    </div>
  )
}

export default HomePage