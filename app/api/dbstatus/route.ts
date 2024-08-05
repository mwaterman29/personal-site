import { NextRequest, NextResponse } from "next/server";
import { prisma } from '@/prisma/client'

export async function GET(request: NextRequest) {
	const count = await prisma.song.count();

	return NextResponse.json({ count });
}
