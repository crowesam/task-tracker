// components/SessionWrapper.tsx

// Option 1: If this component was just wrapping SessionProvider, DELETE THIS FILE
// Stack Auth uses StackProvider in your root layout instead

// Option 2: If you need a wrapper component for auth state, here's the Stack Auth version:
"use client"
import { useUser } from "@stackframe/stack"
import { ReactNode } from "react"

export default function SessionWrapper({ children }: { children: ReactNode }) {
  const user = useUser()
  
  // You can add any auth-related logic here
  // For example, showing a loading state while auth is being checked
  if (user === undefined) {
    return <div>Loading authentication...</div>
  }
  
  return <>{children}</>
}

// BUT HONESTLY, you probably don't need this file anymore with Stack Auth
// The StackProvider in your root layout handles everything