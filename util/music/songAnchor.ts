// Anchor ids for deeplinking into an album review (e.g. /music/<review>?deeplink=<title>).
//
// A song can be anchored in two places on an album page, and the deeplink prefers
// the first one it finds:
//   1. Where it's discussed in the prose - the `<title> !SM` marker.
//   2. Its row in the Track Ratings list, for songs the prose never mentions.
//
// The two use separate prefixes so a song that has both doesn't produce duplicate ids.

function slugify(title: string): string
{
	const slug = title
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');

	// Titles made entirely of symbols (there are a few) slug down to nothing, which
	// would collide across songs. Fall back to a lossless encoding of the title.
	if (slug)
	{
		return slug;
	}

	return Array.from(title)
		.map(char => char.codePointAt(0)!.toString(16))
		.join('-');
}

export function proseAnchorId(title: string): string
{
	return `song-${slugify(title)}`;
}

export function trackAnchorId(title: string): string
{
	return `track-${slugify(title)}`;
}
