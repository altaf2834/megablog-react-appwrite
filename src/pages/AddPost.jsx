
import { Container, PostForm } from '../components'

function AddPost() {
  return (
    <div className='py-10' style={{minHeight: 'calc(100vh - 4rem)'}}>
        <Container>
            {/* Page Header */}
            <div className="mb-8 pb-6 border-b" style={{borderColor: 'var(--border)'}}>
                <div className="flex items-center gap-3 mb-2">
                    <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{backgroundColor: 'var(--accent-light)'}}
                        aria-hidden="true"
                    >
                        <svg className="w-4 h-4" style={{color: 'var(--accent)'}} fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth="2.2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 3v10M3 8h10"/>
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold" style={{color: 'var(--text-primary)', fontFamily: "'Inter', sans-serif"}}>
                        Write a New Post
                    </h1>
                </div>
                <p className="text-sm ml-11" style={{color: 'var(--text-muted)'}}>
                    Share your ideas, stories, and knowledge with the world.
                </p>
            </div>

            <PostForm />
        </Container>
    </div>
  )
}

export default AddPost