# VRtex Avatar Engine

![Avatar Engine Unity Screenshot](https://i.imgur.com/alVvlUt.png)

Avatar creation software for the layperson - choose a base, add assets, and publish to your favorite VR social platform in a tenth of the time and with 1% of the effort of 3D modeling software.



### Motivation

The motivation behind this software is the general philosophy at VRtex - enable the end user to express themselves, and make it simple. For dedicated VR users who want a high-fidelity avatar, the options are currently pay a lot for an existing one with little customizability, or pay a huge amount for a bespoke avatar. If you don't have hundreds of hours of experience in Blender, your only option is to pay $100+, which is needless to say, quite steep.

Consequently, we built software that allows anyone to build a highly customizable avatar in a fraction of the time.



### Features

This is a project I've been in charge of for nearing two years, so I won't go in to depth about the whole codebase, but I'll highlight a number of things that set us apart from other avatar creation software.



### Full Body Tracking (FBT) Support

As I mentioned above - we care about dedicated users, many of whom use Full Body Tracking. Just any humanoid rig doesn't work with FBT - and we have from the beginning focused on this as a feature. It's really simple to do in VRtex! All you need to do is to input your height and wingspan, and the avatar will adjust automatically.

![](https://i.gyazo.com/2791a8d65165e8f150601a79dced1f6e.png)

### Per-Bone Editing

![](https://i.gyazo.com/1695fa85d176aa9a6223c7c8f7127225.png)

As we want maximum customizability, every single bone in the avatar can be customized. It'll draw in-scene handles, and sliders on the window to allow for modifications. It'll automatically mirror changes to the other side as well, so your avatar can always be perfectly symmetrical! Bones are grouped into sections, based on the different parts of the body.

### Asset Window

![](https://i.gyazo.com/d4aa6e13c13570faf653873ec7c19bea.png)

Adding assets to the avatar is really simple! All you need to do is click an asset on the window and it'll automatically apply to the avatar. This automatically detects which base you're using, 

As you can read more about [here](https://www.mwaterman.dev/projects/01_VRtex%20Marketplace.md), the assets are automatically downloaded once you purchase them on the site. It automatically unpacks the assets and allows them to be used.



### Auto-Clipping

This feature is actually so cool that I wrote about it separately - [read that here](https://www.mwaterman.dev/posts/01_Asset-To-Asset%20Clipping.md)



### Auto-VRC

Our software also automatically handles almost all of the uploading for you. When you lock in an avatar, it'll optimize the materials, and fill out the VRCSDK for you. This drastically reduces the friction for uploading an avatar into VRChat. We automatically add and populate an avatar descriptor, make toggles for each asset, and prepare the avatar for upload ASAP!



### Quest Compatibility

If you want to make an avatar for the lower-spec quest standards, you can do so!

![](https://i.gyazo.com/83164d3dee4507ab8e694be65b7393c2.png)

If you select a Quest avatar, the software will automatically update the build target, avatar materials, and combine the skinned mesh renderers and do some other secret optimizations to help improve the performance. This is something we're still working on, so quest avatars should get better and better over the next few updates!

