import React, { useContext } from 'react'
import { AuthContext} from '../contexts/AuthProvider'
import { useLocation, useNavigate } from 'react-router-dom'



const logout = () => {
    const { logout } = useContext(AuthContext);
    const location=useLocation();
    const navigate = useNavigate();
    
    const handleLogout = () => {
        logout().then(() => {
            alert('User has been logged out successfully');
            navigate(from, {replace:true})
        }).catch((error) => {
            alert('An error occurred while logging out');
        });
    };
  return (
    <div className='h-screen bg-teal-100 flex items-center justify-center'>
        <button className='bg-red-700 px-8 py-2 text-white rounded' onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default logout