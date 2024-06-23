import React from 'react'
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';
import { useNavigate, useLocation } from 'react-router-dom';


const Login = () => {
    const { login } = useContext(AuthContext);
    const [error, setError] = useState("");
    const location=useLocation();
    const navigate = useNavigate();
    const from=location.state?.from?.pathname || '/';
  
    const handleLogin = (event) => {
      event.preventDefault();
      const form = event.target;
      const email = form.email.value;
      const password = form.password.value;
      login(email, password).then((userCredential) => {
        const user = userCredential.user;
        alert(`User ${user.email} has been logged in successfully`);
        // You can add any post-login logic here
        navigate(from, {replace:true});
      }).catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
      });
  
      
    };
  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
    <div className="relative py-3 sm:max-w-xl sm:mx-auto">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-orange-400 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
      <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
        <div className="max-w-md mx-auto">
          <div>
            <h1 className="text-2xl font-semibold">Boi Paben</h1>
          </div>
          <div className="divide-y divide-gray-200">
            <form onSubmit={handleLogin} className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
              <div className="relative">
                <input id="email" name="email" type="text" className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600" placeholder="Email address" />
              </div>
              <div className="relative">
                <input id="password" name="password" type="password" className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600" placeholder="Password" />
              </div>
              <p>If you haven't an account. Please<Link to='/signup'
              className='text-orange-400'> Sign UP</Link> here.</p>
              <div className="relative">
                <button className="bg-orange-400 text-white rounded-md px-2 py-1">Log IN</button>
              </div>
              {error && <p className="text-red-500">{error}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Login