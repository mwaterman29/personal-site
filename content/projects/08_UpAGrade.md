# Up-A-Grade

![img](https://i.gyazo.com/a9fd1c89ec9ab49d2ef3d1e03f85f235.png)

An app to help climbers track their progress over time - without ads or needing to pay.



This was a project for COMP.4631 - Mobile App Design II. I worked with my classmate Aidan, as we both climb, and we recognized the need for an app like this. Though [Crimpd](https://www.crimpd.com/) has since eaten our lunch, we still have some utility, insofar as we didn't compromise for monetization, as it was a class project.

We used React Native, as Aidan hadn't used it before - and I wanted to expand my knowledge of React to be able to build cross-platform apps. For styling, we used Tailwind, as there's a finicky but functional plugin to get it working w/ Expo. 



## Motivations and Design Philosophy

Generally, Rock Climbers have a very specific set of needs and priorities when it comes to working out, and existing apps don’t meet those needs. Apps are either too specific to one product, too focused on gaining mass, or don’t serve the needs of climbers. Traditional body-building style bulking and cutting is often too drastic for climbers who want to maintain performance. Periodization is necessary at an elite level, of course, but if I'm trying to push to higher grades, I can't afford to put on anything but pure lean mass. Additionally, workout tracking apps don't really work with the paradigm of climbing. They're too focused on either calories burned or pounds lifted - neither of which are really climbing relevant. Finally - injury prevention. Climbing is a uniquely injury-prone sport - and finger injuries can take you out of climbing for months - so there's a specific focus on both prevention and rehabilitation that is lacking in other solutions.

Consequently, we built our app to support climber-specific needs. We started by integrating functionality from a number of apps:

- workout planning 
- tracking when and where you send new climbs. 

Then, we added novel functionality

- information on training plans for injury prevention/recovery
- tracking of climbing-specific strength and performance metrics
- recommendations for specific ways to get better at climbing



## Creative Process

- For our app, we used React Native. We used TailwindCSS for styling, with code written in Typescript. We built and deployed via Expo, which made it much easier.
- For design work, we used Figma, to generate prototype and mock-up designs of our screens and user tasks.
- We use VSCode to write our code, and various extensions to make it easier, like Intellisense for Tailwind and React.

I'd say Aidan and I worked well as a team. We found the collaborative process to be frictionless, and could easily debug together, come up with ideas, and designate tasks easily between both of us.

We both put a lot of work into the app and are proud of what we accomplished.



## Unit and User testing

Our users said our app was very useful, but only moderately usable. So…

- We simplified the UI, making control options bigger and clearer. 
- We renamed much of the navigation to clarify which screen is necessary. 
- We made sweeping UI improvements that made our design much more consistent, in terms of naming, coloring, and layout. 