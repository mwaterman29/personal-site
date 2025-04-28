import { cn } from '@/lib/utils';

interface SvgMountainProps extends React.SVGProps<SVGSVGElement>
{
	width: number;
	height: number;

	color?: string;

	snowLine?: number;
	snowLineDecorationCount?: number;
	snowLineDecorationHeightRatio?: number;
}

const SvgMountain = ({
	width,
	height,
	color = 'gray',
	snowLine = 0.2,
	snowLineDecorationCount = 4,
	snowLineDecorationHeightRatio = 0.5,
	...props
}: SvgMountainProps) =>
{
	//Calculate corners
	const top = [width / 2, 0];
	const bottomLeft = [0, height];
	const bottomRight = [width, height];

	// i think i might actually be stupid
	const snowLineY = height * snowLine;
	const snowLineWidth = width * snowLine;
	const snowLineBottomLeft = [top[0] - snowLineWidth / 2, snowLineY];
	const snowLineBottomRight = [top[0] + snowLineWidth / 2, snowLineY];

	//decoration is upsidedown triangles
	const decorationWidth = snowLineWidth / snowLineDecorationCount;
	const decorationHeight = (width / height) * decorationWidth * snowLineDecorationHeightRatio;

	const decorationPoints = Array.from({ length: snowLineDecorationCount }, (_, i) => [
		[snowLineBottomLeft[0] + i * decorationWidth, snowLineBottomLeft[1] - 1],
		[snowLineBottomLeft[0] + (i + 1) * decorationWidth, snowLineBottomLeft[1] - 1],
		[snowLineBottomLeft[0] + (i + 0.5) * decorationWidth, snowLineBottomLeft[1] + decorationHeight]
	]);

	return (
		<svg className={cn('svg-exclude-size', props.className)} width={width} height={height} viewBox={`-10 -10 ${width + 20} ${height + 20}`} {...props}>
			<polygon points={`${top[0]},${top[1]} ${bottomLeft[0]},${bottomLeft[1]} ${bottomRight[0]},${bottomRight[1]}`} fill={color} />
			<polygon
				points={`${top[0]},${top[1]} ${snowLineBottomLeft[0]},${snowLineBottomLeft[1]} ${snowLineBottomRight[0]},${snowLineBottomRight[1]}`}
				fill={'white'}
			/>
			{decorationPoints.map((points, i) => (
				<polygon key={i} points={points.map(p => `${p[0]},${p[1]}`).join(' ')} fill='white' />
			))}
		</svg>
	);
};

export default SvgMountain;