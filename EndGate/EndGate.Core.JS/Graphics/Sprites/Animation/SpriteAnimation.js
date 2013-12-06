/// <reference path="../../../Utilities/EventHandler.ts" />
/// <reference path="../../../Assets/Vectors/Vector2d.ts" />
/// <reference path="../../../Assets/Sizes/Size2d.ts" />
/// <reference path="../../../Interfaces/IUpdateable.ts" />
/// <reference path="../../../Interfaces/IDisposable.ts" />
/// <reference path="../../../GameTime.ts" />
/// <reference path="../../ImageSource.ts" />
var EndGate;
(function (EndGate) {
    (function (Graphics) {
        /**
        * Defines an animation that can be drawn to the screen.
        */
        var SpriteAnimation = (function () {
            function SpriteAnimation(imageSource, fps, frameSize, frameCount, startOffset) {
                if (typeof startOffset === "undefined") { startOffset = EndGate.Vector2d.Zero; }
                var _this = this;
                this._imageSource = imageSource;
                this._frameSize = frameSize;
                this._frameCount = frameCount;
                this._startOffset = startOffset;
                this._playing = false;
                this._repeating = false;
                this._currentFrame = 0;
                this._lastStepAt = 0;

                this._onComplete = new EndGate.EventHandler();

                this.Fps = fps;

                if (imageSource.ClipSize !== null || imageSource.IsLoaded()) {
                    this._framesPerRow = Math.min(Math.floor((imageSource.Size.Width - startOffset.X) / frameSize.Width), frameCount);
                    this.UpdateImageSource();
                } else {
                    imageSource.OnLoaded.BindFor(function (image) {
                        _this._framesPerRow = Math.min(Math.floor((imageSource.Size.Width - startOffset.X) / frameSize.Width), frameCount);
                        _this.UpdateImageSource();
                    }, 1);

                    this._framesPerRow = 1;
                }
            }
            Object.defineProperty(SpriteAnimation.prototype, "OnComplete", {
                /**
                * Gets an event that is triggered when the animation has completed, will not trigger if the animation is repeating.  Functions can be bound or unbound to this event to be executed when the event triggers.
                */
                get: function () {
                    return this._onComplete;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(SpriteAnimation.prototype, "Fps", {
                /**
                * Gets or sets the current frames per second.
                */
                get: function () {
                    return this._fps;
                },
                set: function (newFps) {
                    this._fps = newFps;
                    this._stepEvery = 1000 / this._fps;
                },
                enumerable: true,
                configurable: true
            });

            /**
            * Determines if the animation is currently playing.
            */
            SpriteAnimation.prototype.IsPlaying = function () {
                return this._playing;
            };

            /**
            * Determines if the animation can play.  This is essentially checking if the underlying image source is loaded.
            */
            SpriteAnimation.prototype.CanPlay = function () {
                return this._imageSource.IsLoaded();
            };

            SpriteAnimation.prototype.Play = function (repeat) {
                if (typeof repeat === "undefined") { repeat = false; }
                if (!this._imageSource.ClipSize) {
                    throw new Error("Image source not loaded yet.");
                }

                this._lastStepAt = new Date().getTime();
                this._repeating = repeat;
                this._playing = true;
                this.UpdateImageSource();
            };

            /**
            * Pauses the animation.
            */
            SpriteAnimation.prototype.Pause = function () {
                this._playing = false;
            };

            SpriteAnimation.prototype.Step = function (count) {
                if (typeof count === "undefined") { count = 1; }
                this._currentFrame += count;

                if (this._currentFrame >= this._frameCount) {
                    if (this._repeating) {
                        this._currentFrame %= this._frameCount;
                    } else {
                        this._currentFrame = this._frameCount - 1;
                        this.OnComplete.Trigger();
                        this.Stop(false);
                    }
                }

                if (count !== 0) {
                    this.UpdateImageSource();
                }
            };

            SpriteAnimation.prototype.Stop = function (resetFrame) {
                if (typeof resetFrame === "undefined") { resetFrame = true; }
                this._playing = false;
                if (resetFrame) {
                    this.Reset();
                }
            };

            /**
            * Resets the current animation frame to 0.
            */
            SpriteAnimation.prototype.Reset = function () {
                this._currentFrame = 0;
                this.UpdateImageSource();
            };

            /**
            * Updates the animations current frame.  Needs to be updated in order to play the animation.
            * @param gameTime The current game time object.
            */
            SpriteAnimation.prototype.Update = function (gameTime) {
                var timeSinceStep = gameTime.Now.getTime() - this._lastStepAt, stepCount = 0;

                if (this._playing) {
                    stepCount = Math.floor(timeSinceStep / this._stepEvery);
                    if (stepCount > 0) {
                        this._lastStepAt = gameTime.Now.getTime();
                        this.Step(stepCount);
                    }
                }
            };

            /**
            * Unbinds all events.  Does not dispose the underlying image source.
            */
            SpriteAnimation.prototype.Dispose = function () {
                this._onComplete.Dispose();
            };

            SpriteAnimation.prototype.UpdateImageSource = function () {
                var row = this.GetFrameRow(), column = this.GetFrameColumn();

                this._imageSource.ClipLocation.X = this._startOffset.X + column * this._frameSize.Width;
                this._imageSource.ClipLocation.Y = this._startOffset.Y + row * this._frameSize.Height;
                this._imageSource.ClipSize = this._frameSize;
            };

            SpriteAnimation.prototype.GetFrameRow = function () {
                return Math.floor(this._currentFrame / this._framesPerRow);
            };

            SpriteAnimation.prototype.GetFrameColumn = function () {
                return Math.ceil(this._currentFrame % this._framesPerRow);
            };
            return SpriteAnimation;
        })();
        Graphics.SpriteAnimation = SpriteAnimation;
    })(EndGate.Graphics || (EndGate.Graphics = {}));
    var Graphics = EndGate.Graphics;
})(EndGate || (EndGate = {}));
