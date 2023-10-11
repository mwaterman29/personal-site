import Image from 'next/image'
import { readdirSync, readFileSync } from 'fs';
import path from 'path';

export default function Projects() {

    const directoryPath = path.join(process.cwd(), 'content', 'projects');
    const fileNames = readdirSync(directoryPath);

    const files = fileNames.map(fname => readFileSync(path.join(directoryPath, fname), 'utf8'));

    return (
    <main className="flex flex-col min-h-full">
        <p className=''>intro goes here</p>
        {files.map((data, _index) => {
            const res = convertMarkdownToTailwind(data)
            return (
                res
            )
        })}
    </main>
    )

    function convertMarkdownToTailwind(markdown: string) {
        
        //Conversion rules
        const rules = [
            //Headers
            { pattern: /^# (.+)$/gm, replacement: '<h1 class="text-4xl">$1</h1><hr/>' },
            { pattern: /^## (.+)$/gm, replacement: '<h2 class="text-2xl">$1</h2><hr/>' },
            { pattern: /^### (.+)$/gm, replacement: '<h3 class="text-xl">$1</h3>' },
            { pattern: /^#### (.+)$/gm, replacement: '<h4 class="text-lg">$1</h4>' },
            { pattern: /^##### (.+)$/gm, replacement: '<h5 class="text-md">$1</h5>' },
            { pattern: /^###### (.+)$/gm, replacement: '<h6 class="text-sm text-gray-500">$1</h6>' },
            //Bold & Italic
            { pattern: /\*\*(.+?)\*\*/g, replacement: '<span class="font-bold">$1</span>' },
            { pattern: /\*(.+?)\*/g, replacement: '<span class="italic">$1</span>' },

            //Images and Links
            { pattern: /\!\[([^\]]+)\]\(([^)]+)\)/g, replacement: '<Image src="$2" alt="$1" />' },
            { pattern: /\[([^\]]+)\]\(([^)]+)\)/g, replacement: '<Link href="$2">$1</NextLink>' },

            //Code Segments inline, then three backticks
            { pattern: /(`([^`]+)`)(?!(.*``))/g, replacement: '<span class="bg-slate-700 rounded-md p-1">$2</span>' }, // single line
            { pattern: /```([^`]+)```/g, replacement: '<div class="bg-slate-700 rounded-md text-sm p-4 my-2">$1</div>' }, // multiline code snippet

            //Line Breaks -- lazy simple rule for spacing
            { pattern: /\n\s\n\s/g, replacement: '<div class="h-4"></div>' }, // Add spacing for linebreaks
            { pattern: /\n\s/g, replacement: '<div class="h-1"></div>' }, // Add spacing for linebreaks
        ];


        // Apply conversion rules
        let result = markdown;
        rules.forEach((rule) => {
        result = result.replace(rule.pattern, rule.replacement);
        });

        // Wrap the entire content in <p> tags
        const comp = <div className='p-4'
        dangerouslySetInnerHTML={{__html: result}} 
        />

        return comp;
    }
}

export const revalidate = 86400;