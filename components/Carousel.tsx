"use client"

import React, { useRef, useEffect, useState } from 'react'

type Props = {
    urls: string[]
}

//Yoinked this straight from the work repo :)
export default function Carousel({ urls }: Props) {

    //Displayed Image
    const [index, setIndex] = useState(0);

    function next()
    {
        if(index === urls.length-1)
            setIndex(0);
        else
            setIndex(index + 1);
    }

    function prev()
    {
        if(index === 0)
            setIndex(urls.length-1);
        else
            setIndex(index - 1);
    }

    //L/R arrow listeners
    useEffect(() => {

        //No arrows on single image
        if(urls.length < 2)
            return;

        const handleKeyPress = (event: KeyboardEvent) => {
          if (event.key === 'ArrowRight') {
            next(); 
          } else if (event.key === 'ArrowLeft') {
            prev();
          }
        };
    
        document.addEventListener('keydown', handleKeyPress);
        return () => {
          document.removeEventListener('keydown', handleKeyPress);
        };

      }, [index]);

    return (
        <div className='relative flex grow-0 max-w-full max-h-full overflow-hidden'>
            <div className='flex items-center justify-center w-full h-full '>
                <img
                    className='object-contain items-center justify-center'
                    alt='Preview Image'
                    src={urls[index]}
                />         
            </div>
            {urls.length > 1 && 
            <button className='text-2xl font-bold absolute top-[45%] p-4 right-0' onClick={next}>
                <p>{'>'}</p>
            </button>}
            {urls.length > 1 && 
            <button className='text-2xl font-bold absolute top-[45%] p-4 left-0' onClick={prev}>
                <p>{'<'}</p>
            </button>}
            {urls.length > 1 && 
            <div className='absolute bottom-0 w-full'>
                <div className='flex w-full justify-center'>
                    <div className='w-40 bg-black bg-opacity-40 rounded-md p-4 flex flex-row justify-center gap-2'>
                        {urls.map((_, _i) => {
                            if(index == _i)
                            {
                                return(
                                <button key={`indicator-${_i}`} className='transition-all ease-in-out w-10 bg-gray-300 text-gray-500 h-2' onClick={() => {setIndex(_i)}}></button>
                                )
                            }
                            return(
                                <button key={`indicator-${_i}`} className='transition-all ease-in-out w-4 bg-gray-500 text-gray-500 h-2' onClick={() => {setIndex(_i)}}></button>
                            )
                        })}
                    </div>
                </div>


            </div>}
        </div>
    )
}
