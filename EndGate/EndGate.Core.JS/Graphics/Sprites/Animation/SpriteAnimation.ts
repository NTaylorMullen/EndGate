/// <reference path="../../../Utilities/EventHandler.ts" />
/// <reference path="../../../Assets/Vectors/Vector2d.ts" />
/// <reference path="../../../Assets/Sizes/Size2d.ts" />
/// <reference path="../../../Interfaces/IUpdateable.ts" />
/// <reference path="../../../GameTime.ts" />
/// <reference path="../ImageSource.ts" />

module eg.Graphics {

    /**
    * Defines an animation that can be drawn to the screen.
    */
    export class SpriteAnimation {
        private _imageSource: Assets.ImageSource;
        private _fps: number;
        private _frameSize: Size2d;
        private _frameCount: number;
        private _startOffset: Vector2d;
        private _playing: bool;
        private _repeating: bool;
        private _currentFrame: number;
        private _framesPerRow: number;
        // The last frame time (in ms)
        private _lastStepAt: number;
        // Step to the next frame ever X ms
        private _stepEvery: number;
        private _onComplete: EventHandler;

        /**
        * Creates a new instance of the SpriteAnimation object.
        * @param imageSource The Sprite sheet that contains the image frames used to display the animation.
        * @param fps How fast to play the animation (frames per second).  This value should not be less than the games update interval.
        * @param frameSize How large each animation frame is within the imageSource sprite sheet.
        * @param frameCount How many frames to play for the animation.
        */
        constructor(imageSource: Assets.ImageSource, fps: number, frameSize: Size2d, frameCount: number);
        /**
        * Creates a new instance of the SpriteAnimation object.
        * @param imageSource The Sprite sheet that contains the image frames used to display the animation.
        * @param fps How fast to play the animation (frames per second).  This value should not be less than the games update interval.
        * @param frameSize How large each animation frame is within the imageSource sprite sheet.
        * @param frameCount How many frames to play for the animation.
        * @param startOffset The positional offset within the imageSource on where the set of animation frames begin.
        */
        constructor(imageSource: Assets.ImageSource, fps: number, frameSize: Size2d, frameCount: number, startOffset: Vector2d = Vector2d.Zero);
        constructor(imageSource: Assets.ImageSource, fps: number, frameSize: Size2d, frameCount: number, startOffset: Vector2d = Vector2d.Zero) {
            this._imageSource = imageSource;
            this._frameSize = frameSize;
            this._frameCount = frameCount;
            this._startOffset = startOffset;
            this._playing = false;
            this._repeating = false;
            this._currentFrame = 0;
            this._framesPerRow = Math.min(Math.floor((imageSource.ClipSize.Width - startOffset.X) / frameSize.Width), frameCount);
            this._lastStepAt = 0;

            this._onComplete = new EventHandler();

            this.Fps = fps;
        }

        /**
        * Gets an event that is triggered when the animation has completed, will not trigger if the animation is repeating.  Functions can be bound or unbound to this event to be executed when the event triggers.
        */
        public get OnComplete(): EventHandler {
            return this._onComplete;
        }

        /**
        * Gets or sets the current frames per second.
        */
        public get Fps(): number {
            return this._fps;
        }
        public set Fps(newFps: number) {
            this._fps = newFps;
            this._stepEvery = 1000 / this._fps;
        }

        /**
        * Determines if the animation is currently playing.
        */
        public IsPlaying(): bool {
            return this._playing;
        }

        /**
        * Plays the animation.
        */
        public Play(): void;
        /**
        * Plays the animation.
        * @param repeat Whether to play the animation on repeat.
        */
        public Play(repeat: bool): void;
        public Play(repeat: bool = false): void {
            this._lastStepAt = new Date().getTime();
            this._repeating = repeat;
            this._playing = true;
            this.UpdateImageSource();
        }

        /**
        * Pauses the animation.
        */
        public Pause(): void {
            this._playing = false;
        }

        /**
        * Steps the animation 1 frame forward.  If not repeating and the animation surpasses the maximum frame count, the animation will stop and the OnComplete event will trigger.
        */
        public Step(): void;
        /**
        * Steps the animation 1 frame forward.  If not repeating and the animation surpasses the maximum frame count, the animation will stop and the OnComplete event will trigger.
        * @param count How many frames to move forward
        */
        public Step(count: number): void;
        public Step(count: number = 1): void {
            this._currentFrame += count;

            if (this._currentFrame >= this._frameCount) {
                if (this._repeating) {
                    this._currentFrame %= this._frameCount;
                }
                else {
                    this._currentFrame = this._frameCount - 1;
                    this.OnComplete.Trigger();
                    this.Stop(false);
                }
            }

            if (count !== 0) {
                this.UpdateImageSource();
            }
        }

        /**
        * Stops the animation and resets the current animation frame to 0.
        */
        public Stop(): void;
        /**
        * Stops the animation.
        * @param resetFrame Whether to reset the current animation frame to 0.
        */
        public Stop(resetFrame: bool): void;
        public Stop(resetFrame: bool = true): void {
            this._playing = false;
            if (resetFrame) {
                this.Reset();
            }
        }

        /**
        * Resets the current animation frame to 0.
        */
        public Reset(): void {
            this._currentFrame = 0;
            this.UpdateImageSource();
        }        

        /**
        * Updates the animations current frame.  Needs to be updated in order to play the animation.
        * @param gameTime The current game time object.
        */
        public Update(gameTime: GameTime): void {
            var timeSinceStep = gameTime.Now.getTime() - this._lastStepAt,
                stepCount = 0;

            if (this._playing) {
                stepCount = Math.floor(timeSinceStep / this._stepEvery);
                if (stepCount !== 0) {
                    this._lastStepAt = gameTime.Now.getTime();
                    this.Step(stepCount);
                }
            }
        }

        private UpdateImageSource(): void {
            var row = this.GetFrameRow(),
                column = this.GetFrameColumn();

            this._imageSource.ClipLocation.X = this._startOffset.X + column * this._frameSize.Width;
            this._imageSource.ClipLocation.Y = this._startOffset.Y + row * this._frameSize.Height;
            this._imageSource.ClipSize = this._frameSize;
        }

        private GetFrameRow(): number {
            return Math.floor(this._currentFrame / this._framesPerRow);
        }

        private GetFrameColumn(): number {
            return Math.ceil(this._currentFrame % this._framesPerRow);
        }
    }

}