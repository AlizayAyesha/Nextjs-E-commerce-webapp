'use client';

import { useState } from 'react';
export default function SignUp() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add form submission logic
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-lg flex bg-white shadow-lg rounded-lg">
        {/* Left side with image */}
        <div className="w-1/2 rounded-l-lg overflow-hidden">
          <img
            src="https://i.pinimg.com/564x/22/68/2c/22682c59bf8a897cb6f7c0ac193cd387.jpg"
            alt="Sign Up"
            className="object-cover w-full h-full"
          />
        </div>

        {/* Right side with form */}
        <div className="w-1/2 p-8 space-y-6">
          <h2 className="text-center text-3xl font-extrabold text-gray-900">Sign In</h2>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
           
            <button type="submit" className="w-full bg-green-600 text-white py-2">Sign In</button>
          </form>
        </div>
      </div>
    </div>
  );
}
