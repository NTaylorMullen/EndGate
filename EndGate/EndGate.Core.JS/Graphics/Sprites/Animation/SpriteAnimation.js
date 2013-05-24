var EndGate;
(function (EndGate) {
    /// <reference path="../../../Utilities/EventHandler.ts" />
    /// <reference path="../../../Assets/Vectors/Vector2d.ts" />
    /// <reference path="../../../Assets/Sizes/Size2d.ts" />
    /// <reference path="../../../Interfaces/IUpdateable.ts" />
    /// <reference path="../../../GameTime.ts" />
    /// <reference path="../ImageSource.ts" />
    (function (Graphics) {
        var SpriteAnimation = (function () {
            function SpriteAnimation(imageSource, fps, frameSize, frameCount, startOffset) {
                if (typeof startOffset === "undefined") { startOffset = EndGate.Vector2d.Zero(); }
                this._imageSource = imageSource;
                this._frameSize = frameSize;
                this._frameCount = frameCount;
                this._startOffset = startOffset;
                this._playing = false;
                this._repeating = false;
                this._currentFrame = 0;
                this._framesPerRow = Math.min(Math.floor((imageSource.ClipSize.Width - startOffset.X) / frameSize.Width), frameCount);
                this._lastStepAt = 0;
                this.OnComplete = new EndGate.EventHandler();
                this.Fps(fps);
            }
            SpriteAnimation.prototype.IsPlaying = function () {
                return this._playing;
            };
            SpriteAnimation.prototype.Play = function (repeat) {
                if (typeof repeat === "undefined") { repeat = false; }
                this._lastStepAt = new Date().getTime();
                this._repeating = repeat;
                this._playing = true;
                this.UpdateImageSource();
            };
            SpriteAnimation.prototype.Pause = function () {
                this._playing = false;
            };
            SpriteAnimation.prototype.Step = function (count) {
                if (typeof count === "undefined") { count = 1; }
                this._currentFrame += count;
                if(this._currentFrame >= this._frameCount) {
                    if(this._repeating) {
                        this._currentFrame %= this._frameCount;
                    } else {
                        this._currentFrame = this._frameCount - 1;
                        this.OnComplete.Trigger();
                        this.Stop(false);
                    }
                }
                if(count !== 0) {
                    this.UpdateImageSource();
                }
            };
            SpriteAnimation.prototype.Stop = function (resetFrame) {
                if (typeof resetFrame === "undefined") { resetFrame = true; }
                this._playing = false;
                if(resetFrame) {
                    this.Reset();
                }
            };
            SpriteAnimation.prototype.Reset = function () {
                this._currentFrame = 0;
                this.UpdateImageSource();
            };
            SpriteAnimation.prototype.Fps = function (newFps) {
                if(typeof newFps !== "undefined") {
                    this._fps = newFps;
                    this._stepEvery = 1000 / this._fps;
                }
                return this._fps;
            };
            SpriteAnimation.prototype.Update = function (gameTime) {
                var timeSinceStep = gameTime.Now.getTime() - this._lastStepAt, stepCount = 0;
                if(this._playing) {
                    stepCount = Math.floor(timeSinceStep / this._stepEvery);
                    if(stepCount !== 0) {
                        this._lastStepAt = gameTime.Now.getTime();
                        this.Step(stepCount);
                    }
                }
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
//@ sourceMappingURL=SpriteAnimation.js.map
