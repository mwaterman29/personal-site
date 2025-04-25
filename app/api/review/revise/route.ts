import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  // If this isn't local, return an error
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ error: "This endpoint is only available locally" }, { status: 400 });
  }

  try {
    const { type, id, rating, songRatings, revisionNotes } = await request.json();
    
    // Format the revision date as the current time
    const revisionDate = new Date();

    if (type === "album") {
      // Update the album rating
      await prisma.album.update({
        where: { id: parseInt(id) },
        data: {
          rating,
          revision_date: revisionDate,
          revision_notes: revisionNotes,
        },
      });

      // Update each song's rating if it exists in the songRatings array
      if (songRatings && songRatings.length > 0) {
        for (const songRating of songRatings) {
          await prisma.song.update({
            where: { id: parseInt(songRating.id) },
            data: {
              rating: songRating.rating,
              revision_date: revisionDate,
            },
          });
        }
      }

      return NextResponse.json({ message: "Album rating revised successfully" });
    } else if (type === "single") {
      // Update the single song rating
      await prisma.song.update({
        where: { id: parseInt(id) },
        data: {
          rating,
          revision_date: revisionDate,
          revision_notes: revisionNotes,
        },
      });

      return NextResponse.json({ message: "Single rating revised successfully" });
    } else {
      return NextResponse.json({ error: "Invalid type. Must be 'album' or 'single'" }, { status: 400 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error revising rating" }, { status: 500 });
  }
} 