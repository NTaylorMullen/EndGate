/// <reference path="../../Interfaces/ITyped.ts" />
/// <reference path="../../Interfaces/ICloneable.ts" />
/// <reference path="../Sizes/Size2d.ts" />
/// <reference path="../../Extensions/MathExtensions.ts" />

module EndGate {

    /**
    * Defines a two dimensional vector object which specifies an X and Y.
    */
    export class Vector2d implements _.ITyped, ICloneable {
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
        public static get Zero(): Vector2d {
            return new Vector2d(0, 0);
        }

        /**
        * Returns a Vector2d with all its components set to one.
        */
        public static get One(): Vector2d {
            return new Vector2d(1, 1);
        }

        /**
        * Returns a Vector2d that's reflected over the normal.
        * @param normal The normal to reflect over.
        */
        public Reflect(normal: Vector2d): Vector2d {
            var normalUnit = normal.Unit(),
                num = this.Dot(normalUnit) * 2;

            return new Vector2d(this.X - num * normalUnit.X, this.Y - num * normalUnit.Y);
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
        public RotateAround(point: Vector2d, angle: number): Vector2d;
        /**
        * Returns a Vector2d that represents the current Vector2d rotated around the provided point and angle.
        * @param point Point to rotate around.
        * @param angle How far to rotate around the point.
        * @param precision The precision of the resulting Vector2d's X and Y components.
        */
        public RotateAround(point: Vector2d, angle: number, precision: number): Vector2d;
        public RotateAround(point: Vector2d, angle: number, precision: number = 2): Vector2d {
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
        public Trigger(action: (val: number) => void ): void {
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
        * Returns the unit vector of the current vector.
        */
        public Unit(): Vector2d {
            var magnitude = this.Magnitude();

            return new Vector2d(this.X / magnitude, this.Y / magnitude);
        }

        /**
        * Calculates the distance between the current vector and the provided one.
        * @param vector The vector to calculate the distance to.
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
        public Add(val: any): Vector2d {
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
        * @param val The Size2d to divide.
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
        public IsZero(): boolean {
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
        public Equivalent(vector: Vector2d): boolean {
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
