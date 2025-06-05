"use client"
import { SessionProvider as NextAuthSessionProvider } from "next-auth/react"

export default function SessionProvider({
  children,
  session,
}: {
  children: React.ReactNode
  session: import("next-auth").Session | null
}) {
  return (
    <NextAuthSessionProvider session={session}>
      {children}
    </NextAuthSessionProvider>
  )
}