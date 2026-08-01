import  {useState, useEffect} from 'react'
import { Container, PostCard } from '../components'
import appwriteService from "../appwrite/config";

function AllPosts() {
    const [posts, setPosts] = useState([])
    useEffect(() => {}, [])
    appwriteService.getPosts([]).then((posts) => {
        if (posts) {
            setPosts(posts.documents)
        }
    })

  return (
    <div className='py-12' style={{minHeight: 'calc(100vh - 4rem)'}}>
        <Container>

            {/* Page Header */}
            <div className="mb-10 pb-6 border-b" style={{borderColor: 'var(--border)'}}>
                <h1 className="text-3xl font-bold mb-2" style={{color: 'var(--text-primary)', fontFamily: "'Inter', sans-serif"}}>
                    All Posts
                </h1>
                <p className="text-sm" style={{color: 'var(--text-muted)'}}>
                    {posts.length > 0
                        ? `Browse all ${posts.length} ${posts.length === 1 ? 'article' : 'articles'}`
                        : 'No posts published yet.'
                    }
                </p>
            </div>

            {/* Posts Grid or Empty State */}
            {posts.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 text-center">
                    <div
                        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                        style={{backgroundColor: 'var(--bg-surface-2)'}}
                        aria-hidden="true"
                    >
                        <svg className="w-8 h-8" style={{color: 'var(--text-muted)'}} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l6 6v10a2 2 0 01-2 2z"/>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 4v6h-6"/>
                        </svg>
                    </div>
                    <h2 className="text-lg font-semibold mb-2" style={{color: 'var(--text-primary)'}}>No posts yet</h2>
                    <p className="text-sm max-w-sm" style={{color: 'var(--text-muted)'}}>
                        Be the first to share your story. Click &ldquo;Add Post&rdquo; to publish your first article.
                    </p>
                </div>
            ) : (
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {posts.map((post) => (
                        <div key={post.$id} className="flex">
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            )}

        </Container>
    </div>
  )
}

export default AllPosts