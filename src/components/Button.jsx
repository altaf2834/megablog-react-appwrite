function Button({
    children,
    type='button',
    bgColor='bg-indigo-600',
    textColor='text-white',
    className='',
    ...props
}) {
  return (
    <button
      type={type}
      className={`
        inline-flex items-center justify-center gap-2
        px-5 py-2.5 rounded-lg font-semibold text-sm
        transition-all duration-150 ease-in-out
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        ${bgColor === 'bg-indigo-600' || bgColor === 'bg-blue-600'
          ? 'bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 shadow-lg shadow-indigo-500/20'
          : bgColor
        }
        ${textColor}
        ${className}
      `}
      style={{
        letterSpacing: '0.01em',
      }}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button