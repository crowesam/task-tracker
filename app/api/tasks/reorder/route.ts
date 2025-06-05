import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function PATCH(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { taskOrders } = await request.json() // Array of {id, order}

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Update all task orders in a transaction
    await prisma.$transaction(
      taskOrders.map((task: { id: string; order: number }) =>
        prisma.task.update({
          where: { 
            id: task.id,
            userId: user.id // Ensure user owns the task
          },
          data: { order: task.order }
        })
      )
    )

    return NextResponse.json({ message: "Tasks reordered successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}