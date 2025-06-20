// app/layout.tsx
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { StackProvider, StackTheme } from "@stackframe/stack"  // ← ADD THIS IMPORT
import { stackServerApp } from "@/stack"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Task Tracker",
  description: "Manage your tasks efficiently",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StackProvider app={stackServerApp}>
          <StackTheme>
            {children}
          </StackTheme>
        </StackProvider>
      </body>
    </html>
  )
}