# This Site!?!?

![site image](https://i.gyazo.com/7912980e3a167ccd093c2672ea33693b.png)

So meta! But the site serves as a useful test for deployment with Vercel, and a fun challenge for parsing and handling the conversion from markdown to HTML+TailwindCSS.

## Parsing Posts and Projects

I like markdown, and I'm a big fan of both Typora as a ultralight editor, and Obsidian as a note-taking and organizational tool. Consequently, it's easier for me to document my projects with Typora, and parse it onto the site. It's much more preferable for me to type into Typora as I'm doing now than to wrap all my text in HTML tags and Tailwind classnames.

 First, I used remark and rehype to parse these markdown files into HTML.

```tsx
async function markdownToComponent(markdown: string) {    

    const file = await unified()
        .use(remarkParse)
        .use(remarkRehype)
        .use(rehypeDocument)
        .use(rehypeFormat)
        .use(rehypeStringify)
        .data('settings', {fragment: true})
        .use(rehypeHighlight)
        .process(markdown);

    let result = file.toString(); 

```

I may eventually convert this into a rehype plugin, but for now, I've handled syntax highlighting via RegEx. I have a list of patterns that'll wrap certain things - like Unity classes - in span tags, so they can be highlighted.

```tsx
    //Unity code highlighting w/ cs leaves a lot to be desired, so manually highlight some specific things
    
    const unityBuiltInTypes = ['Vector3', 'Quaternion', 'Matrix4x4'];
    const enumTypes = ['EventType']
    const unityCodeRules = [
        //{ pattern: new RegExp(`\\b(${enumTypes.join('|')})\\b`, 'g'), replacement: '<span class=\'hljs-enum\'>$1</span>' },
        //{ pattern: /(\w+)\.(\w+)\(/g, replacement: '<span class=\'hljs-class\'>$1</span>.<span class=\'hljs-method\'>$2</span>(' },
        { pattern: new RegExp(`\\b(${unityBuiltInTypes.join('|')})\\b`, 'g'), replacement: '<span class=\'hljs-built_in\'>$1</span>' },
    ]
        
    // Apply Unity/C# rules
    unityCodeRules.forEach((rule) => {
        result = result.replace(rule.pattern, rule.replacement);
    });
```

Once those are converted, I move onto parsing markdown into tailwind classes, with the usual rules for headers and such.

```tsx
		{ pattern: /<h1>/g, replacement: '<h1 class=\'text-4xl text-white\'>' },
        { pattern: /<\/h1>/g, replacement: '</h1><hr class=\'mb-4\' />' },
        { pattern: /<h2>/g, replacement: '<h2 class=\'text-2xl pt-4\'>' },
        { pattern: /<\/h2>/g, replacement: '</h1><hr class=\'mb-2\' />' },
        { pattern: /<h3>/g, replacement: '<h3 class=\'text-2xl pt-4\'>' },
        { pattern: /<a/g, replacement: '<a class=\'text-blue-300 underline\'' },
        //Lists
        { pattern: /<ul/g, replacement: '<ul class=\'py-2 list-disc\'' },
        { pattern: /<ol/g, replacement: '<ol class=\'py-2 list-decimal\'' },
        { pattern: /<li/g, replacement: '<li class=\'ml-8\'' },
```

Finally, syntax highlighting. Code blocks are wrapped with a background, and then the syntax is highlighted with a mix of the themes I use on VSCode and Visual Studio, since I expect the vast majority of content on the site to be either Typescript or C#.

```tsx
        { pattern: /<pre>/g, replacement: '<pre class=\'bg-slate-900 p-2 mt-2 rounded-md\'>' },  // Code block formatting - I don't use <pre> anywhere else

        { pattern: /hljs language-tsx/g, replacement: 'text-white-200' },  // Default text color
        { pattern: /hljs-title function_/g, replacement: 'text-yellow-200' },  // Function Title
        { pattern: /hljs-function/g, replacement: 'text-yellow-200' },  // Function
        { pattern: /hljs-class/g, replacement: 'text-emerald-500' },  // Function
        { pattern: /hljs-method/g, replacement: 'text-yellow-200' },  // Function

        { pattern: /hljs-enum/g, replacement: 'text-green-300' },  // Enum
        { pattern: /hljs-comment/g, replacement: 'text-green-700' },  // Comment
        { pattern: /hljs-number/g, replacement: 'text-blue-500' },   // Number
        { pattern: /hljs-keyword/g, replacement: 'text-fuchsia-400' }, // Keyword
        { pattern: /hljs-string/g, replacement: 'text-orange-400' },  // String
        { pattern: /hljs-built_in/g, replacement: 'text-sky-500' },  // Built-in type (int, string, etc)
        { pattern: /hljs-params/g, replacement: 'text-cyan-200' },  // Function/method params
        { pattern: /hljs-title class_/g, replacement: 'text-blue-600' },  // Built-in class - Object / Number / Math...
        { pattern: /hljs-property/g, replacement: 'text-teal-500' },  // Property
        { pattern: /hljs-literal/g, replacement: 'text-blue-500' },  // Literal
        { pattern: /hljs-subst/g, replacement: 'text-blue-500' },  // String Interpolation
        { pattern: /hljs-variable language_/g, replacement: 'text-blue-500' },  // Vars
```

Since I trust my own markdown, I apply the code rules, then return the new jsx element.

```tsx
    //XSS? Never heard of it.
    const comp = <div className='flex flex-col'
    dangerouslySetInnerHTML={{__html: result}} 
    />
```

If this all works correctly, all the code above should be nicely highlighted!