'use client';

import { useEffect, useRef } from 'react';

interface ApexBarsProps
{
	className?: string;
	barCount?: number;
	baseColor?: number;
	animationSpeed?: number;
	width?: number;
	height?: number;
	attenuation?: number;
	noAnim?: boolean;
}

export default function ApexBars({
	className = '',
	barCount = 21,
	baseColor = 210,
	animationSpeed = 120,
	width = 900,
	height = 1000,
	attenuation = 8,
	noAnim = false
}: ApexBarsProps)
{
	const apexRef = useRef<HTMLDivElement>(null);

	useEffect(() =>
	{
		if (!apexRef.current || noAnim) return;

		const bars = apexRef.current.querySelectorAll('.apex-bar');
		let position = 0;

		const animateWave = () =>
		{
			bars.forEach((bar, index) =>
			{
				const distance = (index - position + bars.length) % bars.length;
				const scale = distance < bars.length / 2 ? 1 + 0.04 * Math.sin((Math.PI * distance) / (bars.length / 2)) : 1;
				(bar as HTMLElement).style.transform = `scaleY(${scale})`;
			});

			position = (position + 1) % bars.length;
		};

		// Start with a slight delay to avoid initial jarring
		const timeout = setTimeout(() =>
		{
			const interval = setInterval(animateWave, animationSpeed);
			return () => clearInterval(interval);
		}, 500);

		return () => clearTimeout(timeout);
	}, [animationSpeed, barCount, noAnim]);

	const barsArray = Array.from({ length: barCount });
	const middleIndex = Math.floor(barCount / 2);

	// Helper function to interpolate between green, cyan, and purple
	const getBarColor = (index: number) =>
	{
		const distanceFromCenter = Math.abs(index - middleIndex);
		const maxDistance = Math.floor(barCount / 2);

		// Normalize distance: 0 at center, 1 at edges
		const normalizedDistance = maxDistance > 0 ? distanceFromCenter / maxDistance : 0;

		// Hybrid approach: inner 40% uses getRatingColor, outer 60% uses gradient
		if (normalizedDistance <= 0.25) // i ended up adjusting it to 0.3 to make it look natural to my eyes
		{
			// Inner 40%: Use getRatingColor function with ratings 110-130
			// Center bar = 130, edge of inner section = 110
			const rating = 130 - (normalizedDistance / 0.4) * 20; // 130 at center, 110 at 40% mark

			// Import getRatingColor function inline (simplified version)
			const getRatingColorInline = (rating: number) =>
			{
				const colors = {
					cyan: [0, 222, 214],
					purple: [168, 85, 247]
				};

				if (rating === 100)
				{
					return `rgb(${colors.cyan[0]}, ${colors.cyan[1]}, ${colors.cyan[2]})`;
				}
				else if (rating <= 130)
				{
					// 101 - 130 goes from cyan to purple
					const fraction = (rating - 100) / 30;
					const r = Math.round(colors.cyan[0] + (colors.purple[0] - colors.cyan[0]) * fraction);
					const g = Math.round(colors.cyan[1] + (colors.purple[1] - colors.cyan[1]) * fraction);
					const b = Math.round(colors.cyan[2] + (colors.purple[2] - colors.cyan[2]) * fraction);
					return `rgb(${r}, ${g}, ${b})`;
				}
				return `rgb(${colors.purple[0]}, ${colors.purple[1]}, ${colors.purple[2]})`;
			};

			return getRatingColorInline(rating);
		}
		else
		{
			// Outer 60%: Use existing gradient system with original distance values
			const smoothFactor = Math.pow(normalizedDistance, 1); // well no smoothing needed after the change to make it look natural

			// Use the original two-section approach
			const green = [0, 143, 0];
			const cyan = [0, 222, 214];
			const purple = [168, 85, 247];

			let r, g, b;

			// Use a continuous function with slightly more purple bias (0.55 instead of 0.5)
			if (smoothFactor < 0.55)
			{
				// Purple to cyan transition (center to middle) - expanded range
				const t = smoothFactor / 0.55; // 0 to 1
				r = Math.round(purple[0] + (cyan[0] - purple[0]) * t);
				g = Math.round(purple[1] + (cyan[1] - purple[1]) * t);
				b = Math.round(purple[2] + (cyan[2] - purple[2]) * t);
			}
			else
			{
				// Cyan to green transition (middle to edge) - compressed range
				const t = (smoothFactor - 0.55) / 0.45; // 0 to 1
				r = Math.round(cyan[0] + (green[0] - cyan[0]) * t);
				g = Math.round(cyan[1] + (green[1] - cyan[1]) * t);
				b = Math.round(cyan[2] + (green[2] - cyan[2]) * t);
			}

			return `rgb(${r}, ${g}, ${b})`;
		}
	};

	return (
		<div className={`fixed ${className}`} style={{ width, height }}>
			<div className='absolute inset-0 flex items-center justify-center'>
				<div ref={apexRef} className='apex-visualization flex h-full items-end justify-center gap-1 p-4'>
					{barsArray.map((_, i) => (
						<div
							key={i}
							className='apex-bar w-3 rounded-t-md'
							style={{
								height: `${100 - Math.abs(i - middleIndex) * attenuation}%`,
								backgroundColor: getBarColor(i),
								transition: noAnim ? 'none' : 'transform 0.3s ease-in-out'
							}}
						/>
					))}
				</div>
				<div className='absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-black/30'></div>
			</div>
		</div>
	);
}
