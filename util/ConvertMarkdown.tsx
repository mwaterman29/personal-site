import rehypeDocument from 'rehype-document';
import rehypeFormat from 'rehype-format';
import rehypeStringify from 'rehype-stringify';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import { rehype } from 'rehype';
import rehypeHighlight from 'rehype-highlight';

async function markdownToComponent(markdown: string, extraRules?: any[])
{
	const file = await unified()
		.use(remarkParse)
		.use(remarkRehype)
		.use(rehypeDocument)
		.use(rehypeFormat)
		.use(rehypeStringify)
		.data('settings', { fragment: true })
		.use(rehypeHighlight)
		.process(markdown);

	let result = file.toString();

	//Maybe make a rehype plugin for this
	//Since remark/rehype syntax highlighting spits out classes, need to replace them w/ tailwind classes

	//Unity code highlighting w/ cs leaves a lot to be desired, so manually highlight some specific things

	const unityBuiltInTypes = ['Vector3', 'Quaternion', 'Matrix4x4'];
	const enumTypes = ['EventType'];
	const unityCodeRules = [
		//{ pattern: new RegExp(`\\b(${enumTypes.join('|')})\\b`, 'g'), replacement: '<span class=\'hljs-enum\'>$1</span>' },
		//{ pattern: /(\w+)\.(\w+)\(/g, replacement: '<span class=\'hljs-class\'>$1</span>.<span class=\'hljs-method\'>$2</span>(' },
		{ pattern: new RegExp(`\\b(${unityBuiltInTypes.join('|')})\\b`, 'g'), replacement: "<span class='hljs-built_in'>$1</span>" }
	];

	// Apply Unity/C# rules
	unityCodeRules.forEach(rule =>
	{
		result = result.replace(rule.pattern, rule.replacement);
	});

	const rules = [
		//General rules for handling conversion md -> tailwind
		//Headers/Links
		{ pattern: /<h1>/g, replacement: "<h1 class='text-4xl text-white'>" },
		{ pattern: /<\/h1>/g, replacement: "</h1><hr class='mb-4' />" },
		{ pattern: /<h2>/g, replacement: "<h2 class='text-2xl pt-4'>" },
		{ pattern: /<\/h2>/g, replacement: "</h1><hr class='mb-2' />" },
		{ pattern: /<h3>/g, replacement: "<h3 class='text-2xl pt-4'>" },
		{ pattern: /<a/g, replacement: "<a class='text-blue-300 underline'" },
		//Lists
		{ pattern: /<ul/g, replacement: "<ul class='py-2 list-disc'" },
		{ pattern: /<ol/g, replacement: "<ol class='py-2 list-decimal'" },
		{ pattern: /<li/g, replacement: "<li class='ml-8'" },
		//Linebreak
		{ pattern: /<p>/g, replacement: "<p class='my-2'>" }
	];

	// Apply markdown
	rules.forEach(rule =>
	{
		result = result.replace(rule.pattern, rule.replacement);
	});

	const codeRules = [
		//Code blocks
		{ pattern: /<pre>/g, replacement: "<pre class='bg-slate-900 p-2 mt-2 rounded-md'>" }, // Code block formatting - I don't use <pre> anywhere else

		{ pattern: /"hljs language-tsx"/g, replacement: 'text-white-200' }, // Default text color
		{ pattern: /"hljs-title function_"/g, replacement: 'text-yellow-200' }, // Function Title
		{ pattern: /"hljs-function"/g, replacement: 'text-yellow-200' }, // Function
		{ pattern: /"hljs-class"/g, replacement: 'text-emerald-500' }, // Function
		{ pattern: /"hljs-method"/g, replacement: 'text-yellow-200' }, // Function

		{ pattern: /"hljs-enum"/g, replacement: 'text-green-300' }, // Enum
		{ pattern: /"hljs-comment"/g, replacement: 'text-green-700' }, // Comment
		{ pattern: /"hljs-number"/g, replacement: 'text-blue-500' }, // Number
		{ pattern: /"hljs-keyword"/g, replacement: 'text-fuchsia-400' }, // Keyword
		{ pattern: /"hljs-string"/g, replacement: 'text-orange-400' }, // String
		{ pattern: /"hljs-built_in"/g, replacement: 'text-sky-500' }, // Built-in type (int, string, etc)
		{ pattern: /"hljs-params"/g, replacement: 'text-cyan-200' }, // Function/method params
		{ pattern: /"hljs-title class_"/g, replacement: 'text-blue-600' }, // Built-in class - Object / Number / Math...
		{ pattern: /"hljs-property"/g, replacement: 'text-teal-500' }, // Property
		{ pattern: /"hljs-literal"/g, replacement: 'text-blue-500' }, // Literal
		{ pattern: /"hljs-subst"/g, replacement: 'text-blue-500' }, // String Interpolation
		{ pattern: /"hljs-variable language_"/g, replacement: 'text-blue-500' }, // Vars

		// Spotify embed rule
		{
			pattern: /!SE\s+playlist\/([\w\d]+)\?si=[\w\d]+\s+(\d+)/g,
			replacement:
				'<iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/$1?utm_source=generator" width="100%" height="$2" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>'
		}
	];

	// Apply markdown
	codeRules.forEach(rule =>
	{
		result = result.replace(rule.pattern, rule.replacement);
	});

	//If extra rules are provided, apply them
	if (extraRules)
	{
		extraRules.forEach(rule =>
		{
			console.log(rule);
			result = result.replace(rule.pattern, rule.replacement);
		});
	}

	//XSS? Never heard of it.
	const comp = <div className='flex flex-col' dangerouslySetInnerHTML={{ __html: result }} />;

	return comp;
}

export default markdownToComponent;
