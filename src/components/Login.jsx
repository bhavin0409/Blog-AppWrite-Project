import React, { useState } from 'react'
import { data, Link, useNavigate } from 'react-router-dom'
import authService from '../appwrite/auth.service'
import { Button, Input } from './index'
import { useDispatch } from 'react-redux'
import { login as authLogin } from '../store/authSlice'
import { useForm } from 'react-hook-form'
import Logo from './Logo/Logo'

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState('')

    const login = async (data) => {
        setError('');
        try {
            const session = await authService.login(data);
            console.log(session);
            
            if (session) {
                const userData = await authService.getCurrentUser();
                if (userData) {
                    dispatch(authLogin({ userData }));
                }
                navigate('/');
            }else{
                setError('Login failed. Please try again.');
            }
        } catch (error) {
            console.error("Login error:", error);
            setError(error.param);
        }
    };

    return (
        <div className='flex items-center justify-center w-full'>
            <div className='mx-auto max-w-lg w-full p-10 bg-gray-100 rounded-xl shadow-md border-black/10'>
                <div className='mb-2 flex justify-center '>
                    <span className='inline-block w-full max-w-[100px]'>
                        <Logo width='100%' />
                    </span>
                </div>
                <h2 className='text-center text-2xl font-bold leading-tight'>sign in to your account</h2>

                <form onSubmit={handleSubmit(login)} className='mt-8 space-y-6'>
                    <Input
                        type='email'
                        label='Email :'
                        placeholder='Enter your email'
                        {...register('email',
                            {
                                required: true,
                                validate: {
                                    matchPattern: (value) => /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{1,3}$/.test(value) || 'Please enter a valid email address'
                                }
                            })}
                    />
                    <Input
                        type='password'
                        label='Password :'
                        placeholder='Enter your password'
                        {...register('password',
                            {
                                required: true,
                                minLength: {
                                    value: 6,
                                    message: 'Password must be at least 6 characters long'
                                }
                            })}
                    />

                    <Button
                        type='submit'
                        classname='w-full'
                    > Sign in</Button>
                </form>

                <p className='mt-2 text-center text-base text-black/60'>
                    Don&apos;t have an account?
                    <Link to='/signup' className='font-medium duration-200 transition-all text-blue-500 hover:underline'>Sign Up</Link>
                </p>
                {error && (
                    <p className='text-red-500 text-center mt-8'>{error}</p>
                )}
            </div>
        </div>
    )
}

export default Login
