# VRtex Marketplace

![Marketplace Screenshot](https://i.imgur.com/Nb2pypW.png)

Online marketplace for Virtual Reality assets - pairs directly with the VRtex Avatar Engine, allowing avatar creators to share their assets and make money.

The stack is as follows:

- Next.js for full-stack development, with various relevant packages, including:

  - Next-Auth (soon to be Auth.js) for sign-in
  - TailwindCSS for styling and theming
  - Prisma for database connection

  

- Hosted on AWS Elastic Beanstalk - load balancer that will spin up EC2 containers that host the site, based on traffic. We have a staging and prod. environment.

- Asset Files and Images are stored on S3.

- Database solution is PostgreSQL on RDS, managed externally by pgAdmin, mainly queried by a prisma client on the site.

- CI/CD uses CodePipeline that pulls from a private git repository, and automatically deploys to EB.

- Payment solution is Stripe.

  

Importantly, the backend also connects straight to Unity. Assets are not simply .fbx files, unlike other marketplaces. We have a "proprietary" asset filetype, which are stored on S3, and streamed directly to the unity editor where they're unpacked and deserialized at runtime. Mainly, this is for security, so that if one person buys an asset, they can't just send the file to all their friends. 



As the lead of a team of three developers, one of which was a co-op and could only work with us for six months, and the other was busy being the CEO of the company, most of the work was in my hands for this project. I had to learn a *lot* to make this project work. I had limited experience in cloud deployment, CI/CD, and managing a full-stack web app, so there was a lot of learning-as-we-go. Some early good choices led to avoiding technical debt, though, and development was about as smooth as could be expected given the circumstances.

![](https://marketplace.vrtexstudios.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fhomebanner-cropped.2e58bf8e.png&w=3840&q=75)

