import Image from 'next/image'
import Link from 'next/link'

/*
Virtual Resume
switcher between traditional and swag mode
traditional is a direct translation of my resume - (write a parser?)
swag mode (workshop the name :3) will be a card display with a blurb about work experience 
*/

export default function Home() {
  return (
    <main className="flex flex-col min-h-full min-w-full items-center py-12">
        <div className='flex w-full md:w-3/4 xl:w-1/2 flex-col'>
            <div className='opacity-0 animate-fadeIn1'>
                <p className='w-full text-2xl text-center'>Education</p>
                <div className='flex flex-row justify-between'>
                    <p>Bachelor of Science in Computer Science, Minor in Mathematics</p>
                </div>
                <div className='flex flex-row justify-between'>
                    <p>University of Massachusetts Lowell</p>
                    <p>Lowell, MA</p>
                </div>
                <div className='flex flex-row justify-between'>
                    <p>Cumulative GPA: 4.0/4.0</p>
                    <p>September 2020 - May 2023</p>
                </div>
            </div>

            <div className='min-h-[40px]'></div>

            <div className='opacity-0 animate-fadeIn2'>
                <p className='w-full text-2xl text-center'>Work Experience</p>
                <div className='flex flex-row justify-between pt-2'>
                    <Link
                        href="https://www.mavenbio.io/"
                    >
                        <p><span className='underline'>Maven Bio</span>, Senior Frontend Engineer</p>
                    </Link>
                    <p>Feb 2022 - Feb 2024</p>
                </div>
                <p className='text-sm'>Lead developer on the front-end for an AI BioPharma intelligence startup - brought us from empty repository to product market fit.</p>

                <div className='flex flex-row justify-between pt-2'>
                    <Link
                        href="https://www.vrtexstudios.com/"
                    >
                        <p><span className='underline'>VRtex Studios</span>, Chief Technical Officer</p>
                    </Link>
                    <p>Feb 2022 - Feb 2024</p>
                </div>
                <p className='text-sm'>Main developer for Virtual Reality startup, creating avatar and asset creation tools for metaverse applications.</p>

                <div className='flex flex-row justify-between pt-2'>
                    <Link
                        href="https://thecodewiz.com/"
                    >
                        <p><span className='underline'>Code Wiz</span>, Head Lead Coach</p>
                    </Link>
                    <p>June 2021 – Aug 2022</p>
                </div>
                <p className='text-sm'>Develop and test curricula; assist in franchising;  interview, hire, and train new employees.</p>
                <div className='flex flex-row justify-between pt-2'>
                    <p>Lead Coach</p>
                    <p>Feb 2020 – May 2021</p>
                </div>
                <p className='text-sm'>Trained new coaches on platforms of expertise; assisted in curriculum development.</p>
                <div className='flex flex-row justify-between pt-2'>
                    <p>Coding Coach</p>
                    <p>Feb 2018 – Feb 2020</p>
                </div>
                <p className='text-sm'>Taught children computer programming; Ran summer camps.	</p>
            </div>

            <div className='min-h-[40px]'></div>

            <div className='opacity-0 animate-fadeIn3'>
                <p className='w-full text-2xl text-center'>Programming Languages and Tools</p>
                <p>Languages: C#, Typescript, C++, Lua, Java</p>
                <p>Frameworks: Next.js, React, React Native, .NET, .NET Core, </p>
                <p>Software: Unity3D, PostgreSQL and MySQL, GitHub, Android Studio, Roblox Studio</p>
                <p>Tools and Add-ons: TailwindCSS, Prisma, Unity XR Core, Unity Oculus Integration, Spicetify, Rojo</p>
            </div>

            <div className='min-h-[40px]'></div>

            <div className='opacity-0 animate-fadeIn4'>
                <p className='w-full text-2xl text-center'>Projects</p>
                <Link 
                    href={'/projects'}
                >
                    <p className='underline text-center'>See the projects section on this site!</p>
                </Link>
            </div>

            <div className='min-h-[40px]'></div>

            <div className='opacity-0 animate-fadeIn5'>
                <p className='w-full text-2xl text-center'>Extra-Curricular Activity</p>
                <p>UMass Lowell Dean Bergeron International Relations Club (Model UN):</p>
                <p className='text-sm'>Secretary 2021-2022, President 2022-2023,</p>
                <p className='text-sm'>5+ Best/Distinguished/Outstanding delegate awards from conferences in the US, Canada, and Europe.</p>
                <p className='pt-2'>Boy Scouts:  </p>
                <p className='text-sm'>Eagle Scout, Constructed an office for the Merrimack Valley Food Bank for my Eagle Project.</p>
                <p className='text-sm'>Collected thousands of dollars across various fundraisers to provide turkeys, meals for children, pantry supplies, etc.</p>
                <p className='pt-2'>UMass Lowell Rock Climbing Team:  </p>
                <p className='text-sm'>V7 Boulderer</p>
                <p className='pt-2'>Lowell Association for the Blind</p>
                <p className='text-sm'>Board Member, Citation from the Massachusetts Commission for the Blind for volunteer work</p>
            </div>
            
        </div>

    </main>
  )
}
