/* IDisposable.d.ts */
interface IDisposable {
    Dispose(): void;
}
/* ITyped.d.ts */
interface ITyped {
    _type: string;
}
/* GameTime.ts */


module EndGate.Core {

    export class GameTime implements ITyped {
        public _type: string = "GameTime";

        public Now: Date;
        // Time in milliseconds
        public Total: number;
        public Elapsed: number;
        public ElapsedSecond: number;

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
            this.ElapsedSecond = this.Elapsed / 1000;
            this.Total = nowMs - this._start;
            this.Now = now;
        }
    }

}
/* IUpdateable.d.ts */


module EndGate.Core {

    export interface IUpdateable {
        Update(gameTime: EndGate.Core.GameTime): void;
    }

}
/* IRenderable.d.ts */
module EndGate.Core.Rendering {

    export interface IRenderable {
        ZIndex: number;
        Draw(context: CanvasRenderingContext2D): void;
    }

}
/* LooperCallback.ts */


module EndGate.Core.Loopers {

    export class LooperCallback implements ITyped {
        public _type: string = "LooperCallback";

        private static _ids: number = 0;

        constructor(callback: Function) {
            this.Callback = callback;
            this.ID = LooperCallback._ids++;
        }

        public Callback: Function;
        public ID: number;
    }
}
/* ILooper.d.ts */




module EndGate.Core.Loopers {

    export interface ILooper extends IDisposable, ITyped {
        Start(): void;
        AddCallback(callback: LooperCallback): void;
        RemoveCallback(callback: LooperCallback): void;
    }

}
/* TimedCallback.ts */



module EndGate.Core.Loopers {

    export class TimedCallback implements ITyped extends LooperCallback {
        public _type: string = "TimedCallback";

        constructor(fps: number, callback: Function) {
            super(callback);

            this.Fps = fps;
            this.TimeoutID = 0;
            this.Active = false;
        }

        public Fps: number;
        public TimeoutID: number;
        public Active: bool;
    }

}
/* Looper.ts */




module EndGate.Core.Loopers {

    export class Looper implements ILooper {
        public _type: string = "Looper";

        private _running: bool;
        private _callbacks: TimedCallback[];

        constructor() {
            this._running = false;
            this._callbacks = [];
        }

        public AddCallback(timedCallback: TimedCallback): void {
            this._callbacks.push(timedCallback);
            timedCallback.Active = true;

            if (this._running) {
                // Let initial call stack unwind before initiating the loop
                window.setTimeout(() => {
                    this.Loop(timedCallback);
                }, 0);
            }
        }

        public RemoveCallback(timedCallback: TimedCallback): void {
            for (var i = 0; i < this._callbacks.length; i++) {
                if(this._callbacks[i].ID === timedCallback.ID) {
                    window.clearTimeout(timedCallback.TimeoutID);
                    timedCallback.Active = false;
                    this._callbacks.splice(i, 1);
                    return;
                }
            }
        }

        public Start(): void {
            this._running = true;

            this.Run();
        }

        private Run(): void {
            for (var i = 0; i < this._callbacks.length;i++) {
                window.setTimeout(((index) => {
                    return () => {
                        this.Loop(this._callbacks[index]);
                    };
                })(i), 0);
            }
        }

        private Loop(timedCallback: TimedCallback): void {
            var that = this,
                msTimer = 1000 / timedCallback.Fps;

            timedCallback.Callback();

            if (timedCallback.Active) {
                timedCallback.TimeoutID = window.setTimeout(() => {
                    that.Loop(timedCallback);
                }, msTimer);
            }
        }

        public Dispose(): void {
            // We need to "remove" every callback to stop each of their timeouts
            for (var i = this._callbacks.length - 1; i >= 0; i--) {
                this.RemoveCallback(this._callbacks[i]);
            }

            this._callbacks = [];
            this._running = false;
        }
    }
}
/* WindowExtensions.ts */
interface Window {
    OnRepaintCompleted(callback: Function): void;
}

window.OnRepaintCompleted = () => {
    return (
        window.requestAnimationFrame ||
        (<any>window).webkitRequestAnimationFrame ||
        (<any>window).mozRequestAnimationFrame ||
        (<any>window).oRequestAnimationFrame ||
        (<any>window).msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 0);
        }
    );
} ();
/* RepaintLooper.ts */




module EndGate.Core.Loopers {

    // This looper uses the request animation frame to run its internal loop
    // The method has been aliased as "OnRepaintCompleted" via the WindowExtensions
    export class RepaintLooper implements ILooper {
        public _type: string = "RepaintLooper";

        private _running: bool;
        private _callbacksModified: bool;
        private _callbacks: LooperCallback[];

        constructor() {
            this._running = false;
            this._callbacksModified = false;
            this._callbacks = [];
        }

        public Start(): void {
            this._running = true;
            this.Run();
        }

        private Run(): void {
            if (this._running) {
                this._callbacksModified = false;

                for (var i = 0; i < this._callbacks.length; i++) {
                    this._callbacks[i].Callback();

                    if (this._callbacksModified) {
                        break;
                    }
                }

                // We want to maintain the "this" context, also we need to continuously bind
                // the method due to how the underlying native function works
                window.OnRepaintCompleted(() =>
                {
                    this.Run();
                });
            }
        }

        public AddCallback(looperCallback: LooperCallback): void {
            // This doesn't necessarily need to be here (it wont do any harm) but in order for
            // consistency sake I'm putting it in
            this._callbacksModified = true;

            this._callbacks.push(looperCallback);
        }

        public RemoveCallback(looperCallback: LooperCallback): void {           
            for (var i = 0; i < this._callbacks.length; i++) {
                if (this._callbacks[i].ID === looperCallback.ID) {
                    this._callbacksModified = true;
                    this._callbacks.splice(i, 1);
                    return;
                }
            }
        }

        public Dispose(): void {
            this._callbacksModified = true;
            this._callbacks = [];
            this._running = false;
        }
    }

}
/* GameConfiguration.ts */
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
/* MathExtensions.ts */
interface Math {
    roundTo(val?: number, decimals?: number): number;
}

Math.roundTo = function (val?: number, decimals?: number): number {
    var multiplier = Math.pow(10, decimals);

    return Math.round(val * multiplier) / multiplier;
};

(<any>Math).twoPI = Math.PI * 2;
/* Vector2d.ts */



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
/* Bounds2d.ts */




module EndGate.Core.BoundingObject {

    export class Bounds2d {
        public _boundsType: string = "Bounds2d";

        public Position: Assets.Vector2d;
        public Rotation: number;

        constructor(position: Assets.Vector2d) {
            this.Position = position;
            this.Rotation = 0;
        }

        public ContainsPoint(point: Assets.Vector2d): bool {
            throw new Error("This method is abstract!");
        }

        public Intersects(obj: Bounds2d): bool;
        public Intersects(circle: BoundingCircle): bool;
        public Intersects(rectangle: BoundingRectangle): bool;
        public Intersects(obj: any): bool {
            if (obj._boundsType === "BoundingCircle") {
                return this.IntersectsCircle(obj);
            }
            else if (obj._boundsType === "BoundingRectangle") {
                return this.IntersectsRectangle(obj);
            }
            else {
                throw new Error("Cannot intersect with unidentifiable object, must be BoundingCircle or BoundingRectangle");
            }
        }

        public IntersectsCircle(circle: BoundingCircle): bool {
            throw new Error("This method is abstract!");
        }

        public IntersectsRectangle(rectangle: BoundingRectangle): bool {
            throw new Error("This method is abstract!");
        }
    }

}
/* EventHandler.ts */



module EndGate.Core.Utilities {

    export class EventHandler implements ITyped {
        public _type: string = "Event";

        private _actions: Function[];
        private _hasBindings: bool;

        constructor() {
            this._actions = [];
            this._hasBindings = false;
        }

        public Bind(action: Function): void {
            this._actions.push(action);
            this._hasBindings = true;
        }

        public Unbind(action: Function): void {
            for (var i = 0; i < this._actions.length; i++) {
                if (this._actions[i] === action) {
                    this._actions.splice(i, 1);

                    this._hasBindings = this._actions.length > 0;
                    return;
                }
            }
        }

        public HasBindings(): bool {
            return this._hasBindings;
        }

        public Trigger(...args: any[]): void {
            for (var i = 0; i < this._actions.length; i++) {
                this._actions[i].apply(this, args);
            }
        }
    }

}
/* CollisionData.ts */



module EndGate.Core.Collision {

    export class CollisionData {
        public At: Assets.Vector2d;
        public With: Collidable;

        constructor(at: Assets.Vector2d, w: Collidable) {
            this.At = at;
            this.With = w;
        }
    }

}
/* Collidable.ts */







module EndGate.Core.Collision {

    export class Collidable implements IDisposable, ITyped {
        public _type: string = "Collidable";

        public Bounds: BoundingObject.Bounds2d;
        public ID: number;

        private static _collidableIDs: number = 0;
        private _disposed: bool;

        constructor(bounds: BoundingObject.Bounds2d) {
            this._disposed = false;
            this.Bounds = bounds;
            this.ID = Collidable._collidableIDs++;

            this.OnCollision = new Utilities.EventHandler();
            this.OnDisposed = new Utilities.EventHandler();
        }

        public OnCollision: Utilities.EventHandler;
        public OnDisposed: Utilities.EventHandler;

        public IsCollidingWith(other: Collidable): bool {
            return this.Bounds.Intersects(other.Bounds);
        }

        public Collided(data: CollisionData): void {
            this.OnCollision.Trigger(data);
        }

        public Dispose(): void {
            if (!this._disposed) {
                this._disposed = true;
                this.OnDisposed.Trigger(this);
            }
            else {
                throw new Error("Cannot dispose collidable twice.");
            }
        }
    }

}
/* CollisionManager.ts */







module EndGate.Core.Collision {

    export class CollisionManager implements IUpdateable, ITyped {
        public _type: string = "CollisionManager";

        public _collidables: Collidable[];

        private _enabled: bool;

        constructor() {
            this._collidables = [];
            this._enabled = false;

            this.OnCollision = new Utilities.EventHandler();
        }

        public OnCollision: Utilities.EventHandler;

        public Monitor(obj: Collidable): void {
            this._enabled = true;

            obj.OnDisposed.Bind(() => {
                this.Unmonitor(obj);
            });

            this._collidables.push(obj);
        }

        public Unmonitor(obj: Collidable): void {
            for (var i = 0; i < this._collidables.length; i++) {
                if (this._collidables[i].ID === obj.ID) {
                    this._collidables.splice(i, 1);
                    break;
                }
            }
        }

        public Update(gameTime: GameTime): void {
            var first: Collidable,
                second: Collidable;

            if (this._enabled) {
                for (var i = 0; i < this._collidables.length; i++) {
                    first = this._collidables[i];

                    for (var j = i + 1; j < this._collidables.length; j++) {
                        second = this._collidables[j];

                        if (first.IsCollidingWith(second)) {
                            first.Collided(new CollisionData(first.Bounds.Position.Clone(), second));
                            second.Collided(new CollisionData(second.Bounds.Position.Clone(), first));
                            this.OnCollision.Trigger(first, second);
                        }
                    }
                }
            }
        }
    }

}
/* Size2d.ts */



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
/* Graphic2dState.ts */


module EndGate.Core.Graphics {

    export class Graphic2dState implements ITyped {
        public _type: string ="Graphic2dState";

        private _cachedState: { [property: string]: any; };

        constructor() {
            this._cachedState = {};
        }
        
        public StrokeStyle(value?: string): string {
            return this.GetOrSetCache("strokeStyle", value);
        }

        public FillStyle(value?: string): string {
            return this.GetOrSetCache("fillStyle", value);
        }

        public GlobalAlpha(value?: number): number {
            return this.GetOrSetCache("globalAlpha", value);
        }

        public LineWidth(value?: number): number {
            return this.GetOrSetCache("lineWidth", value);
        }

        public LineCap(value?: string): string {
            return this.GetOrSetCache("lineCap", value);
        }

        public LineJoin(value?: string): string {
            return this.GetOrSetCache("lineJoin", value);
        }

        public MiterLimit(value?: number): number {
            return this.GetOrSetCache("miterLimit", value);
        }
        
        public ShadowOffsetX(value?: number): number {
            return this.GetOrSetCache("shadowOffsetX", value);
        }

        public ShadowOffsetY(value?: number): number {
            return this.GetOrSetCache("shadowOffsetY", value);
        }

        public ShadowBlur(value?: number): number {
            return this.GetOrSetCache("shadowBlur", value);
        }

        public ShadowColor(value?: string): string {
            return this.GetOrSetCache("shadowColor", value);
        }

        public GlobalCompositeOperation(value?: string): string {
            return this.GetOrSetCache("globalCompositeOperation", value);
        }

        public Font(value?: string): string {
            return this.GetOrSetCache("font", value);
        }

        public TextAlign(value?: string): string {
            return this.GetOrSetCache("textAlign", value);
        }

        public TextBaseline(value?: string): string {
            return this.GetOrSetCache("textBaseline", value);
        }

        public SetContextState(context: CanvasRenderingContext2D): void {
            for (var key in this._cachedState) {
                context[key] = this._cachedState[key];
            }
        }

        private GetOrSetCache(property: string, value: any): any {
            if (typeof value !== "undefined") {
                this._cachedState[property] = value;
            }

            return this._cachedState[property];
        }
    }

}
/* Graphic2d.ts */







module EndGate.Core.Graphics {

    export class Graphic2d implements ITyped, Rendering.IRenderable {
        public _type: string = "Graphic2d";

        public ZIndex: number;
        public Position: Assets.Vector2d;
        public Rotation: number;
        public State: Graphic2dState;

        constructor(position: Assets.Vector2d) {
            this.Position = position;
            this.Rotation = 0;
            this.ZIndex = 0;
            this.State = new Graphic2dState();
        }

        public StartDraw(context: CanvasRenderingContext2D): void {
            context.save();
            this.State.SetContextState(context);

            if (this.Rotation !== 0) {
                context.translate(this.Position.X, this.Position.Y);
                context.rotate(this.Rotation);
                context.translate(-this.Position.X, -this.Position.Y);
            }
        }

        public EndDraw(context: CanvasRenderingContext2D): void {
            context.restore();
        }

        public Draw(context: CanvasRenderingContext2D): void {
        }
    }

}
/* IRenderer.d.ts */



module EndGate.Core.Rendering {

    export interface IRenderer extends IDisposable {
        Render(renderables: IRenderable[]): CanvasRenderingContext2D;
    }

}
/* Renderer2d.ts */



module EndGate.Core.Rendering {

    export class Renderer2d implements IRenderer {
        public static _zindexSort: (a: IRenderable, b: IRenderable) => number = (a: IRenderable, b: IRenderable) => { return a.ZIndex - b.ZIndex; };

        // These essentially are used to create a double buffer for rendering
        private _visibleCanvas: HTMLCanvasElement;
        private _visibleContext: CanvasRenderingContext2D;
        private _bufferCanvas: HTMLCanvasElement;
        private _bufferContext: CanvasRenderingContext2D;        

        private _disposed: bool;

        constructor(renderOnto: HTMLCanvasElement) {
            this._visibleCanvas = renderOnto;
            this._visibleContext = renderOnto.getContext("2d");

            // Create an equally sized canvas for a buffer
            this._bufferCanvas = <HTMLCanvasElement>document.createElement("canvas");
            this._bufferContext = this._bufferCanvas.getContext("2d");
            this.UpdateBufferSize();

            this._disposed = false;
        }

        public Render(renderables: IRenderable[]): CanvasRenderingContext2D {
            // Check if our visible canvas has changed size
            if (this._bufferCanvas.width !== this._visibleCanvas.width || this._bufferCanvas.height !== this._visibleCanvas.height) {
                this.UpdateBufferSize();
            }

            // Push buffer to screen
            this._visibleContext.clearRect(0, 0, this._visibleCanvas.width, this._visibleCanvas.height);
            this._visibleContext.drawImage(this._bufferCanvas, 0, 0);
            // Clear our buffer to prepare it for new drawings
            this._bufferContext.clearRect(0, 0, this._bufferCanvas.width, this._bufferCanvas.height);

            // Sort the renderables by the ZIndex so we draw in the correct order (for layering);
            renderables.sort(Renderer2d._zindexSort);

            // We do not save or restore the canvas state because we want to let the
            // dev decide how they manipulate the canvas            

            for (var i = 0; i < renderables.length; i++) {
                renderables[i].Draw(this._bufferContext);
            }

            return this._bufferContext;            
        }

        public Dispose(): void {
            if (!this._disposed) {
                this._disposed = true;

                this._visibleCanvas.parentNode.removeChild(this._visibleCanvas);
            }
        }

        private UpdateBufferSize()
        {
            this._bufferCanvas.width = this._visibleCanvas.width;
            this._bufferCanvas.height = this._visibleCanvas.height;
        }
    }

}
/* Scene.ts */







module EndGate.Core.Rendering {
    
    export class Scene implements ITyped, IDisposable {
        public _type: string = "Scene";

        public DrawArea: HTMLCanvasElement;

        private _actors: Graphics.Graphic2d[];
        private _renderer: IRenderer;
        private _onDraw: (context: CanvasRenderingContext2D) => void;

        private _disposed: bool;

        constructor(drawArea?: HTMLCanvasElement, onDraw?: (context: CanvasRenderingContext2D) => void) {
            this._actors = [];

            if (typeof drawArea === "undefined") {
                drawArea = this.CreateDefaultDrawArea();
            }

            if (typeof onDraw === "undefined") {
                this._onDraw = _ => { };
            }
            else {
                this._onDraw = onDraw;
            }

            this.DrawArea = drawArea;
            this._renderer = new Renderer2d(this.DrawArea);
            this._disposed = false;
        }

        public Add(actor: Graphics.Graphic2d): void {
            this._actors.push(actor);
        }

        public Remove(actor: Graphics.Graphic2d): void {
            for (var i = 0; i < this._actors.length; i++) {
                if (this._actors[i] === actor) {
                    this._actors.splice(i, 1);
                    return;
                }
            }
        }

        public Draw(): void {
            this._onDraw(this._renderer.Render(this._actors));
        }

        public Dispose(): void {
            if (!this._disposed) {
                this._disposed = true;
                this._actors = [];
                this._renderer.Dispose();
            }
        }

        private CreateDefaultDrawArea(): HTMLCanvasElement {
            var drawArea = <HTMLCanvasElement>document.createElement("canvas");
            drawArea.width = window.innerWidth;
            drawArea.height = window.innerHeight;
            document.getElementsByTagName('body')[0].appendChild(drawArea);

            return drawArea;
        }
    }

}
/* MouseButton.ts */
module EndGate.Core.Input.Mouse {

    export class MouseButton {
        public static Left: string = "Left";
        public static Middle: string = "Middle";
        public static Right: string = "Right";
    }

}
/* IMouseEvent.d.ts */


module EndGate.Core.Input.Mouse {

    export interface IMouseEvent {
        Position: Assets.Vector2d;
    }

}
/* IMouseClickEvent.d.ts */



module EndGate.Core.Input.Mouse {

    export interface IMouseClickEvent extends IMouseEvent {
        Button: string;
    }

}
/* IMouseScrollEvent.d.ts */



module EndGate.Core.Input.Mouse {

    export interface IMouseScrollEvent extends IMouseEvent{
        Direction: Assets.Vector2d;
    }

}
/* MouseHandler.ts */







module EndGate.Core.Input.Mouse {

    export class MouseHandler {
        // Used to determine mouse buttons without using extra conditional statements, performance enhancer
        private static MouseButtonArray = [null, MouseButton.Left, MouseButton.Middle, MouseButton.Right];

        private _target: HTMLCanvasElement;

        constructor(target: HTMLCanvasElement) {
            this._target = target;

            this.OnClick = new Utilities.EventHandler();
            this.OnDoubleClick = new Utilities.EventHandler();
            this.OnDown = new Utilities.EventHandler();
            this.OnUp = new Utilities.EventHandler();
            this.OnMove = new Utilities.EventHandler();
            this.OnScroll = new Utilities.EventHandler();

            this.Wire();
        }

        public OnClick: Utilities.EventHandler;
        public OnDoubleClick: Utilities.EventHandler;
        public OnDown: Utilities.EventHandler;
        public OnUp: Utilities.EventHandler;
        public OnMove: Utilities.EventHandler;

        public OnScroll: Utilities.EventHandler;

        private Wire(): void {
            this._target.onclick = this._target.oncontextmenu = this.BuildEvent(this.OnClick, this.BuildMouseClickEvent);
            this._target.ondblclick = this.BuildEvent(this.OnDoubleClick, this.BuildMouseClickEvent);
            this._target.onmousedown = this.BuildEvent(this.OnDown, this.BuildMouseClickEvent);
            this._target.onmouseup = this.BuildEvent(this.OnUp, this.BuildMouseClickEvent);
            this._target.onmousemove = this.BuildEvent(this.OnMove, this.BuildMouseEvent);

            // OnScroll, in order to detect horizontal scrolling need to hack a bit (browser sniffing)
            // if we were just doing vertical scrolling we could settle with the else statement in this block
            if ((/MSIE/i.test(navigator.userAgent))) {
                this._target.addEventListener("wheel", this.BuildEvent(this.OnScroll, (e: any) => {
                    e.wheelDeltaX = -e.deltaX;
                    e.wheelDeltaY = -e.deltaY;
                    return this.BuildMouseScrollEvent(e);
                }), false);
            }
            else if ((/Firefox/i.test(navigator.userAgent))) {
                this._target.addEventListener("DOMMouseScroll", this.BuildEvent(this.OnScroll, (e: any) => {
                    e.wheelDeltaX = e.axis === 1 ? -e.detail : 0;
                    e.wheelDeltaY = e.axis === 2 ? -e.detail : 0;
                    return this.BuildMouseScrollEvent(e);
                }), false);
            }
            else {
                this._target.addEventListener("mousewheel", this.BuildEvent(this.OnScroll, this.BuildMouseScrollEvent), false);
            }
        }

        private BuildEvent(eventHandler: Utilities.EventHandler, mouseEventBuilder: (mouseEvent: MouseEvent) => IMouseEvent, returnValue: bool = false): (e: MouseEvent) => void {
            return (e: MouseEvent) => {
                if (eventHandler.HasBindings()) {
                    eventHandler.Trigger(mouseEventBuilder.call(this, e));
                }

                return returnValue;
            }
        }

        private BuildMouseScrollEvent(event: MouseWheelEvent): IMouseScrollEvent {
            return {
                Position: this.GetMousePosition(event),
                Direction: this.GetMouseScrollDierction(event)
            };
        }

        private BuildMouseEvent(event: MouseEvent): IMouseEvent {
            return {
                Position: this.GetMousePosition(event)
            };
        }

        private BuildMouseClickEvent(event: MouseEvent): IMouseClickEvent {
            return {
                Position: this.GetMousePosition(event),
                Button: this.GetMouseButton(event)
            };
        }

        private GetMousePosition(event: MouseEvent): Assets.Vector2d {
            return new Assets.Vector2d(
                event.offsetX ? (event.offsetX) : event.pageX - this._target.offsetLeft,
                event.offsetY ? (event.offsetY) : event.pageY - this._target.offsetTop
            );
        }

        private GetMouseButton(event: MouseEvent): string {
            if (event.which) {
                return MouseHandler.MouseButtonArray[event.which];
            }

            return MouseButton.Right;
        }

        private GetMouseScrollDierction(event: any): Assets.Vector2d{
            return new Assets.Vector2d(-Math.max(-1, Math.min(1, event.wheelDeltaX)), -Math.max(-1, Math.min(1, event.wheelDeltaY)));
        }
    }

}
/* InputManager.ts */


module EndGate.Core.Input {

    export class InputManager {
        public Mouse: Mouse.MouseHandler;

        constructor(canvas: HTMLCanvasElement) {
            this.Mouse = new Mouse.MouseHandler(canvas);
        }
    }

}
/* Game.ts */










module EndGate.Core {

    export class Game implements ITyped, IUpdateable, IDisposable {
        public _type: string = "Game";

        public ID: number;
        public Configuration: GameConfiguration;
        public CollisionManager: Collision.CollisionManager;
        public Scene: Rendering.Scene;
        public Input: Input.InputManager;

        private static _gameIds: number = 0;
        private _gameTime: GameTime;

        constructor(gameCanvas?:HTMLCanvasElement) {
            this._gameTime = new GameTime();
            // Call draw on Game LAST
            this.ID = Game._gameIds++;

            this.Scene = new Rendering.Scene(gameCanvas, context => {
                this.Draw(context);
            });

            this.Input = new Input.InputManager(this.Scene.DrawArea);
            this.CollisionManager = new Collision.CollisionManager();
            this.Configuration = new GameConfiguration(GameRunnerInstance.Register(this))
        }

        public PrepareUpdate(): void {
            this._gameTime.Update();

            this.CollisionManager.Update(this._gameTime);
            this.Update(this._gameTime);
        }

        public Update(gameTime: GameTime): void {
        }

        public PrepareDraw(): void {
            this.Scene.Draw();
        }

        // This is called by the scene
        public Draw(context: CanvasRenderingContext2D): void {
        }

        public Dispose()
        {
            this.Scene.Dispose();
            GameRunnerInstance.Unregister(this);
        }
    }

}
/* GameRunner.ts */






module EndGate.Core {    

    export class GameRunner implements ITyped {
        public _type: string = "GameRunner";

        private _updateCallbacks: { [id: number]: Loopers.TimedCallback; };
        private _drawCallbacks: { [id: number]: Loopers.LooperCallback; };
        private _updateLoop: Loopers.Looper;
        private _drawLoop: Loopers.RepaintLooper;
        private _callbackCount: number;

        constructor() {
            this._updateCallbacks = <{ [s: number]: Loopers.TimedCallback; } >{};
            this._drawCallbacks = <{ [s: number]: Loopers.LooperCallback; } >{};
            this._updateLoop = null;
            this._drawLoop = null;
            this._callbackCount = 0;
        }

        public Register(game: Game): (updateRate: number) => void {
            var updateCallback = this.CreateAndCacheUpdateCallback(game);
            var drawCallback = this.CreateAndCacheDrawCallback(game);

            this._callbackCount++;

            // Try to start the loop prior to adding our games callback.  This callback may be the first, hence the "Try"
            this.TryLoopStart();

            // Add our callback to the game loop (which is now running), it will now be called on an interval dictated by updateCallback
            this._updateLoop.AddCallback(updateCallback);
            this._drawLoop.AddCallback(drawCallback);

            // Updating the "updateRate" is an essential element to the game configuration.
            // If a game is running slowly we need to be able to slow down the update rate.
            return this.CreateUpdateRateSetter(updateCallback);
        }

        public Unregister(game: Game): void {
            var updateCallback,
                drawCallback;

            if (this._updateCallbacks[game.ID]) {
                updateCallback = this._updateCallbacks[game.ID];
                drawCallback = this._drawCallbacks[game.ID];

                this._updateLoop.RemoveCallback(updateCallback);
                this._drawLoop.RemoveCallback(drawCallback);
                delete this._updateCallbacks[game.ID];
                delete this._drawCallbacks[game.ID];

                this._callbackCount--

                this.TryLoopStop();
            }
        }

        private TryLoopStart(): void {
            if (this._callbackCount === 1) {
                this._updateLoop = new Loopers.Looper();
                this._updateLoop.Start();
                this._drawLoop = new Loopers.RepaintLooper();
                this._drawLoop.Start();
            }
        }

        private TryLoopStop(): void {
            if (this._callbackCount === 0 && this._updateLoop != null) {
                this._updateLoop.Dispose();
                this._updateLoop = null;
                this._drawLoop.Dispose();
                this._drawLoop = null;
            }
        }

        private CreateAndCacheUpdateCallback(game: Game): Loopers.TimedCallback {
            var updateCallback = new Loopers.TimedCallback(0, () => {
                game.PrepareUpdate();
            });

            this._updateCallbacks[game.ID] = updateCallback;            

            return updateCallback;
        };

        private CreateAndCacheDrawCallback(game: Game): Loopers.LooperCallback {
            var drawCallback = new Loopers.LooperCallback(() => {
                game.PrepareDraw();
            });

            this._drawCallbacks[game.ID] = drawCallback;

            return drawCallback;
        }

        private CreateUpdateRateSetter(callback: Loopers.TimedCallback): (updateRate: number) => void {
            return (updateRate) => {
                callback.Fps = updateRate;
            };
        }
    }
}

var GameRunnerInstance: EndGate.Core.GameRunner = new EndGate.Core.GameRunner();
/* MinMax.ts */
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
/* Vector2dHelpers.ts */



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
/* BoundingCircle.ts */




module EndGate.Core.BoundingObject {

    export class BoundingCircle implements ITyped extends Bounds2d {
        public _type: string = "BoundingCircle";
        public _boundsType: string = "BoundingCircle";

        public Radius: number;

        constructor(position: Assets.Vector2d, radius: number) {
            super(position);

            this.Radius = radius;
        }

        public Area(): number {
            return Math.PI * this.Radius * this.Radius;
        }

        public Circumfrence(): number {
            return 2 * Math.PI * this.Radius;
        }

        // For some reason when compiled into a single .ts file if this isn't fully declared it doesn't compile
        public IntersectsCircle(circle: EndGate.Core.BoundingObject.BoundingCircle): bool {
            return this.Position.Distance(circle.Position).Length() < this.Radius + circle.Radius;
        }

        // For some reason when compiled into a single .ts file if this isn't fully declared it doesn't compile
        public IntersectsRectangle(rectangle: EndGate.Core.BoundingObject.BoundingRectangle): bool {
            var translated = (rectangle.Rotation === 0)
                                  ? this.Position
                                  : this.Position.RotateAround(rectangle.Position, rectangle.Rotation);

            var circleDistance = translated.Distance(rectangle.Position);

            if (circleDistance.X > (rectangle.Size.HalfWidth() + this.Radius)) { return false; }
            if (circleDistance.Y > (rectangle.Size.HalfHeight() + this.Radius)) { return false; }

            if (circleDistance.X <= (rectangle.Size.HalfWidth())) { return true; }
            if (circleDistance.Y <= (rectangle.Size.HalfHeight())) { return true; }

            var cornerDistance_sq = Math.pow(circleDistance.X - rectangle.Size.HalfWidth(), 2) + Math.pow(circleDistance.Y - rectangle.Size.HalfHeight(), 2);

            return (cornerDistance_sq <= (this.Radius * this.Radius));
        }

        public ContainsPoint(point: Assets.Vector2d): bool {
            return this.Position.Distance(point).Magnitude() < this.Radius;
        }
    }

}
/* BoundingRectangle.ts */





module EndGate.Core.BoundingObject {

    export class BoundingRectangle implements ITyped extends Bounds2d {
        public _type: string = "BoundingRectangle";
        public _boundsType: string = "BoundingRectangle";

        public Size: Assets.Size2d;

        constructor(position: Assets.Vector2d, size: Assets.Size2d) {
            super(position);
            this.Size = size;
        }

        public Vertices(): Assets.Vector2d[] {
            return [this.TopLeft(), this.TopRight(), this.BotLeft(), this.BotRight()];
        }

        public TopLeft(): Assets.Vector2d {
            var v = new Assets.Vector2d(this.Position.X - this.Size.HalfWidth(), this.Position.Y - this.Size.HalfHeight());
            if (this.Rotation === 0) {
                return v;
            }

            return v.RotateAround(this.Position, this.Rotation);
        }

        public TopRight(): Assets.Vector2d {
            var v = new Assets.Vector2d(this.Position.X + this.Size.HalfWidth(), this.Position.Y - this.Size.HalfHeight());
            if (this.Rotation === 0) {
                return v;
            }

            return v.RotateAround(this.Position, this.Rotation);
        }

        public BotLeft(): Assets.Vector2d {
            var v = new Assets.Vector2d(this.Position.X - this.Size.HalfWidth(), this.Position.Y + this.Size.HalfHeight());
            if (this.Rotation === 0) {
                return v;
            }

            return v.RotateAround(this.Position, this.Rotation);
        }

        public BotRight(): Assets.Vector2d {
            var v = new Assets.Vector2d(this.Position.X + this.Size.HalfWidth(), this.Position.Y + this.Size.HalfHeight());
            if (this.Rotation === 0) {
                return v;
            }

            return v.RotateAround(this.Position, this.Rotation);
        }

        // For some reason when compiled into a single .ts file if this isn't fully declared it doesn't compile
        public IntersectsCircle(circle: EndGate.Core.BoundingObject.BoundingCircle): bool {
            return circle.IntersectsRectangle(this);
        }

        // For some reason when compiled into a single .ts file if this isn't fully declared it doesn't compile
        public IntersectsRectangle(rectangle: EndGate.Core.BoundingObject.BoundingRectangle): bool {
            if (this.Rotation === 0 && rectangle.Rotation === 0) {
                var myTopLeft = this.TopLeft(),
                    myBotRight = this.BotRight(),
                    theirTopLeft = rectangle.TopLeft(),
                    theirBotRight = rectangle.BotRight();

                return theirTopLeft.X <= myBotRight.X && theirBotRight.X >= myTopLeft.X && theirTopLeft.Y <= myBotRight.Y && theirBotRight.Y >= myTopLeft.Y;
            }
            else if (rectangle.Position.Distance(this.Position).Magnitude() <= rectangle.Size.Radius() + this.Size.Radius()) {// Check if we're somewhat close to the rectangle ect that we might be colliding with
                var axisList: Assets.Vector2d[] = [this.TopRight().Subtract(this.TopLeft()), this.TopRight().Subtract(this.BotRight()), rectangle.TopLeft().Subtract(rectangle.BotLeft()), rectangle.TopLeft().Subtract(rectangle.TopRight())];
                var myVertices = this.Vertices();
                var theirVertices = rectangle.Vertices();

                for (var i: number = 0; i < axisList.length; i++) {
                    var axi = axisList[i];
                    var myProjections = Assets.Vector2dHelpers.GetMinMaxProjections(axi, myVertices);
                    var theirProjections = Assets.Vector2dHelpers.GetMinMaxProjections(axi, theirVertices);

                    // No collision
                    if (theirProjections.Max < myProjections.Min || myProjections.Max < theirProjections.Min) {
                        return false;
                    }
                }

                return true;
            }

            return false;
        }

        public ContainsPoint(point: Assets.Vector2d): bool {
            var savedRotation: number = this.Rotation;

            if (this.Rotation !== 0) {
                this.Rotation = 0;
                point = point.RotateAround(this.Position, -savedRotation);
            }

            var myTopLeft = this.TopLeft(),
                myBotRight = this.BotRight();

            this.Rotation = savedRotation;

            return point.X <= myBotRight.X && point.X >= myTopLeft.X && point.Y <= myBotRight.Y && point.Y >= myTopLeft.Y;
        }        
    }

}
/* Shape.ts */



module EndGate.Core.Graphics.Shapes  {

    export class Shape extends Graphic2d {
        public _type: string = "Shape";
        private _fill: bool;
        private _stroke: bool;

        constructor(position: Assets.Vector2d, color?: string) {
            super(position);

            this._fill = false;
            this._stroke = false;

            if (typeof color !== "undefined") {
                this.Color(color);
            }
        }

        public Color(color?: string): string {
            this._fill = true;
            return this.State.FillStyle(color);
        }
        
        public Border(thickness?: number, color?: string): any[]{
            return [this.BorderThickness(thickness), this.BorderColor(color)];
        }

        public BorderThickness(thickness?: number): number {
            return this.State.LineWidth(thickness);
        }

        public BorderColor(color?: string): string {
            this._stroke = true;
            return this.State.StrokeStyle(color);
        }

        public Shadow(x?: number, y?: number, color?: string, blur?: number): any[] {
            return [this.ShadowX(x), this.ShadowY(y), this.ShadowColor(color), this.ShadowBlur(blur)];
        }

        public ShadowColor(color?: string): string {
            this._fill = true;
            return this.State.ShadowColor(color);
        }

        public ShadowX(val?: number): number {
            return this.State.ShadowOffsetX(val);
        }

        public ShadowY(val?: number): number {
            return this.State.ShadowOffsetY(val);
        }

        public ShadowBlur(val?: number): number {
            return this.State.ShadowBlur(val);
        }

        public Opacity(alpha?: number): number {
            return this.State.GlobalAlpha(alpha);
        }

        public StartDraw(context: CanvasRenderingContext2D): void {
            context.beginPath();

            super.StartDraw(context);
        }

        public EndDraw(context: CanvasRenderingContext2D): void {
            if (this._fill) {
                context.fill();
            }
            
            if (this._stroke) {
                context.stroke();
            }
            else {
                context.closePath();
            }

            super.EndDraw(context);
        }

        // This should be overridden if you want to build a proper shape
        public BuildPath(context: CanvasRenderingContext2D): void {
        }

        // You can override this Draw if you want to implement your own logic for applying styles and drawing (do not recommend overriding)
        public Draw(context: CanvasRenderingContext2D): void {
            this.StartDraw(context);
            this.BuildPath(context);
            this.EndDraw(context);
        }
    }
}
/* Circle.ts */





module EndGate.Core.Graphics.Shapes {

    export class Circle extends Shape {
        public _type: string = "Circle";

        public Radius: number;

        constructor(x: number, y: number, radius: number, color?: string) {
            super(new Assets.Vector2d(x, y), color);

            this.Radius = radius;
        }

        public BuildPath(context: CanvasRenderingContext2D): void {           
            context.arc(this.Position.X, this.Position.Y, this.Radius, 0, (<any>Math).twoPI);
        }
    }
}
/* Rectangle.ts */





module EndGate.Core.Graphics.Shapes {

    export class Rectangle extends Shape {
        public _type: string = "Rectangle";

        public Size: Assets.Size2d;

        constructor(x: number, y: number, width: number, height: number, color?: string) {
            super(new Assets.Vector2d(x, y), color);

            this.Size = new Assets.Size2d(width, height);
        }

        public BuildPath(context: CanvasRenderingContext2D): void {
            context.rect(this.Position.X - this.Size.HalfWidth(), this.Position.Y - this.Size.HalfHeight(), this.Size.Width, this.Size.Height);
        }
    }

}
/* NoopTripInvoker.ts */
module EndGate.Core.Utilities {

    export class NoopTripInvoker {
        private static _noop: Function = () => { };
        private _invoker: Function;
        private _action: Function;

        constructor(action: Function) {
            this._invoker = NoopTripInvoker._noop;
            this._action = action;
        }

        public Invoke(...args: any[]) {
            this._invoker.apply(this, args);
        }

        public Trip() {
            this._invoker = this._action;
        }

        public Reset() {
            this._invoker = NoopTripInvoker._noop;
        }
    }

}
/* Text2d.ts */




module EndGate.Core.Graphics.Text {

    export class Text2d extends Graphic2d {
        private _text: string;
        private _stroker: Utilities.NoopTripInvoker;

        constructor(position: Assets.Vector2d, text: string, color: string = "black") {
            super(position);

            this._text = text;
            this._stroker = new Utilities.NoopTripInvoker((context: CanvasRenderingContext2D) => {
                context.strokeText(this._text, this.Position.X, this.Position.Y);
            });

            this.Align("center");
            this.Baseline("middle");
            this.Color(color);
        }

        public Align(alignment?: string): string {
            return this.State.TextAlign(alignment);
        }

        public Baseline(baseline?: string): string {
            return this.State.TextBaseline(baseline);
        }

        public Color(color?: string): string {
            return this.State.FillStyle(color);
        }

        public Font(font: string): string {
            return this.State.Font(font);
        }

        public Text(text?: string): string {
            if (typeof text !== "undefined") {
                this._text = text;
            }

            return this._text;
        }

        public Border(thickness?: number, color?: string): any[] {
            return [this.BorderThickness(thickness), this.BorderColor(color)];
        }

        public BorderThickness(thickness?: number): number {
            if (thickness === 0) {
                this._stroker.Reset();
            }
            else {
                this._stroker.Trip();
            }

            return this.State.LineWidth(thickness);
        }

        public BorderColor(color?: string): string {
            this._stroker.Trip();
            return this.State.StrokeStyle(color);
        }

        public Draw(context: CanvasRenderingContext2D): void {
            super.StartDraw(context);

            context.fillText(this._text, this.Position.X, this.Position.Y);
            this._stroker.Invoke(context);

            super.EndDraw(context);
        }
    }

}
