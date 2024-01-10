# You think  you know me?

![img](https://i.gyazo.com/6ea19185e28e31b102da81cef0c517f9.png)

A game for JPEGMAFIA fans - guess the song from his producer tag - "You think you know me" 



This project's just for fun, as a result of a conversation I had with a close friend of mine who is also a JPEGMAFIA superfan. We've seen him live a number of times and often enjoy discussing his music. After making a top-32 march madness style bracket, we noticed that his producer tag "You think you know me" is very distinct. Partially based on having played games like [Bandle](https://bandle.app/) and Name That Tune, I had the idea that you could probably guess the song just from the isolated snippet.

Consequently, I built a simple SPA to implement the game. I personally think that create-react-app is really bulky, and I didn't want to have to deal with figuring out a hosting solution, considering that I do more than enough of that [at work already](https://www.mwaterman.dev/projects/01_VRtex%20Marketplace.md). For both of those reasons, I chose Next.js, hosted on Vercel. I highly doubt I'll exceed the hobby tier, so it should be free, seamless hosting, with automatic CD for as long as Vercel will let me.

Technically, there's not much here that should be a surprise for even intermediate developers, but I'll highlight a few things that were interesting to me.



### Playing Sound in a React App

Playing sound *should* be simple, but was needlessly finicky for me. Especially since [browsers now only play sound after user interaction](https://developer.chrome.com/blog/autoplay/#webaudio), a raw <audio> element is less reliable than ever. Here's what I ended up with.

My package of choice is [Howler](https://www.npmjs.com/package/howler):

`import { Howl } from 'howler';`

With a persistent ref to hold and play the sound.

```ts
  const sound = useRef<Howl | null>(null);
  const playAudio = (duration: number) => {
    sound.current = new Howl({
      src: [audioSrc],
      sprite: {
        portion: [0, duration * 1000], // in milliseconds
      },
      onend: () => {
        setIsPlaying(false);
      },
    });

    setIsPlaying(true);
    sound.current.play('portion');
  };
```

For this app, I needed to be able to play more and more of the sound. Each sound file is a 10 second snippet, which can be played for 1.5 seconds, then 3, then 5, then 7, then 10, for progressively fewer points. The files are hosted directly via the 'public' folder.

Next.js serves the contents of this directly, so files can be accessed as follows:

![public/audio/1539 n calvert.mp3](https://i.gyazo.com/3dff43ad9d82bb20ae181cb14f021927.png)

https://www.youthinkyouknow.me/audio/1539%20n%20calvert.mp3

Obviously, the spaces need to be URI encoded, but otherwise, it's quite easy!

### Question Generation

The questions are stored as a mapping with filename, display name, and difficulty. 

```json
 "questions": 
    [
      {
        "filename": "1539 n calvert",
        "difficulty": "easy",
        "answer": "1539 N. Calvert"
      },
      {
        "filename": "baby i'm bleeding",
        "difficulty": "easy",
        "answer": "Baby I'm Bleeding"
      },
...
"optionsWith" : [
      "1539 N. Calvert",
      "Baby I'm Bleeding",
      "BBW",
      "END CREDITS!",
      "Free The Frail",
...
"optionsWithout":
    [
      "HERMANOS",
      "Lean Beef Patty",
      "Steppa Pig",
      "Burfict!",
...
```

Instead of having 4 possible answers, I have a list of a number of JPEGMAFIA songs with and without "you think you know me"s in them. For each song, it flips a coin, to include either one or two songs from each list. So, for example,

![example qs](https://i.gyazo.com/cf7dab6be6ac414dc4b404c5b061a9ca.png)

In this question, 1539 N. Calvert and Baby I'm Bleeding are also songs that have the tag in them, but THIS ONES FOR US! doesn't. This keeps the questions a little more difficult to guess, while also generally including a good mix of songs that are recognizable. 

### Tutorial Overlay

The tutorial overlay is simple, and is really just a half-opacity black div that covers the screen

```html
  <div 
    className={`fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 ${showTutorial ? 'animate-fade-in' : 'hidden'} z-10 pointer-events-none`}
  />
```

z-10 is so that it appears on top of most of the elements, but leaves the tutorial elements at z-20 and above, so they appear not 'dimmed'.

[pointer-events-none](https://developer.mozilla.org/en-US/docs/Web/CSS/pointer-events) stops the overlay from blocking buttons.