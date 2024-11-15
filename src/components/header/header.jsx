import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../state/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get the user's information from Redux state
  const { user } = useSelector((state) => state.auth);
  const userName = user?.email ? user.email.split('@')[0] : 'User';
  

  // Handle the logout functionality
  const handleLogout = async () => {
    try {
      dispatch(logout());
      navigate('/'); // Redirect to sign-in page after logout
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="fixed w-full top-0 flex flex-row justify-between items-center bg-gray-800 text-white p-4 z-50">
      <div className='bg-[#F8C00B] py-1.5 px-4 border-2 rounded-md text-black'>
        {user?.email ? (
          <span>Welcome, {userName}!</span>
        ) : (
          <span>Welcome, User!</span>
        )}
      </div>

      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default Header;
