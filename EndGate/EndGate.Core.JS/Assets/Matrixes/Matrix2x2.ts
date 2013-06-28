/// <reference path="../../Interfaces/ITyped.ts" />
/// <reference path="../../Interfaces/ICloneable.ts" />
/// <reference path="../Vectors/Vector2d.ts" />
/// <reference path="../../Extensions/MathExtensions.ts" />

module eg {

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
        public Equivalent(matrix: Matrix2x2): bool {
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