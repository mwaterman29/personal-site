'use client';

import { useEffect } from 'react';
import { proseAnchorId, trackAnchorId } from '@/util/music/songAnchor';

// Where the target lands in the viewport, as a fraction of its height. Sits a little
// above centre so there's more of the surrounding paragraph to read below it.
const VIEWPORT_BIAS = 0.32;

interface DeeplinkScrollerProps
{
	/** Raw song title from the `deeplink` query param, already decoded by Next. */
	title?: string;
}

/**
 * Scrolls to the song named by `?deeplink=`, preferring where it's written about in
 * the prose over its row in the Track Ratings list.
 */
const DeeplinkScroller = ({ title }: DeeplinkScrollerProps) =>
{
	useEffect(() =>
	{
		if (!title)
		{
			return;
		}

		let cleanup: (() => void) | undefined;

		// Defer a frame so this lands after the App Router's own scroll-to-top
		// on navigation, and after layout settles.
		const frame = requestAnimationFrame(() =>
		{
			const target = document.getElementById(proseAnchorId(title)) ?? document.getElementById(trackAnchorId(title));

			if (!target)
			{
				return;
			}

			const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

			// scrollIntoView only offers 'start' / 'center', so place it by hand.
			const rect = target.getBoundingClientRect();
			const targetCentre = window.scrollY + rect.top + rect.height / 2;
			const top = Math.max(0, targetCentre - window.innerHeight * VIEWPORT_BIAS);

			window.scrollTo({ top, behavior: reduceMotion ? 'auto' : 'smooth' });
			target.classList.add('deeplink-flash');

			const timer = setTimeout(() => target.classList.remove('deeplink-flash'), 2500);
			cleanup = () =>
			{
				clearTimeout(timer);
				target.classList.remove('deeplink-flash');
			};
		});

		return () =>
		{
			cancelAnimationFrame(frame);
			cleanup?.();
		};
	}, [title]);

	return null;
};

export default DeeplinkScroller;
