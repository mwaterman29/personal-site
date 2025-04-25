import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  // If this isn't local, return an error
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ error: "This endpoint is only available locally" }, { status: 400 });
  }

  try {
    const albums = await prisma.album.findMany({
      select: {
        id: true,
        title: true,
        rating: true,
        songs: {
          select: {
            id: true,
            title: true,
            rating: true,
          },
        },
      },
      orderBy: {
        title: 'asc',
      },
    });

    return NextResponse.json(albums);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error fetching albums" }, { status: 500 });
  }
} 