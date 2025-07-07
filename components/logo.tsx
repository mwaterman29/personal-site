import { cn } from "@/lib/utils"

const Logo = ({ className, innerStrokeWidth, outerStrokeWidth }: { className?: string, innerStrokeWidth?: number, outerStrokeWidth?: number }) =>
{
	return (
		<svg
			className={cn('w-full max-w-4xl h-48 svg-exclude-fill', className)}
			viewBox='0 0 400 400'
			xmlns='http://www.w3.org/2000/svg'
			stroke='white'
			fill='none'
			stroke-width={outerStrokeWidth}
		>
			<circle cx='200' cy='200' r='180' />
			<path
				stroke-width={innerStrokeWidth}
				d='
M20,200 
L40,200
C75,200,75,300,100,300
C125,300,125,80,150,80
C175,80,175,320,200,320
C225,320,225,80,250,80 
C275,80,275,300,300,300
C325,300,325,200,350,200
L380,200
'
			/>
			{/* <line x1='200' y1='20' x2='200' y2='380' stroke-width='1' stroke='white' /> */}
		</svg>
	);
};

export default Logo;