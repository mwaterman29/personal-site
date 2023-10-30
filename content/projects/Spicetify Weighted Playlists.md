# Spicetify Weighted Playlists

![]()

An extension for the Spotify player that allows weighting of songs on playlists



This extension is made with [Spicetify](https://spicetify.app/), a CLI tool for advanced control of the Spotify client. It exposes the React DOM, console, DevTools, Cosmos API and more. Additionally, this uses the [Spicetify Creator](https://spicetify.app/docs/development/spicetify-creator/), a tool to compile Typescript into extensions.



I make a lot of playlists - like - a lot of playlists. I'm at about 250 now and climbing. Often, I'll create short playlists to fit a specific vibe, and while playing them, I wish there was more tools to manage the playing context. Sometimes there might be just seven songs on a playlist, and I certainly want to hear some more than others. Consequently, I developed this extension. 



Playlists can be "weighted" via a switch I added to the playlist screen. It'll then set a LocalStorage value for that playlist's ID. Then, it'll store a key-value pair collection of song URI and weight. When you shuffle a weighed playlist, each time the song changes, it'll add a song as the first in queue, according to the weights. It won't play the same song more than twice in a row.



There were a few interesting challenges for this project, which are documented below:



## Handling Shuffle, Queue, and Skipping

The major challenge was handling user action. If you just click play on a playlist, and let it run, rolling songs according to the weight is quite simple: sum the weights, roll a value between 0 and the sum, and find the corresponding song. Unlike a standard evenly distributed roll, where you can roll an index, the weighted roll requires looping through the weights. Funnily enough, I had used this approach previously, following [a tutorial for rolling pets in a Roblox game](https://youtu.be/wip3VN-LUA0?si=SqQADyJ2t2DWWTAj&t=840), though that game never ended up being published.

```tsx
function pickNextSong(playlist: string)
{
  //pick song from weights
  let playlistWeights = weights[playlist];

  //sum weights
  let weightSum = 0;
  Object.entries(playlistWeights).forEach(
    ([key, value]) => {
      weightSum += Number(value)
    }
  );

  //roll from [0, sumWeights] and choose accordingly
  let roll = Math.random() * weightSum;
  //console.log(`Weight sum is ${weightSum} and rolled ${roll}`);
  let songResult;
  Object.entries(playlistWeights).forEach(
    ([key, value]) => {
      roll -= Number(value);
      //console.log(`roll is now ${roll} is ${roll <= 0}`)
      if(roll <= 0)
      {
        //console.log(`selecting ${key}`);
        songResult = key;
        roll = 1000000000;
        return;
      }
    }
  );
  return songResult;
}
```

However, since the user can change playlists, skip, rewind, add and delete songs, and so on, this isn't a trivial task. Instead, it's updated anytime the current song playing changes. This accounts for skips, rewinds, and when the user changes playlists.

```tsx
async function onSongChange(){
  //wait a tiny little bit before doing anything for the playing context to properly update
  await new Promise(r => setTimeout(r, 250));

  //Get playing context
  let context = Spicetify.Platform.PlayerAPI._state.context.uri;
  let playlistURI = context.split(':')[2];
  let provider = Spicetify.Platform.PlayerAPI._queue._queue.nextTracks[0].provider;
  let nextProvider = Spicetify.Platform.PlayerAPI._queue._queue.nextTracks[1].provider;
  let farProvider =  Spicetify.Platform.PlayerAPI._queue._queue.nextTracks[2].provider;
  let nextTrackID = Spicetify.Platform.PlayerAPI._queue._queue.nextTracks[0].contextTrack.uri;
  //console.log(`context is ${context} with lastPlaylist ${lastPlaylist}`);

  //Check for playlist change
  if(playlistURI != lastPlaylist)
  {
    //console.log("Playlist change!")
    lastPlaylist = playlistURI;

    //Switching playlists will add a song to queue, but it shouldn't! If there's already a queue, however, don't interfere with it.
    if(farProvider == "queue")
    {
      //console.log("Far provider is queue, returning.")
      return;
    }

    //Remove the 0th song from queue
    removeFromQueue(0);
  }
  
  //if there's already a queue, don't interfere with it.
  if(nextProvider == "queue")
  {
    console.log("Next is from queue - Not interfering with the queue.");
    return;
  }
  if(provider == "queue" && nextTrackID != lastAdded)
  {
    console.log("Not interfering with the queue.");
    return;
  }
  
  if(context.includes("playlist"))
  {
    //Store last playlist to handle playlist changes
    if(lastPlaylist != playlistURI)
      console.log("Playlist Change!");
    lastPlaylist = playlistURI;

    if(weightedness[playlistURI] === undefined || weightedness[playlistURI] === null)
    {
      console.log(`Playlist ${playlistURI} does not have an entry in weightedness.`);
      return;
    }
    else if(weightedness[playlistURI] === false)
    {
      console.log(`Playlist ${playlistURI} is unweighted`);
      return;
    }
    else
      console.log(`Playlist ${playlistURI} is weighted with weights ${weights[playlistURI]}`);

    rollAndAdd(playlistURI);
  }
}
```

Generally, it will ignore playlists that are unweighted, and when the user makes a manual queue, it won't interfere with that either.

Changing playlists won't consume a song from the queue, so the playlist ID needs to update, and the first song is now erroneously from the previous playlist, so it needs to be removed.

On a playlist change, the contents are updated via the Cosmos API.

```tsx
async function updatePlaylistContents()
{
  currentPlaylistID = getCurrentPlaylistID();
  let uri = Spicetify.URI.fromString(`spotify:playlist:${currentPlaylistID}`);
  const res = await Spicetify.CosmosAsync.get(`sp://core-playlist/v1/playlist/${uri.toString()}/rows`, {
            policy: { link: true },
        });
  selectedPlaylistContents = res.rows;
}
```





## Inserting HTML elements, and playing nice with navigation

The process of inserting HTML elements certainly leaves a lot to be desired, particularly since you have to listen for navigation events. The class names that things need to be inserted after are consistent, but often random garbage. They've been improved as of recent updates, but you can see the old names in comments: not fun.

```tsx
const actionBarFlexBoxClassName = "playlist-playlist-searchBoxContainer"; // name for  the space buffer - used to be KodyK77Gzjb8NqPGpcgw
const playlistContentClassName =  "main-rootlist-wrapper" // "rezqw3Q4OEPB1m4rmwfw";
const playlistContentClassNameDeeper = "JUa6JJNj7R_Y3i4P8YUX";
const playlistSortingClassName = "x-sortBox-sortDropdown"
```

When a navigation event occurs, the extension effectively needs to start over:

- Check if it's a playlist, and if it is, get current Playlist ID
- Check whether it's weighted or not, and add the switch
- If it is, add weight sliders.

```tsx
// Listen to page navigation and re-apply when DOM is ready
function listenThenApply(pathname: any) {
  const observer = new MutationObserver(function appchange(){
      // Look for the playlist action bar.
      const bar = document.querySelector('.main-actionBar-ActionBarRow');
      if(bar && pathname.includes("playlist"))
      {
        //before anything else initialize weights so other things don't break
        getCurrentPlaylistID();
        initializeWeightsForPlaylist(currentPlaylistID);
        //add switches and sliders
        addWeightedSwitch();
        listenThenAddWeightSliders();
        observer.disconnect();
      }
      else
      {
        //console.log("i think a playlist is NOT selected.");
      }
  })

  // I need to include subtree because the Search page only has one child and the content is under there
  observer.observe(document,{ childList: true, subtree: true });
}
```

Adding weight sliders is a bit... quirky. The slider buttons end up after the song titles, inserted into the row at index[1]. There was a lot of time spend trawling through the DOM to find exactly where things go. 

```tsx
async function addWeightSliders(playlistContents : any){
  //if the playlist isn't weighted, don't bother
  if(!weightedness[currentPlaylistID])
    return;

  //if the playlist isn't sorted by custom order, the row indices won't work
  let sortingOrderTextContent = document.querySelector("." + playlistSortingClassName)?.firstChild?.textContent //?.querySelector(".main-type-mesto")?.textContent;
  if(sortingOrderTextContent != 'Custom order')
  {
    return;
  }

  /*
  row
   ->main-trackList-tracklistRow
     -> main-trackList-rowSectionStart
        -> insert at the end
  */

  //update contents
  updatePlaylistContents();
  // while the playlist has nothing in it,  wait
  while (selectedPlaylistContents.length == 0) {
    await new Promise(resolve => setTimeout(resolve, 100));
  }


  //get playlist rows
  let playlistRows = playlistContents?.childNodes[1].childNodes;

  //console.log(`filling ${playlistRows.length} rows`)

  console.log(weights[currentPlaylistID])

  for(let i = 0; i < playlistRows.length; i++)
  {
    //check if it already exists
    let count = playlistRows[i].firstChild?.childNodes[1].childNodes.length;
    if(count == undefined)
      continue;
    if(count >= 3)
      continue;

    //pull uri
    let songIndex = playlistRows[i].getAttribute(`aria-rowindex`) - 2;
    if(!selectedPlaylistContents[songIndex])
    {
      console.log(`can't find song at index ${songIndex}`);
    }
    let uri = selectedPlaylistContents[songIndex].link.split(':')[2];

    let weightButton = htmlToElement(weightButtonTemplateString + `id="${uri}">`);

    //add event listener for opening the weight popup, and to set the current song
    weightButton.addEventListener("click", setSelectedSong(uri));
    weightButton.addEventListener("click", openWeightSliderPopup);
    
    //add weight button
    playlistRows[i].firstChild?.childNodes[1].appendChild(weightButton);

    //if for some reason, weight is undef. set it to 1
    if(weights[currentPlaylistID][uri] == undefined)
    {
      console.log("Weight for " + uri + " is undefined!");
      weights[currentPlaylistID][uri] = 1;
    }

    //set the button's text to it's weight
    let button = document.getElementById(`${uri}`);
    if(button)
      button.setAttribute("value", `${weights[currentPlaylistID][uri]}`);
  }
}

async function removeWeightSliders()
{
  document.querySelectorAll(`.weight-slider-access-button`).forEach((item) => {
    item.remove();
  })
}
```

Otherwise, navigation is handled similarly. Similar Mutation observers exist for the switch, import and export buttons, as well as helpers for getting the playlist contents and parsing URIs.