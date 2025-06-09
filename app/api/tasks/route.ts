// app/api/tasks/reorder/route.ts
import { NextRequest, NextResponse } from "next/server"
import { stackServerApp } from "@/stack"
import { prisma } from "@/lib/prisma"

export async function POST(request: NextRequest) {
  try {
    // Get the authenticated user with Stack Auth
    const user = await stackServerApp.getUser()
    
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }
    
    const { taskIds } = await request.json()
    
    if (!Array.isArray(taskIds)) {
      return NextResponse.json(
        { error: "taskIds must be an array" },
        { status: 400 }
      )
    }
    
    // Update task order in database
    const updatePromises = taskIds.map((taskId: string, index: number) =>
      prisma.task.updateMany({
        where: {
          id: taskId,
          userId: user.id, // Ensure user owns the task
        },
        data: {
          order: index,
        },
      })
    )
    
    await Promise.all(updatePromises)
    
    return NextResponse.json({ 
      success: true, 
      message: "Tasks reordered successfully" 
    })
    
  } catch (error) {
    console.error("Task reorder error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}