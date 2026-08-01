import { useForm } from "react-hook-form"
import { Link,useNavigate } from "react-router-dom"
import {Input,Button,Logo} from './index'
import { useState } from "react"
import { useDispatch } from "react-redux"
import authService from "../appwrite/auth"
import { login } from "../store/authSlice"

function Signup() {
    const{register,handleSubmit}=useForm()
    const dispatch=useDispatch()
    const [error,setError]=useState("")
    const navigate=useNavigate()

    const create=async(data)=>{
        setError("")
        try{
            const userData=await authService.createAccount(data)
            if(userData){
                const userData=await authService.getCurrentUser()
                if(userData) dispatch(login(userData));
                navigate("/")
            }
        }catch(error){
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
                        Create your account
                    </h1>
                    <p className="text-sm" style={{color: 'var(--text-muted)'}}>
                        Already have an account?&nbsp;
                        <Link
                            to="/login"
                            className="font-semibold text-indigo-400 hover:text-indigo-300 transition-colors duration-150"
                        >
                            Sign in
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
                <form onSubmit={handleSubmit(create)} noValidate>
                    <div className='space-y-5'>
                        <Input
                            label="Full Name"
                            placeholder="Jane Doe"
                            autoComplete="name"
                            {...register("name", {
                                required: true,
                            })}
                        />
                        <Input
                            label="Email address"
                            placeholder="you@example.com"
                            type="email"
                            autoComplete="email"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                    "Email address must be a valid address",
                                }
                            })}
                        />
                        <Input
                            label="Password"
                            type="password"
                            placeholder="Create a password"
                            autoComplete="new-password"
                            {...register("password", {required: true})}
                        />
                        <Button type="submit" className="w-full py-3 text-base">
                            Create account
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Signup