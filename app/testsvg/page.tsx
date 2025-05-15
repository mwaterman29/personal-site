import React from 'react';
import { cn } from '@/lib/utils';
import SvgMountain from '@/components/SvgMountain';


export default function TestSvg()
{
	return (
		<div className='flex flex-col items-center justify-center min-h-screen p-4'>
			<h1 className='text-2xl font-bold mb-6'>SVG Mountain Test</h1>

            <div className='flex flex-row items-center justify-center gap-4 relative bg-slate-800 w-[600px] h-[400px] overflow-hidden'>
                <SvgMountain className='absolute left-0 bottom-0 min-h-[300px] min-w-[300px] opacity-70' width={400} height={400} snowLine={0.3} 
                
                />
                <SvgMountain className='z-20 absolute min-h-[400px] min-w-[400px]'  width={300} height={300} snowLine={0.3} snowLineDecorationCount={8}
                cloudLayers={[0.3, 0.5, 0.7]} 
                cloudCurvePercent={25}
                cloudCircleRadius={8}
                />
                <SvgMountain className='absolute right-0 bottom-0 min-h-[300px] min-w-[300px] opacity-70'  width={400} height={400} snowLine={0.3} snowLineDecorationCount={8} snowLineDecorationHeightRatio={0.7} />
            </div>

			{/* <svg className='svg-exclude-size' width='400' height='400' viewBox='0 0 400 400'>
				<polygon points='200,40 360,320 40,320' fill='gray' stroke='gray' strokeWidth='3' />
				<polygon points='200,40 270,160 130,160' fill='white' stroke='white' strokeWidth='1' />
			</svg>

			<p className='mt-4 text-gray-600'>A simple SVG triangle</p> */}
		</div>
	);
}
