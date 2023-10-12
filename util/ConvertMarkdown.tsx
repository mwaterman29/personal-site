function markdownToComponent(markdown: string) {    
    //Conversion rules
    const rules = [
        //Headings
        { pattern: /^# (.+)$/gm, replacement: '<h1 class="text-4xl">$1</h1><hr/>' },
        { pattern: /^## (.+)$/gm, replacement: '<h2 class="text-2xl">$1</h2><hr/>' },
        { pattern: /^### (.+)$/gm, replacement: '<h3 class="text-xl">$1</h3>' },
        { pattern: /^#### (.+)$/gm, replacement: '<h4 class="text-lg">$1</h4>' },
        { pattern: /^##### (.+)$/gm, replacement: '<h5 class="text-md">$1</h5>' },
        { pattern: /^###### (.+)$/gm, replacement: '<h6 class="text-sm text-gray-500">$1</h6>' },

        //Bold & Italic
        { pattern: /\*\*(.+?)\*\*/g, replacement: '<b>$1</b>' },
        { pattern: /\*(.+?)\*/g, replacement: '<i>$1</i>' },

        //Images and Links
        { pattern: /\!\[([^\]]+)\]\(([^)]+)\)/g, replacement: '<Image src="$2" alt="$1" />' },
        { pattern: /\[([^\]]+)\]\(([^)]+)\)/g, replacement: '<Link href="$2">$1</NextLink>' },

        //Code Segments inline, then three backticks
        { pattern: /(`([^`]+)`)(?!(.*``))/g, replacement: '<span class="bg-slate-700 rounded-md p-1">$2</span>' }, // single line
        { pattern: /```([^`]+)```/g, replacement: '<div class="bg-slate-700 rounded-md text-sm p-4 my-2">$1</div>' }, // multiline code snippet

        //Line Breaks -- lazy simple rule for spacing
        { pattern: /\n\s\n\s/g, replacement: '</p><div class="h-4"></div><p>' }, // big spacing for double
        { pattern: /\n\s/g, replacement: '</p><div class="h-1"></div><p>' }, // small spacing for single linebreaks
    ];

    // Apply markdown
    let result = markdown;
    rules.forEach((rule) => {
    result = result.replace(rule.pattern, rule.replacement);
    });

    //XSS? Never heard of it.
    const comp = <div className='flex flex-col'
    dangerouslySetInnerHTML={{__html: result}} 
    />

    return comp;
}

export default markdownToComponent