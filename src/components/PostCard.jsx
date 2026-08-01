
import appwriteService from "../appwrite/config"
import {Link} from 'react-router-dom'

function PostCard({$id, title, featuredImage}) {
  return (
    <Link to={`/post/${$id}`} className="group block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-2xl">
        <article
            className="card-hover h-full flex flex-col rounded-2xl overflow-hidden border"
            style={{
                backgroundColor: 'var(--bg-surface)',
                borderColor: 'var(--border)',
            }}
        >
            {/* Image */}
            <div className="relative w-full overflow-hidden" style={{aspectRatio: '16/9', flexShrink: 0}}>
                <img
                    src={appwriteService.getFilePreview(featuredImage)}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                />
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 p-5">
                <h2
                    className="font-semibold text-base leading-snug line-clamp-2 mb-3 group-hover:text-indigo-400 transition-colors duration-150"
                    style={{color: 'var(--text-primary)', fontFamily: "'Inter', sans-serif"}}
                >
                    {title}
                </h2>

                {/* Read More hint */}
                <div className="mt-auto flex items-center gap-1.5 text-xs font-medium transition-colors duration-150"
                    style={{color: 'var(--text-muted)'}}
                >
                    <span className="group-hover:text-indigo-400 transition-colors duration-150">Read article</span>
                    <svg
                        className="w-3.5 h-3.5 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:text-indigo-400"
                        fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth="2"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8h10M9 4l4 4-4 4"/>
                    </svg>
                </div>
            </div>
        </article>
    </Link>
  )
}

export default PostCard