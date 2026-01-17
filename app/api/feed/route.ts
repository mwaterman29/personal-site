import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

const SITE_URL = "https://mwaterman.dev";
const SITE_TITLE = "Matt Waterman's Music Reviews";
const SITE_DESCRIPTION = "Album reviews, single reviews, and essays about music";

type ContentType = "albums" | "singles" | "essays";
type SortOption = "recent" | "rating";

function escapeXml(text: string): string {
	return text
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&apos;");
}

function formatDate(date: Date): string {
	return date.toUTCString();
}

export async function GET(request: NextRequest) {
	try {
		const { searchParams } = new URL(request.url);
		const typeParam = searchParams.get("type");
		const sortParam = searchParams.get("sort") as SortOption | null;

		// Parse type filter (can be comma-separated: "albums,singles")
		const types: ContentType[] = typeParam
			? (typeParam.split(",").filter((t) => ["albums", "singles", "essays"].includes(t)) as ContentType[])
			: ["albums", "singles", "essays"];

		const sort: SortOption = sortParam === "rating" ? "rating" : "recent";

		// Only fetch what we need
		const [albums, singles, essays] = await Promise.all([
			types.includes("albums")
				? prisma.album.findMany({
						include: { artist: true },
						orderBy: { createdAt: "desc" },
					})
				: [],
			types.includes("singles")
				? prisma.song.findMany({
						where: { reviewFile: { not: null } },
						include: { artist: true },
						orderBy: { createdAt: "desc" },
					})
				: [],
			types.includes("essays")
				? prisma.essay.findMany({
						orderBy: { createdAt: "desc" },
					})
				: [],
		]);

		// Combine all items
		const items: Array<{
			title: string;
			link: string;
			description: string;
			pubDate: Date;
			category: string;
			imageUrl?: string;
			rating?: number;
		}> = [];

		// Add album reviews
		for (const album of albums) {
			items.push({
				title: `${album.title} - ${album.artist.name}`,
				link: `${SITE_URL}/music/${encodeURIComponent(album.artist.name)} - ${encodeURIComponent(album.title)}`,
				description: `Album review of "${album.title}" by ${album.artist.name}. Rating: ${album.rating.toFixed(2)}`,
				pubDate: album.createdAt,
				category: "Album Review",
				imageUrl: album.imageLink,
				rating: album.rating,
			});
		}

		// Add single reviews
		for (const single of singles) {
			items.push({
				title: `${single.title} - ${single.artist.name}`,
				link: `${SITE_URL}/music/${encodeURIComponent(single.artist.name)} - ${encodeURIComponent(single.title)}`,
				description: `Single review of "${single.title}" by ${single.artist.name}. Rating: ${single.rating.toFixed(2)}`,
				pubDate: single.createdAt,
				category: "Single Review",
				imageUrl: single.imageLink || undefined,
				rating: single.rating,
			});
		}

		// Add essays
		for (const essay of essays) {
			items.push({
				title: essay.title,
				link: `${SITE_URL}/music/essays/${encodeURIComponent(essay.fileLink)}`,
				description: essay.description || `Essay: ${essay.title}`,
				pubDate: essay.createdAt,
				category: "Essay",
				imageUrl: essay.imageLink,
			});
		}

		// Sort items
		if (sort === "rating") {
			// Sort by rating (highest first), essays without ratings go to the end
			items.sort((a, b) => (b.rating ?? -1) - (a.rating ?? -1));
		} else {
			// Sort by date (newest first)
			items.sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());
		}

		// Build RSS XML
		const rssItems = items
			.map(
				(item) => `
    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${escapeXml(item.link)}</link>
      <description>${escapeXml(item.description)}</description>
      <pubDate>${formatDate(item.pubDate)}</pubDate>
      <category>${escapeXml(item.category)}</category>
      <guid isPermaLink="true">${escapeXml(item.link)}</guid>${
				item.imageUrl
					? `
      <enclosure url="${escapeXml(item.imageUrl)}" type="image/jpeg" />`
					: ""
			}
    </item>`
			)
			.join("");

		// Build feed title based on filters
		const titleParts: string[] = [];
		if (types.length < 3) {
			titleParts.push(types.map((t) => t.charAt(0).toUpperCase() + t.slice(1)).join(" & "));
		}
		if (sort === "rating") {
			titleParts.push("Top Rated");
		}
		const feedTitle = titleParts.length > 0 ? `${SITE_TITLE} - ${titleParts.join(" - ")}` : SITE_TITLE;

		// Build self URL with current params
		const selfUrl = new URL(`${SITE_URL}/api/feed`);
		if (typeParam) selfUrl.searchParams.set("type", typeParam);
		if (sortParam) selfUrl.searchParams.set("sort", sortParam);

		const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(feedTitle)}</title>
    <link>${SITE_URL}/music</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>en-us</language>
    <lastBuildDate>${formatDate(new Date())}</lastBuildDate>
    <atom:link href="${escapeXml(selfUrl.toString())}" rel="self" type="application/rss+xml" />${rssItems}
  </channel>
</rss>`;

		return new NextResponse(rss, {
			headers: {
				"Content-Type": "application/rss+xml; charset=utf-8",
				"Cache-Control": "s-maxage=3600, stale-while-revalidate",
			},
		});
	}
	catch (error) {
		console.error("Error generating RSS feed:", error);
		return NextResponse.json({ error: "Error generating feed" }, { status: 500 });
	}
}
