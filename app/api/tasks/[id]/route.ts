// app/api/tasks/[id]/route.ts
import { NextResponse } from "next/server"
import { stackServerApp } from "@/stack"
import { prisma } from "@/lib/prisma"

// GET a specific task
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }  // ← Note: Promise wrapper for Next.js 15
) {
  try {
    const user = await stackServerApp.getUser()
    
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }
    
    const { id } = await params  // ← Await the params
    
    const task = await prisma.task.findFirst({
      where: {
        id: id,
        userId: user.id
      }
    })
    
    if (!task) {
      return NextResponse.json(
        { error: "Task not found" },
        { status: 404 }
      )
    }
    
    return NextResponse.json(task)
    
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

// UPDATE a task
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }  // ← Promise wrapper
) {
  try {
    const user = await stackServerApp.getUser()
    
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }
    
    const { id } = await params  // ← Await the params
    const data = await request.json()
    
    const task = await prisma.task.updateMany({
      where: {
        id: id,
        userId: user.id
      },
      data: {
        title: data.title,
        description: data.description,
        completed: data.completed,
        priority: data.priority,
        updatedAt: new Date()
      }
    })
    
    if (task.count === 0) {
      return NextResponse.json(
        { error: "Task not found or unauthorized" },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ success: true })
    
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

// DELETE a task
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }  // ← Promise wrapper
) {
  try {
    const user = await stackServerApp.getUser()
    
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }
    
    const { id } = await params  // ← Await the params
    
    const deleted = await prisma.task.deleteMany({
      where: {
        id: id,
        userId: user.id
      }
    })
    
    if (deleted.count === 0) {
      return NextResponse.json(
        { error: "Task not found or unauthorized" },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ success: true })
    
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}