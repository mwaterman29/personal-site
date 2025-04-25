import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  // If this isn't local, return an error
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ error: "This endpoint is only available locally" }, { status: 400 });
  }

  try {
    const singles = await prisma.song.findMany({
      where: {
        albumId: null,  // Only get songs that are not part of an album
      },
      select: {
        id: true,
        title: true,
        rating: true,
      },
      orderBy: {
        title: 'asc',
      },
    });

    return NextResponse.json(singles);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error fetching singles" }, { status: 500 });
  }
} 