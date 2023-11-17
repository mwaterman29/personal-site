import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex flex-row min-h-full p-24">
      <div className='flex basis-1/4'>
        <p>image goes here :)</p>
      </div>
      <div className='flex flex-col basis-3/4'>      
        <p className='text-4xl'>Hi, I&#39;m Matt!</p>
        <p className='text-xl my-4'>I&#39;m a developer with a particular affinity for VR tech, Unity editor scripting, computer science education, and Next.js fullstack webdev.</p>
        <p>You can read about my projects in all the areas above on the projects section of this site! Regarding my focus areas, I built some interesting stuff. I built
          avatar creation software in Unity, as well as an online marketplace to buy and sell VR assets. I built a Unity VR app for the Quest to teach students about
          data structures and algorithms, and ran a study on its effectiveness. I work on an extension for Spotify to allow for weighting songs on playlists. </p>
        <p className='mt-4'>I graduated from UMass Lowell in three years with a 4.0 GPA. My favorite classes were Databases I and II, Assembly Programming, and Analysis
        of Algorithms. During my time there, I competed as head of the Model UN team, and won an award (top 3 placement)
          at every conference we attended. I joined the UML Indoor Rock Climbing Team, and frequently climb both in and outdoors. I am also an Eagle scout.
        </p>
        <p  className='mt-4'>Personally, I&#39;m deeply passionate about effective non-profit work. I&#39;m on the board of the Lowell Association for the Blind, and have
        done a lot of volunteer work for them as well as the Merrimack Valley Food Bank. I hold a personal attachment towards work in the areas of food insecurity,
        mental health, and accessibility.
        </p>
      </div>
    </main>
  )
}
