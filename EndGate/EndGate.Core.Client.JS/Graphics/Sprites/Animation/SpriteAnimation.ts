/// <reference path="../../../Utilities/EventHandler.ts" />
/// <reference path="../../../Assets/Vectors/Vector2d.ts" />
/// <reference path="../../../Assets/Sizes/Size2d.ts" />
/// <reference path="../../../Interfaces/IUpdateable.d.ts" />
/// <reference path="../../../GameTime.ts" />
/// <reference path="../ImageSource.ts" />

module EndGate.Graphics {

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

        constructor(imageSource: Assets.ImageSource, fps: number, frameSize: Size2d, frameCount: number, startOffset?: Vector2d = Vector2d.Zero()) {
            this._imageSource = imageSource;
            this._frameSize = frameSize;
            this._frameCount = frameCount;
            this._startOffset = startOffset;
            this._playing = false;
            this._repeating = false;
            this._currentFrame = 0;
            this._framesPerRow = Math.min(Math.floor((imageSource.ClipSize.Width - startOffset.X) / frameSize.Width), frameCount);
            this._lastStepAt = 0;            

            this.OnComplete = new EventHandler();

            this.Fps(fps);
        }

        public OnComplete: EventHandler;

        public IsPlaying(): bool {
            return this._playing;
        }

        public Play(repeat?: bool = false): void {
            this._lastStepAt = new Date().getTime();
            this._repeating = repeat;
            this._playing = true;
            this.UpdateImageSource();
        }

        public Pause(): void {
            this._playing = false;
        }

        public Step(count?: number = 1): void {           
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

        public Stop(resetFrame?: bool = true): void {
            this._playing = false;
            if (resetFrame) {
                this.Reset();
            }
        }

        public Reset(): void {
            this._currentFrame = 0;
        }

        public Fps(newFps?: number): number {
            if (typeof newFps !== "undefined") {
                this._fps = newFps;
                this._stepEvery = 1000 / this._fps;
            }

            return this._fps;
        }

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