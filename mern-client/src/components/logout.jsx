import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthProvider';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const performLogout = async () => {
      try {
        await logout();
        // Set a timeout to show the animation for .5 seconds before redirecting
        setTimeout(() => {
          setIsLoading(false);
          navigate('/');
        }, 500);
      } catch (error) {
        console.error('Logout failed: ', error);
        setIsLoading(false);
        navigate('/');
      }
    };

    performLogout();
  }, [logout, navigate]);

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-orange-400 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold text-center mb-4">Logging Out...</h1>
              {isLoading && (
                <div className="flex justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logout;