import React from 'react';
import { cn } from '@/lib/utils';
interface SvgMountainProps extends React.SVGProps<SVGSVGElement> {
    width: number;
    height: number;

    color?: string;

    snowLine?: number;
    snowLineDecorationCount?: number;
    snowLineDecorationHeightRatio?: number;
}

const SvgMountain = ({width, height, color = 'gray', snowLine = 0.2, snowLineDecorationCount = 4, snowLineDecorationHeightRatio = 0.5, ...props}: SvgMountainProps) => 
{
    //Calculate corners
    const top = [width / 2, 0]
    const bottomLeft = [0, height]
    const bottomRight = [width, height]

    // i think i might actually be stupid
    const snowLineY = height * snowLine;
    const snowLineWidth = width * snowLine;
    const snowLineBottomLeft = [top[0] - snowLineWidth / 2, snowLineY]
    const snowLineBottomRight = [top[0] + snowLineWidth / 2, snowLineY]

    //decoration is upsidedown triangles 
    const decorationWidth = snowLineWidth / snowLineDecorationCount;
    const decorationHeight = (width / height) * decorationWidth * snowLineDecorationHeightRatio;

    const decorationPoints = Array.from({length: snowLineDecorationCount}, (_, i) => [
        [snowLineBottomLeft[0] + i * decorationWidth, snowLineBottomLeft[1] - 1],
        [snowLineBottomLeft[0] + (i + 1) * decorationWidth, snowLineBottomLeft[1] - 1],
        [snowLineBottomLeft[0] + (i + 0.5) * decorationWidth, snowLineBottomLeft[1] + decorationHeight],
    ]);

    return (
        <svg className={cn('svg-exclude-size', props.className)} width={width} height={height} viewBox={`-10 -10 ${width + 20} ${height + 20}`} {...props}>
            <polygon points={`${top[0]},${top[1]} ${bottomLeft[0]},${bottomLeft[1]} ${bottomRight[0]},${bottomRight[1]}`} fill={color}/>
            <polygon points={`${top[0]},${top[1]} ${snowLineBottomLeft[0]},${snowLineBottomLeft[1]} ${snowLineBottomRight[0]},${snowLineBottomRight[1]}`} fill={'white'} />
            {decorationPoints.map((points, i) => (
                <polygon key={i} points={points.map(p => `${p[0]},${p[1]}`).join(' ')} fill='white'/>
            ))}
        </svg>
    )
}



export default function TestSvg()
{
	return (
		<div className='flex flex-col items-center justify-center min-h-screen p-4'>
			<h1 className='text-2xl font-bold mb-6'>SVG Mountain Test</h1>

            <div className='flex flex-row items-center justify-center gap-4 relative bg-slate-800 w-[600px] h-[400px] overflow-hidden'>
                <SvgMountain className='absolute left-0 bottom-0 min-h-[300px] min-w-[300px] opacity-70' width={400} height={400} snowLine={0.3} />
                <SvgMountain className='z-20 absolute min-h-[400px] min-w-[400px]'  width={300} height={300} snowLine={0.3} snowLineDecorationCount={8} />
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
