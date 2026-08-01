import  {useEffect, useState} from 'react'
import appwriteService from "../appwrite/config";
import {Container, PostCard} from '../components'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';

function Home() {
    const [posts, setPosts] = useState([])
    const [loading,setLoading]=useState(true)
    const { status, loading: authLoading } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        }).finally(()=>{
            setLoading(false)
        })
    }, [])
  
    if (loading || authLoading) {
        return (
            <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent"></div>
            </div>
        );
    }
    
    if (posts.length === 0 && !status) {
        return (
            <div className="min-h-[calc(100vh-4rem)] flex flex-col">
                {/* Hero Section */}
                <section className="relative flex flex-col items-center justify-center text-center py-24 px-4 overflow-hidden">
                    {/* Background decorative blobs */}
                    <div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
                        style={{
                            background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)',
                            filter: 'blur(1px)',
                        }}
                        aria-hidden="true"
                    />
                    <div
                        className="absolute top-0 left-0 w-72 h-72 rounded-full pointer-events-none"
                        style={{
                            background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)',
                        }}
                        aria-hidden="true"
                    />

                    <div className="relative z-10 max-w-3xl">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-8 border"
                            style={{
                                backgroundColor: 'var(--accent-light)',
                                borderColor: 'rgba(99,102,241,0.3)',
                                color: '#a5b4fc',
                            }}
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" aria-hidden="true"/>
                            A modern blogging platform
                        </div>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6"
                            style={{color: 'var(--text-primary)', fontFamily: "'Inter', sans-serif"}}
                        >
                            Where great stories{' '}
                            <span className="gradient-text">come to life</span>
                        </h1>

                        <p className="text-base sm:text-lg leading-relaxed mb-10 max-w-xl mx-auto"
                            style={{color: 'var(--text-secondary)'}}
                        >
                            Write, publish and share your ideas with the world. A clean, distraction-free platform built for writers.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link
                                to="/signup"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 transition-all duration-150 shadow-lg shadow-indigo-500/25 w-full sm:w-auto justify-center"
                                style={{fontFamily: "'Inter', sans-serif"}}
                            >
                                Start writing for free
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8h10M9 4l4 4-4 4"/>
                                </svg>
                            </Link>
                            <Link
                                to="/login"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-150 border w-full sm:w-auto justify-center"
                                style={{
                                    color: 'var(--text-secondary)',
                                    borderColor: 'var(--border)',
                                    fontFamily: "'Inter', sans-serif",
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.borderColor = 'var(--border-hover)';
                                    e.currentTarget.style.color = 'var(--text-primary)';
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.borderColor = 'var(--border)';
                                    e.currentTarget.style.color = 'var(--text-secondary)';
                                }}
                            >
                                Sign in to read posts
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Features strip */}
                <section className="py-16 px-4 border-t" style={{borderColor: 'var(--border)'}}>
                    <Container>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center max-w-3xl mx-auto">
                            {[
                                { icon: '✦', label: 'Clean Writing Experience', desc: 'Distraction-free editor built for writers.' },
                                { icon: '◈', label: 'Rich Media Support', desc: 'Embed images, code blocks, and more.' },
                                { icon: '◉', label: 'Instant Publishing', desc: 'Go from draft to live in seconds.' },
                            ].map(f => (
                                <div key={f.label} className="flex flex-col items-center gap-3">
                                    <span className="text-2xl" style={{color: 'var(--accent)'}} aria-hidden="true">{f.icon}</span>
                                    <p className="font-semibold text-sm" style={{color: 'var(--text-primary)'}}>{f.label}</p>
                                    <p className="text-xs leading-relaxed" style={{color: 'var(--text-muted)'}}>{f.desc}</p>
                                </div>
                            ))}
                        </div>
                    </Container>
                </section>
            </div>
        )
    }

    if(posts.length===0 && status){
        return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
        <div className="max-w-xl w-full text-center">

            <div className="mb-6">
                <div
                    className="w-20 h-20 mx-auto rounded-full flex items-center justify-center text-4xl"
                    style={{
                        background: "rgba(99,102,241,0.15)",
                        color: "var(--accent)",
                    }}
                >
                    📝
                </div>
            </div>

            <h1
                className="text-4xl font-bold mb-4"
                style={{ color: "var(--text-primary)" }}
            >
                No posts yet
            </h1>

            <p
                className="text-lg mb-8"
                style={{ color: "var(--text-secondary)" }}
            >
                You haven't published any articles yet.
                <br />
                Start sharing your ideas with the world.
            </p>

            <Link
                to="/add-post"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-all duration-200"
            >
                <span className="text-xl">+</span>
                Create Your First Post
            </Link>

        </div>
    </div>
);
    }

    return (
        <div className='py-12' style={{minHeight: 'calc(100vh - 4rem)'}}>
            <Container>
                {/* Section Header */}
                <div className="mb-10">
                    <h1 className="text-3xl font-bold mb-2" style={{color: 'var(--text-primary)', fontFamily: "'Inter', sans-serif"}}>
                        Latest Posts
                    </h1>
                    <p className="text-sm" style={{color: 'var(--text-muted)'}}>
                        {posts.length} {posts.length === 1 ? 'article' : 'articles'} published
                    </p>
                </div>

                {/* Responsive Post Grid */}
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {posts.map((post) => (
                        <div key={post.$id} className="flex">
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home