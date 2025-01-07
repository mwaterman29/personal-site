export const extractEssayDetails = (essayText: string): { title: string; description: string } =>
{
	const lines = essayText
		.split('\n')
		.map(line => line.trim())
		.filter(line => line !== '');
	const title = lines[0];
	const description = lines[1] || '';

	return {
		title,
		description
	};
};
