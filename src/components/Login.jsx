import  {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import {Button, Input, Logo} from "./index"
import {useDispatch} from "react-redux"
import authService from "../appwrite/auth"
import {useForm} from "react-hook-form"

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()
    const [error, setError] = useState("")

    const login = async(data) => {
        setError("")
        try {
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                if(userData) dispatch(authLogin(userData));
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }

  return (
    <div className='min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4'>
        <div className='w-full max-w-md'>

            {/* Card */}
            <div
                className='rounded-2xl p-8 border'
                style={{
                    backgroundColor: 'var(--bg-surface)',
                    borderColor: 'var(--border)',
                    boxShadow: 'var(--shadow-xl)',
                }}
            >
                {/* Logo */}
                <div className="mb-6 flex justify-center">
                    <Logo width="160px" />
                </div>

                {/* Heading */}
                <div className="mb-8 text-center">
                    <h1
                        className="text-2xl font-bold mb-2"
                        style={{color: 'var(--text-primary)', fontFamily: "'Inter', sans-serif"}}
                    >
                        Welcome back
                    </h1>
                    <p className="text-sm" style={{color: 'var(--text-muted)'}}>
                        Don&apos;t have an account?&nbsp;
                        <Link
                            to="/signup"
                            className="font-semibold text-indigo-400 hover:text-indigo-300 transition-colors duration-150"
                        >
                            Sign up free
                        </Link>
                    </p>
                </div>

                {/* Error Banner */}
                {error && (
                    <div
                        className="mb-6 flex items-start gap-3 px-4 py-3 rounded-lg text-sm"
                        style={{
                            backgroundColor: 'rgba(239,68,68,0.1)',
                            border: '1px solid rgba(239,68,68,0.25)',
                            color: '#f87171',
                        }}
                        role="alert"
                    >
                        <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 5v4m0 3h.01M2 8a6 6 0 1112 0A6 6 0 012 8z"/>
                        </svg>
                        {error}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit(login)} noValidate>
                    <div className='space-y-5'>
                        <Input
                            label="Email address"
                            placeholder="you@example.com"
                            type="email"
                            autoComplete="email"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                    "Email address must be a valid address",
                                }
                            })}
                        />
                        <Input
                            label="Password"
                            type="password"
                            placeholder="Enter your password"
                            autoComplete="current-password"
                            {...register("password", {
                                required: true,
                            })}
                        />
                        <Button
                            type="submit"
                            className="w-full py-3 text-base"
                        >
                            Sign in to your account
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Login