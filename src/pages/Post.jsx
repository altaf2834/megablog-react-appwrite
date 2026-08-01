import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <article className="py-0" style={{minHeight: 'calc(100vh - 4rem)'}}>

            {/* Hero Image — Full width with gradient overlay */}
            <div className="relative w-full overflow-hidden" style={{maxHeight: '520px'}}>
                <img
                    src={appwriteService.getFilePreview(post.featuredImage)}
                    alt={post.title}
                    className="w-full object-cover"
                    style={{
                        height: 'clamp(240px, 45vw, 520px)',
                        objectPosition: 'center',
                    }}
                />
                {/* Dark gradient overlay at bottom for text legibility */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: 'linear-gradient(to bottom, rgba(15,15,19,0.1) 0%, rgba(15,15,19,0.5) 70%, rgba(15,15,19,1) 100%)',
                    }}
                    aria-hidden="true"
                />

                {/* Author Actions — overlaid on image (top-right) */}
                {isAuthor && (
                    <div className="absolute top-4 right-4 flex flex-wrap gap-2 z-10">
                        <Link to={`/edit-post/${post.$id}`}>
                            <button
                                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all duration-150"
                                style={{
                                    backgroundColor: 'rgba(22,163,74,0.9)',
                                    backdropFilter: 'blur(8px)',
                                    border: '1px solid rgba(74,222,128,0.3)',
                                }}
                                onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(21,128,61,0.95)'}
                                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(22,163,74,0.9)'}
                                aria-label="Edit post"
                            >
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 3l2 2-7 7H4v-2l7-7z"/>
                                </svg>
                                Edit
                            </button>
                        </Link>

                        <button
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all duration-150"
                            style={{
                                backgroundColor: 'rgba(220,38,38,0.9)',
                                backdropFilter: 'blur(8px)',
                                border: '1px solid rgba(252,165,165,0.3)',
                            }}
                            onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(185,28,28,0.95)'}
                            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(220,38,38,0.9)'}
                            onClick={deletePost}
                            aria-label="Delete post"
                        >
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 3h6M4 5h8l-1 9H5L4 5zm3 0V2h2v1"/>
                            </svg>
                            Delete
                        </button>
                    </div>
                )}
            </div>

            {/* Article Content */}
            <Container>
                <div className="max-w-3xl mx-auto">

                    {/* Title block */}
                    <div className="pt-8 pb-8 border-b" style={{borderColor: 'var(--border)'}}>
                        <h1
                            className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-5"
                            style={{color: 'var(--text-inverse)', fontFamily: "'Inter', sans-serif"}}
                        >
                            {post.title}
                        </h1>

                        {/* Meta row */}
                        <div className="flex flex-wrap items-center gap-4">
                            {/* Date */}
                            <div className="flex items-center gap-1.5 text-sm" style={{color: 'var(--text-muted)'}}>
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                                    <rect x="2" y="3" width="12" height="11" rx="2"/>
                                    <path strokeLinecap="round" d="M2 7h12M6 2v2M10 2v2"/>
                                </svg>
                                <time dateTime={post.$createdAt}>
                                    {new Date(post.$createdAt).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}
                                </time>
                            </div>

                            {/* Status badge */}
                            {post.status && (
                                <span
                                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold"
                                    style={{
                                        backgroundColor: post.status === 'active'
                                            ? 'rgba(34,197,94,0.15)'
                                            : 'rgba(107,114,128,0.15)',
                                        color: post.status === 'active' ? '#4ade80' : 'var(--text-muted)',
                                        border: `1px solid ${post.status === 'active' ? 'rgba(74,222,128,0.3)' : 'var(--border)'}`,
                                    }}
                                >
                                    {post.status === 'active' ? 'Published' : 'Draft'}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Article body */}
                    <div className="py-10">
                        <div className="browser-css break-words">
                            {parse(post.content)}
                        </div>
                    </div>

                    {/* Back to home */}
                    <div className="pb-12">
                        <Link
                            to="/"
                            className="inline-flex items-center gap-2 text-sm font-medium transition-colors duration-150"
                            style={{color: 'var(--text-muted)'}}
                            onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
                            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 8H3M7 4L3 8l4 4"/>
                            </svg>
                            Back to all posts
                        </Link>
                    </div>

                </div>
            </Container>
        </article>
    ) : null;
}