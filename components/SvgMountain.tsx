import { cn } from '@/lib/utils';

interface SvgMountainProps extends React.SVGProps<SVGSVGElement>
{
	width: number;
	height: number;

	color?: string;

	snowLine?: number;
	snowLineDecorationCount?: number;
	snowLineDecorationHeightRatio?: number;
	
	// Cloud decoration props
	cloudLayers?: number[];        // Array of height percentages for cloud layers
	cloudCurvePercent?: number;    // How much the clouds curve down (0 = straight line)
	cloudCircleRadius?: number;    // Radius of each cloud circle
	cloudCircleDensity?: number;   // Controls how many circles per unit width
	cloudWidthFactor?: number;     // Factor to control overall cloud width (higher = wider)
	showBackClouds?: boolean;      // Whether to show clouds on the back side
}

const SvgMountain = ({
	width,
	height,
	color = 'gray',
	snowLine = 0.2,
	snowLineDecorationCount = 4,
	snowLineDecorationHeightRatio = 0.5,
	cloudLayers = [],
	cloudCurvePercent = 15,
	cloudCircleRadius = 10,
	cloudCircleDensity = 2.2,
	cloudWidthFactor = 1.2,
	showBackClouds = true,
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

	// Generate cloud circles for a layer
	const generateCloudCircles = (layerHeightPercent: number, layerIndex: number, isBackSide: boolean = false) => {
		const layerY = height * layerHeightPercent;
		
		// Calculate mountain width at this height (reversed attenuation - wider at top)
		const mountainWidthAtHeight = width * (layerY / height) * 0.9;
		
		// Apply width factor and ensure minimum width
		const layerWidth = Math.max(mountainWidthAtHeight, width * 0.4) * cloudWidthFactor;
		const startX = (width - layerWidth) / 2;
		
		// Calculate number of circles based on available width and desired density
		const circlesCount = Math.max(5, Math.round(layerWidth * cloudCircleDensity / (2 * cloudCircleRadius)));
		
		// Create circles for the layer
		return Array.from({ length: circlesCount }, (_, i) => {
			// Calculate position along curved line
			const progress = i / (circlesCount - 1);
			const x = startX + progress * layerWidth;
			
			// Apply curve (parabola shape)
			const curveMagnitude = (layerWidth / 2) * (cloudCurvePercent / 100);
			const curveOffset = curveMagnitude * Math.sin(Math.PI * progress);
			
			// For back side, invert the curve
			const y = isBackSide ? (layerY - curveOffset) : (layerY + curveOffset);
			
			return (
				<circle 
					key={`cloud-${isBackSide ? 'back' : 'front'}-${layerIndex}-${i}`} 
					cx={x} 
					cy={y} 
					r={cloudCircleRadius} 
					fill="white" 
				/>
			);
		});
	};

	// Create SVG defs for clipping paths
	const createClipPath = () => (
		<defs>
			<clipPath id="mountain-mask">
				<polygon points={`${top[0]},${top[1]} ${bottomLeft[0]},${bottomLeft[1]} ${bottomRight[0]},${bottomRight[1]}`} />
			</clipPath>
		</defs>
	);

	// The base mountain
	const mountainBase = (
		<polygon points={`${top[0]},${top[1]} ${bottomLeft[0]},${bottomLeft[1]} ${bottomRight[0]},${bottomRight[1]}`} fill={color} />
	);

	// The snow cap
	const snowCap = (
		<polygon
			points={`${top[0]},${top[1]} ${snowLineBottomLeft[0]},${snowLineBottomLeft[1]} ${snowLineBottomRight[0]},${snowLineBottomRight[1]}`}
			fill={'white'}
		/>
	);

	// The triangular decorations
	const triangleDecorations = decorationPoints.map((points, i) => (
		<polygon key={`decoration-${i}`} points={points.map(p => `${p[0]},${p[1]}`).join(' ')} fill='white' />
	));

	return (
		<svg className={cn('svg-exclude-size', props.className)} width={width} height={height} viewBox={`-10 -10 ${width + 20} ${height + 20}`} {...props}>
			{createClipPath()}
			
			{/* RENDERING ORDER MATTERS FOR Z-INDEX */}
			
			{/* 1. Back clouds (outside the mountain, not clipped) */}
			{showBackClouds && cloudLayers.map((layer, idx) => (
				<g key={`back-cloud-${idx}`}>
					{generateCloudCircles(layer, idx, true)}
				</g>
			))}
			
			{/* 2. Mountain base */}
			{mountainBase}
			
			{/* 3. Mountain snow cap and decorations */}
			{snowCap}
			{triangleDecorations}
			
			{/* 4. Front clouds */}
			{cloudLayers.map((layer, idx) => (
				<g key={`front-cloud-${idx}`}>
					{generateCloudCircles(layer, idx, false)}
				</g>
			))}
		</svg>
	);
};

export default SvgMountain;