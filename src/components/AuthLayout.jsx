import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

export default function Protected({
    children,authentication=true
}) {

  const navigate=useNavigate()
  const [loader,setLoader]=useState(true)
  const authStatus=useSelector(state=>state.auth.status)

  useEffect(()=>{
    if(authentication && authStatus!==authentication){
      navigate("/login")
    }else if(!authentication && authStatus!==authentication){
      navigate("/")
    }
    setLoader(false)
  },[authStatus,navigate,authentication])

  return loader? (
    <div className='min-h-[calc(100vh-4rem)] flex items-center justify-center'>
      <div className='flex flex-col items-center gap-3'>
        <div className='spinner'></div>
        <p style={{color: 'var(--text-muted)', fontSize: '0.8125rem', fontFamily: "'Inter', sans-serif"}}>
          Checking authentication...
        </p>
      </div>
    </div>
  ) : <>{children}</>
}

