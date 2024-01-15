# Asset-To-Asset Clipping

![](https://i.gyazo.com/0aed1d4f9870d21c78a319f35d0f31ea.png)

An algorithm for finding and eliminating clipping between 3D meshes, optimized for VR avatars.



### Overview

Since this work is valuable IP for VRtex, and we have competition in exactly this area (hi METATAILOR!), this post will serve more to document the work and feature than it will to show the inner workings of the algorithm. 

The general gist is that for our avatars that are composed of assets from a number of artists, there's no guarantee that assets will layer nicely. Imagine if in real life, your shirt showed through your winter jacket - it doesn't make any sense. To allow maximum creative freedom for the end user, we needed to find a solution for handling asset to asset clipping.



### Finding Clipping

![img](https://i.gyazo.com/33962cb765ef6d9ebcaef89136b14ca2.png)

Before anything can be done about the clipping, it needs to be found first. Though I can't talk about exactly how the clipping is found, it has to do generally with a number of raycasts for each vertex. Importantly, "Raycasts will not detect Colliders for which the Raycast origin is inside the Collider", according to the [Unity docs](https://docs.unity3d.com/ScriptReference/Physics.Raycast.html). We run a number of checks on the meshes to find clipping between them.

As you can see, the checks work well even on highly complex geometry. (The handles draw through the object, so you can see both the vertices from the front and back in both perspectives.)

![img](https://i.gyazo.com/2a283fcade8212d057f8092060409fc7.png)

![img](https://i.gyazo.com/38cfc402f7138068a2d06ba348a83be4.png)



### Handling Clipping

The computational cost of moving every vertex is pretty high, and modifying weight paint data is out of the question, since we need this to be toggleable via blendshapes. To instead move groups of vertices, we use [VertexTweaker](https://github.com/unity3d-jp/BlendShapeBuilder/blob/master/Readme_EN.md) - huge thanks to Unity's JP office for this insanely useful tool!

The tools are generally meant to be used by hand, so they don't exactly have an API. I extended the VertexTweaker class to have a simple Move method that can be called externally:

```csharp
        public void ExternalMove(List<int> verts, Vector3 offset, int totalVertCount)
        {
            BeginEdit();

            PinnedList<float> converted = new PinnedList<float>(totalVertCount);
            for (int i = 0; i < totalVertCount; i++)
                converted[i] = 0;

            //Populate with 1.0f for selected verts
            for(int i = 0; i < verts.Count; i++)
            {
                converted[verts[i]] = 1;
            }

            m_numSelected = verts.Count;
            m_selection = converted;

            m_npModelData.selection = converted;

            ApplyMove(offset, Coordinate.World, true);

            EndEdit();
        }
```

This populates a "brush" with full weighting on each passed vertex, and applies moving in the passed direction. This makes it really simple to move vertices in a performant way, without having to re-invent the wheel. This code is already going to be included anyways, since we use BlendShapeBuilder as well (more on that in a minute). 

 #### Region Generation

Originally, the regions were going to be the connected components of the clipping verts, but this quickly eclipsed the computation time budget, as finding the connected components on assets with tens of thousands of vertices is very, very expensive. We have a variety of ways that the move target and regions are generated, but here's the max performance version:

```csharp
            //Iterate through all clipping verts
            for (int i = 0; i < vertsClipping.Length; i++)
            {
                Vector3 dif = verts[vertsClipping[i]] - targetMove;

                int regionIndex = 0;
                if (Math.Sign(dif.z) == -1)
                    regionIndex += 4;
                if (Math.Sign(dif.x) == -1)
                    regionIndex += 2;
                if (Mathf.Abs(dif.z) > Mathf.Abs(dif.x))
                    regionIndex += 1;

                if (verticalSplitRegions)
                {
                    if (verts[vertsClipping[i]].y < targetMove.y)
                        regionIndex += 8;
                }

                regions[regionIndex].verts.Add(vertsClipping[i]);
            }
```

It splits all of the clipping verts into eight regions - first into quadrants, then each quadrant again. You can imagine eight radial lines out, looking from the top down. If more precision is needed, `verticalSplitRegions` is enabled, which will slice all regions again, whether the vertex is above or below the target move. 

### Autotoggles

In VRChat, high-fidelity avatars have "toggles" - which allow you to turn assets on and off. It's like layered clothing in real life - you might compose an outfit with a winter jacket, then take it off once you get inside. Similarly, you might take a jacket 'on and off' - by toggling the asset - in VR to change your appearance. This provides a challenge for the clipping.

When an asset is handled with the clipping fix, they'll see significant deformation:

![img](https://i.gyazo.com/a32a3d400bbd63e007d572ba34d06903.png)

Through which the body may clip:

![img](https://i.gyazo.com/29a717abd1c8ac3a41bf1c9462b2dce2.png)



Consequently, these are attached to a BlendShape - allowing the assets to be toggled on and off at will:

![blendshape gif](https://i.imgur.com/uFKTUFR.gif)

This allows for a normal looking avatar, no matter what assets you choose to enable or disable:

![img](https://i.gyazo.com/fad6a57b83779f26a718645974429c7b.png)

![img](https://i.gyazo.com/697029528a27253c596d119aae060e35.png)

