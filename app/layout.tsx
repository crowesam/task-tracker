import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import SessionWrapper from "@/components/SessionWrapper"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Task Tracker",
  description: "Track your tasks and progress",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionWrapper>
          {children}
        </SessionWrapper>
      </body>
    </html>
  )
}