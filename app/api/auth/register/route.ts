// 

import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/prisma"

export async function POST(request: NextRequest) {
  try {
    console.log("Registration API called")
    
    const body = await request.json()
    console.log("Request body:", { ...body, password: "[HIDDEN]" })
    
    const { email, password, name } = body
    
    if (!email || !password) {
      console.log("Missing email or password")
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      )
    }
    
    console.log("Checking for existing user...")
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })
    
    if (existingUser) {
      console.log("User already exists")
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      )
    }
    
    console.log("Hashing password...")
    const hashedPassword = await bcrypt.hash(password, 12)
    
    console.log("Creating user...")
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      }
    })
    
    console.log("User created successfully:", { id: user.id, email: user.email })
    
    return NextResponse.json({
      message: "User created successfully",
      user: { id: user.id, email: user.email, name: user.name }
    })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json(
      { 
        error: "Internal server error", 
        details: typeof error === "object" && error !== null && "message" in error ? (error as { message: string }).message : String(error)
      },
      { status: 500 }
    )
  }
}