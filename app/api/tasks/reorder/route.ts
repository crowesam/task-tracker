// app/api/tasks/reorder/route.ts
import { NextResponse } from "next/server"
import { stackServerApp } from "@/stack"  // Stack Auth instead of NextAuth
import { prisma } from "@/lib/prisma"

export async function POST(request: Request) {
  try {
    // Get authenticated user with Stack Auth
    const user = await stackServerApp.getUser()
    
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }
    
    const { taskId, newOrder } = await request.json()
    
    // Verify the task belongs to the user before reordering
    const task = await prisma.task.findFirst({
      where: {
        id: taskId,
        userId: user.id
      }
    })
    
    if (!task) {
      return NextResponse.json(
        { error: "Task not found or unauthorized" },
        { status: 404 }
      )
    }
    
    // Update the task order
    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: { order: newOrder }
    })
    
    return NextResponse.json(updatedTask)
    
  } catch (error) {
    console.error("Error reordering task:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}