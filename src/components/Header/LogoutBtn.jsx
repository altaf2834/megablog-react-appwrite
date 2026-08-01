
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'

function LogoutBtn() {
    const dispatch=useDispatch()
    const logoutHandler=()=>{
      authService.logOut().then(()=>{
        dispatch(logout())
      })
    }
    
  return (
    <button
      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150"
      style={{color: 'var(--text-secondary)', fontFamily: "'Inter', sans-serif"}}
      onClick={logoutHandler}
      onMouseEnter={e => {
        e.currentTarget.style.backgroundColor = 'rgba(239,68,68,0.12)';
        e.currentTarget.style.color = '#f87171';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.backgroundColor = 'transparent';
        e.currentTarget.style.color = 'var(--text-secondary)';
      }}
      aria-label="Log out"
    >
      <svg className="w-4 h-4" fill="none" viewBox="0 0 20 20" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 10H7m6-4l4 4-4 4M13 3H5a2 2 0 00-2 2v10a2 2 0 002 2h8"/>
      </svg>
      Logout
    </button>
  )
}

export default LogoutBtn