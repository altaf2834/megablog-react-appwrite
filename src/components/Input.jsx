import React,{useId} from 'react'

const Input=React.forwardRef(function Input({
    label,
    type="text",
    className="",
    ...props
},ref){
    const id=useId()
    return (
        <div className='w-full' >
            {label && (
                <label
                    className='block mb-1.5 text-sm font-medium'
                    style={{color: 'var(--text-muted)'}}
                    htmlFor={id}
                >
                    {label}
                </label>
            )}
            <input
                type={type}
                className={`
                    w-full px-3.5 py-2.5 rounded-lg text-sm
                    transition-all duration-150
                    border focus:outline-none
                    ${className}
                `}
                style={{
                    backgroundColor: 'var(--bg-surface-2)',
                    color: 'var(--text-primary)',
                    borderColor: 'var(--border)',
                    fontFamily: "'Inter', sans-serif",
                }}
                onFocus={e => {
                    e.target.style.borderColor = 'var(--accent)';
                    e.target.style.boxShadow = 'var(--shadow-accent)';
                }}
                onBlur={e => {
                    e.target.style.borderColor = 'var(--border)';
                    e.target.style.boxShadow = 'none';
                }}
                ref={ref}
                {...props}
                id={id}
            />
        </div>
    )
})

export default Input