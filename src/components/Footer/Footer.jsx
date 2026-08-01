import { Link } from 'react-router-dom'
import Logo from '../Logo'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer
      role="contentinfo"
      style={{
        backgroundColor: 'var(--bg-surface)',
        borderTop: '1px solid var(--border)',
      }}
    >
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-4">
              <Logo width="160px" />
            </div>
            <p className="text-sm leading-relaxed max-w-xs" style={{color: 'var(--text-muted)'}}>
              A modern platform for writers, thinkers, and storytellers. Share your ideas with the world.
            </p>
            <p className="mt-6 text-xs" style={{color: 'var(--text-muted)'}}>
              &copy; {currentYear} MegaBlog. All rights reserved.
            </p>
          </div>

          {/* Company links */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest" style={{color: 'var(--text-muted)'}}>
              Company
            </h3>
            <ul className="space-y-3" role="list">
              {['Features', 'Pricing', 'Affiliate Program', 'Press Kit'].map((item) => (
                <li key={item}>
                  <Link
                    className="text-sm transition-colors duration-150 hover:text-indigo-400"
                    style={{color: 'var(--text-secondary)'}}
                    to="/"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support links */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest" style={{color: 'var(--text-muted)'}}>
              Support
            </h3>
            <ul className="space-y-3" role="list">
              {['Account', 'Help', 'Contact Us', 'Customer Support'].map((item) => (
                <li key={item}>
                  <Link
                    className="text-sm transition-colors duration-150 hover:text-indigo-400"
                    style={{color: 'var(--text-secondary)'}}
                    to="/"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal links */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest" style={{color: 'var(--text-muted)'}}>
              Legals
            </h3>
            <ul className="space-y-3" role="list">
              {['Terms & Conditions', 'Privacy Policy', 'Licensing'].map((item) => (
                <li key={item}>
                  <Link
                    className="text-sm transition-colors duration-150 hover:text-indigo-400"
                    style={{color: 'var(--text-secondary)'}}
                    to="/"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </footer>
  )
}

export default Footer