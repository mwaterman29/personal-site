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

export default function ApexBars({ className = '', barCount = 21, baseColor = 210, animationSpeed = 120, width = 900, height = 1000, attenuation = 8, noAnim = false }: ApexBarsProps)
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

	// Helper function to interpolate between green and cyan
	const getBarColor = (index: number) => {
		const distanceFromCenter = Math.abs(index - middleIndex);
		const maxDistance = Math.floor(barCount / 2);
		
		// Interpolation factor: 0 at center (cyan), 1 at edges (green)
		// Apply power function to lean more towards green
		const rawFactor = maxDistance > 0 ? distanceFromCenter / maxDistance : 0;
		const factor = Math.pow(rawFactor, 0.8); // Lower power makes it lean more towards green
		
		// Colors: green [0, 143, 0] at edges, cyan [0, 222, 214] at center
		const green = [0, 143, 0];
		const cyan = [0, 222, 214];
		
		const r = Math.round(cyan[0] + (green[0] - cyan[0]) * factor);
		const g = Math.round(cyan[1] + (green[1] - cyan[1]) * factor);
		const b = Math.round(cyan[2] + (green[2] - cyan[2]) * factor);
		
		return `rgb(${r}, ${g}, ${b})`;
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
				<div className='absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-background/90'></div>
			</div>
		</div>
	);
}
