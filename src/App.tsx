import { useEffect, useState } from 'react'
import { Link, Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import './styles/portfolio.css'
import { SiteFooter } from './components/SiteFooter.tsx'
import { ThemeToggle } from './components/ThemeToggle.tsx'
import { profile } from './data/profile.ts'
import { AboutMePage } from './pages/AboutMePage.tsx'
import { HomePage } from './pages/HomePage.tsx'

type ThemeMode = 'light' | 'dark'

const THEME_STORAGE_KEY = 'fc-theme'

function App() {
  const location = useLocation()

  const [theme, setTheme] = useState<ThemeMode>(() => {
    try {
      const savedTheme = localStorage.getItem(THEME_STORAGE_KEY)
      if (savedTheme === 'dark' || savedTheme === 'light') return savedTheme
    } catch {
      /* storage indisponível */
    }
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  const [hasScrolled, setHasScrolled] = useState(false)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme)
    } catch {
      /* storage indisponível */
    }
  }, [theme])

  useEffect(() => {
    if (location.hash) {
      document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView()
    } else {
      window.scrollTo({ top: 0 })
    }
  }, [location.pathname, location.hash])

  useEffect(() => {
    const updateScrollState = () => {
      setHasScrolled(window.scrollY > 8)
    }

    updateScrollState()
    window.addEventListener('scroll', updateScrollState, { passive: true })

    return () => {
      window.removeEventListener('scroll', updateScrollState)
    }
  }, [])

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === 'light' ? 'dark' : 'light'))
  }

  return (
    <>
      <header
        className={`site-header ${hasScrolled ? 'is-scrolled' : ''}`}
        aria-label="Navegação principal"
      >
        <div className="site-header-inner">
          <Link to="/" className="brand" aria-label={`${profile.shortName}, página inicial`}>
            <span className="brand-mark" aria-hidden="true">fc</span>
            <span className="brand-text">
              <strong>{profile.shortName}</strong>
              <small>{profile.role}</small>
            </span>
          </Link>

          <nav className="site-nav" aria-label="Seções">
            <Link
              to="/"
              className={`site-nav-link ${location.pathname === '/' ? 'is-active' : ''}`}
              aria-current={location.pathname === '/' ? 'page' : undefined}
            >
              Projetos
            </Link>
            <Link
              to="/sobre-mim"
              className={`site-nav-link ${location.pathname === '/sobre-mim' ? 'is-active' : ''}`}
              aria-current={location.pathname === '/sobre-mim' ? 'page' : undefined}
            >
              Sobre
            </Link>
          </nav>

          <div className="site-header-actions">
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
            <a className="btn btn-primary btn-sm site-header-cta" href={`mailto:${profile.email}`}>
              Contato
            </a>
          </div>
        </div>
      </header>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sobre-mim" element={<AboutMePage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
      <SiteFooter />
    </>
  )
}

export default App
