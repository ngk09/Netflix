import React from 'react'
import { useAuthStore } from '../store/authStore'

const Navbar = () => {
  // 1. Get user and logout from the store
  const { user, logout } = useAuthStore();

  return (
    <nav className='fixed top-0 w-full z-50 bg-gradient-to-b from-black/80 to-transparent bg-black text-gray-200 flex justify-between items-center px-4 md:px-12 h-20 text-sm md:text-[15px] font-medium'>
      
      {/* Left Section: Logo and Links */}
      <div className='flex items-center space-x-10'>
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" 
          alt="Netflix" 
          className='w-24 md:w-32 cursor-pointer object-contain'
        />
        
        <ul className='hidden lg:flex space-x-6'>
          <li className='cursor-pointer transition duration-300 hover:text-red-600'>Home</li>
          <li className='cursor-pointer transition duration-300 hover:text-red-600'>TV Shows</li>
          <li className='cursor-pointer transition duration-300 hover:text-red-600'>Movies</li>
          <li className='cursor-pointer transition duration-300 hover:text-red-600'>Anime</li>
          <li className='cursor-pointer transition duration-300 hover:text-red-600'>Games</li>
          <li className='cursor-pointer transition duration-300 hover:text-red-600'>New and Popular</li>
          <li className='cursor-pointer transition duration-300 hover:text-red-600'>Upcoming</li>
        </ul>
      </div>

      {/* Right Section: Search and Buttons */}
      <div className='flex items-center space-x-5'>
        <div className='flex items-center bg-black/40 border border-gray-600 px-2 py-1 rounded'>
          <input 
            type="text" 
            placeholder="Search.." 
            className='bg-transparent outline-none text-white w-20 md:w-40 text-xs'
          />
          <span className='cursor-pointer text-sm'>🔍</span>
        </div>
        
        <button className='hidden sm:block bg-red-600 text-white px-3 py-1 rounded text-xs font-bold hover:bg-red-700 transition'>
          Get AI Movie Picks
        </button>

        {/* 2. Dynamic User Section: Shows Sign Out if logged in, otherwise Sign In */}
        {user ? (
          <div className='flex items-center space-x-4'>
            <span className='hidden md:block text-zinc-400'>
              Hi, <span className='text-white font-bold'>{user.username}</span>
            </span>
            <button 
              onClick={logout}
              className='cursor-pointer bg-zinc-800 border border-zinc-600 hover:bg-red-600 hover:border-red-600 text-white px-3 py-1 rounded transition text-xs md:text-sm font-bold'
            >
              Sign Out
            </button>
          </div>
        ) : (
          <button className='cursor-pointer hover:text-red-600 transition text-xs md:text-sm'>
            Sign In
          </button>
        )}
      </div>
    </nav>
  )
}

export default Navbar