/* IDisposable.d.ts.Name */
interface IDisposable {
    Dispose(): void;
}
/* ITyped.d.ts.Name */
interface ITyped {
    _type: string;
}
/* GameTime.ts.Name */


module EndGate.Core {

    export class GameTime implements ITyped {
        public _type: string = "GameTime";

        public Now: Date;
        // Time in milliseconds
        public Total: number;
        public Elapsed: number;

        // Start time in milliseconds
        private _start: number;

        constructor() {
            this.Now = new Date();
            this._start = this.Now.getTime();
        }

        public Update(): void {
            var now = new Date(),
                nowMs = now.getTime();

            this.Elapsed = nowMs - this.Now.getTime();
            this.Total = nowMs - this._start;
            this.Now = now;
        }
    }

}
/* IUpdateable.d.ts.Name */


interface IUpdateable {
    Update(gameTime: EndGate.Core.GameTime): void;
}
/* LooperCallback.ts.Name */
module EndGate.Core.Utilities {

    export class LooperCallback implements ITyped {
        public _type: string = "LooperCallback";

        private static _ids: number = 0;

        constructor(fps: number, callback: Function) {
            this.Fps = fps;
            this.Callback = callback;
            this.TimeoutID = 0;
            this.ID = LooperCallback._ids++;
            this.Active = false;
        }

        public Fps: number;
        public Callback: Function;
        public TimeoutID: number;
        public ID: number;
        public Active: bool;
    }
}
/* Looper.ts.Name */




module EndGate.Core.Utilities {

    export class Looper implements IDisposable, ITyped {
        public _type: string = "Looper";

        private _running: bool;
        private _callbacks: LooperCallback[];

        constructor() {
            this._running = false;
            this._callbacks = [];
        }

        public AddCallback(looperCallback: LooperCallback): void {
            this._callbacks.push(looperCallback);
            looperCallback.Active = true;

            if (this._running) {
                this.Loop(looperCallback);
            }
        }

        public RemoveCallback(looperCallback: LooperCallback): void {
            var callbackFound: bool = false,
                i: number;

            for (i = 0; i < this._callbacks.length; i++) {
                if(this._callbacks[i].ID === looperCallback.ID) {
                    callbackFound = true;
                    break;
                }
            }


            if (callbackFound) {
                window.clearTimeout(looperCallback.TimeoutID);
                looperCallback.Active = false;
                this._callbacks.splice(i, 1);
            }
            else {
                throw new Error("Callback does not exist.");
            }
        }

        public Start(): void {
            this._running = true;

            this.Run();
        }

        private Run(): void {
            for (var i = 0; i < this._callbacks.length;i++) {
                this.Loop(this._callbacks[i]);
            }
        }

        private Loop(looperCallback: LooperCallback): void {
            var that = this,
                msTimer = 1000 / looperCallback.Fps;

            looperCallback.Callback();

            if (looperCallback.Active) {
                looperCallback.TimeoutID = window.setTimeout(() => {
                    that.Loop(looperCallback);
                }, msTimer);
            }
        }

        public Dispose(): void {
            for (var i = this._callbacks.length - 1; i >= 0; i--) {
                this.RemoveCallback(this._callbacks[i]);
            }

            this._callbacks = [];
            this._running = false;
        }
    }
}
/* GameConfiguration.ts.Name */
module EndGate.Core {

    export class GameConfiguration {
        private _defaultUpdateRate: number = 40;
        private _updateRateSetter: (updateRate: number) => void;
        private _updateRate: number;

        constructor(updateRateSetter: (updateRate: number) => void ) {
            this._updateRateSetter = updateRateSetter;
            this.UpdateRate(this._defaultUpdateRate);
        }

        public UpdateRate(updateRate?: number): number {
            if (typeof updateRate !== "undefined") {
                this._updateRate = updateRate;
                this._updateRateSetter(this._updateRate);
            }
            else {
                return this._updateRate;
            }
        }
    }

}
/* Game.ts.Name */






module EndGate.Core {

    export class Game implements ITyped, IUpdateable, IDisposable {
        public _type: string = "Game";

        public ID: number;
        public Configuration: GameConfiguration;

        private static _gameIds: number = 0;
        private _gameTime: GameTime;

        constructor() {
            this._gameTime = new GameTime();
            this.ID = Game._gameIds++;

            this.Configuration = new GameConfiguration(GameRunnerInstance.Register(this))
        }

        public PrepareUpdate(): void {
            this._gameTime.Update();

            this.Update(this._gameTime);
        }

        public Update(gameTime: GameTime): void {
        }

        public Dispose()
        {
            GameRunnerInstance.Unregister(this);
        }
    }

}
/* GameRunner.ts.Name */





module EndGate.Core {    

    export class GameRunner implements ITyped {
        public _type: string = "GameRunner";

        private _callbacks: { [s: number]: Utilities.LooperCallback; };
        private _gameLoop: Utilities.Looper;
        private _callbackCount: number;

        constructor() {
            this._callbacks = <{ [s: number]: Utilities.LooperCallback; } >{};
            this._gameLoop = null;
            this._callbackCount = 0;
        }

        public Register(game: Game): (updateRate: number) => void {
            var updateCallback = this.CreateAndCacheCallback(game);

            // Try to start the loop prior to adding our games callback.  This callback may be the first, hence the "Try"
            this.TryLoopStart();

            // Add our callback to the game loop (which is now running), it will now be called on an interval dictated by updateCallback
            this._gameLoop.AddCallback(updateCallback);

            // Updating the "updateRate" is an essential element to the game configuration.
            // If a game is running slowly we need to be able to slow down the update rate.
            return this.CreateUpdateRateSetter(updateCallback);
        }

        public Unregister(game: Game): void {
            var updateCallback;

            if (this._callbacks[game.ID]) {
                updateCallback = this._callbacks[game.ID];

                this._gameLoop.RemoveCallback(updateCallback);
                delete this._callbacks[game.ID];
                this._callbackCount--

                this.TryLoopStop();
            }
        }

        private TryLoopStart(): void {
            if (this._callbackCount === 1) {
                this._gameLoop = new Utilities.Looper();
                this._gameLoop.Start();
            }
        }

        private TryLoopStop(): void {
            if (this._callbackCount === 0 && this._gameLoop != null) {
                this._gameLoop.Dispose();
                this._gameLoop = null;
            }
        }

        private CreateAndCacheCallback(game: Game): Utilities.LooperCallback {
            var updateCallback = new Utilities.LooperCallback(0, () => {
                game.PrepareUpdate();
            });

            this._callbacks[game.ID] = updateCallback;
            this._callbackCount++;

            return updateCallback;
        };

        private CreateUpdateRateSetter(callback: Utilities.LooperCallback): (updateRate: number) => void {
            return (updateRate) => {
                callback.Fps = updateRate;
            };
        }
    }
}

var GameRunnerInstance: EndGate.Core.GameRunner = new EndGate.Core.GameRunner();
/* MathExtensions.ts.Name */
interface Math {
    roundTo(val?: number, decimals?: number): number;
}

Math.roundTo = function (val?: number, decimals?: number): number {
    var multiplier = Math.pow(10, decimals);

    return Math.round(val * multiplier) / multiplier;
};
/* Vector2d.ts.Name */



module EndGate.Core.Assets {
    export class Vector2d implements ITyped {
        public _type: string = "Vector2d";

        public X: number;
        public Y: number;

        constructor(x?: number, y?: number) {
            this.X = x || 0;
            this.Y = y || 0;
        }

        public static Zero(): Vector2d {
            return new Vector2d(0, 0);
        }

        public static One(): Vector2d {
            return new Vector2d(1, 1);
        }

        public ProjectOnto(v: Vector2d): Vector2d {
            return v.Multiply(this.Dot(v) / v.Dot(v));
        }

        public RotateAround(point: Vector2d, angle: number, precision: number = 2) {
            var ca = Math.cos(-angle);
            var sa = Math.sin(-angle);

            return new Vector2d(
                Math.roundTo(ca * (this.X - point.X) - sa * (this.Y - point.Y) + point.X, precision),
                Math.roundTo(sa * (this.X - point.X) + ca * (this.Y - point.Y) + point.Y, precision)
            );
        }

        public Apply(action: (val: number) => number): void {
            this.X = action(this.X);
            this.Y = action(this.Y);
        }

        public Trigger(action: (val: number) => void): void {
            action(this.X);
            action(this.Y);
        }

        public Normalized(): Vector2d {
            var magnitude = this.Magnitude();
            return new Vector2d(this.X / magnitude, this.Y / magnitude);
        }

        public Magnitude(): number {
            return Math.sqrt(this.X * this.X + this.Y * this.Y);
        }

        public Length(): number {
            return this.Magnitude();
        }

        public Dot(v1: Vector2d): number {
            return v1.X * this.X + v1.Y * this.Y;
        }

        public Abs(): Vector2d {
            return new Vector2d(Math.abs(this.X), Math.abs(this.Y));
        }

        public Sign(): Vector2d {
            return new Vector2d(this.X / Math.abs(this.X), this.Y / Math.abs(this.Y));
        }

        public Distance(v1: Vector2d): Vector2d {
            return new Vector2d(Math.abs(v1.X - this.X), Math.abs(v1.Y - this.Y));
        }

        public Add(val: Vector2d): Vector2d;
        public Add(val: number): Vector2d;
        public Add(val: any): Vector2d{
            if (val._type === "Vector2d") {
                return new Vector2d(this.X + val.X, this.Y + val.Y);
            }
            else {
                return new Vector2d(this.X + val, this.Y + val);
            }
        }

        public Multiply(val: Vector2d): Vector2d;
        public Multiply(val: number): Vector2d;
        public Multiply(val: any): Vector2d {
            if (val._type === "Vector2d") {
                return new Vector2d(this.X * val.X, this.Y * val.Y);
            }
            else {
                return new Vector2d(this.X * val, this.Y * val);
            }
        }

        public Subtract(val: Vector2d): Vector2d;
        public Subtract(val: number): Vector2d;
        public Subtract(val: any): Vector2d {
            if (val._type === "Vector2d") {
                return new Vector2d(this.X - val.X, this.Y - val.Y);
            }
            else {
                return new Vector2d(this.X - val, this.Y - val);
            }
        }

        public SubtractFrom(val: Vector2d): Vector2d;
        public SubtractFrom(val: number): Vector2d;
        public SubtractFrom(val: any): Vector2d {
            if (val._type === "Vector2d") {
                return new Vector2d(val.X - this.X, val.Y - this.Y);
            }
            else {
                return new Vector2d(val - this.X, val - this.Y);
            }
        }

        public Divide(val: Vector2d): Vector2d;
        public Divide(val: number): Vector2d;
        public Divide(val: any): Vector2d {
            if (val._type === "Vector2d") {
                return new Vector2d(this.X / val.X, this.Y / val.Y);
            }
            else {
                return new Vector2d(this.X / val, this.Y / val);
            }
        }

        public DivideFrom(val: Vector2d): Vector2d;
        public DivideFrom(val: number): Vector2d;
        public DivideFrom(val: any): Vector2d {
            if (val._type === "Vector2d") {
                return new Vector2d(val.X / this.X, val.Y / this.Y);
            }
            else {
                return new Vector2d(val / this.X, val / this.Y);
            }
        }

        public Negate(): Vector2d {
            return new Vector2d(this.X * -1, this.Y * -1);
        }

        public Equivalent(v: Vector2d): bool {
            return this.X === v.X && this.Y === v.Y;
        }

        public Clone(): Vector2d {
            return new Vector2d(this.X, this.Y);
        }

        // toString override 
        public toString(): string {
            return "(" + this.X + ", " + this.Y + ")";
        }
    }
}
/* Size2d.ts.Name */



module EndGate.Core.Assets {
    export class Size2d implements ITyped {
        public _type: string = "Size2d";

        public Width: number;
        public Height: number;

        constructor(width: number, height?: number) {
            this.Width = width || 0;
            this.Height = typeof height !== "undefined" ? height : this.Width;
        }

        public static Zero(): Size2d {
            return new Size2d(0, 0);
        }

        public static One(): Size2d {
            return new Size2d(1, 1);
        }

        public Radius(): number {
            return .5 * Math.sqrt(this.Width * this.Width + this.Height * this.Height);
        }

        public HalfWidth(): number {
            return this.Width / 2;
        }

        public HalfHeight(): number {
            return this.Height / 2;
        }

        public Apply(action: (val: number) => number): void {
            this.Width = action(this.Width);
            this.Height = action(this.Height);
        }

        public Trigger(action: (val: number) => void ): void {
            action(this.Width);
            action(this.Height);
        }

        public Add(val: Size2d): Size2d;
        public Add(val: Vector2d): Size2d;
        public Add(val: number): Size2d;
        public Add(val: any): Size2d {
            if (val._type === "Size2d") {
                return new Size2d(this.Width + val.Width, this.Height + val.Height);
            }
            else if (val._type === "Vector2d") {
                return new Size2d(this.Width + val.X, this.Height + val.Y);
            }
            else {
                return new Size2d(this.Width + val, this.Height + val);
            }
        }

        public Multiply(val: Size2d): Size2d;
        public Multiply(val: Vector2d): Size2d;
        public Multiply(val: number): Size2d;
        public Multiply(val: any): Size2d {
            if (val._type === "Size2d") {
                return new Size2d(this.Width * val.Width, this.Height * val.Height);
            }
            else if (val._type === "Vector2d") {
                return new Size2d(this.Width * val.X, this.Height * val.Y);
            }
            else {
                return new Size2d(this.Width * val, this.Height * val);
            }
        }

        public Subtract(val: Size2d): Size2d;
        public Subtract(val: Vector2d): Size2d;
        public Subtract(val: number): Size2d;
        public Subtract(val: any): Size2d {
            if (val._type === "Size2d") {
                return new Size2d(this.Width - val.Width, this.Height - val.Height);
            }
            else if (val._type === "Vector2d") {
                return new Size2d(this.Width - val.X, this.Height - val.Y);
            }
            else {
                return new Size2d(this.Width - val, this.Height - val);
            }
        }

        public SubtractFrom(val: Size2d): Size2d;
        public SubtractFrom(val: Vector2d): Size2d;
        public SubtractFrom(val: number): Size2d;
        public SubtractFrom(val: any): Size2d {
            if (val._type === "Size2d") {
                return new Size2d(val.Width - this.Width, val.Height - this.Height);
            }
            else if (val._type === "Vector2d") {
                return new Size2d(val.X - this.Width, val.Y - this.Height);
            }
            else {
                return new Size2d(val - this.Width, val - this.Height);
            }
        }

        public Divide(val: Size2d): Size2d;
        public Divide(val: Vector2d): Size2d;
        public Divide(val: number): Size2d;
        public Divide(val: any): Size2d {
            if (val._type === "Size2d") {
                return new Size2d(this.Width / val.Width, this.Height / val.Height);
            }
            else if (val._type === "Vector2d") {
                return new Size2d(this.Width / val.X, this.Height / val.Y);
            }
            else {
                return new Size2d(this.Width / val, this.Height / val);
            }
        }

        public DivideFrom(val: Size2d): Size2d;
        public DivideFrom(val: Vector2d): Size2d;
        public DivideFrom(val: number): Size2d;
        public DivideFrom(val: any): Size2d {
            if (val._type === "Size2d") {
                return new Size2d(val.Width / this.Width, val.Height / this.Height);
            }
            else if (val._type === "Vector2d") {
                return new Size2d(val.X / this.Width, val.Y / this.Height);
            }
            else {
                return new Size2d(val / this.Width, val / this.Height);
            }
        }

        public Negate(): Size2d {
            return new Size2d(this.Width * -1, this.Height * -1);
        }

        public Equivalent(v: Size2d): bool {
            return this.Width === v.Width && this.Height === v.Height;
        }

        public Clone(): Size2d {
            return new Size2d(this.Width, this.Height);
        }

        // toString override 
        public toString(): string {
            return "(" + this.Width + ", " + this.Height + ")";
        }
    }
}
/* MinMax.ts.Name */
module EndGate.Core.Assets {

    export class MinMax {
        public Min: number;
        public Max: number;

        constructor(min: number, max: number) {
            this.Min = min;
            this.Max = max;
        }
    }

}
/* Vector2dHelpers.ts.Name */



module EndGate.Core.Assets {

    export class Vector2dHelpers {
        public static GetMinMaxProjections(axis: Vector2d, vertices: Vector2d[]): MinMax
        {
            var min: number = vertices[0].ProjectOnto(axis).Dot(axis);
            var max: number = min;

            for (var i: number = 1; i < vertices.length; i++)
            {
                var vertex: Vector2d = vertices[i];
                var value: number = vertex.ProjectOnto(axis).Dot(axis);

                if (value < min) {
                    min = value;
                }
                else if (value > max) {
                    max = value;
                }
            }

            return new MinMax(min, max);
        }
    }

}
/* PrimitiveExtensions.ts.Name */


interface Object extends ITyped {}

Number.prototype._type = "Number";
String.prototype._type = "String";
Boolean.prototype._type = "Boolean";
Array.prototype._type = "Array";
Date.prototype._type = "Date";
Object.prototype._type = "Object";
Error.prototype._type = "Error";
/* WindowExtensions.ts.Name */
(<any >window).readyForRender = (function () {
    return window.requestAnimationFrame ||
    (<any>window).webkitRequestAnimationFrame ||
    (<any>window).mozRequestAnimationFrame ||
    (<any>window).oRequestAnimationFrame ||
    (<any>window).msRequestAnimationFrame;
})();
