import { useEffect} from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

export default function Protected({
    children,authentication=true
}) {

  const navigate=useNavigate()
  
  const { status, loading } = useSelector((state) => state.auth);

  useEffect(()=>{
    if(authentication && status!==authentication){
      navigate("/login")
    }else if(!authentication && status!==authentication){
      navigate("/")
    }
    
  },[loading,status,authentication,navigate])

  return<>{children}</>
}

