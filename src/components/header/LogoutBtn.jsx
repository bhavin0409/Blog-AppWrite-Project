import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth.service'
import { logout } from '../../store/authSlice'

const LogoutBtn = () => {
    const dispatch = useDispatch();

    const logoutHandler = () => {
        authService.logout()
            .then(() => {
                dispatch(logout())
            })
            .catch((error) => {
                console.error("Logout failed: ", error);
            });
    }
    return (
        <button
            className="inline-flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold rounded-full shadow-lg hover:from-pink-500 hover:to-red-500 hover:scale-105 transition-all duration-200"
            onClick={logoutHandler}
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1" />
            </svg>
            Logout
        </button>
    )
}

export default LogoutBtn