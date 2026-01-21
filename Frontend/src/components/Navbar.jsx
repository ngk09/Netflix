import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

const Navbar = () => {
  const navigate = useNavigate();
  // Get user and logout function from Zustand store
  const { user, logout } = useAuthStore();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/signin');
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <nav className='fixed top-0 w-full z-50 bg-gradient-to-b from-black/90 to-transparent bg-black text-gray-200 flex justify-between items-center px-4 md:px-12 h-20 text-sm md:text-[15px] font-medium'>
      
      {/* Left Section: Logo and Links */}
      <div className='flex items-center space-x-10'>
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" 
          alt="Netflix" 
          className='w-24 md:w-32 cursor-pointer object-contain'
          onClick={() => navigate('/')}
        />
        
        <ul className='hidden lg:flex space-x-6'>
          <li onClick={() => navigate('/')} className='cursor-pointer transition duration-300 hover:text-red-600'>Home</li>
          <li className='cursor-pointer transition duration-300 hover:text-red-600'>TV Shows</li>
          <li className='cursor-pointer transition duration-300 hover:text-red-600'>Movies</li>
          <li className='cursor-pointer transition duration-300 hover:text-red-600'>New & Popular</li>
          <li className='cursor-pointer transition duration-300 hover:text-red-600'>My List</li>
        </ul>
      </div>

      {/* Right Section: Search and Buttons */}
      <div className='flex items-center space-x-5'>
        <div className='hidden md:flex items-center bg-black/40 border border-gray-600 px-2 py-1 rounded'>
          <input 
            type="text" 
            placeholder="Titles, people, genres" 
            className='bg-transparent outline-none text-white w-20 md:w-40 text-xs'
          />
          <span className='cursor-pointer text-sm'>🔍</span>
        </div>
        
        <button className='hidden sm:block bg-red-600 text-white px-3 py-1 rounded text-xs font-bold hover:bg-red-700 transition'>
          Get AI Picks
        </button>

        {/* Dynamic User Section */}
        {user ? (
          <div className='flex items-center space-x-4'>
            <div className='hidden md:flex flex-col items-end leading-tight'>
              <span className='text-[10px] text-zinc-500 uppercase tracking-wider'>Member</span>
              <span className='text-white font-bold text-xs'>
                {/* Firebase uses email if displayName isn't set during signup */}
                {user.displayName || user.email.split('@')[0]}
              </span>
            </div>
            
            {/* User Avatar Placeholder */}
            <img 
                src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" 
                alt="Avatar" 
                className='w-8 h-8 rounded'
            />

            <button 
              onClick={handleLogout}
              className='cursor-pointer bg-zinc-800 border border-zinc-600 hover:bg-red-600 hover:border-red-600 text-white px-3 py-1 rounded transition text-xs font-bold'
            >
              Sign Out
            </button>
          </div>
        ) : (
          <button 
            onClick={() => navigate('/signin')}
            className='cursor-pointer bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 transition text-xs md:text-sm font-bold'
          >
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;