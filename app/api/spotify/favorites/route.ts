import { NextRequest, NextResponse } from "next/server";
import { prisma } from '@/prisma/client'
import getSpotifyAlbumData from "@/util/spotify/album";
import fetchFavorites from "@/util/spotify/fetch_favorites";

export const revalidate = 3600;

export async function GET(request: NextRequest) 
{
    const favorites = await fetchFavorites();

    const response = NextResponse.json(favorites);

    response.headers.set('Cache-Control', `public, s-maxage=${revalidate}, stale-while-revalidate=${revalidate}`);

    return response;
}