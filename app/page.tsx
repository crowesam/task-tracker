"use client"
import { useUser } from "@stackframe/stack"
import Link from "next/link"

export default function HomePage() {
  const user = useUser()

  if (user === undefined) {
    return <div>Loading...</div>
  }

  if (user === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Task Tracker</h1>
          <div className="space-x-4">
            <Link 
              href="/sign-in"
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700"
            >
              Sign In
            </Link>
            <Link 
              href="/sign-up"
              className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // User is signed in, redirect to dashboard
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl mb-4">Welcome back!</h1>
        <Link 
          href="/dashboard"
          className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  )
}