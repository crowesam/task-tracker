import { NextAuthOptions, Session } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { prisma } from "./prisma"

// Extend the Session type to include user.id
declare module "next-auth" {
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
    }
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        console.log("Attempting to authorize:", credentials?.email) // Debug log
        
        if (!credentials?.email || !credentials?.password) {
          console.log("Missing credentials")
          return null
        }
        
        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email }
          })
          
          console.log("User found:", user ? "Yes" : "No") // Debug log
          
          if (!user) {
            console.log("No user found with email:", credentials.email)
            return null
          }
          
          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          )
          
          console.log("Password valid:", isPasswordValid) // Debug log
          
          if (!isPasswordValid) {
            console.log("Invalid password for user:", credentials.email)
            return null
          }
          
          console.log("Login successful for:", credentials.email)
          return {
            id: user.id,
            email: user.email,
            name: user.name,
          }
        } catch (error) {
          console.error("Auth error:", error)
          return null
        }
      }
    })
  ],
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string
      }
      return session
    },
  },
  debug: true, // Enable debug mode
}