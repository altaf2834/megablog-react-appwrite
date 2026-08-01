import { useState } from 'react'
import {Container, Logo, LogoutBtn} from '../index'
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ]

  const activeItems = navItems.filter(item => item.active)

  const handleNav = (slug) => {
    navigate(slug)
    setMobileOpen(false)
  }

  return (
    <header className="glass sticky top-0 z-50" role="banner">
      <Container>
        <nav className="flex items-center justify-between h-16" aria-label="Main navigation">

          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to='/' aria-label="MegaBlog home">
              <Logo width='160px' />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-1" role="list">
            {activeItems.map((item) => (
              <li key={item.name}>
                <button
                  onClick={() => navigate(item.slug)}
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 hover:text-white"
                  style={{
                    color: 'var(--text-secondary)',
                    fontFamily: "'Inter', sans-serif",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.backgroundColor = 'var(--bg-surface-2)';
                    e.currentTarget.style.color = 'var(--text-primary)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = 'var(--text-secondary)';
                  }}
                >
                  {item.name}
                </button>
              </li>
            ))}

            {/* Write / Add Post highlighted CTA */}
            {authStatus && (
              <li className="ml-2">
                <button
                  onClick={() => navigate('/add-post')}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 transition-all duration-150 shadow-lg shadow-indigo-500/20"
                  aria-label="Write a new post"
                  style={{fontFamily: "'Inter', sans-serif"}}
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 3v10M3 8h10"/>
                  </svg>
                  Write
                </button>
              </li>
            )}

            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>

          {/* Mobile: Hamburger */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-lg transition-colors duration-150"
            style={{color: 'var(--text-secondary)'}}
            onClick={() => setMobileOpen(prev => !prev)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
          >
            <span
              className={`block w-5 h-0.5 rounded-full transition-all duration-200 ${mobileOpen ? 'rotate-45 translate-y-1.5' : ''}`}
              style={{backgroundColor: 'var(--text-primary)'}}
            />
            <span
              className={`block w-5 h-0.5 rounded-full transition-all duration-200 mt-1 ${mobileOpen ? 'opacity-0' : ''}`}
              style={{backgroundColor: 'var(--text-primary)'}}
            />
            <span
              className={`block w-5 h-0.5 rounded-full transition-all duration-200 mt-1 ${mobileOpen ? '-rotate-45 -translate-y-2.5' : ''}`}
              style={{backgroundColor: 'var(--text-primary)'}}
            />
          </button>
        </nav>

        {/* Mobile Navigation Dropdown */}
        <div
          id="mobile-nav"
          className={`nav-mobile md:hidden ${mobileOpen ? 'open' : ''}`}
          aria-hidden={!mobileOpen}
        >
          <div className="pt-2 pb-4 space-y-1 border-t" style={{borderColor: 'var(--border)'}}>
            {activeItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNav(item.slug)}
                className="w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-150"
                style={{color: 'var(--text-secondary)', fontFamily: "'Inter', sans-serif"}}
                onMouseEnter={e => {
                  e.currentTarget.style.backgroundColor = 'var(--bg-surface-2)';
                  e.currentTarget.style.color = 'var(--text-primary)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'var(--text-secondary)';
                }}
              >
                {item.name}
              </button>
            ))}
            {authStatus && (
              <div className="px-2 pt-2">
                <LogoutBtn />
              </div>
            )}
          </div>
        </div>
      </Container>
    </header>
  )
}

export default Header