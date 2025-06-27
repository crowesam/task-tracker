"use client"
import { useUser } from "@stackframe/stack"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import Dashboard from "../../components/Dashboard"

export default function DashboardPage() {
  const user = useUser()
  const router = useRouter()

  useEffect(() => {
    if (user === null) {
      router.push("/sign-in")  
    }
  }, [user, router])

  if (user === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    )
  }

  const handleSignOut = async () => {
    try {
      await user?.signOut()
    } catch (error) {
      console.error('Sign out failed:', error)
    }
  }

  return <Dashboard user={user} onSignOut={handleSignOut} />
}