// app/api/tasks/route.ts
import { NextRequest, NextResponse } from "next/server"
import { stackServerApp } from "@/stack-auth"
import { prisma } from "@/lib/prisma"

// Validation function for creating tasks
interface CreateTaskInput {
  title: string;
  description?: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  category: string;
  dueDate?: string | Date | null;
}

function validateCreateTask(data: CreateTaskInput) {
  const errors: string[] = [];
  
  if (!data.title || typeof data.title !== 'string' || data.title.trim().length === 0) {
    errors.push('Title is required');
  }
  if (data.title && data.title.length > 255) {
    errors.push('Title must be less than 255 characters');
  }
  if (!['HIGH', 'MEDIUM', 'LOW'].includes(data.priority)) {
    errors.push('Priority must be HIGH, MEDIUM, or LOW');
  }
  if (!data.category || typeof data.category !== 'string' || data.category.trim().length === 0) {
    errors.push('Category is required');
  }
  if (data.category && data.category.length > 100) {
    errors.push('Category must be less than 100 characters');
  }
  
  if (errors.length > 0) {
    throw new Error(errors.join(', '));
  }
  
  return {
    title: data.title.trim(),
    description: data.description?.trim() || null,
    priority: data.priority,
    category: data.category.trim(),
    dueDate: data.dueDate ? new Date(data.dueDate) : null,
  };
}

// GET all tasks for the authenticated user
export async function GET(request: NextRequest) {
  try {
    const user = await stackServerApp.getUser()
    
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    // Find the database user (same logic as POST)
    let dbUser = await prisma.user.findUnique({
      where: { id: user.id }
    });

    if (!dbUser) {
      // If no user found by Stack Auth ID, try by email
      dbUser = await prisma.user.findUnique({
        where: { email: user.primaryEmail || '' }
      });
    }

    if (!dbUser) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const { searchParams } = new URL(request.url);
    const priority = searchParams.get('priority');
    const category = searchParams.get('category');
    const completed = searchParams.get('completed');
    const sortBy = searchParams.get('sortBy') || 'created-desc';

    // Build Prisma where clause - USE dbUser.id instead of user.id
    const where: import("@prisma/client").Prisma.TaskWhereInput = { userId: dbUser.id };
    
    if (priority && priority !== 'all') {
      // Convert lowercase to uppercase for your enum
      const priorityUpper = priority.toUpperCase();
      if (['HIGH', 'MEDIUM', 'LOW'].includes(priorityUpper)) {
        where.priority = priorityUpper as import("@prisma/client").Priority;
      }
    }
    if (category) {
      where.category = {
        contains: category,
        mode: 'insensitive' // Case-insensitive search
      };
    }
    if (completed !== null && completed !== 'all') {
      where.completed = completed === 'true';
    }

    // Build dynamic sorting
    let orderBy: import("@prisma/client").Prisma.TaskOrderByWithRelationInput[] = [];
    
    switch (sortBy) {
      case 'created-asc':
        orderBy = [{ createdAt: 'asc' }];
        break;
      case 'created-desc':
        orderBy = [{ createdAt: 'desc' }];
        break;
      case 'priority-desc':
        orderBy = [{ priority: 'desc' }, { createdAt: 'desc' }];
        break;
      case 'priority-asc':
        orderBy = [{ priority: 'asc' }, { createdAt: 'desc' }];
        break;
      case 'title-asc':
        orderBy = [{ title: 'asc' }];
        break;
      case 'title-desc':
        orderBy = [{ title: 'desc' }];
        break;
      default:
        // Default: completed tasks last, then by priority, then by creation date
        orderBy = [
          { completed: 'asc' },
          { priority: 'desc' },
          { createdAt: 'desc' }
        ];
    }

    const tasks = await prisma.task.findMany({
      where,
      orderBy
    });

    return NextResponse.json(tasks)
    
  } catch (error) {
    console.error('GET /api/tasks error:', error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
// CREATE a new task
export async function POST(request: NextRequest) {
  try {
    const user = await stackServerApp.getUser()
     
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    // Check if user exists in database, create if not
    let dbUser = await prisma.user.findUnique({
      where: { id: user.id }
    });

    if (!dbUser) {
      try {
        // Auto-create user in database
        dbUser = await prisma.user.create({
          data: {
            id: user.id,
            email: user.primaryEmail || '',
            name: user.displayName || null,
          }
        });
        console.log('Created new user in database:', dbUser.id);
      } catch (emailError) {
        // If email already exists, find that user instead
        dbUser = await prisma.user.findUnique({
          where: { email: user.primaryEmail || '' }
        });
        if (!dbUser) throw emailError;
      }
    }

    // Get the request body and validate
    const body = await request.json()
    const validatedData = validateCreateTask(body);

    // Create the task
    const newTask = await prisma.task.create({
      data: {
        ...validatedData,
        userId: dbUser.id,
      }
    });

    return NextResponse.json(newTask, { status: 201 })
      
  } catch (error) {
    console.error('POST /api/tasks error:', error);
        
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}