import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import authService from '../appwrite/auth.service'
import { Button, Input } from './index'
import { login } from '../store/authSlice'
import Logo from './Logo/Logo'


const Register = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [error, setError] = useState('')
    const { register, handleSubmit } = useForm()

    const registerUser = async (data) => {
        setError('')
        try {
            const session = await authService.createAccount(data)
            console.log(session);

            if (session) {
                const userData = await authService.getCurrentUser()
                if (userData) {
                    dispatch(login(userData))
                }

                navigate('/')
            }

        } catch (error) {
            setError(error.message || 'Something went wrong')
        }
    }
    return (
        <div className='flex items-center justify-center w-full'>
            <div className='mx-auto max-w-lg w-full p-10 bg-gray-100 rounded-xl shadow-md border-black/10'>
                <div className='mb-2 flex justify-center '>
                    <span className='inline-block w-full max-w-[100px]'>
                        <Logo width='100%' />
                    </span>
                </div>
                <h2 className='text-center text-2xl font-bold leading-tight'>Create a new account</h2>

                <form onSubmit={handleSubmit(registerUser)} className='mt-8 space-y-6'>
                    <Input
                        type='text'
                        label='Name :'
                        placeholder='Enter Your Name'
                        {...register('name' , {
                            required: true,
                            minLength: {
                                value: 2,
                                message: 'Name must be at least 2 characters long'
                            },
                            maxLength: {
                                value: 100,
                                message: 'Name must be less than 100 characters long'
                            }
                        })}
                    />

                    <Input 
                        type='email'
                        label='Email :'
                        placeholder='Enter your email'
                        {...register('email', {
                            required: {
                                value:true,
                                message:"Email is required"
                            },
                            validate: {
                                matchPattern: (value) => /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value) || 'Please enter a valid email address'
                            }
                        })}
                    />

                    <Input
                        type='password'
                        label='Password :'
                        placeholder='Enter your pasword'
                        {...register('password', {
                            required: {
                                value: true,
                                message: "Password is required"
                            },
                            minLength: {
                                value: 6,
                                message: 'Password must be at least 6 characters long'
                            }
                        })}
                    />

                    <Button
                        type='submit'
                        className='w-full bg-blue-500 py-2 text-white '
                        bgColor='bg-blue-500'
                    > Create an Account </Button>
                </form>

                <p className='mt-2 text-center text-base text-black/60'>
                    Already have an account?
                    <Link to='/login' className='font-medium duration-200 transition-all text-blue-500 hover:underline'>Sign In</Link>
                </p>
                {error && (
                    <p className='text-red-500 text-center mt-8'>{error}</p>
                )}
            </div>
        </div>
    )
}

export default Register
