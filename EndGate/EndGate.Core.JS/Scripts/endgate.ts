/* IDisposable.ts */
declare module EndGate {

    export interface IDisposable {
        Dispose(): void;
    }

}
/* ITyped.ts */
declare module EndGate._ {

    export interface ITyped {
        _type: string;
    }

}
/* GameTime.ts */


module EndGate {

    export class GameTime implements _.ITyped {
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
/* IUpdateable.ts */


declare module EndGate {

    export interface IUpdateable {
        Update(gameTime: EndGate.GameTime): void;
    }

}
/* Size2d.ts */



module EndGate {

    /**
    * Defines a two dimensional size object which specifies a Width and Height.
    */
    export class Size2d implements _.ITyped {
        public _type: string = "Size2d";

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
        constructor(first: number, second?: number) {
            this.Width = first || 0;
            this.Height = typeof second !== "undefined" ? second : this.Width;
        }

        /**
        * Returns a Size2d with all its components set to zero.
        */
        public static Zero(): Size2d {
            return new Size2d(0, 0);
        }

        /**
        * Returns a Size2d with all its components set to one.
        */
        public static One(): Size2d {
            return new Size2d(1, 1);
        }

        /**
        * Returns the radius that encompasses the two dimensional size of this Size2d.
        */
        public Radius(): number {
            return .5 * Math.sqrt(this.Width * this.Width + this.Height * this.Height);
        }

        /**
        * Returns half of the Width component of this Size2d.
        */
        public HalfWidth(): number {
            return this.Width / 2;
        }

        /**
        * Returns half of the Height component of this Size2d.
        */
        public HalfHeight(): number {
            return this.Height / 2;
        }

        /**
        * Executes the action with the Width and Height of this Size2d and sets the Width and Height to the corresponding return values.
        * @param action The function used to modify the Width and Height.
        */
        public Apply(action: (val: number) => number): void {
            this.Width = action(this.Width);
            this.Height = action(this.Height);
        }

        /**
        * Executes the action with the Width and Height of this Size2d.
        * @param action The function to pass the Width and Height components to.
        */
        public Trigger(action: (val: number) => void ): void {
            action(this.Width);
            action(this.Height);
        }

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

        /**
        * Returns a Size2d that is the negated version of this Size2d.
        */
        public Negate(): Size2d {
            return new Size2d(this.Width * -1, this.Height * -1);
        }

        /**
        * Determines whether this Size2d has the same Width and Height of another Size2d.
        * @param size The Size2d to compare the current Size2d to.
        */
        public Equivalent(size: Size2d): bool {
            return this.Width === size.Width && this.Height === size.Height;
        }

        /**
        * Returns a Size2d that has identical Width's and Height's as the current Size2d.
        */
        public Clone(): Size2d {
            return new Size2d(this.Width, this.Height);
        }

        /**
        * Overridden toString method to display Size2d in the (Width, Height) format.
        */
        public toString(): string {
            return "(" + this.Width + ", " + this.Height + ")";
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




module EndGate {

    /**
    * Defines a two dimensional vector object which specifies an X and Y.
    */
    export class Vector2d implements _.ITyped {
        public _type: string = "Vector2d";

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
        constructor(x?: number, y?: number) {
            this.X = x || 0;
            this.Y = y || 0;
        }

        /**
        * Returns a Vector2d with all its components set to zero.
        */
        public static Zero(): Vector2d {
            return new Vector2d(0, 0);
        }

        /**
        * Returns a Vector2d with all its components set to one.
        */
        public static One(): Vector2d {
            return new Vector2d(1, 1);
        }

        /**
        * Returns a Vector2d that represents the current Vector2d projected onto the provided Vector2d.
        * @param vector Source vector.
        */
        public ProjectOnto(vector: Vector2d): Vector2d {
            return vector.Multiply(this.Dot(vector) / vector.Dot(vector));
        }

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
        public RotateAround(point: Vector2d, angle: number, precision: number = 2) {
            var ca = Math.cos(angle);
            var sa = Math.sin(angle);

            return new Vector2d(
                Math.roundTo(ca * (this.X - point.X) - sa * (this.Y - point.Y) + point.X, precision),
                Math.roundTo(sa * (this.X - point.X) + ca * (this.Y - point.Y) + point.Y, precision)
            );
        }

        /**
        * Executes the action with the X and Y components of this Vector2d and sets the X and Y components to the corresponding return values.
        * @param action The function used to modify the X and Y components.
        */
        public Apply(action: (val: number) => number): void {
            this.X = action(this.X);
            this.Y = action(this.Y);
        }

        /**
        * Executes the action with the X and Y components of this Vector2d.
        * @param action The function to pass the X and Y components to.
        */
        public Trigger(action: (val: number) => void): void {
            action(this.X);
            action(this.Y);
        }

        /**
        * Returns the current vector as a unit vector. The result is a vector one unit in length pointing in the same direction as the original vector.
        */
        public Normalized(): Vector2d {
            var magnitude = this.Magnitude();
            return new Vector2d(this.X / magnitude, this.Y / magnitude);
        }

        /**
        * Calculates the magnitude or length of the vector
        */
        public Magnitude(): number {
            return Math.sqrt(this.X * this.X + this.Y * this.Y);
        }

        /**
        * Calculates the length or magnitude of the vector
        */
        public Length(): number {
            return this.Magnitude();
        }

        /**
        * Calculates dot product.
        * @param vector Source vector.
        */
        public Dot(vector: Vector2d): number {
            return vector.X * this.X + vector.Y * this.Y;
        }

        /**
        * Returns a Vector2d that has the current Vector2d's X and Y components as positive values.
        */
        public Abs(): Vector2d {
            return new Vector2d(Math.abs(this.X), Math.abs(this.Y));
        }

        /**
        * Returns a Vector2d that has its X and Y components converted to -1, 0 or 1 depending on the current Vector2d's component values.
        */
        public Sign(): Vector2d {
            return new Vector2d(this.X / Math.abs(this.X), this.Y / Math.abs(this.Y));
        }

        /**
        * Calculates the distance between the current vector and the provided one.
        */
        public Distance(vector: Vector2d): Vector2d {
            return new Vector2d(Math.abs(vector.X - this.X), Math.abs(vector.Y - this.Y));
        }

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
        public Add(val: any): Vector2d{
            if (val._type === "Vector2d") {
                return new Vector2d(this.X + val.X, this.Y + val.Y);
            }
            else if (val._type === "Size2d") {
                return new Vector2d(this.X + val.Width, this.Y + val.Height);
            }
            else {
                return new Vector2d(this.X + val, this.Y + val);
            }
        }

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
        public Multiply(val: any): Vector2d {
            if (val._type === "Vector2d") {
                return new Vector2d(this.X * val.X, this.Y * val.Y);
            }
            else if (val._type === "Size2d") {
                return new Vector2d(this.X * val.Width, this.Y * val.Height);
            }
            else {
                return new Vector2d(this.X * val, this.Y * val);
            }
        }

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
        public Subtract(val: any): Vector2d {
            if (val._type === "Vector2d") {
                return new Vector2d(this.X - val.X, this.Y - val.Y);
            }
            else if (val._type === "Size2d") {
                return new Vector2d(this.X - val.Width, this.Y - val.Height);
            }
            else {
                return new Vector2d(this.X - val, this.Y - val);
            }
        }

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
        public SubtractFrom(val: any): Vector2d {
            if (val._type === "Vector2d") {
                return new Vector2d(val.X - this.X, val.Y - this.Y);
            }
            else if (val._type === "Size2d") {
                return new Vector2d(val.Width - this.X, val.Height = this.Y);
            }
            else {
                return new Vector2d(val - this.X, val - this.Y);
            }
        }

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
        public Divide(val: any): Vector2d {
            if (val._type === "Vector2d") {
                return new Vector2d(this.X / val.X, this.Y / val.Y);
            }
            else if (val._type === "Size2d") {
                return new Vector2d(this.X / val.Width, this.Y / val.Height);
            }
            else {
                return new Vector2d(this.X / val, this.Y / val);
            }
        }

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
        public DivideFrom(val: any): Vector2d {
            if (val._type === "Vector2d") {
                return new Vector2d(val.X / this.X, val.Y / this.Y);
            }
            else if (val._type === "Size2d") {
                return new Vector2d(val.Width / this.X, val.Height / this.Y);
            }
            else {
                return new Vector2d(val / this.X, val / this.Y);
            }
        }

        /**
        * Determines whether this Vector2d's X and Y components are zero.
        */
        public IsZero(): bool {
            return this.X === 0 && this.Y === 0;
        }

        /**
        * Returns a Vector2d that is the negated version of this Vector2d.
        */
        public Negate(): Vector2d {
            return new Vector2d(this.X * -1, this.Y * -1);
        }

        /**
        * Determines whether this Vector2d has the same X and Y of the provided Vector2d.
        * @param vector The Vector2d to compare the current Vector2d to.
        */
        public Equivalent(vector: Vector2d): bool {
            return this.X === vector.X && this.Y === vector.Y;
        }

        /**
        * Returns a Vector2d that has an identical X and Y component as the current Vector2d.
        */
        public Clone(): Vector2d {
            return new Vector2d(this.X, this.Y);
        }

        /**
        * Overridden toString method to display Vector2d in the (X, Y) format.
        */
        public toString(): string {
            return "(" + this.X + ", " + this.Y + ")";
        }
    }
}
/* IMoveable.ts */


declare module EndGate {

    export interface IMoveable {
        Position: Vector2d;
        Rotation: number;
    }

}
/* Bounds2d.ts */





module EndGate.Bounds.Abstractions {

    /**
    * Abstract bounds type that is used to detect intersections.
    */
    export class Bounds2d implements IMoveable {
        public _boundsType: string = "Bounds2d";

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
        constructor(position: Vector2d, rotation?: number) {
            this.Position = position;
            this.Rotation = rotation || 0;
        }

        /**
        * Abstract: Scales the size of the bounded object.
        * @param x Value to multiply the horizontal component by.
        * @param y Value to multiply the vertical component by.
        */
        public Scale(x: number, y: number): void {
            throw new Error("This method is abstract!");
        }

        /**
        * Abstract: Determines if the current bounded object contains the provided Vector2d.
        * @param point A point.
        */
        public ContainsPoint(point: Vector2d): bool {
            throw new Error("This method is abstract!");
        }

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

        /**
        * Abstract: Determines if the current bounded object is intersecting the provided BoundingCircle.
        * @param circle BoundingCircle to check intersection with.
        */
        public IntersectsCircle(circle: BoundingCircle): bool {
            throw new Error("This method is abstract!");
        }

        /**
        * Abstract: Determines if the current bounded object is intersecting the provided BoundingRectangle.
        * @param rectangle BoundingRectangle to check intersection with.
        */
        public IntersectsRectangle(rectangle: BoundingRectangle): bool {
            throw new Error("This method is abstract!");
        }
    }

}
/* IRenderable.ts */


declare module EndGate.Rendering {

    export interface IRenderable {
        ZIndex: number;
        Draw(context: CanvasRenderingContext2D): void;
        GetDrawBounds(): Bounds.Abstractions.Bounds2d;
    }

}
/* LooperCallback.ts */


module EndGate._.Loopers {

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
/* ILooper.ts */




declare module EndGate._.Loopers {

    export interface ILooper extends IDisposable, ITyped {
        Start(): void;
        AddCallback(callback: LooperCallback): void;
        RemoveCallback(callback: LooperCallback): void;
    }

}
/* TimedCallback.ts */



module EndGate._.Loopers {

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




module EndGate._.Loopers {

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




module EndGate._.Loopers {

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
/* GameRunner.ts */






module EndGate._ {    

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

var GameRunnerInstance: EndGate._.GameRunner = new EndGate._.GameRunner();
/* GameConfiguration.ts */
module EndGate {

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
/* EventHandler.ts */



module EndGate {

    export class EventHandler implements _.ITyped {
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



module EndGate.Collision.Assets {

    /**
    * Defines a data object that is used to describe a collision event.
    */
    export class CollisionData {
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
        constructor(at: Vector2d, w: Collidable) {
            this.At = at;
            this.With = w;
        }
    }

}
/* Collidable.ts */







module EndGate.Collision {

    /**
    * Defines a collidable object that can be used to detect collisions with other objects.
    */
    export class Collidable implements IDisposable, _.ITyped {
        public _type: string = "Collidable";
        public _id: number;

        /**
        * Gets or sets the Bounds of the collidable.
        */
        public Bounds: Bounds.Abstractions.Bounds2d;

        private static _collidableIDs: number = 0;
        private _disposed: bool;

        /**
        * Creates a new instance of Collidable.
        * @param position Initial bounds for the Collidable.
        */
        constructor(bounds: Bounds.Abstractions.Bounds2d) {
            this._disposed = false;
            this.Bounds = bounds;
            this._id = Collidable._collidableIDs++;

            this.OnCollision = new EventHandler();
            this.OnDisposed = new EventHandler();
        }

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
        public IsCollidingWith(other: Collidable): bool {
            return this.Bounds.Intersects(other.Bounds);
        }

        /**
        * Triggers the OnCollision event.  Can also be overridden from derived classes to be called when a collision occurs if the collidable is being used with a CollisionManager
        * @param data Collision information related to the collision.
        */
        public Collided(data: Assets.CollisionData): void {
            this.OnCollision.Trigger(data);
        }

        /**
        * Triggers the OnDisposed event.  If this Collidable is used with a CollisionManager it will be unmonitored when disposed.
        */
        public Dispose(): void {
            if (!this._disposed) {
                this._disposed = true;
                this.OnDisposed.Trigger(this);
            }
            else {
                throw new Error("Cannot dispose collidable more than once.");
            }
        }
    }

}
/* CollisionManager.ts */







module EndGate.Collision {

    /**
    * Defines a manager that will check for collisions between objects that it is monitoring.
    */
    export class CollisionManager implements IUpdateable, _.ITyped {
        public _type: string = "CollisionManager";
        private _collidables: Collidable[];
        private _enabled: bool;

        /**
        * Creates a new instance of CollisionManager.
        */
        constructor() {
            this._collidables = [];
            this._enabled = false;

            this.OnCollision = new EventHandler();
        }

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
        public Monitor(obj: Collidable): void {
            this._enabled = true;

            obj.OnDisposed.Bind(() => {
                this.Unmonitor(obj);
            });

            this._collidables.push(obj);
        }

        /**
        * Unmonitors the provided collidable.  The Collided function and OnCollision event will no longer be triggered when an actual collision may have occured.
        * Disposing a monitored collidable will automatically be unmonitored
        * @param obj Collidable to unmonitor.
        */
        public Unmonitor(obj: Collidable): void {
            for (var i = 0; i < this._collidables.length; i++) {
                if (this._collidables[i]._id === obj._id) {
                    this._collidables.splice(i, 1);
                    break;
                }
            }
        }

        /**
        * Checks for collisions within its monitored objects.  Games CollisionManager's automatically have their Update functions called at the beginning of each update loop.
        * @param gameTime The current game time object.
        */
        public Update(gameTime: GameTime): void {
            var first: Collidable,
                second: Collidable;

            if (this._enabled) {
                for (var i = 0; i < this._collidables.length; i++) {
                    first = this._collidables[i];

                    for (var j = i + 1; j < this._collidables.length; j++) {
                        second = this._collidables[j];

                        if (first.IsCollidingWith(second)) {
                            first.Collided(new Assets.CollisionData(first.Bounds.Position.Clone(), second));
                            second.Collided(new Assets.CollisionData(second.Bounds.Position.Clone(), first));
                            this.OnCollision.Trigger(first, second);
                        }
                    }
                }
            }
        }
    }

}
/* Graphic2dState.ts */


module EndGate.Graphics.Assets {

    export class Graphic2dState implements _.ITyped {
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








module EndGate.Graphics.Abstractions {

    export class Graphic2d implements _.ITyped, Rendering.IRenderable, IMoveable {
        public _type: string = "Graphic2d";

        public ZIndex: number;
        public Position: Vector2d;
        public Rotation: number;
        public State: Assets.Graphic2dState;

        private static _zindexSort: (a: Graphic2d, b: Graphic2d) => number = (a: Graphic2d, b: Graphic2d) => { return a.ZIndex - b.ZIndex; };

        private _children: Graphic2d[];

        constructor(position: Vector2d) {
            this.Position = position;
            this.Rotation = 0;
            this.ZIndex = 0;
            this.State = new Assets.Graphic2dState();
            this._children = [];
        }

        public AddChild(graphic: Graphic2d): void {
            this._children.push(graphic);
            this._children.sort(Graphic2d._zindexSort);
        }

        public RemoveChild(graphic: Graphic2d): bool {
            var index = this._children.indexOf(graphic);

            if (index >= 0) {
                this._children.splice(index, 1);
                return true;
            }

            return false;
        }

        public Children(): Graphic2d[]{
            return this._children;
        }

        public _StartDraw(context: CanvasRenderingContext2D): void {
            context.save();
            this.State.SetContextState(context);

            context.translate(this.Position.X, this.Position.Y);

            if (this.Rotation !== 0) {
                context.rotate(this.Rotation);
            }
        }

        public _EndDraw(context: CanvasRenderingContext2D): void {
            for (var i = 0; i < this._children.length; i++) {
                this._children[i].Draw(context);
            }

            context.restore();
        }

        public Draw(context: CanvasRenderingContext2D): void {
        }

        public GetDrawBounds(): Bounds.Abstractions.Bounds2d {
            throw new Error("GetDrawBounds is abstract, it must be implemented.");
        }
    }

}
/* MinMax.ts */
module EndGate._ {

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



module EndGate._ {

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




module EndGate.Bounds {

    /**
    * Defines a circle that can be used to detect intersections.
    */
    export class BoundingCircle implements _.ITyped extends Abstractions.Bounds2d {
        public _type: string = "BoundingCircle";
        public _boundsType: string = "BoundingCircle";

        /**
        * Gets or sets the Radius of the circle.
        */
        public Radius: number;

        /**
        * Creates a new instance of BoundingCircle.
        * @param position Initial Position of the BoundingCircle.
        * @param radius Initial Radius of the BoundingCircle.
        */
        constructor(position: Vector2d, radius: number) {
            super(position);

            this.Radius = radius;
        }

        /**
        * Scales the radius of the BoundingCircle.
        * @param scale Value to multiply the radius by.
        */
        public Scale(scale: number): void {
            // This is an overloaded version of Bounds2d Scale but we don't care
            // about the second parameter within a BoundingCircle
            this.Radius *= scale;
        }

        /**
        * Calculates the area of the BoundingCircle.
        */
        public Area(): number {
            return Math.PI * this.Radius * this.Radius;
        }

        /**
        * Calculates the circumference of the BoundingCircle.
        */
        public Circumference(): number {
            return 2 * Math.PI * this.Radius;
        }

        /**
        * Determines if the current BoundingCircle is intersecting the provided BoundingCircle.
        * @param circle BoundingCircle to check intersection with.
        */
        public IntersectsCircle(circle: BoundingCircle): bool {
            return this.Position.Distance(circle.Position).Length() < this.Radius + circle.Radius;
        }

        /**
        * Determines if the current BoundingCircle is intersecting the provided BoundingRectangle.
        * @param rectangle BoundingRectangle to check intersection with.
        */
        public IntersectsRectangle(rectangle: BoundingRectangle): bool {
            var translated = (rectangle.Rotation === 0)
                                  ? this.Position
                                  : this.Position.RotateAround(rectangle.Position, -rectangle.Rotation);

            var circleDistance = translated.Distance(rectangle.Position);

            if (circleDistance.X > (rectangle.Size.HalfWidth() + this.Radius)) { return false; }
            if (circleDistance.Y > (rectangle.Size.HalfHeight() + this.Radius)) { return false; }

            if (circleDistance.X <= (rectangle.Size.HalfWidth())) { return true; }
            if (circleDistance.Y <= (rectangle.Size.HalfHeight())) { return true; }

            var cornerDistance_sq = Math.pow(circleDistance.X - rectangle.Size.HalfWidth(), 2) + Math.pow(circleDistance.Y - rectangle.Size.HalfHeight(), 2);

            return (cornerDistance_sq <= (this.Radius * this.Radius));
        }

        /**
        * Determines if the current BoundingCircle contains the provided Vector2d.
        * @param point A point.
        */
        public ContainsPoint(point: Vector2d): bool {
            return this.Position.Distance(point).Magnitude() < this.Radius;
        }
    }

}
/* BoundingRectangle.ts */





module EndGate.Bounds {

    /**
    * Defines a rectangle that can be used to detect intersections.
    */
    export class BoundingRectangle implements _.ITyped extends Abstractions.Bounds2d {
        public _type: string = "BoundingRectangle";
        public _boundsType: string = "BoundingRectangle";

        /**
        * Gets or sets the Size of the rectangle.
        */
        public Size: Size2d;

        /**
        * Creates a new instance of BoundingRectangle.
        * @param position Initial Position of the BoundingRectangle.
        * @param size Initial Size of the BoundingRectangle.
        */
        constructor(position: Vector2d, size: Size2d) {
            super(position);
            this.Size = size;
        }

        /**
        * Scales the width and height of the BoundingRectangle.
        * @param x Value to multiply the width by.
        * @param y Value to multiply the height by.
        */
        public Scale(x: number, y: number): void {
            this.Size.Width *= x;
            this.Size.Height *= y;
        }

        /**
        * Returns a list of vertices that are the locations of each corner of the BoundingRectangle. Format: [TopLeft, TopRight, BotLeft, BotRight].
        */
        public Vertices(): Vector2d[] {
            return [this.TopLeft(), this.TopRight(), this.BotLeft(), this.BotRight()];
        }

        /** 
        * Calculates the top left corner of the BoundingRectangle.
        */
        public TopLeft(): Vector2d {
            var v = new Vector2d(this.Position.X - this.Size.HalfWidth(), this.Position.Y - this.Size.HalfHeight());
            if (this.Rotation === 0) {
                return v;
            }

            return v.RotateAround(this.Position, this.Rotation);
        }

        /** 
        * Calculates the top right corner of the BoundingRectangle.
        */
        public TopRight(): Vector2d {
            var v = new Vector2d(this.Position.X + this.Size.HalfWidth(), this.Position.Y - this.Size.HalfHeight());
            if (this.Rotation === 0) {
                return v;
            }

            return v.RotateAround(this.Position, this.Rotation);
        }

        /** 
        * Calculates the bottom left corner of the BoundingRectangle.
        */
        public BotLeft(): Vector2d {
            var v = new Vector2d(this.Position.X - this.Size.HalfWidth(), this.Position.Y + this.Size.HalfHeight());
            if (this.Rotation === 0) {
                return v;
            }

            return v.RotateAround(this.Position, this.Rotation);
        }

        /** 
        * Calculates the bottom right corner of the BoundingRectangle.
        */
        public BotRight(): Vector2d {
            var v = new Vector2d(this.Position.X + this.Size.HalfWidth(), this.Position.Y + this.Size.HalfHeight());
            if (this.Rotation === 0) {
                return v;
            }

            return v.RotateAround(this.Position, this.Rotation);
        }

        /**
        * Determines if the current BoundingRectangle is intersecting the provided BoundingCircle.
        * @param circle BoundingCircle to check intersection with.
        */
        public IntersectsCircle(circle: BoundingCircle): bool {
            return circle.IntersectsRectangle(this);
        }

        /**
        * Determines if the current BoundingRectangle is intersecting the provided BoundingRectangle.
        * @param rectangle BoundingRectangle to check intersection with.
        */
        public IntersectsRectangle(rectangle: BoundingRectangle): bool {
            if (this.Rotation === 0 && rectangle.Rotation === 0) {
                var myTopLeft = this.TopLeft(),
                    myBotRight = this.BotRight(),
                    theirTopLeft = rectangle.TopLeft(),
                    theirBotRight = rectangle.BotRight();

                return theirTopLeft.X <= myBotRight.X && theirBotRight.X >= myTopLeft.X && theirTopLeft.Y <= myBotRight.Y && theirBotRight.Y >= myTopLeft.Y;
            }
            else if (rectangle.Position.Distance(this.Position).Magnitude() <= rectangle.Size.Radius() + this.Size.Radius()) {// Check if we're somewhat close to the rectangle ect that we might be colliding with
                var axisList: Vector2d[] = [this.TopRight().Subtract(this.TopLeft()), this.TopRight().Subtract(this.BotRight()), rectangle.TopLeft().Subtract(rectangle.BotLeft()), rectangle.TopLeft().Subtract(rectangle.TopRight())];
                var myVertices = this.Vertices();
                var theirVertices = rectangle.Vertices();

                for (var i: number = 0; i < axisList.length; i++) {
                    var axi = axisList[i];
                    var myProjections = EndGate._.Vector2dHelpers.GetMinMaxProjections(axi, myVertices);
                    var theirProjections = EndGate._.Vector2dHelpers.GetMinMaxProjections(axi, theirVertices);

                    // No collision
                    if (theirProjections.Max < myProjections.Min || myProjections.Max < theirProjections.Min) {
                        return false;
                    }
                }

                return true;
            }

            return false;
        }

        /**
        * Determines if the current BoundingRectangle contains the provided Vector2d.
        * @param point A point.
        */
        public ContainsPoint(point: Vector2d): bool {
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
/* Camera2d.ts */




module EndGate.Rendering {

    export class Camera2d extends Bounds.BoundingRectangle {
        public static DefaultDistance: number = 1000;
        public _type: string = "Camera2d";

        public Distance: number;

        constructor(position: Vector2d, size: Size2d) {
            super(position, size);

            this.Distance = Camera2d.DefaultDistance;
        }

        public GetDistanceScale(): number {
            return this.Distance / Camera2d.DefaultDistance;
        }

        public ToCameraRelative(position: Vector2d): Vector2d {
            var scaledTopLeft = this.Position.Subtract(this.Size.Multiply(this.GetDistanceScale()* .5));
            return scaledTopLeft.Add(position.Multiply(this.GetDistanceScale()));
        }

        public GetInverseDistanceScale(): number {
            return Camera2d.DefaultDistance / this.Distance;
        }
    }

}
/* IRenderer.ts */



declare module EndGate.Rendering {

    export interface IRenderer extends IDisposable {
        Render(renderables: IRenderable[]): CanvasRenderingContext2D;
    }

}
/* Renderer2d.ts */





module EndGate.Rendering {

    export class Renderer2d implements IRenderer {
        public static _zindexSort: (a: IRenderable, b: IRenderable) => number = (a: IRenderable, b: IRenderable) => { return a.ZIndex - b.ZIndex; };

        // These essentially are used to create a double buffer for rendering
        private _visibleCanvas: HTMLCanvasElement;
        private _visibleContext: CanvasRenderingContext2D;
        public _bufferCanvas: HTMLCanvasElement;
        public _bufferContext: CanvasRenderingContext2D; // Protected

        private _disposed: bool;

        constructor(renderOnto: HTMLCanvasElement) {
            this._visibleCanvas = renderOnto;
            this._visibleContext = renderOnto.getContext("2d");

            // Create an equally sized canvas for a buffer
            this._bufferCanvas = <HTMLCanvasElement>document.createElement("canvas");
            this._bufferContext = this._bufferCanvas.getContext("2d");
            this.OnRendererSizeChange = new EventHandler();
            this.UpdateBufferSize();

            this._disposed = false;
        }

        public OnRendererSizeChange: EventHandler;

        public Render(renderables: IRenderable[]): CanvasRenderingContext2D {
            // Check if our visible canvas has changed size
            if (this._bufferCanvas.width !== this._visibleCanvas.width || this._bufferCanvas.height !== this._visibleCanvas.height) {
                this.UpdateBufferSize();
            }

            // Push buffer to screen
            this._visibleContext.clearRect(0, 0, this._visibleCanvas.width, this._visibleCanvas.height);
            this._visibleContext.drawImage(this._bufferCanvas, 0, 0);
            // Clear our buffer to prepare it for new drawings
            this._ClearBuffer();

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

        public _ClearBuffer() {
            this._bufferContext.clearRect(0, 0, this._bufferCanvas.width, this._bufferCanvas.height);
        }

        private UpdateBufferSize() {
            this._bufferCanvas.width = this._visibleCanvas.width;
            this._bufferCanvas.height = this._visibleCanvas.height;
            this.OnRendererSizeChange.Trigger(new Size2d(this._visibleCanvas.width, this._visibleCanvas.height))
        }
    }

}
/* Camera2dCanvasContextBuilder.ts */




module EndGate.Rendering._ {

    export class Camera2dCanvasContextBuilder {
        private _camera: Camera2d;
        private _canvasCenter: Vector2d;
        private _translated: bool;
        private _translationState: any[];

        constructor(camera: Camera2d) {
            this._camera = camera;
            this._canvasCenter = this._camera.Position.Clone();
            this._translated = false;
            this._translationState = [];
            this._translationState.push(this._translated);
        }

        public BuildFrom(context: CanvasRenderingContext2D): CanvasRenderingContext2D {
            var that = this,
                savedCreateRadialGradient = context.createRadialGradient,
                savedTranslate = context.translate,
                savedSave = context.save,
                savedRestore = context.restore,
                savedDrawImage1 = this.BuildPositionReplacer(context.drawImage, 1),
                savedDrawImage2 = this.BuildPositionReplacer(context.drawImage, 5);

            (<any>context).unModifiedClearRect = context.clearRect;

            context.arc = this.BuildPositionReplacer(context.arc);
            context.arcTo = this.BuildPositionReplacer(context.arcTo, 0, 4);
            context.bezierCurveTo = this.BuildPositionReplacer(context.bezierCurveTo, 0, 6);
            context.clearRect = this.BuildPositionReplacer(context.clearRect);
            context.createLinearGradient = this.BuildPositionReplacer(context.createLinearGradient, 0, 4);
            context.createRadialGradient = function () {
                var scale = that._camera.GetDistanceScale();
                arguments[0] += -that._camera.Position.X + that._canvasCenter.X * scale;
                arguments[1] += -that._camera.Position.Y + that._canvasCenter.Y * scale;
                arguments[3] += -that._camera.Position.X + that._canvasCenter.X * scale;
                arguments[4] += -that._camera.Position.Y + that._canvasCenter.Y * scale;

                return savedCreateRadialGradient.apply(this, arguments);
            };
            context.drawImage = function() {
                if (arguments.length <= 5) {
                    savedDrawImage1.apply(this, arguments);
                }
                else {
                    savedDrawImage2.apply(this, arguments);
                }
            };
            context.fillRect = this.BuildPositionReplacer(context.fillRect);
            context.fillText = this.BuildPositionReplacer(context.fillText, 1);
            context.getImageData = this.BuildPositionReplacer(context.getImageData);
            context.isPointInPath = this.BuildPositionReplacer(context.isPointInPath);
            context.lineTo = this.BuildPositionReplacer(context.lineTo);
            context.moveTo = this.BuildPositionReplacer(context.moveTo);
            context.putImageData = this.BuildPositionReplacer(context.putImageData, 1);
            context.quadraticCurveTo = this.BuildPositionReplacer(context.quadraticCurveTo, 0, 4);
            context.rect = this.BuildPositionReplacer(context.rect);
            context.strokeRect = this.BuildPositionReplacer(context.strokeRect);
            context.strokeText = this.BuildPositionReplacer(context.strokeText, 1);

            context.save = function () {
                that._translationState.push(that._translated);

                savedSave.call(this);
            };

            context.restore = function () {
                that._translated = that._translationState.pop();

                savedRestore.call(this);
            };

            context.translate = function () {
                var scale;

                if (!that._translated) {
                    scale = that._camera.GetDistanceScale();

                    arguments[0] += -that._camera.Position.X + that._canvasCenter.X * scale;
                    arguments[1] += -that._camera.Position.Y + that._canvasCenter.Y * scale;
                }

                that._translated = true;

                savedTranslate.apply(this, arguments);
            };

            return context;
        }

        public UpdateCanvasCenter(newSize: Size2d): void {
            this._canvasCenter.X = newSize.Width / 2;
            this._canvasCenter.Y = newSize.Height / 2;
        }

        public BuildPositionReplacer(replacee: Function, positionArgOffset: number = 0, argCount: number = 2): any {
            var that = this,
                axiList = ["X", "Y"];

            return function () {
                var scale: number,
                    axi: string;

                if (!that._translated) {
                    scale = that._camera.GetDistanceScale();
                    for (var i = 0; i < argCount; i++) {
                        axi = axiList[i % 2];
                        arguments[positionArgOffset + i] += -that._camera.Position[axi] + that._canvasCenter[axi] * scale;
                    }
                }

                return replacee.apply(this, arguments);
            };
        }
    }

}
/* Camera2dRenderer.ts */





module EndGate.Rendering {

    export class Camera2dRenderer extends Renderer2d {
        private _camera: Camera2d;
        private _contextBuilder: _.Camera2dCanvasContextBuilder;

        constructor(renderOnto: HTMLCanvasElement, camera: Camera2d) {
            super(renderOnto);

            this._camera = camera;
            this._contextBuilder = new _.Camera2dCanvasContextBuilder(this._camera);

            this.OnRendererSizeChange.Bind(this._contextBuilder.UpdateCanvasCenter);
            this._contextBuilder.UpdateCanvasCenter(new Size2d(renderOnto.width, renderOnto.height));
            this._bufferContext = this._contextBuilder.BuildFrom(this._bufferContext);

        }

        public Render(renderables: IRenderable[]): CanvasRenderingContext2D {
            var context,
                inverseScale = this._camera.GetInverseDistanceScale();

            this._bufferContext.save();
            this._bufferContext.scale(inverseScale, inverseScale)

            context = super.Render(this.GetOnScreenRenderables(renderables));

            this._bufferContext.restore();

            return context;
        }

        public _ClearBuffer() {
            var cameraScale = this._camera.GetDistanceScale();
            (<any>this._bufferContext).unModifiedClearRect(0, 0, this._bufferCanvas.width * cameraScale, this._bufferCanvas.height * cameraScale);
        }

        private GetOnScreenRenderables(allRenderables: IRenderable[]): IRenderable[] {
            var onscreen: IRenderable[] = [],
                scale = this._camera.GetDistanceScale(),
                unscale = 1 / scale;

            // Scale camera size to our zoom level
            this._camera.Scale(scale, scale);

            for (var i = 0; i < allRenderables.length; i++) {
                if (this._camera.Intersects(allRenderables[i].GetDrawBounds())) {
                    onscreen.push(allRenderables[i]);
                }
            }

            this._camera.Scale(unscale, unscale);

            return onscreen;
        }
    }

}
/* Scene2d.ts */










module EndGate.Rendering {

    export class Scene2d implements IDisposable {

        public DrawArea: HTMLCanvasElement;
        public Camera: Camera2d;

        private _actors: Graphics.Abstractions.Graphic2d[];
        private _renderer: IRenderer;
        private _onDraw: (context: CanvasRenderingContext2D) => void;

        private _disposed: bool;

        constructor(drawArea?: HTMLCanvasElement, onDraw?: (context: CanvasRenderingContext2D) => void ) {
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

            this.ApplyStyles(drawArea);

            this.DrawArea = drawArea;
            this.Camera = new Camera2d(new Vector2d(this.DrawArea.width / 2, this.DrawArea.height / 2), new Size2d(this.DrawArea.width, this.DrawArea.height));
            this._renderer = new Camera2dRenderer(this.DrawArea, this.Camera);
            this._disposed = false;
        }

        public Add(actor: Graphics.Abstractions.Graphic2d): void {
            this._actors.push(actor);
        }

        public Remove(actor: Graphics.Abstractions.Graphic2d): void {
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

        private ApplyStyles(drawArea: HTMLCanvasElement): void {
            drawArea.style.position = "absolute";
            drawArea.style.zIndex = "2"
            drawArea.parentElement.style.position = "relative";
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
module EndGate.Input {

    export class MouseButton {
        public static Left: string = "Left";
        public static Middle: string = "Middle";
        public static Right: string = "Right";
    }

}
/* IMouseEvent.ts */


declare module EndGate.Input {

    export interface IMouseEvent {
        Position: Vector2d;
    }

}
/* IMouseClickEvent.ts */



declare module EndGate.Input {

    export interface IMouseClickEvent extends IMouseEvent {
        Button: string;
    }

}
/* IMouseScrollEvent.ts */



declare module EndGate.Input {

    export interface IMouseScrollEvent extends IMouseEvent {
        Direction: Vector2d;
    }

}
/* MouseHandler.ts */







module EndGate.Input {

    export class MouseHandler {
        // Active flags
        public LeftIsDown: bool;
        public MiddleIsDown: bool;
        public RightIsDown: bool;
        public IsDown: bool;

        // Used to determine mouse buttons without using extra conditional statements, performance enhancer
        private static MouseButtonArray = [null, MouseButton.Left, MouseButton.Middle, MouseButton.Right];

        private _target: HTMLCanvasElement;

        constructor(target: HTMLCanvasElement) {
            this._target = target;

            this.OnClick = new EventHandler();
            this.OnDoubleClick = new EventHandler();
            this.OnDown = new EventHandler();
            this.OnUp = new EventHandler();
            this.OnMove = new EventHandler();
            this.OnScroll = new EventHandler();

            // Generic flags to check mouse state
            this.LeftIsDown = false;
            this.MiddleIsDown= false;
            this.RightIsDown = false;

            this.Wire();

            this.OnDown.Bind((e: IMouseClickEvent) => {
                this.IsDown = true;
                this[e.Button + "IsDown"] = true;
            });

            this.OnUp.Bind((e: IMouseClickEvent) => {
                this.IsDown = false;
                this[e.Button + "IsDown"] = false;
            });
        }

        public OnClick: EventHandler;
        public OnDoubleClick: EventHandler;
        public OnDown: EventHandler;
        public OnUp: EventHandler;
        public OnMove: EventHandler;
        public OnScroll: EventHandler;

        private Wire(): void {
            this._target.addEventListener("click",this._target.oncontextmenu = this.BuildEvent(this.OnClick, this.BuildMouseClickEvent),false);
            this._target.addEventListener("dblclick", this.BuildEvent(this.OnDoubleClick, this.BuildMouseClickEvent), false);
            this._target.addEventListener("mousedown", this.BuildEvent(this.OnDown, this.BuildMouseClickEvent), false);
            this._target.addEventListener("mouseup", this.BuildEvent(this.OnUp, this.BuildMouseClickEvent), false);
            this._target.addEventListener("mousemove", this.BuildEvent(this.OnMove, this.BuildMouseEvent), false);

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

        private BuildEvent(eventHandler: EventHandler, mouseEventBuilder: (mouseEvent: MouseEvent) => IMouseEvent, returnValue: bool = false): (e: MouseEvent) => void {
            return (e: MouseEvent) => {
                if (eventHandler.HasBindings()) {
                    eventHandler.Trigger(mouseEventBuilder.call(this, e));
                    e.preventDefault();
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

        private GetMousePosition(event: MouseEvent): Vector2d {
            return new Vector2d(
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

        private GetMouseScrollDierction(event: any): Vector2d{
            return new Vector2d(-Math.max(-1, Math.min(1, event.wheelDeltaX)), -Math.max(-1, Math.min(1, event.wheelDeltaY)));
        }
    }

}
/* NoopTripInvoker.ts */
module EndGate._.Utilities {

    export class NoopTripInvoker {
        private static _noop: Function = () => { };
        private _invoker: Function;
        private _action: Function;

        constructor(action: Function, tripped: bool = false) {
            this._invoker = NoopTripInvoker._noop;
            this._action = action;

            if (tripped) {
                this.Trip();
            }
        }

        public Invoke(...args: any[]) {
            this._invoker.apply(this, args);
        }

        public InvokeOnce(...args: any[]) {
            this._invoker.apply(this, args);
            this.Reset();
        }

        public Trip() {
            this._invoker = this._action;
        }

        public Reset() {
            this._invoker = NoopTripInvoker._noop;
        }
    }

}
/* KeyboardModifiers.ts */


module EndGate.Input.Assets {

    export class KeyboardModifiers {
        public Ctrl: bool;
        public Alt: bool;
        public Shift: bool;

        constructor(ctrl: bool, alt: bool, shift: bool) {
            this.Ctrl = ctrl;
            this.Alt = alt;
            this.Shift = shift;
        }

        public Equivalent(modifier: KeyboardModifiers): bool {
            return this.Ctrl === modifier.Ctrl && this.Alt === modifier.Alt && this.Shift === modifier.Shift;
        }

        public static BuildFromCommandString(keyCommand: string): KeyboardModifiers {
            var ctrl = (keyCommand.toLowerCase().indexOf("ctrl+") >= 0) ? true : false,
                alt = (keyCommand.toLowerCase().indexOf("alt+") >= 0) ? true : false,
                shift = (keyCommand.toLowerCase().indexOf("shift+") >= 0) ? true : false;

            return new KeyboardModifiers(ctrl, alt, shift);
        }
    }

}
/* KeyboardCommandEvent.ts */



module EndGate.Input {
    var shiftValues: { [unmodified: string]: string; } = {
        "~": "`",
        "!": "1",
        "@": "2",
        "#": "3",
        "$": "4",
        "%": "5",
        "^": "6",
        "&": "7",
        "*": "8",
        "(": "9",
        ")": "0",
        "_": "-",
        "+": "=",
        ":": ";",
        "\"": "'",
        "<": ",",
        ">": ".",
        "?": "/",
        "|": "\\"
    },
        specialKeys: { [name: string]: string; } = {
            "27": "esc",
            "27": "escape",
            "9": "tab",
            "32": "space",
            "13": "return",
            "13": "enter",
            "8": "backspace",
            "45": "insert",
            "36": "home",
            "46": "delete",
            "35": "end",
            "37": "left",
            "38": "up",
            "39": "right",
            "40": "down",
            "112": "f1",
            "113": "f2",
            "114": "f3",
            "115": "f4",
            "116": "f5",
            "117": "f6",
            "118": "f7",
            "119": "f8",
            "120": "f9",
            "121": "f10",
            "122": "f11",
            "123": "f12"
        };

    export class KeyboardCommandEvent {
        public Key: string;
        public Modifiers: Assets.KeyboardModifiers;

        constructor(keyEvent: KeyboardEvent) {
            var code,
                character;

            this.Modifiers = new Assets.KeyboardModifiers(keyEvent.ctrlKey, keyEvent.altKey, keyEvent.shiftKey);

            if (keyEvent.keyCode) {
                code = keyEvent.keyCode;
            }
            else if (keyEvent.which) {
                code = keyEvent.which;
            }

            if (!((character = String.fromCharCode(keyEvent.keyCode)) === keyEvent.key)) {
                if (!(character = specialKeys[code])) {
                    character = String.fromCharCode(code).toLowerCase();

                    if (this.Modifiers.Shift && shiftValues[character]) {
                        character = shiftValues[character];
                    }
                }
            }

            this.Key = character;
        }

        public Matches(command: Assets.KeyboardCommand): bool {
            return this.Key.toLowerCase() === command.Key.toLowerCase() && command.Modifiers.Equivalent(this.Modifiers);
        }
    }

}
/* KeyboardCommandHelper.ts */



module EndGate.Input._ {
    
    export class KeyboardCommandHelper {
        public static ParseKey(command: string): string {
            var arr = command.split("+");

            if (arr.length > 1) {
                return arr[arr.length - 1];
            }

            return arr[0];
        }
    }

}
/* KeyboardCommand.ts */






module EndGate.Input.Assets {

    export class KeyboardCommand implements IDisposable {
        public Key: string;
        public Action: Function;
        public Modifiers: Assets.KeyboardModifiers;

        private _onDisposeInvoker: EndGate._.Utilities.NoopTripInvoker;

        constructor(command: string, action: Function) {
            this.Action = action;
            this.Modifiers = Assets.KeyboardModifiers.BuildFromCommandString(command);
            this.Key = _.KeyboardCommandHelper.ParseKey(command);

            this.OnDispose = new EventHandler();
            this._onDisposeInvoker = new EndGate._.Utilities.NoopTripInvoker(() => {
                this.OnDispose.Trigger();
            }, true);
        }

        public OnDispose: EventHandler;

        public Dispose(): void {
            this._onDisposeInvoker.InvokeOnce();
        }
    }

}
/* KeyboardHandler.ts */




module EndGate.Input {

    export class KeyboardHandler {
        private static _keyboardCommandIds: number = 0;
        private _target: HTMLCanvasElement;
        private _onPressCommands: { [id: number]: Assets.KeyboardCommand; };
        private _onDownCommands: { [id: number]: Assets.KeyboardCommand; };
        private _onUpCommands: { [id: number]: Assets.KeyboardCommand; };

        constructor() {
            this._onPressCommands = (<any>{});
            this._onDownCommands = (<any>{});
            this._onUpCommands = (<any>{});

            this.OnKeyPress = new EventHandler();
            this.OnKeyDown = new EventHandler();
            this.OnKeyUp = new EventHandler();

            this.Wire();
        }

        public OnKeyPress: EventHandler;
        public OnKeyDown: EventHandler;
        public OnKeyUp: EventHandler;

        public OnCommandPress(keyCommand: string, action: Function): Assets.KeyboardCommand {
            return this.UpdateCache(keyCommand, action, this._onPressCommands);
        }

        public OnCommandDown(keyCommand: string, action: Function): Assets.KeyboardCommand {
            return this.UpdateCache(keyCommand, action, this._onDownCommands);
        }

        public OnCommandUp(keyCommand: string, action: Function): Assets.KeyboardCommand {
            return this.UpdateCache(keyCommand, action, this._onUpCommands);
        }

        private UpdateCache(keyCommand: string, action: Function, store: { [id: number]: Assets.KeyboardCommand; }): Assets.KeyboardCommand {
            var command = new Assets.KeyboardCommand(keyCommand, action),
                commandId = KeyboardHandler._keyboardCommandIds++;

            command.OnDispose.Bind(() => {
                delete store[commandId];
            });

            store[commandId] = command;

            return command;
        }

        private Wire(): void {
            document.addEventListener("keypress", this.BuildKeyEvent(this._onPressCommands, this.OnKeyPress), false);

            document.addEventListener("keydown", this.BuildKeyEvent(this._onDownCommands, this.OnKeyDown), false);

            document.addEventListener("keyup", this.BuildKeyEvent(this._onUpCommands, this.OnKeyUp), false);
        }

        private FocusingTextArea(ke: KeyboardEvent): bool {
            var element;

            if (ke.target) {
                element = ke.target;
            }
            else if (ke.srcElement) {
                element = ke.srcElement;
            }

            if (element.nodeType === 3) {
                element = element.parentNode;
            }

            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                return true;
            }

            return false;
        }

        private BuildKeyEvent(store: { [id: number]: Assets.KeyboardCommand; }, eventHandler: EventHandler): (ke: KeyboardEvent) => void {
            return (ke: KeyboardEvent) => {
                var keyboardCommandEvent: KeyboardCommandEvent,
                    propogate: bool = true;

                //Don't enable shortcut keys in Input, Text area fields
                if (this.FocusingTextArea(ke)) {
                    return;
                }

                keyboardCommandEvent = new KeyboardCommandEvent(ke);

                eventHandler.Trigger(keyboardCommandEvent);

                for (var keyboardCommandId in store) {
                    if (keyboardCommandEvent.Matches(store[keyboardCommandId])) {
                        store[keyboardCommandId].Action();
                        ke.preventDefault();
                        propogate = false;
                    }
                }

                return propogate;
            };
        }
    }

}
/* InputManager.ts */



module EndGate.Input {

    export class InputManager {
        public Mouse: MouseHandler;
        public Keyboard: KeyboardHandler;

        constructor(canvas: HTMLCanvasElement) {
            this.Mouse = new MouseHandler(canvas);
            this.Keyboard = new KeyboardHandler();
        }
    }

}
/* AudioSettings.ts */
module EndGate.Sound {

    export class AudioSettings {
        public static Default: AudioSettings = new AudioSettings();
        public Repeat: bool;
        public Volume: number;
        public AutoPlay: bool;
        public Preload: string;

        constructor(repeat?: bool = false, volume?: number = 100, autoplay?: bool = false, preload?: string = "auto") {
            this.Repeat = repeat;
            this.Volume = volume;
            this.AutoPlay = autoplay;
            this.Preload = preload;
        }
    }

}
/* AudioClip.ts */



module EndGate.Sound {

    var supportedAudioTypes = {
        mp3: 'audio/mpeg',
        ogg: 'audio/ogg',
        wav: 'audio/wav',
        aac: 'audio/aac',
        m4a: 'audio/x-m4a'
    };

    export class AudioClip {
        private _audio: HTMLAudioElement;
        private _settings: AudioSettings;

        constructor(source: any, settings?: AudioSettings = AudioSettings.Default) {
            this._settings = settings;
            this._audio = <HTMLAudioElement>document.createElement("audio");
            this.SetAudioSource(source);
            this.ApplySettings();

            this.OnComplete = new EventHandler();
        }

        public OnComplete: EventHandler;

        public Volume(percent?: number): number {
            if (typeof percent !== "undefined") {
                this._settings.Volume = percent;
                this._audio.volume = Math.max(Math.min(percent / 100, 1), 0);
            }

            return this._settings.Volume;
        }

        public IsPlaying(): bool {
            return !this._audio.paused;
        }

        public IsComplete(): bool {
            return this._audio.ended;
        }

        public Play(): void {
            if (this._audio.readyState === <any>0) {
                this._audio.addEventListener("canplay", () => {
                    this._audio.play();
                }, true);
            }
            else {
                this._audio.play();
            }
        }

        public Pause(): void {
            this._audio.pause();
        }

        public Seek(time: number): void {
            if (this._audio.readyState === <any>0) {
                this._audio.addEventListener("canplay", () => {
                    this._audio.currentTime = time;
                }, true);
            }
            else {
                this._audio.currentTime = time;
            }
        }

        public Stop(): void {
            this.Seek(0);
            this._audio.pause();
        }

        private SetAudioSource(source: any): void {
            var sourceHolder: HTMLSourceElement,
                sourceType: string;

            // If we've passed in a list of sources
            if (!(source instanceof Array)) {
                source = [source];
            }

            for (var i = 0; i < source.length; i++) {
                sourceHolder = < HTMLSourceElement > document.createElement("source");
                sourceHolder.src = source[i];

                sourceType = supportedAudioTypes[source[i].split('.').pop()];

                if (typeof sourceType !== "undefined") {
                    sourceHolder.type = sourceType;
                }

                this._audio.appendChild(sourceHolder);
            }
        }

        private ApplySettings(): void {
            this._audio.loop = this._settings.Repeat;
            this._audio.autoplay = this._settings.AutoPlay;
            this._audio.preload = this._settings.Preload;
            this.Volume(this._settings.Volume);

            this._audio.addEventListener("ended", (e: Event) => {
                this.OnComplete.Trigger(e);
            }, true);
        }

    }
}
/* AudioPlayer.ts */



module EndGate.Sound {

    export class AudioPlayer {
        private _source: any;

        constructor(sourceLocation: any) {
            this._source = sourceLocation;
        }

        public Play(settings?: AudioSettings = AudioSettings.Default): AudioClip {
            var clip = new AudioClip(this._source, settings);

            clip.Play();

            return clip;
        }
    }

}
/* AudioManager.ts */



module EndGate.Sound {

    export class AudioManager {
        private _audioPlayers: { [name: string]: AudioPlayer; };

        constructor() {
            this._audioPlayers = {};
        }

        public Load(name: string, src: any): AudioPlayer {
            this._audioPlayers[name] = new AudioPlayer(src);

            return this._audioPlayers[name];
        }

        public Unload(name: string): AudioPlayer {
            var player = this._audioPlayers[name];

            delete this._audioPlayers[name];

            return player;
        }

        public Play(name: string, settings?: AudioSettings = AudioSettings.Default): AudioClip {
            return this._audioPlayers[name].Play(settings);
        }

        public GetPlayer(name: string): AudioPlayer {
            return this._audioPlayers[name];
        }
    }

}
/* SceneryHandler.ts */





module EndGate.Map {

    export class SceneryHandler {
        private _sceneryCanvas: HTMLCanvasElement;
        private _camera: Rendering.Camera2d;
        private _layers: Graphics.Abstractions.Graphic2d[];
        private _renderer: Rendering.Camera2dRenderer;

        constructor(foregroundCanvas: HTMLCanvasElement, camera: Rendering.Camera2d) {
            this._camera = camera;
            this._layers = [];            
            this._sceneryCanvas = this.BuildSceneryCanvas(foregroundCanvas);
            this._renderer = new Rendering.Camera2dRenderer(this._sceneryCanvas,this._camera);
        }

        public AddLayer(layer: Graphics.Abstractions.Graphic2d): void {
            this._layers.push(layer);
        }

        public RemoveLayer(layer: Graphics.Abstractions.Graphic2d): void {
            this._layers.splice(this._layers.indexOf(layer), 1);
        }

        public Draw(): void {
            this._layers.sort(Graphics.Abstractions.Graphic2d._zindexSort);

            this._renderer.Render(this._layers);
        }

        private BuildSceneryCanvas(foreground: HTMLCanvasElement): HTMLCanvasElement {
            var sceneryCanvas = < HTMLCanvasElement > document.createElement("canvas"),
                baseElement: any = foreground;

            sceneryCanvas.width = foreground.width;
            sceneryCanvas.height = foreground.height;
            sceneryCanvas.style.position = "absolute";
            sceneryCanvas.style.zIndex = "1";

            foreground.parentElement.insertBefore(sceneryCanvas, foreground);

            return sceneryCanvas;
        }
    }

}
/* MapManager.ts */



module EndGate.Map {

    export class MapManager {
        public Scenery: SceneryHandler;

        constructor(foregroundCanvas: HTMLCanvasElement, camera: Rendering.Camera2d) {
            this.Scenery = new SceneryHandler(foregroundCanvas, camera);
        }
    }

}
/* Game.ts */












module EndGate {

    export class Game implements _.ITyped, IUpdateable, IDisposable {
        public _type: string = "Game";

        public ID: number;
        public Configuration: GameConfiguration;
        public CollisionManager: Collision.CollisionManager;
        public Scene: Rendering.Scene2d;
        public Input: Input.InputManager;
        public Audio: Sound.AudioManager;
        public Map: Map.MapManager;

        private static _gameIds: number = 0;
        private _gameTime: GameTime;

        constructor(gameCanvas?:HTMLCanvasElement) {
            this._gameTime = new GameTime();
            this.ID = Game._gameIds++;

            this.Scene = new Rendering.Scene2d(gameCanvas, context => {
                this.Draw(context);
            });

            this.Input = new Input.InputManager(this.Scene.DrawArea);
            this.Audio = new Sound.AudioManager();
            this.CollisionManager = new Collision.CollisionManager();
            this.Configuration = new GameConfiguration(GameRunnerInstance.Register(this))
            this.Map = new Map.MapManager(this.Scene.DrawArea, this.Scene.Camera);
        }

        public PrepareUpdate(): void {
            this._gameTime.Update();

            this.CollisionManager.Update(this._gameTime);
            this.Update(this._gameTime);
        }

        public Update(gameTime: GameTime): void {
        }

        public PrepareDraw(): void {
            this.Map.Scenery.Draw();
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
/* LinearDirections.ts */
module EndGate.MovementControllers.Assets {

    export class LinearDirections {
        public Left: bool;
        public Right: bool;
        public Up: bool;
        public Down: bool;

        constructor() {
            this.Left = false;
            this.Right = false;
            this.Up = false;
            this.Down = false;
        }
    }

}
/* IMoveEvent.ts */
declare module EndGate.MovementControllers {

    export interface IMoveEvent {
        Direction: string;
        StartMoving: bool;
    }

}
/* MovementController.ts */





module EndGate.MovementControllers.Abstractions {
    
    export class MovementController implements IMoveable, IUpdateable {
        public Position: Vector2d;
        public Velocity: Vector2d;
        public Rotation: number;
        public _frozen: bool;
        private _moveables: IMoveable[];

        constructor(moveables: IMoveable[]) {
            this.Position = Vector2d.Zero();
            this.Velocity = Vector2d.Zero();
            this.Rotation = 0;
            this._frozen = false;

            this._moveables = moveables;
        }

        public Freeze(): void {
            this._frozen = true;
        }

        public Thaw(): void {
            this._frozen = false;
        }

        public IsMoving(): bool {
            return !this._frozen && !this.Velocity.IsZero();
        }

        public Update(gameTime: GameTime): void {
            // Sync moveables position and rotation
            for (var i = 0; i < this._moveables.length; i++) {
                this._moveables[i].Position = this.Position;
                this._moveables[i].Rotation = this.Rotation;
            }
        }
    }

}
/* LinearMovementController.ts */










module EndGate.MovementControllers {

    export class LinearMovementController extends Abstractions.MovementController {
        private _moveSpeed: number;
        private _moving: Assets.LinearDirections;
        private _rotationUpdater: EndGate._.Utilities.NoopTripInvoker;
        private _velocityUpdater: Function;

        constructor(moveables: IMoveable[], moveSpeed: number, rotateWithMovements?: bool = true, multiDirectional?: bool = true) {
            super(moveables);

            this._moveSpeed = moveSpeed;
            this._moving = new Assets.LinearDirections();
            this.OnMove = new EventHandler();
            this._rotationUpdater = new EndGate._.Utilities.NoopTripInvoker(() => {
                this.UpdateRotation();
            }, rotateWithMovements);

            if (multiDirectional) {
                this._velocityUpdater = this.UpdateVelocityWithMultiDirection;
            }
            else {
                this._velocityUpdater = this.UpdateVelocityNoMultiDirection;
            }
        }

        public OnMove: EventHandler;

        public IsMovingInDirection(direction: string): bool {
            return this._moving[direction] || false;
        }

        public StartMoving(direction: string): void {
            this.Move(direction, true);
        }

        public StopMoving(direction: string): void {
            this.Move(direction, false);
        }

        public MoveSpeed(speed?: number): number {
            if (typeof speed !== "undefined") {
                this._moveSpeed = speed;
                this._velocityUpdater();
            }

            return this._moveSpeed;
        }

        public Update(gameTime: GameTime): void {
            if (!this._frozen) {
                this.Position = this.Position.Add(this.Velocity.Multiply(gameTime.ElapsedSecond));

                super.Update(gameTime);
            }
        }

        public Move(direction: string, startMoving: bool): void {
            if (typeof this._moving[direction] !== "undefined") {
                this._moving[direction] = startMoving;
                this._velocityUpdater();
                this._rotationUpdater.Invoke();
                this.OnMove.Trigger(<IMoveEvent>{
                    Direction: direction,
                    StartMoving: startMoving
                });
            }
            else {
                throw new Error(direction + " is an unknown direction.");
            }
        }

        private UpdateVelocityNoMultiDirection(): void {
            var velocity = Vector2d.Zero();

            if (velocity.IsZero()) {
                if (this._moving.Up) {
                    velocity.Y -= this._moveSpeed;
                }
                if (this._moving.Down) {
                    velocity.Y += this._moveSpeed;
                }

                if (velocity.Y === 0) {
                    if (this._moving.Left) {
                        velocity.X -= this._moveSpeed;
                    }
                    if (this._moving.Right) {
                        velocity.X += this._moveSpeed;
                    }
                }
            }

            this.Velocity = velocity;
        }

        private UpdateVelocityWithMultiDirection(): void {
            var velocity = Vector2d.Zero();

            if (this._moving.Up) {
                velocity.Y -= this._moveSpeed;
            }
            if (this._moving.Down) {
                velocity.Y += this._moveSpeed;
            }
            if (this._moving.Left) {
                velocity.X -= this._moveSpeed;
            }
            if (this._moving.Right) {
                velocity.X += this._moveSpeed;
            }

            this.Velocity = velocity;
        }

        private UpdateRotation(): void {
            if (!this.Velocity.IsZero()) {
                this.Rotation = Math.atan2(this.Velocity.Y, this.Velocity.X);
            }
        }
    }

}
/* DirectionalInputController.ts */



module EndGate.InputControllers {

    export class DirectionalInputController {
        private _keyboard: Input.KeyboardHandler;
        private _onMove: (direction: string, startMoving: bool) => void;
        private _directions: MovementControllers.Assets.LinearDirections;

        constructor(keyboard: Input.KeyboardHandler, onMove: (direction: string, startMoving: bool) => void , upKeys?: string[] = ["w", "Up"], rightKeys?: string[] = ["d", "Right"], downKeys?: string[] = ["s", "Down"], leftKeys?: string[] = ["a", "Left"]) {
            this._keyboard = keyboard;
            this._onMove = onMove;
            this._directions = new MovementControllers.Assets.LinearDirections();

            this.BindKeys(upKeys, "OnCommandDown", "Up", true);
            this.BindKeys(rightKeys, "OnCommandDown", "Right", true);
            this.BindKeys(downKeys, "OnCommandDown", "Down", true);
            this.BindKeys(leftKeys, "OnCommandDown", "Left", true);
            this.BindKeys(upKeys, "OnCommandUp", "Up", false);
            this.BindKeys(rightKeys, "OnCommandUp", "Right", false);
            this.BindKeys(downKeys, "OnCommandUp", "Down", false);
            this.BindKeys(leftKeys, "OnCommandUp", "Left", false);
        }

        private BindKeys(keyList: string[], bindingAction: string, direction: string, startMoving: bool): void {
            for (var i = 0; i < keyList.length; i++) {
                this._keyboard[bindingAction](keyList[i], () => {
                    if (this._directions[direction] != startMoving) {
                        this._directions[direction] = startMoving;
                        this._onMove(direction, startMoving);
                    }
                });
            }
        }
    }

}
/* FontMeasurement.ts */
module EndGate.Graphics.Assets {

    export enum FontMeasurement {
        Ems,
        Pixels,
        Points,
        Percent
    };

    export class FontMeasurementHelper {
        public static _measurements: string[];

        public static _Initialize() {
            FontMeasurementHelper._measurements = ["em", "px", "pt", "%"];
        }

        public static Get(measurement: FontMeasurement): string {
            return FontMeasurementHelper._measurements[measurement];
        }
    }

    FontMeasurementHelper._Initialize();
}
/* FontFamily.ts */
module EndGate.Graphics.Assets {

    export enum FontFamily {
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
        Verdana
    };

    export class FontFamilyHelper {
        public static _families: { [family: number]: string; };

        public static _Initialize() {
            FontFamilyHelper._families = (<{ [family: number]: string; } >{});

            for (var family in FontFamily) {
                if (family !== "_map") {
                    FontFamilyHelper._families[FontFamily[family]] = family;
                }
            }

            FontFamilyHelper._families[FontFamily["TimesNewRoman"]] = "Times New Roman";
        }

        public static Get(family: FontFamily): string {
            return FontFamilyHelper._families[family];
        }
    }

    FontFamilyHelper._Initialize();

}
/* FontVariant.ts */
module EndGate.Graphics.Assets {

    export enum FontVariant {
        Normal,
        SmallCaps
    };

    export class FontVariantHelper {
        public static _variants: { [variant: number]: string; };

        public static _Initialize() {
            FontVariantHelper._variants = (<{ [family: number]: string; } >{});

            for (var family in FontVariant) {
                if (family !== "_map") {
                    FontVariantHelper._variants[FontVariant[family]] = family;
                }
            }

            FontVariantHelper._variants["SmallCaps"] = "Times New Roman";
        }

        public static Get(variant: FontVariant): string {
            return FontVariantHelper._variants[variant];
        }
    }

    FontVariantHelper._Initialize();

}

/* FontStyle.ts */
module EndGate.Graphics.Assets {

    export enum FontStyle {
        Normal,
        Italic,
        Oblique
    }

    export class FontStyleHelper {
        public static _styles: { [family: number]: string; };

        public static _Initialize() {
            FontStyleHelper._styles = (<{ [family: number]: string; } >{});

            for (var style in FontStyle) {
                if (style !== "_map") {
                    FontStyleHelper._styles[FontStyle[style]] = style;
                }
            }
        }

        public static Get(style: FontStyle): string {
            return FontStyleHelper._styles[style];
        }
    }

    FontStyleHelper._Initialize();

}

/* FontSettings.ts */





module EndGate.Graphics.Assets {

    export class FontSettings {
        private _cachedState: { [property: string]: any; };
        private _cachedFont: string;
        private _refreshCache: bool;

        constructor() {
            this._cachedState = {
                fontSize: "10px",
                fontFamily: "Times New Roman",
                fontVariant: "",
                fontWeight: "",
                fontStyle: ""
            };

            this._refreshCache = true;
            this._BuildFont();
        }

        public FontSize(size?: number, measurement: FontMeasurement = FontMeasurement.Points): string {
            if (size !== undefined) {
                return this.GetOrSetCache("fontSize", size.toString() + FontMeasurementHelper.Get(measurement));
            }
            
            return this._cachedState["fontSize"];
        }

        public FontFamily(family?: FontFamily): string {
            return this.GetOrSetCache("fontFamily", FontFamilyHelper.Get(family));
        }

        public FontVariant(variant?: FontVariant): string {
            return this.GetOrSetCache("fontVariant", FontVariantHelper.Get(variant));
        }

        public FontWeight(weight?: string): string {
            return this.GetOrSetCache("fontWeight", weight);
        }

        public FontStyle(style?: FontStyle): string {
            return this.GetOrSetCache("fontStyle", FontStyleHelper.Get(style));
        }

        public _BuildFont(): string {
            var font;

            if (this._refreshCache) {
                font = this._cachedState["fontWeight"] + " " + this._cachedState["fontStyle"] + " " + this._cachedState["fontSize"] + " " + this._cachedState["fontVariant"];

                if (this._cachedState["fontFamily"]) {
                    font += this._cachedState["fontFamily"];

                    if (this._cachedState["fontFamilyType"]) {
                        font += ", " + this._cachedState["fontFamilyType"];
                    }
                }
                else if (this._cachedState["fontFamilyType"]) {
                    font += this._cachedState["fontFamilyType"];
                }

                this._cachedFont = font.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
                this._refreshCache = false;
            }

            return this._cachedFont;
        }

        private GetOrSetCache(property: string, value: any): any {
            if (typeof value !== "undefined") {
                this._cachedState[property] = value;
                this._refreshCache = true;
            }

            return this._cachedState[property];
        }
    }
}
/* Text2d.ts */






module EndGate.Graphics {

    export class Text2d extends Abstractions.Graphic2d {
        public _type: string = "Text2d";
        public FontSettings: Assets.FontSettings;

        private _text: string;
        private _stroker: _.Utilities.NoopTripInvoker;

        // For GetDrawBounds
        private _drawBounds: Bounds.BoundingRectangle;

        constructor(x: number, y: number, text: string, color: string = "black") {
            super(new Vector2d(x, y));

            this._text = text;
            this._stroker = new _.Utilities.NoopTripInvoker((context: CanvasRenderingContext2D) => {
                context.strokeText(this._text, 0, 0);
            });

            this._drawBounds = new Bounds.BoundingRectangle(this.Position, Size2d.One());

            this.FontSettings = new Assets.FontSettings();
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

        public Shadow(x: number, y: number): void;
        public Shadow(x: number, y: number, color: string): void;
        public Shadow(x: number, y: number, color: string, blur: number): void;
        public Shadow(x: number, y: number, color?: string, blur?: number): void {
            this.ShadowX(x);
            this.ShadowY(y);
            this.ShadowColor(color);
            this.ShadowBlur(blur);
        }

        public ShadowColor(color?: string): string {
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

        public Text(text?: string): string {
            if (typeof text !== "undefined") {
                this._text = text;
            }

            return this._text;
        }

        public Border(thickness: number, color: string): void {
            this.BorderThickness(thickness);
            this.BorderColor(color);
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
            var textSize;

            super._StartDraw(context);

            this.State.Font(this.FontSettings._BuildFont());

            textSize = context.measureText(this._text);
            this._drawBounds.Size.Width = textSize.width;
            this._drawBounds.Size.Height = parseInt(this.FontSettings.FontSize()) * 1.5;

            context.fillText(this._text, 0, 0);
            this._stroker.Invoke(context);

            super._EndDraw(context);
        }

        public GetDrawBounds(): Bounds.Abstractions.Bounds2d {
            this._drawBounds.Rotation = this.Rotation;
            this._drawBounds.Position = this.Position;

            return this._drawBounds;
        }
    }

}
/* ImageSource.ts */




module EndGate.Graphics.Assets {

    /**
    * Defines an image resource that can be used within Sprite's, SpriteAnimation's and other drawable graphics.
    */
    export class ImageSource {
        /**
        * Gets or sets the ClipLocation.  Represents where the image clip is within the base image.
        */
        public ClipLocation: Vector2d;
        /**
        * Gets or sets the ClipSize.  Represents how large the image clip is within the base image.
        */
        public ClipSize: Size2d;
        /**
        * Gets the base image source.  Should not be modified once the ImageSource has been constructed
        */
        public Source: HTMLImageElement;

        private _size: Size2d;
        private _loaded: bool;
        private _imageLocation;

        /**
        * Creates a new instance of the ImageSource object.
        * @param imageLocation Image source url (this cannot change after construction). 
        */
        constructor(imageLocation: string);
        /**
        * Creates a new instance of the ImageSource object with a specified width and height.  If width and height are smaller than the actual width and height of the image source the image will be stretched
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
        constructor(imageLocation: string, width?: number, height?: number, clipX: number = 0, clipY: number = 0, clipWidth: number = width, clipHeight: number = height) {
            var setSize = typeof width !== "undefined";

            this._loaded = false;
            this.OnLoaded = new EventHandler();
            this.Source = new Image();

            this.Source.onload = () => {
                this._loaded = true;

                if (!setSize) {
                    this._size = new Size2d(this.Source.width, this.Source.height);
                    this.ClipLocation = Vector2d.Zero();
                    this.ClipSize = this._size.Clone();
                }

                this.OnLoaded.Trigger(this);
            };

            this.Source.src = imageLocation;
            this._imageLocation = imageLocation;

            if (setSize) {
                this._size = new Size2d(width, height);
                this.ClipLocation = new Vector2d(clipX, clipY);
                this.ClipSize = new Size2d(clipWidth, clipHeight);
            }
        }

        /**
        * Event: Triggered when the base image is finished loading.  Functions can be bound or unbound to this event to be executed when the event triggers.
        * Passes the ImageSource to the bound functions.
        */
        public OnLoaded: EventHandler;

        /**
        * Returns the base Size of the image source.
        */
        public Size(): Size2d {
            return this._size.Clone();
        }

        /**
        * Determines if the ImageSource has been loaded.
        */
        public Loaded(): bool {
            return this._loaded;
        }

        /**
        * Returns an ImageSource that is extracted from the current ImageSource based on the provided clip location and clip size.
        * @param clipX The horizontal location of the clip.
        * @param clipY The vertical location of the clip.
        * @param clipWidth The width of the clip.
        * @param clipHeight The height of the clip.
        */
        public Extract(clipX: number, clipY: number, clipWidth: number, clipHeight: number): ImageSource {
            return new ImageSource(this._imageLocation, this._size.Width, this._size.Height, clipX, clipY, clipWidth, clipHeight);
        }
    }

}
/* Sprite2d.ts */





module EndGate.Graphics {

    export class Sprite2d extends Abstractions.Graphic2d {
        public _type: string = "Sprite2d";

        public Image: Assets.ImageSource;
        public Size: Size2d;

        constructor(x: number, y: number, image: Assets.ImageSource, width?: number = image.ClipSize.Width, height?: number = image.ClipSize.Height) {
            super(new Vector2d(x, y));

            this.Image = image;
            this.Size = new Size2d(width, height);
        }

        public Opacity(alpha?: number): number {
            return this.State.GlobalAlpha(alpha);
        }

        public Draw(context: CanvasRenderingContext2D): void {
            super._StartDraw(context);

            context.drawImage(this.Image.Source, this.Image.ClipLocation.X, this.Image.ClipLocation.Y, this.Image.ClipSize.Width, this.Image.ClipSize.Height, - this.Size.HalfWidth(), - this.Size.HalfHeight(), this.Size.Width, this.Size.Height)

            super._EndDraw(context);
        }

        public GetDrawBounds(): Bounds.Abstractions.Bounds2d {
            var bounds = new Bounds.BoundingRectangle(this.Position, this.Size);

            bounds.Rotation = this.Rotation;

            return bounds;
        }
    }

}
/* SpriteAnimation.ts */







module EndGate.Graphics {

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
        constructor(imageSource: Assets.ImageSource, fps: number, frameSize: Size2d, frameCount: number, startOffset: Vector2d = Vector2d.Zero());
        constructor(imageSource: Assets.ImageSource, fps: number, frameSize: Size2d, frameCount: number, startOffset: Vector2d = Vector2d.Zero()) {
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

        /**
        * Event: Triggered when the animation has completed, will not trigger if the animation is repeating.  Functions can be bound or unbound to this event to be executed when the event triggers.
        */
        public OnComplete: EventHandler;

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
        public Play(repeat?: bool = false): void {
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
        * Gets the current frames per second.
        */
        public Fps(): number;
        /**
        * Sets and gets the current frames per second.
        */
        public Fps(newFps: number): number;
        public Fps(newFps?: number): number {
            if (typeof newFps !== "undefined") {
                this._fps = newFps;
                this._stepEvery = 1000 / this._fps;
            }

            return this._fps;
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
/* Shape.ts */



module EndGate.Graphics.Abstractions {

    /**
    * Abstract drawable shape type that is used create customizable drawable graphics.
    */
    export class Shape extends Graphic2d {
        public _type: string = "Shape";
        private _fill: bool;
        private _stroke: bool;

        /**
        * Should only ever be called by derived classes.
        * @param position Initial Position of the current shape object.
        */
        constructor(position: Vector2d);
        /**
        * Should only ever be called by derived classes.
        * @param position Initial Position of the current shape object.
        * @param color Initial Color of the current shape object.
        */
        constructor(position: Vector2d, color: string);
        constructor(position: Vector2d, color?: string) {
            super(position);

            this._fill = false;
            this._stroke = false;

            if (typeof color !== "undefined") {
                this.Color(color);
            }
        }

        /**
        * Gets the current shape color.
        */
        public Color(): string;
        /**
        * Gets and sets the current shape color.
        * @param color The new color.  Can be valid color strings, like "red" or "rgb(255,0,0)".
        */
        public Color(color: string): string;
        public Color(color?: string): string {
            this._fill = true;
            return this.State.FillStyle(color);
        }
        
        /**
        * Sets the current borders thickness and color.
        * @param thickness The new border thickness in pixels.
        * @param color The new border color.  Can be valid color strings, like "red" or "rgb(255,0,0)".
        */
        public Border(thickness: number, color: string): void{
            this.BorderThickness(thickness);
            this.BorderColor(color);
        }
        
        /**
        * Gets the current border thickness.
        */
        public BorderThickness(): number;
        /**
        * Sets and gets the current border thickness.
        * @param thickness The new border thickness in pixels.
        */
        public BorderThickness(thickness: number): number;
        public BorderThickness(thickness?: number): number {
            return this.State.LineWidth(thickness);
        }
        
        /**
        * Gets the current border color.
        */
        public BorderColor(): string;
        /**
        * Sets and gets the current border color.
        * @param color The new border color.  Can be valid color strings, like "red" or "rgb(255,0,0)".
        */
        public BorderColor(color: string): string;
        public BorderColor(color?: string): string {
            this._stroke = true;
            return this.State.StrokeStyle(color);
        }

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
        public Shadow(x: number, y: number, color?: string, blur?: number): void {
            this.ShadowX(x);
            this.ShadowY(y);
            this.ShadowColor(color);
            this.ShadowBlur(blur);
        }

        /**
        * Gets the current shadow color.
        */
        public ShadowColor(): string;
        /**
        * Sets and gets the current shadow color.
        * @param color The new shadow color.  Can be valid color strings, like "red" or "rgb(255,0,0)".
        */
        public ShadowColor(color: string): string;
        public ShadowColor(color?: string): string {
            this._fill = true;
            return this.State.ShadowColor(color);
        }

        /**
        * Gets the current horizontal shadow position.
        */
        public ShadowX(): number;
        /**
        * Sets and gets the current horizontal shadow position.
        * @param x The shadows new horizontal position.
        */
        public ShadowX(x: number): number;
        public ShadowX(x?: number): number {
            return this.State.ShadowOffsetX(x);
        }

        /**
        * Gets the current vertical shadow position.
        */
        public ShadowY(): number;
        /**
        * Sets and gets the current vertical shadow position.
        * @param y The shadows new vertical position.
        */
        public ShadowY(y: number): number;
        public ShadowY(y?: number): number {
            return this.State.ShadowOffsetY(y);
        }

        /**
        * Gets the current shadow blur.
        */
        public ShadowBlur(): number;
        /**
        * Sets and gets the current shadow blur.
        * @param blur The shadows new blur.
        */
        public ShadowBlur(blur: number): number;
        public ShadowBlur(blur?: number): number {
            return this.State.ShadowBlur(blur);
        }

        /**
        * Gets the current opacity.  Value is between 0 and 1.
        */
        public Opacity(): number;
        /**
        * Sets and gets the current opacity.
        * @param alpha New opacity, value is between 0 and 1.
        */
        public Opacity(alpha: number): number;
        public Opacity(alpha?: number): number {
            return this.State.GlobalAlpha(alpha);
        }

        public _StartDraw(context: CanvasRenderingContext2D): void {
            context.beginPath();

            super._StartDraw(context);
        }

        public _EndDraw(context: CanvasRenderingContext2D): void {
            if (this._fill) {
                context.fill();
            }
            
            if (this._stroke) {
                context.stroke();
            }
            else {
                context.closePath();
            }

            super._EndDraw(context);
        }

        // This should be overridden if you want to build a proper shape
        public _BuildPath(context: CanvasRenderingContext2D): void {
        }

        /**
        * Draws the shape onto the given context.  If this grid is part of a scene the Draw function will be called automatically.
        * @param context The canvas context to draw the grid onto.
        */
        public Draw(context: CanvasRenderingContext2D): void { // You can override this Draw if you want to implement your own logic for applying styles and drawing (do not recommend overriding)
            this._StartDraw(context);
            this._BuildPath(context);
            this._EndDraw(context);
        }
    }
}
/* Circle.ts */





module EndGate.Graphics {

    /**
    * Defines a drawable circle.
    */
    export class Circle extends Abstractions.Shape {
        public _type: string = "Circle";
         
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
        constructor(x: number, y: number, radius: number, color?: string) {
            super(new Vector2d(x, y), color);

            this.Radius = radius;
        }

        /**
        * The bounding area that represents where the Circle will draw.
        */
        public GetDrawBounds(): Bounds.Abstractions.Bounds2d {
            var bounds = new Bounds.BoundingCircle(this.Position, this.Radius);

            bounds.Rotation = this.Rotation;

            return bounds;
        }

        public _BuildPath(context: CanvasRenderingContext2D): void {           
            context.arc(0, 0, this.Radius, 0, (<any>Math).twoPI);
        }        
    }
}
/* Rectangle.ts */





module EndGate.Graphics {

    /**
    * Defines a drawable rectangle.
    */
    export class Rectangle extends Abstractions.Shape {
        public _type: string = "Rectangle";

        /**
        * Gets or sets the Size of the Rectangle.
        */
        public Size: Size2d;

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
        constructor(x: number, y: number, width: number, height: number, color?: string) {
            super(new Vector2d(x, y), color);

            this.Size = new Size2d(width, height);
        }

        /**
        * The bounding area that represents where the Rectangle will draw.
        */
        public GetDrawBounds(): Bounds.Abstractions.Bounds2d {
            var bounds = new Bounds.BoundingRectangle(this.Position, this.Size);

            bounds.Rotation = this.Rotation;

            return bounds;
        }

        public _BuildPath(context: CanvasRenderingContext2D): void {
            context.rect(-this.Size.HalfWidth(), -this.Size.HalfHeight(), this.Size.Width, this.Size.Height);
        }        
    }

}
/* Line2d.ts */





module EndGate.Graphics {

    export class Line2d extends Abstractions.Graphic2d {
        public _type: string = "Line2d";

        private _from: Vector2d;
        private _to: Vector2d;
        private _difference: Vector2d;
        private _boundsWidth: number;
        private _cachedPosition: Vector2d;

        constructor(fromX: number, fromY: number, toX: number, toY: number, lineWidth?: number = 1, color?: string) {
            super(Vector2d.Zero());// Set to zero here then updated in the rest of the constructor (use same logic)

            this._from = new Vector2d(fromX, fromY);
            this._to = new Vector2d(toX, toY);
            this.LineWidth(lineWidth);
            this.UpdatePosition();

            if (typeof color !== "undefined") {
                this.Color(color);
            }
        }

        public From(newPosition?: Vector2d): Vector2d {
            return this.GetOrSetLinePoint("from", newPosition);
        }

        public To(newPosition?: Vector2d): Vector2d {
            return this.GetOrSetLinePoint("to", newPosition);
        }

        public Color(color?: string): string {
            return this.State.StrokeStyle(color);
        }

        public LineWidth(width?: number): number {
            return this.State.LineWidth(width);
        }

        public LineCap(cap?: string): string {
            return this.State.LineCap(cap);
        }

        public Draw(context: CanvasRenderingContext2D): void {
            super._StartDraw(context);

            // Check if the user has modified the position directly, if so we need to translate the from and to positions accordingly
            if (!this._cachedPosition.Equivalent(this.Position)) {
                this.RefreshCache();
            }

            // Context origin is at the center point of the line
            context.beginPath();
            context.moveTo(this._from.X - this.Position.X, this._from.Y - this.Position.Y);
            context.lineTo(this._to.X - this.Position.X, this._to.Y - this.Position.Y);
            context.stroke();

            super._EndDraw(context);
        }

        public GetDrawBounds(): Bounds.Abstractions.Bounds2d {
            var bounds = new Bounds.BoundingRectangle(this.Position, new Size2d(this._boundsWidth, this.LineWidth()));

            bounds.Rotation = Math.atan2(this._difference.Y, this._difference.X) + this.Rotation;

            return bounds;
        }

        private UpdatePosition(): void {
            this.Position = ((this._from.Add(this._to)).Divide(2));
            this._difference = this._to.Subtract(this._from);
            this._boundsWidth = this._from.Distance(this._to).Length();
            this._cachedPosition = this.Position.Clone();
        }

        private RefreshCache(): void {
            var difference = this.Position.Subtract(this._cachedPosition);
            this._from.X += difference.X;
            this._from.Y += difference.Y;
            this._to.X += difference.X;
            this._to.Y += difference.Y;
            this._cachedPosition = this.Position.Clone();
        }

        private GetOrSetLinePoint(name: string, newPosition?: Vector2d): Vector2d {
            if (typeof newPosition === "undefined") {
                this["_" + name] = newPosition;
                this.UpdatePosition();
            }

            return this["_" + name];
        }
    }

}
/* Grid.ts */





module EndGate.Graphics {

    /**
    * Defines a drawable grid that can be used to store other graphics in a grid like structure.
    */
    export class Grid extends Abstractions.Graphic2d {
        public _type: string = "Grid";

        /**
        * Gets or sets the DrawGridLines property.  Indicates whether the grids column and row lines will be drawn.
        */
        public DrawGridLines: bool;

        private _size: Size2d;
        private _tileSize: Size2d;
        private _grid: Abstractions.Graphic2d[][];
        private _gridLines: Line2d[];
        private _positionOffset: Vector2d;
        private _rows: number;
        private _columns: number;
        private _gridLineColor: string;

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
        constructor(x: number, y: number, rows: number, columns: number, tileWidth: number, tileHeight: number, drawGridLines: bool);
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
        constructor(x: number, y: number, rows: number, columns: number, tileWidth: number, tileHeight: number, drawGridLines: bool, gridLineColor: string);
        constructor(x: number, y: number, rows: number, columns: number, tileWidth: number, tileHeight: number, drawGridLines: bool = false, gridLineColor: string = "gray") {
            super(new Vector2d(x, y));
            var halfSize: Size2d,
                topLeft: Vector2d,
                bottomRight: Vector2d;

            this._size = new Size2d(tileWidth * columns, tileHeight * rows);
            this._tileSize = new Size2d(tileWidth, tileHeight);
            this._grid = [];
            this._rows = rows;
            this._columns = columns;
            this.DrawGridLines = drawGridLines;
            this._gridLines = [];

            halfSize = this._size.Multiply(.5);
            topLeft = new Vector2d(-halfSize.Width, -halfSize.Height);
            bottomRight = new Vector2d(halfSize.Width, halfSize.Height);

            for (var i = 0; i < rows; i++) {
                this._grid[i] = [];
                this._gridLines.push(new Line2d(topLeft.X, topLeft.Y + i * this._tileSize.Height, bottomRight.X, topLeft.Y + i * this._tileSize.Height, 1));

                for (var j = 0; j < columns; j++) {
                    if (i === 0) {
                        this._gridLines.push(new Line2d(topLeft.X + j * this._tileSize.Width, topLeft.Y, topLeft.X + j * this._tileSize.Width, bottomRight.Y, 1));
                    }

                    this._grid[i].push(null);
                }
            }

            this._gridLines.push(new Line2d(topLeft.X, bottomRight.Y, bottomRight.X, bottomRight.Y, 1));
            this._gridLines.push(new Line2d(bottomRight.X, topLeft.Y, bottomRight.X, bottomRight.Y, 1));

            this.GridLineColor(gridLineColor);
        }

        /**
        * Gets the current grid line color.  Grid lines are only drawn of DrawGridLines is set to true.
        */
        public GridLineColor(): string;
        /**
        * Gets and sets the current grid line color.  Grid lines are only drawn of DrawGridLines is set to true.
        * @param color The new grid line color.  Can be valid color strings, like "red" or "rgb(255,0,0)".
        */
        public GridLineColor(color: string): string;
        public GridLineColor(color?: string): string {
            if (typeof color !== "undefined") {
                this._gridLineColor = color;

                for (var i = 0; i < this._gridLines.length; i++) {
                    this._gridLines[i].Color(color);
                }
            }

            return this._gridLineColor;
        }

        /**
        * Gets the size of the grid.
        */
        public Size(): Size2d {
            return this._size.Clone();
        }

        /**
        * Gets the size of the tiles.
        */
        public TileSize(): Size2d {
            return this._tileSize.Clone();
        }

        /**
        * Gets the number of rows
        */
        public Rows(): number {
            return this._rows;
        }

        /**
        * Gets the number of columns
        */
        public Columns(): number {
            return this._columns;
        }

        /**
        * Gets the current opacity.  Value is between 0 and 1.
        */
        public Opacity(): number;
        /**
        * Sets and gets the current opacity.
        * @param alpha New opacity, value is between 0 and 1.
        */
        public Opacity(alpha: number): number;
        public Opacity(alpha?: number): number {
            return this.State.GlobalAlpha(alpha);
        }

        /**
        * Fills a tile with the provided graphic.
        * @param row The row.
        * @param column The column.
        * @param graphic The graphic to fill the tile with.
        */
        public Fill(row: number, column: number, graphic: Abstractions.Graphic2d): void {
            if (!this.ValidRow(row) || !this.ValidColumn(column)) {
                return;
            }

            graphic.Position = this.GetInsideGridPosition(row, column);

            this._grid[row][column] = graphic;
            this.AddChild(graphic);
        }

        /**
        * Fills a row with the provided graphics
        * @param row The row to fill.
        * @param graphicList The list of graphics to fill the row with.  The row will be filled with as many elements that are contained within the graphicList.
        */
        public FillRow(row: number, graphicList: Abstractions.Graphic2d[]): void;
        /**
        * Fills a row with the provided graphics starting at the provided column
        * @param row The row to fill.
        * @param graphicList The list of graphics to fill the row with.  The row will be filled with as many elements that are contained within the graphicList.
        * @param columnOffset The column to start filling at.
        */
        public FillRow(row: number, graphicList: Abstractions.Graphic2d[], columnOffset: number): void;
        public FillRow(row: number, graphicList: Abstractions.Graphic2d[], columnOffset: number = 0): void {
            var graphic: Abstractions.Graphic2d;

            for (var i = 0; i < graphicList.length; i++) {
                graphic = graphicList[i];
                graphic.Position = this.GetInsideGridPosition(row, i + columnOffset);

                this._grid[row][i + columnOffset] = graphic;
                this.AddChild(graphic);
            }
        }

        /**
        * Fills a column with the provided graphics
        * @param column The column to fill.
        * @param graphicList The list of graphics to fill the column with.  The column will be filled with as many elements that are contained within the graphicList.
        */
        public FillColumn(column: number, graphicList: Abstractions.Graphic2d[]): void;
        /**
        * Fills a column with the provided graphics starting at the provided row.
        * @param column The column to fill.
        * @param graphicList The list of graphics to fill the column with.  The column will be filled with as many elements that are contained within the graphicList.
        * @param rowOffset The row to start filling at.
        */
        public FillColumn(column: number, graphicList: Abstractions.Graphic2d[], rowOffset: number): void;
        public FillColumn(column: number, graphicList: Abstractions.Graphic2d[], rowOffset: number = 0): void {
            var graphic: Abstractions.Graphic2d;

            for (var i = 0; i < graphicList.length; i++) {
                graphic = graphicList[i];
                graphic.Position = this.GetInsideGridPosition(i + rowOffset, column);

                this._grid[i + rowOffset][column] = graphic;
                this.AddChild(graphic);
            }
        }

        /**
        * Fills a tile with the provided graphic.
        * @param row The row to start filling at.
        * @param column The column to start filling at.
        * @param graphicList The list of graphics to fill the space with.  The space will be filled with as many elements that are contained within the multi-dimensional graphicList.
        */
        public FillSpace(row: number, column: number, graphicList: Abstractions.Graphic2d[][]): void {
            var graphic: Abstractions.Graphic2d;

            for (var i = 0; i < graphicList.length; i++) {
                for (var j = 0; j < graphicList[i].length; j++) {
                    graphic = graphicList[i][j];
                    if (graphic) {
                        graphic.Position = this.GetInsideGridPosition(i + row, j + column);

                        this._grid[i + row][j + column] = graphic;
                        this.AddChild(graphic);
                    }
                }
            }
        }

        /**
        * Gets a graphic within the grid.
        * @param row The row.
        * @param column The column.
        */
        public Get(row: number, column: number): Abstractions.Graphic2d {
            if (!this.ValidRow(row) || !this.ValidColumn(column)) {
                return null;
            }

            return this._grid[row][column];
        }

        /**
        * Retrieves graphics within the provided row.
        * @param row The row to retrieve.
        */
        public GetRow(row: number): Abstractions.Graphic2d[];
        /**
        * Retrieves graphics within the row starting at the provided column offset.
        * @param row The row to retrieve.
        * @param columnOffset The column to start retrieving the row at.
        */
        public GetRow(row: number, columnOffset: number): Abstractions.Graphic2d[];
        public GetRow(row: number, columnOffset: number = 0): Abstractions.Graphic2d[] {
            var rowList: Abstractions.Graphic2d[] = [];

            for (var i = columnOffset; i < this._columns; i++) {
                rowList.push(this._grid[row][i]);
            }

            return rowList;
        }

        /**
        * Retrieves graphics within the provided column.
        * @param column The column to retrieve.
        */
        public GetColumn(column: number): Abstractions.Graphic2d[];
        /**
        * Retrieves graphics within the column starting at the provided row offset.
        * @param column The column to retrieve.
        * @param rowOffset The row to start retrieving the column at.
        */
        public GetColumn(column: number, rowOffset: number): Abstractions.Graphic2d[];
        public GetColumn(column: number, rowOffset: number = 0): Abstractions.Graphic2d[] {
            var columnList: Abstractions.Graphic2d[] = [];

            for (var i = rowOffset; i < this._rows; i++) {
                columnList.push(this._grid[i][column]);
            }

            return columnList;
        }

        /**
        * Retrieves graphics within row column cross section.
        * @param rowStart The row to start pulling graphics from.
        * @param columnStart The column to start pulling graphics from.
        * @param rowEnd The row to stop pulling graphics from.
        * @param columnEnd The column to stop pulling graphics from.
        */
        public GetSpace(rowStart: number, columnStart: number, rowEnd: number, columnEnd: number): Abstractions.Graphic2d[] {
            var space: Abstractions.Graphic2d[] = [],
                rowIncrementor = (rowEnd >= rowStart) ? 1 : -1,
                columnIncrementor = (columnEnd >= columnStart) ? 1 : -1;

            for (var i = rowStart; i !== rowEnd + rowIncrementor; i += rowIncrementor) {
                if (i >= this._rows) {
                    break;
                }

                for (var j = columnStart; j !== columnEnd + columnIncrementor; j += columnIncrementor) {
                    if (j >= this._columns) {
                        break;
                    }

                    space.push(this._grid[i][j]);
                }
            }

            return space;
        }

        /**
        * Clear a grid tile.
        * @param row The row.
        * @param column The column.
        */
        public Clear(row: number, column: number): Abstractions.Graphic2d {
            if (!this.ValidRow(row) || !this.ValidColumn(column)) {
                return null;
            }

            var val = this._grid[row][column];

            this._grid[row][column] = null;
            this.RemoveChild(val);

            return val;
        }

        /**
        * Clears graphics within the provided row.
        * @param row The row to clear.
        */
        public ClearRow(row: number): Abstractions.Graphic2d[];
        /**
        * Clears graphics within the row starting at the provided column offset.
        * @param row The row to clear.
        * @param columnOffset The column to start clearing the row at.
        */
        public ClearRow(row: number, columnOffset: number): Abstractions.Graphic2d[];
        public ClearRow(row: number, columnOffset: number = 0): Abstractions.Graphic2d[] {
            var vals: Abstractions.Graphic2d[] = [];

            for (var i = 0; i < this._columns; i++) {
                vals.push(this._grid[row][i]);
                this.RemoveChild(this._grid[row][i]);
                this._grid[row][i] = null;
            }

            return vals;
        }

        /**
        * Clears graphics within the provided column.
        * @param column The column to clear.
        */
        public ClearColumn(column: number): Abstractions.Graphic2d[];
        /**
        * Clears graphics within the column starting at the provided column offset.
        * @param column The column to clear.
        * @param rowOffset The row to start clearing the column at.
        */
        public ClearColumn(column: number, rowOffset: number): Abstractions.Graphic2d[];
        public ClearColumn(column: number, rowOffset: number = 0): Abstractions.Graphic2d[] {
            var vals: Abstractions.Graphic2d[] = [];

            for (var i = 0; i < this._rows; i++) {
                vals.push(this._grid[i][column]);
                this.RemoveChild(this._grid[i][column]);
                this._grid[i][column] = null;
            }

            return vals;
        }

        /**
        * Clears graphics within row column cross section.
        * @param rowStart The row to start clearing graphics from.
        * @param columnStart The column to start clearing graphics from.
        * @param rowEnd The row to stop clearing graphics from.
        * @param columnEnd The column to stop clearing graphics from.
        */
        public ClearSpace(rowStart: number, columnStart: number, rowEnd: number, columnEnd: number): Abstractions.Graphic2d[] {
            var space: Abstractions.Graphic2d[] = [],
                rowIncrementor = (rowEnd >= rowStart) ? 1 : -1,
                columnIncrementor = (columnEnd >= columnStart) ? 1 : -1;

            for (var i = rowStart; i !== rowEnd + rowIncrementor; i += rowIncrementor) {
                if (i > this._rows) {
                    break;
                }

                for (var j = columnStart; j !== columnEnd + columnIncrementor; j += columnIncrementor) {
                    if (j > this._columns) {
                        break;
                    }

                    space.push(this._grid[i][j]);
                    this.RemoveChild(this._grid[i][j]);
                    this._grid[i][j] = null;
                }
            }

            return space;
        }

        /**
        * Draws the grid onto the given context.  If this grid is part of a scene the Draw function will be called automatically.
        * @param context The canvas context to draw the grid onto.
        */
        public Draw(context: CanvasRenderingContext2D): void {
            super._StartDraw(context);

            context.save();
            super._EndDraw(context);

            if (this.DrawGridLines) {
                for (var i = 0; i < this._gridLines.length; i++) {
                    this._gridLines[i].Draw(context);
                }
            }
            context.restore();
        }

        /**
        * The bounding area that represents where the grid will draw.
        */
        public GetDrawBounds(): Bounds.Abstractions.Bounds2d {
            var bounds = new Bounds.BoundingRectangle(this.Position, this._size);

            bounds.Rotation = this.Rotation;

            return bounds;
        }

        /**
        * Converts the provided vertical coordinate to a row number that is based on the current grid.
        * @param y The vertical coordinate to convert to a row.
        */
        public ConvertToRow(y: number): number {
            return Math.floor((y - (this.Position.Y - this._size.HalfHeight())) / this._tileSize.Height);
        }

        /**
        * Converts the provided horizontal coordinate to a column number that is based on the current grid.
        * @param x The horizontal component to convert to a column.
        */
        public ConvertToColumn(x: number): number {
            return Math.floor((x - (this.Position.X - this._size.HalfWidth())) / this._tileSize.Width);
        }

        private GetInsideGridPosition(row: number, column: number): Vector2d {
            return new Vector2d(column * this._tileSize.Width - this._size.HalfWidth() + this._tileSize.HalfWidth(), row * this._tileSize.Height - this._size.HalfHeight() + this._tileSize.HalfHeight());
        }

        private ValidRow(row: number): bool {
            return row >= 0 && row < this._rows;
        }

        private ValidColumn(column: number): bool {
            return column >= 0 && column < this._columns;
        }
    }

}
/* TileMap.ts */




module EndGate.Map {

    export class TileMap extends Graphics.Abstractions.Graphic2d {
        public _Resources: Graphics.Assets.ImageSource[];

        constructor(x: number, y: number, resources: Graphics.Assets.ImageSource[]) {
            super(new Vector2d(x, y));

            this._Resources = resources;
        }
    }

}
/* Tile.ts */



module EndGate.Map {

    export class Tile extends Graphics.Sprite2d {
        constructor(image: Graphics.Assets.ImageSource, width: number, height: number) {
            super(0, 0, image, width, height); // Set position to 0 because the tile gets updated when it gets added to the tile map

        }
    }

}
/* SquareTileMap.ts */






module EndGate.Map {

    export class SquareTileMap extends TileMap {
        private _grid: Graphics.Grid;

        constructor(x: number, y: number, tileWidth: number, tileHeight: number, resources: Graphics.Assets.ImageSource[], mappings: number[][], drawGridLines?: bool = false) {
            super(x, y, resources);

            this._grid = new Graphics.Grid(0, 0, mappings.length, mappings[0].length, tileWidth, tileHeight,drawGridLines);

            this.FillGridWith(mappings);
        }

        public static ExtractTiles(imageSource: Graphics.Assets.ImageSource, tileWidth: number, tileHeight: number): Graphics.Assets.ImageSource[]{
            var resources: Graphics.Assets.ImageSource[] = [],
                framesPerRow: number = Math.floor(imageSource.ClipSize.Width / tileWidth),
                    rows: number = Math.floor(imageSource.ClipSize.Height / tileHeight);

            for (var i = 0; i < rows; i++) {
                for (var j = 0; j < framesPerRow; j++) {
                    resources.push(imageSource.Extract(j * tileWidth, i * tileHeight, tileWidth, tileHeight));
                }
            }

            return resources;
        }

        public Draw(context: CanvasRenderingContext2D): void {
            super._StartDraw(context);

            this._grid.Draw(context);

            super._EndDraw(context);
        }

        public GetDrawBounds(): Bounds.Abstractions.Bounds2d {
            var bounds = this._grid.GetDrawBounds();

            bounds.Position = this.Position;

            return bounds;
        }

        private FillGridWith(mappings: number[][]): void {
            var tiles: Tile[][] = [];

            for (var i = 0; i < mappings.length; i++) {
                tiles[i] = [];
                for (var j = 0; j < mappings[i].length; j++) {
                    if (mappings[i][j] >= 0) {
                        tiles[i].push(new Tile(this._Resources[mappings[i][j]], this._grid.TileSize().Width, this._grid.TileSize().Height));
                    }
                    else {
                        tiles[i].push(null);
                    }
                }
            }

            this._grid.FillSpace(0, 0, tiles);
        }
    }

}
/* EndGateAPI.ts */
































// When this file is compiled into a declaration file it does not include this line,
// therefore in the build.ps1 we have to append this aliasing module.
import eg = EndGate;
