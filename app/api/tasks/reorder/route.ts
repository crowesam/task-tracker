import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { orderedIds }: { orderedIds: string[] } = await req.json();

    // Update each task's `order` value based on its position in the array
    const updates = await Promise.all(
      orderedIds.map((id, index) =>
        prisma.task.update({
          where: { id },
          data: { order: index }, // assuming your Task model has an `order` field
        })
      )
    );

    return NextResponse.json({ success: true, updates });
  } catch (error) {
    console.error("Error reordering tasks:", error);
    return new NextResponse("Failed to reorder tasks", { status: 500 });
  }
}
