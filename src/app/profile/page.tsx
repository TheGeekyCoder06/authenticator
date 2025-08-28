"use client"
import axios from "axios"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const logout = async () => {
    try {
      await axios.get("/api/users/logout")
      toast.success("Logout successful")
      router.push("/login")
    } catch (error: any) {
      console.error(error.message)
      toast.error(error.message || "Logout failed")
    }
  }

  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/users/me")
      setUser(res.data.data) // store full user object
    } catch (err: any) {
      toast.error(err.message || "Failed to fetch user details")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getUserDetails()
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-4 text-amber-500">
          Profile
        </h1>
        <hr className="mb-6 border-gray-200" />

        {loading ? (
          <p className="text-center text-gray-500 mb-6">⏳ Loading...</p>
        ) : user ? (
          <div className="mb-6 text-center">
            <p className="text-gray-700">
              <span className="font-semibold">Name:</span> {user.username}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Email:</span> {user.email}
            </p>
          </div>
        ) : (
          <p className="text-center text-red-500 mb-6">
            Failed to load user
          </p>
        )}

        <div className="flex flex-col gap-3 items-center">
          <button
            onClick={logout}
            className="w-full bg-amber-500 text-white font-semibold px-6 py-3 rounded-lg hover:bg-amber-600 transition-colors shadow-md"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}
