import Carousel from '@/components/Carousel'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex flex-col lg:flex-row min-h-full p-2 md:p-6 lg:p-12 xl:p-14">
      <div className='flex basis-4/12 mx-4 rounded-md h-1/2 md:h-full'>
        <Carousel
          urls={[
            /*'https://i.gyazo.com/0f24aeb18f1ecd52f50f47c6c527dd91.jpg', //'https://cdn.discordapp.com/attachments/530910055072137266/1178927786690363443/IMG_0738.jpg?ex=6577ed0f&is=6565780f&hm=234a5ffb57fcd512869c938ce2f3b13c755f7759c6da53f5360d34d3c3122d90&',
            'https://i.gyazo.com/db62bfc42b2721441915f0924d098fc6.jpg', //'https://cdn.discordapp.com/attachments/530910055072137266/1178927785088139364/IMG_2897.jpg?ex=6577ed0f&is=6565780f&hm=3ae500720f1d055320900d20fd0029ea3736c1d128d6d20a91c0754d2b1753aa&',
            'https://cdn.discordapp.com/attachments/530910055072137266/1178927785683718234/IMG_7660.jpg?ex=6577ed0f&is=6565780f&hm=de0657bee04c5b6f051d0abfb7d9fe7afc66dc8bd4b1c3968ca25c4529e58840&',
            'https://cdn.discordapp.com/attachments/530910055072137266/1178927786124124290/00A59270-3682-4F70-9139-3FC263C22CE0.jpg?ex=6577ed0f&is=6565780f&hm=bdfd6b90b636d15dbc7089c1f05fac5dfcca883e4b0d9d60686d804f8577303e&',
            'https://i.gyazo.com/968dd60a5edc94ad4306a696b5496a86.jpg', //'https://cdn.discordapp.com/attachments/530910055072137266/1178927878193295360/IMG_8882.jpg?ex=6577ed25&is=65657825&hm=d2c824b56001e288b99a773eba5c4653173bea6cbf5fe56a308e243beeadf416&',
            */
            '/me_1.jpg',
            '/me_2.jpg',
            '/me_3.jpg',
            '/me_4.jpg',
            '/me_5.jpg',
          ]}
          />
      </div>
      <div className='flex flex-col basis-8/12 gap-4'>      
        <p className='text-center lg:text-left text-4xl pt-6 md:pt-0 md:pb-2'>Hi, I&#39;m Matt!</p>

        <p>I work as a Senior Frontend Engineer for <a></a>Maven Bio, a small BioPharma startup based in Boston. 
        I lead the front-end development, and have brought us from an empty repository to signing contracts with major life science consultancies. 
        My specialties there include fully programmatic generation of industry-quality charts and powerpoints, highly efficient filtering of massive enumerative values, and custom datagrids that supplant (and thus obviate the cost of) existing solutions.</p>

        <p>In my previous role, I built software to allow anyone to build high-fidelity virtual reality avatars with support for full body tracking. 
          I also built an online marketplace that integrated with this software via SSO. My strongest work there included developing an algorithm to properly layer 3D meshes (including with weight painting!), a custom framework for editor-integrated UIs in Unity, and developing a lightweight spec that allowed for VR Avatars to be shared and sold.</p>

          <p className=''>I graduated from UMass Lowell in three years with a 4.0 GPA. My favorite classes were Databases I and II, Assembly Programming, and Analysis
        of Algorithms. During my time there, I competed as head of the Model UN team, and won an award (top 3 placement)
          at every conference we attended. I joined the UML Indoor Rock Climbing Team, and frequently climb both in and outdoors. I am also an Eagle scout.
        </p>

        <p>I'm an audiophile and recreational music critic with a wide variety of genres, primarily focused on recent music. 
          You can read my thoughts and opinions on a variety of albums and music-related topics on the Music page, and then argue with me about said opinions via the contact form.</p>

          <p  className=''>Personally, I&#39;m deeply passionate about effective non-profit work. I&#39;m on the board of the Lowell Association for the Blind, and have
        done a lot of volunteer work for them as well as the Merrimack Valley Food Bank. I hold a personal attachment towards work in the areas of food insecurity,
        mental health, and accessibility.
        </p>
      </div>
    </main>
  )
}

/*

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
*/