module EndGate {
    interface IDisposable {
        Dispose(): void;
    }
}
module EndGate._ {
    interface ITyped {
        _type: string;
    }
}
module EndGate {
    class GameTime implements _.ITyped {
        public _type: string;
        public Now: Date;
        public Total: number;
        public Elapsed: number;
        public ElapsedSecond: number;
        private _start;
        constructor();
        public Update(): void;
    }
}
module EndGate {
    interface IUpdateable {
        Update(gameTime: GameTime): void;
    }
}
interface Math {
    roundTo(val?: number, decimals?: number): number;
}
module EndGate {
    /**
    * Defines a two dimensional vector object which specifies an X and Y.
    */
    class Vector2d implements _.ITyped {
        public _type: string;
        /**
        * Gets or sets the X component of the vector.
        */
        public X: number;
        /**
        * Gets or sets the Y component of the vector.
        */
        public Y: number;
        /**
        * Creates a new instance of Vector2d with the X and Y components initialized to 0.
        */
        constructor();
        /**
        * Creates a new instance of Vector2d.
        * @param x Initial value of the X component of the Vector2d.
        * @param y Initial value of the Y component of the Vector2d.
        */
        constructor(x: number, y: number);
        /**
        * Returns a Vector2d with all its components set to zero.
        */
        static Zero(): Vector2d;
        /**
        * Returns a Vector2d with all its components set to one.
        */
        static One(): Vector2d;
        /**
        * Returns a Vector2d that represents the current Vector2d projected onto the provided Vector2d.
        * @param vector Source vector.
        */
        public ProjectOnto(vector: Vector2d): Vector2d;
        /**
        * Returns a Vector2d that represents the current Vector2d rotated around the provided point and angle.
        * @param point Point to rotate around.
        * @param angle How far to rotate around the point.
        */
        public RotateAround(point: Vector2d, angle: number);
        /**
        * Returns a Vector2d that represents the current Vector2d rotated around the provided point and angle.
        * @param point Point to rotate around.
        * @param angle How far to rotate around the point.
        * @param precision The precision of the resulting Vector2d's X and Y components.
        */
        public RotateAround(point: Vector2d, angle: number, precision: number);
        /**
        * Executes the action with the X and Y components of this Vector2d and sets the X and Y components to the corresponding return values.
        * @param action The function used to modify the X and Y components.
        */
        public Apply(action: (val: number) => number): void;
        /**
        * Executes the action with the X and Y components of this Vector2d.
        * @param action The function to pass the X and Y components to.
        */
        public Trigger(action: (val: number) => void): void;
        /**
        * Returns the current vector as a unit vector. The result is a vector one unit in length pointing in the same direction as the original vector.
        */
        public Normalized(): Vector2d;
        /**
        * Calculates the magnitude or length of the vector
        */
        public Magnitude(): number;
        /**
        * Calculates the length or magnitude of the vector
        */
        public Length(): number;
        /**
        * Calculates dot product.
        * @param vector Source vector.
        */
        public Dot(vector: Vector2d): number;
        /**
        * Returns a Vector2d that has the current Vector2d's X and Y components as positive values.
        */
        public Abs(): Vector2d;
        /**
        * Returns a Vector2d that has its X and Y components converted to -1, 0 or 1 depending on the current Vector2d's component values.
        */
        public Sign(): Vector2d;
        /**
        * Calculates the distance between the current vector and the provided one.
        */
        public Distance(vector: Vector2d): Vector2d;
        /**
        * Returns a Vector2d that is the result of adding the X and Y of this Vector2d to the X and Y of the provided Vector2d.
        * @param val The Vector2d to add.
        */
        public Add(val: Vector2d): Vector2d;
        /**
        * Returns a Vector2d that is the result of adding the X and Y of this Vector2d to the Width and Height of the provided Size2d.
        * @param val The Vector2d to add.
        */
        public Add(val: Size2d): Vector2d;
        /**
        * Returns a Vector2d that is the result of adding the X and Y of this Vector2d to the provided number.
        * @param val The number to add.
        */
        public Add(val: number): Vector2d;
        /**
        * Returns a Vector2d that is the result of multiplying the X and Y of this Vector2d by the X and Y of the provided Vector2d.
        * @param val The Vector2d to multiply.
        */
        public Multiply(val: Vector2d): Vector2d;
        /**
        * Returns a Vector2d that is the result of multiplying the X and Y of this Vector2d by the Width and Height of the provided Size2d.
        * @param val The Vector2d to multiply.
        */
        public Multiply(val: Size2d): Vector2d;
        /**
        * Returns a Vector2d that is the result of multiplying the X and Y of this Vector2d by the provided number.
        * @param val The number to multiply.
        */
        public Multiply(val: number): Vector2d;
        /**
        * Returns a Vector2d that is the result of subtracting the X and Y of this Vector2d by the X and Y of the provided Vector2d.
        * @param val The Vector2d to subtract.
        */
        public Subtract(val: Vector2d): Vector2d;
        /**
        * Returns a Vector2d that is the result of subtracting the X and Y of this Vector2d by the Width and Height of the provided Size2d.
        * @param val The Vector2d to subtract.
        */
        public Subtract(val: Size2d): Vector2d;
        /**
        * Returns a Vector2d that is the result of subtracting the X and Y of this Vector2d by the provided number.
        * @param val The number to subtract.
        */
        public Subtract(val: number): Vector2d;
        /**
        * Returns a Vector2d that is the result of subtracting the X and Y of this Vector2d from the X and Y of the provided Vector2d.
        * @param val The Vector2d to subtract from.
        */
        public SubtractFrom(val: Vector2d): Vector2d;
        /**
        * Returns a Vector2d that is the result of subtracting the X and Y of this Vector2d from the Width and Height of the provided Size2d.
        * @param val The Vector2d to subtract from.
        */
        public SubtractFrom(val: Size2d): Vector2d;
        /**
        * Returns a Vector2d that is the result of subtracting the X and Y of this Vector2d from the provided number.
        * @param val The number to subtract from.
        */
        public SubtractFrom(val: number): Vector2d;
        /**
        * Returns a Vector2d that is the result of dividing the X and Y of this Vector2d by the X and Y of the provided Vector2d.
        * @param val The Vector2d to divide.
        */
        public Divide(val: Vector2d): Vector2d;
        /**
        * Returns a Vector2d that is the result of dividing the X and Y of this Vector2d by the Width and Height of the provided Size2d.
        * @param val The Vector2d to divide.
        */
        public Divide(val: Size2d): Vector2d;
        /**
        * Returns a Vector2d that is the result of dividing the X and Y of this Vector2d by the provided number.
        * @param val The number to divide.
        */
        public Divide(val: number): Vector2d;
        /**
        * Returns a Vector2d that is the result of dividing the X and Y of this Vector2d from the X and Y of the provided Vector2d.
        * @param val The Vector2d to divide from.
        */
        public DivideFrom(val: Vector2d): Vector2d;
        /**
        * Returns a Vector2d that is the result of dividing the X and Y of this Vector2d from the Width and Height of the provided Size2d.
        * @param val The Vector2d to divide from.
        */
        public DivideFrom(val: Size2d): Vector2d;
        /**
        * Returns a Vector2d that is the result of dividing the X and Y of this Vector2d from the provided number.
        * @param val The number to divide from.
        */
        public DivideFrom(val: number): Vector2d;
        /**
        * Determines whether this Vector2d's X and Y components are zero.
        */
        public IsZero(): bool;
        /**
        * Returns a Vector2d that is the negated version of this Vector2d.
        */
        public Negate(): Vector2d;
        /**
        * Determines whether this Vector2d has the same X and Y of the provided Vector2d.
        * @param vector The Vector2d to compare the current Vector2d to.
        */
        public Equivalent(vector: Vector2d): bool;
        /**
        * Returns a Vector2d that has an identical X and Y component as the current Vector2d.
        */
        public Clone(): Vector2d;
        /**
        * Overridden toString method to display Vector2d in the (X, Y) format.
        */
        public toString(): string;
    }
}
module EndGate {
    /**
    * Defines a two dimensional size object which specifies a Width and Height.
    */
    class Size2d implements _.ITyped {
        public _type: string;
        /**
        * Gets or sets the horizontal component of this Size structure.
        */
        public Width: number;
        /**
        * Gets or sets the vertical component of this Size structure.
        */
        public Height: number;
        /**
        * Creates a new instance of Size2d.
        * @param size Initial value of the Width and Height components of Size2d.
        */
        constructor(size: number);
        /**
        * Creates a new instance of Size2d.
        * @param width Initial value of the Width component of Size2d.
        * @param height Initial value of the Height component of Size2d.
        */
        constructor(width: number, height: number);
        /**
        * Returns a Size2d with all its components set to zero.
        */
        static Zero(): Size2d;
        /**
        * Returns a Size2d with all its components set to one.
        */
        static One(): Size2d;
        /**
        * Returns the radius that encompasses the two dimensional size of this Size2d.
        */
        public Radius(): number;
        /**
        * Returns half of the Width component of this Size2d.
        */
        public HalfWidth(): number;
        /**
        * Returns half of the Height component of this Size2d.
        */
        public HalfHeight(): number;
        /**
        * Executes the action with the Width and Height of this Size2d and sets the Width and Height to the corresponding return values.
        * @param action The function used to modify the Width and Height.
        */
        public Apply(action: (val: number) => number): void;
        /**
        * Executes the action with the Width and Height of this Size2d.
        * @param action The function to pass the Width and Height components to.
        */
        public Trigger(action: (val: number) => void): void;
        /**
        * Returns a Size2d that is the result of adding the Width and Height of this Size2d to the Width and Height of a Size2d.
        * @param val The Size2d to add.
        */
        public Add(val: Size2d): Size2d;
        /**
        * Returns a Size2d that is the result of adding the Width and Height of this Size2d to the X and Y of a Vector2d.
        * @param val The Vector2d to add.
        */
        public Add(val: Vector2d): Size2d;
        /**
        * Returns a Size2d that is the result of adding the Width and Height of this Size2d to a number.
        * @param val The number to add.
        */
        public Add(val: number): Size2d;
        /**
        * Returns a Size2d that is the result of multiplying the Width and Height of this Size2d by the Width and Height of a Size2d.
        * @param val The Size2d to multiply.
        */
        public Multiply(val: Size2d): Size2d;
        /**
        * Returns a Size2d that is the result of multiplying the Width and Height of this Size2d by the X and Y of a Vector2d.
        * @param val The Vector2d to multiply.
        */
        public Multiply(val: Vector2d): Size2d;
        /**
        * Returns a Size2d that is the result of multiplying the Width and Height of this Size2d by a number.
        * @param val The number to multiply.
        */
        public Multiply(val: number): Size2d;
        /**
        * Returns a Size2d that is the result of subtracting the Width and Height of this Size2d by the Width and Height of a Size2d.
        * @param val The Size2d to subtract.
        */
        public Subtract(val: Size2d): Size2d;
        /**
        * Returns a Size2d that is the result of subtracting the Width and Height of this Size2d by the X and Y of a Vector2d.
        * @param val The Vector2d to subtract.
        */
        public Subtract(val: Vector2d): Size2d;
        /**
        * Returns a Size2d that is the result of subtracting the Width and Height of this Size2d by a number.
        * @param val The number to subtract.
        */
        public Subtract(val: number): Size2d;
        /**
        * Returns a Size2d that is the result of subtracting the Width and Height of this Size2d from the Width and Height of a Size2d.
        * @param val The Size2d to subtract from.
        */
        public SubtractFrom(val: Size2d): Size2d;
        /**
        * Returns a Size2d that is the result of subtracting the Width and Height of this Size2d from the X and Y of a Vector2d.
        * @param val The Vector2d to subtract from.
        */
        public SubtractFrom(val: Vector2d): Size2d;
        /**
        * Returns a Size2d that is the result of subtracting the Width and Height of this Size2d from a number.
        * @param val The number to subtract from.
        */
        public SubtractFrom(val: number): Size2d;
        /**
        * Returns a Size2d that is the result of dividing the Width and Height of this Size2d by the Width and Height of a Size2d.
        * @param val The Size2d to divide.
        */
        public Divide(val: Size2d): Size2d;
        /**
        * Returns a Size2d that is the result of dividing the Width and Height of this Size2d by the X and Y of a Vector2d.
        * @param val The Vector2d to divide.
        */
        public Divide(val: Vector2d): Size2d;
        /**
        * Returns a Size2d that is the result of dividing the Width and Height of this Size2d by a number.
        * @param val The number to divide.
        */
        public Divide(val: number): Size2d;
        /**
        * Returns a Size2d that is the result of dividing the Width and Height of this Size2d from the Width and Height of a Size2d.
        * @param val The Size2d to divide from.
        */
        public DivideFrom(val: Size2d): Size2d;
        /**
        * Returns a Size2d that is the result of dividing the Width and Height of this Size2d from the X and Y of a Vector2d.
        * @param val The Vector2d to divide from.
        */
        public DivideFrom(val: Vector2d): Size2d;
        /**
        * Returns a Size2d that is the result of dividing the Width and Height of this Size2d from a number.
        * @param val The number to divide from.
        */
        public DivideFrom(val: number): Size2d;
        /**
        * Returns a Size2d that is the negated version of this Size2d.
        */
        public Negate(): Size2d;
        /**
        * Determines whether this Size2d has the same Width and Height of another Size2d.
        * @param size The Size2d to compare the current Size2d to.
        */
        public Equivalent(size: Size2d): bool;
        /**
        * Returns a Size2d that has identical Width's and Height's as the current Size2d.
        */
        public Clone(): Size2d;
        /**
        * Overridden toString method to display Size2d in the (Width, Height) format.
        */
        public toString(): string;
    }
}
module EndGate {
    interface IMoveable {
        Position: Vector2d;
        Rotation: number;
    }
}
module EndGate._ {
    class MinMax {
        public Min: number;
        public Max: number;
        constructor(min: number, max: number);
    }
}
module EndGate._ {
    class Vector2dHelpers {
        static GetMinMaxProjections(axis: Vector2d, vertices: Vector2d[]): MinMax;
    }
}
module EndGate.Bounds {
    /**
    * Defines a circle that can be used to detect intersections.
    */
    class BoundingCircle extends Abstractions.Bounds2d implements _.ITyped {
        public _type: string;
        public _boundsType: string;
        /**
        * Gets or sets the Radius of the circle.
        */
        public Radius: number;
        /**
        * Creates a new instance of BoundingCircle.
        * @param position Initial Position of the BoundingCircle.
        * @param radius Initial Radius of the BoundingCircle.
        */
        constructor(position: Vector2d, radius: number);
        /**
        * Scales the radius of the BoundingCircle.
        * @param scale Value to multiply the radius by.
        */
        public Scale(scale: number): void;
        /**
        * Calculates the area of the BoundingCircle.
        */
        public Area(): number;
        /**
        * Calculates the circumference of the BoundingCircle.
        */
        public Circumference(): number;
        /**
        * Determines if the current BoundingCircle is intersecting the provided BoundingCircle.
        * @param circle BoundingCircle to check intersection with.
        */
        public IntersectsCircle(circle: BoundingCircle): bool;
        /**
        * Determines if the current BoundingCircle is intersecting the provided BoundingRectangle.
        * @param rectangle BoundingRectangle to check intersection with.
        */
        public IntersectsRectangle(rectangle: BoundingRectangle): bool;
        /**
        * Determines if the current BoundingCircle contains the provided Vector2d.
        * @param point A point.
        */
        public ContainsPoint(point: Vector2d): bool;
    }
}
module EndGate.Bounds {
    /**
    * Defines a rectangle that can be used to detect intersections.
    */
    class BoundingRectangle extends Abstractions.Bounds2d implements _.ITyped {
        public _type: string;
        public _boundsType: string;
        /**
        * Gets or sets the Size of the rectangle.
        */
        public Size: Size2d;
        /**
        * Creates a new instance of BoundingRectangle.
        * @param position Initial Position of the BoundingRectangle.
        * @param size Initial Size of the BoundingRectangle.
        */
        constructor(position: Vector2d, size: Size2d);
        /**
        * Scales the width and height of the BoundingRectangle.
        * @param x Value to multiply the width by.
        * @param y Value to multiply the height by.
        */
        public Scale(x: number, y: number): void;
        /**
        * Returns a list of vertices that are the locations of each corner of the BoundingRectangle. Format: [TopLeft, TopRight, BotLeft, BotRight].
        */
        public Vertices(): Vector2d[];
        /**
        * Calculates the top left corner of the BoundingRectangle.
        */
        public TopLeft(): Vector2d;
        /**
        * Calculates the top right corner of the BoundingRectangle.
        */
        public TopRight(): Vector2d;
        /**
        * Calculates the bottom left corner of the BoundingRectangle.
        */
        public BotLeft(): Vector2d;
        /**
        * Calculates the bottom right corner of the BoundingRectangle.
        */
        public BotRight(): Vector2d;
        /**
        * Determines if the current BoundingRectangle is intersecting the provided BoundingCircle.
        * @param circle BoundingCircle to check intersection with.
        */
        public IntersectsCircle(circle: BoundingCircle): bool;
        /**
        * Determines if the current BoundingRectangle is intersecting the provided BoundingRectangle.
        * @param rectangle BoundingRectangle to check intersection with.
        */
        public IntersectsRectangle(rectangle: BoundingRectangle): bool;
        /**
        * Determines if the current BoundingRectangle contains the provided Vector2d.
        * @param point A point.
        */
        public ContainsPoint(point: Vector2d): bool;
    }
}
module EndGate.Bounds.Abstractions {
    /**
    * Abstract bounds type that is used to detect intersections.
    */
    class Bounds2d implements IMoveable {
        public _boundsType: string;
        /**
        * Gets or sets the Position of the bounds.
        */
        public Position: Vector2d;
        /**
        * Gets or sets the Rotation of the bounds.
        */
        public Rotation: number;
        /**
        * Should only ever be called by derived classes.
        * @param position Initial Position of the current bounded object.
        */
        constructor(position: Vector2d);
        /**
        * Should only ever be called by derived classes.
        * @param position Initial Position of the current bounded object.
        * @param rotation Initial Rotation of the current bounded object.
        */
        constructor(position: Vector2d, rotation: number);
        /**
        * Abstract: Scales the size of the bounded object.
        * @param x Value to multiply the horizontal component by.
        * @param y Value to multiply the vertical component by.
        */
        public Scale(x: number, y: number): void;
        /**
        * Abstract: Determines if the current bounded object contains the provided Vector2d.
        * @param point A point.
        */
        public ContainsPoint(point: Vector2d): bool;
        /**
        * Determines if the current bounded object intersects another bounded object.
        * @param point A point.
        */
        public Intersects(obj: Bounds2d): bool;
        /**
        * Determines if the current bounded object is intersecting the provided BoundingCircle.
        * @param circle BoundingCircle to check intersection with.
        */
        public Intersects(circle: BoundingCircle): bool;
        /**
        * Determines if the current bounded object is intersecting the provided BoundingRectangle.
        * @param rectangle BoundingRectangle to check intersection with.
        */
        public Intersects(rectangle: BoundingRectangle): bool;
        /**
        * Abstract: Determines if the current bounded object is intersecting the provided BoundingCircle.
        * @param circle BoundingCircle to check intersection with.
        */
        public IntersectsCircle(circle: BoundingCircle): bool;
        /**
        * Abstract: Determines if the current bounded object is intersecting the provided BoundingRectangle.
        * @param rectangle BoundingRectangle to check intersection with.
        */
        public IntersectsRectangle(rectangle: BoundingRectangle): bool;
    }
}
module EndGate.Rendering {
    interface IRenderable {
        ZIndex: number;
        Draw(context: CanvasRenderingContext2D): void;
        GetDrawBounds(): Bounds.Abstractions.Bounds2d;
    }
}
module EndGate._.Loopers {
    class LooperCallback implements ITyped {
        public _type: string;
        private static _ids;
        constructor(callback: Function);
        public Callback: Function;
        public ID: number;
    }
}
module EndGate._.Loopers {
    interface ILooper extends IDisposable, ITyped {
        Start(): void;
        AddCallback(callback: LooperCallback): void;
        RemoveCallback(callback: LooperCallback): void;
    }
}
module EndGate._.Loopers {
    class TimedCallback extends LooperCallback implements ITyped {
        public _type: string;
        constructor(fps: number, callback: Function);
        public Fps: number;
        public TimeoutID: number;
        public Active: bool;
    }
}
module EndGate._.Loopers {
    class Looper implements ILooper {
        public _type: string;
        private _running;
        private _callbacks;
        constructor();
        public AddCallback(timedCallback: TimedCallback): void;
        public RemoveCallback(timedCallback: TimedCallback): void;
        public Start(): void;
        private Run();
        private Loop(timedCallback);
        public Dispose(): void;
    }
}
interface Window {
    OnRepaintCompleted(callback: Function): void;
}
module EndGate._.Loopers {
    class RepaintLooper implements ILooper {
        public _type: string;
        private _running;
        private _callbacksModified;
        private _callbacks;
        constructor();
        public Start(): void;
        private Run();
        public AddCallback(looperCallback: LooperCallback): void;
        public RemoveCallback(looperCallback: LooperCallback): void;
        public Dispose(): void;
    }
}
module EndGate {
    class GameConfiguration {
        private _defaultUpdateRate;
        private _updateRateSetter;
        private _updateRate;
        constructor(updateRateSetter: (updateRate: number) => void);
        public UpdateRate(updateRate?: number): number;
    }
}
module EndGate {
    class EventHandler implements _.ITyped {
        public _type: string;
        private _actions;
        private _hasBindings;
        constructor();
        public Bind(action: Function): void;
        public Unbind(action: Function): void;
        public HasBindings(): bool;
        public Trigger(...args: any[]): void;
    }
}
module EndGate.Collision.Assets {
    /**
    * Defines a data object that is used to describe a collision event.
    */
    class CollisionData {
        /**
        * Where the collision occurred.
        */
        public At: Vector2d;
        /**
        * Who collided with you.
        */
        public With: Collidable;
        /**
        * Creates a new instance of the CollisionData object.
        * @param at Initial value of the At component of CollisionData.
        * @param w Initial value of the With component of CollisionData.
        */
        constructor(at: Vector2d, w: Collidable);
    }
}
module EndGate.Collision {
    /**
    * Defines a collidable object that can be used to detect collisions with other objects.
    */
    class Collidable implements IDisposable, _.ITyped {
        public _type: string;
        public _id: number;
        /**
        * Gets or sets the Bounds of the collidable.
        */
        public Bounds: Bounds.Abstractions.Bounds2d;
        private static _collidableIDs;
        private _disposed;
        /**
        * Creates a new instance of Collidable.
        * @param position Initial bounds for the Collidable.
        */
        constructor(bounds: Bounds.Abstractions.Bounds2d);
        /**
        * Event: Triggered when a collision happens.  Functions can be bound or unbound to this event to be executed when the event triggers.
        * Passes a CollisionData object to bound functions.
        */
        public OnCollision: EventHandler;
        /**
        * Event: Triggered when a Collision happens.  Functions can be bound or unbound to this event to be executed when the event triggers.
        */
        public OnDisposed: EventHandler;
        /**
        * Determines if the provided collidable is colliding with this Collidable.
        * @param other Collidable to check collision with.
        */
        public IsCollidingWith(other: Collidable): bool;
        /**
        * Triggers the OnCollision event.  Can also be overridden from derived classes to be called when a collision occurs if the collidable is being used with a CollisionManager
        * @param data Collision information related to the collision.
        */
        public Collided(data: Assets.CollisionData): void;
        /**
        * Triggers the OnDisposed event.  If this Collidable is used with a CollisionManager it will be unmonitored when disposed.
        */
        public Dispose(): void;
    }
}
module EndGate.Collision {
    /**
    * Defines a manager that will check for collisions between objects that it is monitoring.
    */
    class CollisionManager implements IUpdateable, _.ITyped {
        public _type: string;
        private _collidables;
        private _enabled;
        /**
        * Creates a new instance of CollisionManager.
        */
        constructor();
        /**
        * Event: Triggered when a collision happens among two of the monitored objects.  Functions can be bound or unbound to this event to be executed when the event triggers.
        * Passes two CollisionData objects to bound functions.
        */
        public OnCollision: EventHandler;
        /**
        * Monitors the provided collidable and will trigger its Collided function and OnCollision event whenever a collision occurs with it and another Collidable.
        * If the provided collidable gets disposed it will automatically become unmonitored.
        * @param obj Collidable to monitor.
        */
        public Monitor(obj: Collidable): void;
        /**
        * Unmonitors the provided collidable.  The Collided function and OnCollision event will no longer be triggered when an actual collision may have occured.
        * Disposing a monitored collidable will automatically be unmonitored
        * @param obj Collidable to unmonitor.
        */
        public Unmonitor(obj: Collidable): void;
        /**
        * Checks for collisions within its monitored objects.  Games CollisionManager's automatically have their Update functions called at the beginning of each update loop.
        * @param gameTime The current game time object.
        */
        public Update(gameTime: GameTime): void;
    }
}
module EndGate.Graphics.Assets {
    class Graphic2dState implements _.ITyped {
        public _type: string;
        private _cachedState;
        constructor();
        public StrokeStyle(value?: string): string;
        public FillStyle(value?: string): string;
        public GlobalAlpha(value?: number): number;
        public LineWidth(value?: number): number;
        public LineCap(value?: string): string;
        public LineJoin(value?: string): string;
        public MiterLimit(value?: number): number;
        public ShadowOffsetX(value?: number): number;
        public ShadowOffsetY(value?: number): number;
        public ShadowBlur(value?: number): number;
        public ShadowColor(value?: string): string;
        public GlobalCompositeOperation(value?: string): string;
        public Font(value?: string): string;
        public TextAlign(value?: string): string;
        public TextBaseline(value?: string): string;
        public SetContextState(context: CanvasRenderingContext2D): void;
        private GetOrSetCache(property, value);
    }
}
module EndGate.Graphics.Abstractions {
    class Graphic2d implements _.ITyped, Rendering.IRenderable, IMoveable {
        public _type: string;
        public ZIndex: number;
        public Position: Vector2d;
        public Rotation: number;
        public State: Assets.Graphic2dState;
        private static _zindexSort;
        private _children;
        constructor(position: Vector2d);
        public AddChild(graphic: Graphic2d): void;
        public RemoveChild(graphic: Graphic2d): bool;
        public Children(): Graphic2d[];
        public StartDraw(context: CanvasRenderingContext2D): void;
        public EndDraw(context: CanvasRenderingContext2D): void;
        public Draw(context: CanvasRenderingContext2D): void;
        public GetDrawBounds(): Bounds.Abstractions.Bounds2d;
    }
}
module EndGate.Rendering {
    class Camera2d extends Bounds.BoundingRectangle {
        static DefaultDistance: number;
        public _type: string;
        public Distance: number;
        constructor(position: Vector2d, size: Size2d);
        public GetDistanceScale(): number;
        public ToCameraRelative(position: Vector2d): Vector2d;
        public GetInverseDistanceScale(): number;
    }
}
module EndGate.Rendering {
    interface IRenderer extends IDisposable {
        Render(renderables: IRenderable[]): CanvasRenderingContext2D;
    }
}
module EndGate.Rendering {
    class Renderer2d implements IRenderer {
        static _zindexSort: (a: IRenderable, b: IRenderable) => number;
        private _visibleCanvas;
        private _visibleContext;
        public _bufferCanvas: HTMLCanvasElement;
        public _bufferContext: CanvasRenderingContext2D;
        private _disposed;
        constructor(renderOnto: HTMLCanvasElement);
        public OnRendererSizeChange: EventHandler;
        public Render(renderables: IRenderable[]): CanvasRenderingContext2D;
        public Dispose(): void;
        public _ClearBuffer(): void;
        private UpdateBufferSize();
    }
}
module EndGate.Rendering._ {
    class Camera2dCanvasContextBuilder {
        private _camera;
        private _canvasCenter;
        private _translated;
        private _translationState;
        constructor(camera: Camera2d);
        public BuildFrom(context: CanvasRenderingContext2D): CanvasRenderingContext2D;
        public UpdateCanvasCenter(newSize: Size2d): void;
        public BuildPositionReplacer(replacee: Function, positionArgOffset?: number, argCount?: number): any;
    }
}
module EndGate.Rendering {
    class Camera2dRenderer extends Renderer2d {
        private _camera;
        private _contextBuilder;
        constructor(renderOnto: HTMLCanvasElement, camera: Camera2d);
        public Render(renderables: IRenderable[]): CanvasRenderingContext2D;
        public _ClearBuffer(): void;
        private GetOnScreenRenderables(allRenderables);
    }
}
module EndGate.Rendering {
    class Scene2d implements IDisposable {
        public DrawArea: HTMLCanvasElement;
        public Camera: Camera2d;
        private _actors;
        private _renderer;
        private _onDraw;
        private _disposed;
        constructor(drawArea?: HTMLCanvasElement, onDraw?: (context: CanvasRenderingContext2D) => void);
        public Add(actor: Graphics.Abstractions.Graphic2d): void;
        public Remove(actor: Graphics.Abstractions.Graphic2d): void;
        public Draw(): void;
        public Dispose(): void;
        private ApplyStyles(drawArea);
        private CreateDefaultDrawArea();
    }
}
module EndGate.Input {
    class MouseButton {
        static Left: string;
        static Middle: string;
        static Right: string;
    }
}
module EndGate.Input {
    interface IMouseEvent {
        Position: Vector2d;
    }
}
module EndGate.Input {
    interface IMouseClickEvent extends IMouseEvent {
        Button: string;
    }
}
module EndGate.Input {
    interface IMouseScrollEvent extends IMouseEvent {
        Direction: Vector2d;
    }
}
module EndGate.Input {
    class MouseHandler {
        public LeftIsDown: bool;
        public MiddleIsDown: bool;
        public RightIsDown: bool;
        public IsDown: bool;
        private static MouseButtonArray;
        private _target;
        constructor(target: HTMLCanvasElement);
        public OnClick: EventHandler;
        public OnDoubleClick: EventHandler;
        public OnDown: EventHandler;
        public OnUp: EventHandler;
        public OnMove: EventHandler;
        public OnScroll: EventHandler;
        private Wire();
        private BuildEvent(eventHandler, mouseEventBuilder, returnValue?);
        private BuildMouseScrollEvent(event);
        private BuildMouseEvent(event);
        private BuildMouseClickEvent(event);
        private GetMousePosition(event);
        private GetMouseButton(event);
        private GetMouseScrollDierction(event);
    }
}
module EndGate._.Utilities {
    class NoopTripInvoker {
        private static _noop;
        private _invoker;
        private _action;
        constructor(action: Function, tripped?: bool);
        public Invoke(...args: any[]): void;
        public InvokeOnce(...args: any[]): void;
        public Trip(): void;
        public Reset(): void;
    }
}
module EndGate.Input.Assets {
    class KeyboardModifiers {
        public Ctrl: bool;
        public Alt: bool;
        public Shift: bool;
        constructor(ctrl: bool, alt: bool, shift: bool);
        public Equivalent(modifier: KeyboardModifiers): bool;
        static BuildFromCommandString(keyCommand: string): KeyboardModifiers;
    }
}
module EndGate.Input {
    class KeyboardCommandEvent {
        public Key: string;
        public Modifiers: Assets.KeyboardModifiers;
        constructor(keyEvent: KeyboardEvent);
        public Matches(command: Assets.KeyboardCommand): bool;
    }
}
module EndGate.Input._ {
    class KeyboardCommandHelper {
        static ParseKey(command: string): string;
    }
}
module EndGate.Input.Assets {
    class KeyboardCommand implements IDisposable {
        public Key: string;
        public Action: Function;
        public Modifiers: KeyboardModifiers;
        private _onDisposeInvoker;
        constructor(command: string, action: Function);
        public OnDispose: EventHandler;
        public Dispose(): void;
    }
}
module EndGate.Input {
    class KeyboardHandler {
        private static _keyboardCommandIds;
        private _target;
        private _onPressCommands;
        private _onDownCommands;
        private _onUpCommands;
        constructor();
        public OnKeyPress: EventHandler;
        public OnKeyDown: EventHandler;
        public OnKeyUp: EventHandler;
        public OnCommandPress(keyCommand: string, action: Function): Assets.KeyboardCommand;
        public OnCommandDown(keyCommand: string, action: Function): Assets.KeyboardCommand;
        public OnCommandUp(keyCommand: string, action: Function): Assets.KeyboardCommand;
        private UpdateCache(keyCommand, action, store);
        private Wire();
        private FocusingTextArea(ke);
        private BuildKeyEvent(store, eventHandler);
    }
}
module EndGate.Input {
    class InputManager {
        public Mouse: MouseHandler;
        public Keyboard: KeyboardHandler;
        constructor(canvas: HTMLCanvasElement);
    }
}
module EndGate.Sound {
    class AudioSettings {
        static Default: AudioSettings;
        public Repeat: bool;
        public Volume: number;
        public AutoPlay: bool;
        public Preload: string;
        constructor(repeat?: bool, volume?: number, autoplay?: bool, preload?: string);
    }
}
module EndGate.Sound {
    class AudioClip {
        private _audio;
        private _settings;
        constructor(source: any, settings?: AudioSettings);
        public OnComplete: EventHandler;
        public Volume(percent?: number): number;
        public IsPlaying(): bool;
        public IsComplete(): bool;
        public Play(): void;
        public Pause(): void;
        public Seek(time: number): void;
        public Stop(): void;
        private SetAudioSource(source);
        private ApplySettings();
    }
}
module EndGate.Sound {
    class AudioPlayer {
        private _source;
        constructor(sourceLocation: any);
        public Play(settings?: AudioSettings): AudioClip;
    }
}
module EndGate.Sound {
    class AudioManager {
        private _audioPlayers;
        constructor();
        public Load(name: string, src: any): AudioPlayer;
        public Unload(name: string): AudioPlayer;
        public Play(name: string, settings?: AudioSettings): AudioClip;
        public GetPlayer(name: string): AudioPlayer;
    }
}
module EndGate.Map {
    class SceneryHandler {
        private _sceneryCanvas;
        private _camera;
        private _layers;
        private _renderer;
        constructor(foregroundCanvas: HTMLCanvasElement, camera: Rendering.Camera2d);
        public AddLayer(layer: Graphics.Abstractions.Graphic2d): void;
        public RemoveLayer(layer: Graphics.Abstractions.Graphic2d): void;
        public Draw(): void;
        private BuildSceneryCanvas(foreground);
    }
}
module EndGate.Map {
    class MapManager {
        public Scenery: SceneryHandler;
        constructor(foregroundCanvas: HTMLCanvasElement, camera: Rendering.Camera2d);
    }
}
module EndGate {
    class Game implements _.ITyped, IUpdateable, IDisposable {
        public _type: string;
        public ID: number;
        public Configuration: GameConfiguration;
        public CollisionManager: Collision.CollisionManager;
        public Scene: Rendering.Scene2d;
        public Input: Input.InputManager;
        public Audio: Sound.AudioManager;
        public Map: Map.MapManager;
        private static _gameIds;
        private _gameTime;
        constructor(gameCanvas?: HTMLCanvasElement);
        public PrepareUpdate(): void;
        public Update(gameTime: GameTime): void;
        public PrepareDraw(): void;
        public Draw(context: CanvasRenderingContext2D): void;
        public Dispose(): void;
    }
}
module EndGate._ {
    class GameRunner implements ITyped {
        public _type: string;
        private _updateCallbacks;
        private _drawCallbacks;
        private _updateLoop;
        private _drawLoop;
        private _callbackCount;
        constructor();
        public Register(game: Game): (updateRate: number) => void;
        public Unregister(game: Game): void;
        private TryLoopStart();
        private TryLoopStop();
        private CreateAndCacheUpdateCallback(game);
        private CreateAndCacheDrawCallback(game);
        private CreateUpdateRateSetter(callback);
    }
}
var GameRunnerInstance: EndGate._.GameRunner;
module EndGate.MovementControllers.Assets {
    class LinearDirections {
        public Left: bool;
        public Right: bool;
        public Up: bool;
        public Down: bool;
        constructor();
    }
}
module EndGate.MovementControllers {
    interface IMoveEvent {
        Direction: string;
        StartMoving: bool;
    }
}
module EndGate.MovementControllers.Abstractions {
    class MovementController implements IMoveable, IUpdateable {
        public Position: Vector2d;
        public Velocity: Vector2d;
        public Rotation: number;
        public _frozen: bool;
        private _moveables;
        constructor(moveables: IMoveable[]);
        public Freeze(): void;
        public Thaw(): void;
        public IsMoving(): bool;
        public Update(gameTime: GameTime): void;
    }
}
module EndGate.MovementControllers {
    class LinearMovementController extends Abstractions.MovementController {
        private _moveSpeed;
        private _moving;
        private _rotationUpdater;
        private _velocityUpdater;
        constructor(moveables: IMoveable[], moveSpeed: number, rotateWithMovements?: bool, multiDirectional?: bool);
        public OnMove: EventHandler;
        public IsMovingInDirection(direction: string): bool;
        public StartMoving(direction: string): void;
        public StopMoving(direction: string): void;
        public MoveSpeed(speed?: number): number;
        public Update(gameTime: GameTime): void;
        public Move(direction: string, startMoving: bool): void;
        private UpdateVelocityNoMultiDirection();
        private UpdateVelocityWithMultiDirection();
        private UpdateRotation();
    }
}
module EndGate.InputControllers {
    class DirectionalInputController {
        private _keyboard;
        private _onMove;
        private _directions;
        constructor(keyboard: Input.KeyboardHandler, onMove: (direction: string, startMoving: bool) => void, upKeys?: string[], rightKeys?: string[], downKeys?: string[], leftKeys?: string[]);
        private BindKeys(keyList, bindingAction, direction, startMoving);
    }
}
module EndGate.Graphics.Assets {
    enum FontMeasurement {
        Ems,
        Pixels,
        Points,
        Percent,
    }
    class FontMeasurementHelper {
        static _measurements: string[];
        static _Initialize(): void;
        static Get(measurement: FontMeasurement): string;
    }
}
module EndGate.Graphics.Assets {
    enum FontFamily {
        Antiqua,
        Arial,
        Avqest,
        Blackletter,
        Calibri,
        ComicSans,
        Courier,
        Decorative,
        Fraktur,
        Frosty,
        Garamond,
        Georgia,
        Helvetica,
        Impact,
        Minion,
        Modern,
        Monospace,
        Palatino,
        Roman,
        Script,
        Swiss,
        TimesNewRoman,
        Verdana,
    }
    class FontFamilyHelper {
        static _families: {
            [family: number]: string;
        };
        static _Initialize(): void;
        static Get(family: FontFamily): string;
    }
}
module EndGate.Graphics.Assets {
    enum FontVariant {
        Normal,
        SmallCaps,
    }
    class FontVariantHelper {
        static _variants: {
            [variant: number]: string;
        };
        static _Initialize(): void;
        static Get(variant: FontVariant): string;
    }
}
module EndGate.Graphics.Assets {
    enum FontStyle {
        Normal,
        Italic,
        Oblique,
    }
    class FontStyleHelper {
        static _styles: {
            [family: number]: string;
        };
        static _Initialize(): void;
        static Get(style: FontStyle): string;
    }
}
module EndGate.Graphics.Assets {
    class FontSettings {
        private _cachedState;
        private _cachedFont;
        private _refreshCache;
        constructor();
        public FontSize(size?: number, measurement?: FontMeasurement): string;
        public FontFamily(family?: FontFamily): string;
        public FontVariant(variant?: FontVariant): string;
        public FontWeight(weight?: string): string;
        public FontStyle(style?: FontStyle): string;
        public _BuildFont(): string;
        private GetOrSetCache(property, value);
    }
}
module EndGate.Graphics {
    class Text2d extends Abstractions.Graphic2d {
        public _type: string;
        public FontSettings: Assets.FontSettings;
        private _text;
        private _stroker;
        private _drawBounds;
        constructor(x: number, y: number, text: string, color?: string);
        public Align(alignment?: string): string;
        public Baseline(baseline?: string): string;
        public Color(color?: string): string;
        public Shadow(x?: number, y?: number, color?: string, blur?: number): any[];
        public ShadowColor(color?: string): string;
        public ShadowX(val?: number): number;
        public ShadowY(val?: number): number;
        public ShadowBlur(val?: number): number;
        public Opacity(alpha?: number): number;
        public Text(text?: string): string;
        public Border(thickness?: number, color?: string): any[];
        public BorderThickness(thickness?: number): number;
        public BorderColor(color?: string): string;
        public Draw(context: CanvasRenderingContext2D): void;
        public GetDrawBounds(): Bounds.Abstractions.Bounds2d;
    }
}
module EndGate.Graphics.Assets {
    class ImageSource {
        public Loaded: bool;
        public ClipLocation: Vector2d;
        public ClipSize: Size2d;
        public Size: Size2d;
        public Source: HTMLImageElement;
        private _imageLocation;
        constructor(imageLocation: string);
        constructor(imageLocation: string, width?: number, height?: number);
        constructor(imageLocation: string, width?: number, height?: number, clipX?: number, clipY?: number, clipWidth?: number, clipHeight?: number);
        public OnLoaded: EventHandler;
        public Extract(clipX: number, clipY: number, clipWidth: number, clipHeight: number): ImageSource;
    }
}
module EndGate.Graphics {
    class Sprite2d extends Abstractions.Graphic2d {
        public _type: string;
        public Image: Assets.ImageSource;
        public Size: Size2d;
        constructor(x: number, y: number, image: Assets.ImageSource, width?: number, height?: number);
        public Opacity(alpha?: number): number;
        public Draw(context: CanvasRenderingContext2D): void;
        public GetDrawBounds(): Bounds.Abstractions.Bounds2d;
    }
}
module EndGate.Graphics {
    class SpriteAnimation {
        private _imageSource;
        private _fps;
        private _frameSize;
        private _frameCount;
        private _startOffset;
        private _playing;
        private _repeating;
        private _currentFrame;
        private _framesPerRow;
        private _lastStepAt;
        private _stepEvery;
        constructor(imageSource: Assets.ImageSource, fps: number, frameSize: Size2d, frameCount: number, startOffset?: Vector2d);
        public OnComplete: EventHandler;
        public IsPlaying(): bool;
        public Play(repeat?: bool): void;
        public Pause(): void;
        public Step(count?: number): void;
        public Stop(resetFrame?: bool): void;
        public Reset(): void;
        public Fps(newFps?: number): number;
        public Update(gameTime: GameTime): void;
        private UpdateImageSource();
        private GetFrameRow();
        private GetFrameColumn();
    }
}
module EndGate.Graphics.Abstractions {
    class Shape extends Graphic2d {
        public _type: string;
        private _fill;
        private _stroke;
        constructor(position: Vector2d, color?: string);
        public Color(color?: string): string;
        public Border(thickness?: number, color?: string): any[];
        public BorderThickness(thickness?: number): number;
        public BorderColor(color?: string): string;
        public Shadow(x?: number, y?: number, color?: string, blur?: number): any[];
        public ShadowColor(color?: string): string;
        public ShadowX(val?: number): number;
        public ShadowY(val?: number): number;
        public ShadowBlur(val?: number): number;
        public Opacity(alpha?: number): number;
        public StartDraw(context: CanvasRenderingContext2D): void;
        public EndDraw(context: CanvasRenderingContext2D): void;
        public BuildPath(context: CanvasRenderingContext2D): void;
        public Draw(context: CanvasRenderingContext2D): void;
    }
}
module EndGate.Graphics {
    class Circle extends Abstractions.Shape {
        public _type: string;
        public Radius: number;
        constructor(x: number, y: number, radius: number, color?: string);
        public BuildPath(context: CanvasRenderingContext2D): void;
        public GetDrawBounds(): Bounds.Abstractions.Bounds2d;
    }
}
module EndGate.Graphics {
    class Rectangle extends Abstractions.Shape {
        public _type: string;
        public Size: Size2d;
        constructor(x: number, y: number, width: number, height: number, color?: string);
        public BuildPath(context: CanvasRenderingContext2D): void;
        public GetDrawBounds(): Bounds.Abstractions.Bounds2d;
    }
}
module EndGate.Graphics {
    class Line2d extends Abstractions.Graphic2d {
        public _type: string;
        private _from;
        private _to;
        private _difference;
        private _boundsWidth;
        private _cachedPosition;
        constructor(fromX: number, fromY: number, toX: number, toY: number, lineWidth?: number, color?: string);
        public From(newPosition?: Vector2d): Vector2d;
        public To(newPosition?: Vector2d): Vector2d;
        public Color(color?: string): string;
        public LineWidth(width?: number): number;
        public LineCap(cap?: string): string;
        public Draw(context: CanvasRenderingContext2D): void;
        public GetDrawBounds(): Bounds.Abstractions.Bounds2d;
        private UpdatePosition();
        private RefreshCache();
        private GetOrSetLinePoint(name, newPosition?);
    }
}
module EndGate.Graphics {
    class Grid extends Abstractions.Graphic2d {
        public _type: string;
        private _size;
        private _tileSize;
        private _grid;
        private _gridLines;
        private _positionOffset;
        private _rows;
        private _columns;
        private _drawGridLines;
        private _gridLineColor;
        constructor(x: number, y: number, rows: number, columns: number, tileWidth: number, tileHeight: number, drawGridLines?: bool, color?: string);
        public Color(color?: string): string;
        public Size(): Size2d;
        public TileSize(): Size2d;
        public Rows(): number;
        public Columns(): number;
        public Opacity(alpha?: number): number;
        public Fill(row: number, column: number, graphic: Abstractions.Graphic2d): void;
        public FillSpace(row: number, column: number, graphicList: Abstractions.Graphic2d[][]): void;
        public FillRow(row: number, graphicList: Abstractions.Graphic2d[], offset?: number): void;
        public FillColumn(column: number, graphicList: Abstractions.Graphic2d[], offset?: number): void;
        public Get(row: number, column: number): Abstractions.Graphic2d;
        public GetColumn(column: number): Abstractions.Graphic2d[];
        public GetRow(row: number): Abstractions.Graphic2d[];
        public GetSpace(rowStart: number, columnStart: number, rowEnd: number, columnEnd: number): Abstractions.Graphic2d[];
        public Clear(row: number, column: number): Abstractions.Graphic2d;
        public ClearRow(row: number): Abstractions.Graphic2d[];
        public ClearColumn(column: number): Abstractions.Graphic2d[];
        public ClearSpace(rowStart: number, columnStart: number, rowEnd: number, columnEnd: number): Abstractions.Graphic2d[];
        public Draw(context: CanvasRenderingContext2D): void;
        public GetDrawBounds(): Bounds.Abstractions.Bounds2d;
        public ConvertToRow(y: number): number;
        public ConvertToColumn(x: number): number;
        private GetInsideGridPosition(row, column);
        private ValidRow(row);
        private ValidColumn(column);
    }
}
module EndGate.Map {
    class TileMap extends Graphics.Abstractions.Graphic2d {
        public _Resources: Graphics.Assets.ImageSource[];
        constructor(x: number, y: number, resources: Graphics.Assets.ImageSource[]);
    }
}
module EndGate.Map {
    class Tile extends Graphics.Sprite2d {
        constructor(image: Graphics.Assets.ImageSource, width: number, height: number);
    }
}
module EndGate.Map {
    class SquareTileMap extends TileMap {
        private _grid;
        constructor(x: number, y: number, tileWidth: number, tileHeight: number, resources: Graphics.Assets.ImageSource[], mappings: number[][], drawGridLines?: bool);
        static ExtractTiles(imageSource: Graphics.Assets.ImageSource, tileWidth: number, tileHeight: number): Graphics.Assets.ImageSource[];
        public Draw(context: CanvasRenderingContext2D): void;
        public GetDrawBounds(): Bounds.Abstractions.Bounds2d;
        private FillGridWith(mappings);
    }
}
import eg = EndGate;
