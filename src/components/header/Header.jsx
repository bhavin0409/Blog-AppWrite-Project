import React, { useState } from 'react'
import { Container, LogoutBtn } from '../index'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Logo from '../Logo/Logo'


const Header = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    {
      name: 'Home',
      slug: '/',
      active: true
    },
    {
      name: 'Login',
      slug: '/login',
      active: !authStatus
    },
    {
      name: 'signup',
      slug: '/signup',
      active: !authStatus
    },
    {
      name: 'All Posts',
      slug: '/all-posts',
      active: authStatus
    },
    {
      name: 'Add Post',
      slug: '/add-post',
      active: authStatus
    },


  ]

  return (
    <header className='py-3 shadow-md bg-gray-500'>
      <Container>
        <nav className='flex items-center'>
          <div className='mr-4'>
            <Link to='/'>
              <Logo width={60}/>
            </Link>
          </div>

          {/* Hamburger Icon */}
          <div className="ml-auto lg:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Desktop Menu */}
          <ul className='hidden lg:flex ml-auto space-x-4'>
            {navItems.map((item) => item.active ? (
              <li key={item.name}>
                <button
                  className={
                    item.name.toLowerCase() === 'login'
                      ? 'inline-block px-6 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-full shadow-md hover:from-cyan-500 hover:to-blue-500 hover:scale-105 transition-all duration-200'
                      : item.name.toLowerCase() === 'signup'
                      ? 'inline-block px-6 py-2 bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold rounded-full shadow-md hover:from-blue-500 hover:to-green-400 hover:scale-105 transition-all duration-200'
                      : 'inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                  }
                  onClick={() => navigate(item.slug)}
                >
                  {item.name}
                </button>
              </li>
            ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>

          {/* Mobile Menu */}
          {menuOpen && (
            <ul className="absolute top-16 right-4 bg-gray-700 rounded-lg shadow-lg flex flex-col items-end p-4 space-y-2 z-50 lg:hidden">
              {navItems.map((item) => item.active ? (
                <li key={item.name}>
                  <button
                    className={
                      item.name.toLowerCase() === 'login'
                        ? 'block px-6 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-full w-full text-right shadow-md hover:from-cyan-500 hover:to-blue-500 hover:scale-105 transition-all duration-200'
                        : item.name.toLowerCase() === 'signup'
                        ? 'block px-6 py-2 bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold rounded-full w-full text-right shadow-md hover:from-blue-500 hover:to-green-400 hover:scale-105 transition-all duration-200'
                        : 'block px-6 py-2 text-white hover:bg-blue-400 rounded-full w-full text-right'
                    }
                    onClick={() => {
                      navigate(item.slug);
                      setMenuOpen(false);
                    }}
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
              )}
              {authStatus && (
                <li>
                  <LogoutBtn />
                </li>
              )}
            </ul>
          )}
        </nav>
      </Container>
    </header>
  )
}

export default Header
