"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { set } from "mongoose";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const [buttonDisable , setButtonDisable] = React.useState(false);
  React.useEffect(() => {
    if(user.email.length > 0 && user.password.length > 0){
      setButtonDisable(false);
    } else {
      setButtonDisable(true);
    }
  }, [user])
  const [loading , setLoading] = React.useState(false);

  const onLogin = async () => {
    try {
      // Replace with your API endpoint
      setLoading(true);      
      const res = await axios.post("/api/users/login", user);
      console.log(res.data);
      router.push("/profile"); // redirect after login
    } catch (error: any) {
      console.error(error);
      alert("Login failed!");
    }finally
    {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-amber-500">{loading ? "Processing" : "Login"}</h1>
        
        <div className="flex flex-col gap-4">
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
            />
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
            />
          </div>

          {/* Submit Button */}
          <button
            onClick={onLogin}
            className="bg-amber-500 text-white font-bold py-3 rounded-lg hover:bg-amber-600 transition-colors"
          >
            Login
          </button>
        </div>

        <p className="text-sm text-gray-500 text-center mt-4">
          Don't have an account?{" "}
          <Link href="/signup" className="text-amber-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
