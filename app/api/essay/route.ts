import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(request: NextRequest)
{
	// If this isn't local, return an error
	if (process.env.NODE_ENV !== 'development')
	{
		return NextResponse.json({ error: 'This endpoint is only available locally' }, { status: 400 });
	}

	const { title, description, imageLink, fileLink, pinned } = await request.json();

	try
	{
		await prisma.essay.create({
			data: {
				title,
				description,
				imageLink,
				fileLink,
				pinned
			}
		});

		return NextResponse.json({ message: 'Essay submitted successfully' });
	}
	catch (error)
	{
		console.error(error);
		return NextResponse.json({ error: 'Error submitting essay' }, { status: 500 });
	}
}
