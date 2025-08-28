"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import { set } from "mongoose";
export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    username: "",
    email: "",
    password: "",
  });

  const [buttonDisable , setButtonDisable] = React.useState(false);

  useEffect(() => {
    if(user.username.length > 0 && user.email.length > 0 && user.password.length > 0){
      setButtonDisable(false);
    } else {
      setButtonDisable(true);
    }
  }, [user])
  const [loading , setLoading] = React.useState(false);

  const onSignup = async () => {
    try {
      // Replace with your API endpoint
      setLoading(true);
      const response = await axios.post('/api/users/signup', user)
      console.log("Signup response", response.data);
      toast.success("Signup successful! Please login.");
      router.push('/login');
    } catch (error: any) {
      toast.error("Something went wrong");
      console.log("Signup error", error.message);

    }finally
    {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-amber-500">{loading ? "Processing" : "Signup"}</h1>
        
        <div className="flex flex-col gap-4">
          {/* Username */}
          <div className="flex flex-col">
            <label htmlFor="username" className="mb-1 font-medium text-gray-700">Username</label>
            <input
              type="text"
              id="username"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              placeholder="Enter your username"
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 text-black "
              autoComplete="off" />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-1 font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="Enter your email"
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 text-black"
              autoComplete="off"/>
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label htmlFor="password" className="mb-1 font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="Enter your password"
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 text-black"
                autoComplete="off"/>
          </div>

          {/* Submit Button */}
          <button
            onClick={onSignup}
            className="bg-amber-500 text-white font-bold py-3 rounded-lg hover:bg-amber-600 transition-colors"
          >
            {buttonDisable ? "Fill all the details" : "Sign Up"}
          </button>
        </div>

        <p className="text-sm text-gray-500 text-center mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-amber-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
