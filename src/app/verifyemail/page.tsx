"use client"
import axios from "axios"
import Link from "next/link"
import { useState, useEffect } from "react"

export default function VerifyEmailPage() {
  const [token, setToken] = useState("")
  const [verified, setVerified] = useState(false)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token })
      setVerified(true)
    } catch (err: any) {
      setError(true)
      console.error(err.response?.data || err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1]
    if (urlToken) {
      setToken(urlToken)
    } else {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail()
    }
  }, [token])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-6 text-amber-500">
          Verify Email
        </h1>

        {loading && (
          <p className="text-gray-600">Verifying your email...</p>
        )}

        {!loading && verified && (
          <div>
            <h2 className="text-xl font-semibold text-green-600 mb-4">
              ✅ Email Verified Successfully
            </h2>
            <Link
              href="/login"
              className="inline-block bg-amber-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-amber-600 transition-colors"
            >
              Go to Login
            </Link>
          </div>
        )}

        {!loading && error && (
          <div>
            <h2 className="text-xl font-semibold text-red-600 mb-4">
              ❌ Invalid or Expired Token
            </h2>
            <p className="text-gray-500 mb-4">
              Please request a new verification email.
            </p>
            <Link
              href="/signup"
              className="inline-block bg-amber-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-amber-600 transition-colors"
            >
              Sign Up Again
            </Link>
          </div>
        )}

        {!loading && !verified && !error && (
          <p className="text-gray-600">No token found in the URL.</p>
        )}
      </div>
    </div>
  )
}
