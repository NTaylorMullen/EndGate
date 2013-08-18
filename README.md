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

## Questions? 
Post a question on [Stack Overflow] (http://stackoverflow.com/) with the "EndGate" tag or come join me and other contributors in the [EndGate room] (https://jabbr.net/#/rooms/EndGate) on [JabbR] (https://jabbr.net).

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
<script src="Scripts/endgate-0.2.0.min.js" />
```
* Reference the *EndGate* declaration file in your TypeScript files for typing:

```JavaScript
/// <reference path="Scripts/endgate-0.2.0.d.ts" />
```

## Building source requirements
* PowerShell
* Visual Studio 2012+
* Latest TypeScript. You can download it [here] (http://www.microsoft.com/en-us/download/details.aspx?id=34790).  ***Note:*** TypeScript 0.9.1.0 does not build due to bugs with the release.
 
## Contributing
EndGate was built with the intent of providing room to have many contributions.  With this goal in mind I have created base classes for much of the EndGate framework which can be derived from to create new and exciting features.  

If you're looking to contribute to EndGate feel free to comment on an existing Issue (if you'd like to contribute the work for it) OR create a new issue with your suggested contribution.  If you'd like to speak to me in person or just hang out, always feel welcome to come join me in the [EndGate room] (https://jabbr.net/#/rooms/EndGate) on [JabbR] (https://jabbr.net).

#### Looking to contribute but need a few ideas?  

Here's a few (absolutely not limited to):

1. **Graphic2ds**:  EndGate currently supports several shapes and lines but more shapes could be created.  A polygon and triangle are two shapes that come to mind (but of course not limited to).
2. **MovementControllers**:  Currently there's only one MovementController, the LinearMovementController.  There are an endless amount of MovementControllers that could be created.
3. **InputControllers**:  Currently there's only one InputController, the DirectionalInputController.  There are an endless amount of InputControllers that could be created.
4. **Bounds2ds**:  There are only two types of Bounds currently in the EndGate framework, a Circle and a Rectangle bound.  These could be expanded upon greatly.
5. **Tweens/TweeningFunctions**:  There are a significant amount of tweens already in the EndGate framework, however, there are an endless amount of tweens that could be craeted.
