import React from 'react'
import { useId } from 'react'

function Select({
    options,
    label,
    className,
    ...props
}, ref) {
    const id = useId()
    return (
        <div className='w-full'>
            {label && (
                <label
                    htmlFor={id}
                    className='block mb-1.5 text-sm font-medium'
                    style={{color: 'var(--text-muted)'}}
                >
                    {label}
                </label>
            )}
            <select
                {...props}
                id={id}
                ref={ref}
                className={`
                    w-full px-3.5 py-2.5 rounded-lg text-sm
                    transition-all duration-150
                    border focus:outline-none cursor-pointer
                    appearance-none
                    ${className}
                `}
                style={{
                    backgroundColor: 'var(--bg-surface-2)',
                    color: 'var(--text-primary)',
                    borderColor: 'var(--border)',
                    fontFamily: "'Inter', sans-serif",
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2368687e' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 12px center',
                    paddingRight: '36px',
                }}
                onFocus={e => {
                    e.target.style.borderColor = 'var(--accent)';
                    e.target.style.boxShadow = 'var(--shadow-accent)';
                }}
                onBlur={e => {
                    e.target.style.borderColor = 'var(--border)';
                    e.target.style.boxShadow = 'none';
                }}
            >
                {options?.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default React.forwardRef(Select)