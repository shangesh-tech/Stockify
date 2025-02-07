import React, { useState } from 'react';
import { FaFacebookF, FaGoogle, FaApple } from 'react-icons/fa'; 
import { Link, useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import { toast } from 'react-toastify';  // Importing react-toastify
import img from '../assets/signup.png';

const SignUp = () => {
  const navigate = useNavigate();  // Use navigate for redirection
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Check if passwords match
    if (password !== confirmPassword) {
      setLoading(false);
      setError('Passwords do not match');
      toast.error('Passwords do not match');
      return;
    }

    // Validate required fields
    if (!name || !email || !gender || !password || !age) {
      setLoading(false);
      setError('Please add all fields');
      toast.error('Please add all fields');
      return;
    }

    // Check if email is valid
    if (
      !email.includes('@gmail.com') &&
      !email.includes('@yahoo.com') &&
      !email.includes('@outlook.com')
    ) {
      setLoading(false);
      setError('Please enter a valid email address');
      toast.error('Please enter a valid email address');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3500/api/v1/user/register', {
        name,
        email,
        gender,
        password,
        age,
      });

      toast.success('Registration successful! Redirecting to login...');
      console.log('Registration successful:', response.data);
      setLoading(false);
      navigate('/login');
    } catch (err) {
      console.error('Registration failed:', err.response ? err.response.data : err.message);
      setLoading(false);
      toast.error(err.response ? err.response.data.message : 'An error occurred. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-4xl flex">
        {/* Left Side - Form */}
        <div className="w-full md:w-1/2 pr-8">
          <h2 className="text-3xl font-bold text-black">Stockify</h2>
          <h3 className="mt-4 text-xl text-gray-600">Let’s get you all set up so you can access your personal account</h3>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-600" htmlFor="name">Full Name</label>
              <input
                id="name"
                type="text"
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600" htmlFor="email">Email</label>
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
              <label className="block text-sm font-medium text-gray-600" htmlFor="gender">Gender</label>
              <select
                id="gender"
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600" htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600" htmlFor="confirm-password">Confirm Password</label>
              <input
                id="confirm-password"
                type="password"
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="********"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600" htmlFor="age">Age</label>
              <input
                id="age"
                type="number"
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="25"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
              />
            </div>

            <div className="flex items-center mt-2">
              <input type="checkbox" id="agree" className="mr-2" />
              <label htmlFor="agree" className="text-sm text-gray-600">
                I agree to the <a href="#" className="text-blue-500 hover:underline">Terms and Privacy Policy</a>
              </label>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className={`w-full px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 focus:outline-none ${loading && "opacity-50 cursor-not-allowed"}`}
                disabled={loading}
              >
                {loading ? "Signing up..." : "Sign Up"}
              </button>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Log in</Link></p>
            </div>

            <div className="mt-4 text-center">
              <span className="text-sm text-gray-600">or sign up with</span>
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
        <div className="w-1/2 hidden md:flex pl-8 items-center justify-center">
          <img
            src={img}
            alt="Phone with security lock"
            className="w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
