declare module eg {
    /**
    * Represents a Disposable object with a Dispose method.
    */
    interface IDisposable {
        /**
        * Disposes the object.  Dispose should only be called once.
        */
        Dispose(): void;
    }
}
declare module eg._ {
    interface ITyped {
        _type: string;
    }
}
declare module eg {
    /**
    * Defines a game time class that is used to manage update timing execution as well as total game time.
    */
    class GameTime implements eg._.ITyped {
        public _type: string;
        /**
        * The current date time at the start of the Update.
        */
        public Now: Date;
        /**
        * Total amount of milliseconds surpassed since construction.
        */
        public Total: number;
        /**
        * Elapsed milliseconds since last Update.
        */
        public Elapsed: number;
        /**
        * Elapsed second since last Update.  It's essentially 1/Elapsed.
        */
        public ElapsedSecond: number;
        private _start;
        /**
        * Creates a new instance of the GameTime object.
        */
        constructor();
        /**
        * Updates the game time object.  Causes the gameTime to refresh all its components.
        */
        public Update(): void;
    }
}
declare module eg {
    /**
    * Represents an object that can be updated.
    */
    interface IUpdateable {
        /**
        * Updates the object.
        * @param gameTime The current game time object.
        */
        Update(gameTime: eg.GameTime): void;
    }
}
interface Math {
    roundTo(val?: number, decimals?: number): number;
}
declare module eg {
    /**
    * Defines a two dimensional vector object which specifies an X and Y.
    */
    class Vector2d implements eg._.ITyped {
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
        * Returns a Vector2d that's reflected over the normal.
        * @param normal The normal to reflect over.
        */
        public Reflect(normal: Vector2d): Vector2d;
        /**
        * Returns a Vector2d with all its components set to zero.
        */
        static Zero : Vector2d;
        /**
        * Returns a Vector2d with all its components set to one.
        */
        static One : Vector2d;
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
        * Returns the unit vector of the current vector.
        */
        public Unit(): Vector2d;
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
        public Add(val: eg.Size2d): Vector2d;
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
        public Multiply(val: eg.Size2d): Vector2d;
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
        public Subtract(val: eg.Size2d): Vector2d;
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
        public SubtractFrom(val: eg.Size2d): Vector2d;
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
        public Divide(val: eg.Size2d): Vector2d;
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
        public DivideFrom(val: eg.Size2d): Vector2d;
        /**
        * Returns a Vector2d that is the result of dividing the X and Y of this Vector2d from the provided number.
        * @param val The number to divide from.
        */
        public DivideFrom(val: number): Vector2d;
        /**
        * Determines whether this Vector2d's X and Y components are zero.
        */
        public IsZero(): boolean;
        /**
        * Returns a Vector2d that is the negated version of this Vector2d.
        */
        public Negate(): Vector2d;
        /**
        * Determines whether this Vector2d has the same X and Y of the provided Vector2d.
        * @param vector The Vector2d to compare the current Vector2d to.
        */
        public Equivalent(vector: Vector2d): boolean;
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
declare module eg {
    /**
    * Defines a two dimensional size object which specifies a Width and Height.
    */
    class Size2d implements eg._.ITyped {
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
        static Zero : Size2d;
        /**
        * Returns a Size2d with all its components set to one.
        */
        static One : Size2d;
        /**
        * Returns the radius that encompasses the two dimensional size of this Size2d.
        */
        public Radius : number;
        /**
        * Returns half of the Width component of this Size2d.
        */
        public HalfWidth : number;
        /**
        * Returns half of the Height component of this Size2d.
        */
        public HalfHeight : number;
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
        public Add(val: eg.Vector2d): Size2d;
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
        public Multiply(val: eg.Vector2d): Size2d;
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
        public Subtract(val: eg.Vector2d): Size2d;
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
        public SubtractFrom(val: eg.Vector2d): Size2d;
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
        public Divide(val: eg.Vector2d): Size2d;
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
        public DivideFrom(val: eg.Vector2d): Size2d;
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
        public Equivalent(size: Size2d): boolean;
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
declare module eg {
    /**
    * Represents an object that has a position and rotation.
    */
    interface IMoveable {
        /**
        * Gets or sets the location of the moveable object.
        */
        Position: eg.Vector2d;
        /**
        * Gets or sets the rotation of the moveable object.
        */
        Rotation: number;
    }
}
declare module eg._ {
    class MinMax {
        public Min: number;
        public Max: number;
        constructor(min: number, max: number);
    }
}
declare module eg._ {
    class Vector2dHelpers {
        static GetMinMaxProjections(axis: eg.Vector2d, vertices: eg.Vector2d[]): _.MinMax;
    }
}
declare module eg.Bounds {
    /**
    * Defines a circle that can be used to detect intersections.
    */
    class BoundingCircle extends Bounds.Abstractions.Bounds2d implements eg._.ITyped {
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
        constructor(position: eg.Vector2d, radius: number);
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
        public IntersectsCircle(circle: BoundingCircle): boolean;
        /**
        * Determines if the current BoundingCircle is intersecting the provided BoundingRectangle.
        * @param rectangle BoundingRectangle to check intersection with.
        */
        public IntersectsRectangle(rectangle: Bounds.BoundingRectangle): boolean;
        /**
        * Determines if the current BoundingCircle contains the provided Vector2d.
        * @param point A point.
        */
        public ContainsPoint(point: eg.Vector2d): boolean;
    }
}
declare module eg.Bounds {
    /**
    * Defines a rectangle that can be used to detect intersections.
    */
    class BoundingRectangle extends Bounds.Abstractions.Bounds2d implements eg._.ITyped {
        public _type: string;
        public _boundsType: string;
        /**
        * Gets or sets the Size of the rectangle.
        */
        public Size: eg.Size2d;
        /**
        * Creates a new instance of BoundingRectangle.
        * @param position Initial Position of the BoundingRectangle.
        * @param size Initial Size of the BoundingRectangle.
        */
        constructor(position: eg.Vector2d, size: eg.Size2d);
        /**
        * Scales the width and height of the BoundingRectangle.
        * @param x Value to multiply the width by.
        * @param y Value to multiply the height by.
        */
        public Scale(x: number, y: number): void;
        /**
        * Returns a list of vertices that are the locations of each corner of the BoundingRectangle. Format: [TopLeft, TopRight, BotLeft, BotRight].
        */
        public Corners(): eg.Vector2d[];
        /**
        * Calculates the top left corner of the BoundingRectangle.
        */
        public TopLeft(): eg.Vector2d;
        /**
        * Calculates the top right corner of the BoundingRectangle.
        */
        public TopRight(): eg.Vector2d;
        /**
        * Calculates the bottom left corner of the BoundingRectangle.
        */
        public BotLeft(): eg.Vector2d;
        /**
        * Calculates the bottom right corner of the BoundingRectangle.
        */
        public BotRight(): eg.Vector2d;
        /**
        * Determines if the current BoundingRectangle is intersecting the provided BoundingCircle.
        * @param circle BoundingCircle to check intersection with.
        */
        public IntersectsCircle(circle: Bounds.BoundingCircle): boolean;
        /**
        * Determines if the current BoundingRectangle is intersecting the provided BoundingRectangle.
        * @param rectangle BoundingRectangle to check intersection with.
        */
        public IntersectsRectangle(rectangle: BoundingRectangle): boolean;
        /**
        * Determines if the current BoundingRectangle contains the provided Vector2d.
        * @param point A point.
        */
        public ContainsPoint(point: eg.Vector2d): boolean;
    }
}
declare module eg.Bounds.Abstractions {
    /**
    * Abstract bounds type that is used to detect intersections.
    */
    class Bounds2d implements eg.IMoveable {
        public _boundsType: string;
        /**
        * Gets or sets the Position of the bounds.
        */
        public Position: eg.Vector2d;
        /**
        * Gets or sets the Rotation of the bounds.
        */
        public Rotation: number;
        /**
        * Should only ever be called by derived classes.
        * @param position Initial Position of the current bounded object.
        */
        constructor(position: eg.Vector2d);
        /**
        * Should only ever be called by derived classes.
        * @param position Initial Position of the current bounded object.
        * @param rotation Initial Rotation of the current bounded object.
        */
        constructor(position: eg.Vector2d, rotation: number);
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
        public ContainsPoint(point: eg.Vector2d): boolean;
        /**
        * Determines if the current bounded object intersects another bounded object.
        * @param obj Bounding object to check collision with.
        */
        public Intersects(obj: Bounds2d): boolean;
        /**
        * Determines if the current bounded object is intersecting the provided BoundingCircle.
        * @param circle BoundingCircle to check intersection with.
        */
        public Intersects(circle: Bounds.BoundingCircle): boolean;
        /**
        * Determines if the current bounded object is intersecting the provided BoundingRectangle.
        * @param rectangle BoundingRectangle to check intersection with.
        */
        public Intersects(rectangle: Bounds.BoundingRectangle): boolean;
        /**
        * Abstract: Determines if the current bounded object is intersecting the provided BoundingCircle.
        * @param circle BoundingCircle to check intersection with.
        */
        public IntersectsCircle(circle: Bounds.BoundingCircle): boolean;
        /**
        * Abstract: Determines if the current bounded object is intersecting the provided BoundingRectangle.
        * @param rectangle BoundingRectangle to check intersection with.
        */
        public IntersectsRectangle(rectangle: Bounds.BoundingRectangle): boolean;
    }
}
declare module eg.Rendering {
    /**
    * Represents a renderable object that can be drawn to a canvas.
    */
    interface IRenderable {
        /**
        * Gets or sets the ZIndex property.  The ZIndex is used to control draw order.  Higher ZIndexes appear above lower ZIndexed renderables.
        */
        ZIndex: number;
        /**
        * Gets or sets the Visible property.  The Visible property determines whether the renderable will be drawn to the game screen.
        */
        Visible: boolean;
        /**
        * Draws the renderable to the provided canvas context
        * @param context The canvas context to draw the renderable onto.
        */
        Draw(context: CanvasRenderingContext2D): void;
        /**
        * Returns the bounding area that represents where the renderable will draw.
        */
        GetDrawBounds(): eg.Bounds.Abstractions.Bounds2d;
    }
}
declare module eg._.Loopers {
    class LooperCallback implements _.ITyped {
        public _type: string;
        private static _ids;
        constructor(callback: Function);
        public Callback: Function;
        public ID: number;
    }
}
declare module eg._.Loopers {
    interface ILooper extends eg.IDisposable, _.ITyped {
        Start(): void;
        AddCallback(callback: Loopers.LooperCallback): void;
        RemoveCallback(callback: Loopers.LooperCallback): void;
    }
}
declare module eg._.Loopers {
    class TimedCallback extends Loopers.LooperCallback implements _.ITyped {
        public _type: string;
        constructor(fps: number, callback: Function);
        public Fps: number;
        public TimeoutID: number;
        public Active: boolean;
    }
}
declare module eg._.Loopers {
    class Looper implements Loopers.ILooper {
        public _type: string;
        private _running;
        private _callbacks;
        constructor();
        public AddCallback(timedCallback: Loopers.TimedCallback): void;
        public RemoveCallback(timedCallback: Loopers.TimedCallback): void;
        public Start(): void;
        private Run();
        private Loop(timedCallback);
        public Dispose(): void;
    }
}
interface Window {
    OnRepaintCompleted(callback: Function): void;
}
declare module eg._.Loopers {
    class RepaintLooper implements Loopers.ILooper {
        public _type: string;
        private _running;
        private _callbacksModified;
        private _callbacks;
        constructor();
        public Start(): void;
        private Run();
        public AddCallback(looperCallback: Loopers.LooperCallback): void;
        public RemoveCallback(looperCallback: Loopers.LooperCallback): void;
        public Dispose(): void;
    }
}
declare module eg {
    /**
    * Defines a GameConfiguration object that is used to represent the current state of a Game object.
    */
    class GameConfiguration {
        private _defaultUpdateRate;
        private _updateRateSetter;
        private _updateRate;
        /**
        * Creates a new instance of the GameConfiguration object.
        * @param updateRateSetter A function that updates the rate of "Update" execution.
        */
        constructor(updateRateSetter: (updateRate: number) => void);
        /**
        * Gets the current update rate.
        */
        public UpdateRate(): number;
        /**
        * Sets and gets the update rate.
        * @param updateRate The new update rate. X many updates per second.
        */
        public UpdateRate(updateRate: number): number;
    }
}
declare module eg {
    /**
    * Defines a type constrained event handler object that can maintain bound functions which take in a value T and trigger them on demand.
    */
    class EventHandler1<T> implements eg._.ITyped {
        public _type: string;
        private _actions;
        private _hasBindings;
        /**
        * Creates a new instance of the EventHandler object.
        */
        constructor();
        /**
        * Binds the provided action to the EventHandler1.  Trigger will execute all bound functions.
        * @param action Function to execute on EventHandler Trigger.
        */
        public Bind(action: (val: T) => any): void;
        /**
        * Unbinds the provided action from the EventHandler1.
        * @param action Function to unbind.  The action will no longer be executed when the EventHandler gets Triggered.
        */
        public Unbind(action: (val: T) => any): void;
        /**
        * Determines if the EventHandler1 has active bindings.
        */
        public HasBindings(): boolean;
        /**
        * Executes all bound functions and passes the provided args to each.
        * @param val The argument to pass to the bound functions.
        */
        public Trigger(val: T): void;
    }
}
declare module eg.Collision.Assets {
    /**
    * Defines a data object that is used to describe a collision event.
    */
    class CollisionData {
        /**
        * Where the collision occurred.
        */
        public At: eg.Vector2d;
        /**
        * Who collided with you.
        */
        public With: Collision.Collidable;
        /**
        * Creates a new instance of the CollisionData object.
        * @param at Initial value of the At component of CollisionData.
        * @param w Initial value of the With component of CollisionData.
        */
        constructor(at: eg.Vector2d, w: Collision.Collidable);
    }
}
declare module eg.Collision {
    /**
    * Defines a collidable object that can be used to detect collisions with other objects.
    */
    class Collidable implements eg.IDisposable, eg._.ITyped {
        public _type: string;
        public _id: number;
        /**
        * Gets or sets the Bounds of the collidable.
        */
        public Bounds: eg.Bounds.Abstractions.Bounds2d;
        private static _collidableIDs;
        private _disposed;
        /**
        * Creates a new instance of Collidable.
        * @param bounds Initial bounds for the Collidable.
        */
        constructor(bounds: eg.Bounds.Abstractions.Bounds2d);
        /**
        * Event: Triggered when a collision happens.  Functions can be bound or unbound to this event to be executed when the event triggers.
        * Passes a CollisionData object to bound functions.
        */
        public OnCollision: eg.EventHandler1<eg.Collision.Assets.CollisionData>;
        /**
        * Event: Triggered when a Collidable has been disposed.  Functions can be bound or unbound to this event to be executed when the event triggers.
        */
        public OnDisposed: eg.EventHandler1<eg.Collision.Collidable>;
        /**
        * Determines if the provided collidable is colliding with this Collidable.
        * @param other Collidable to check collision with.
        */
        public IsCollidingWith(other: Collidable): boolean;
        /**
        * Triggers the OnCollision event.  Can also be overridden from derived classes to be called when a collision occurs if the collidable is being used with a CollisionManager
        * @param data Collision information related to the collision.
        */
        public Collided(data: Collision.Assets.CollisionData): void;
        /**
        * Triggers the OnDisposed event.  If this Collidable is used with a CollisionManager it will be unmonitored when disposed.
        */
        public Dispose(): void;
    }
}
declare module eg {
    /**
    * Defines a type constrained event handler object that can maintain bound functions which take in a value T and U and trigger them on demand.
    */
    class EventHandler2<T, U> implements eg._.ITyped {
        public _type: string;
        private _actions;
        private _hasBindings;
        /**
        * Creates a new instance of the EventHandler object.
        */
        constructor();
        /**
        * Binds the provided action to the EventHandler1.  Trigger will execute all bound functions.
        * @param action Function to execute on EventHandler Trigger.
        */
        public Bind(action: (val1: T, val2: U) => any): void;
        /**
        * Unbinds the provided action from the EventHandler1.
        * @param action Function to unbind.  The action will no longer be executed when the EventHandler gets Triggered.
        */
        public Unbind(action: (val1: T, val2: U) => any): void;
        /**
        * Determines if the EventHandler1 has active bindings.
        */
        public HasBindings(): boolean;
        /**
        * Executes all bound functions and passes the provided args to each.
        * @param val1 The first argument to pass to the bound functions.
        */
        public Trigger(val1: T, val2: U): void;
    }
}
declare module eg.Collision {
    /**
    * Defines a manager that will check for collisions between objects that it is monitoring.
    */
    class CollisionManager implements eg.IUpdateable, eg._.ITyped {
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
        public OnCollision: eg.EventHandler2<eg.Collision.Collidable, eg.Collision.Collidable>;
        /**
        * Monitors the provided collidable and will trigger its Collided function and OnCollision event whenever a collision occurs with it and another Collidable.
        * If the provided collidable gets disposed it will automatically become unmonitored.
        * @param obj Collidable to monitor.
        */
        public Monitor(obj: Collision.Collidable): void;
        /**
        * Unmonitors the provided collidable.  The Collided function and OnCollision event will no longer be triggered when an actual collision may have occured.
        * Disposing a monitored collidable will automatically be unmonitored
        * @param obj Collidable to unmonitor.
        */
        public Unmonitor(obj: Collision.Collidable): void;
        /**
        * Checks for collisions within its monitored objects.  Games CollisionManager's automatically have their Update functions called at the beginning of each update loop.
        * @param gameTime The current game time object.
        */
        public Update(gameTime: eg.GameTime): void;
    }
}
declare module eg.Graphics.Assets._ {
    class Graphic2dState {
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
declare module eg.Graphics.Abstractions {
    /**
    * Abstract drawable graphic type that is used create the base for graphics.
    */
    class Graphic2d implements eg._.ITyped, eg.Rendering.IRenderable, eg.IMoveable {
        public _type: string;
        /**
        * Gets or sets the ZIndex of the Graphic2d.  The ZIndex is used to control draw order.  Higher ZIndexes appear above lower ZIndexed graphics.
        */
        public ZIndex: number;
        /**
        * Gets or sets the Visible property.  The Visible property determines whether the renderable will be drawn to the game screen.
        */
        public Visible: boolean;
        /**
        * Gets or sets the Position of the Graphic2d.  The Position determines where the graphic will be drawn on the screen.
        */
        public Position: eg.Vector2d;
        /**
        * Gets or sets the Rotation of the Graphic2d..
        */
        public Rotation: number;
        public _State: Graphics.Assets._.Graphic2dState;
        static _zindexSort: (a: Graphic2d, b: Graphic2d) => number;
        private _children;
        constructor(position: eg.Vector2d);
        /**
        * Adds a child to the Graphic2d.  Children are drawn with relative positions to the parent Graphic2d.  Children
        * of a Graphic2d should not be added to the Scene, parent Graphic2d's are responsible for drawing their children.
        * @param graphic Child to add.
        */
        public AddChild(graphic: Graphic2d): void;
        /**
        * Removes a child from the Graphic2d.  Returns a Boolean value indicating whether or not the child was able to be removed.
        * @param graphic Child to remove.
        */
        public RemoveChild(graphic: Graphic2d): boolean;
        /**
        * Returns the list of children for the current Graphic2d.
        */
        public Children(): Graphic2d[];
        public _StartDraw(context: CanvasRenderingContext2D): void;
        public _EndDraw(context: CanvasRenderingContext2D): void;
        /**
        * Abstract: Should be overridden to draw the derived class onto the context.  If this graphic is part of a scene the Draw function will be called automatically.
        * @param context The canvas context to draw the graphic onto.
        */
        public Draw(context: CanvasRenderingContext2D): void;
        /**
        * Abstract: Should be overridden to return the bounding area that represents where the graphic will draw.
        */
        public GetDrawBounds(): eg.Bounds.Abstractions.Bounds2d;
    }
}
declare module eg.Rendering {
    /**
    * Defines a camera that is used to define a viewport.  Should be used in conjunction with a Camera2dRenderer to render graphics as if being viewed through a camera.
    */
    class Camera2d extends eg.Bounds.BoundingRectangle {
        /**
        *  The distance in which the Camera2d will default to and the distance that defines the 100% scale value.
        */
        static DefaultDistance: number;
        public _type: string;
        /**
        * Gets or sets the camera distance.  This represents how far away the Camera is from the game canvas.  0 is directly on top of the canvas while DefaultDistance represents 100% scale.
        */
        public Distance: number;
        /**
        * Creates a new instance of the Camera2d object.
        * @param position Initial position of the camera.
        * @param size Initial size of the camera.
        */
        constructor(position: eg.Vector2d, size: eg.Size2d);
        /**
        * Converts an absolute position (0 to cameras Size) to a camera relative position.  Most useful when used to convert mouse click coordinates to scene coordinates.
        * @param position The absolute position to convert.  0 position represents the top or left hand side of the camera.
        */
        public ToCameraRelative(position: eg.Vector2d): eg.Vector2d;
        public _GetInverseDistanceScale(): number;
        public _GetDistanceScale(): number;
    }
}
declare module eg.Rendering._ {
    interface IRenderer extends eg.IDisposable {
        Render(renderables: Rendering.IRenderable[]): CanvasRenderingContext2D;
    }
}
declare module eg.Rendering {
    /**
    * Defines a 2d renderer that uses a double buffer to draw graphics.
    */
    class Renderer2d implements Rendering._.IRenderer {
        static _zindexSort: (a: Rendering.IRenderable, b: Rendering.IRenderable) => number;
        public _BufferCanvas: HTMLCanvasElement;
        public _BufferContext: CanvasRenderingContext2D;
        private _visibleCanvas;
        private _visibleContext;
        private _disposed;
        /**
        * Creates a new instance of the Renderer2d object.
        * @param renderOnto The canvas to render onto.
        */
        constructor(renderOnto: HTMLCanvasElement);
        /**
        * Event: Triggered when the renderOnto canvas changes size.  Functions can be bound or unbound to this event to be executed when the event triggers.
        * Passes the new size as a Size2d.
        */
        public OnRendererSizeChange: eg.EventHandler1<eg.Size2d>;
        /**
        * Renders the provided renderables onto the renderOnto canvas.  Returns the canvas that was rendered onto.
        * @param renderables Array of items that are to be rendered, assumes Visible is set to true.
        */
        public Render(renderables: Rendering.IRenderable[]): CanvasRenderingContext2D;
        /**
        * Destroys the visible canvas.
        */
        public Dispose(): void;
        public _ClearBuffer(): void;
        private UpdateBufferSize();
    }
}
declare module eg.Rendering._ {
    /**
    * Defines a builder that is used to build a camera sensitive CanvasRenderingContext2d so that anything drawn to it becomes relative to the Camera2d.
    */
    class Camera2dCanvasContextBuilder {
        private _camera;
        private _canvasCenter;
        private _translated;
        private _translationState;
        /**
        * Creates a new instance of the Camera2dCanvasContextBuilder object.
        * @param camera Camera to link to built CanvasRenderingContext2d's (Cannot change after construction).
        */
        constructor(camera: Rendering.Camera2d);
        /**
        * Builds a new CanvasRenderingContext2d around the provided context that is linked to the camera.  Anything drawn to the context becomes relative to the camera.
        * @param context The context to build the camera linked context around.
        */
        public Build(context: CanvasRenderingContext2D): CanvasRenderingContext2D;
        public _UpdateCanvasCenter(newSize: eg.Size2d): void;
        private BuildPositionReplacer(replacee, positionArgOffset?, argCount?);
    }
}
declare module eg.Rendering {
    /**
    * Defines a camera rendering object that when used in conjunction with a Camera2d draws all objects in a camera relative position.
    */
    class Camera2dRenderer extends Rendering.Renderer2d {
        private _camera;
        private _contextBuilder;
        /**
        * Creates a new instance of the Camera2dRenderer.
        * @param renderOnto The canvas to render onto.
        * @param camera The camera that ultimately decides what is drawn to the renderOnto canvas.
        */
        constructor(renderOnto: HTMLCanvasElement, camera: Rendering.Camera2d);
        /**
        * Renders the provided renderables onto the renderOnto canvas.  Returns the canvas that was rendered onto.
        * @param renderables Array of items that are to be rendered.
        */
        public Render(renderables: Rendering.IRenderable[]): CanvasRenderingContext2D;
        public _ClearBuffer(): void;
        private GetOnScreenRenderables(allRenderables);
    }
}
declare module eg.Rendering {
    /**
    * Defines a scene object that is used to maintain a list of renderable objects that are rendered onto a joint game area.
    */
    class Scene2d implements eg.IDisposable {
        /**
        * The canvas that the Scene2d uses as its game area.
        */
        public DrawArea: HTMLCanvasElement;
        /**
        * The game camera.
        */
        public Camera: Rendering.Camera2d;
        private _actors;
        private _renderer;
        private _onDraw;
        private _disposed;
        /**
        * Creates a new instance of the Scene2d object.  The game canvas is created and appended to the HTML body to fill the screen.
        */
        constructor();
        /**
        * Creates a new instance of the Scene2d object.  The game canvas is created and appended to the HTML body to fill the screen.
        * @param onDraw Callback to execute whenever the Scene's draw is triggered.
        */
        constructor(onDraw: (context: CanvasRenderingContext2D) => void);
        /**
        * Creates a new instance of the Scene2d object.
        * @param onDraw Callback to execute whenever the Scene's draw is triggered.
        * @param drawArea The game canvas to draw onto.
        */
        constructor(onDraw: (context: CanvasRenderingContext2D) => void, drawArea: HTMLCanvasElement);
        /**
        * Adds an actor to the scene.  All actors added to the scene have their Draw function called automatically.
        * @param actor The graphic to add to the scene.
        */
        public Add(actor: eg.Graphics.Abstractions.Graphic2d): void;
        /**
        * Removes an actor from the scene.  The actor will no longer have its Draw called.
        * @param actor The graphic to remove from the scene.
        */
        public Remove(actor: eg.Graphics.Abstractions.Graphic2d): void;
        /**
        * Draws all actors within the Scene and triggers the Scene2d's onDraw callback.
        */
        public Draw(): void;
        /**
        * Destroys the game canvas and clears the Scene2d's actors.
        */
        public Dispose(): void;
        private ApplyStyles(drawArea);
        private CreateDefaultDrawArea();
    }
}
declare module eg.Input._ {
    class MouseButton {
        static Left: string;
        static Middle: string;
        static Right: string;
    }
}
declare module eg.Input {
    /**
    * Represents a mouse event being triggered on the Game area.
    */
    interface IMouseEvent {
        /**
        * The location of the mouse relative to the game area.
        */
        Position: eg.Vector2d;
    }
}
declare module eg.Input {
    /**
    * Represents a mouse click event being triggered on the Game area.
    */
    interface IMouseClickEvent extends Input.IMouseEvent {
        /**
        * The mouse button that was clicked. Values can be "Left", "Right", or "Middle".
        */
        Button: string;
    }
}
declare module eg.Input {
    /**
    * Represents a mouse scroll event being triggered on the Game area.
    */
    interface IMouseScrollEvent extends Input.IMouseEvent {
        /**
        * The scroll direction. The Vector2d will contain 1, -1, or 0 values depending on the mouse scroll.
        */
        Direction: eg.Vector2d;
    }
}
declare module eg.Input {
    /**
    * Defines a handler that will monitor mouse events over a specified area and will execute appropriate functions based on the events.
    */
    class MouseHandler {
        /**
        * Indicates if the left mouse button is down
        */
        public LeftIsDown: boolean;
        /**
        * Indicates if the middle mouse button is down
        */
        public MiddleIsDown: boolean;
        /**
        * Indicates if the right mouse button is down
        */
        public RightIsDown: boolean;
        /**
        * Indicates if any mouse button is down.
        */
        public IsDown: boolean;
        private static MouseButtonArray;
        private _target;
        /**
        * Creates a new instance of the MouseHandler object.
        * @param target The object to monitor mouse events for.
        */
        constructor(target: HTMLElement);
        /**
        * Event: Triggered when a mouse click occurs.  Functions can be bound or unbound to this event to be executed when the event triggers.
        * Passes an IMouseClickEvent event object to bound functions.
        */
        public OnClick: eg.EventHandler1<eg.Input.IMouseClickEvent>;
        /**
        * Event: Triggered when a mouse double click occurs.  Functions can be bound or unbound to this event to be executed when the event triggers.
        * Passes an IMouseClickEvent event object to bound functions.
        */
        public OnDoubleClick: eg.EventHandler1<eg.Input.IMouseClickEvent>;
        /**
        * Event: Triggered when a mouse down event occurs.  Functions can be bound or unbound to this event to be executed when the event triggers.
        * Passes an IMouseClickEvent event object to bound functions.
        */
        public OnDown: eg.EventHandler1<eg.Input.IMouseClickEvent>;
        /**
        * Event: Triggered when a mouse up event occurs.  Functions can be bound or unbound to this event to be executed when the event triggers.
        * Passes an IMouseClickEvent event object to bound functions.
        */
        public OnUp: eg.EventHandler1<eg.Input.IMouseClickEvent>;
        /**
        * Event: Triggered when a mouse move event occurs.  Functions can be bound or unbound to this event to be executed when the event triggers.
        * Passes an IMouseEvent event object to bound functions.
        */
        public OnMove: eg.EventHandler1<eg.Input.IMouseEvent>;
        /**
        * Event: Triggered when a mouse scroll event occurs.  Functions can be bound or unbound to this event to be executed when the event triggers.
        * Passes an IMouseScrollEvent event object to bound functions.
        */
        public OnScroll: eg.EventHandler1<eg.Input.IMouseScrollEvent>;
        private Wire();
        private BuildEvent<T>(eventHandler, mouseEventBuilder, returnValue?);
        private BuildMouseScrollEvent(event);
        private BuildMouseEvent(event);
        private BuildMouseClickEvent(event);
        private GetMousePosition(event);
        private GetMouseButton(event);
        private GetMouseScrollDierction(event);
    }
}
declare module eg {
    /**
    * Defines an event handler object that can maintain bound functions and trigger them on demand.
    */
    class EventHandler implements eg._.ITyped {
        public _type: string;
        private _actions;
        private _hasBindings;
        /**
        * Creates a new instance of the EventHandler object.
        */
        constructor();
        /**
        * Binds the provided action to the EventHandler.  Trigger will execute all bound functions.
        * @param action Function to execute on EventHandler Trigger.
        */
        public Bind(action: Function): void;
        /**
        * Unbinds the provided action from the EventHandler.
        * @param action Function to unbind.  The action will no longer be executed when the EventHandler gets Triggered.
        */
        public Unbind(action: Function): void;
        /**
        * Determines if the EventHandler has active bindings.
        */
        public HasBindings(): boolean;
        /**
        * Executes all bound functions and passes the provided args to each.
        */
        public Trigger(): void;
    }
}
declare module eg._.Utilities {
    class NoopTripInvoker {
        private static _noop;
        private _invoker;
        private _action;
        constructor(action: Function, tripped?: boolean);
        public Invoke(...args: any[]): void;
        public InvokeOnce(...args: any[]): void;
        public Trip(): void;
        public Reset(): void;
    }
}
declare module eg.Input.Assets {
    /**
    * Defines an object that is used to represent a keyboard modifier state to determine if Ctrl, Alt, or Shift is being pressed.
    */
    class KeyboardModifiers {
        /**
        * Gets or sets the Ctrl component.  Represents if a Ctrl key is down.
        */
        public Ctrl: boolean;
        /**
        * Gets or sets the Alt component.  Represents if an Alt key is down.
        */
        public Alt: boolean;
        /**
        * Gets or sets the Shift component.  Represents if a Shift key is down.
        */
        public Shift: boolean;
        /**
        * Creates a new instance of the KeyboardModifiers object.
        * @param ctrl The initial value of the Ctrl component.
        * @param alt The initial value of the Alt component.
        * @param shift The initial value of the Shift component.
        */
        constructor(ctrl: boolean, alt: boolean, shift: boolean);
        /**
        * Determines whether this KeyboardModifiers object has the same ctrl, alt, and shift states as the provided KeyboardModifiers.
        * @param modifier The KeyboardModifiers to compare the current modifiers to.
        */
        public Equivalent(modifier: KeyboardModifiers): boolean;
        /**
        * Builds a KeyboardModifiers object to represent the state of an expected keyCommand
        * @param keyCommand The command to analyze.
        */
        static BuildFromCommandString(keyCommand: string): KeyboardModifiers;
    }
}
declare module eg.Input {
    /**
    * Defines a KeyboardCommandEvent object that represents when a command has been attempted.
    */
    class KeyboardCommandEvent {
        /**
        * The key that was hit.
        */
        public Key: string;
        /**
        * The modifier status.
        */
        public Modifiers: Input.Assets.KeyboardModifiers;
        /**
        * Creates a new instance of the KeyboardCommandEvent object.
        * @param keyEvent The raw key event from the DOM.
        */
        constructor(keyEvent: KeyboardEvent);
        /**
        * Determines if the KeyboardCommand matches the KeyboardCommandEvent
        * @param command The KeyboardCommand to check.
        */
        public Matches(command: Input.Assets.KeyboardCommand): boolean;
    }
}
declare module eg.Input._ {
    class KeyboardCommandHelper {
        static ParseKey(command: string): string;
    }
}
declare module eg.Input.Assets {
    /**
    * Defines a class that is used to represent a keyboard command.
    */
    class KeyboardCommand implements eg.IDisposable {
        /**
        * Gets or sets the Key that is required to trigger the Action.
        */
        public Key: string;
        /**
        * Gets or sets the Action that is triggered when the KeyboardCommand has been successfully executed.
        */
        public Action: Function;
        /**
        * Gets or sets the Modifiers that are required to trigger the Action.
        */
        public Modifiers: Assets.KeyboardModifiers;
        private _onDisposeInvoker;
        /**
        * Creates a new instance of the KeyboardCommand object.
        * @param command Initial command required to trigger the action function.
        * @param action Initial action to be triggered when the command is executed..
        */
        constructor(command: string, action: Function);
        /**
        * Event: Triggered when a KeyboardCommand has been disposed.  If this KeyboardCommand is used with a KeyboardHandler it will no longer trigger the Action function.  Functions can be bound or unbound to this event to be executed when the event triggers.
        */
        public OnDispose: eg.EventHandler;
        /**
        * Triggers the OnDisposed event.  If this KeyboardCommand is used with a KeyboardHandler it will no longer trigger the Action function.
        */
        public Dispose(): void;
    }
}
declare module eg.Input {
    /**
    * Defines a handler that will check for keyboard commands and execute appropriate functions.
    */
    class KeyboardHandler {
        private static _keyboardCommandIds;
        private _target;
        private _onPressCommands;
        private _onDownCommands;
        private _onUpCommands;
        /**
        * Creates a new instance of the KeyboardHandler object.
        */
        constructor();
        /**
        * Event: Triggered when any key press occurs.  Functions can be bound or unbound to this event to be executed when the event triggers.
        * Passes a KeyboardCommandEvent object to bound functions.
        */
        public OnKeyPress: eg.EventHandler1<eg.Input.KeyboardCommandEvent>;
        /**
        * Event: Triggered when any key goes down.  Functions can be bound or unbound to this event to be executed when the event triggers.
        * Passes a KeyboardCommandEvent object to bound functions.
        */
        public OnKeyDown: eg.EventHandler1<eg.Input.KeyboardCommandEvent>;
        /**
        * Event: Triggered when any key comes up.  Functions can be bound or unbound to this event to be executed when the event triggers.
        * Passes a KeyboardCommandEvent object to bound functions.
        */
        public OnKeyUp: eg.EventHandler1<eg.Input.KeyboardCommandEvent>;
        /**
        * Binds function to be called when the keyCommand is pressed.  To unbind the function, dispose of the returned KeyboardCommand.
        * @param keyCommand The command string required to execute the action.
        * @param action The action to execute when the keyCommand has been pressed.
        */
        public OnCommandPress(keyCommand: string, action: Function): Input.Assets.KeyboardCommand;
        /**
        * Binds function to be called when the keyCommand goes down.  To unbind the function, dispose of the returned KeyboardCommand.
        * @param keyCommand The command string required to execute the action.
        * @param action The action to execute when the keyCommand has is down.
        */
        public OnCommandDown(keyCommand: string, action: Function): Input.Assets.KeyboardCommand;
        /**
        * Binds function to be called when the keyCommand comes up.  To unbind the function, dispose of the returned KeyboardCommand.
        * @param keyCommand The command string required to execute the action.
        * @param action The action to execute when the keyCommand comes up.
        */
        public OnCommandUp(keyCommand: string, action: Function): Input.Assets.KeyboardCommand;
        private UpdateCache(keyCommand, action, store);
        private Wire();
        private FocusingTextArea(ke);
        private BuildKeyEvent(store, eventHandler);
    }
}
declare module eg.Input {
    /**
    * Defines an all around Input handler which manages mouse and keyboard events.
    */
    class InputManager {
        /**
        * Used to bind functions to mouse related events.
        */
        public Mouse: Input.MouseHandler;
        /**
        * Used to bind functions to keyboard related events.
        */
        public Keyboard: Input.KeyboardHandler;
        /**
        * Creates a new instance of the InputManager object.
        * @param target The object through which mouse events will be monitored on.
        */
        constructor(target: HTMLElement);
    }
}
declare module eg.Sound {
    /**
    * Defines a set of settings that are used to play AudioClip's a custom way.
    */
    class AudioSettings {
        /**
        * The default audio settings.
        */
        static Default: AudioSettings;
        /**
        * Gets or sets the repeat function of the AudioClip.
        */
        public Repeat: boolean;
        /**
        * Gets or sets the volume level of the AudioClip. Value between 0-100.
        */
        public Volume: number;
        /**
        * Gets or sets the auto play functionality of the AudioClip.
        */
        public AutoPlay: boolean;
        /**
        * Gets or sets the preload functionality of the AudioClip.  Values can be "auto", "metadata", or "none".
        */
        public Preload: string;
        /**
        * Creates a new instance of the AudioSettings object with default values.
        */
        constructor();
        /**
        * Creates a new instance of the AudioSettings object.
        * @param repeat Initial value of the repeat component.
        */
        constructor(repeat: boolean);
        /**
        * Creates a new instance of the AudioSettings object.
        * @param repeat Initial value of the repeat component.
        * @param volume Initial value of the volume component. Value between 0-100.
        */
        constructor(repeat: boolean, volume: number);
        /**
        * Creates a new instance of the AudioSettings object.
        * @param repeat Initial value of the repeat component.
        * @param volume Initial value of the volume component. Value between 0-100.
        * @param autoplay Initial value of the auto play component.
        */
        constructor(repeat: boolean, volume: number, autoplay: boolean);
        /**
        * Creates a new instance of the AudioSettings object.
        * @param repeat Initial value of the repeat component.
        * @param volume Initial value of the volume component. Value between 0-100.
        * @param autoplay Initial value of the auto play component.
        * @param preload Initial value of the preload component.  Values can be "auto", "metadata", or "none".
        */
        constructor(repeat: boolean, volume: number, autoplay: boolean, preload: string);
    }
}
declare module eg.Sound {
    /**
    * Defines a single audio clip that can be played, stopped or paused.
    */
    class AudioClip {
        private _audio;
        private _settings;
        /**
        * Creates a new instance of the AudioClip object.
        * @param source An array of source paths to audio clips.  Pass in multiple audio types of the same clip to ensure cross browser compatibility.
        */
        constructor(source: string[]);
        /**
        * Creates a new instance of the AudioClip object.
        * @param source Source path to an audio clip.
        */
        constructor(source: string);
        /**
        * Creates a new instance of the AudioClip object.
        * @param source Source path to an audio clip.
        * @param settings Audio clip settings.
        */
        constructor(source: string, settings?: Sound.AudioSettings);
        /**
        * Creates a new instance of the AudioClip object.
        * @param source An array of source paths to audio clips.  Pass in multiple audio types of the same clip to ensure cross browser compatibility.
        * @param settings Audio clip settings.
        */
        constructor(source: string[], settings?: Sound.AudioSettings);
        /**
        * Event: Triggered when the audio clip has completed, will not trigger if the audio clip is repeating.  Functions can be bound or unbound to this event to be executed when the event triggers.
        * Passes the DOM's ended event to bound functions.
        */
        public OnComplete: eg.EventHandler1<Event>;
        public Volume(percent?: number): number;
        /**
        * Determines if the AudioClip is currently playing.
        */
        public IsPlaying(): boolean;
        /**
        * Determines if the AudioClip has completed.
        */
        public IsComplete(): boolean;
        /**
        * Plays the current audio clip.
        */
        public Play(): void;
        /**
        * Pauses the current audio clip.
        */
        public Pause(): void;
        /**
        * Seeks the audio clip to the provided time.
        * @param time The time to seek to.
        */
        public Seek(time: number): void;
        /**
        * Stops the current audio clip and seeks back to time 0.
        */
        public Stop(): void;
        private SetAudioSource(source);
        private ApplySettings();
    }
}
declare module eg.Sound {
    /**
    * Defines an AudioPlayer that is mapped to a specific source.  Ultimately used to play the same sound simultaneously.
    */
    class AudioPlayer {
        private _source;
        /**
        * Creates a new instance of the AudioPlayer object.
        * @param source Source path to an audio clip.
        */
        constructor(source: string);
        /**
        * Creates a new instance of the AudioPlayer object.
        * @param source An array of source paths to audio clips.  Pass in multiple audio types of the same clip to ensure cross browser compatibility.
        */
        constructor(source: string[]);
        /**
        * Builds an AudioClip and plays it with the default settings.  Returns the built audio clip.
        */
        public Play(): Sound.AudioClip;
        /**
        * Builds an AudioClip and plays it with the provided settings.  Returns the built audio clip.
        * @param settings Audio settings to play the AudioClip with.
        */
        public Play(settings: Sound.AudioSettings): Sound.AudioClip;
    }
}
declare module eg.Sound {
    /**
    * Defines an audio manager that is used to preload AudioClip's that can be played at any time.
    */
    class AudioManager {
        private _audioPlayers;
        /**
        * Creates a new instance of the AudioManager object.
        */
        constructor();
        /**
        * Loads AudioPlayer for the provided clip info.  Returns the loaded player for easy access.
        * @param name The mapped name for the AudioPlayer.
        * @param src Source path to an audio clip.
        */
        public Load(name: string, src: string): Sound.AudioPlayer;
        /**
        * Loads an audio player, returns the AudioPlayer for easy access.
        * @param name The mapped name for the AudioPlayer.
        * @param src An array of source paths to audio clips.  Pass in multiple audio types of the same clip to ensure cross browser compatibility.
        */
        public Load(name: string, src: string[]): Sound.AudioPlayer;
        /**
        * Unload player that is mapped to the provided name.
        * @param name The mapped name of the AudioPlayer to unload.
        */
        public Unload(name: string): Sound.AudioPlayer;
        /**
        * Plays a new audio clip that's mapped to the provided name with the default audio settings.
        * @param name The mapped name of the AudioPlayer to Play.
        */
        public Play(name: string): Sound.AudioClip;
        /**
        * Plays a new audio clip that's mapped to the provided name.
        * @param name The mapped name of the AudioPlayer to Play.
        * @param settings The audio settings to play the clip with.
        */
        public Play(name: string, settings?: Sound.AudioSettings): Sound.AudioClip;
        /**
        * Retrieves a loaded audio player under the provided name.
        * @param name The mapped name of the AudioPlayer to retrieve.
        */
        public GetAudioPlayer(name: string): Sound.AudioPlayer;
    }
}
declare module eg.Map {
    /**
    * Defines a SceneryHandler which specializes in drawing large background type layers to depict scenery.
    */
    class SceneryHandler {
        private _sceneryCanvas;
        private _camera;
        private _layers;
        private _renderer;
        /**
        * Creates a new instance of the SceneryHandler object.
        * @param scene The primary scene that this SceneryHandler will play behind.
        */
        constructor(scene: eg.Rendering.Scene2d);
        /**
        * Adds a layer to the scenery.
        * @param layer The layer to add.
        */
        public AddLayer(layer: eg.Graphics.Abstractions.Graphic2d): void;
        /**
        * Removes a layer from the scenery.
        * @param layer The layer to remove.
        */
        public RemoveLayer(layer: eg.Graphics.Abstractions.Graphic2d): void;
        /**
        * Draws all layers onto the given context.  If this is used via a MapManager object, Draw will automatically be called.
        */
        public Draw(): void;
        private BuildSceneryCanvas(foreground);
    }
}
declare module eg.Map {
    /**
    * Defines a map manager that is used to manage Scenery.  Will eventually be expanded to handle obstacles.
    */
    class MapManager {
        /**
        * Used to draw larger images that are used to depict backgrounds or other scenery.
        */
        public Scenery: Map.SceneryHandler;
        /**
        * Creates a new instance of the MapManager object.
        * @param scene The Scene2d that is used to draw smaller objects within the game (the foreground scene).
        */
        constructor(scene: eg.Rendering.Scene2d);
    }
}
declare module eg {
    /**
    * Defines a virtual Game object that is meant to be derived from.  Games contain a multitude of management objects to control every aspect of the game.
    */
    class Game implements eg._.ITyped, eg.IUpdateable, eg.IDisposable {
        public _type: string;
        /**
        * The games configuration.  Used to modify settings such as the game update rate.
        */
        public Configuration: eg.GameConfiguration;
        /**
        * A collision manager which is used to actively detect collisions between monitored Collidable's.
        */
        public CollisionManager: eg.Collision.CollisionManager;
        /**
        * A scene manager which is used to draw Graphic2d's onto the game screen.
        */
        public Scene: eg.Rendering.Scene2d;
        /**
        * An input manager which is used to monitor mouse and keyboard events.
        */
        public Input: eg.Input.InputManager;
        /**
        * An audio manager which is used to load, manage and play audio clips.
        */
        public Audio: eg.Sound.AudioManager;
        /**
        * A map manager that is used to draw large Graphic2d's (Layer's) to the background.
        */
        public Map: eg.Map.MapManager;
        public _ID: number;
        private static _gameIds;
        private _gameTime;
        /**
        * Creates a new instance of the Game object.  A default canvas will be created that fills the DOM body.
        */
        constructor();
        /**
        * Creates a new instance of the Game object.
        * @param gameCanvas The canvas to utilize as the game area.
        */
        constructor(gameCanvas: HTMLCanvasElement);
        public _PrepareUpdate(): void;
        /**
        * Triggered on a regular interval defined by the GameConfiguration.
        * @param gameTime The global game time object.  Used to represent total time running and used to track update interval elapsed speeds.
        */
        public Update(gameTime: eg.GameTime): void;
        public _PrepareDraw(): void;
        /**
        * Triggered as fast as possible.  Determined by the current browsers repaint rate.
        */
        public Draw(context: CanvasRenderingContext2D): void;
        /**
        * Removes game canvas and disposes all tracked objects.
        */
        public Dispose(): void;
    }
}
declare module eg._ {
    class GameRunner implements _.ITyped {
        public _type: string;
        private _updateCallbacks;
        private _drawCallbacks;
        private _updateLoop;
        private _drawLoop;
        private _callbackCount;
        constructor();
        public Register(game: eg.Game): (updateRate: number) => void;
        public Unregister(game: eg.Game): void;
        private TryLoopStart();
        private TryLoopStop();
        private CreateAndCacheUpdateCallback(game);
        private CreateAndCacheDrawCallback(game);
        private CreateUpdateRateSetter(callback);
    }
}
declare var GameRunnerInstance: eg._.GameRunner;
declare module eg.MovementControllers.Assets {
    /**
    * Defines a direction management object that represents directional state.
    */
    class LinearDirections {
        /**
        * Indicates whether the object is moving left.
        */
        public Left: boolean;
        /**
        * Indicates whether the object is moving right.
        */
        public Right: boolean;
        /**
        * Indicates whether the object is moving up.
        */
        public Up: boolean;
        /**
        * Indicates whether the object is moving down.
        */
        public Down: boolean;
        /**
        * Creates a new instance of the LinearDirection object with all directions= indicators initially set to false.
        */
        constructor();
    }
}
declare module eg.MovementControllers {
    /**
    * Represents a move event object that is used to depict a movement, specifically a direction and whether or not the move started or stopped.
    */
    interface IMoveEvent {
        /**
        * The movement direction.
        */
        Direction: string;
        /**
        * Whether or not the move started or stopped.
        */
        StartMoving: boolean;
    }
}
declare module eg.MovementControllers.Abstractions {
    /**
    * Abstract class that holds moveable objects and synchronizes positions across them.
    */
    class MovementController implements eg.IMoveable, eg.IUpdateable {
        /**
        * Gets or sets the position of the MovementController
        */
        public Position: eg.Vector2d;
        /**
        * Gets or sets the velocity of the MovementController.
        */
        public Velocity: eg.Vector2d;
        /**
        * Gets or sets the rotation of the MovementController
        */
        public Rotation: number;
        public _frozen: boolean;
        private _moveables;
        /**
        * Should only ever be called by derived classes.
        * @param moveables Moveable objects to synchronize.
        */
        constructor(moveables: eg.IMoveable[]);
        /**
        * Prevents the MovementController from updating object locations.
        */
        public Freeze(): void;
        /**
        * Used to re-enable movement within the MovementController.
        */
        public Thaw(): void;
        /**
        * Determines if the MovementController is moving.  Frozen MovementControllers are not considered moving.
        */
        public IsMoving(): boolean;
        /**
        * Synchronizes the current position with all tracked moveable objects.  MovementController's must be updated in order to move.
        * @param gameTime The current game time object.
        */
        public Update(gameTime: eg.GameTime): void;
    }
}
declare module eg.MovementControllers {
    /**
    * Defines a LinearMovementController that can move objects Up, Right, Left, Down or a combination.
    */
    class LinearMovementController extends MovementControllers.Abstractions.MovementController {
        private _moveSpeed;
        private _moving;
        private _rotationUpdater;
        private _velocityUpdater;
        /**
        * Creates a new instance of the LinearMovementController object which rotates the provided moveable's on movements and can move diagonally.
        * @param movables Array of moveable objects that will be moved when the movement controller moves (this cannot change after construction).
        * @param moveSpeed How fast the movement controller will move.
        */
        constructor(movables: eg.IMoveable[], moveSpeed: number);
        /**
        * Creates a new instance of the LinearMovementController object which can move diagonally.
        * @param movables Array of moveable objects that will be moved when the movement controller moves (this cannot change after construction).
        * @param moveSpeed How fast the movement controller will move.
        * @param rotateWithMovements Whether the movables should rotate to face their moving direction, default is true (this cannot change after construction).
        */
        constructor(movables: eg.IMoveable[], moveSpeed: number, rotateWithMovements: boolean);
        /**
        * Creates a new instance of the LinearMovementController object..
        * @param movables Array of moveable objects that will be moved when the movement controller moves (this cannot change after construction).
        * @param moveSpeed How fast the movement controller will move.
        * @param rotateWithMovements Whether the movables should rotate to face their moving direction.  Default is true (this cannot change after construction).
        * @param multiDirectional Whether multiple movements can occur simultaneously, resulting in diagonal movements. Default is true (this cannot change after construction).
        */
        constructor(movables: eg.IMoveable[], moveSpeed: number, rotateWithMovements: boolean, multiDirectional: boolean);
        /**
        * Event: Triggered when a the movement controller starts or stops a movement.  Functions can be bound or unbound to this event to be executed when the event triggers.
        * Passes an IMoveEvent to bound functions.
        */
        public OnMove: eg.EventHandler1<eg.MovementControllers.IMoveEvent>;
        /**
        * Determines if the movement controller is moving in the provided direction.
        * @param direction The direction to check.
        */
        public IsMovingInDirection(direction: string): boolean;
        /**
        * Starts moving the movement controller in the specified direction.
        * @param direction The direction to start moving.
        */
        public StartMoving(direction: string): void;
        /**
        * Stops the movement controller from moving in the specified direction.
        * @param direction The direction to stop moving.
        */
        public StopMoving(direction: string): void;
        /**
        * Gets the current move speed.
        */
        public MoveSpeed(): number;
        /**
        * Sets and gets the current move speed.
        * @param speed The new move speed.
        */
        public MoveSpeed(speed: number): number;
        /**
        * Moves the LinearMovementController in the currently active directions.  MovementController's must be updated in order to move.
        * @param gameTime The current game time object.
        */
        public Update(gameTime: eg.GameTime): void;
        /**
        * Triggers a move event on the MovementController.
        * @param direction The direction to start or stop moving.
        * @param startMoving Whether the movement is starting or stopping.
        */
        public Move(direction: string, startMoving: boolean): void;
        private UpdateVelocityNoMultiDirection();
        private UpdateVelocityWithMultiDirection();
        private UpdateRotation();
    }
}
declare module eg.InputControllers {
    /**
    * Defines a DirectionalInputController that will monitor Up, Right, Left, and Down movement attempts.
    */
    class DirectionalInputController {
        private _keyboard;
        private _onMove;
        private _directions;
        /**
        * Creates a new instance of the DirectionalInputController object with default key controls.
        * @param keyboard A keyboard handler in order to bind directional events.
        * @param onMove The function to trigger when the user attempts to perform a move.  Passes the direction ("Left", "Right", "Up", "Down") and whether the movement was started or stopped.
        */
        constructor(keyboard: eg.Input.KeyboardHandler, onMove: (direction: string, startMoving: boolean) => void);
        /**
        * Creates a new instance of the DirectionalInputController object with custom key controls.
        * @param keyboard A keyboard handler in order to bind directional events.
        * @param onMove The function to trigger when the user attempts to perform a move.  Passes the direction ("Left", "Right", "Up", "Down") and whether the movement was started or stopped.
        * @param upKeys Array of keys to trigger an "Up" movement.  Default is ["w", "Up"].
        * @param rightKeys Array of keys to trigger a "Right" movement.  Default is ["d", "Right"].
        * @param downKeys Array of keys to trigger a "Down" movement.  Default is ["s", "Down"].
        * @param leftKeys Array of keys to trigger a "Left" movement.  Default is ["a", "Left"].
        */
        constructor(keyboard: eg.Input.KeyboardHandler, onMove: (direction: string, startMoving: boolean) => void, upKeys: string[], rightKeys: string[], downKeys: string[], leftKeys: string[]);
        private BindKeys(keyList, bindingAction, direction, startMoving);
    }
}
declare module eg.Graphics.Assets {
    /**
    * Defines valid FontMeasurements that can be used to increase or decrease font sizes of Text2d's.
    */
    enum FontMeasurement {
        Ems,
        Pixels,
        Points,
        Percent,
    }
}
declare module eg.Graphics.Assets._ {
    class FontMeasurementHelper {
        static _measurements: string[];
        static _Initialize(): void;
        static Get(measurement: Assets.FontMeasurement): string;
    }
}
declare module eg.Graphics.Assets {
    /**
    * Defines valid FontFamilies that can be used to display Text2d's differently.
    */
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
}
declare module eg.Graphics.Assets._ {
    class FontFamilyHelper {
        static _families: {
            [family: number]: string;
        };
        static _Initialize(): void;
        static Get(family: Assets.FontFamily): string;
    }
}
declare module eg.Graphics.Assets {
    /**
    * Defines valid FontVariant's that can be used to change the appearance of Text2d's.
    */
    enum FontVariant {
        Normal,
        SmallCaps,
    }
}
declare module eg.Graphics.Assets._ {
    class FontVariantHelper {
        static _variants: {
            [variant: number]: string;
        };
        static _Initialize(): void;
        static Get(variant: Assets.FontVariant): string;
    }
}
declare module eg.Graphics.Assets {
    /**
    * Defines valid FontStyles that can be used to modify the font's style for Text2d's.
    */
    enum FontStyle {
        Normal,
        Italic,
        Oblique,
    }
}
declare module eg.Graphics.Assets._ {
    class FontStyleHelper {
        static _styles: {
            [family: number]: string;
        };
        static _Initialize(): void;
        static Get(style: Assets.FontStyle): string;
    }
}
declare module eg.Graphics.Assets {
    /**
    * Defines a set of font settings that are used to modify the appearance of text that is drawn via Text2d's.
    */
    class FontSettings {
        private _cachedState;
        private _cachedFont;
        private _refreshCache;
        /**
        * Creates a new instance of the FontSettings object with the following default values.
        * FontSize: 10px
        * FontFamily: Times New Roman
        */
        constructor();
        /**
        * Gets the current font size.
        */
        public FontSize(): string;
        /**
        * Sets and gets the current font size with the measurement in points.
        * @param size The new font size.
        */
        public FontSize(size: number): string;
        /**
        * Sets and gets the current font size.
        * @param size The new font size.
        * @param measurement The new font sizes measurement type.
        */
        public FontSize(size: number, measurement: Assets.FontMeasurement): string;
        /**
        * Gets the current font family.
        */
        public FontFamily(): string;
        /**
        * Sets and gets the current font family.
        * @param family The new font family.
        */
        public FontFamily(family: Assets.FontFamily): string;
        /**
        * Gets the current font variant.
        */
        public FontVariant(): string;
        /**
        * Sets and gets the current font variant.
        * @param variant The new font variant.
        */
        public FontVariant(variant: Assets.FontVariant): string;
        /**
        * Gets the current font weight.
        */
        public FontWeight(): string;
        /**
        * Sets and gets the current font weight.
        * @param weight The new font weight.
        */
        public FontWeight(weight: string): string;
        /**
        * Gets the current font style.
        */
        public FontStyle(): string;
        /**
        * Sets and gets the current font style.
        * @param style The new font style.
        */
        public FontStyle(style: Assets.FontStyle): string;
        public _BuildFont(): string;
        private GetOrSetCache(property, value);
    }
}
declare module eg.Graphics {
    /**
    * Defines a drawable text element.
    */
    class Text2d extends Graphics.Abstractions.Graphic2d {
        public _type: string;
        private _fontSettings;
        private _text;
        private _stroker;
        private _recalculateBoundsSize;
        private _drawBounds;
        /**
        * Creates a new instance of the Text2d object.
        * @param x Initial horizontal location of the Text2d.
        * @param y Initial vertical location of the Text2d.
        * @param text Initial text of the Text2d.
        */
        constructor(x: number, y: number, text: string);
        /**
        * Creates a new instance of the Text2d object with a specified color.
        * @param x Initial horizontal location of the Text2d.
        * @param y Initial vertical location of the Text2d.
        * @param text Initial text of the Text2d.
        * @param color Initial color of the Text2d.
        */
        constructor(x: number, y: number, text: string, color: string);
        /**
        * Gets the text alignment of the Text2d.
        */
        public Align(): string;
        /**
        * Gets and sets the text alignment of the Text2d.
        * @param alignment The new textual alignment for the Text2d.  Values are "start", "end", "left", "center", or "right".
        */
        public Align(alignment: string): string;
        /**
        * Gets the text baseline of the Text2d.
        */
        public Baseline(): string;
        /**
        * Gets and sets the text baseline of the Text2d.
        * @param baseline The new textual baseline for the Text2d.  Values are "top", "hanging", "middle", "alphabetic", "ideographic", and "bottom".
        */
        public Baseline(baseline: string): string;
        /**
        * Gets the current text color.
        */
        public Color(): string;
        /**
        * Gets and sets the current text color.
        * @param color The new color.  Can be valid color strings, like "red" or "rgb(255,0,0)".
        */
        public Color(color: string): string;
        /**
        * Sets the current shadow x and y positions.
        * @param x The shadows new horizontal position.
        * @param y The shadows new vertical position.
        */
        public Shadow(x: number, y: number): void;
        /**
        * Sets the current shadow x and y positions and shadows color.
        * @param x The shadows new horizontal position.
        * @param y The shadows new vertical position.
        * @param color The new shadow color.  Can be valid color strings, like "red" or "rgb(255,0,0)".
        */
        public Shadow(x: number, y: number, color: string): void;
        /**
        * Sets the current shadow x and y positions and shadows color.
        * @param x The shadows new horizontal position.
        * @param y The shadows new vertical position.
        * @param color The new shadow color.  Can be valid color strings, like "red" or "rgb(255,0,0)".
        * @param blur The new shadow blur.
        */
        public Shadow(x: number, y: number, color: string, blur: number): void;
        /**
        * Gets the current shadow color.
        */
        public ShadowColor(): string;
        /**
        * Sets and gets the current shadow color.
        * @param color The new shadow color.  Can be valid color strings, like "red" or "rgb(255,0,0)".
        */
        public ShadowColor(color: string): string;
        /**
        * Gets the current horizontal shadow position.
        */
        public ShadowX(): number;
        /**
        * Sets and gets the current horizontal shadow position.
        * @param x The shadows new horizontal position.
        */
        public ShadowX(x: number): number;
        /**
        * Gets the current vertical shadow position.
        */
        public ShadowY(): number;
        /**
        * Sets and gets the current vertical shadow position.
        * @param y The shadows new vertical position.
        */
        public ShadowY(y: number): number;
        /**
        * Gets the current shadow blur.
        */
        public ShadowBlur(): number;
        /**
        * Sets and gets the current shadow blur.
        * @param blur The shadows new blur.
        */
        public ShadowBlur(blur: number): number;
        /**
        * Gets the current opacity.  Value is between 0 and 1.
        */
        public Opacity(): number;
        /**
        * Sets and gets the current opacity.
        * @param alpha New opacity, value is between 0 and 1.
        */
        public Opacity(alpha: number): number;
        /**
        * Gets the Text2d's FontSetting's.
        */
        public FontSettings(): Graphics.Assets.FontSettings;
        /**
        * Gets the current Text2d's text.
        */
        public Text(): string;
        /**
        * Sets and gets the current Text2d's text.
        * @param text The new text.
        */
        public Text(text: string): string;
        /**
        * Sets the current borders thickness and color.
        * @param thickness The new border thickness in pixels.
        * @param color The new border color.  Can be valid color strings, like "red" or "rgb(255,0,0)".
        */
        public Border(thickness: number, color: string): void;
        /**
        * Gets the current border thickness.
        */
        public BorderThickness(): number;
        /**
        * Sets and gets the current border thickness.
        * @param thickness The new border thickness in pixels.
        */
        public BorderThickness(thickness: number): number;
        /**
        * Gets the current border color.
        */
        public BorderColor(): string;
        /**
        * Sets and gets the current border color.
        * @param color The new border color.  Can be valid color strings, like "red" or "rgb(255,0,0)".
        */
        public BorderColor(color: string): string;
        /**
        * Draws the text onto the given context.  If this Text2d is part of a scene the Draw function will be called automatically.
        * @param context The canvas context to draw the text onto.
        */
        public Draw(context: CanvasRenderingContext2D): void;
        /**
        * The bounding area that represents where the Text2d will draw.
        */
        public GetDrawBounds(): eg.Bounds.Abstractions.Bounds2d;
    }
}
declare module eg.Graphics.Assets {
    /**
    * Defines an image resource that can be used within Sprite's, SpriteAnimation's and other drawable graphics.
    */
    class ImageSource {
        /**
        * Gets or sets the ClipLocation.  Represents where the image clip is within the base image.
        */
        public ClipLocation: eg.Vector2d;
        /**
        * Gets or sets the ClipSize.  Represents how large the image clip is within the base image.
        */
        public ClipSize: eg.Size2d;
        /**
        * Gets the base image source.  Should not be modified once the ImageSource has been constructed
        */
        public Source: HTMLImageElement;
        private _size;
        private _loaded;
        private _imageLocation;
        /**
        * Creates a new instance of the ImageSource object.
        * @param imageLocation Image source url (this cannot change after construction).
        */
        constructor(imageLocation: string);
        /**
        * Creates a new instance of the ImageSource object with a specified width and height.  ClipSize defaults to the full size and the ClipLocation defaults to (0,0). If width and height are not equal to the actual width and height of the image source the image will be stretched
        * @param imageLocation Image source url (this cannot change after construction).
        * @param width The width of the base image (this cannot change after construction).
        * @param height The height of the base image (this cannot change after construction).
        */
        constructor(imageLocation: string, width: number, height: number);
        /**
        * Creates a new instance of the ImageSource object with a specified width and height and a clip location.  If width and height are smaller than the actual width and height of the image source the image will be stretched
        * @param imageLocation Image source url (this cannot change after construction).
        * @param width The width of the base image (this cannot change after construction).
        * @param height The height of the base image (this cannot change after construction).
        * @param clipX The horizontal location of the clip.
        * @param clipY The vertical location of the clip.
        * @param clipWidth The width of the clip.  Ultimately this width is the width that is drawn to the screen.
        * @param clipHeight The height of the clip.  Ultimately this height is the height that is drawn to the screen.
        */
        constructor(imageLocation: string, width: number, height: number, clipX: number, clipY: number, clipWidth: number, clipHeight: number);
        /**
        * Event: Triggered when the base image is finished loading.  Functions can be bound or unbound to this event to be executed when the event triggers.
        * Passes the ImageSource to the bound functions.
        */
        public OnLoaded: eg.EventHandler1<eg.Graphics.Assets.ImageSource>;
        /**
        * Returns the base Size of the image source.
        */
        public Size(): eg.Size2d;
        /**
        * Determines if the ImageSource has been loaded.
        */
        public Loaded(): boolean;
        /**
        * Returns an ImageSource that is extracted from the current ImageSource based on the provided clip location and clip size.
        * @param clipX The horizontal location of the clip.
        * @param clipY The vertical location of the clip.
        * @param clipWidth The width of the clip.
        * @param clipHeight The height of the clip.
        */
        public Extract(clipX: number, clipY: number, clipWidth: number, clipHeight: number): ImageSource;
    }
}
declare module eg.Graphics {
    /**
    * Defines a drawable sprite.  Sprites are used to draw images to the game screen.
    */
    class Sprite2d extends Graphics.Abstractions.Graphic2d {
        public _type: string;
        /**
        * Gets or sets the Image that is drawn to the game screen.
        */
        public Image: Graphics.Assets.ImageSource;
        /**
        * Gets or sets the size of the Sprite2d.  If the Size is not equal to the image's ClipSize the Sprite2d will appear stretched.
        */
        public Size: eg.Size2d;
        /**
        * Creates a new instance of the Sprite2d object with an initial size matching the image's clip size.
        * @param x Initial horizontal location of the Sprite2d.
        * @param y Initial vertical location of the Sprite2d.
        * @param image Initial ImageSource of the Sprite2d.
        */
        constructor(x: number, y: number, image: Graphics.Assets.ImageSource);
        /**
        * Creates a new instance of the Sprite2d object.
        * @param x Initial horizontal location of the Sprite2d.
        * @param y Initial vertical location of the Sprite2d.
        * @param image Initial ImageSource of the Sprite2d.
        * @param width Initial width of the Sprite2d.  If the width does not equal the width of the image's clip width the Sprite2d will appear stretched.
        * @param height Initial height of the Sprite2d.  If the height does not equal the height of the image's clip height the Sprite2d will appear stretched.
        */
        constructor(x: number, y: number, image: Graphics.Assets.ImageSource, width: number, height: number);
        /**
        * Gets the current opacity.  Value is between 0 and 1.
        */
        public Opacity(): number;
        /**
        * Sets and gets the current opacity.
        * @param alpha New opacity, value is between 0 and 1.
        */
        public Opacity(alpha: number): number;
        /**
        * Draws the sprite onto the given context.  If this sprite is part of a scene the Draw function will be called automatically.
        * @param context The canvas context to draw the sprite onto.
        */
        public Draw(context: CanvasRenderingContext2D): void;
        /**
        * The bounding area that represents where the Sprite2d will draw.
        */
        public GetDrawBounds(): eg.Bounds.Abstractions.Bounds2d;
    }
}
declare module eg.Graphics {
    /**
    * Defines an animation that can be drawn to the screen.
    */
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
        /**
        * Creates a new instance of the SpriteAnimation object.
        * @param imageSource The Sprite sheet that contains the image frames used to display the animation.
        * @param fps How fast to play the animation (frames per second).  This value should not be less than the games update interval.
        * @param frameSize How large each animation frame is within the imageSource sprite sheet.
        * @param frameCount How many frames to play for the animation.
        */
        constructor(imageSource: Graphics.Assets.ImageSource, fps: number, frameSize: eg.Size2d, frameCount: number);
        /**
        * Creates a new instance of the SpriteAnimation object.
        * @param imageSource The Sprite sheet that contains the image frames used to display the animation.
        * @param fps How fast to play the animation (frames per second).  This value should not be less than the games update interval.
        * @param frameSize How large each animation frame is within the imageSource sprite sheet.
        * @param frameCount How many frames to play for the animation.
        * @param startOffset The positional offset within the imageSource on where the set of animation frames begin.
        */
        constructor(imageSource: Graphics.Assets.ImageSource, fps: number, frameSize: eg.Size2d, frameCount: number, startOffset?: eg.Vector2d);
        /**
        * Event: Triggered when the animation has completed, will not trigger if the animation is repeating.  Functions can be bound or unbound to this event to be executed when the event triggers.
        */
        public OnComplete: eg.EventHandler;
        /**
        * Determines if the animation is currently playing.
        */
        public IsPlaying(): boolean;
        /**
        * Plays the animation.
        */
        public Play(): void;
        /**
        * Plays the animation.
        * @param repeat Whether to play the animation on repeat.
        */
        public Play(repeat: boolean): void;
        /**
        * Pauses the animation.
        */
        public Pause(): void;
        /**
        * Steps the animation 1 frame forward.  If not repeating and the animation surpasses the maximum frame count, the animation will stop and the OnComplete event will trigger.
        */
        public Step(): void;
        /**
        * Steps the animation 1 frame forward.  If not repeating and the animation surpasses the maximum frame count, the animation will stop and the OnComplete event will trigger.
        * @param count How many frames to move forward
        */
        public Step(count: number): void;
        /**
        * Stops the animation and resets the current animation frame to 0.
        */
        public Stop(): void;
        /**
        * Stops the animation.
        * @param resetFrame Whether to reset the current animation frame to 0.
        */
        public Stop(resetFrame: boolean): void;
        /**
        * Resets the current animation frame to 0.
        */
        public Reset(): void;
        /**
        * Gets the current frames per second.
        */
        public Fps(): number;
        /**
        * Sets and gets the current frames per second.
        */
        public Fps(newFps: number): number;
        /**
        * Updates the animations current frame.  Needs to be updated in order to play the animation.
        * @param gameTime The current game time object.
        */
        public Update(gameTime: eg.GameTime): void;
        private UpdateImageSource();
        private GetFrameRow();
        private GetFrameColumn();
    }
}
declare module eg.Graphics.Abstractions {
    /**
    * Abstract drawable shape type that is used create customizable drawable graphics.
    */
    class Shape extends Abstractions.Graphic2d {
        public _type: string;
        private _fill;
        private _stroke;
        /**
        * Should only ever be called by derived classes.
        * @param position Initial Position of the current shape object.
        */
        constructor(position: eg.Vector2d);
        /**
        * Should only ever be called by derived classes.
        * @param position Initial Position of the current shape object.
        * @param color Initial Color of the current shape object.
        */
        constructor(position: eg.Vector2d, color: string);
        /**
        * Gets the current shape color.
        */
        public Color(): string;
        /**
        * Gets and sets the current shape color.
        * @param color The new color.  Can be valid color strings, like "red" or "rgb(255,0,0)".
        */
        public Color(color: string): string;
        /**
        * Sets the current borders thickness and color.
        * @param thickness The new border thickness in pixels.
        * @param color The new border color.  Can be valid color strings, like "red" or "rgb(255,0,0)".
        */
        public Border(thickness: number, color: string): void;
        /**
        * Gets the current border thickness.
        */
        public BorderThickness(): number;
        /**
        * Sets and gets the current border thickness.
        * @param thickness The new border thickness in pixels.
        */
        public BorderThickness(thickness: number): number;
        /**
        * Gets the current border color.
        */
        public BorderColor(): string;
        /**
        * Sets and gets the current border color.
        * @param color The new border color.  Can be valid color strings, like "red" or "rgb(255,0,0)".
        */
        public BorderColor(color: string): string;
        /**
        * Sets the current shadow x and y positions.
        * @param x The shadows new horizontal position.
        * @param y The shadows new vertical position.
        */
        public Shadow(x: number, y: number): void;
        /**
        * Sets the current shadow x and y positions and shadows color.
        * @param x The shadows new horizontal position.
        * @param y The shadows new vertical position.
        * @param color The new shadow color.  Can be valid color strings, like "red" or "rgb(255,0,0)".
        */
        public Shadow(x: number, y: number, color: string): void;
        /**
        * Sets the current shadow x and y positions and shadows color.
        * @param x The shadows new horizontal position.
        * @param y The shadows new vertical position.
        * @param color The new shadow color.  Can be valid color strings, like "red" or "rgb(255,0,0)".
        * @param blur The new shadow blur.
        */
        public Shadow(x: number, y: number, color: string, blur: number): void;
        /**
        * Gets the current shadow color.
        */
        public ShadowColor(): string;
        /**
        * Sets and gets the current shadow color.
        * @param color The new shadow color.  Can be valid color strings, like "red" or "rgb(255,0,0)".
        */
        public ShadowColor(color: string): string;
        /**
        * Gets the current horizontal shadow position.
        */
        public ShadowX(): number;
        /**
        * Sets and gets the current horizontal shadow position.
        * @param x The shadows new horizontal position.
        */
        public ShadowX(x: number): number;
        /**
        * Gets the current vertical shadow position.
        */
        public ShadowY(): number;
        /**
        * Sets and gets the current vertical shadow position.
        * @param y The shadows new vertical position.
        */
        public ShadowY(y: number): number;
        /**
        * Gets the current shadow blur.
        */
        public ShadowBlur(): number;
        /**
        * Sets and gets the current shadow blur.
        * @param blur The shadows new blur.
        */
        public ShadowBlur(blur: number): number;
        /**
        * Gets the current opacity.  Value is between 0 and 1.
        */
        public Opacity(): number;
        /**
        * Sets and gets the current opacity.
        * @param alpha New opacity, value is between 0 and 1.
        */
        public Opacity(alpha: number): number;
        public _StartDraw(context: CanvasRenderingContext2D): void;
        public _EndDraw(context: CanvasRenderingContext2D): void;
        public _BuildPath(context: CanvasRenderingContext2D): void;
        /**
        * Draws the shape onto the given context.  If this shape is part of a scene the Draw function will be called automatically.
        * @param context The canvas context to draw the shape onto.
        */
        public Draw(context: CanvasRenderingContext2D): void;
    }
}
declare module eg.Graphics {
    /**
    * Defines a drawable circle.
    */
    class Circle extends Graphics.Abstractions.Shape {
        public _type: string;
        /**
        * Gets or sets the Radius of the Circle.
        */
        public Radius: number;
        /**
        * Creates a new instance of the Circle object.
        * @param x Initial horizontal location of the Circle.
        * @param y Initial vertical location of the Circle.
        * @param radius Initial Radius of the Circle.
        */
        constructor(x: number, y: number, radius: number);
        /**
        * Creates a new instance of the Circle object with a specified color.
        * @param x Initial horizontal location of the Circle.
        * @param y Initial vertical location of the Circle.
        * @param radius Initial Radius of the Circle.
        * @param color Initial color of the Circle.
        */
        constructor(x: number, y: number, radius: number, color: string);
        /**
        * The bounding area that represents where the Circle will draw.
        */
        public GetDrawBounds(): eg.Bounds.Abstractions.Bounds2d;
        public _BuildPath(context: CanvasRenderingContext2D): void;
    }
}
declare module eg.Graphics {
    /**
    * Defines a drawable rectangle.
    */
    class Rectangle extends Graphics.Abstractions.Shape {
        public _type: string;
        /**
        * Gets or sets the Size of the Rectangle.
        */
        public Size: eg.Size2d;
        /**
        * Creates a new instance of the Rectangle object.
        * @param x Initial horizontal location of the Rectangle.
        * @param y Initial vertical location of the Rectangle.
        * @param width Initial width of the Rectangle.
        * @param height Initial height of the Rectangle.
        */
        constructor(x: number, y: number, width: number, height: number);
        /**
        * Creates a new instance of the Rectangle object with a specified color.
        * @param x Initial horizontal location of the Rectangle.
        * @param y Initial vertical location of the Rectangle.
        * @param width Initial width of the Rectangle.
        * @param height Initial height of the Rectangle.
        * @param color Initial color of the Rectangle.
        */
        constructor(x: number, y: number, width: number, height: number, color: string);
        /**
        * The bounding area that represents where the Rectangle will draw.
        */
        public GetDrawBounds(): eg.Bounds.Abstractions.Bounds2d;
        public _BuildPath(context: CanvasRenderingContext2D): void;
    }
}
declare module eg.Graphics {
    class Line2d extends Graphics.Abstractions.Graphic2d {
        public _type: string;
        private _from;
        private _to;
        private _difference;
        private _boundsWidth;
        private _cachedPosition;
        /**
        * Creates a new instance of the Line2d object with a line width of 1.
        * @param fromX Starting horizontal coordinate.
        * @param fromY Starting vertical coordinate.
        * @param toX Ending horizontal coordinate.
        * @param toY Ending vertical coordinate.
        */
        constructor(fromX: number, fromY: number, toX: number, toY: number);
        /**
        * Creates a new instance of the Line2d object with a specified line width.
        * @param fromX Starting horizontal coordinate.
        * @param fromY Starting vertical coordinate.
        * @param toX Ending horizontal coordinate.
        * @param toY Ending vertical coordinate.
        * @param lineWidth Initial thickness of the line.
        */
        constructor(fromX: number, fromY: number, toX: number, toY: number, lineWidth: number);
        /**
        * Creates a new instance of the Line2d object with a specified line width and color.
        * @param fromX Starting horizontal coordinate.
        * @param fromY Starting vertical coordinate.
        * @param toX Ending horizontal coordinate.
        * @param toY Ending vertical coordinate.
        * @param lineWidth Initial thickness of the line.
        * @param color Initial color of the line.
        */
        constructor(fromX: number, fromY: number, toX: number, toY: number, lineWidth: number, color: string);
        /**
        * Gets the From location of the Line2d.
        */
        public From(): eg.Vector2d;
        /**
        * Sets and gets the new From location of the Line2d.
        * @param newPosition New From location.
        */
        public From(newPosition: eg.Vector2d): eg.Vector2d;
        /**
        * Gets the To location of the Line2d.
        */
        public To(): eg.Vector2d;
        /**
        * Sets and gets the new To location of the Line2d.
        * @param newPosition New To location.
        */
        public To(newPosition: eg.Vector2d): eg.Vector2d;
        /**
        * Gets the current line color.
        */
        public Color(): string;
        /**
        * Gets and sets the current line color.
        * @param color The new color.  Can be valid color strings, like "red" or "rgb(255,0,0)".
        */
        public Color(color: string): string;
        /**
        * Gets the current line width.
        */
        public LineWidth(): number;
        /**
        * Gets and sets the current line width.
        * @param width The new line width.
        */
        public LineWidth(width: number): number;
        /**
        * Gets the current line cap.
        */
        public LineCap(): string;
        /**
        * Gets and sets the current line cap.
        * @param width The new line cap.  Values can be "butt", "round", "square".
        */
        public LineCap(cap: string): string;
        /**
        * Draws the line onto the given context.  If this Line2d is part of a scene the Draw function will be called automatically.
        * @param context The canvas context to draw the line onto.
        */
        public Draw(context: CanvasRenderingContext2D): void;
        /**
        * The bounding area that represents where the Line2d will draw.
        */
        public GetDrawBounds(): eg.Bounds.Abstractions.Bounds2d;
        private UpdatePosition();
        private RefreshCache();
        private GetOrSetLinePoint(name, newPosition?);
    }
}
declare module eg.Graphics {
    /**
    * Defines a drawable grid that can be used to store other graphics in a grid like structure.
    */
    class Grid extends Graphics.Abstractions.Graphic2d {
        public _type: string;
        /**
        * Gets or sets the DrawGridLines property.  Indicates whether the grids column and row lines will be drawn.
        */
        public DrawGridLines: boolean;
        private _size;
        private _tileSize;
        private _grid;
        private _gridLines;
        private _positionOffset;
        private _rows;
        private _columns;
        private _gridLineColor;
        /**
        * Creates a new instance of the Grid object.
        * @param x Initial horizontal location of the grid.
        * @param y Initial vertical location of the grid.
        * @param rows Number of rows the grid will have (this cannot change after construction).
        * @param columns Number of columns the grid will have (this cannot change after construction).
        * @param tileWidth The width of the grid tiles (this cannot change after construction).
        * @param tileHeight The height of the grid tiles (this cannot change after construction).
        */
        constructor(x: number, y: number, rows: number, columns: number, tileWidth: number, tileHeight: number);
        /**
        * Creates a new instance of the Grid object.
        * @param x Initial horizontal location of the grid.
        * @param y Initial vertical location of the grid.
        * @param rows Number of rows the grid will have (this cannot change after construction).
        * @param columns Number of columns the grid will have (this cannot change after construction).
        * @param tileWidth The width of the grid tiles (this cannot change after construction).
        * @param tileHeight The height of the grid tiles (this cannot change after construction).
        * @param drawGridLines Initial value for DrawGridLines.
        */
        constructor(x: number, y: number, rows: number, columns: number, tileWidth: number, tileHeight: number, drawGridLines: boolean);
        /**
        * Creates a new instance of the Grid object.
        * @param x Initial horizontal location of the grid.
        * @param y Initial vertical location of the grid.
        * @param rows Number of rows the grid will have (this cannot change after construction).
        * @param columns Number of columns the grid will have (this cannot change after construction).
        * @param tileWidth The width of the grid tiles (this cannot change after construction).
        * @param tileHeight The height of the grid tiles (this cannot change after construction).
        * @param drawGridLines Initial value for DrawGridLines.
        * @param gridLineColor Initial grid line color (only useful if drawGridLines is true);
        */
        constructor(x: number, y: number, rows: number, columns: number, tileWidth: number, tileHeight: number, drawGridLines: boolean, gridLineColor: string);
        /**
        * Gets the current grid line color.  Grid lines are only drawn of DrawGridLines is set to true.
        */
        public GridLineColor(): string;
        /**
        * Gets and sets the current grid line color.  Grid lines are only drawn of DrawGridLines is set to true.
        * @param color The new grid line color.  Can be valid color strings, like "red" or "rgb(255,0,0)".
        */
        public GridLineColor(color: string): string;
        /**
        * Gets the size of the grid.
        */
        public Size(): eg.Size2d;
        /**
        * Gets the size of the tiles.
        */
        public TileSize(): eg.Size2d;
        /**
        * Gets the number of rows
        */
        public Rows(): number;
        /**
        * Gets the number of columns
        */
        public Columns(): number;
        /**
        * Gets the current opacity.  Value is between 0 and 1.
        */
        public Opacity(): number;
        /**
        * Sets and gets the current opacity.
        * @param alpha New opacity, value is between 0 and 1.
        */
        public Opacity(alpha: number): number;
        /**
        * Fills a tile with the provided graphic.
        * @param row The row.
        * @param column The column.
        * @param graphic The graphic to fill the tile with.
        */
        public Fill(row: number, column: number, graphic: Graphics.Abstractions.Graphic2d): void;
        /**
        * Fills a row with the provided graphics
        * @param row The row to fill.
        * @param graphicList The list of graphics to fill the row with.  The row will be filled with as many elements that are contained within the graphicList.
        */
        public FillRow(row: number, graphicList: Graphics.Abstractions.Graphic2d[]): void;
        /**
        * Fills a row with the provided graphics starting at the provided column
        * @param row The row to fill.
        * @param graphicList The list of graphics to fill the row with.  The row will be filled with as many elements that are contained within the graphicList.
        * @param columnOffset The column to start filling at.
        */
        public FillRow(row: number, graphicList: Graphics.Abstractions.Graphic2d[], columnOffset: number): void;
        /**
        * Fills a column with the provided graphics
        * @param column The column to fill.
        * @param graphicList The list of graphics to fill the column with.  The column will be filled with as many elements that are contained within the graphicList.
        */
        public FillColumn(column: number, graphicList: Graphics.Abstractions.Graphic2d[]): void;
        /**
        * Fills a column with the provided graphics starting at the provided row.
        * @param column The column to fill.
        * @param graphicList The list of graphics to fill the column with.  The column will be filled with as many elements that are contained within the graphicList.
        * @param rowOffset The row to start filling at.
        */
        public FillColumn(column: number, graphicList: Graphics.Abstractions.Graphic2d[], rowOffset: number): void;
        /**
        * Fills a tile with the provided graphic.
        * @param row The row to start filling at.
        * @param column The column to start filling at.
        * @param graphicList The list of graphics to fill the space with.  The space will be filled with as many elements that are contained within the multi-dimensional graphicList.
        */
        public FillSpace(row: number, column: number, graphicList: Graphics.Abstractions.Graphic2d[][]): void;
        /**
        * Gets a graphic within the grid.
        * @param row The row.
        * @param column The column.
        */
        public Get(row: number, column: number): Graphics.Abstractions.Graphic2d;
        /**
        * Retrieves graphics within the provided row.
        * @param row The row to retrieve.
        */
        public GetRow(row: number): Graphics.Abstractions.Graphic2d[];
        /**
        * Retrieves graphics within the row starting at the provided column offset.
        * @param row The row to retrieve.
        * @param columnOffset The column to start retrieving the row at.
        */
        public GetRow(row: number, columnOffset: number): Graphics.Abstractions.Graphic2d[];
        /**
        * Retrieves graphics within the provided column.
        * @param column The column to retrieve.
        */
        public GetColumn(column: number): Graphics.Abstractions.Graphic2d[];
        /**
        * Retrieves graphics within the column starting at the provided row offset.
        * @param column The column to retrieve.
        * @param rowOffset The row to start retrieving the column at.
        */
        public GetColumn(column: number, rowOffset: number): Graphics.Abstractions.Graphic2d[];
        /**
        * Retrieves graphics within row column cross section.
        * @param rowStart The row to start pulling graphics from.
        * @param columnStart The column to start pulling graphics from.
        * @param rowEnd The row to stop pulling graphics from.
        * @param columnEnd The column to stop pulling graphics from.
        */
        public GetSpace(rowStart: number, columnStart: number, rowEnd: number, columnEnd: number): Graphics.Abstractions.Graphic2d[];
        /**
        * Clear a grid tile.
        * @param row The row.
        * @param column The column.
        */
        public Clear(row: number, column: number): Graphics.Abstractions.Graphic2d;
        /**
        * Clears graphics within the provided row.
        * @param row The row to clear.
        */
        public ClearRow(row: number): Graphics.Abstractions.Graphic2d[];
        /**
        * Clears graphics within the row starting at the provided column offset.
        * @param row The row to clear.
        * @param columnOffset The column to start clearing the row at.
        */
        public ClearRow(row: number, columnOffset: number): Graphics.Abstractions.Graphic2d[];
        /**
        * Clears graphics within the provided column.
        * @param column The column to clear.
        */
        public ClearColumn(column: number): Graphics.Abstractions.Graphic2d[];
        /**
        * Clears graphics within the column starting at the provided column offset.
        * @param column The column to clear.
        * @param rowOffset The row to start clearing the column at.
        */
        public ClearColumn(column: number, rowOffset: number): Graphics.Abstractions.Graphic2d[];
        /**
        * Clears graphics within row column cross section.
        * @param rowStart The row to start clearing graphics from.
        * @param columnStart The column to start clearing graphics from.
        * @param rowEnd The row to stop clearing graphics from.
        * @param columnEnd The column to stop clearing graphics from.
        */
        public ClearSpace(rowStart: number, columnStart: number, rowEnd: number, columnEnd: number): Graphics.Abstractions.Graphic2d[];
        /**
        * Draws the grid onto the given context.  If this grid is part of a scene the Draw function will be called automatically.
        * @param context The canvas context to draw the grid onto.
        */
        public Draw(context: CanvasRenderingContext2D): void;
        /**
        * The bounding area that represents where the grid will draw.
        */
        public GetDrawBounds(): eg.Bounds.Abstractions.Bounds2d;
        /**
        * Converts the provided vertical coordinate to a row number that is based on the current grid.
        * @param y The vertical coordinate to convert to a row.
        */
        public ConvertToRow(y: number): number;
        /**
        * Converts the provided horizontal coordinate to a column number that is based on the current grid.
        * @param x The horizontal component to convert to a column.
        */
        public ConvertToColumn(x: number): number;
        private GetInsideGridPosition(row, column);
        private ValidRow(row);
        private ValidColumn(column);
    }
}
declare module eg {
    /**
    * Defines a matrix with 2 columns and 2 rows (2x2).
    */
    class Matrix2x2 implements eg._.ITyped {
        public _type: string;
        /**
        * Gets or sets the matrix values.  Represents the current Matrix2x2 as a multi-dimensional array.
        */
        public Values: number[][];
        /**
        * Creates a new instance of Matrix2x2 with all rows and columns initialized to 0.
        */
        constructor();
        /**
        * Creates a new instance of Matrix2x2.
        * @param topLeft The row 0 column 0 initial value.
        * @param topRight The row 0 column 1 initial value.
        * @param botLeft The row 1 column 0 initial value.
        * @param botRight The row 1 column 1 initial value.
        */
        constructor(topLeft: number, topRight: number, botLeft: number, botRight: number);
        /**
        * Executes the action with each row and column item of this Matrix2x2 and modifies their values.
        * @param action The function used to modify each row and column items.
        */
        public Apply(action: (val: number) => number): void;
        /**
        * Executes the action with each row and column item of this Matrix2x2.
        * @param action The function to pass the row column item to.
        */
        public Trigger(action: (val: number) => void): void;
        /**
        * Returns a Matrix2x2 that is the result of adding the current Matrix2x2 to the provided Matrix2x2.
        * @param val The Matrix2x2 to add.
        */
        public Add(val: Matrix2x2): Matrix2x2;
        /**
        * Returns a Matrix2x2 that is the result of adding the current Matrix2x2 to the provided number.
        * @param val The number to add.
        */
        public Add(val: number): Matrix2x2;
        /**
        * Returns a Matrix2x2 that is the result of multiplying the current Matrix2x2 by the provided Matrix2x2.
        * @param val The Matrix2x2 to multiply.
        */
        public Multiply(val: Matrix2x2): Matrix2x2;
        /**
        * Returns a Matrix2x2 that is the result of multiplying the current Matrix2x2 by the provided number.
        * @param val The number to multiply.
        */
        public Multiply(val: number): Matrix2x2;
        /**
        * Returns a Matrix2x2 that is the result of subtracting the current Matrix2x2 by the provided Matrix2x2.
        * @param val The Matrix2x2 to subtract.
        */
        public Subtract(val: Matrix2x2): Matrix2x2;
        /**
        * Returns a Matrix2x2 that is the result of subtracting the current Matrix2x2 by the provided number.
        * @param val The number to subtract.
        */
        public Subtract(val: number): Matrix2x2;
        /**
        * Returns a Matrix2x2 that is the result of subtracting the current Matrix2x2 from the provided Matrix2x2.
        * @param val The Matrix2x2 to subtract from.
        */
        public SubtractFrom(val: Matrix2x2): Matrix2x2;
        /**
        * Returns a Matrix2x2 that is the result of subtracting the current Matrix2x2 from the provided number.
        * @param val The number to subtract from.
        */
        public SubtractFrom(val: number): Matrix2x2;
        /**
        * Returns a Matrix2x2 that is the result of dividing the current Matrix2x2 by the provided Matrix2x2.
        * @param val The Matrix2x2 to divide.
        */
        public Divide(val: Matrix2x2): Matrix2x2;
        /**
        * Returns a Matrix2x2 that is the result of dividing the current Matrix2x2 by the provided number.
        * @param val The number to divide.
        */
        public Divide(val: number): Matrix2x2;
        /**
        * Returns a Matrix2x2 that is the result of dividing the current Matrix2x2 from the provided Matrix2x2.
        * @param val The Matrix2x2 to divide from.
        */
        public DivideFrom(val: Matrix2x2): Matrix2x2;
        /**
        * Returns a Matrix2x2 that is the result of dividing the current Matrix2x2 from the provided number.
        * @param val The number to divide from.
        */
        public DivideFrom(val: number): Matrix2x2;
        /**
        * Returns a Vector2d that has been transformed by the current Matrix2x2.
        * @param vector The vector to transform.
        */
        public Transform(vector: eg.Vector2d): eg.Vector2d;
        /**
        * Returns the transpose of the current Matrix2x2.
        */
        public Transpose(): Matrix2x2;
        /**
        * Returns the determinant of the current Matrix2x2.
        */
        public Determinant(): number;
        /**
        * Returns the inverse of the current Matrix2x2.
        */
        public Inverse(): Matrix2x2;
        /**
        * Returns a Matrix2x2 that has identical rows and columns as the current Matrix2x2.
        */
        public Clone(): Matrix2x2;
        /**
        * Determines whether this Matrix2x2 has the same row and column values as the provided Matrix2x2.
        * @param matrix The Matrix2x2 to compare the current Matrix2x2 to.
        */
        public Equivalent(matrix: Matrix2x2): boolean;
        /**
        * Overridden toString method to display Matrix2x2 in easy to read format: "[topLeft, topRight] [botLeft, botRight]"
        */
        public toString(): string;
        /**
        * Creates a scaling matrix based off the provided Vector2d.
        * @param vector The vector used to determine the X and Y scaling values.
        */
        static Scale(vector: eg.Vector2d): Matrix2x2;
        /**
        * Creates a Matrix2x2 with all its rows and columns initialized to 0.
        */
        static Zero : Matrix2x2;
        /**
        * Returns the identity matrix for a 2x2.
        */
        static Identity : Matrix2x2;
    }
}
declare module eg.Map {
    /**
    * Defines an abstract class TileMap that takes an array of resources to be mapped to tiles.
    */
    class TileMap extends eg.Graphics.Abstractions.Graphic2d {
        public _Resources: eg.Graphics.Assets.ImageSource[];
        /**
        * Creates a new instance of the TileMap object.
        * @param x Initial horizontal location of the tile map.
        * @param y Initial vertical location of the tile map.
        * @param resources A one dimensional array of image resources that make up the tile map (this cannot change after construction).
        */
        constructor(x: number, y: number, resources: eg.Graphics.Assets.ImageSource[]);
    }
}
declare module eg.Map {
    /**
    * Defines a SquareTile that is used by the SquareTileMap.  Represents one tile within the tile map.
    */
    class SquareTile extends eg.Graphics.Sprite2d {
        /**
        * Creates a new instance of the SquareTile object.
        * @param image The image that is within the tile.
        * @param width The width of the tile.
        * @param height The height of the tile.
        */
        constructor(image: eg.Graphics.Assets.ImageSource, width: number, height: number);
    }
}
declare module eg.Map {
    /**
    * Defines a structure that is proficient at creating diverse tile maps based off of a resource image.  Best drawn via a SceneryHandler.
    */
    class SquareTileMap extends Map.TileMap {
        private _grid;
        private _staticMap;
        private _mapCache;
        /**
        * Creates a new instance of the SquareTileMap object.
        * @param x Initial horizontal location of the tile map.
        * @param y Initial vertical location of the tile map.
        * @param tileWidth The width of the tile map tiles (this cannot change after construction).
        * @param tileHeight The height of the tile map tiles (this cannot change after construction).
        * @param resources A one dimensional array of image resources that make up the tile map (this cannot change after construction).
        * @param mappings A two dimensional array numbers that map directly to the resources array to define the square tile map (this cannot change after construction).
        */
        constructor(x: number, y: number, tileWidth: number, tileHeight: number, resources: eg.Graphics.Assets.ImageSource[], mappings: number[][]);
        /**
        * Creates a new instance of the SquareTileMap object.
        * @param x Initial horizontal location of the tile map.
        * @param y Initial vertical location of the tile map.
        * @param tileWidth The width of the tile map tiles (this cannot change after construction).
        * @param tileHeight The height of the tile map tiles (this cannot change after construction).
        * @param resources A one dimensional array of image resources that make up the tile map (this cannot change after construction).
        * @param mappings A two dimensional array numbers that map directly to the resources array to define the square tile map (this cannot change after construction).
        * @param staticMap Whether or not image tiles will change throughout the SquareTileMap's lifetime, defaults to true and cannot change after construction.
        */
        constructor(x: number, y: number, tileWidth: number, tileHeight: number, resources: eg.Graphics.Assets.ImageSource[], mappings: number[][], staticMap: boolean);
        /**
        * Creates a new instance of the SquareTileMap object.
        * @param x Initial horizontal location of the tile map.
        * @param y Initial vertical location of the tile map.
        * @param tileWidth The width of the tile map tiles (this cannot change after construction).
        * @param tileHeight The height of the tile map tiles (this cannot change after construction).
        * @param resources A one dimensional array of image resources that make up the tile map (this cannot change after construction).
        * @param mappings A two dimensional array numbers that map directly to the resources array to define the square tile map (this cannot change after construction).
        * @param staticMap Whether or not image tiles will change throughout the SquareTileMap's lifetime, defaults to true and cannot change after construction.
        * @param drawGridLines Whether or not to draw the tile maps grid lines. Useful when trying to pinpoint specific tiles (this cannot change after construction).
        */
        constructor(x: number, y: number, tileWidth: number, tileHeight: number, resources: eg.Graphics.Assets.ImageSource[], mappings: number[][], staticMap: boolean, drawGridLines: boolean);
        /**
        * Helper function used to take a SpriteSheet image and create a one dimensional resource tile array.
        * @param imageSource The sprite sheet to extract the tile resources from.
        * @param tileWidth The width of the sprite sheet tiles.
        * @param tileHeight The height of the sprite sheet tiles.
        */
        static ExtractTiles(imageSource: eg.Graphics.Assets.ImageSource, tileWidth: number, tileHeight: number): eg.Graphics.Assets.ImageSource[];
        /**
        * Draws the SquareTileMap onto the given context.  If the SquareTileMap is part of a Scene2d or SceneryHandler the Draw function will be called automatically.
        * @param context The canvas context to draw the SquareTileMap onto.
        */
        public Draw(context: CanvasRenderingContext2D): void;
        /**
        * The bounding area that represents where the SquareTileMap will draw.
        */
        public GetDrawBounds(): eg.Bounds.Abstractions.Bounds2d;
        private BuildCache();
        private FillGridWith(mappings);
    }
}
declare module eg.Tweening {
    class Tween {
        private _playing;
        constructor();
        public Playing : boolean;
    }
}
