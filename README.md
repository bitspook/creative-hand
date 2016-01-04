# creative-hand

A scriptcraft mod for programatically creating stuff in minecraft for players (not mods). Why should mods have all the fun?

## What is it?

It's a basic scriptcraft mod which allow you to enter commands in console (`/`) in minecraft to create things with the item in player's hand (i.e the currently selected block).

## Why? Isn't this exactly what scriptcraft provide out of the box?

Well, yea, it does. But that's for mods. Mods won't/shouldn't provide players the power of `/js` commands or there is no meaning in the game anymore. Players could just create stuff out of thin air. On the other hand, creating blocks by hand can get tedious in minecraft, some kind of automation is absolutely required. I once had a world in which I made a castle with hand and then I corrupted it (don't ask how). The pain I had was imense. Putting down each block by hand is tedious and unnecessary, and don't add fun worth the fatigue it causes.

So here I present you the `creative-hand`, an invisible hand which will move through the space and do stuff for you. But it won't take the fun away from the game. As uncle Ben would say, it is the power with responsibility.

## What it does?

Like I said above, it provides an invisible hand which can create blocks for you with commands instead of manually moving the player around adding a gazillion blocks by hand. However, it only allow you to **put** the blocks. You should earn the blocks, add them to your inventory, hold them in hand, and then use `creative-hand` commands. It provide you with following powers and responsibilites:

- It allow you to use commands to create tedious tasks like add 10 blocks (or more complex stuff) instead of doing that by hand
- It require you to use items in your inventory and won't just create things out of thin air. If you create a 5 * 5 block which is 2 blocks high, you should have 50 items in your inventory. Items used for building stuff will get reduced from your intenvory
- There's a cost involved. If you replace X blocks with Y blocks (e.g stone blocks with grass blocks) using `creative-hand`, you will lose the Y blocks from your inventory, but you won't get X blocks in your inventory. X blocks will just vanish. Isn't it fun!

## Usage

It's really easy to use `creative-hand`. There are two type of commands:

1. Movement commands
    - up(number)
    - down(number)
    - left(number)
    - right(number)
    - fwd(number)
    - back(number)

2. Creation commands
    - **box(width, height, depth)**

      `box` command creates a box of given width, height and depth (in blocks), filled with the item currently in players hand. Simple, right?

  - **box0(width, height, depth)**

      `box0` command creates an empty box of given width, height and depth (in blocks), filled with air. i.e a hollow box.


Your invisible (aka creative) hand holds the current cursored(?) block. You move your hand around with the movement commands, and create stuff with creation commands. Movement commands listed above are obvious to use I think.

### Executing the commands
To execute the `creative-hand` commands,

- First open the console in Minecraft by pressiong `/` key
- Now `creative-hand` is a scriptcraft plugin, so you have to endter `/jsp creative-hand` instead of simple `/creative-hand` as you might expect
- After `/jsp creative-hand` goes the command you want `creative-hand` to execute
- Commands are the name of the command (like `box`) followed by the amount it should work with given in round brackets (like `(1, 1, 1)`). For example
  ```js
  box(5, 2, 1)
  // full command would be "/jsp creative-hand box(5, 2, 1)"
  ```
  will create a box which is 5 blocks wide, 2 blocks heigh, and goes 1 block in front (depth).

  Before: ![before /jsp creative-hand box(5, 2, 1)](https://i.imgur.com/wfOcpgN.png)
  After: ![after /jsp creative-hand box(5, 2, 1)](https://i.imgur.com/ZOe2oiL.png)

  Notice the number of dirt blocks in inventory in both images.

- Commands can be chained by using `.`. For example,
  ```js
  up(2).box(2, 1, 1).left(5).box(4, 2, 3)
  // full command would be "/jsp creative-hand up(2).box(2, 1, 1).left(5).box(4, 2, 3)"
  ```
  will first move 2 blocks up the current block, will then create a box 2 blocks wide, 1 block hight and 1 block to front, and will then move 5 blocks left from the rightmost side of created box, and will then create a box 4 blocks deep, 2 blocks high and 3 blocks in front.

  Before: ![before /jsp creative-hand up(2).box(2, 1, 1).left(5).box(4, 2, 3)](https://i.imgur.com/7V5y4N0.png)
  After: ![after /jsp creative-hand up(2).box(2, 1, 1).left(5).box(4, 2, 3)](http://i.imgur.com/hQ5GnjV.png)

  Similar example with empty box: `/jsp creative-hand up(1).box0(4, 1, 4)`:

  Before: ![before /jsp creative-hand up(1).box0(4, 1, 4)](http://i.imgur.com/LZtuCn3.png)
  After: ![after /jsp creative-hand up(1).box0(4, 1, 4)](http://i.imgur.com/QrApUw4.png)

## Installations
You need to be a moderator/server-operator/whatever minecraft people call it (I am pretty new to minecraft world, a week old atm).

### Requirements

- This mod will most likely work with [CanaryMod](https://www.canarymod.net/) only. So it's better if you are using CanaryMod
- It's written in javascript for [ScriptCraft](https://www.canarymod.net/), so you need to have this installed as well

### Installing it

- Simply download the `creative-hand.js` file and store it in `<your server>/scriptcraft/plugings` folder. You can just clone this repository in there (i.e in `scriptcraft/plugins` directory) too, it will work as well.

This mod provide very little power to users, and there is cost associated with using that power too. So it keeps the game fun, and for people like me, it increases the fun of the game by many folds (bold statement, I just finished building this and am yet to have the said fun). This power is little only in that it doesn't allow creating things out of thin air. However it shall allow users to flex their creative brain muscles and enjoy the game with coder powers while playing as regular players.

## Actual reason for which I created it

I got sick of the needless tediousness minecraft requires when creating stuff. Even creative mode sucks. I installed mods but they're too powerful (they're meant to be used by mods after all). But I play alone, too much power render the game pointless. I wanted right amount of power as a regular player. I found scriptcraft to be super-awesome, allowing (js) code right in the console. But even scriptcarft provides too much power and isn't meant for regular players. So I created this simple mod to provide player the right amount of power to get rid of needless tediousness of minecraft while keeping the game fun and challenging.

No need to thank me. But just because you insist, 14xqWUGarn3LQ7nhVZ2RZLqaGvNEQcezme (https://i.imgur.com/0MzU8f9.png)
