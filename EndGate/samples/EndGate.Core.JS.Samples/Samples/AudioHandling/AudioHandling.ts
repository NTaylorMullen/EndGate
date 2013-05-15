/// <reference path="../../Scripts/endgate.ts" />
/// <reference path="BurningFlame.ts" />
/// <reference path="SmokePoofManager.ts" />

class AudioHandling extends eg.Game {
    private _burningFlame: BurningFlame;
    private _burningSound: eg.Sound.AudioClip;

    private _smokePoofManager: SmokePoofManager;

    constructor(canvas: HTMLCanvasElement) {
        super(canvas);

        // Create the burning flame at the center of the canvas
        this._burningFlame = new BurningFlame(canvas.width / 2, canvas.height / 2);
        // Add the burning flames graphic to the Scene (so it can be drawn)
        this.Scene.Add(this._burningFlame.Graphic);
        
        // We pass in the loaded AudioPlayer for the smoke poof sound
        // We provide two sound files so that it can play properly in all browsers. If one sound file fails to load/play
        // the other will be loaded and played.
        this._smokePoofManager = new SmokePoofManager(this.Input.Mouse, this.Scene, this.Audio.Load("poof", ["sounds/smokepoof.ogg", "sounds/smokepoof.mp3"]));

        // Load our burning flame sound under the key "burning"
        // We provide two sound files for the same reason as detailed above
        this.Audio.Load("burning", ["sounds/fireburning.ogg", "sounds/fireburning.mp3"]);

        // Play our burning sound on repeat at 75% volume.  The this._burningSound allows for modification of the sound after
        // it has begun to play.  However, in this sample we do not do any modifications to the sound once we play it.
        // The reason why we still save the playing sound is to prevent it from being garbage collected.
        this._burningSound = this.Audio.Play("burning", new eg.Sound.AudioSettings(true, 75));
    }

    public Update(gameTime: eg.GameTime): void {        
        this._burningFlame.Update(gameTime);
        this._smokePoofManager.Update(gameTime);
    }
}