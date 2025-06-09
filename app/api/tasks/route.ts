// app/api/route.ts
import { NextResponse } from "next/server"
import { stackServerApp } from "@/stack"  // Import your Stack server app

export async function GET() {
  try {
    // Get the authenticated user with Stack Auth
    const user = await stackServerApp.getUser()
    
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }
    
    // Your API logic here
    return NextResponse.json({
      message: "Authenticated API route",
      userId: user.id,
      userEmail: user.primaryEmail
    })
    
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    // Get the authenticated user with Stack Auth
    const user = await stackServerApp.getUser()
    
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }
    
    const data = await request.json()
    
    // Your POST logic here
    
    return NextResponse.json({ success: true })
    
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}