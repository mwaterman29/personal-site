import rehypeDocument from 'rehype-document'
import rehypeFormat from 'rehype-format'
import rehypeStringify from 'rehype-stringify'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import {unified} from 'unified'
import {rehype} from 'rehype'
import rehypeHighlight from 'rehype-highlight'

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

    const result = file.toString(); 

    //XSS? Never heard of it.
    const comp = <div className='flex flex-col'
    dangerouslySetInnerHTML={{__html: result}} 
    />

    return comp;
}

export default markdownToComponent