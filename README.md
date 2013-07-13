## EndGate
[EndGate] (http://endgate.net) is a [TypeScript] (http://www.typescriptlang.org/) powered game framework which was created for the sole purpose of making HTML5 game development maintainable, fun and easy.

## Resources to get started
* [Tutorials] (http://endgate.net/Tutorials)
* [Samples] (http://endgate.net/Samples)
* [API Documentation] (http://endgate.net/api)
* [Frequently Asked Questions] (http://endgate.net/faq)
* [JabbR] (https://jabbr.net/#/rooms/EndGate)
* [Twitter] (https://twitter.com/ntaylormullen)

For all this and more you can always visit the EndGate [homepage] (http://endgate.net).

## A brief look
**1**. Create a custom game object.

```TypeScript
class MyGame extends eg.Game {
	constructor() {
		// Calling the super constructor without a canvas results in a full screen game.
		super();
	}
}
```

**2**. Add a rectangle member to MyGame (add to top of MyGame class).

```TypeScript
private _rectangle: eg.Graphics.Rectangle;
```

**3.** Add the rectangle to the screen (add code inside the MyGame constructor).
```TypeScript
// Create a green rectangle at (300, 250) with size (100, 75).
this._rectangle = new eg.Graphics.Rectangle(300, 250, 100, 75, "green");
// Add it to the screen
game.Scene.Add(this._rectangle);
```

**4.** Spin the rectangle forever (add method to MyGame).
```TypeScript
public Update(gameTime: eg.GameTime): void {
	// Rotate the rectangle all the way around (clock-wise) every 1 second.
	this._rectangle.Rotation += (Math.PI * 2) * gameTime.Elapsed.Seconds;
}
```

**5**. Initialize the game (add code outside of the MyGame class).

```TypeScript
var game = new MyGame();
```

## Using EndGate in your project
* Ensure you have AT LEAST TypeScript 0.9.0.1, you can get latest [here] (http://www.microsoft.com/en-us/download/details.aspx?id=34790)
* Get EndGate directly or via nuget.  More details [here] (http://endgate.net/Download)
* Add EndGate JavaScript to your web page:

```HTML
<script src="Scripts/endgate-0.1.0.min.js" />
```
* Reference the *EndGate* declaration file in your TypeScript files for typing:

```JavaScript
/// <reference path="Scripts/endgate-0.1.0.d.ts" />
```

## Building source requirements
* PowerShell or Node.js
* Visual Studio 2012+
* Latest TypeScript. You can download it [here] (http://www.microsoft.com/en-us/download/details.aspx?id=34790)

## Building with Node.js
Node.js build utilizes Grunt > 0.4. To generate the compiled library
first run ```npm install`` in the solution root to fetch all the dependencies for Grunt (this step is needed once).
Then run ```grunt compile``` to generate the artifact and the declaration files in the _EndGate/EndGate.Core.JS/Scripts_ directory.
You can run ```grunt test``` to compile the sources and run the test suite.
