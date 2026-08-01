import { useEffect, useState } from 'react'
import './App.css'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth'
import {login, logout } from './store/authSlice'
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'

function App() {
  const[loading,setLoading]=useState(true)
  const dispatch=useDispatch()

  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData)=>{
      if(userData){
        dispatch(login({userData}))
      }
      else{
        dispatch(logout())
      }
    }).finally(()=>setLoading(false))
  },[])

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center' style={{backgroundColor: 'var(--bg-base)'}}>
        <div className='flex flex-col items-center gap-4'>
          <div className='spinner'></div>
          <p style={{color: 'var(--text-muted)', fontSize: '0.875rem', fontFamily: "'Inter', sans-serif"}}>
            Loading MegaBlog...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen flex flex-col' style={{backgroundColor: 'var(--bg-base)'}}>
      <Header/>
      <main className='flex-1'>
        <Outlet/>
      </main>
      <Footer/>
    </div>
  )
}
export default App
