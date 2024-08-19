//https://open.spotify.com/album/2cwwBz019F7hQwggBShXCv?si=3Q92S4C1TnOb7F6eFUuYeA

import { NextRequest, NextResponse } from "next/server";
import { prisma } from '@/prisma/client'
import getSpotifyAlbumData from "@/util/spotify/album";

export async function GET(request: NextRequest) 
{
    const id = '2cwwBz019F7hQwggBShXCv';

    const data = await getSpotifyAlbumData(id);

    return NextResponse.json(data);

}
