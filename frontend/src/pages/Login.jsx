import React, { useState } from "react";
import { FaFacebookF, FaGoogle, FaApple } from "react-icons/fa"; 
import { Link, useNavigate } from "react-router-dom"; 
import axios from "axios";
import { toast } from "react-toastify";  
import img from "../assets/Login.png";

const Login = () => {
  const navigate = useNavigate();  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setLoading(true);

    try {
      const response = await axios.post('https://stockify-backend-3mmq.onrender.com/api/v1/user/login', {
        email,
        password,
      }, {
        withCredentials: true, 
      });

      toast.success('Login successful! Redirecting to your dashboard...');
      console.log('Login successful:', response.data);  
      setLoading(false);
      navigate("/dashboard");

    } catch (err) {
      console.error('Login failed:', err.response ? err.response.data : err.message);
      setLoading(false);
      toast.error(err.response ? err.response.data.message : 'An error occurred. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-xl lg:shadow-lg w-full max-w-4xl flex flex-col lg:flex-row gap-20">
        {/* Left Side - Form */}
        <div className="w-full lg:w-1/2 mb-6 lg:mb-0">
          <h2 className="text-3xl font-bold text-black">Stockify</h2>
          <h3 className="mt-4 text-xl text-gray-600">Login to access your account</h3>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-600" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="johndoe@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="flex justify-between items-center mt-2">
              <div className="flex items-center">
                <input type="checkbox" id="remember-me" className="mr-2" />
                <label htmlFor="remember-me" className="text-sm text-gray-600">Remember me</label>
              </div>
              <Link to="#" className="text-sm text-blue-500 hover:underline">Forgot Password?</Link>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className={`w-full px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 focus:outline-none ${loading && "opacity-50 cursor-not-allowed"}`}
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link to={"/register"} className="text-blue-500 hover:underline">Sign up</Link>
              </p>
            </div>

            <div className="mt-4 text-center">
              <span className="text-sm text-gray-600">or login with</span>
              <div className="flex justify-center space-x-4 mt-2">
                <button className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center">
                  <FaFacebookF className="text-white text-lg" />
                </button>
                <button className="w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center">
                  <FaGoogle className="text-white text-lg" />
                </button>
                <button className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center">
                  <FaApple className="text-white text-lg" />
                </button>
              </div>
              
            </div>
          </form>
        </div>

        {/* Right Side - Image */}
        <div className="w-full hidden lg:flex lg:w-1/2 items-center justify-center">
          <img
            src={img}
            alt="Phone with security lock"
            className="w-full h-auto max-w-xs lg:max-w-md"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
