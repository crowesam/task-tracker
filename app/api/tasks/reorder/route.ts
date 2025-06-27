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
   //Sam added 6/26/25 to fix user id issue 
   // DEBUG: Log the user data
    console.log('Stack Auth User:', {
      id: user.id,
      email: user.primaryEmail,
      // Add any other user properties you want to see
    });

 // DEBUG: Check if user exists in database
    const dbUser = await prisma.user.findUnique({
      where: { id: user.id }
    });
    console.log('Database User:', dbUser);


  if (!dbUser) {
      console.error('User not found in database:', user.id);
      return NextResponse.json(
        { error: "User not found in database" },
        { status: 404 }
      );
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