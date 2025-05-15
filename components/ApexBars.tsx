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
}

export default function ApexBars({ className = '', barCount = 21, baseColor = 210, animationSpeed = 120, width = 900, height = 1000, attenuation = 8 }: ApexBarsProps)
{
	const apexRef = useRef<HTMLDivElement>(null);

	useEffect(() =>
	{
		if (!apexRef.current) return;

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
	}, [animationSpeed, barCount]);

	const barsArray = Array.from({ length: barCount });
	const middleIndex = Math.floor(barCount / 2);

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
								backgroundColor: `hsl(${baseColor + i * 6}, 70%, ${50 + Math.abs(i - middleIndex) * 2}%, 0.7)`,
								transition: 'transform 0.3s ease-in-out'
							}}
						/>
					))}
				</div>
				<div className='absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-background/90'></div>
			</div>
		</div>
	);
}
