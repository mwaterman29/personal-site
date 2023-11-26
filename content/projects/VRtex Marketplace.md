# VRtex Marketplace

![Marketplace Screenshot](https://i.imgur.com/Nb2pypW.png)

Online marketplace for Virtual Reality assets - pairs directly with the VRtex Avatar Engine, allowing avatar creators to share their assets and make money.

This project really came together with no resources, which I'm definitely proud of. I had little prior experience in web development, and with such a small team, I wasn't particularly able to hand much off to other people. Despite this, the website was delivered, functionally, on time, and continues to be updated and supported without issue. To get here, I had to learn a ton about web development, CI/CD, web hosting, cloud computing, and really dive deep on Next.js and Typescript. From a professional development point of view, it was useful too - overseeing a major project like this from the ground up mandates that you have a good grip on communication, delegating tasks, and meeting deadlines.

I'll go over the stack first, then go over what I learned through implementing each part.
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

## Next.js

Next.js was a good choice for this project, and I'm glad that I decided to use it. For a project where we knew we'd have to do a lot to scrap it together, the ability to have an all-in-one front and backend solution, easy api routes, easy configuration of different rendering solutions (CSR vs ISR vs SSR), as well as good documentation made it a good choice.

Additionally, the existence of Next-Auth made our lives a LOT easier. Since we already need the users to sign into our software, and the VRChat community is very discord-oriented, having authentication through discord handled by a reputable plug-and-play source really helped us get off the ground quickly. Next-auth also connects to our database easily via a Prisma adapter, which I'll talk about next.

## Prisma

Due to past experience of both me and our co-op, we chose a PostgreSQL database for this project. We were well aware from the start that there'd be a big database that would need to be up 24/7. Figuring out how to run that on AWS was... fine. I'll complain more about AWS later, undoubtedly. Prisma was an absolute blessing for this project. Usually, AWS database connections can be finicky if you're lucky, nightmarish if you're unlucky. (lucky: read, certified.) With prisma, the connection is trivial. As an ORM, (object-relational mapping), we had a code-side representation of the database which made life a lot easier. The ability to debug queries with a compilation error instead of a cryptic message from the SQL server is unbelievably better.

## S3, and streaming assets to Unity

Since we have a vested interest in protecting creators assets and intellectual property, we have a custom filetype for encrypted assets. These .vrtexasset files are uploaded to S3 via our website, and then streamed directly into Unity. When you sign into our software in Unity, it checks the site for your owned assets, and returns a presigned URL for each.

```ts
      await Promise.all(ownedAssets.map(async (owns) => { 
        const assetUrlAndMetadata = await GetSignedURLWithMetadata(owns.asset_id, 'asset');
        objectsWithUrls.push({
          id: owns.asset_id,
          url: assetUrlAndMetadata.fileUrl,
          name: assetUrlAndMetadata.fileName,
          size: assetUrlAndMetadata.fileSizeInBytes
        })
      }));
```

Then, on the Unity side, if the file doesn't exist, or the filesize changed (e.g., the file is updated), then it's downloaded and unpacked.

```cs
    if (extension == ".vrtexasset")
    {
        targetPath = Path.Combine(ASSETS_PATH.Split(PATH_SEP));
        writeToFileName = $"{id}{extension}";
        s3folder = "assets";
        previewDestination = Path.Combine("Assets", "Resources", "VRtex Assets", "Marketplace Previews");
    }
    ...
    string path = Path.Combine(targetPath, writeToFileName);
    File.WriteAllBytes(path, webRequest.downloadHandler.data);

```

This was the first time I have had the opportunity to write both the API and the software that uses it. Overall, this system has worked quite well, and people are impressed that the assets import directly into Unity.