//https://open.spotify.com/album/2cwwBz019F7hQwggBShXCv?si=3Q92S4C1TnOb7F6eFUuYeA
//https://open.spotify.com/album/58iEeJbYd6OBGRM0TiwltL?si=v-8zOk43SvaA1sQyF9eIZw

import { NextRequest, NextResponse } from "next/server";
import { prisma } from '@/prisma/client'
import getSpotifyAlbumData from "@/util/spotify/album";

export async function GET(request: NextRequest) 
{
    const id = '58iEeJbYd6OBGRM0TiwltL';

    const data = await getSpotifyAlbumData(id);

    return NextResponse.json(data);

}
