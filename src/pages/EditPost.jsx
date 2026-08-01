import { useEffect,useState } from "react"
import { Container, PostForm} from "../components"
import AppwriteService from "../appwrite/config"
import { useNavigate, useParams } from "react-router-dom"

function EditPost() {
    const [post,setPost]=useState(null)
    const {slug}=useParams()
    const navigate=useNavigate()
    useEffect(()=>{
        if(slug){
            AppwriteService.getPost(slug).then((post)=>{
                if(post){
                    setPost(post)
                }
            })
        } else{
            navigate('/')
        }
    },[slug,navigate])

    return post?(
        <div className="py-10" style={{minHeight: 'calc(100vh - 4rem)'}}>
            <Container>
                {/* Page Header */}
                <div className="mb-8 pb-6 border-b" style={{borderColor: 'var(--border)'}}>
                    <div className="flex items-center gap-3 mb-2">
                        <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                            style={{backgroundColor: 'rgba(34,197,94,0.12)'}}
                            aria-hidden="true"
                        >
                            <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth="2.2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11 3l2 2-7 7H4v-2l7-7z"/>
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold" style={{color: 'var(--text-primary)', fontFamily: "'Inter', sans-serif"}}>
                            Edit Post
                        </h1>
                    </div>
                    <p className="text-sm ml-11 truncate max-w-xl" style={{color: 'var(--text-muted)', fontFamily: "'Inter', sans-serif"}}>
                        Editing: <span style={{color: 'var(--text-secondary)'}}>{post.title}</span>
                    </p>
                </div>

                <PostForm post={post}/>
            </Container>
        </div>
    ):null
}

export default EditPost