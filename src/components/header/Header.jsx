import React, { useState } from 'react'
import { Container, Logo, LogoutBtn } from '../index'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const navItems = [
    { name: 'Home', slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
  ]

  return (
    <header className='py-3 shadow bg-gray-50'>
      <Container>
        <nav className='flex items-center justify-between'>
          {/* Logo */}
          <Link to='/'><Logo width='60px' /></Link>

          {/* Hamburger Icon - Mobile */}
          <div className='md:hidden'>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className='focus:outline-none'
            >
              <svg
                className='w-6 h-6'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>

          {/* Navigation Items - Desktop */}
          <ul className='hidden md:flex ml-auto items-center space-x-3'>
            {navItems.map(item =>
              item.active && (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className='px-4 py-2 hover:bg-blue-100 rounded-full uppercase font-medium transition duration-200'
                  >
                    {item.name}
                  </button>
                </li>
              )
            )}
            {authStatus && (
              <li className=''>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>

        {/* Mobile Menu */}
        {menuOpen && (
          <ul className='flex flex-col mt-3 space-y-2 md:hidden'>
            {navItems.map(item =>
              item.active && (
                <li key={item.name}>
                  <button
                    onClick={() => {
                      navigate(item.slug)
                      setMenuOpen(false)
                    }}
                    className='block w-full text-left px-4 py-2 hover:bg-blue-100 rounded-full uppercase font-medium transition duration-200'
                  >
                    {item.name}
                  </button>
                </li>
              )
            )}
            {authStatus && (
              <li className=''>
                <LogoutBtn onClick={() => setMenuOpen(false)}  />
              </li>
            )}
          </ul>
        )}
      </Container>
    </header>
  )
}

export default Header
