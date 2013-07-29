/* IDisposable.ts */
declare module EndGate {

    /**
    * Represents a Disposable object with a Dispose method.
    */
    export interface IDisposable {
        /**
        * Disposes the object.  Dispose should only be called once.
        */
        Dispose(): void;
    }

}
/* ITyped.ts */
declare module EndGate._ {

    export interface ITyped {
        _type: string;
    }

}
/* ICloneable.ts */
declare module EndGate {

    /**
    * Represents an object that can be cloned.
    */
    export interface ICloneable {
        /**
        * Duplicates the current element, returning a copy of itself.
        */
        Clone(): any;
    }

}
/* TimeSpan.ts */



module EndGate {

    /**
    * Defines a time interval.
    */
    export class TimeSpan implements _.ITyped, ICloneable {
        public _type: string = "TimeSpan";

        private static _secondsMultiplier: number = 1000;
        private static _minutesMultiplier: number = TimeSpan._secondsMultiplier * 60;

        private _milliseconds: number;
        private _seconds: number;
        private _minutes: number;

        /**
        * Creates a new instance of TimeSpan based on the provided milliseconds.
        * @param milliseconds Number of milliseconds.
        */
        constructor(milliseconds: number);
        /**
        * Creates a new instance of TimeSpan based on the provided milliseconds, seconds and minutes.
        * @param milliseconds Number of milliseconds.
        * @param seconds Number of seconds.
        */
        constructor(milliseconds: number, seconds: number);
        /**
        * Creates a new instance of TimeSpan based on the provided milliseconds, seconds and minutes.
        * @param milliseconds Number of milliseconds.
        * @param seconds Number of seconds.
        * @param minutes Number of minutes.
        */
        constructor(milliseconds: number, seconds: number, minutes: number);
        constructor(milliseconds: number, seconds: number = 0, minutes: number = 0) {
            this.Milliseconds = milliseconds + seconds * TimeSpan._secondsMultiplier + minutes * TimeSpan._minutesMultiplier;
        }

        /**
        * Gets or sets the number of milliseconds the TimeSpan represents.
        */
        public get Milliseconds(): number {
            return this._milliseconds;
        }
        public set Milliseconds(val: number) {
            this._milliseconds = val;
            this._seconds = val / TimeSpan._secondsMultiplier;
            this._minutes = val / TimeSpan._minutesMultiplier;
        }

        /**
        * Gets or sets the number of seconds the TimeSpan represents.
        */
        public get Seconds(): number {
            return this._seconds;
        }
        public set Seconds(val: number) {
            this._seconds = val;
            this._milliseconds = val * TimeSpan._secondsMultiplier;
            this._minutes = this._milliseconds / TimeSpan._minutesMultiplier;
        }

        /**
        * Gets or sets the number of minutes the TimeSpan represents.
        */
        public get Minutes(): number {
            return this._minutes;
        }
        public set Minutes(val: number) {
            this._minutes = val;
            this._seconds = val * 60;
            this._milliseconds = this._seconds * TimeSpan._secondsMultiplier;
        }

        /**
        * Returns a TimeSpan that represents the addition of the current TimeSpan's milliseconds to the provided TimeSpan's milliseconds.
        * @param val The TimeSpan to add.
        */
        public Add(val: TimeSpan): TimeSpan;
        /**
        * Returns a TimeSpan that represents the addition of the current TimeSpan's milliseconds to the provided milliseconds.
        * @param val The number of milliseconds to add.
        */
        public Add(val: number): TimeSpan;
        public Add(val: any): TimeSpan {
            if (val._type === "TimeSpan") {
                return new TimeSpan(this.Milliseconds + val.Milliseconds);
            }
            else {
                return new TimeSpan(this.Milliseconds + val);
            }
        }

        /**
        * Returns a TimeSpan that represents the multiplication of the current TimeSpan's milliseconds by the provided TimeSpan's milliseconds.
        * @param val The TimeSpan to multiply.
        */
        public Multiply(val: TimeSpan): TimeSpan;
        /**
        * Returns a TimeSpan that represents the multiplication of the current TimeSpan's milliseconds by the provided milliseconds.
        * @param val The number of milliseconds to multiply.
        */
        public Multiply(val: number): TimeSpan;
        public Multiply(val: any): TimeSpan {
            if (val._type === "TimeSpan") {
                return new TimeSpan(this.Milliseconds * val.Milliseconds);
            }
            else {
                return new TimeSpan(this.Milliseconds * val);
            }
        }

        /**
        * Returns a TimeSpan that represents the subtraction of the current TimeSpan's milliseconds by the provided TimeSpan's milliseconds.
        * @param val The TimeSpan to subtract by.
        */
        public Subtract(val: TimeSpan): TimeSpan;
        /**
        * Returns a TimeSpan that represents the subtraction of the current TimeSpan's milliseconds by the provided milliseconds.
        * @param val The number of milliseconds to subtract by.
        */
        public Subtract(val: number): TimeSpan;
        public Subtract(val: any): TimeSpan {
            if (val._type === "TimeSpan") {
                return new TimeSpan(this.Milliseconds - val.Milliseconds);
            }
            else {
                return new TimeSpan(this.Milliseconds - val);
            }
        }

        /**
        * Returns a TimeSpan that represents the subtraction of the current TimeSpan's milliseconds from the provided TimeSpan's milliseconds.
        * @param val The TimeSpan to subtract from.
        */
        public SubtractFrom(val: TimeSpan): TimeSpan;
        /**
        * Returns a TimeSpan that represents the subtraction of the current TimeSpan's milliseconds from the provided milliseconds.
        * @param val The number of milliseconds to subtract from.
        */
        public SubtractFrom(val: number): TimeSpan;
        public SubtractFrom(val: any): TimeSpan {
            if (val._type === "TimeSpan") {
                return new TimeSpan(val.Milliseconds - this.Milliseconds);
            }
            else {
                return new TimeSpan(val - this.Milliseconds);
            }
        }

        /**
        * Returns a TimeSpan that represents the division of the current TimeSpan's milliseconds by the provided TimeSpan's milliseconds.
        * @param val The TimeSpan to divide by.
        */
        public Divide(val: TimeSpan): TimeSpan;
        /**
        * Returns a TimeSpan that represents the division of the current TimeSpan's milliseconds by the provided milliseconds.
        * @param val The number of milliseconds to divide by.
        */
        public Divide(val: number): TimeSpan;
        public Divide(val: any): TimeSpan {
            if (val._type === "TimeSpan") {
                return new TimeSpan(this.Milliseconds / val.Milliseconds);
            }
            else {
                return new TimeSpan(this.Milliseconds / val);
            }
        }

        /**
        * Returns a TimeSpan that represents the division of the current TimeSpan's milliseconds from the provided TimeSpan's milliseconds.
        * @param val The TimeSpan to divide from.
        */
        public DivideFrom(val: TimeSpan): TimeSpan;
        /**
        * Returns a TimeSpan that represents the division of the current TimeSpan's milliseconds from the provided milliseconds.
        * @param val The number of milliseconds to divide from.
        */
        public DivideFrom(val: number): TimeSpan;
        public DivideFrom(val: any): TimeSpan {
            if (val._type === "TimeSpan") {
                return new TimeSpan(val.Milliseconds / this.Milliseconds);
            }
            else {
                return new TimeSpan(val / this.Milliseconds);
            }
        }

        /**
        * Determines whether this TimeSpan represents the same amount of time as the provided TimeSpan.
        * @param timeSpan The TimeSpan to compare the current TimeSpan to.
        */
        public Equivalent(timeSpan: TimeSpan): boolean {
            return this.Milliseconds === timeSpan.Milliseconds;
        }

        /**
        * Returns a TimeSpan that represents the same time interval.
        */
        public Clone(): TimeSpan {
            return new TimeSpan(this.Milliseconds);
        }

        /**
        * Overridden toString method to display TimeSpan in the ms:s:m format.
        */
        public toString(): string {
            return this.Milliseconds + ":" + this.Seconds + ":" + this.Minutes;
        }

        /**
        * Returns a TimeSpan that represents the specified number of milliseconds.
        * @param val Number of milliseconds.
        */
        public static FromMilliseconds(val: number): TimeSpan {
            return new TimeSpan(val);
        }

        /**
        * Returns a TimeSpan that represents the specified number of seconds.
        * @param val Number of seconds.
        */
        public static FromSeconds(val: number): TimeSpan {
            return new TimeSpan(0, val);
        }

        /**
        * Returns a TimeSpan that represents the specified number of minutes.
        * @param val Number of minutes.
        */
        public static FromMinutes(val: number): TimeSpan {
            return new TimeSpan(0, 0, val);
        }        

        /**
        * Returns a TimeSpan that represents the time between the two dates.
        * @param from The from date.
        * @param to The to date.
        */
        public static DateSpan(from: Date, to: Date): TimeSpan {
            return new TimeSpan(to.getTime() - from.getTime());
        }


        /**
        * Gets a TimeSpan that represents a 0 millisecond time interval.
        */
        public static get Zero(): TimeSpan {
            return new TimeSpan(0);
        }
    }

}
/* GameTime.ts */



module EndGate {

    /**
    * Defines a game time class that is used to manage update timing execution as well as total game time.
    */
    export class GameTime implements _.ITyped {
        public _type: string = "GameTime";

        // Start date
        private _start: Date;
        private _lastUpdate: Date;
        private _elapsed: TimeSpan;

        /**
        * Creates a new instance of the GameTime object.
        */
        constructor() {
            this._start = this._lastUpdate = new Date();

            this.Update();
        }

        /**
        * Gets the elapsed time since the last update.
        */
        public get Elapsed(): TimeSpan {
            return this._elapsed;
        }

        /**
        * Gets the current date time at the start of the update.
        */
        public get Now(): Date {
            return this._lastUpdate;
        }

        /**
        * Gets the total amount of time surpassed since construction.
        */
        public get Total(): TimeSpan {
            return TimeSpan.DateSpan(this._start, new Date());
        }

        /**
        * Updates the game time object.  Causes the gameTime to refresh all its components.
        */
        public Update(): void {
            var now = new Date();

            this._elapsed = new TimeSpan(now.getTime() - this._lastUpdate.getTime());
            this._lastUpdate = now;
        }
    }

}
/* IUpdateable.ts */


declare module EndGate {

    /**
    * Represents an object that can be updated.
    */
    export interface IUpdateable {
        /**
        * Updates the object.
        * @param gameTime The current game time object.
        */
        Update(gameTime: EndGate.GameTime): void;
    }

}
/* Size2d.ts */




module EndGate {

    /**
    * Defines a two dimensional size object which specifies a Width and Height.
    */
    export class Size2d implements _.ITyped, ICloneable {
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
        public static get Zero(): Size2d {
            return new Size2d(0, 0);
        }

        /**
        * Returns a Size2d with all its components set to one.
        */
        public static get One(): Size2d {
            return new Size2d(1, 1);
        }

        /**
        * Gets the radius that encompasses the two dimensional size of this Size2d.
        */
        public get Radius(): number {
            return .5 * Math.sqrt(this.Width * this.Width + this.Height * this.Height);
        }

        /**
        * Gets half of the Width component of this Size2d.
        */
        public get HalfWidth(): number {
            return this.Width / 2;
        }

        /**
        * Gets half of the Height component of this Size2d.
        */
        public get HalfHeight(): number {
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
        public Equivalent(size: Size2d): boolean {
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
/* IMoveable.ts */


declare module EndGate {

    /**
    * Represents an object that has a position and rotation.
    */
    export interface IMoveable {
        /**
        * Gets or sets the location of the moveable object.
        */
        Position: Vector2d;
        /**
        * Gets or sets the rotation of the moveable object.
        */
        Rotation: number;
    }

}
/* Bounds2d.ts */





module EndGate.Bounds {

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
        public ContainsPoint(point: Vector2d): boolean {
            throw new Error("This method is abstract!");
        }

        /**
        * Abstract: Determines if the current bounded object completely contains the provided BoundingCircle.
        * @param point A circle to check containment on.
        */
        public ContainsCircle(circle: BoundingCircle): boolean {
            throw new Error("This method is abstract!");
        }

        /**
        * Abstract: Determines if the current bounded object completely contains the provided BoundingRectangle.
        * @param point A rectangle to check containment on.
        */
        public ContainsRectangle(rectangle: BoundingRectangle): boolean {
            throw new Error("This method is abstract!");
        }

        /**
        * Abstract: Determines if the current bounded object contains the provided Vector2d.
        * @param point A point to check containment on.
        */
        public Contains(point: Vector2d): boolean;
        /**
        * Abstract: Determines if the current bounded object completely contains another bounded object.
        * @param point A bounded object to check containment on.
        */
        public Contains(obj: Bounds2d): boolean;
        public Contains(obj: any): boolean {
            if (obj._boundsType === "BoundingCircle") {
                return this.ContainsCircle(obj);
            }
            else if (obj._boundsType === "BoundingRectangle") {
                return this.ContainsRectangle(obj);
            }
            else if(obj._type === "Vector2d") {
                return this.ContainsPoint(obj);
            }
            else {
                throw new Error("Cannot try and check contains with an unidentifiable object, must be a Vector2d, BoundingCircle or BoundingRectangle.");
            }
        }

        /**
        * Determines if the current bounded object intersects another bounded object.
        * @param obj Bounding object to check collision with.
        */
        public Intersects(obj: Bounds2d): boolean;        
        public Intersects(obj: any): boolean {
            if (obj._boundsType === "BoundingCircle") {
                return this.IntersectsCircle(obj);
            }
            else if (obj._boundsType === "BoundingRectangle") {
                return this.IntersectsRectangle(obj);
            }
            else {
                throw new Error("Cannot intersect with unidentifiable object, must be BoundingCircle or BoundingRectangle.");
            }
        }

        /**
        * Abstract: Determines if the current bounded object is intersecting the provided BoundingCircle.
        * @param circle BoundingCircle to check intersection with.
        */
        public IntersectsCircle(circle: BoundingCircle): boolean {
            throw new Error("This method is abstract!");
        }

        /**
        * Abstract: Determines if the current bounded object is intersecting the provided BoundingRectangle.
        * @param rectangle BoundingRectangle to check intersection with.
        */
        public IntersectsRectangle(rectangle: BoundingRectangle): boolean {
            throw new Error("This method is abstract!");
        }
    }

}
/* IRenderable.ts */


declare module EndGate.Rendering {

    /**
    * Represents a renderable object that can be drawn to a canvas.
    */
    export interface IRenderable {
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
        GetDrawBounds(): Bounds.Bounds2d;
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

    export class TimedCallback extends LooperCallback implements ITyped {
        public _type: string = "TimedCallback";

        constructor(fps: number, callback: Function) {
            super(callback);

            this.Fps = fps;
            this.TimeoutID = 0;
            this.Active = false;
        }

        public Fps: number;
        public TimeoutID: number;
        public Active: boolean;
    }

}
/* Looper.ts */




module EndGate._.Loopers {

    export class Looper implements ILooper {
        public _type: string = "Looper";

        private _running: boolean;
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

        private _running: boolean;
        private _callbacksModified: boolean;
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

            if (this._updateCallbacks[game._ID]) {
                updateCallback = this._updateCallbacks[game._ID];
                drawCallback = this._drawCallbacks[game._ID];

                this._updateLoop.RemoveCallback(updateCallback);
                this._drawLoop.RemoveCallback(drawCallback);
                delete this._updateCallbacks[game._ID];
                delete this._drawCallbacks[game._ID];

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
                game._PrepareUpdate();
            });

            this._updateCallbacks[game._ID] = updateCallback;            

            return updateCallback;
        }

        private CreateAndCacheDrawCallback(game: Game): Loopers.LooperCallback {
            var drawCallback = new Loopers.LooperCallback(() => {
                game._PrepareDraw();
            });

            this._drawCallbacks[game._ID] = drawCallback;

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
/* EventHandler.ts */



module EndGate {

    /**
    * Defines an event handler object that can maintain bound functions and trigger them on demand.
    */
    export class EventHandler implements _.ITyped {
        public _type: string = "Event";

        private _actions: Array<Function>;
        private _hasBindings: boolean;

        /**
        * Creates a new instance of the EventHandler object.
        */
        constructor() {
            this._actions = [];
            this._hasBindings = false;
        }

        /**
        * Binds the provided action to the EventHandler.  Trigger will execute all bound functions.
        * @param action Function to execute on EventHandler Trigger.
        */
        public Bind(action: Function): void {
            this._actions.push(action);
            this._hasBindings = true;
        }

        /**
        * Unbinds the provided action from the EventHandler.
        * @param action Function to unbind.  The action will no longer be executed when the EventHandler gets Triggered.
        */
        public Unbind(action: Function): void {
            var foo = this._actions[i];

            for (var i = 0; i < this._actions.length; i++) {
                if (this._actions[i] === action) {
                    this._actions.splice(i, 1);

                    this._hasBindings = this._actions.length > 0;
                    return;
                }
            }
        }

        /**
        * Determines if the EventHandler has active bindings.
        */
        public HasBindings(): boolean {
            return this._hasBindings;
        }

        /**
        * Executes all bound functions and passes the provided args to each.
        */
        public Trigger(): void {
            for (var i = 0; i < this._actions.length; i++) {
                this._actions[i]();
            }
        }
    }

}
/* CollisionConfiguration.ts */



module EndGate.Collision {

    /**
    * Defines a CollisionConfiguration object that is used to configure and optimize the collision manager.
    */
    export class CollisionConfiguration {
        public static _DefaultMinQuadTreeNodeSize: Size2d = new Size2d(32);

        private _minQuadTreeNodeSize: Size2d;
        private _initialQuadTreeSize: Size2d;

        constructor(initialQuadTreeSize: Size2d) {
            this._initialQuadTreeSize = initialQuadTreeSize;
            this._minQuadTreeNodeSize = CollisionConfiguration._DefaultMinQuadTreeNodeSize;
            this._OnChange = new EventHandler();
        }

        public _OnChange: EventHandler;

        /**
        * Gets or sets the minimum quad tree node size.  For best performance this value should be equivalent to the smallest collidable object that will be monitored by the CollisionManager.  Changing this value re-creates the collision manager.  Values must represent a square.
        */
        public get MinQuadTreeNodeSize(): Size2d {
            return this._minQuadTreeNodeSize.Clone();
        }
        public set MinQuadTreeNodeSize(newSize: Size2d) {
            if (newSize.Width !== newSize.Height) {
                throw new Error("MinQuadTreeNodeSize must be a square.  Width and height must be identical.");
            }

            this._minQuadTreeNodeSize = newSize;
            this._OnChange.Trigger();
        }

        /**
        * Gets or sets the initial quad tree size.  The quad tree used for collision detection will dynamically grow in size if items drift outside of its boundaries.  If this property is set it will re-instantiate a new quad tree.  Values must be divisible by the MinQuadTreeNodeSize and must represent a square.
        */
        public get InitialQuadTreeSize(): Size2d {
            return this._initialQuadTreeSize;
        }
        public set InitialQuadTreeSize(newSize: Size2d) {
            if (newSize.Width !== newSize.Height) {
                throw new Error("InitialQuadTreeSize must be a square.  Width and height must be identical.");
            }
            else if (newSize.Width % this._minQuadTreeNodeSize.Width !== 0) {
                throw new Error("InitialQuadTreeSize must be divisible by the MinQuadTreeNodeSize.");
            }

            this._initialQuadTreeSize = newSize;
            this._OnChange.Trigger();
        }
    }

}
/* GameConfiguration.ts */



module EndGate {

    /**
    * Defines a GameConfiguration object that is used to represent the current state of a Game object.
    */
    export class GameConfiguration {
        /**
        * Indicates whether the game will only draw after an update.  If there are graphic modifications outside of the game update loop this should be set to 'false' to ensure the latest data is always drawn to the game screen.
        */
        public DrawOnlyAfterUpdate: boolean;

        private _defaultUpdateRate: number = 40;
        private _updateRateSetter: (updateRate: number) => void;
        private _updateRate: number;
        private _collisionConfiguration: Collision.CollisionConfiguration;

        /**
        * Creates a new instance of the GameConfiguration object.
        * @param updateRateSetter A function that updates the rate of "Update" execution.
        */
        constructor(updateRateSetter: (updateRate: number) => void , initialQuadTreeSize: Size2d) {
            this.DrawOnlyAfterUpdate = true;

            this._updateRateSetter = updateRateSetter;
            this._updateRate = this._defaultUpdateRate;
            this._collisionConfiguration = new Collision.CollisionConfiguration(initialQuadTreeSize);            
        }

        /**
        * Gets or sets the UpdateRate of the game.  Update rates are represented as X many updates per second.
        */
        public get UpdateRate(): number {
            return this._updateRate;
        }
        public set UpdateRate(updateRate: number) {
            this._updateRate = updateRate;
            this._updateRateSetter(this._updateRate);
        }

        /**
        * Gets the CollisionConfiguration of the game.  These configurations are used to optimize the collision management performance.
        */
        public get CollisionConfiguration(): Collision.CollisionConfiguration {
            return this._collisionConfiguration;
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
    export class BoundingCircle extends Bounds2d implements _.ITyped {
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
        public IntersectsCircle(circle: BoundingCircle): boolean {
            return this.Position.Distance(circle.Position).Length() < this.Radius + circle.Radius;
        }

        /**
        * Determines if the current BoundingCircle is intersecting the provided BoundingRectangle.
        * @param rectangle BoundingRectangle to check intersection with.
        */
        public IntersectsRectangle(rectangle: BoundingRectangle): boolean {
            var translated = (rectangle.Rotation === 0)
                                  ? this.Position
                                  : this.Position.RotateAround(rectangle.Position, -rectangle.Rotation);

            var circleDistance = translated.Distance(rectangle.Position);

            if (circleDistance.X > (rectangle.Size.HalfWidth + this.Radius)) { return false; }
            if (circleDistance.Y > (rectangle.Size.HalfHeight + this.Radius)) { return false; }

            if (circleDistance.X <= (rectangle.Size.HalfWidth)) { return true; }
            if (circleDistance.Y <= (rectangle.Size.HalfHeight)) { return true; }

            var cornerDistance_sq = Math.pow(circleDistance.X - rectangle.Size.HalfWidth, 2) + Math.pow(circleDistance.Y - rectangle.Size.HalfHeight, 2);

            return (cornerDistance_sq <= (this.Radius * this.Radius));
        }

        /**
        * Determines if the current BoundingCircle contains the provided Vector2d.
        * @param point A point.
        */
        public ContainsPoint(point: Vector2d): boolean {
            return this.Position.Distance(point).Magnitude() < this.Radius;
        }

        /**
        * Determines if the current BoundingCircle completely contains the provided BoundingCircle.
        * @param point A circle to check containment on.
        */
        public ContainsCircle(circle: BoundingCircle): boolean {
            return circle.Position.Distance(this.Position).Length() + circle.Radius <= this.Radius;
        }

        /**
        * Determines if the current BoundingCircle completely contains the provided BoundingRectangle.
        * @param point A rectangle to check containment on.
        */
        public ContainsRectangle(rectangle: BoundingRectangle): boolean {
            var corners = rectangle.Corners();

            for (var i = 0; i < corners.length; i++) {
                if (!this.ContainsPoint(corners[i])) {
                    return false;
                }
            }

            return true;
        }
    }

}
/* BoundingRectangle.ts */





module EndGate.Bounds {

    /**
    * Defines a rectangle that can be used to detect intersections.
    */
    export class BoundingRectangle extends Bounds2d implements _.ITyped {
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
        * Gets the top left corner of the BoundingRectangle.
        */
        public get TopLeft(): Vector2d {
            if (this.Rotation === 0) {
                return new Vector2d(this.Position.X - this.Size.HalfWidth, this.Position.Y - this.Size.HalfHeight);
            }

            return new Vector2d(this.Position.X - this.Size.HalfWidth, this.Position.Y - this.Size.HalfHeight).RotateAround(this.Position, this.Rotation);
        }

        /** 
        * Gets the top right corner of the BoundingRectangle.
        */
        public get TopRight(): Vector2d {
            if (this.Rotation === 0) {
                return new Vector2d(this.Position.X + this.Size.HalfWidth, this.Position.Y - this.Size.HalfHeight);
            }

            return new Vector2d(this.Position.X + this.Size.HalfWidth, this.Position.Y - this.Size.HalfHeight).RotateAround(this.Position, this.Rotation);
        }

        /** 
        * Gets the bottom left corner of the BoundingRectangle.
        */
        public get BotLeft(): Vector2d {
            if (this.Rotation === 0) {
                return new Vector2d(this.Position.X - this.Size.HalfWidth, this.Position.Y + this.Size.HalfHeight);
            }

            return new Vector2d(this.Position.X - this.Size.HalfWidth, this.Position.Y + this.Size.HalfHeight).RotateAround(this.Position, this.Rotation);
        }

        /** 
        * Gets the bottom right corner of the BoundingRectangle.
        */
        public get BotRight(): Vector2d {
            if (this.Rotation === 0) {
                return new Vector2d(this.Position.X + this.Size.HalfWidth, this.Position.Y + this.Size.HalfHeight);
            }

            return new Vector2d(this.Position.X + this.Size.HalfWidth, this.Position.Y + this.Size.HalfHeight).RotateAround(this.Position, this.Rotation);
        }

        /**
        * Returns a list of vertices that are the locations of each corner of the BoundingRectangle. Format: [TopLeft, TopRight, BotLeft, BotRight].
        */
        public Corners(): Vector2d[] {
            return [this.TopLeft, this.TopRight, this.BotLeft, this.BotRight];
        }

        /**
        * Determines if the current BoundingRectangle is intersecting the provided BoundingCircle.
        * @param circle BoundingCircle to check intersection with.
        */
        public IntersectsCircle(circle: BoundingCircle): boolean {
            return circle.IntersectsRectangle(this);
        }

        /**
        * Determines if the current BoundingRectangle is intersecting the provided BoundingRectangle.
        * @param rectangle BoundingRectangle to check intersection with.
        */
        public IntersectsRectangle(rectangle: BoundingRectangle): boolean {
            if (this.Rotation === 0 && rectangle.Rotation === 0) {
                var myTopLeft = this.TopLeft,
                    myBotRight = this.BotRight,
                    theirTopLeft = rectangle.TopLeft,
                    theirBotRight = rectangle.BotRight;

                return theirTopLeft.X <= myBotRight.X && theirBotRight.X >= myTopLeft.X && theirTopLeft.Y <= myBotRight.Y && theirBotRight.Y >= myTopLeft.Y;
            }
            else if (rectangle.Position.Distance(this.Position).Magnitude() <= rectangle.Size.Radius + this.Size.Radius) {// Check if we're somewhat close to the rectangle ect that we might be colliding with
                var axisList: Vector2d[] = [this.TopRight.Subtract(this.TopLeft), this.TopRight.Subtract(this.BotRight), rectangle.TopLeft.Subtract(rectangle.BotLeft), rectangle.TopLeft.Subtract(rectangle.TopRight)];
                var myVertices = this.Corners();
                var theirVertices = rectangle.Corners();

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
        public ContainsPoint(point: Vector2d): boolean {
            var savedRotation: number = this.Rotation;

            if (this.Rotation !== 0) {
                this.Rotation = 0;
                point = point.RotateAround(this.Position, -savedRotation);
            }

            var myTopLeft = this.TopLeft,
                myBotRight = this.BotRight;

            this.Rotation = savedRotation;

            return point.X <= myBotRight.X && point.X >= myTopLeft.X && point.Y <= myBotRight.Y && point.Y >= myTopLeft.Y;
        }

        /**
        * Determines if the current BoundingRectangle completely contains the provided BoundingCircle.
        * @param point A circle to check containment on.
        */
        public ContainsCircle(circle: BoundingCircle): boolean {
            return this.ContainsPoint(new Vector2d(circle.Position.X - circle.Radius, circle.Position.Y)) &&
                this.ContainsPoint(new Vector2d(circle.Position.X, circle.Position.Y - circle.Radius)) &&
                this.ContainsPoint(new Vector2d(circle.Position.X + circle.Radius, circle.Position.Y)) &&
                this.ContainsPoint(new Vector2d(circle.Position.X, circle.Position.Y + circle.Radius));
        }

        /**
        * Determines if the current BoundingCircle completely contains the provided BoundingRectangle.
        * @param point A rectangle to check containment on.
        */
        public ContainsRectangle(rectangle: BoundingRectangle): boolean {
            var corners = rectangle.Corners();

            for (var i = 0; i < corners.length; i++) {
                if (!this.ContainsPoint(corners[i])) {
                    return false;
                }
            }

            return true;
        }
    }

}
/* EventHandler1.ts */



module EndGate {

    /**
    * Defines a type constrained event handler object that can maintain bound functions which take in a value T and trigger them on demand.
    */
    export class EventHandler1<T> implements _.ITyped {
        public _type: string = "Event";

        private _actions: Array<(val: T) => any>;
        private _hasBindings: boolean;

        /**
        * Creates a new instance of the EventHandler object.
        */
        constructor() {
            this._actions = [];
            this._hasBindings = false;
        }

        /**
        * Binds the provided action to the EventHandler1.  Trigger will execute all bound functions.
        * @param action Function to execute on EventHandler Trigger.
        */
        public Bind(action: (val: T) => any): void {
            this._actions.push(action);
            this._hasBindings = true;
        }

        /**
        * Unbinds the provided action from the EventHandler1.
        * @param action Function to unbind.  The action will no longer be executed when the EventHandler gets Triggered.
        */
        public Unbind(action: (val: T) => any): void {
            for (var i = 0; i < this._actions.length; i++) {
                if (this._actions[i] === action) {
                    this._actions.splice(i, 1);

                    this._hasBindings = this._actions.length > 0;
                    return;
                }
            }
        }

        /**
        * Determines if the EventHandler1 has active bindings.
        */
        public HasBindings(): boolean {
            return this._hasBindings;
        }

        /**
        * Executes all bound functions and passes the provided args to each.
        * @param val The argument to pass to the bound functions.
        */
        public Trigger(val: T): void {
            for (var i = 0; i < this._actions.length; i++) {
                this._actions[i](val);
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
        * Who collided with you.
        */
        public With: Collidable;

        /**
        * Creates a new instance of the CollisionData object.
        * @param w Initial value of the With component of CollisionData.
        */
        constructor(w: Collidable) {
            this.With = w;
        }
    }

}
/* Collidable.ts */







module EndGate.Collision {

    /**
    * Defines a collidable object that can be used to detect collisions with other objects.
    */
    export class Collidable implements IDisposable, EndGate._.ITyped {
        public _type: string = "Collidable";
        public _id: number;

        /**
        * Gets or sets the Bounds of the collidable.
        */
        public Bounds: Bounds.Bounds2d;

        private static _collidableIDs: number = 0;
        private _disposed: boolean;
        private _onCollision: EventHandler1<Assets.CollisionData>;
        private _onDisposed: EventHandler1<Collidable>;

        /**
        * Creates a new instance of Collidable.
        * @param bounds Initial bounds for the Collidable.
        */
        constructor(bounds: Bounds.Bounds2d) {
            this._disposed = false;
            this.Bounds = bounds;
            this._id = Collidable._collidableIDs++;

            this._onCollision = new EventHandler1<Assets.CollisionData>();
            this._onDisposed = new EventHandler1<Collidable>();
        }

        /**
        * Gets an event that is triggered when a collision happens.  Functions can be bound or unbound to this event to be executed when the event triggers.
        */
        public get OnCollision(): EventHandler1<Assets.CollisionData> {
            return this._onCollision;
        }
        /**
        * Gets an event that is triggered when the Collidable has been disposed.  Functions can be bound or unbound to this event to be executed when the event triggers.
        */
        public get OnDisposed(): EventHandler1<Collidable> {
            return this._onDisposed;
        }

        /**
        * Determines if the provided collidable is colliding with this Collidable.
        * @param other Collidable to check collision with.
        */
        public IsCollidingWith(other: Collidable): boolean {
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
/* QuadTreeNode.ts */





module EndGate.Collision.Assets._ {

    export class QuadTreeNode extends Collidable {
        public Contents: Array<Collidable>;
        public Parent: QuadTreeNode;

        private _minNodeSize: Size2d;
        private _children: Array<QuadTreeNode>;
        private _partitioned: boolean;

        constructor(position: Vector2d, size: Size2d, minNodeSize: Size2d, parent: QuadTreeNode) {
            super(new Bounds.BoundingRectangle(position, size));
            this._minNodeSize = minNodeSize;
            this._children = new Array<QuadTreeNode>();
            this.Contents = new Array<Collidable>();
            this.Parent = parent;
            this._partitioned = false;
        }

        public get Children(): Array<QuadTreeNode> {
            return this._children;
        }

        public get TopLeftChild(): QuadTreeNode {
            return this._children[0];
        }
        public set TopLeftChild(newChild: QuadTreeNode) {
            this._children[0] = newChild;
        }

        public get TopRightChild(): QuadTreeNode {
            return this._children[1];
        }
        public set TopRightChild(newChild: QuadTreeNode) {
            this._children[1] = newChild;
        }

        public get BotLeftChild(): QuadTreeNode {
            return this._children[2];
        }
        public set BotLeftChild(newChild: QuadTreeNode) {
            this._children[2] = newChild;
        }

        public get BotRightChild(): QuadTreeNode {
            return this._children[3];
        }
        public set BotRightChild(newChild: QuadTreeNode) {
            this._children[3] = newChild;
        }

        public IsPartitioned(): boolean {
            return this._partitioned;
        }

        public Partition(): void {
            var partitionedSize = new Size2d(Math.round((<Bounds.BoundingRectangle>this.Bounds).Size.Width * .5)),
                boundsPosition = this.Bounds.Position;

            this._partitioned = true;

            if (partitionedSize.Width < this._minNodeSize.Width)
            {
                return;
            }

            this._children.push(new QuadTreeNode(boundsPosition.Subtract(partitionedSize.Multiply(.5)), partitionedSize, this._minNodeSize, this));
            this._children.push(new QuadTreeNode(new Vector2d(boundsPosition.X + partitionedSize.Width / 2, boundsPosition.Y - partitionedSize.Height / 2), partitionedSize, this._minNodeSize, this));
            this._children.push(new QuadTreeNode(new Vector2d(boundsPosition.X - partitionedSize.Width / 2, boundsPosition.Y + partitionedSize.Height / 2), partitionedSize, this._minNodeSize, this));
            this._children.push(new QuadTreeNode(boundsPosition.Add(partitionedSize.Multiply(.5)), partitionedSize, this._minNodeSize, this));
        }

        public Insert(obj: Collidable): QuadTreeNode {
            if (!this._partitioned) {
                this.Partition();
            }

            for (var i = 0; i < this._children.length; i++) {
                if (this._children[i].Bounds.Contains(obj.Bounds)) {
                    return this._children[i].Insert(obj);
                }
            }

            this.Contents.push(obj);

            return this;
        }

        public ReverseInsert(obj: Collidable): QuadTreeNode {
            // Check if object has left the bounds of this node then go up another level
            if (!this.Bounds.Contains(obj.Bounds))
            {
                if (this.Parent != null)
                {
                    return this.Parent.ReverseInsert(obj);
                }
            }
            
            return this.Insert(obj);
        }

        public Query(queryArea: Bounds.BoundingRectangle): Array<Collidable> {
            var results = new Array<Collidable>(),
                child: QuadTreeNode;

            // Check if some of the items in this quadrant are partially contained within the query area
            for (var i = 0; i < this.Contents.length; i++) {
                if (queryArea.Intersects(this.Contents[i].Bounds)) {
                    results.push(this.Contents[i]);
                }
            }

            for (var i = 0; i < this._children.length; i++) {
                child = this._children[i];

                // If child fully contains the query area then we need to
                // drill down until we find all of the query items
                if (child.Bounds.Contains(queryArea))
                {
                    results = results.concat(child.Query(queryArea));
                    break;
                }
                
                // If the queryArea fully contains the node then everything
                // underneath it belongs to the query
                if (queryArea.Contains(child.Bounds))
                {
                    results = results.concat(child.GetSubTreeContents());
                    continue;
                }

                // If a sub-node intersects partially with the query then we
                // need to query its children to find valid nodes
                if (child.Bounds.Intersects(queryArea))
                {
                    results = results.concat(child.Query(queryArea));
                }
            }

            return results;
        }

        public Remove(obj: Collidable): void {
            var index = this.Contents.indexOf(obj);

            if (index >= 0) {
                this.Contents.splice(index, 1);
            }
        }

        public GetSubTreeContents(): Array<Collidable> {
            var results = new Array<Collidable>();

            for (var i = 0; i < this._children.length; i++) {
                results = results.concat(this._children[i].GetSubTreeContents());
            }

            results = results.concat(this.Contents);

            return results;
        }
    }

}
/* QuadTree.ts */









module EndGate.Collision.Assets._ {

    export interface ICollidableMap {
        Node: QuadTreeNode;
        Collidable: Collidable;
        StaticPosition: boolean;
    }

    export class QuadTree implements IDisposable, IUpdateable {
        private _disposed: boolean;
        private _minNodeSize: Size2d;
        private _root: QuadTreeNode;
        private _collidableMap: { [id: number]: ICollidableMap };
        private _updateableCollidableMap: { [id: number]: ICollidableMap };

        constructor(configuration: CollisionConfiguration) {
            this._disposed = false;
            this._minNodeSize = configuration.MinQuadTreeNodeSize;
            this._collidableMap = {};
            this._updateableCollidableMap = {};

            this._root = new QuadTreeNode(new Vector2d(configuration.InitialQuadTreeSize.HalfWidth, configuration.InitialQuadTreeSize.HalfHeight), configuration.InitialQuadTreeSize, configuration.MinQuadTreeNodeSize, null);
        }

        public Insert(obj: Collidable, staticPosition: boolean = false): void {
            if (!this._root.Bounds.Contains(obj.Bounds)) {
                this.Expand(obj);
            }

            this._collidableMap[obj._id] = {
                Node: this._root.Insert(obj),
                Collidable: obj,
                StaticPosition: staticPosition
            };

            if (!staticPosition) {
                this._updateableCollidableMap[obj._id] = this._collidableMap[obj._id];
            }
        }

        public Remove(obj: Collidable): void {
            var node = this._collidableMap[obj._id].Node;

            delete this._collidableMap[obj._id];
            delete this._updateableCollidableMap[obj._id];

            node.Remove(obj);
        }

        public CollisionCandidates(obj: Collidable): Array<Collidable> {
            var node: QuadTreeNode = this._collidableMap[obj._id].Node,
                results: Array<Collidable> = node.GetSubTreeContents();

            // Collect parent contents
            while (node.Parent !== null) {
                results = results.concat(node.Parent.Contents);

                node = node.Parent;
            }

            return results;
        }

        public Query(queryArea: Bounds.BoundingRectangle): Array<Collidable> {
            return this._root.Query(queryArea);
        }

        public Expand(cause: Collidable): void {
            var rootBounds: Bounds.BoundingRectangle = (<Bounds.BoundingRectangle>this._root.Bounds),
                topLeftDistance = rootBounds.TopLeft.Distance(cause.Bounds.Position).Length(),
                topRightDistance = rootBounds.TopRight.Distance(cause.Bounds.Position).Length(),
                botLeftDistance = rootBounds.BotLeft.Distance(cause.Bounds.Position).Length(),
                botRightDistance = rootBounds.BotRight.Distance(cause.Bounds.Position).Length(),
                closestCornerDistance = Math.min(topLeftDistance, topRightDistance, botLeftDistance, botRightDistance),
                newSize = rootBounds.Size.Multiply(2),
                newRoot: QuadTreeNode;

            if (closestCornerDistance === topLeftDistance) { // Current root will be bottom right of expanded quad tree because we need to expand to the top left
                newRoot = new QuadTreeNode(rootBounds.TopLeft, newSize, this._minNodeSize, null);
                newRoot.Partition();
                newRoot.BotRightChild = this._root;
            }
            else if (closestCornerDistance === topRightDistance) { // Current root will be bottom left of expanded quad tree because we need to expand to the top right
                newRoot = new QuadTreeNode(rootBounds.TopRight, newSize, this._minNodeSize, null);
                newRoot.Partition();
                newRoot.BotLeftChild = this._root;
            }
            else if (closestCornerDistance === botLeftDistance) { // Current root will be top right of expanded quad tree because we need to expand to the bottom left
                newRoot = new QuadTreeNode(rootBounds.BotLeft, newSize, this._minNodeSize, null);
                newRoot.Partition();
                newRoot.TopRightChild = this._root;
            }
            else if (closestCornerDistance === botRightDistance) { // Current root will be top left of expanded quad tree because we need to expand to the bottom right
                newRoot = new QuadTreeNode(rootBounds.BotRight, newSize, this._minNodeSize, null);
                newRoot.Partition();
                newRoot.TopLeftChild = this._root;
            }

            this._root.Parent = newRoot;
            this._root = newRoot;
        }

        public Update(gameTime: GameTime): void {
            var node: QuadTreeNode, lookup: ICollidableMap, collidable: Collidable, newNode: QuadTreeNode;

            for (var id in this._updateableCollidableMap) {
                lookup = this._updateableCollidableMap[id];
                node = lookup.Node;
                collidable = lookup.Collidable;

                node.Remove(collidable);

                // If one of the collidables has drifted outside the root bounds, expand the quad tree
                if (!this._root.Bounds.Contains(collidable.Bounds)) {
                    this.Expand(collidable);
                    newNode = this._root.Insert(collidable);
                }
                else {
                    // Check if object has left the bounds of this node and is not root
                    if (!node.Bounds.Contains(collidable.Bounds) && node.Parent != null)
                    {
                        // We now belong to a parent
                        newNode = node.Parent.ReverseInsert(collidable);
                    }
                    else // We're within the same node, but could be in children, must insert
                    {
                        newNode = node.Insert(collidable);
                    }
                }

                // This will update the _collidableMap as well since its referencing the same object.
                this._updateableCollidableMap[id].Node = newNode;
            }
        }

        public Dispose(): void {
            if (!this._disposed) {
                this._disposed = true;
            }
            else {
                throw new Error("Cannot dispose collidable more than once.");
            }
        }
    }

}
/* EventHandler2.ts */



module EndGate {

    /**
    * Defines a type constrained event handler object that can maintain bound functions which take in a value T and U and trigger them on demand.
    */
    export class EventHandler2<T, U> implements _.ITyped {
        public _type: string = "Event";

        private _actions: Array<(val1: T, val2: U) => any>;
        private _hasBindings: boolean;

        /**
        * Creates a new instance of the EventHandler2 object.
        */
        constructor() {
            this._actions = [];
            this._hasBindings = false;
        }

        /**
        * Binds the provided action to the EventHandler2.  Trigger will execute all bound functions.
        * @param action Function to execute on EventHandler2 Trigger.
        */
        public Bind(action: (val1: T, val2: U) => any): void {
            this._actions.push(action);
            this._hasBindings = true;
        }

        /**
        * Unbinds the provided action from the EventHandler2.
        * @param action Function to unbind.  The action will no longer be executed when the EventHandler gets Triggered.
        */
        public Unbind(action: (val1: T, val2: U) => any): void {
            for (var i = 0; i < this._actions.length; i++) {
                if (this._actions[i] === action) {
                    this._actions.splice(i, 1);

                    this._hasBindings = this._actions.length > 0;
                    return;
                }
            }
        }

        /**
        * Determines if the EventHandler2 has active bindings.
        */
        public HasBindings(): boolean {
            return this._hasBindings;
        }

        /**
        * Executes all bound functions and passes the provided args to each.
        * @param val1 The first argument to pass to the bound functions.
        * @param val2 The second argument to pass to the bound functions.
        */
        public Trigger(val1: T, val2: U): void {
            for (var i = 0; i < this._actions.length; i++) {
                this._actions[i](val1, val2);
            }
        }
    }

}
/* CollisionManager.ts */









module EndGate.Collision {

    /**
    * Defines a manager that will check for collisions between objects that it is monitoring.
    */
    export class CollisionManager implements IUpdateable, EndGate._.ITyped {
        public _type: string = "CollisionManager";
        private _collidables: Collidable[];
        private _nonStaticCollidables: Collidable[];
        public _quadTree: Assets._.QuadTree;
        private _onCollision: EventHandler2<Collidable, Collidable>;
        private _enabled: boolean;

        /**
        * Creates a new instance of CollisionManager.
        */
        constructor(configuration: CollisionConfiguration) {
            this._collidables = [];
            this._nonStaticCollidables = [];
            this._quadTree = new Assets._.QuadTree(configuration);
            this._enabled = false;
            this._onCollision = new EventHandler2<Collidable, Collidable>();
        }

        /**
        * Gets an event that is triggered when a collision happens among two of the monitored objects.  Functions can be bound or unbound to this event to be executed when the event triggers.
        */
        public get OnCollision(): EventHandler2<Collidable, Collidable> {
            return this._onCollision;
        }

        /**
        * Monitors the provided collidable and will trigger its Collided function and OnCollision event whenever a collision occurs with it and another Collidable.
        * If the provided collidable gets disposed it will automatically become unmonitored.
        * @param obj Collidable to monitor.
        */
        public Monitor(obj: Collidable): void;
        /**
        * Monitors the provided collidable and will trigger its Collided function and OnCollision event whenever a collision occurs with it and another Collidable.
        * If the provided collidable gets disposed it will automatically become unmonitored.
        * Note: staticPosition'd collidable's will not collide with each other.
        * @param obj Collidable to monitor.
        * @param staticPosition Whether the Collidable will be stationary.  This value defaults to false.
        */
        public Monitor(obj: Collidable, staticPosition: boolean): void;
        public Monitor(obj: Collidable, staticPosition: boolean = false): void {
            this._enabled = true;

            obj.OnDisposed.Bind(() => {
                this.Unmonitor(obj);
            });

            this._collidables.push(obj);

            if (!staticPosition) {
                this._nonStaticCollidables.push(obj);
            }

            this._quadTree.Insert(obj);
        }

        /**
        * Unmonitors the provided collidable.  The Collided function and OnCollision event will no longer be triggered when an actual collision may have occurred.
        * Disposing a monitored collidable will automatically be unmonitored
        * @param obj Collidable to unmonitor.
        */
        public Unmonitor(obj: Collidable): void {
            var index = this._collidables.indexOf(obj);
            
            if (index >= 0) {
                this._collidables.splice(index, 1);
            }

            index = this._nonStaticCollidables.indexOf(obj);

            if (index >= 0) {
                this._nonStaticCollidables.splice(index, 1);
            }

            this._quadTree.Remove(obj);
        }

        /**
        * Checks for collisions within its monitored objects.  Games CollisionManager's automatically have their Update functions called at the beginning of each update loop.
        * @param gameTime The current game time object.
        */
        public Update(gameTime: GameTime): void {
            var collidable: Collidable,
                hash: string,
                candidates: Array<Collidable>,
                cacheMap: { [ids: string]: boolean; } = {},
                colliding: Array<Array<Collidable>> = new Array<Array<Collidable>>();

            if (this._enabled) {
                // Update the structure of the quad tree, this accounts for moving objects
                this._quadTree.Update(gameTime);

                // Determine colliding objects
                for (var i = 0; i < this._nonStaticCollidables.length; i++) {
                    collidable = this._nonStaticCollidables[i];
                    candidates = this._quadTree.CollisionCandidates(collidable);

                    for (var j = 0; j < candidates.length; j++) {
                        // If we're colliding with someone else
                        if (collidable._id !== candidates[j]._id && collidable.IsCollidingWith(candidates[j])) {
                            colliding.push([collidable, candidates[j]]);
                        }
                    }
                }

                // Dispatch collision events
                for (var i = 0; i < colliding.length; i++) {
                    hash = this.HashIds(colliding[i][0], colliding[i][1]);

                    if (!cacheMap[hash]) {
                        cacheMap[hash] = true;

                        colliding[i][0].Collided(new Assets.CollisionData(colliding[i][1]));
                        colliding[i][1].Collided(new Assets.CollisionData(colliding[i][0]));

                        this.OnCollision.Trigger(colliding[i][0], colliding[i][1]);
                    }
                }
            }
        }

        private HashIds(c1: Collidable, c2: Collidable): string {
            return Math.min(c1._id, c2._id).toString() + Math.max(c2._id, c1._id).toString();
        }

    }

}
/* Graphic2dState.ts */


module EndGate.Graphics.Assets._ {

    export class Graphic2dState {
        private _cachedState: { [property: string]: any; };

        constructor() {
            this._cachedState = {};
        }

        public get StrokeStyle(): string {
            return this._cachedState["strokeStyle"];
        }
        public set StrokeStyle(value: string) {
            this._cachedState["strokeStyle"] = value
        }

        public get FillStyle(): string {
            return this._cachedState["fillStyle"];
        }
        public set FillStyle(value: string) {
            this._cachedState["fillStyle"] = value;
        }

        public get GlobalAlpha(): number {
            return this._cachedState["globalAlpha"];
        }
        public set GlobalAlpha(value: number) {
            this._cachedState["globalAlpha"] = value;
        }

        public get LineWidth(): number {
            return this._cachedState["lineWidth"];
        }
        public set LineWidth(value: number) {
            this._cachedState["lineWidth"] = value;
        }

        public get LineCap(): string {
            return this._cachedState["lineCap"];
        }
        public set LineCap(value: string) {
            this._cachedState["lineCap"] = value;
        }

        public get LineJoin(): string {
            return this._cachedState["lineJoin"];
        }
        public set LineJoin(value: string) {
            this._cachedState["lineJoin"] = value;
        }

        public get MiterLimit(): number {
            return this._cachedState["miterLimit"];
        }
        public set MiterLimit(value: number) {
            this._cachedState["miterLimit"] = value;
        }

        public get ShadowOffsetX(): number {
            return this._cachedState["shadowOffsetX"];
        }
        public set ShadowOffsetX(value: number) {
            this._cachedState["shadowOffsetX"] = value;
        }

        public get ShadowOffsetY(): number {
            return this._cachedState["shadowOffsetY"];
        }
        public set ShadowOffsetY(value: number) {
            this._cachedState["shadowOffsetY"] = value;
        }

        public get ShadowBlur(): number {
            return this._cachedState["shadowBlur"];
        }
        public set ShadowBlur(value: number) {
            this._cachedState["shadowBlur"] = value;
        }

        public get ShadowColor(): string {
            return this._cachedState["shadowColor"];
        }
        public set ShadowColor(value: string) {
            this._cachedState["shadowColor"] = value;
        }

        public get GlobalCompositeOperation(): string {
            return this._cachedState["globalCompositeOperation"];
        }
        public set GlobalCompositeOperation(value: string) {
            this._cachedState["globalCompositeOperation"] = value;
        }

        public get Font(): string {
            return this._cachedState["font"];
        }
        public set Font(value: string) {
            this._cachedState["font"] = value;
        }

        public get TextAlign(): string {
            return this._cachedState["textAlign"];
        }
        public set TextAlign(value: string) {
            this._cachedState["textAlign"] = value;
        }

        public get TextBaseline(): string {
            return this._cachedState["textBaseline"];
        }
        public set TextBaseline(value: string) {
            this._cachedState["textBaseline"] = value;
        }

        public SetContextState(context: CanvasRenderingContext2D): void {
            for (var key in this._cachedState) {
                context[key] = this._cachedState[key];
            }
        }
    }

}
/* Graphic2d.ts */










module EndGate.Graphics {

    /**
    * Abstract drawable graphic type that is used create the base for graphics.
    */
    export class Graphic2d implements _.ITyped, Rendering.IRenderable, IMoveable, IDisposable {
        public _type: string = "Graphic2d";

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
        public Position: Vector2d;
        /**
        * Gets or sets the Rotation of the Graphic2d..
        */
        public Rotation: number;

        public _State: Assets._.Graphic2dState;

        public static _zindexSort: (a: Graphic2d, b: Graphic2d) => number = (a: Graphic2d, b: Graphic2d) => { return a.ZIndex - b.ZIndex; };

        private _children: Graphic2d[];
        private _onDisposed: EventHandler1<Graphic2d>;
        private _disposed: boolean;

        constructor(position: Vector2d) {
            this.Position = position;
            this.Rotation = 0;
            this.ZIndex = 0;
            this.Visible = true;
            this._State = new Assets._.Graphic2dState();
            this._children = [];
            this._disposed = false;
            this._onDisposed = new EventHandler1<Graphic2d>();
        }

        /**
        * Gets an event that is triggered when the Graphic2d has been disposed.  Functions can be bound or unbound to this event to be executed when the event triggers.
        */
        public get OnDisposed(): EventHandler1<Graphic2d> {
            return this._onDisposed;
        }

        /**
        * Gets or sets the current opacity.  Value is between 0 and 1.
        */
        public get Opacity(): number {
            return this._State.GlobalAlpha;
        }
        public set Opacity(alpha: number) {
            this._State.GlobalAlpha = alpha;
        }

        /**
        * Adds a child to the Graphic2d.  Children are drawn with relative positions to the parent Graphic2d.  Children
        * of a Graphic2d should not be added to the Scene, parent Graphic2d's are responsible for drawing their children.
        * @param graphic Child to add.
        */
        public AddChild(graphic: Graphic2d): void {
            this._children.push(graphic);
            this._children.sort(Graphic2d._zindexSort);
        }

        /**
        * Removes a child from the Graphic2d.  Returns a Boolean value indicating whether or not the child was able to be removed.
        * @param graphic Child to remove.
        */
        public RemoveChild(graphic: Graphic2d): boolean {
            var index = this._children.indexOf(graphic);

            if (index >= 0) {
                this._children.splice(index, 1);
                return true;
            }

            return false;
        }

        /**
        * Returns the list of children for the current Graphic2d.
        */
        public Children(): Graphic2d[]{
            return this._children;
        }

        public _StartDraw(context: CanvasRenderingContext2D): void {
            context.save();
            this._State.SetContextState(context);

            context.translate(this.Position.X, this.Position.Y);

            if (this.Rotation !== 0) {
                context.rotate(this.Rotation);
            }
        }

        public _EndDraw(context: CanvasRenderingContext2D): void {
            for (var i = 0; i < this._children.length; i++) {
                if (this._children[i].Visible) {
                    this._children[i].Draw(context);
                }
            }

            context.restore();
        }

        /**
        * Abstract: Should be overridden to draw the derived class onto the context.  If this graphic is part of a scene the Draw function will be called automatically.
        * @param context The canvas context to draw the graphic onto.
        */
        public Draw(context: CanvasRenderingContext2D): void {
            throw new Error("The Draw method is abstract on Graphic2d and should not be called.");
        }

        /**
        * Abstract: Should be overridden to return the bounding area that represents where the graphic will draw.
        */
        public GetDrawBounds(): Bounds.Bounds2d {
            throw new Error("GetDrawBounds is abstract, it must be implemented.");
        }

        /**
        * Triggers the OnDisposed event.  If this Graphic2d is used with a Scene2d it will be removed from the scene when disposed.
        */
        public Dispose(): void {
            if (!this._disposed) {
                this._disposed = true;

                // Dispose all children to ensure that there's no dangling references.
                for (var i = 0; i < this._children.length; i++) {
                    this._children[i].Dispose();
                }

                this.OnDisposed.Trigger(this);
            }
            else {
                throw new Error("Cannot dispose graphic more than once.");
            }
        }
    }

}
/* Camera2d.ts */




module EndGate.Rendering {

    /**
    * Defines a camera that is used to define a viewport.  Should be used in conjunction with a Camera2dRenderer to render graphics as if being viewed through a camera.
    */
    export class Camera2d extends Bounds.BoundingRectangle {
        /**
        *  The distance in which the Camera2d will default to and the distance that defines the 100% scale value.
        */
        public static DefaultDistance: number = 1000;
        public _type: string = "Camera2d";

        /**
        * Gets or sets the camera distance.  This represents how far away the Camera is from the game canvas.  0 is directly on top of the canvas while DefaultDistance represents 100% scale.
        */
        public Distance: number;

        /**
        * Creates a new instance of the Camera2d object.
        * @param position Initial position of the camera.
        * @param size Initial size of the camera.
        */
        constructor(position: Vector2d, size: Size2d) {
            super(position, size);

            this.Distance = Camera2d.DefaultDistance;
        }        

        /**
        * Converts an absolute position (0 to cameras Size) to a camera relative position.  Most useful when used to convert mouse click coordinates to scene coordinates.
        * @param position The absolute position to convert.  0 position represents the top or left hand side of the camera.
        */
        public ToCameraRelative(position: Vector2d): Vector2d {
            var scaledTopLeft = this.Position.Subtract(this.Size.Multiply(this._GetDistanceScale()* .5));
            return scaledTopLeft.Add(position.Multiply(this._GetDistanceScale()));
        }

        public _GetInverseDistanceScale(): number {
            return Camera2d.DefaultDistance / this.Distance;
        }

        public _GetDistanceScale(): number {
            return this.Distance / Camera2d.DefaultDistance;
        }
    }

}
/* IRenderer.ts */



declare module EndGate.Rendering._ {

    export interface IRenderer extends IDisposable {
        Render(renderables: IRenderable[]): CanvasRenderingContext2D;
    }

}
/* Renderer2d.ts */





module EndGate.Rendering {

    /**
    * Defines a 2d renderer that uses a double buffer to draw graphics.
    */
    export class Renderer2d implements _.IRenderer {
        public static _zindexSort: (a: IRenderable, b: IRenderable) => number = (a: IRenderable, b: IRenderable) => { return a.ZIndex - b.ZIndex; };

        public _BufferCanvas: HTMLCanvasElement;
        public _BufferContext: CanvasRenderingContext2D; // Protected

        // These essentially are used to create a double buffer for rendering
        private _visibleCanvas: HTMLCanvasElement;
        private _visibleContext: CanvasRenderingContext2D;
        private _disposed: boolean;
        private _onRendererSizeChange: EventHandler1<Size2d>;

        /**
        * Creates a new instance of the Renderer2d object.
        * @param renderOnto The canvas to render onto.
        */
        constructor(renderOnto: HTMLCanvasElement) {
            this._visibleCanvas = renderOnto;
            this._visibleContext = renderOnto.getContext("2d");

            // Create an equally sized canvas for a buffer
            this._BufferCanvas = <HTMLCanvasElement>document.createElement("canvas");
            this._BufferContext = this._BufferCanvas.getContext("2d");
            this._onRendererSizeChange = new EventHandler1<Size2d>();
            this.UpdateBufferSize();

            this._disposed = false;
        }

        /**
        * Gets an event that is triggered when the renderOnto canvas changes size.  Functions can be bound or unbound to this event to be executed when the event triggers.
        */
        public get OnRendererSizeChange(): EventHandler1<Size2d> {
            return this._onRendererSizeChange;
        }

        /**
        * Renders the provided renderables onto the renderOnto canvas.  Returns the canvas that was rendered onto.
        * @param renderables Array of items that are to be rendered, assumes Visible is set to true.
        */
        public Render(renderables: IRenderable[]): CanvasRenderingContext2D {
            // Check if our visible canvas has changed size
            if (this._BufferCanvas.width !== this._visibleCanvas.width || this._BufferCanvas.height !== this._visibleCanvas.height) {
                this.UpdateBufferSize();
            }

            // Push buffer to screen
            this._visibleContext.clearRect(0, 0, this._visibleCanvas.width, this._visibleCanvas.height);
            this._visibleContext.drawImage(this._BufferCanvas, 0, 0);
            // Clear our buffer to prepare it for new drawings
            this._ClearBuffer();

            // Sort the renderables by the ZIndex so we draw in the correct order (for layering);
            renderables.sort(Renderer2d._zindexSort);

            // We do not save or restore the canvas state because we want to let the
            // dev decide how they manipulate the canvas            

            for (var i = 0; i < renderables.length; i++) {
                renderables[i].Draw(this._BufferContext);
            }

            return this._BufferContext;
        }

        /**
        * Destroys the visible canvas.
        */
        public Dispose(): void {
            if (!this._disposed) {
                this._disposed = true;

                this._visibleCanvas.parentNode.removeChild(this._visibleCanvas);
            }
        }

        public _ClearBuffer() {
            this._BufferContext.clearRect(0, 0, this._BufferCanvas.width, this._BufferCanvas.height);
        }

        private UpdateBufferSize() {
            this._BufferCanvas.width = this._visibleCanvas.width;
            this._BufferCanvas.height = this._visibleCanvas.height;
            this.OnRendererSizeChange.Trigger(new Size2d(this._visibleCanvas.width, this._visibleCanvas.height))
        }
    }

}
/* Camera2dCanvasContextBuilder.ts */




module EndGate.Rendering._ {

    /**
    * Defines a builder that is used to build a camera sensitive CanvasRenderingContext2d so that anything drawn to it becomes relative to the Camera2d.
    */
    export class Camera2dCanvasContextBuilder {
        private _camera: Camera2d;
        private _canvasCenter: Vector2d;
        private _translated: boolean;
        private _translationState: any[];

        /**
        * Creates a new instance of the Camera2dCanvasContextBuilder object.
        * @param camera Camera to link to built CanvasRenderingContext2d's (Cannot change after construction).
        */
        constructor(camera: Camera2d) {
            this._camera = camera;
            this._canvasCenter = this._camera.Position.Clone();
            this._translated = false;
            this._translationState = [];
            this._translationState.push(this._translated);
        }

        /**
        * Builds a new CanvasRenderingContext2d around the provided context that is linked to the camera.  Anything drawn to the context becomes relative to the camera.
        * @param context The context to build the camera linked context around.
        */
        public Build(context: CanvasRenderingContext2D): CanvasRenderingContext2D {
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
                var scale = that._camera._GetDistanceScale();
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
                    scale = that._camera._GetDistanceScale();

                    arguments[0] += -that._camera.Position.X + that._canvasCenter.X * scale;
                    arguments[1] += -that._camera.Position.Y + that._canvasCenter.Y * scale;
                }

                that._translated = true;

                savedTranslate.apply(this, arguments);
            };

            return context;
        }

        public _UpdateCanvasCenter(newSize: Size2d): void {
            this._canvasCenter.X = newSize.Width / 2;
            this._canvasCenter.Y = newSize.Height / 2;
        }

        private BuildPositionReplacer(replacee: Function, positionArgOffset: number = 0, argCount: number = 2): any {
            var that = this,
                axiList = ["X", "Y"];

            return function () {
                var scale: number,
                    axi: string;

                if (!that._translated) {
                    scale = that._camera._GetDistanceScale();
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

    /**
    * Defines a camera rendering object that when used in conjunction with a Camera2d draws all objects in a camera relative position.
    */
    export class Camera2dRenderer extends Renderer2d {
        private _camera: Camera2d;
        private _contextBuilder: _.Camera2dCanvasContextBuilder;

        /**
        * Creates a new instance of the Camera2dRenderer.
        * @param renderOnto The canvas to render onto.
        * @param camera The camera that ultimately decides what is drawn to the renderOnto canvas.
        */
        constructor(renderOnto: HTMLCanvasElement, camera: Camera2d) {
            super(renderOnto);

            this._camera = camera;
            this._contextBuilder = new _.Camera2dCanvasContextBuilder(this._camera);

            this.OnRendererSizeChange.Bind(this._contextBuilder._UpdateCanvasCenter);
            this._contextBuilder._UpdateCanvasCenter(new Size2d(renderOnto.width, renderOnto.height));
            this._BufferContext = this._contextBuilder.Build(this._BufferContext);

        }

        /**
        * Renders the provided renderables onto the renderOnto canvas.  Returns the canvas that was rendered onto.
        * @param renderables Array of items that are to be rendered. 
        */
        public Render(renderables: IRenderable[]): CanvasRenderingContext2D {
            var context,
                inverseScale = this._camera._GetInverseDistanceScale();

            this._BufferContext.save();
            this._BufferContext.scale(inverseScale, inverseScale)

            context = super.Render(this.GetOnScreenRenderables(renderables));

            this._BufferContext.restore();

            return context;
        }

        public _ClearBuffer() {
            var cameraScale = this._camera._GetDistanceScale();
            (<any>this._BufferContext).unModifiedClearRect(0, 0, this._BufferCanvas.width * cameraScale, this._BufferCanvas.height * cameraScale);
        }

        private GetOnScreenRenderables(allRenderables: IRenderable[]): IRenderable[] {
            var onscreen: IRenderable[] = [],
                scale = this._camera._GetDistanceScale(),
                unscale = 1 / scale;

            // Scale camera size to our zoom level
            this._camera.Scale(scale, scale);

            for (var i = 0; i < allRenderables.length; i++) {
                if (allRenderables[i].Visible && this._camera.Intersects(allRenderables[i].GetDrawBounds())) {
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

    /**
    * Defines a scene object that is used to maintain a list of renderable objects that are rendered onto a joint game area.
    */
    export class Scene2d implements IDisposable {       
        private _actors: Graphics.Graphic2d[];
        private _renderer: _.IRenderer;
        private _onDraw: (context: CanvasRenderingContext2D) => void;
        private _disposed: boolean;
        private _camera: Camera2d;
        private _drawArea: HTMLCanvasElement;

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
        constructor(onDraw: (context: CanvasRenderingContext2D) => void , drawArea: HTMLCanvasElement);
        constructor(onDraw: (context: CanvasRenderingContext2D) => void = _ => { }, drawArea?: HTMLCanvasElement) {
            this._actors = [];

            if (typeof drawArea === "undefined") {
                drawArea = this.CreateDefaultDrawArea();
            }

            this._onDraw = onDraw;

            this.ApplyStyles(drawArea);

            this._drawArea = drawArea;
            this._camera = new Camera2d(new Vector2d(this._drawArea.width / 2, this._drawArea.height / 2), new Size2d(this._drawArea.width, this._drawArea.height));
            this._renderer = new Camera2dRenderer(this._drawArea, this._camera);
            this._disposed = false;
        }

        /**
        * Gets the canvas that the Scene2d uses as its game area.
        */
        public get DrawArea(): HTMLCanvasElement {
            return this._drawArea;
        }

        /**
        * Gets the game camera.
        */
        public get Camera(): Camera2d {
            return this._camera;
        }

        /**
        * Adds an actor to the scene.  All actors added to the scene have their Draw function called automatically.
        * @param actor The graphic to add to the scene.
        */
        public Add(actor: Graphics.Graphic2d): void {
            actor.OnDisposed.Bind((graphic: Graphics.Graphic2d) => {
                this.Remove(graphic);
            });

            this._actors.push(actor);
        }

        /**
        * Removes an actor from the scene.  The actor will no longer have its Draw called.
        * @param actor The graphic to remove from the scene.
        */
        public Remove(actor: Graphics.Graphic2d): void {
            for (var i = 0; i < this._actors.length; i++) {
                if (this._actors[i] === actor) {
                    this._actors.splice(i, 1);
                    return;
                }
            }
        }

        /**
        * Draws all actors within the Scene and triggers the Scene2d's onDraw callback.
        */
        public Draw(): void {
            this._onDraw(this._renderer.Render(this._actors));
        }

        /**
        * Destroys the game canvas and clears the Scene2d's actors.
        */
        public Dispose(): void {
            if (!this._disposed) {
                this._disposed = true;
                this._actors = [];
                this._renderer.Dispose();
            }
            else {
                throw new Error("Scene2d cannot be disposed more than once");
            }
        }

        private ApplyStyles(drawArea: HTMLCanvasElement): void {
            drawArea.style.position = "absolute";
            drawArea.style.zIndex = "2"
            drawArea.parentElement.style.position = "relative";
        }

        private CreateDefaultDrawArea(): HTMLCanvasElement {
            var drawArea = <HTMLCanvasElement>document.createElement("canvas"),
                body: HTMLElement = <HTMLElement>document.getElementsByTagName('body')[0];

            drawArea.width = window.innerWidth;
            drawArea.height = window.innerHeight;            

            body.appendChild(drawArea);
            body.style.margin = "0px";
            body.style.padding = "0px";

            return drawArea;
        }
    }

}
/* MouseButton.ts */
module EndGate.Input._ {

    export class MouseButton {
        public static Left: string = "Left";
        public static Middle: string = "Middle";
        public static Right: string = "Right";
    }

}
/* IMouseEvent.ts */


declare module EndGate.Input {

    /**
    * Represents a mouse event being triggered on the Game area.
    */
    export interface IMouseEvent {
        /**
        * The location of the mouse relative to the game area.
        */
        Position: Vector2d;
    }

}
/* IMouseClickEvent.ts */



declare module EndGate.Input {

    /**
    * Represents a mouse click event being triggered on the Game area.
    */
    export interface IMouseClickEvent extends IMouseEvent {
        /**
        * The mouse button that was clicked. Values can be "Left", "Right", or "Middle".
        */
        Button: string;
    }

}
/* IMouseScrollEvent.ts */



declare module EndGate.Input {

    /**
    * Represents a mouse scroll event being triggered on the Game area.
    */
    export interface IMouseScrollEvent extends IMouseEvent {
        /**
        * The scroll direction. The Vector2d will contain 1, -1, or 0 values depending on the mouse scroll.
        */
        Direction: Vector2d;
    }

}
/* MouseHandler.ts */







module EndGate.Input {

    /**
    * Defines a handler that will monitor mouse events over a specified area and will execute appropriate functions based on the events.
    */
    export class MouseHandler {       
        // Used to determine mouse buttons without using extra conditional statements, performance enhancer
        private static MouseButtonArray = [null, _.MouseButton.Left, _.MouseButton.Middle, _.MouseButton.Right];

        // Active flags        
        private _leftIsDown: boolean;
        private _middleIsDown: boolean;
        private _rightIsDown: boolean;
        private _isDown: boolean;

        // Events
        private _onClick: EventHandler1<IMouseClickEvent>;
        private _onDoubleClick: EventHandler1<IMouseClickEvent>;
        private _onDown: EventHandler1<IMouseClickEvent>;
        private _onUp: EventHandler1<IMouseClickEvent>;
        private _onMove: EventHandler1<IMouseEvent>;
        private _onScroll: EventHandler1<IMouseScrollEvent>;

        private _target: HTMLElement;

        /**
        * Creates a new instance of the MouseHandler object.
        * @param target The object to monitor mouse events for.
        */
        constructor(target: HTMLElement) {
            this._target = target;

            this._onClick = new EventHandler1<IMouseClickEvent>();
            this._onDoubleClick = new EventHandler1<IMouseClickEvent>();
            this._onDown = new EventHandler1<IMouseClickEvent>();
            this._onUp = new EventHandler1<IMouseClickEvent>();
            this._onMove = new EventHandler1<IMouseEvent>();
            this._onScroll = new EventHandler1<IMouseScrollEvent>();

            // Generic flags to check mouse state
            this._leftIsDown = false;
            this._middleIsDown= false;
            this._rightIsDown = false;

            this.Wire();

            this.OnDown.Bind((e: IMouseClickEvent) => {
                this._isDown = true;
                this[e.Button + "IsDown"] = true;
            });

            this.OnUp.Bind((e: IMouseClickEvent) => {
                this._isDown = false;
                this[e.Button + "IsDown"] = false;
            });
        }

        /**
        * Indicates if the left mouse button is down
        */
        public get LeftIsDown(): boolean {
            return this._leftIsDown;
        }

        /**
        * Indicates if the middle mouse button is down
        */
        public get MiddleIsDown(): boolean {
            return this._middleIsDown;
        }

        /**
        * Indicates if the right mouse button is down
        */
        public get RightIsDown(): boolean {
            return this._rightIsDown;
        }

        /**
        * Indicates if any mouse button is down.
        */
        public get IsDown(): boolean {
            return this._isDown;
        }

        /**
        * Gets an event that is triggered when a mouse click occurs.  Functions can be bound or unbound to this event to be executed when the event triggers.
        */
        public get OnClick(): EventHandler1<IMouseClickEvent> {
            return this._onClick;
        }

        /**
        * Gets an event that is triggered when a mouse double click occurs.  Functions can be bound or unbound to this event to be executed when the event triggers.
        */
        public get OnDoubleClick(): EventHandler1<IMouseClickEvent> {
            return this._onDoubleClick;
        }

        /**
        * Gets an event that is triggered when a mouse down event occurs.  Functions can be bound or unbound to this event to be executed when the event triggers.
        */
        public get OnDown(): EventHandler1<IMouseClickEvent> {
            return this._onDown;
        }

        /**
        * Gets an event that is triggered when a mouse up event occurs.  Functions can be bound or unbound to this event to be executed when the event triggers.
        */
        public get OnUp(): EventHandler1<IMouseClickEvent> {
            return this._onUp;
        }

        /**
        * Gets an event that is triggered when a mouse move event occurs.  Functions can be bound or unbound to this event to be executed when the event triggers.
        */
        public get OnMove(): EventHandler1<IMouseEvent> {
            return this._onMove;
        }

        /**
        * Gets an event that is triggered when a mouse scroll event occurs.  Functions can be bound or unbound to this event to be executed when the event triggers.
        */
        public get OnScroll(): EventHandler1<IMouseScrollEvent> {
            return this._onScroll;
        }

        private Wire(): void {
            this._target.addEventListener("click",this._target.oncontextmenu = this.BuildEvent<IMouseClickEvent>(this._onClick, this.BuildMouseClickEvent),false);
            this._target.addEventListener("dblclick", this.BuildEvent<IMouseClickEvent>(this._onDoubleClick, this.BuildMouseClickEvent), false);
            this._target.addEventListener("mousedown", this.BuildEvent<IMouseClickEvent>(this._onDown, this.BuildMouseClickEvent), false);
            this._target.addEventListener("mouseup", this.BuildEvent<IMouseClickEvent>(this._onUp, this.BuildMouseClickEvent), false);
            this._target.addEventListener("mousemove", this.BuildEvent<IMouseEvent>(this._onMove, this.BuildMouseEvent), false);

            // OnScroll, in order to detect horizontal scrolling need to hack a bit (browser sniffing)
            // if we were just doing vertical scrolling we could settle with the else statement in this block
            if ((/MSIE/i.test(navigator.userAgent))) {
                this._target.addEventListener("wheel", this.BuildEvent<IMouseScrollEvent>(this._onScroll, (e: any) => {
                    e.wheelDeltaX = -e.deltaX;
                    e.wheelDeltaY = -e.deltaY;
                    return this.BuildMouseScrollEvent(e);
                }), false);
            }
            else if ((/Firefox/i.test(navigator.userAgent))) {
                this._target.addEventListener("DOMMouseScroll", this.BuildEvent<IMouseScrollEvent>(this._onScroll, (e: any) => {
                    e.wheelDeltaX = e.axis === 1 ? -e.detail : 0;
                    e.wheelDeltaY = e.axis === 2 ? -e.detail : 0;
                    return this.BuildMouseScrollEvent(e);
                }), false);
            }
            else {
                this._target.addEventListener("mousewheel", this.BuildEvent<IMouseScrollEvent>(this._onScroll, this.BuildMouseScrollEvent), false);
            }
        }

        private BuildEvent<T>(eventHandler: EventHandler1<T>, mouseEventBuilder: (mouseEvent: MouseEvent) => IMouseEvent, returnValue: boolean = false): (e: MouseEvent) => void {
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

            return _.MouseButton.Right;
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

        constructor(action: Function, tripped: boolean = false) {
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

    /**
    * Defines an object that is used to represent a keyboard modifier state to determine if Ctrl, Alt, or Shift is being pressed.
    */
    export class KeyboardModifiers {
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
        constructor(ctrl: boolean, alt: boolean, shift: boolean) {
            this.Ctrl = ctrl;
            this.Alt = alt;
            this.Shift = shift;
        }

        /**
        * Determines whether this KeyboardModifiers object has the same ctrl, alt, and shift states as the provided KeyboardModifiers.
        * @param modifier The KeyboardModifiers to compare the current modifiers to.
        */
        public Equivalent(modifier: KeyboardModifiers): boolean {
            return this.Ctrl === modifier.Ctrl && this.Alt === modifier.Alt && this.Shift === modifier.Shift;
        }

        /**
        * Builds a KeyboardModifiers object to represent the state of an expected keyCommand
        * @param keyCommand The command to analyze.
        */
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

    /**
    * Defines a KeyboardCommandEvent object that represents when a command has been attempted.
    */
    export class KeyboardCommandEvent {
        /**
        * The key that was hit.
        */
        public Key: string;
        /**
        * The modifier status.
        */
        public Modifiers: Assets.KeyboardModifiers;

        /**
        * Creates a new instance of the KeyboardCommandEvent object.
        * @param keyEvent The raw key event from the DOM.
        */
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

        /**
        * Determines if the KeyboardCommand matches the KeyboardCommandEvent
        * @param command The KeyboardCommand to check.
        */
        public Matches(command: Assets.KeyboardCommand): boolean {
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

    /**
    * Defines a class that is used to represent a keyboard command.
    */
    export class KeyboardCommand implements IDisposable {
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

        private _onDisposeInvoker: EndGate._.Utilities.NoopTripInvoker;
        private _onDisposed: EventHandler;

        /**
        * Creates a new instance of the KeyboardCommand object.
        * @param command Initial command required to trigger the action function.
        * @param action Initial action to be triggered when the command is executed..
        */
        constructor(command: string, action: Function) {
            this.Action = action;
            this.Modifiers = Assets.KeyboardModifiers.BuildFromCommandString(command);
            this.Key = _.KeyboardCommandHelper.ParseKey(command);

            this._onDisposed = new EventHandler();
            this._onDisposeInvoker = new EndGate._.Utilities.NoopTripInvoker(() => {
                this._onDisposed.Trigger();
            }, true);
        }

        /**
        * Gets an event that is triggered when a KeyboardCommand has been disposed.  If this KeyboardCommand is used with a KeyboardHandler it will no longer trigger the Action function.  Functions can be bound or unbound to this event to be executed when the event triggers.
        */
        public get OnDispose(): EventHandler {
            return this._onDisposed;
        }

        /**
        * Triggers the OnDisposed event.  If this KeyboardCommand is used with a KeyboardHandler it will no longer trigger the Action function.
        */
        public Dispose(): void {
            this._onDisposeInvoker.InvokeOnce();
        }
    }

}
/* KeyboardHandler.ts */




module EndGate.Input {

    /**
    * Defines a handler that will check for keyboard commands and execute appropriate functions.
    */
    export class KeyboardHandler {
        private static _keyboardCommandIds: number = 0;
        private _target: HTMLCanvasElement;
        private _onPressCommands: { [id: number]: Assets.KeyboardCommand; };
        private _onDownCommands: { [id: number]: Assets.KeyboardCommand; };
        private _onUpCommands: { [id: number]: Assets.KeyboardCommand; };

        private _onKeyPress: EventHandler1<KeyboardCommandEvent>;
        private _onKeyDown: EventHandler1<KeyboardCommandEvent>;
        private _onKeyUp: EventHandler1<KeyboardCommandEvent>;

        /**
        * Creates a new instance of the KeyboardHandler object.
        */
        constructor() {
            this._onPressCommands = (<any>{});
            this._onDownCommands = (<any>{});
            this._onUpCommands = (<any>{});

            this._onKeyPress = new EventHandler1<KeyboardCommandEvent>();
            this._onKeyDown = new EventHandler1<KeyboardCommandEvent>();
            this._onKeyUp = new EventHandler1<KeyboardCommandEvent>();

            this.Wire();
        }

        /**
        * Gets an event that is triggered when any key press occurs.  Functions can be bound or unbound to this event to be executed when the event triggers.
        */
        public get OnKeyPress(): EventHandler1<KeyboardCommandEvent> {
            return this._onKeyPress;
        }

        /**
        *Gets an event that is triggered when any key goes down.  Functions can be bound or unbound to this event to be executed when the event triggers.
        */
        public get OnKeyDown(): EventHandler1<KeyboardCommandEvent> {
            return this._onKeyDown;
        }

        /**
        * Gets an event that is triggered when any key comes up.  Functions can be bound or unbound to this event to be executed when the event triggers.
        */
        public get OnKeyUp(): EventHandler1<KeyboardCommandEvent> {
            return this._onKeyUp;
        }

        /**
        * Binds function to be called when the keyCommand is pressed.  To unbind the function, dispose of the returned KeyboardCommand.
        * @param keyCommand The command string required to execute the action.
        * @param action The action to execute when the keyCommand has been pressed.
        */
        public OnCommandPress(keyCommand: string, action: Function): Assets.KeyboardCommand {
            return this.UpdateCache(keyCommand, action, this._onPressCommands);
        }

        /**
        * Binds function to be called when the keyCommand goes down.  To unbind the function, dispose of the returned KeyboardCommand.
        * @param keyCommand The command string required to execute the action.
        * @param action The action to execute when the keyCommand has is down.
        */
        public OnCommandDown(keyCommand: string, action: Function): Assets.KeyboardCommand {
            return this.UpdateCache(keyCommand, action, this._onDownCommands);
        }

        /**
        * Binds function to be called when the keyCommand comes up.  To unbind the function, dispose of the returned KeyboardCommand.
        * @param keyCommand The command string required to execute the action.
        * @param action The action to execute when the keyCommand comes up.
        */
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

        private FocusingTextArea(ke: KeyboardEvent): boolean {
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

        private BuildKeyEvent(store: { [id: number]: Assets.KeyboardCommand; }, eventHandler: EventHandler1<KeyboardCommandEvent>): (ke: KeyboardEvent) => void {
            return (ke: KeyboardEvent) => {
                var keyboardCommandEvent: KeyboardCommandEvent,
                    propogate: boolean = true;

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

    /**
    * Defines an all around Input handler which manages mouse and keyboard events.
    */
    export class InputManager {
        /**
        * Used to bind functions to mouse related events.
        */
        public Mouse: MouseHandler;
        /**
        * Used to bind functions to keyboard related events.
        */
        public Keyboard: KeyboardHandler;

        /**
        * Creates a new instance of the InputManager object.
        * @param target The object through which mouse events will be monitored on.
        */
        constructor(target: HTMLElement) {
            this.Mouse = new MouseHandler(target);
            this.Keyboard = new KeyboardHandler();
        }
    }

}
/* AudioSettings.ts */


module EndGate.Sound {

    /**
    * Defines a set of settings that are used to play AudioClip's a custom way.
    */
    export class AudioSettings implements ICloneable {
        /**
        * The default audio settings.
        */
        public static Default: AudioSettings = new AudioSettings();

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
        constructor(repeat: boolean = false, volume: number = 100, autoplay: boolean = false, preload: string = "auto") {
            this.Repeat = repeat;
            this.Volume = volume;
            this.AutoPlay = autoplay;
            this.Preload = preload;
        }

        /**
        * Returns a new AudioSettings object that is identical to the current AudioSettings object.
        */
        public Clone(): AudioSettings {
            return new AudioSettings(this.Repeat, this.Volume, this.AutoPlay, this.Preload);
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

    /**
    * Defines a single audio clip that can be played, stopped or paused.
    */
    export class AudioClip {
        private _audio: HTMLAudioElement;
        private _settings: AudioSettings;
        private _onComplete: EventHandler1<Event>;

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
        constructor(source: string, settings: AudioSettings = AudioSettings.Default);
        /**
        * Creates a new instance of the AudioClip object.
        * @param source An array of source paths to audio clips.  Pass in multiple audio types of the same clip to ensure cross browser compatibility.
        * @param settings Audio clip settings.
        */
        constructor(source: string[], settings: AudioSettings = AudioSettings.Default);
        constructor(source: any, settings: AudioSettings = AudioSettings.Default) {
            this._settings = settings.Clone();
            this._audio = <HTMLAudioElement>document.createElement("audio");
            this.SetAudioSource(source);
            this.ApplySettings();

            this._onComplete = new EventHandler1<Event>();
        }

        /**
        * Gets an event that is triggered when the audio clip has completed, will not trigger if the audio clip is repeating.  Functions can be bound or unbound to this event to be executed when the event triggers.
        */
        public get OnComplete(): EventHandler1<Event> {
            return this._onComplete;
        }

        /**
        * Gets or sets the audio clip volume.
        */
        public get Volume(): number {
            return this._settings.Volume;
        }
        public set Volume(percent: number) {
            this._settings.Volume = percent;
            this._audio.volume = Math.max(Math.min(percent / 100, 1), 0);
        }

        /**
        * Determines if the AudioClip is currently playing.
        */
        public IsPlaying(): boolean {
            return !this._audio.paused;
        }

        /**
        * Determines if the AudioClip has completed.
        */
        public IsComplete(): boolean {
            return this._audio.ended;
        }

        /**
        * Plays the current audio clip.
        */
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

        /**
        * Pauses the current audio clip.
        */
        public Pause(): void {
            this._audio.pause();
        }

        /**
        * Seeks the audio clip to the provided time.
        * @param time The time to seek to.
        */
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

        /**
        * Stops the current audio clip and seeks back to time 0.
        */
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
            this.Volume = this._settings.Volume;

            this._audio.addEventListener("ended", (e: Event) => {
                this.OnComplete.Trigger(e);
            }, true);
        }

    }
}
/* AudioPlayer.ts */



module EndGate.Sound {

    /**
    * Defines an AudioPlayer that is mapped to a specific source.  Ultimately used to play the same sound simultaneously.
    */
    export class AudioPlayer {
        private _source: any;

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
        constructor(source: any) {
            this._source = source;
        }

        /**
        * Builds an AudioClip and plays it with the default settings.  Returns the built audio clip.
        */
        public Play(): AudioClip;
        /**
        * Builds an AudioClip and plays it with the provided settings.  Returns the built audio clip.
        * @param settings Audio settings to play the AudioClip with.
        */
        public Play(settings: AudioSettings): AudioClip;
        public Play(settings: AudioSettings = AudioSettings.Default): AudioClip {
            var clip = new AudioClip(this._source, settings);

            clip.Play();

            return clip;
        }
    }

}
/* AudioManager.ts */



module EndGate.Sound {

    /**
    * Defines an audio manager that is used to preload AudioClip's that can be played at any time.
    */
    export class AudioManager {
        private _audioPlayers: { [name: string]: AudioPlayer; };

        /**
        * Creates a new instance of the AudioManager object.
        */
        constructor() {
            this._audioPlayers = {};
        }

        /**
        * Loads AudioPlayer for the provided clip info.  Returns the loaded player for easy access.
        * @param name The mapped name for the AudioPlayer.
        * @param src Source path to an audio clip.
        */
        public Load(name: string, src: string): AudioPlayer;
        /**
        * Loads an audio player, returns the AudioPlayer for easy access.
        * @param name The mapped name for the AudioPlayer.
        * @param src An array of source paths to audio clips.  Pass in multiple audio types of the same clip to ensure cross browser compatibility.
        */
        public Load(name: string, src: string[]): AudioPlayer;
        public Load(name: string, src: any): AudioPlayer {
            this._audioPlayers[name] = new AudioPlayer(src);

            return this._audioPlayers[name];
        }

        /**
        * Unload player that is mapped to the provided name.
        * @param name The mapped name of the AudioPlayer to unload.
        */
        public Unload(name: string): AudioPlayer {
            var player = this._audioPlayers[name];

            delete this._audioPlayers[name];

            return player;
        }

        /**
        * Plays a new audio clip that's mapped to the provided name with the default audio settings.
        * @param name The mapped name of the AudioPlayer to Play.
        */
        public Play(name: string): AudioClip;
        /**
        * Plays a new audio clip that's mapped to the provided name.
        * @param name The mapped name of the AudioPlayer to Play.
        * @param settings The audio settings to play the clip with.
        */
        public Play(name: string, settings: AudioSettings = AudioSettings.Default): AudioClip;
        public Play(name: string, settings: AudioSettings = AudioSettings.Default): AudioClip {
            return this._audioPlayers[name].Play(settings);
        }

        /**
        * Retrieves a loaded audio player under the provided name.
        * @param name The mapped name of the AudioPlayer to retrieve.
        */
        public GetAudioPlayer(name: string): AudioPlayer {
            return this._audioPlayers[name];
        }
    }

}
/* SceneryHandler.ts */






module EndGate.Map {

    /**
    * Defines a SceneryHandler which specializes in drawing large background type layers to depict scenery.
    */
    export class SceneryHandler {
        private _sceneryCanvas: HTMLCanvasElement;
        private _camera: Rendering.Camera2d;
        private _layers: Graphics.Graphic2d[];
        private _renderer: Rendering.Camera2dRenderer;
        private _disposed: boolean;

        /**
        * Creates a new instance of the SceneryHandler object.
        * @param scene The primary scene that this SceneryHandler will play behind.
        */
        constructor(scene: Rendering.Scene2d) {
            this._camera = scene.Camera;
            this._layers = [];            
            this._sceneryCanvas = this.BuildSceneryCanvas(scene.DrawArea);
            this._renderer = new Rendering.Camera2dRenderer(this._sceneryCanvas, this._camera);
            this._disposed = false;
        }

        /**
        * Adds a layer to the scenery.
        * @param layer The layer to add.
        */
        public AddLayer(layer: Graphics.Graphic2d): void {
            this._layers.push(layer);
        }

        /**
        * Removes a layer from the scenery.
        * @param layer The layer to remove.
        */
        public RemoveLayer(layer: Graphics.Graphic2d): void {
            this._layers.splice(this._layers.indexOf(layer), 1);
        }

        /**
        * Draws all layers onto the given context.  If this is used via a MapManager object, Draw will automatically be called.
        */
        public Draw(): void {
            this._layers.sort(Graphics.Graphic2d._zindexSort);

            this._renderer.Render(this._layers);
        }

        /**
        * Destroys the games map canvas and the Scenery layers.
        */
        public Dispose(): void {
            if (!this._disposed) {
                this._disposed = true;
                this._layers = [];
                this._renderer.Dispose();
            }
            else {
                throw new Error("Scene2d cannot be disposed more than once");
            }
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

    /**
    * Defines a map manager that is used to manage Scenery.  Will eventually be expanded to handle obstacles.
    */
    export class MapManager implements IDisposable{
        /**
        * Used to draw larger images that are used to depict backgrounds or other scenery.
        */
        public Scenery: SceneryHandler;

        /**
        * Creates a new instance of the MapManager object.
        * @param scene The Scene2d that is used to draw smaller objects within the game (the foreground scene).
        */
        constructor(scene: Rendering.Scene2d) {
            this.Scenery = new SceneryHandler(scene);
        }

        /**
        * Destroys the games map assets.
        */
        public Dispose(): void {
            this.Scenery.Dispose();
        }
    }

}
/* Game.ts */












module EndGate {

    /**
    * Defines a virtual Game object that is meant to be derived from.  Games contain a multitude of management objects to control every aspect of the game.
    */
    export class Game implements _.ITyped, IUpdateable, IDisposable {
        public _type: string = "Game";        

        /**
        * The games configuration.  Used to modify settings such as the game update rate.
        */
        public Configuration: GameConfiguration;
        /**
        * A collision manager which is used to actively detect collisions between monitored Collidable's.
        */
        public CollisionManager: Collision.CollisionManager;
        /**
        * A scene manager which is used to draw Graphic2d's onto the game screen.
        */
        public Scene: Rendering.Scene2d;
        /**
        * An input manager which is used to monitor mouse and keyboard events.
        */
        public Input: Input.InputManager;
        /**
        * An audio manager which is used to load, manage and play audio clips.
        */
        public Audio: Sound.AudioManager;
        /**
        * A map manager that is used to draw large Graphic2d's (Layer's) to the background.
        */
        public Map: Map.MapManager;

        public _ID: number;

        private static _gameIds: number = 0;
        private _gameTime: GameTime;
        private _updateRequired: boolean;

        /**
        * Creates a new instance of the Game object.  A default canvas will be created that fills the DOM body.
        */
        constructor();
        /**
        * Creates a new instance of the Game object.
        * @param gameCanvas The canvas to utilize as the game area.
        */
        constructor(gameCanvas: HTMLCanvasElement);
        constructor(gameCanvas?: HTMLCanvasElement) {
            var initialQuadTreeSize: Size2d,
                defaultMinQuadTreeSize: Size2d = Collision.CollisionConfiguration._DefaultMinQuadTreeNodeSize;

            this._updateRequired = true;
            this._gameTime = new GameTime();
            this._ID = Game._gameIds++;

            this.Scene = new Rendering.Scene2d(context => {
                this.Draw(context);
            }, gameCanvas);

            this.Input = new Input.InputManager(this.Scene.DrawArea);
            this.Audio = new Sound.AudioManager();
            
            initialQuadTreeSize = this.Scene.Camera.Size;

            if (initialQuadTreeSize.Width % defaultMinQuadTreeSize.Width !== 0) {
                initialQuadTreeSize = new Size2d(initialQuadTreeSize.Width % defaultMinQuadTreeSize.Width + initialQuadTreeSize.Width);
            }
            
            this.Configuration = new GameConfiguration(GameRunnerInstance.Register(this), initialQuadTreeSize)
            this.CollisionManager = new Collision.CollisionManager(this.Configuration.CollisionConfiguration);
            this.Map = new Map.MapManager(this.Scene);

            this.Configuration.CollisionConfiguration._OnChange.Bind(() => {
                this.CollisionManager = new Collision.CollisionManager(this.Configuration.CollisionConfiguration);
            });
        }

        public _PrepareUpdate(): void {
            this._gameTime.Update();

            this.Update(this._gameTime);
            this.CollisionManager.Update(this._gameTime);
            this._updateRequired = false;
        }

        /**
        * Triggered on a regular interval defined by the GameConfiguration.
        * @param gameTime The global game time object.  Used to represent total time running and used to track update interval elapsed speeds.
        */
        public Update(gameTime: GameTime): void {
        }

        public _PrepareDraw(): void {
            if (this.Configuration.DrawOnlyAfterUpdate && this._updateRequired) {
                return;
            }

            this.Map.Scenery.Draw();
            this.Scene.Draw();
            this._updateRequired = true;
        }

        /**
        * Triggered as fast as possible.  Determined by the current browsers repaint rate.
        */
        public Draw(context: CanvasRenderingContext2D): void {
            // This is called by the scene
        }

        /**
        * Removes game canvas and disposes all tracked objects.
        */
        public Dispose(): void {
            this.Scene.Dispose();
            this.Map.Dispose();
            GameRunnerInstance.Unregister(this);
        }
    }

}
/* LinearDirections.ts */
module EndGate.MovementControllers.Assets {

    /**
    * Defines a direction management object that represents directional state.
    */
    export class LinearDirections {
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

    /**
    * Represents a move event object that is used to depict a movement, specifically a direction and whether or not the move started or stopped.
    */
    export interface IMoveEvent {
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
/* MovementController.ts */





module EndGate.MovementControllers {
    
    /**
    * Abstract class that holds moveable objects and synchronizes positions across them.
    */
    export class MovementController implements IMoveable, IUpdateable {
        /**
        * Gets or sets the position of the MovementController
        */
        public Position: Vector2d;
        /**
        * Gets or sets the velocity of the MovementController.
        */
        public Velocity: Vector2d;
        /**
        * Gets or sets the rotation of the MovementController
        */
        public Rotation: number;
        public _frozen: boolean;
        private _moveables: IMoveable[];

        /**
        * Should only ever be called by derived classes.
        * @param moveables Moveable objects to synchronize.
        */
        constructor(moveables: IMoveable[]) {
            this.Position = moveables.length > 0 ? moveables[0].Position : Vector2d.Zero;
            this.Velocity = Vector2d.Zero;
            this.Rotation = 0;
            this._frozen = false;

            this._moveables = moveables;
        }

        /**
        * Prevents the MovementController from updating object locations.
        */
        public Freeze(): void {
            this._frozen = true;
        }

        /**
        * Used to re-enable movement within the MovementController.
        */
        public Thaw(): void {
            this._frozen = false;
        }

        /**
        * Determines if the MovementController is moving.  Frozen MovementControllers are not considered moving.
        */
        public IsMoving(): boolean {
            return !this._frozen && !this.Velocity.IsZero();
        }

        /**
        * Synchronizes the current position with all tracked moveable objects.  MovementController's must be updated in order to move.
        * @param gameTime The current game time object.
        */
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

    /**
    * Defines a LinearMovementController that can move objects Up, Right, Left, Down or a combination.
    */
    export class LinearMovementController extends MovementController {
        private _moveSpeed: number;
        private _moving: Assets.LinearDirections;
        private _rotationUpdater: EndGate._.Utilities.NoopTripInvoker;
        private _velocityUpdater: Function;

        /**
        * Creates a new instance of the LinearMovementController object which rotates the provided moveable's on movements and can move diagonally.
        * @param movables Array of moveable objects that will be moved when the movement controller moves (this cannot change after construction).
        * @param moveSpeed How fast the movement controller will move.
        */
        constructor(movables: IMoveable[], moveSpeed: number);
        /**
        * Creates a new instance of the LinearMovementController object which can move diagonally.
        * @param movables Array of moveable objects that will be moved when the movement controller moves (this cannot change after construction).
        * @param moveSpeed How fast the movement controller will move.
        * @param rotateWithMovements Whether the movables should rotate to face their moving direction, default is true (this cannot change after construction).
        */
        constructor(movables: IMoveable[], moveSpeed: number, rotateWithMovements: boolean);
        /**
        * Creates a new instance of the LinearMovementController object..
        * @param movables Array of moveable objects that will be moved when the movement controller moves (this cannot change after construction).
        * @param moveSpeed How fast the movement controller will move.
        * @param rotateWithMovements Whether the movables should rotate to face their moving direction.  Default is true (this cannot change after construction).
        * @param multiDirectional Whether multiple movements can occur simultaneously, resulting in diagonal movements. Default is true (this cannot change after construction).
        */
        constructor(movables: IMoveable[], moveSpeed: number, rotateWithMovements: boolean, multiDirectional: boolean);
        constructor(movables: IMoveable[], moveSpeed: number, rotateWithMovements: boolean = true, multiDirectional: boolean = true) {
            super(movables);

            this._moveSpeed = moveSpeed;
            this._moving = new Assets.LinearDirections();
            this.OnMove = new EventHandler1<IMoveEvent>();
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

        /**
        * Event: Triggered when a the movement controller starts or stops a movement.  Functions can be bound or unbound to this event to be executed when the event triggers.
        * Passes an IMoveEvent to bound functions.
        */
        public OnMove: EventHandler1<IMoveEvent>;

        /**
        * Determines if the movement controller is moving in the provided direction.
        * @param direction The direction to check.
        */
        public IsMovingInDirection(direction: string): boolean {
            return this._moving[direction] || false;
        }

        /**
        * Starts moving the movement controller in the specified direction.
        * @param direction The direction to start moving.
        */
        public StartMoving(direction: string): void {
            this.Move(direction, true);
        }
        
        /**
        * Stops the movement controller from moving in the specified direction.
        * @param direction The direction to stop moving.
        */
        public StopMoving(direction: string): void {
            this.Move(direction, false);
        }

        /**
        * Gets the current move speed.
        */
        public MoveSpeed(): number;
        /**
        * Sets and gets the current move speed.
        * @param speed The new move speed.
        */
        public MoveSpeed(speed: number): number;
        public MoveSpeed(speed?: number): number {
            if (typeof speed !== "undefined") {
                this._moveSpeed = speed;
                this._velocityUpdater();
            }

            return this._moveSpeed;
        }

        /**
        * Moves the LinearMovementController in the currently active directions.  MovementController's must be updated in order to move.
        * @param gameTime The current game time object.
        */
        public Update(gameTime: GameTime): void {
            if (!this._frozen) {
                this.Position = this.Position.Add(this.Velocity.Multiply(gameTime.Elapsed.Seconds));

                super.Update(gameTime);
            }
        }

        /**
        * Triggers a move event on the MovementController.
        * @param direction The direction to start or stop moving.
        * @param startMoving Whether the movement is starting or stopping.
        */
        public Move(direction: string, startMoving: boolean): void {
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
            var velocity = Vector2d.Zero;

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
            var velocity = Vector2d.Zero;

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

    /**
    * Defines a DirectionalInputController that will monitor Up, Right, Left, and Down movement attempts.
    */
    export class DirectionalInputController {
        private _keyboard: Input.KeyboardHandler;
        private _onMove: (direction: string, startMoving: boolean) => void;
        private _directions: MovementControllers.Assets.LinearDirections;

        /**
        * Creates a new instance of the DirectionalInputController object with default key controls.
        * @param keyboard A keyboard handler in order to bind directional events.
        * @param onMove The function to trigger when the user attempts to perform a move.  Passes the direction ("Left", "Right", "Up", "Down") and whether the movement was started or stopped.
        */
        constructor(keyboard: Input.KeyboardHandler, onMove: (direction: string, startMoving: boolean) => void);
        /**
        * Creates a new instance of the DirectionalInputController object with custom key controls.
        * @param keyboard A keyboard handler in order to bind directional events.
        * @param onMove The function to trigger when the user attempts to perform a move.  Passes the direction ("Left", "Right", "Up", "Down") and whether the movement was started or stopped.
        * @param upKeys Array of keys to trigger an "Up" movement.  Default is ["w", "Up"].
        * @param rightKeys Array of keys to trigger a "Right" movement.  Default is ["d", "Right"].
        * @param downKeys Array of keys to trigger a "Down" movement.  Default is ["s", "Down"].
        * @param leftKeys Array of keys to trigger a "Left" movement.  Default is ["a", "Left"].
        */
        constructor(keyboard: Input.KeyboardHandler, onMove: (direction: string, startMoving: boolean) => void , upKeys: string[], rightKeys: string[], downKeys: string[], leftKeys: string[]);
        constructor(keyboard: Input.KeyboardHandler, onMove: (direction: string, startMoving: boolean) => void, upKeys: string[] = ["w", "Up"], rightKeys: string[] = ["d", "Right"], downKeys: string[] = ["s", "Down"], leftKeys: string[] = ["a", "Left"]) {
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

        private BindKeys(keyList: string[], bindingAction: string, direction: string, startMoving: boolean): void {
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
/* FontFamily.ts */
module EndGate.Graphics.Assets {

    /**
    * Defines valid FontFamilies that can be used to display Text2d's differently.
    */
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

}
/* FontVariant.ts */
module EndGate.Graphics.Assets {

    /**
    * Defines valid FontVariant's that can be used to change the appearance of Text2d's.
    */
    export enum FontVariant {
        Normal,
        SmallCaps
    };    

}
/* FontStyle.ts */
module EndGate.Graphics.Assets {

    /**
    * Defines valid FontStyles that can be used to modify the font's style for Text2d's.
    */
    export enum FontStyle {
        Normal,
        Italic,
        Oblique
    }

}
/* FontSettings.ts */




module EndGate.Graphics.Assets {

    /**
    * Defines a set of font settings that are used to modify the appearance of text that is drawn via Text2d's.
    */
    export class FontSettings {
        private _cachedState: { [property: string]: any; };
        private _cachedFont: string;
        private _refreshCache: boolean;

        /**
        * Creates a new instance of the FontSettings object with the following default values.
        * FontSize: 10px
        * FontFamily: Times New Roman
        */
        constructor() {
            this._cachedState = {
                fontSize: "10px",
                fontFamily: FontFamily.TimesNewRoman,
                fontVariant: FontVariant.Normal,
                fontWeight: "",
                fontStyle: FontStyle.Normal
            };

            this._refreshCache = true;
            this._BuildFont();
        }

        /**
        * Gets or sets the current font size.  Values can be things such as 20px.
        */
        public get FontSize(): string {
            return this._cachedState["fontSize"];
        }
        public set FontSize(size: string) {
            this._refreshCache = true;
            this._cachedState["fontSize"] = size;
        }

        /**
        * Gets or sets the font family.
        */
        public get FontFamily(): FontFamily {
            return this._cachedState["fontFamily"];
        }
        public set FontFamily(family: FontFamily) {
            this._refreshCache = true;
            this._cachedState["fontFamily"] = family;
        }

        /**
        * Gets or sets the font variant.
        */
        public get FontVariant(): FontVariant {
            return this._cachedState["fontVariant"];
        }
        public set FontVariant(variant: FontVariant) {
            this._refreshCache = true;
            this._cachedState["fontVariant"] = variant;
        }

        /**
        * Gets or sets the current font weight.
        */
        public get FontWeight(): string {
            return this._cachedState["fontWeight"];
        }
        public set FontWeight(weight: string) {
            this._refreshCache = true;
            this._cachedState["fontWeight"] = weight;
        }

        /**
        * Gets or sets the current font style.
        */
        public get FontStyle(): FontStyle {
            return this._cachedState["fontStyle"];
        }
        public set FontStyle(style: FontStyle) {
            this._refreshCache = true;
            this._cachedState["fontStyle"] = style;
        }

        public _BuildFont(): string {
            var font;

            if (this._refreshCache) {
                font = this._cachedState["fontWeight"] + " " + FontStyle[this._cachedState["fontStyle"]].replace("Normal", "") + " " + FontVariant[this._cachedState["fontVariant"]].replace("Normal", "")+ " " + this._cachedState["fontSize"];

                if (this._cachedState["fontFamily"] !== undefined) {
                    font += " " + FontFamily[this._cachedState["fontFamily"]];
                }
                               
                this._cachedFont = font.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
                this._refreshCache = false;
            }

            return this._cachedFont;
        }
    }
}
/* Text2d.ts */






module EndGate.Graphics {

    /**
    * Defines a drawable text element.
    */
    export class Text2d extends Graphic2d {
        public _type: string = "Text2d";        

        private _fontSettings: Assets.FontSettings;
        private _text: string;
        private _stroker: _.Utilities.NoopTripInvoker;
        private _recalculateBoundsSize: boolean;

        // For GetDrawBounds
        private _drawBounds: Bounds.BoundingRectangle;

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
        constructor(x: number, y: number, text: string, color: string = "black") {
            super(new Vector2d(x, y));

            this._text = text;
            this._stroker = new _.Utilities.NoopTripInvoker((context: CanvasRenderingContext2D) => {
                context.strokeText(this._text, 0, 0);
            });

            this._drawBounds = new Bounds.BoundingRectangle(this.Position, Size2d.One);
            this._recalculateBoundsSize = true;

            this._fontSettings = new Assets.FontSettings();
            this.Align = "center";
            this.Baseline = "middle";
            this.Color = color;
        }

        /**
        * Gets or sets the text alignment of the Text2d.  Values can be "start", "end", "left", "center", or "right".
        */
        public get Align(): string {
            return this._State.TextAlign;
        }
        public set Align(alignment: string) {
            this._State.TextAlign = alignment;
        }        

        /**
        * Gets or sets the text baseline of the Text2d.  Values can be "top", "hanging", "middle", "alphabetic", "ideographic", and "bottom".
        */
        public get Baseline(): string {
            return this._State.TextBaseline;
        }
        public set Baseline(baseline: string) {
            this._State.TextBaseline = baseline;
        }

        /**
        * Gets or sets the current text color.  Valid colors are strings like "red" or "rgb(255,0,0)".
        */
        public get Color(): string {
            return this._State.FillStyle;
        }
        public set Color(color: string) {
            this._State.FillStyle = color;
        }

        /**
        * Gets or sets the current shadow color.  Valid colors are strings like "red" or "rgb(255,0,0)".
        */
        public get ShadowColor(): string {
            return this._State.ShadowColor;
        }
        public set ShadowColor(color: string) {
            this._State.ShadowColor = color;
        }

        /**
        * Gets or sets the current horizontal shadow position.
        */
        public get ShadowX(): number {
            return this._State.ShadowOffsetX;
        }
        public set ShadowX(x: number) {
            this._State.ShadowOffsetX = x;
        }

        /**
        * Gets or sets the current vertical shadow position.
        */
        public get ShadowY(): number {
            return this._State.ShadowOffsetY;
        }
        public set ShadowY(y: number) {
            this._State.ShadowOffsetY = y;
        }

        /**
        * Gets or sets the current shadow blur.
        */
        public get ShadowBlur(): number {
            return this._State.ShadowBlur;
        }
        public set ShadowBlur(blur: number) {
            this._State.ShadowBlur = blur;
        }

        /**
        * Gets the Text2d's FontSetting's.
        */
        public get FontSettings(): Assets.FontSettings {
            this._recalculateBoundsSize = true;

            return this._fontSettings;
        }

        /**
        * Gets or sets the current border thickness.
        */
        public get BorderThickness(): number {
            return this._State.LineWidth;
        }
        public set BorderThickness(thickness: number) {
            if (thickness === 0) {
                this._stroker.Reset();
            }
            else {
                this._stroker.Trip();
            }

            this._State.LineWidth = thickness;
        }

        /**
        * Gets or sets the current border color.  Valid colors are strings like "red" or "rgb(255,0,0)".
        */
        public get BorderColor(): string {
            return this._State.StrokeStyle;
        }
        public set BorderColor(color: string) {
            this._stroker.Trip();
            this._State.StrokeStyle = color;
        }

        /**
        * Gets or sets the current Text2d's text.
        */
        public get Text(): string {
            return this._text;
        }
        public set Text(text: string) {
            this._recalculateBoundsSize = true;
            this._text = text;
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
            this.ShadowX = x;
            this.ShadowY = y;
            this.ShadowColor = color;
            this.ShadowBlur = blur;
        }       

        /**
        * Sets the current borders thickness and color.
        * @param thickness The new border thickness in pixels.
        * @param color The new border color.  Can be valid color strings, like "red" or "rgb(255,0,0)".
        */
        public Border(thickness: number, color: string): void {
            this.BorderThickness = thickness;
            this.BorderColor = color;
        }

        /**
        * Draws the text onto the given context.  If this Text2d is part of a scene the Draw function will be called automatically.
        * @param context The canvas context to draw the text onto.
        */
        public Draw(context: CanvasRenderingContext2D): void {
            var textSize;
            
            this._State.Font = this._fontSettings._BuildFont();

            super._StartDraw(context);

            context.fillText(this._text, 0, 0);
            this._stroker.Invoke(context);

            // Only recalculate bounds if the text or font has changed since the last draw.
            if (this._recalculateBoundsSize) {
                this._recalculateBoundsSize = false;
                textSize = context.measureText(this._text);
                this._drawBounds.Size.Width = textSize.width;
                this._drawBounds.Size.Height = parseInt(this._fontSettings.FontSize) * 1.5;
            }

            super._EndDraw(context);            
        }

        /**
        * The bounding area that represents where the Text2d will draw.
        */
        public GetDrawBounds(): Bounds.Bounds2d {
            this._drawBounds.Rotation = this.Rotation;
            this._drawBounds.Position = this.Position;

            return this._drawBounds;
        }
    }
}
/* ImageSource.ts */




module EndGate.Graphics {

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
        private _loaded: boolean;
        private _imageLocation;
        private _onLoaded: EventHandler1<ImageSource>;

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
        constructor(imageLocation: string, width?: number, height?: number, clipX: number = 0, clipY: number = 0, clipWidth: number = width, clipHeight: number = height) {
            var setSize = typeof width !== "undefined";

            this._loaded = false;
            this._onLoaded = new EventHandler1<ImageSource>();
            this.Source = new Image();

            this.Source.onload = () => {
                this._loaded = true;

                if (!setSize) {
                    this._size = new Size2d(this.Source.width, this.Source.height);
                    this.ClipLocation = Vector2d.Zero;
                    this.ClipSize = this._size.Clone();
                }

                this._onLoaded.Trigger(this);
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
        * Gets an event that is triggered when the base image is finished loading.  Functions can be bound or unbound to this event to be executed when the event triggers.
        */
        public get OnLoaded(): EventHandler1<ImageSource> {
            return this._onLoaded;
        }

        /**
        * Returns the base Size of the image source.
        */
        public get Size(): Size2d {
            return this._size.Clone();
        }

        /**
        * Determines if the ImageSource has been loaded.
        */
        public Loaded(): boolean {
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

    /**
    * Defines a drawable sprite.  Sprites are used to draw images to the game screen.
    */
    export class Sprite2d extends Graphic2d {
        public _type: string = "Sprite2d";

        /**
        * Gets or sets the Image that is drawn to the game screen.
        */
        public Image: ImageSource;
        /**
        * Gets or sets the size of the Sprite2d.  If the Size is not equal to the image's ClipSize the Sprite2d will appear stretched.
        */
        public Size: Size2d;

        /**
        * Creates a new instance of the Sprite2d object with an initial size matching the image's clip size.
        * @param x Initial horizontal location of the Sprite2d.
        * @param y Initial vertical location of the Sprite2d.
        * @param image Initial ImageSource of the Sprite2d.
        */
        constructor(x: number, y: number, image: ImageSource);
        /**
        * Creates a new instance of the Sprite2d object.
        * @param x Initial horizontal location of the Sprite2d.
        * @param y Initial vertical location of the Sprite2d.
        * @param image Initial ImageSource of the Sprite2d.
        * @param width Initial width of the Sprite2d.  If the width does not equal the width of the image's clip width the Sprite2d will appear stretched.
        * @param height Initial height of the Sprite2d.  If the height does not equal the height of the image's clip height the Sprite2d will appear stretched.
        */
        constructor(x: number, y: number, image: ImageSource, width: number, height: number);
        constructor(x: number, y: number, image: ImageSource, width: number = image.ClipSize.Width, height: number = image.ClipSize.Height) {
            super(new Vector2d(x, y));

            this.Image = image;
            this.Size = new Size2d(width, height);
        }        

        /**
        * Draws the sprite onto the given context.  If this sprite is part of a scene the Draw function will be called automatically.
        * @param context The canvas context to draw the sprite onto.
        */
        public Draw(context: CanvasRenderingContext2D): void {
            super._StartDraw(context);

            context.drawImage(this.Image.Source, this.Image.ClipLocation.X, this.Image.ClipLocation.Y, this.Image.ClipSize.Width, this.Image.ClipSize.Height, - this.Size.HalfWidth, - this.Size.HalfHeight, this.Size.Width, this.Size.Height)

            super._EndDraw(context);
        }

        /**
        * The bounding area that represents where the Sprite2d will draw.
        */
        public GetDrawBounds(): Bounds.Bounds2d {
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
        private _imageSource: ImageSource;
        private _fps: number;
        private _frameSize: Size2d;
        private _frameCount: number;
        private _startOffset: Vector2d;
        private _playing: boolean;
        private _repeating: boolean;
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
        constructor(imageSource: ImageSource, fps: number, frameSize: Size2d, frameCount: number);
        /**
        * Creates a new instance of the SpriteAnimation object.
        * @param imageSource The Sprite sheet that contains the image frames used to display the animation.
        * @param fps How fast to play the animation (frames per second).  This value should not be less than the games update interval.
        * @param frameSize How large each animation frame is within the imageSource sprite sheet.
        * @param frameCount How many frames to play for the animation.
        * @param startOffset The positional offset within the imageSource on where the set of animation frames begin.
        */
        constructor(imageSource: ImageSource, fps: number, frameSize: Size2d, frameCount: number, startOffset: Vector2d = Vector2d.Zero);
        constructor(imageSource: ImageSource, fps: number, frameSize: Size2d, frameCount: number, startOffset: Vector2d = Vector2d.Zero) {
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
        public IsPlaying(): boolean {
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
        public Play(repeat: boolean): void;
        public Play(repeat: boolean = false): void {
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
        public Stop(resetFrame: boolean): void;
        public Stop(resetFrame: boolean = true): void {
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
/* Shape.ts */



module EndGate.Graphics {

    /**
    * Abstract drawable shape type that is used create customizable drawable graphics.
    */
    export class Shape extends Graphic2d {
        public _type: string = "Shape";
        private _fill: boolean;
        private _stroke: boolean;

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
                this.Color = color;
            }
        }

        /**
        * Gets or sets the current shape color.  Valid colors are strings like "red" or "rgb(255,0,0)".
        */
        public get Color(): string {
            return this._State.FillStyle;
        }
        public set Color(color: string) {
            this._fill = true;
            this._State.FillStyle = color;
        }

        /**
        * Gets or sets the current border thickness.
        */
        public get BorderThickness(): number {
            return this._State.LineWidth;
        }
        public set BorderThickness(thickness: number) {
            this._State.LineWidth = thickness;
        }

        /**
        * Gets or sets the current border color.  Valid colors are strings like "red" or "rgb(255,0,0)".
        */
        public get BorderColor(): string {
            return this._State.StrokeStyle;
        }
        public set BorderColor(color: string) {
            this._stroke = true;
            this._State.StrokeStyle = color;
        }

        /**
        * Gets or sets the current shadow color.  Valid colors are strings like "red" or "rgb(255,0,0)".
        */
        public get ShadowColor(): string {
            return this._State.ShadowColor;
        }
        public set ShadowColor(color: string) {
            this._fill = true;
            this._State.ShadowColor = color;
        }

        /**
        * Gets or sets the current horizontal shadow position.
        */
        public get ShadowX(): number {
            return this._State.ShadowOffsetX;
        }
        public set ShadowX(x: number) {
            this._State.ShadowOffsetX = x;
        }

        /**
        * Gets or sets the current vertical shadow position.
        */
        public get ShadowY(): number {
            return this._State.ShadowOffsetY;
        }
        public set ShadowY(y: number) {
            this._State.ShadowOffsetY = y;
        }

        /**
        * Gets or sets the current shadow blur.
        */
        public get ShadowBlur(): number {
            return this._State.ShadowBlur;
        }
        public set ShadowBlur(blur: number) {
            this._State.ShadowBlur = blur;
        }

        /**
        * Sets the current borders thickness and color.
        * @param thickness The new border thickness in pixels.
        * @param color The new border color.  Can be valid color strings, like "red" or "rgb(255,0,0)".
        */
        public Border(thickness: number, color: string): void {
            this.BorderThickness = thickness;
            this.BorderColor = color;
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
            this.ShadowX = x;
            this.ShadowY = y;
            this.ShadowColor = color;
            this.ShadowBlur = blur;
        }

        public _StartDraw(context: CanvasRenderingContext2D): void {
            super._StartDraw(context);
            context.beginPath();
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
        * Draws the shape onto the given context.  If this shape is part of a scene the Draw function will be called automatically.
        * @param context The canvas context to draw the shape onto.
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
    export class Circle extends Shape {
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
        public GetDrawBounds(): Bounds.Bounds2d {
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
    export class Rectangle extends Shape {
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
        public GetDrawBounds(): Bounds.Bounds2d {
            var bounds = new Bounds.BoundingRectangle(this.Position, this.Size);

            bounds.Rotation = this.Rotation;

            return bounds;
        }

        public _BuildPath(context: CanvasRenderingContext2D): void {
            context.rect(-this.Size.HalfWidth, -this.Size.HalfHeight, this.Size.Width, this.Size.Height);
        }
    }

}
/* Line2d.ts */





module EndGate.Graphics {

    /**
    * Defines a drawable 2d line element.
    */
    export class Line2d extends Graphic2d {
        public _type: string = "Line2d";

        private _from: Vector2d;
        private _to: Vector2d;
        private _difference: Vector2d;
        private _boundsWidth: number;
        private _cachedPosition: Vector2d;

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
        constructor(fromX: number, fromY: number, toX: number, toY: number, lineWidth: number = 1, color?: string) {
            super(Vector2d.Zero);// Set to zero here then updated in the rest of the constructor (use same logic)

            this._from = new Vector2d(fromX, fromY);
            this._to = new Vector2d(toX, toY);
            this.LineWidth = lineWidth;
            this.UpdatePosition();

            if (typeof color !== "undefined") {
                this.Color = color;
            }
        }

        /**
        * Gets or sets the From location of the Line2d.
        */
        public get From(): Vector2d {
            return this._from;
        }
        public set From(newPosition: Vector2d) {
            this._from = newPosition;
            this.UpdatePosition();
        }

        /**
        * Gets or sets the To location of the Line2d.
        */
        public get To(): Vector2d {
            return this._to;
        }
        public set To(newPosition: Vector2d) {
            this._to = newPosition;
            this.UpdatePosition();
        }

        /**
        * Gets or sets the line color.  Valid colors are strings like "red" or "rgb(255,0,0)".
        */
        public get Color(): string {
            return this._State.StrokeStyle;
        }
        public set Color(color: string) {
            this._State.StrokeStyle = color;
        }

        /**
        * Gets or sets the line width.
        */
        public get LineWidth(): number {
            return this._State.LineWidth;
        }
        public set LineWidth(width: number) {
            this._State.LineWidth = width;
        }

        /**
        * Gets or sets the line cap.  Values can be "butt", "round", "square".
        */
        public get LineCap(): string {
            return this._State.LineCap;
        }
        public set LineCap(cap: string) {
            this._State.LineCap = cap;
        }

        /**
        * Draws the line onto the given context.  If this Line2d is part of a scene the Draw function will be called automatically.
        * @param context The canvas context to draw the line onto.
        */
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

        /**
        * The bounding area that represents where the Line2d will draw.
        */
        public GetDrawBounds(): Bounds.Bounds2d {
            var bounds = new Bounds.BoundingRectangle(this.Position, new Size2d(this._boundsWidth, this.LineWidth));

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
    }

}
/* Grid.ts */





module EndGate.Graphics {

    /**
    * Defines a drawable grid that can be used to store other graphics in a grid like structure.
    */
    export class Grid extends Graphic2d {
        public _type: string = "Grid";

        private _size: Size2d;
        private _tileSize: Size2d;
        private _grid: Graphic2d[][];
        private _gridLines: Line2d[];
        private _positionOffset: Vector2d;
        private _rows: number;
        private _columns: number;
        private _gridLineColor: string;
        private _drawGridLines: boolean;

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
        constructor(x: number, y: number, rows: number, columns: number, tileWidth: number, tileHeight: number, drawGridLines: boolean = false, gridLineColor: string = "gray") {
            super(new Vector2d(x, y));

            this._size = new Size2d(tileWidth * columns, tileHeight * rows);
            this._tileSize = new Size2d(tileWidth, tileHeight);
            this._grid = [];
            this._rows = rows;
            this._columns = columns;
            this._gridLines = [];
            this.GridLineColor = gridLineColor;
            this.DrawGridLines = drawGridLines;

            // Initialize our grid
            for (var i = 0; i < this._rows; i++) {
                this._grid[i] = [];

                for (var j = 0; j < this._columns; j++) {
                    this._grid[i].push(null);
                }
            }
        }

        /**
        * Gets or sets the DrawGridLines property.  Indicates whether the grids column and row lines will be drawn.
        */
        public get DrawGridLines(): boolean {
            return this._drawGridLines;
        }
        public set DrawGridLines(shouldDraw: boolean) {
            if (shouldDraw && this._gridLines.length === 0) {
                this.BuildGridLines();
            }

            this._drawGridLines = shouldDraw;
        }

        /**
        * Gets or sets the current grid line color.  Grid lines are only drawn of DrawGridLines is set to true.  Valid colors are strings like "red" or "rgb(255,0,0)".
        */
        public get GridLineColor(): string {
            return this._gridLineColor;
        }
        public set GridLineColor(color: string) {
            this._gridLineColor = color;

            for (var i = 0; i < this._gridLines.length; i++) {
                this._gridLines[i].Color = color;
            }
        }

        /**
        * Gets the size of the grid.
        */
        public get Size(): Size2d {
            return this._size.Clone();
        }

        /**
        * Gets the size of the tiles.
        */
        public get TileSize(): Size2d {
            return this._tileSize.Clone();
        }

        /**
        * Gets the number of rows.
        */
        public get Rows(): number {
            return this._rows;
        }

        /**
        * Gets the number of columns.
        */
        public get Columns(): number {
            return this._columns;
        }

        /**
        * Fills a tile with the provided graphic.
        * @param row The row.
        * @param column The column.
        * @param graphic The graphic to fill the tile with.
        */
        public Fill(row: number, column: number, graphic: Graphic2d): void {
            if (!graphic || !this.ValidRow(row) || !this.ValidColumn(column)) {
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
        public FillRow(row: number, graphicList: Graphic2d[]): void;
        /**
        * Fills a row with the provided graphics starting at the provided column
        * @param row The row to fill.
        * @param graphicList The list of graphics to fill the row with.  The row will be filled with as many elements that are contained within the graphicList.
        * @param columnOffset The column to start filling at.
        */
        public FillRow(row: number, graphicList: Graphic2d[], columnOffset: number): void;
        public FillRow(row: number, graphicList: Graphic2d[], columnOffset: number = 0): void {
            var graphic: Graphic2d;

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
        public FillColumn(column: number, graphicList: Graphic2d[]): void;
        /**
        * Fills a column with the provided graphics starting at the provided row.
        * @param column The column to fill.
        * @param graphicList The list of graphics to fill the column with.  The column will be filled with as many elements that are contained within the graphicList.
        * @param rowOffset The row to start filling at.
        */
        public FillColumn(column: number, graphicList: Graphic2d[], rowOffset: number): void;
        public FillColumn(column: number, graphicList: Graphic2d[], rowOffset: number = 0): void {
            var graphic: Graphic2d;

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
        public FillSpace(row: number, column: number, graphicList: Graphic2d[][]): void {
            var graphic: Graphic2d;

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
        public Get(row: number, column: number): Graphic2d {
            if (!this.ValidRow(row) || !this.ValidColumn(column)) {
                return null;
            }

            return this._grid[row][column];
        }

        /**
        * Retrieves graphics within the provided row.
        * @param row The row to retrieve.
        */
        public GetRow(row: number): Graphic2d[];
        /**
        * Retrieves graphics within the row starting at the provided column offset.
        * @param row The row to retrieve.
        * @param columnOffset The column to start retrieving the row at.
        */
        public GetRow(row: number, columnOffset: number): Graphic2d[];
        public GetRow(row: number, columnOffset: number = 0): Graphic2d[] {
            var rowList: Graphic2d[] = [];

            for (var i = columnOffset; i < this._columns; i++) {
                rowList.push(this._grid[row][i]);
            }

            return rowList;
        }

        /**
        * Retrieves graphics within the provided column.
        * @param column The column to retrieve.
        */
        public GetColumn(column: number): Graphic2d[];
        /**
        * Retrieves graphics within the column starting at the provided row offset.
        * @param column The column to retrieve.
        * @param rowOffset The row to start retrieving the column at.
        */
        public GetColumn(column: number, rowOffset: number): Graphic2d[];
        public GetColumn(column: number, rowOffset: number = 0): Graphic2d[] {
            var columnList: Graphic2d[] = [];

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
        public GetSpace(rowStart: number, columnStart: number, rowEnd: number, columnEnd: number): Graphic2d[] {
            var space: Graphic2d[] = [],
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
        public Clear(row: number, column: number): Graphic2d {
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
        public ClearRow(row: number): Graphic2d[];
        /**
        * Clears graphics within the row starting at the provided column offset.
        * @param row The row to clear.
        * @param columnOffset The column to start clearing the row at.
        */
        public ClearRow(row: number, columnOffset: number): Graphic2d[];
        public ClearRow(row: number, columnOffset: number = 0): Graphic2d[] {
            var vals: Graphic2d[] = [];

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
        public ClearColumn(column: number): Graphic2d[];
        /**
        * Clears graphics within the column starting at the provided column offset.
        * @param column The column to clear.
        * @param rowOffset The row to start clearing the column at.
        */
        public ClearColumn(column: number, rowOffset: number): Graphic2d[];
        public ClearColumn(column: number, rowOffset: number = 0): Graphic2d[] {
            var vals: Graphic2d[] = [];

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
        public ClearSpace(rowStart: number, columnStart: number, rowEnd: number, columnEnd: number): Graphic2d[] {
            var space: Graphic2d[] = [],
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
        public GetDrawBounds(): Bounds.Bounds2d {
            var bounds = new Bounds.BoundingRectangle(this.Position, this._size);

            bounds.Rotation = this.Rotation;

            return bounds;
        }

        /**
        * Converts the provided vertical coordinate to a row number that is based on the current grid.
        * @param y The vertical coordinate to convert to a row.
        */
        public ConvertToRow(y: number): number {
            return Math.floor((y - (this.Position.Y - this._size.HalfHeight)) / this._tileSize.Height);
        }

        /**
        * Converts the provided horizontal coordinate to a column number that is based on the current grid.
        * @param x The horizontal component to convert to a column.
        */
        public ConvertToColumn(x: number): number {
            return Math.floor((x - (this.Position.X - this._size.HalfWidth)) / this._tileSize.Width);
        }

        private BuildGridLines(): void {
            var halfSize: Size2d = this._size.Multiply(.5),
                topLeft: Vector2d = new Vector2d(-halfSize.Width, -halfSize.Height),
                bottomRight: Vector2d = new Vector2d(halfSize.Width, halfSize.Height);

            for (var i = 0; i < this._rows; i++) {
                this._gridLines.push(new Line2d(topLeft.X, topLeft.Y + i * this._tileSize.Height, bottomRight.X, topLeft.Y + i * this._tileSize.Height, 1, this._gridLineColor));

                if (i === 0) {
                    for (var j = 0; j < this._columns; j++) {
                        this._gridLines.push(new Line2d(topLeft.X + j * this._tileSize.Width, topLeft.Y, topLeft.X + j * this._tileSize.Width, bottomRight.Y, 1, this._gridLineColor));
                    }
                }
            }

            this._gridLines.push(new Line2d(topLeft.X, bottomRight.Y, bottomRight.X, bottomRight.Y, 1));
            this._gridLines.push(new Line2d(bottomRight.X, topLeft.Y, bottomRight.X, bottomRight.Y, 1));
        }

        private GetInsideGridPosition(row: number, column: number): Vector2d {
            return new Vector2d(column * this._tileSize.Width - this._size.HalfWidth + this._tileSize.HalfWidth, row * this._tileSize.Height - this._size.HalfHeight + this._tileSize.HalfHeight);
        }

        private ValidRow(row: number): boolean {
            return row >= 0 && row < this._rows;
        }

        private ValidColumn(column: number): boolean {
            return column >= 0 && column < this._columns;
        }
    }

}
/* Matrix2x2.ts */





module EndGate {

    /**
    * Defines a matrix with 2 columns and 2 rows (2x2).
    */
    export class Matrix2x2 implements _.ITyped, ICloneable {
        public _type: string = "Matrix2x2";

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
        constructor(topLeft: number = 0, topRight: number = 0, botLeft: number = 0, botRight: number = 0) {
            this.Values = [
                [topLeft, topRight],
                [botLeft, botRight]
            ];
        }
        
        /**
        * Creates a Matrix2x2 with all its rows and columns initialized to 0.
        */
        public static get Zero(): Matrix2x2 {
            return new Matrix2x2();
        }

        /**
        * Returns the identity matrix for a 2x2.
        */
        public static get Identity(): Matrix2x2 {
            return new Matrix2x2(1, 0, 0, 1);
        }

        /**
        * Executes the action with each row and column item of this Matrix2x2 and modifies their values.
        * @param action The function used to modify each row and column items.
        */
        public Apply(action: (val: number) => number): void {
            this.Values[0][0] = action(this.Values[0][0]);
            this.Values[0][1] = action(this.Values[0][1]);
            this.Values[1][0] = action(this.Values[1][0]);
            this.Values[1][1] = action(this.Values[1][1]);
        }

        /**
        * Executes the action with each row and column item of this Matrix2x2.
        * @param action The function to pass the row column item to.
        */
        public Trigger(action: (val: number) => void ): void {
            action(this.Values[0][0]);
            action(this.Values[0][1]);
            action(this.Values[1][0]);
            action(this.Values[1][1]);
        }

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
        public Add(val: any): Matrix2x2 {
            if (val._type === "Matrix2x2") {
                return new Matrix2x2(this.Values[0][0] + val.Values[0][0], this.Values[0][1] + val.Values[0][1], this.Values[1][0] + val.Values[1][0], this.Values[1][1] + val.Values[1][1]);
            }
            else {
                return new Matrix2x2(this.Values[0][0] + val, this.Values[0][1] + val, this.Values[1][0] + val, this.Values[1][1] + val);
            }
        }

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
        public Multiply(val: any): Matrix2x2 {
            if (val._type === "Matrix2x2") {
                return new Matrix2x2(this.Values[0][0] * val.Values[0][0] + this.Values[0][1] * val.Values[1][0],
                                     this.Values[0][0] * val.Values[0][1] + this.Values[0][1] * val.Values[1][1],
                                     this.Values[1][0] * val.Values[0][0] + this.Values[1][1] * val.Values[1][0],
                                     this.Values[1][0] * val.Values[0][1] + this.Values[1][1] * val.Values[1][1]);
            }
            else {
                return new Matrix2x2(this.Values[0][0] * val, this.Values[0][1] * val, this.Values[1][0] * val, this.Values[1][1] * val);
            }
        }

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
        public Subtract(val: any): Matrix2x2 {
            if (val._type === "Matrix2x2") {
                return new Matrix2x2(this.Values[0][0] - val.Values[0][0], this.Values[0][1] - val.Values[0][1], this.Values[1][0] - val.Values[1][0], this.Values[1][1] - val.Values[1][1]);
            }
            else {
                return new Matrix2x2(this.Values[0][0] - val, this.Values[0][1] - val, this.Values[1][0] - val, this.Values[1][1] - val);
            }
        }

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
        public SubtractFrom(val: any): Matrix2x2 {
            if (val._type === "Matrix2x2") {
                return new Matrix2x2(val.Values[0][0] - this.Values[0][0], val.Values[0][1] - this.Values[0][1], val.Values[1][0] - this.Values[1][0], val.Values[1][1] - this.Values[1][1]);
            }
            else {
                return new Matrix2x2(val - this.Values[0][0], val - this.Values[0][1], val - this.Values[1][0], val - this.Values[1][1]);
            }
        }

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
        public Divide(val: any): Matrix2x2 {
            if (val._type === "Matrix2x2") {
                return new Matrix2x2(this.Values[0][0] / val.Values[0][0], this.Values[0][1] / val.Values[0][1], this.Values[1][0] / val.Values[1][0], this.Values[1][1] / val.Values[1][1]);
            }
            else {
                return new Matrix2x2(this.Values[0][0] / val, this.Values[0][1] / val, this.Values[1][0] / val, this.Values[1][1] / val);
            }
        }

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
        public DivideFrom(val: any): Matrix2x2 {
            if (val._type === "Matrix2x2") {
                return new Matrix2x2(val.Values[0][0] / this.Values[0][0], val.Values[0][1] / this.Values[0][1], val.Values[1][0] / this.Values[1][0], val.Values[1][1] / this.Values[1][1]);
            }
            else {
                return new Matrix2x2(val / this.Values[0][0], val / this.Values[0][1], val / this.Values[1][0], val / this.Values[1][1]);
            }
        }

        /**
        * Returns a Vector2d that has been transformed by the current Matrix2x2.
        * @param vector The vector to transform.
        */
        public Transform(vector: Vector2d): Vector2d {
            return new Vector2d(this.Values[0][0] * vector.X + this.Values[0][1] * vector.Y, this.Values[1][0] * vector.X + this.Values[1][1] * vector.Y);
        }

        /**
        * Returns the transpose of the current Matrix2x2.
        */
        public Transpose(): Matrix2x2 {
            return new Matrix2x2(this.Values[0][0],this.Values[1][0], this.Values[0][1], this.Values[1][1]);
        }

        /**
        * Returns the determinant of the current Matrix2x2.
        */
        public Determinant(): number {
            return this.Values[0][0] * this.Values[1][1] - this.Values[0][1] * this.Values[1][0];
        }

        /**
        * Returns the inverse of the current Matrix2x2.
        */
        public Inverse(): Matrix2x2 {
            return new Matrix2x2(this.Values[1][1], -this.Values[0][1], -this.Values[1][0], this.Values[0][0]).Multiply(1 / this.Determinant());
        }

        /**
        * Returns a Matrix2x2 that has identical rows and columns as the current Matrix2x2.
        */
        public Clone(): Matrix2x2 {
            return new Matrix2x2(this.Values[0][0], this.Values[0][1], this.Values[1][0], this.Values[1][1]);
        }

        /**
        * Determines whether this Matrix2x2 has the same row and column values as the provided Matrix2x2.
        * @param matrix The Matrix2x2 to compare the current Matrix2x2 to.
        */
        public Equivalent(matrix: Matrix2x2): boolean {
            return this.Values[0][0] === matrix.Values[0][0] && this.Values[0][1] === matrix.Values[0][1] && this.Values[1][0] === matrix.Values[1][0] && this.Values[1][1] === matrix.Values[1][1];
        }

        /**
        * Overridden toString method to display Matrix2x2 in easy to read format: "[topLeft, topRight] [botLeft, botRight]"
        */
        public toString(): string {
            return this.Values[0].toString() + " " + this.Values[1].toString();
        }

        /**
        * Creates a scaling matrix based off the provided Vector2d.
        * @param vector The vector used to determine the X and Y scaling values.
        */
        public static Scale(vector: Vector2d): Matrix2x2 {
            return new Matrix2x2(vector.X, 0, 0, vector.Y);
        }
    }
}
/* Helpers.ts */
function asyncLoop(action: (next: () => void, index: number) => void, count: number, onComplete?: ()=> void) {
    (function loop(index) {
        if (index < count) {
            action(function () {
                loop(index + 1);
            }, index);
        }
        else if(onComplete) {
            onComplete();
        }
    } (0));
}
/* TileMap.ts */




module EndGate.Map {

    /**
    * Defines an abstract class TileMap that takes an array of resources to be mapped to tiles.
    */
    export class TileMap extends Graphics.Graphic2d {
        public _Resources: Graphics.ImageSource[];

        /**
        * Creates a new instance of the TileMap object.
        * @param x Initial horizontal location of the tile map.
        * @param y Initial vertical location of the tile map.
        * @param resources A one dimensional array of image resources that make up the tile map (this cannot change after construction).
        */
        constructor(x: number, y: number, resources: Graphics.ImageSource[]) {
            super(new Vector2d(x, y));

            this._Resources = resources;
        }
    }

}
/* ITileDetails.ts */




declare module EndGate.Map {

    /**
    * Defines an object that is used to fully describe a loaded tile.
    */
    export interface ITileDetails {
        /**
        * The Tile that will be on the map.
        */
        Tile: Graphics.Sprite2d;

        /**
        * The resource index that was used to build the tile.
        */
        ResourceIndex: number;

        /**
        * The row that the tile occupies.
        */
        Row: number;

        /**
        * The column that the tile occupies.
        */
        Column: number;

        /**
        * The TileMap that contains the Tile.  This can be used to determine the absolute position of the Tile by adding the Parent and Tile's position.
        */
        Parent: TileMap;
    }

}
/* SquareTile.ts */



module EndGate.Map {

    /**
    * Defines a SquareTile that is used by the SquareTileMap.  Represents one tile within the tile map.
    */
    export class SquareTile extends Graphics.Sprite2d {
        /**
        * Creates a new instance of the SquareTile object.
        * @param image The image that is within the tile.
        * @param width The width of the tile.
        * @param height The height of the tile.
        */
        constructor(image: Graphics.ImageSource, width: number, height: number) {
            super(0, 0, image, width, height); // Set position to 0 because the tile gets updated when it gets added to the tile map
        }
    }

}
/* SquareTileMap.ts */











module EndGate.Map {

    /**
    * Defines a structure that is proficient at creating diverse tile maps based off of a resource image.  Best drawn via a SceneryHandler.
    */
    export class SquareTileMap extends TileMap {
        /**
        * Gets or sets the tile load delay component.  This can be used to slowly load a square tile map to prevent the browser from freezing by adding a delay between tile loads to allow time for the DOM to update.  Defaults to TimeSpan.Zero.
        */
        public TileLoadDelay: TimeSpan;
        /**
        * Gets or sets the row load delay component.  This can be used to slowly load a square tile map to prevent the browser from freezing by adding a delay between row loads to allow time for the DOM to update.  Defaults to TimeSpan.Zero.
        */
        public RowLoadDelay: TimeSpan;

        private _grid: Graphics.Grid;
        private _staticMap: boolean;
        private _mapCache: HTMLCanvasElement;
        private _mapCacheContext: CanvasRenderingContext2D;
        private _onTileLoad: EventHandler2<ITileDetails, number>;
        private _onLoaded: EventHandler;
        private _loaded: boolean;
        private _tilesBuilt: number;
        private _totalTiles: number;

        /**
        * Creates a new instance of the SquareTileMap object.
        * @param x Initial horizontal location of the tile map.
        * @param y Initial vertical location of the tile map.
        * @param tileWidth The width of the tile map tiles (this cannot change after construction).
        * @param tileHeight The height of the tile map tiles (this cannot change after construction).
        * @param resources A one dimensional array of image resources that make up the tile map (this cannot change after construction).
        * @param mappings A two dimensional array numbers that map directly to the resources array to define the square tile map (this cannot change after construction).
        */
        constructor(x: number, y: number, tileWidth: number, tileHeight: number, resources: Graphics.ImageSource[], mappings: number[][]);
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
        constructor(x: number, y: number, tileWidth: number, tileHeight: number, resources: Graphics.ImageSource[], mappings: number[][], staticMap: boolean);
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
        constructor(x: number, y: number, tileWidth: number, tileHeight: number, resources: Graphics.ImageSource[], mappings: number[][], staticMap: boolean, drawGridLines: boolean);
        constructor(x: number, y: number, tileWidth: number, tileHeight: number, resources: Graphics.ImageSource[], mappings: number[][], staticMap: boolean = true, drawGridLines: boolean = false) {
            super(x, y, resources);

            this._grid = new Graphics.Grid(0, 0, mappings.length, mappings[0].length, tileWidth, tileHeight, drawGridLines);
            this._staticMap = staticMap;
            this._onTileLoad = new EventHandler2<ITileDetails, number>();
            this._onLoaded = new EventHandler();
            this._loaded = false;
            this._tilesBuilt = 0;
            this._totalTiles = this._grid.Rows * this._grid.Columns;
            this.TileLoadDelay = TimeSpan.Zero;
            this.RowLoadDelay = TimeSpan.Zero;

            if (this._staticMap) {
                this.BuildCache();
            }

            // Execute this on the next stack, to allow time for binding to the tile maps load events
            setTimeout(() => {
                this.FillGridWith(mappings, () => {
                    this._loaded = true;
                    this._onLoaded.Trigger();
                });
            }, 0);
        }

        /**
        * Gets an event that is triggered when a tile has been loaded, first argument is the tile details for the loaded tile, second is the percent complete.  Once this SquareTileMap has been created and all tiles loaded this event will no longer be triggered. Functions can be bound or unbound to this event to be executed when the event triggers.
        */
        public get OnTileLoad(): EventHandler2<ITileDetails, number> {
            return this._onTileLoad;
        }

        /**
        * Gets an event that is triggered when the square tile map has been loaded.  Once this SquareTileMap has been created and all tiles loaded this event will no longer be triggered. Functions can be bound or unbound to this event to be executed when the event triggers.
        */
        public get OnLoaded(): EventHandler {
            return this._onLoaded;
        }

        /**
        * Helper function used to take a SpriteSheet image and create a one dimensional resource tile array.
        * @param imageSource The sprite sheet to extract the tile resources from.
        * @param tileWidth The width of the sprite sheet tiles.
        * @param tileHeight The height of the sprite sheet tiles.
        */
        public static ExtractTiles(imageSource: Graphics.ImageSource, tileWidth: number, tileHeight: number): Graphics.ImageSource[] {
            var resources: Graphics.ImageSource[] = [],
                framesPerRow: number = Math.floor(imageSource.ClipSize.Width / tileWidth),
                rows: number = Math.floor(imageSource.ClipSize.Height / tileHeight);

            for (var i = 0; i < rows; i++) {
                for (var j = 0; j < framesPerRow; j++) {
                    resources.push(imageSource.Extract(j * tileWidth, i * tileHeight, tileWidth, tileHeight));
                }
            }

            return resources;
        }

        /**
        * Determines if the current SquareTileMap is loaded.
        */
        public IsLoaded(): boolean {
            return this._loaded;
        }

        /**
        * Draws the SquareTileMap onto the given context.  If the SquareTileMap is part of a Scene2d or SceneryHandler the Draw function will be called automatically.
        * @param context The canvas context to draw the SquareTileMap onto.
        */
        public Draw(context: CanvasRenderingContext2D): void {
            super._StartDraw(context);

            if (!this._staticMap) {
                this._grid.Draw(context);
            }
            else {
                context.drawImage(this._mapCache, -this._mapCache.width / 2, -this._mapCache.height / 2);
            }

            super._EndDraw(context);
        }

        /**
        * The bounding area that represents where the SquareTileMap will draw.
        */
        public GetDrawBounds(): Bounds.Bounds2d {
            var bounds = this._grid.GetDrawBounds();

            bounds.Position = this.Position;

            return bounds;
        }

        private BuildCache(): void {
            var size: Size2d = this._grid.Size,
                originalPosition = this._grid.Position;

            this._mapCache = <HTMLCanvasElement>document.createElement("canvas");
            this._mapCache.width = size.Width;
            this._mapCache.height = size.Height;
            this._mapCacheContext = this._mapCache.getContext("2d");
            this._mapCacheContext.translate(size.HalfWidth, size.HalfHeight);
        }

        private CacheTile(tile: SquareTile): void {
            // Draw the tile onto the map cache
            tile.Draw(this._mapCacheContext);
        }

        private FillGridWith(mappings: number[][], onComplete: () => any): void {
            asyncLoop((next: () => void , rowsComplete: number) => {
                this.AsyncBuildGridRow(rowsComplete, mappings, () => {
                    next();
                });
            }, mappings.length, () => {
                    onComplete();
                });
        }

        private AsyncBuildGridTile(row: number, column: number, resourceIndex: number, onComplete: (tile: SquareTile) => any): void {
            var action = () => {
                var tile: SquareTile,
                    tileGraphic: Graphics.ImageSource = this._Resources[resourceIndex];

                tile = new SquareTile(tileGraphic, this._grid.TileSize.Width, this._grid.TileSize.Height);

                this._grid.Fill(row, column, tile);

                this.OnTileLoad.Trigger({
                    Tile: tile,
                    Row: row,
                    Column: column,
                    ResourceIndex: resourceIndex,
                    Parent: this
                }, this._tilesBuilt / this._totalTiles);

                if (this._staticMap) {
                    this.CacheTile(tile);
                }

                onComplete(tile);
            };

            if (this.TileLoadDelay.Milliseconds > 0) {
                setTimeout(action, this.TileLoadDelay.Milliseconds);
            }
            else {
                action();
            }
        }

        // Only pretend async in order to free up the DOM
        private AsyncBuildGridRow(rowIndex: number, mappings: number[][], onComplete: () => any): void {
            setTimeout(() => {
                asyncLoop((next: () => void , tilesLoaded: number) => {
                    this._tilesBuilt++;

                    if (mappings[rowIndex][tilesLoaded] >= 0) {
                        this.AsyncBuildGridTile(rowIndex, tilesLoaded, mappings[rowIndex][tilesLoaded], (tile: SquareTile) => {
                            next();
                        });
                    }
                    else {
                        next();
                    }
                }, mappings[rowIndex].length, () => {
                        onComplete();
                    });
            }, this.RowLoadDelay.Milliseconds);
        }
    }

}
/* EndGateAPI.ts */


































// When this file is compiled into a declaration file it does not include this line,
// therefore in the build.ps1 we have to append this aliasing module.
import eg = EndGate;
/* NumberExtensions.ts */


interface Number extends EndGate.ICloneable {}

Number.prototype.Clone = function (): any { return this; };
/* IHookFunction.ts */


declare module EndGate.Map.Loaders {

    /**
    * Defines an IHookFunction that represents a function that can be used to hook into map loading tiles.
    */
    export interface IHookFunction {
        (details: ITileDetails, propertyValue: string): any;
    }

}
/* IMapLoadedResult.ts */


declare module EndGate.Map.Loaders {

    /**
    * Defines an object that contains all the information needed to create a scenic map.
    */
    export interface IMapLoadedResult {
        /**
        * Gets or sets the layers that will represent the scenery of the game.  Each layer should be added to the scenery in order to draw the layers.
        */
        Layers: Array<TileMap>;
    }

}
/* IMapPreloadInfo.ts */


declare module EndGate.Map.Loaders {

    /**
    * Defines an object that contains some immediately available information about the map that is about to be loaded.
    */
    export interface IMapPreloadInfo {
        /**
        * The total number of layers the map contains.
        */
        LayerCount: number;

        /**
        * The total number of tile resource sheets that are used to represent the map.
        */
        ResourceSheetCount: number;

        /**
        * The total number of tiles within the map (empty or not).
        */
        TileCount: number;

        /**
        * Gets an event that is triggered when the percent loaded value has changed, first argument is the percent loaded (0-1).  Functions can be bound or unbound to this event to be executed when the event triggers.
        */
        OnPercentLoaded: EventHandler1<number>;
    }

}
/* IPropertyHooks.ts */


declare module EndGate.Map.Loaders {

    /**
    * Defines an object that can be used to provide hooks to adjust tiles as they are built.
    */
    export interface IPropertyHooks {
        /**
        * Hooks to trigger when a resource tile with the specified property is used when loading a map.  Passes in the created tile and the property value for the hook.
        */
        ResourceTileHooks?: { [property: string]: IHookFunction };

        /**
        * Hooks to trigger when a resource sheet with the specified property is used when loading a map.  Passes in created tiles from the resource sheet and the property value for the hook.
        */
        ResourceSheetHooks?: { [property: string]: IHookFunction };

        /**
        * Hooks to trigger when a layer with the specified property is used when loading a map.  Passes in created tiles from the layer and the property value for the hook.
        */
        LayerHooks?: { [property: string]: IHookFunction };
    }

}
/* IMapLoader.ts */




declare module EndGate.Map.Loaders {

    /**
    * Defines an object that can load data and output a result asynchronously.
    */
    export interface IMapLoader {
        /**
        * Loads the provided data then calls the onComplete function once valid map data has been created.
        * @param data The base data that will be transformed into the IMapLoadedResult format.
        * @param propertyHooks Property hooks that can be used to modify tiles while they're loading.
        * @param onComplete The function to trigger when the data has been converted into a valid IMapLoadedResult.
        */
        Load(data: any, propertyHooks: IPropertyHooks, onComplete: (result: IMapLoadedResult) => any): IMapPreloadInfo;
    }

}
/* JSONFormat.ts */
module EndGate.Map.Loaders {

    /**
    * Defines supported JSON formats for map loading.
    */
    export enum JSONFormat {
        TMX
    }

}
/* ITMXLayer.ts */
declare module EndGate.Map.Loaders._.TMX {

    export interface ITMXLayer {
        name: string;
        data: Array<number>;        
        opacity: number;
        type: string;
        visible: boolean;
        width: number;
        height: number;
        x: number;
        y: number;
        properties: { [property: string]: string };
    }

}
/* ITMXTileset.ts */
declare module EndGate.Map.Loaders._.TMX {

    export interface ITMXTileset {
        firstgid: number;
        image: string;
        imageheight: number;
        imagewidth: number;
        margin: number;
        name: string;
        properties: { [property: string]: string };
        spacing: number;
        tilewidth: number;
        tileheight: number;
        tileproperties: { [tileIndex: string]: { [property: string]: string } };
    }

}
/* ITMX.ts */



declare module EndGate.Map.Loaders._.TMX {

    export interface ITMX {
        version: number;
        width: number;
        height: number;
        tilewidth: number;
        tileheight: number;
        orientation: string;
        properties: any;
        layers: Array<ITMXLayer>;
        tilesets: Array<ITMXTileset>;
    }

}
/* OrthogonalLoader.ts */













module EndGate.Map.Loaders._.TMX {

    interface TileExtractResult {
        ResourceHooks: Array<Array<(details: ITileDetails) => any>>;
        Resources: Array<Graphics.ImageSource>;
    }

    export class OrthogonalLoader implements IMapLoader {
        private static _imagePercentMax: number = .2;

        public Load(data: ITMX, propertyHooks: IPropertyHooks, onComplete: (result: IMapLoadedResult) => any): IMapPreloadInfo {
            // We're initially at 0%.
            var percent = 0,
                tileCount = 0,
                onPartialLoad: EventHandler1<number> = new EventHandler1<number>();

            // Load all the sources referenced within the data
            this.LoadTilesetSources(data.tilesets,
                (tileset: Graphics.ImageSource) => {
                    percent += (1 / data.tilesets.length) * OrthogonalLoader._imagePercentMax

                    onPartialLoad.Trigger(percent);
                },
                (tilesetSources: { [tilesetName: string]: Graphics.ImageSource }) => {
                    // Triggered once all the sources have completed loading

                    // All the tiles extracted represent our resource list
                    var resources: TileExtractResult = this.ExtractTilesetTiles(data.tilesets, tilesetSources, propertyHooks),
                        mappings: Array<Array<number>>,
                        layers: Array<SquareTileMap> = new Array<SquareTileMap>(),
                        layerPercentValue = (1 - OrthogonalLoader._imagePercentMax) / data.layers.length;

                    percent = OrthogonalLoader._imagePercentMax;

                    asyncLoop((next: () => void , i: number) => {
                        if (data.layers[i].type !== "tilelayer") {
                            throw new Error("Invalid layer type.  The layer type '" + data.layers[i].type + "' is not supported.");
                        }

                        this.AsyncBuildLayer(data, i, propertyHooks, resources,
                            (details: ITileDetails, percentLoaded: number) => {
                                onPartialLoad.Trigger(percent + percentLoaded * layerPercentValue);
                            },
                            (layer: SquareTileMap) => {
                                percent += layerPercentValue;

                                onPartialLoad.Trigger(percent);

                                layers.push(layer);

                                next();
                            });
                    }, data.layers.length, () => {
                            // All layers loaded

                            onComplete({
                                Layers: layers
                            });
                        });
                });

            for (var i = 0; i < data.layers.length; i++) {
                tileCount += data.layers[i].data.length;
            }

            return {
                TileCount: tileCount,
                LayerCount: data.layers.length,
                ResourceSheetCount: data.tilesets.length,
                OnPercentLoaded: onPartialLoad
            };
        }

        private LoadTilesetSources(tilesets: Array<ITMXTileset>, onTilesetLoad: (tileset: Graphics.ImageSource) => any, onComplete: (tilesetSources: { [tilesetName: string]: Graphics.ImageSource }) => any): void {
            var tilesetSources: { [tilesetName: string]: Graphics.ImageSource } = {},
                loadedCount: number = 0,
                onLoaded = (source: Graphics.ImageSource) => {
                    onTilesetLoad(source);
                    // If everything has loaded
                    if (++loadedCount === tilesets.length) {
                        onComplete(tilesetSources);
                    }
                };

            for (var i = 0; i < tilesets.length; i++) {
                tilesetSources[tilesets[i].name] = new Graphics.ImageSource(tilesets[i].image, tilesets[i].imagewidth, tilesets[i].imageheight);
                tilesetSources[tilesets[i].name].OnLoaded.Bind(onLoaded);
            }
        }

        private ExtractTilesetTiles(tilesets: Array<ITMXTileset>, tilesetSources: { [tilesetName: string]: Graphics.ImageSource }, propertyHooks: IPropertyHooks): TileExtractResult {
            var tilesetTiles: Array<Graphics.ImageSource> = new Array<Graphics.ImageSource>(),
                resourceHooks = new Array<Array<(details: ITileDetails) => any>>(),
                sources: Array<Graphics.ImageSource>,
                index: number;

            tilesets.sort((a: ITMXTileset, b: ITMXTileset) => { return a.firstgid - b.firstgid; });

            for (var i = 0; i < tilesets.length; i++) {
                sources = SquareTileMap.ExtractTiles(tilesetSources[tilesets[i].name], tilesets[i].tilewidth, tilesets[i].tileheight);

                for (var property in tilesets[i].properties) {
                    if (typeof propertyHooks.ResourceSheetHooks[property] !== "undefined") {
                        for (var j = tilesets[i].firstgid - 1; j < tilesets[i].firstgid - 1 + sources.length; j++) {
                            if (typeof resourceHooks[j] === "undefined") {
                                resourceHooks[j] = new Array<(details: ITileDetails) => any>();
                            }

                            resourceHooks[j].push(this.BuildHookerFunction(tilesets[i].properties[property], propertyHooks.ResourceSheetHooks[property]));
                        }
                    }
                }

                for (var tileIndex in tilesets[i].tileproperties) {
                    for (var property in tilesets[i].tileproperties[tileIndex])
                        if (typeof propertyHooks.ResourceTileHooks[property] !== "undefined") {
                            index = parseInt(tileIndex) + tilesets[i].firstgid - 1;

                            if (typeof resourceHooks[index] === "undefined") {
                                resourceHooks[index] = new Array<(details: ITileDetails) => any>();
                            }

                            resourceHooks[index].push(this.BuildHookerFunction(tilesets[i].tileproperties[tileIndex][property], propertyHooks.ResourceTileHooks[property]));
                        }
                }

                tilesetTiles = tilesetTiles.concat(sources);
            }

            return {
                Resources: tilesetTiles,
                ResourceHooks: resourceHooks
            };
        }

        // Not true async but it frees up the DOM
        private AsyncBuildLayer(tmxData: ITMX, layerIndex: number, propertyHooks: IPropertyHooks, resources: TileExtractResult, onTileLoad: (details: ITileDetails, percentComplete: number) => any, onComplete: (squareTileMap: SquareTileMap) => any): void {
            setTimeout(() => {
                // Convert the layer data to a 2 dimensional array and subtract 1 from all the data points (to make it 0 based)
                var tmxLayer = tmxData.layers[layerIndex],
                    mappings = this.NormalizeLayerData(tmxLayer.data, tmxData.width),
                    layer = new SquareTileMap(tmxLayer.x, tmxLayer.y, tmxData.tilewidth, tmxData.tileheight, resources.Resources, mappings),
                    layerHooks: Array<(details: ITileDetails) => any> = new Array<(details: ITileDetails) => any>();

                for (var property in tmxLayer.properties) {
                    if (typeof propertyHooks.LayerHooks[property] !== "undefined") {
                        layerHooks.push(this.BuildHookerFunction(tmxLayer.properties[property], propertyHooks.LayerHooks[property]));
                    }
                }

                layer.ZIndex = layerIndex;
                layer.Visible = tmxLayer.visible;
                layer.Opacity = tmxLayer.opacity;

                // Enough delay to ensure that the page doesn't freeze
                layer.RowLoadDelay = TimeSpan.FromMilliseconds(5);

                layer.OnTileLoad.Bind((details: ITileDetails, percentComplete: number) => {
                    if (resources.ResourceHooks[details.ResourceIndex]) {
                        for (var i = 0; i < resources.ResourceHooks[details.ResourceIndex].length; i++) {
                            resources.ResourceHooks[details.ResourceIndex][i](details);
                        }
                    }

                    for (var i = 0; i < layerHooks.length; i++) {
                        layerHooks[i](details);
                    }

                    onTileLoad(details, percentComplete);
                });

                layer.OnLoaded.Bind(() => {
                    onComplete(layer);
                });
            }, 0);
        }

        private BuildHookerFunction(propertyValue: string, fn: IHookFunction): (details: ITileDetails) => any {
            return (details: ITileDetails): any => {
                return fn(details, propertyValue);
            };
        }

        private NormalizeLayerData(data: Array<number>, columns: number): Array<Array<number>> {
            var normalized: Array<Array<number>> = new Array<Array<number>>(),
                index: number;

            for (var i = 0; i < data.length; i++) {
                index = Math.floor(i / columns);

                if (!(normalized[index] instanceof Array)) {
                    normalized[index] = new Array<number>();
                }

                // Subtract 1 because TMX format starts at 1
                normalized[index].push(data[i] - 1);
            }

            return normalized;
        }
    }

}
/* TMXLoader.ts */







module EndGate.Map.Loaders._.TMX {

    export class TMXLoader implements IMapLoader {
        private _orientationLoaders: { [orientation: string]: IMapLoader };

        constructor() {
            this._orientationLoaders = {
                orthogonal: new OrthogonalLoader()
            };
        }

        public Load(data: ITMX, propertyHooks: IPropertyHooks, onComplete: (result: IMapLoadedResult) => any): IMapPreloadInfo {
            if (!this._orientationLoaders[data.orientation]) {
                throw new Error("Invalid orientation.  The orientation '" + data.orientation + "' is not supported.");
            }

            return this._orientationLoaders[data.orientation].Load(data, propertyHooks, onComplete);
        }
    }

}
/* JSONLoader.ts */









module EndGate.Map.Loaders {

    /**
    * Defines a JSON loader that is used to load maps.
    */
    export class JSONLoader {
        private static _loaders: { [format: string]: IMapLoader } = {
            TMX: new _.TMX.TMXLoader()
        };

        /**
        * Loads the provided tmx formatted json object then calls the onComplete function once the json has been transformed.
        * @param json The JSON data that represents the map.
        * @param onComplete The function to trigger when the json has been converted into a valid IMapLoadedResult.
        */
        public static Load(json: Object, onComplete: (result: IMapLoadedResult) => any): IMapPreloadInfo;
        /**
        * Loads the provided json object then calls the onComplete function once the json has been transformed.
        * @param json The JSON data that represents the map.
        * @param onComplete The function to trigger when the json has been converted into a valid IMapLoadedResult.
        * @param propertyHooks Property hooks that can be used to modify tiles while they're loading.  All maps that are loaded are static square tile maps, therefore modified tiles will only be drawn once.
        */
        public static Load(json: Object, onComplete: (result: IMapLoadedResult) => any, propertyHooks: IPropertyHooks): IMapPreloadInfo;
        /**
        * Loads the provided json object then calls the onComplete function once the json has been transformed.
        * @param json The JSON data that represents the map.
        * @param onComplete The function to trigger when the json has been converted into a valid IMapLoadedResult.
        * @param propertyHooks Property hooks that can be used to modify tiles while they're loading.  All maps that are loaded are static square tile maps, therefore modified tiles will only be drawn once.
        * @param format The format of the JSON object.  Defaults to the tmx format.
        */
        public static Load(json: Object, onComplete: (result: IMapLoadedResult) => any, propertyHooks: IPropertyHooks, format: JSONFormat): IMapPreloadInfo;
        public static Load(json: Object, onComplete: (result: IMapLoadedResult) => any, propertyHooks?: IPropertyHooks, format: JSONFormat = JSONFormat.TMX): IMapPreloadInfo {
            if (!propertyHooks) {
                // Defaults
                propertyHooks = {
                    ResourceTileHooks: {},
                    ResourceSheetHooks: {},
                    LayerHooks: {}
                };
            }

            return JSONLoader._loaders[JSONFormat[format]].Load(json, propertyHooks, onComplete);
        }
    }

}
/* ITweeningFunction.ts */


module EndGate.Tweening.Functions {

    /**
    * Defines an ITweeningFunction interface that represents a function that can be used to translate Tween's.
    */
    export interface ITweeningFunction {
        (from: number, to: number, elapsed: TimeSpan, duration: TimeSpan): number;
    }

}
/* Tween.ts */







module EndGate.Tweening {

    /**
    * Defines a base Tween class that is used to move a value from a start value to an end value.
    */
    export class Tween<T extends ICloneable> implements IUpdateable {
        private _from: T;
        private _to: T;
        private _current: T;
        private _duration: TimeSpan;
        private _elapsed: TimeSpan;
        private _playing: boolean;
        private _tweeningFunction: Functions.ITweeningFunction;
        private _onChange: EventHandler1<T>;
        private _onComplete: EventHandler1<Tween<T>>;

        /**
        * Creates a new instance of the Tween object.  This should only ever be called from derived classes via a super constructor call.
        * @param from Start value.
        * @param to End value.
        * @param duration How fast to move the current value from start to end.
        * @param tweeningFunction The function to use to translate the current value from start to end.  Different functions result in different translation behavior.
        */
        constructor(from: T, to: T, duration: TimeSpan, tweeningFunction: Functions.ITweeningFunction) {
            this._from = from.Clone();
            this._to = to.Clone();
            this._current = this._from.Clone();
            this._duration = duration;
            this._elapsed = TimeSpan.Zero;
            this._playing = false;
            this._onChange = new EventHandler1<T>();
            this._onComplete = new EventHandler1<Tween<T>>();
            this._tweeningFunction = tweeningFunction;
        }

        /**
        * Gets an event that is triggered when the tween has changed its Current value, occurs directly after a tween update.  Functions can be bound or unbound to this event to be executed when the event triggers.
        */
        public get OnChange(): EventHandler1<T> {
            return this._onChange;
        }

        /**
        * Gets an event that is triggered when the tween has completed transitioning the Current value, once triggered Elapsed will be equivalent to Duration and Current will be equivalent to To.  Functions can be bound or unbound to this event to be executed when the event triggers.
        */
        public get OnComplete(): EventHandler1<Tween<T>> {
            return this._onComplete;
        }

        /**
        * Gets or sets the From component of the tween.
        */
        public get From(): T {
            return this._from;
        }
        public set From(from: T) {
            this._from = from;
        }

        /**
        * Gets or sets the To component of the tween.
        */
        public get To(): T {
            return this._to;
        }
        public set To(to: T) {
            this._to = to;
        }

        /**
        * Gets or sets the Current component of the tween.  The Current is the current value of the tween, the final value of Current will be equivalent to To when the tween has completed.
        */
        public get Current(): T {
            return this._current;
        }
        public set Current(current: T) {
            this._current = current;
        }

        /**
        * Gets or sets the Duration component of the tween.  The Duration is how long the tween will take to go From -> To.
        */
        public get Duration(): TimeSpan {
            return this._duration;
        }
        public set Duration(duration: TimeSpan) {
            this._duration = duration;
        }

        /**
        * Gets or the Elapsed component of the tween.  Elapsed represents how far along the tween is.  When Elapsed equals Duration the tween is completed.
        */
        public get Elapsed(): TimeSpan {
            return this._elapsed.Clone();
        }

        /**
        * Gets or sets the TweeningFunction of the tween.  The TweeningFunction controls how the tween translates the Current value to the To value.
        */
        public get TweeningFunction(): Functions.ITweeningFunction {
            return this._tweeningFunction;
        }
        public set TweeningFunction(fn: Functions.ITweeningFunction) {
            this._tweeningFunction = fn;
        }

        /**
        * Determines if the tween is playing.
        */
        public IsPlaying(): boolean {
            return this._playing;
        }

        /**
        * Starts playing the tween.  The tween will only start translating the value if Update is called.
        */
        public Play(): void {
            this._playing = true;
        }

        /**
        * Pauses the tween.  Calls to update will not translate the tween when paused.
        */
        public Pause(): void {
            this._playing = false;
        }

        /**
        * Resets the tween to the To location and resets the Elapsed time.  This does not stop or start the tween.
        */
        public Reset(): void {
            this._elapsed.Milliseconds = 0;
            this._current = this._from.Clone();
        }

        /**
        * Stops the tween from playing.  This also resets the tween to its To value.
        */
        public Stop(): void {
            this._playing = false;
            this.Reset();
        }

        /**
        * Restarts the tween.  Essentially calls Reset and then Play.
        */
        public Restart(): void {
            this.Reset();
            this.Play();
        }

        /**
        * Reverses the tween from the Current value back to the From value.  This changes the To component to equal the From value and the From value to equal the Current value.
        */
        public Reverse(): void {
            this._elapsed = TimeSpan.Zero;
            this._to = this._from;
            this._from = this.Current.Clone();
        }

        /**
        * Updates the tweens Current and Elapsed component if the tween is playing.
        * @param gameTime The global game time object.  Used to represent total time running and used to track update interval elapsed speeds.
        */
        public Update(gameTime: GameTime): void {
            if (!this._playing || (this._elapsed.Equivalent(this._duration)))
            {
                return;
            }

            this._elapsed = this._elapsed.Add(gameTime.Elapsed);

            if (this._elapsed.Milliseconds >= this._duration.Milliseconds) {
                this._elapsed = this._duration.Clone();

                this._current = this._to.Clone();
                this._playing = false;

                this._onChange.Trigger(this._current.Clone());
                this._onComplete.Trigger(this);
            }
            else
            {
                this._UpdateTween();
                this._onChange.Trigger(this._current.Clone());
            }
        }

        public _UpdateTween(): void {
            // This should be overridden
        }
    }
}
/* NumberTween.ts */



module EndGate.Tweening {

    /**
    * Defines a NumberTween class that is used to move a number from a start value to an end value.
    */
    export class NumberTween extends Tween<number> {

        /**
        * Creates a new instance of the NumberTween object.
        * @param from Start number.
        * @param to End number.
        * @param duration How fast to move the current number from start to end.
        * @param tweeningFunction The function to use to translate the current number from start to end.  Different functions result in different translation behavior.
        */
        constructor(from: number, to: number, duration: TimeSpan, tweeningFunction: Functions.ITweeningFunction) {
            super(from, to, duration, tweeningFunction);
        }

        public _UpdateTween(): void {
            this.Current = this.TweeningFunction(this.From, this.To, this.Elapsed, this.Duration);
        }
    }

}
/* Size2dTween.ts */



module EndGate.Tweening {

    /**
    * Defines a Size2dTween class that is used to move a Size2d from a start value to an end value.
    */
    export class Size2dTween extends Tween<Size2d> {

        /**
        * Creates a new instance of the Size2dTween object.
        * @param from Start Size2d.
        * @param to End Size2d.
        * @param duration How fast to move the current Size2d from start to end.
        * @param tweeningFunction The function to use to translate the current Size2d from start to end.  Different functions result in different translation behavior.
        */
        constructor(from: Size2d, to: Size2d, duration: TimeSpan, tweeningFunction: Functions.ITweeningFunction) {
            super(from, to, duration, tweeningFunction);
        }

        public _UpdateTween(): void {
            this.Current = new Size2d(
                this.TweeningFunction(this.From.Width, this.To.Width, this.Elapsed, this.Duration),
                this.TweeningFunction(this.From.Height, this.To.Height, this.Elapsed, this.Duration)
                );
        }
    }

}
/* Vector2dTween.ts */



module EndGate.Tweening {

    /**
    * Defines a Vector2dTween class that is used to move a Vector2d from a start value to an end value.
    */
    export class Vector2dTween extends Tween<Vector2d> {

        /**
        * Creates a new instance of the Vector2dTween object.
        * @param from Start Vector2d.
        * @param to End Vector2d.
        * @param duration How fast to move the current Vector2d from start to end.
        * @param tweeningFunction The function to use to translate the current Vector2d from start to end.  Different functions result in different translation behavior.
        */
        constructor(from: Vector2d, to: Vector2d, duration: TimeSpan, tweeningFunction: Functions.ITweeningFunction) {
            super(from, to, duration, tweeningFunction);
        }

        public _UpdateTween(): void {
            this.Current = new Vector2d(
                this.TweeningFunction(this.From.X, this.To.X, this.Elapsed, this.Duration),
                this.TweeningFunction(this.From.Y, this.To.Y, this.Elapsed, this.Duration));
        }
    }

}
/* Back.ts */


module EndGate.Tweening.Functions {

    /**
    * Defines a Back tweening function collection that has an EaseIn, EaseOut, and EaseInOut function that can be used with Tween's.
    */
    export class Back {
        private static _easeIn: ITweeningFunction = (from: number, to: number, elapsed: TimeSpan, duration: TimeSpan): number => {
            var change = to - from,
                elapsedMilliseconds = elapsed.Milliseconds;

            return change * (elapsedMilliseconds /= duration.Milliseconds) * elapsedMilliseconds * ((1.70158 + 1) * elapsedMilliseconds - 1.70158) + from;
        };
        private static _easeOut: ITweeningFunction = (from: number, to: number, elapsed: TimeSpan, duration: TimeSpan): number => {
            var change = to - from,
                elapsedMilliseconds = elapsed.Milliseconds;

            return change * ((elapsedMilliseconds = elapsedMilliseconds / duration.Milliseconds - 1) * elapsedMilliseconds * ((1.70158 + 1) * elapsedMilliseconds + 1.70158) + 1) + from;
        };
        private static _easeInOut: ITweeningFunction = (from: number, to: number, elapsed: TimeSpan, duration: TimeSpan): number => {
            var change = to - from,
                elapsedMilliseconds = elapsed.Milliseconds,
                constant = 1.70158;

            if ((elapsedMilliseconds /= duration.Milliseconds / 2) < 1)
            {
                return change / 2 * (elapsedMilliseconds * elapsedMilliseconds * (((constant *= (1.525)) + 1) * elapsedMilliseconds - constant)) + from;
            }
            return change / 2 * ((elapsedMilliseconds -= 2) * elapsedMilliseconds * (((constant *= (1.525)) + 1) * elapsedMilliseconds + constant) + 2) + from;
        };

        /**
        * Gets the Back EaseIn function.
        */
        public static get EaseIn(): ITweeningFunction {
            return Back._easeIn;
        }

        /**
        * Gets the Back EaseOut function.
        */
        public static get EaseOut(): ITweeningFunction {
            return Back._easeOut;
        }

        /**
        * Gets the Back EaseInOut function.
        */
        public static get EaseInOut(): ITweeningFunction {
            return Back._easeInOut;
        }
    }

}
/* Bounce.ts */


module EndGate.Tweening.Functions {

    /**
    * Defines a Bounce tweening function collection that has an EaseIn, EaseOut, and EaseInOut function that can be used with Tween's.
    */
    export class Bounce {
        private static _easeIn: ITweeningFunction = (from: number, to: number, elapsed: TimeSpan, duration: TimeSpan): number => {
            var change = to - from;

            return change - Bounce.EaseOut(0, change, duration.Subtract(elapsed), duration) + from;
        };
        private static _easeOut: ITweeningFunction = (from: number, to: number, elapsed: TimeSpan, duration: TimeSpan): number => {
            var change = to - from,
                elapsedMilliseconds = elapsed.Milliseconds;

            if ((elapsedMilliseconds /= duration.Milliseconds) < (1 / 2.75)) {
                return change * (7.5625 * elapsedMilliseconds * elapsedMilliseconds) + from;
            }
            else if (elapsedMilliseconds < (2 / 2.75)) {
                return change * (7.5625 * (elapsedMilliseconds -= (1.5 / 2.75)) * elapsedMilliseconds + .75) + from;
            }
            else if (elapsedMilliseconds < (2.5 / 2.75))
            {
                return change * (7.5625 * (elapsedMilliseconds -= (2.25 / 2.75)) * elapsedMilliseconds + .9375) + from;
            }
            else
            {
                return change * (7.5625 * (elapsedMilliseconds -= (2.625 / 2.75)) * elapsedMilliseconds + .984375) + from;
            }
        };
        private static _easeInOut: ITweeningFunction = (from: number, to: number, elapsed: TimeSpan, duration: TimeSpan): number => {
            var change = to - from;

            if (elapsed.Milliseconds < duration.Milliseconds / 2) {
                return Bounce.EaseIn(0, change, elapsed.Multiply(2), duration) * 0.5 + from;
            }
            else {
                return Bounce.EaseOut(0, change, elapsed.Multiply(2).Subtract(duration), duration) * .5 + change * 0.5 + from;
            }
        };

        /**
        * Gets the Bounce EaseIn function.
        */
        public static get EaseIn(): ITweeningFunction {
            return Bounce._easeIn;
        }

        /**
        * Gets the Bounce EaseOut function.
        */
        public static get EaseOut(): ITweeningFunction {
            return Bounce._easeOut;
        }

        /**
        * Gets the Bounce EaseInOut function.
        */
        public static get EaseInOut(): ITweeningFunction {
            return Bounce._easeInOut;
        }
    }

}
/* Circular.ts */


module EndGate.Tweening.Functions {

    /**
    * Defines a Circular tweening function collection that has an EaseIn, EaseOut, and EaseInOut function that can be used with Tween's.
    */
    export class Circular {
        private static _easeIn: ITweeningFunction = (from: number, to: number, elapsed: TimeSpan, duration: TimeSpan): number => {
            var change = to - from,
                elapsedMilliseconds = elapsed.Milliseconds;

            return -change * (Math.sqrt(1 - (elapsedMilliseconds /= duration.Milliseconds) * elapsedMilliseconds) - 1) + from;
        };
        private static _easeOut: ITweeningFunction = (from: number, to: number, elapsed: TimeSpan, duration: TimeSpan): number => {
            var change = to - from,
                elapsedMilliseconds = elapsed.Milliseconds;

            return change * Math.sqrt(1 - (elapsedMilliseconds = elapsedMilliseconds / duration.Milliseconds - 1) * elapsedMilliseconds ) + from;
        };
        private static _easeInOut: ITweeningFunction = (from: number, to: number, elapsed: TimeSpan, duration: TimeSpan): number => {
            var change = to - from,
                elapsedMilliseconds = elapsed.Milliseconds;

            if ((elapsedMilliseconds /= duration.Milliseconds / 2) < 1) {
                return -change / 2 * (Math.sqrt(1 - elapsedMilliseconds * elapsedMilliseconds) - 1) + from;
            }
            return change / 2 * (Math.sqrt(1 - (elapsedMilliseconds -= 2) * elapsedMilliseconds) + 1) + from;
        };

        /**
        * Gets the Circular EaseIn function.
        */
        public static get EaseIn(): ITweeningFunction {
            return Circular._easeIn;
        }

        /**
        * Gets the Circular EaseOut function.
        */
        public static get EaseOut(): ITweeningFunction {
            return Circular._easeOut;
        }

        /**
        * Gets the Circular EaseInOut function.
        */
        public static get EaseInOut(): ITweeningFunction {
            return Circular._easeInOut;
        }
    }

}
/* Cubic.ts */


module EndGate.Tweening.Functions {

    /**
    * Defines a Cubic tweening function collection that has an EaseIn, EaseOut, and EaseInOut function that can be used with Tween's.
    */
    export class Cubic {
        private static _easeIn: ITweeningFunction = (from: number, to: number, elapsed: TimeSpan, duration: TimeSpan): number => {
            var change = to - from,
                elapsedMilliseconds = elapsed.Milliseconds;

            return change * (elapsedMilliseconds /= duration.Milliseconds) * elapsedMilliseconds * elapsedMilliseconds + from;
        };
        private static _easeOut: ITweeningFunction = (from: number, to: number, elapsed: TimeSpan, duration: TimeSpan): number => {
            var change = to - from,
                elapsedMilliseconds = elapsed.Milliseconds;

            return change * ((elapsedMilliseconds = elapsedMilliseconds / duration.Milliseconds - 1) * elapsedMilliseconds * elapsedMilliseconds + 1) + from;
        };
        private static _easeInOut: ITweeningFunction = (from: number, to: number, elapsed: TimeSpan, duration: TimeSpan): number => {
            var change = to - from,
                elapsedMilliseconds = elapsed.Milliseconds;

            if ((elapsedMilliseconds /= duration.Milliseconds / 2) < 1)
            {
                return change / 2 * elapsedMilliseconds * elapsedMilliseconds * elapsedMilliseconds + from;
            }
            return change / 2 * ((elapsedMilliseconds -= 2) * elapsedMilliseconds * elapsedMilliseconds + 2) + from;
        };

        /**
        * Gets the Cubic EaseIn function.
        */
        public static get EaseIn(): ITweeningFunction {
            return Cubic._easeIn;
        }

        /**
        * Gets the Cubic EaseOut function.
        */
        public static get EaseOut(): ITweeningFunction {
            return Cubic._easeOut;
        }

        /**
        * Gets the Cubic EaseInOut function.
        */
        public static get EaseInOut(): ITweeningFunction {
            return Cubic._easeInOut;
        }
    }

}
/* Elastic.ts */


module EndGate.Tweening.Functions {

    /**
    * Defines an Elastic tweening function collection that has an EaseIn, EaseOut, and EaseInOut function that can be used with Tween's.
    */
    export class Elastic {
        private static _easeIn: ITweeningFunction = (from: number, to: number, elapsed: TimeSpan, duration: TimeSpan): number => {
            var change = to - from,
                elapsedMilliseconds = elapsed.Milliseconds,
                timePartial,
                timePartialQuarter;

            if (elapsedMilliseconds === 0) {
                return from;
            }
            if ((elapsedMilliseconds /= duration.Milliseconds) === 1) {
                return from + change;
            }

            timePartial = duration.Milliseconds * .3;
            timePartialQuarter = timePartial / 4;

            return -(change * Math.pow(2, 10 * (elapsedMilliseconds -= 1)) * Math.sin((elapsedMilliseconds * duration.Milliseconds - timePartialQuarter) * (2 * Math.PI) / timePartial)) + from;
        };
        private static _easeOut: ITweeningFunction = (from: number, to: number, elapsed: TimeSpan, duration: TimeSpan): number => {
            var change = to - from,
                elapsedMilliseconds = elapsed.Milliseconds,
                timePartial,
                timePartialQuarter;

            if (elapsedMilliseconds === 0) {
                return from;
            }

            if ((elapsedMilliseconds /= duration.Milliseconds) === 1) {
                return from + change;
            }
            
            timePartial = duration.Milliseconds * .3;
            timePartialQuarter = timePartial / 4;
            
            return (change * Math.pow(2, -10 * elapsedMilliseconds) * Math.sin((elapsedMilliseconds * duration.Milliseconds - timePartialQuarter) * (2 * Math.PI) / timePartial) + change + from);
        };
        private static _easeInOut: ITweeningFunction = (from: number, to: number, elapsed: TimeSpan, duration: TimeSpan): number => {
            var change = to - from,
                elapsedMilliseconds = elapsed.Milliseconds,
                timePartial,
                timePartialQuarter;

            if (elapsedMilliseconds === 0) {
                return from;
            }

            if ((elapsedMilliseconds /= duration.Milliseconds / 2) === 2) {
                return from + change;
            }

            timePartial = duration.Milliseconds * (.3 * 1.5);
            timePartialQuarter = timePartial / 4;
            
            if (elapsedMilliseconds < 1) {
                return -.5 * (change * Math.pow(2, 10 * (elapsedMilliseconds -= 1)) * Math.sin((elapsedMilliseconds * duration.Milliseconds - timePartialQuarter) * (2 * Math.PI) / timePartial)) + from;
            }
            return (change * Math.pow(2, -10 * (elapsedMilliseconds -= 1)) * Math.sin((elapsedMilliseconds * duration.Milliseconds - timePartialQuarter) * (2 * Math.PI) / timePartial) * .5 + change + from);
        };

        /**
        * Gets the Elastic EaseIn function.
        */
        public static get EaseIn(): ITweeningFunction {
            return Elastic._easeIn;
        }

        /**
        * Gets the Elastic EaseOut function.
        */
        public static get EaseOut(): ITweeningFunction {
            return Elastic._easeOut;
        }

        /**
        * Gets the Elastic EaseInOut function.
        */
        public static get EaseInOut(): ITweeningFunction {
            return Elastic._easeInOut;
        }
    }

}
/* Exponential.ts */


module EndGate.Tweening.Functions {

    /**
    * Defines an Exponential tweening function collection that has an EaseIn, EaseOut, and EaseInOut function that can be used with Tween's.
    */
    export class Exponential {
        private static _easeIn: ITweeningFunction = (from: number, to: number, elapsed: TimeSpan, duration: TimeSpan): number => {
            var change = to - from,
                elapsedMilliseconds = elapsed.Milliseconds;

            return (elapsedMilliseconds == 0) ? from : change * Math.pow(2, 10 * (elapsedMilliseconds / duration.Milliseconds - 1)) + from;
        };
        private static _easeOut: ITweeningFunction = (from: number, to: number, elapsed: TimeSpan, duration: TimeSpan): number => {
            var change = to - from,
                elapsedMilliseconds = elapsed.Milliseconds;

            return (elapsedMilliseconds == duration.Milliseconds) ? from + change : change * (-Math.pow(2, -10 * elapsedMilliseconds / duration.Milliseconds) + 1) + from;
        };
        private static _easeInOut: ITweeningFunction = (from: number, to: number, elapsed: TimeSpan, duration: TimeSpan): number => {
            var change = to - from,
                elapsedMilliseconds = elapsed.Milliseconds;

            if (elapsedMilliseconds == 0) {
                return from;
            }
            if (elapsedMilliseconds == duration.Milliseconds) {
                return from + change;
            }
            if ((elapsedMilliseconds /= duration.Milliseconds / 2) < 1) {
                return change / 2 * Math.pow(2, 10 * (elapsedMilliseconds - 1)) + from;
            }
            return change / 2 * (-Math.pow(2, -10 * --elapsedMilliseconds) + 2) + from;
        };

        /**
        * Gets the Exponential EaseIn function.
        */
        public static get EaseIn(): ITweeningFunction {
            return Exponential._easeIn;
        }

        /**
        * Gets the Exponential EaseOut function.
        */
        public static get EaseOut(): ITweeningFunction {
            return Exponential._easeOut;
        }

        /**
        * Gets the Exponential EaseInOut function.
        */
        public static get EaseInOut(): ITweeningFunction {
            return Exponential._easeInOut;
        }
    }

}
/* Linear.ts */


module EndGate.Tweening.Functions {

    /**
    * Defines a Linear tweening function that has an EaseNone function that can be used with Tween's.
    */
    export class Linear {
        private static _easeNone: ITweeningFunction = (from: number, to: number, elapsed: TimeSpan, duration: TimeSpan): number => {
            var change = to - from;

            return change * elapsed.Milliseconds / duration.Milliseconds + from;
        };

        /**
        * Gets the Linear EaseNone function.
        */
        public static get EaseNone(): ITweeningFunction {
            return Linear._easeNone;
        }
    }

}
/* Quadratic.ts */


module EndGate.Tweening.Functions {

    /**
    * Defines a Quadratic tweening function collection that has an EaseIn, EaseOut, and EaseInOut function that can be used with Tween's.
    */
    export class Quadratic {
        private static _easeIn: ITweeningFunction = (from: number, to: number, elapsed: TimeSpan, duration: TimeSpan): number => {
            var change = to - from,
                elapsedMilliseconds = elapsed.Milliseconds;

            return change * (elapsedMilliseconds /= duration.Milliseconds) * elapsedMilliseconds + from;
        };
        private static _easeOut: ITweeningFunction = (from: number, to: number, elapsed: TimeSpan, duration: TimeSpan): number => {
            var change = to - from,
                elapsedMilliseconds = elapsed.Milliseconds;

            return -change * (elapsedMilliseconds /= duration.Milliseconds) * (elapsedMilliseconds - 2) + from;
        };
        private static _easeInOut: ITweeningFunction = (from: number, to: number, elapsed: TimeSpan, duration: TimeSpan): number => {
            var change = to - from,
                elapsedMilliseconds = elapsed.Milliseconds;

            if ((elapsedMilliseconds /= duration.Milliseconds / 2) < 1)
            {
                return change / 2 * elapsedMilliseconds * elapsedMilliseconds + from;
            }

            return -change / 2 * ((--elapsedMilliseconds) * (elapsedMilliseconds - 2) - 1) + from;
        };

        /**
        * Gets the Quadratic EaseIn function.
        */
        public static get EaseIn(): ITweeningFunction {
            return Quadratic._easeIn;
        }

        /**
        * Gets the Quadratic EaseOut function.
        */
        public static get EaseOut(): ITweeningFunction {
            return Quadratic._easeOut;
        }

        /**
        * Gets the Quadratic EaseInOut function.
        */
        public static get EaseInOut(): ITweeningFunction {
            return Quadratic._easeInOut;
        }
    }

}
/* Quartic.ts */


module EndGate.Tweening.Functions {

    /**
    * Defines a Quartic tweening function collection that has an EaseIn, EaseOut, and EaseInOut function that can be used with Tween's.
    */
    export class Quartic {
        private static _easeIn: ITweeningFunction = (from: number, to: number, elapsed: TimeSpan, duration: TimeSpan): number => {
            var change = to - from,
                elapsedMilliseconds = elapsed.Milliseconds;

            return change * (elapsedMilliseconds /= duration.Milliseconds) * elapsedMilliseconds * elapsedMilliseconds * elapsedMilliseconds + from;
        };
        private static _easeOut: ITweeningFunction = (from: number, to: number, elapsed: TimeSpan, duration: TimeSpan): number => {
            var change = to - from,
                elapsedMilliseconds = elapsed.Milliseconds;

            return -change * ((elapsedMilliseconds = elapsedMilliseconds / duration.Milliseconds - 1) * elapsedMilliseconds * elapsedMilliseconds * elapsedMilliseconds - 1) + from;
        };
        private static _easeInOut: ITweeningFunction = (from: number, to: number, elapsed: TimeSpan, duration: TimeSpan): number => {
            var change = to - from,
                elapsedMilliseconds = elapsed.Milliseconds;

            if ((elapsedMilliseconds /= duration.Milliseconds / 2) < 1)
            {
                return change / 2 * elapsedMilliseconds * elapsedMilliseconds * elapsedMilliseconds * elapsedMilliseconds + from;
            }
            return -change / 2 * ((elapsedMilliseconds -= 2) * elapsedMilliseconds * elapsedMilliseconds * elapsedMilliseconds - 2) + from;
        };

        /**
        * Gets the Quartic EaseIn function.
        */
        public static get EaseIn(): ITweeningFunction {
            return Quartic._easeIn;
        }

        /**
        * Gets the Quartic EaseOut function.
        */
        public static get EaseOut(): ITweeningFunction {
            return Quartic._easeOut;
        }

        /**
        * Gets the Quartic EaseInOut function.
        */
        public static get EaseInOut(): ITweeningFunction {
            return Quartic._easeInOut;
        }
    }

}
/* Quintic.ts */


module EndGate.Tweening.Functions {

    /**
    * Defines a Quintic tweening function collection that has an EaseIn, EaseOut, and EaseInOut function that can be used with Tween's.
    */
    export class Quintic {
        private static _easeIn: ITweeningFunction = (from: number, to: number, elapsed: TimeSpan, duration: TimeSpan): number => {
            var change = to - from,
                elapsedMilliseconds = elapsed.Milliseconds;

            return change * (elapsedMilliseconds /= duration.Milliseconds) * elapsedMilliseconds * elapsedMilliseconds * elapsedMilliseconds * elapsedMilliseconds + from;
        };
        private static _easeOut: ITweeningFunction = (from: number, to: number, elapsed: TimeSpan, duration: TimeSpan): number => {
            var change = to - from,
                elapsedMilliseconds = elapsed.Milliseconds;

            return change * ((elapsedMilliseconds = elapsedMilliseconds / duration.Milliseconds - 1) * elapsedMilliseconds * elapsedMilliseconds * elapsedMilliseconds * elapsedMilliseconds + 1) + from;
        };
        private static _easeInOut: ITweeningFunction = (from: number, to: number, elapsed: TimeSpan, duration: TimeSpan): number => {
            var change = to - from,
                elapsedMilliseconds = elapsed.Milliseconds;

            if ((elapsedMilliseconds /= duration.Milliseconds / 2) < 1)
            {
                return change / 2 * elapsedMilliseconds * elapsedMilliseconds * elapsedMilliseconds * elapsedMilliseconds * elapsedMilliseconds + from;
            }
            return change / 2 * ((elapsedMilliseconds -= 2) * elapsedMilliseconds * elapsedMilliseconds * elapsedMilliseconds * elapsedMilliseconds + 2) + from;
        };

        /**
        * Gets the Quintic EaseIn function.
        */
        public static get EaseIn(): ITweeningFunction {
            return Quintic._easeIn;
        }

        /**
        * Gets the Quintic EaseOut function.
        */
        public static get EaseOut(): ITweeningFunction {
            return Quintic._easeOut;
        }

        /**
        * Gets the Quintic EaseInOut function.
        */
        public static get EaseInOut(): ITweeningFunction {
            return Quintic._easeInOut;
        }
    }

}
/* Sinusoidal.ts */


module EndGate.Tweening.Functions {

    /**
    * Defines a Sinusoidal tweening function collection that has an EaseIn, EaseOut, and EaseInOut function that can be used with Tween's.
    */
    export class Sinusoidal {
        private static _easeIn: ITweeningFunction = (from: number, to: number, elapsed: TimeSpan, duration: TimeSpan): number => {
            var change = to - from,
                elapsedMilliseconds = elapsed.Milliseconds;

            return -change * Math.cos(elapsedMilliseconds / duration.Milliseconds * (Math.PI / 2)) + change + from;
        };
        private static _easeOut: ITweeningFunction = (from: number, to: number, elapsed: TimeSpan, duration: TimeSpan): number => {
            var change = to - from,
                elapsedMilliseconds = elapsed.Milliseconds;

            return change * Math.sin(elapsedMilliseconds / duration.Milliseconds * (Math.PI / 2)) + from;
        };
        private static _easeInOut: ITweeningFunction = (from: number, to: number, elapsed: TimeSpan, duration: TimeSpan): number => {
            var change = to - from,
                elapsedMilliseconds = elapsed.Milliseconds;

            return -change / 2 * (Math.cos(Math.PI * elapsedMilliseconds / duration.Milliseconds) - 1) + from;
        };

        /**
        * Gets the Sinusoidal EaseIn function.
        */
        public static get EaseIn(): ITweeningFunction {
            return Sinusoidal._easeIn;
        }

        /**
        * Gets the Sinusoidal EaseOut function.
        */
        public static get EaseOut(): ITweeningFunction {
            return Sinusoidal._easeOut;
        }

        /**
        * Gets the Sinusoidal EaseInOut function.
        */
        public static get EaseInOut(): ITweeningFunction {
            return Sinusoidal._easeInOut;
        }
    }

}
/* EventHandler3.ts */



module EndGate {

    /**
    * Defines a type constrained event handler object that can maintain bound functions which take in a value T, U and V and trigger them on demand.
    */
    export class EventHandler3<T, U, V> implements _.ITyped {
        public _type: string = "Event";

        private _actions: Array<(val1: T, val2: U, val3: V) => any>;
        private _hasBindings: boolean;

        /**
        * Creates a new instance of the EventHandler3 object.
        */
        constructor() {
            this._actions = [];
            this._hasBindings = false;
        }

        /**
        * Binds the provided action to the EventHandler3.  Trigger will execute all bound functions.
        * @param action Function to execute on EventHandler3 Trigger.
        */
        public Bind(action: (val1: T, val2: U, val3: V) => any): void {
            this._actions.push(action);
            this._hasBindings = true;
        }

        /**
        * Unbinds the provided action from the EventHandler3.
        * @param action Function to unbind.  The action will no longer be executed when the EventHandler gets Triggered.
        */
        public Unbind(action: (val1: T, val2: U, val3: V) => any): void {
            for (var i = 0; i < this._actions.length; i++) {
                if (this._actions[i] === action) {
                    this._actions.splice(i, 1);

                    this._hasBindings = this._actions.length > 0;
                    return;
                }
            }
        }

        /**
        * Determines if the EventHandler3 has active bindings.
        */
        public HasBindings(): boolean {
            return this._hasBindings;
        }

        /**
        * Executes all bound functions and passes the provided args to each.
        * @param val1 The first argument to pass to the bound functions.
        * @param val2 The second argument to pass to the bound functions.
        * @param val3 The third argument to pass to the bound functions.
        */
        public Trigger(val1: T, val2: U, val3: V): void {
            for (var i = 0; i < this._actions.length; i++) {
                this._actions[i](val1, val2, val3);
            }
        }
    }

}
