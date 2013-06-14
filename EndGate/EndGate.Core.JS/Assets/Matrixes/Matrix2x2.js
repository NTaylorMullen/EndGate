/// <reference path="../../Interfaces/ITyped.ts" />
/// <reference path="../Vectors/Vector2d.ts" />
/// <reference path="../../Extensions/MathExtensions.ts" />
var EndGate;
(function (EndGate) {
    /**
    * Defines a matrix with 2 columns and 2 rows (2x2).
    */
    var Matrix2x2 = (function () {
        function Matrix2x2(topLeft, topRight, botLeft, botRight) {
            if (typeof topLeft === "undefined") { topLeft = 0; }
            if (typeof topRight === "undefined") { topRight = 0; }
            if (typeof botLeft === "undefined") { botLeft = 0; }
            if (typeof botRight === "undefined") { botRight = 0; }
            this._type = "Matrix2x2";
            this.Values = [
                [
                    topLeft, 
                    topRight
                ], 
                [
                    botLeft, 
                    botRight
                ]
            ];
        }
        Matrix2x2.prototype.Apply = /**
        * Executes the action with each row and column item of this Matrix2x2 and modifies their values.
        * @param action The function used to modify each row and column items.
        */
        function (action) {
            this.Values[0][0] = action(this.Values[0][0]);
            this.Values[0][1] = action(this.Values[0][1]);
            this.Values[1][0] = action(this.Values[1][0]);
            this.Values[1][1] = action(this.Values[1][1]);
        };
        Matrix2x2.prototype.Trigger = /**
        * Executes the action with each row and column item of this Matrix2x2.
        * @param action The function to pass the row column item to.
        */
        function (action) {
            action(this.Values[0][0]);
            action(this.Values[0][1]);
            action(this.Values[1][0]);
            action(this.Values[1][1]);
        };
        Matrix2x2.prototype.Add = function (val) {
            if(val._type === "Matrix2x2") {
                return new Matrix2x2(this.Values[0][0] + val.Values[0][0], this.Values[0][1] + val.Values[0][1], this.Values[1][0] + val.Values[1][0], this.Values[1][1] + val.Values[1][1]);
            } else {
                return new Matrix2x2(this.Values[0][0] + val, this.Values[0][1] + val, this.Values[1][0] + val, this.Values[1][1] + val);
            }
        };
        Matrix2x2.prototype.Multiply = function (val) {
            if(val._type === "Matrix2x2") {
                return new Matrix2x2(this.Values[0][0] * val.Values[0][0] + this.Values[0][1] * val.Values[1][0], this.Values[0][0] * val.Values[0][1] + this.Values[0][1] * val.Values[1][1], this.Values[1][0] * val.Values[0][0] + this.Values[1][1] * val.Values[1][0], this.Values[1][0] * val.Values[0][1] + this.Values[1][1] * val.Values[1][1]);
            } else {
                return new Matrix2x2(this.Values[0][0] * val, this.Values[0][1] * val, this.Values[1][0] * val, this.Values[1][1] * val);
            }
        };
        Matrix2x2.prototype.Subtract = function (val) {
            if(val._type === "Matrix2x2") {
                return new Matrix2x2(this.Values[0][0] - val.Values[0][0], this.Values[0][1] - val.Values[0][1], this.Values[1][0] - val.Values[1][0], this.Values[1][1] - val.Values[1][1]);
            } else {
                return new Matrix2x2(this.Values[0][0] - val, this.Values[0][1] - val, this.Values[1][0] - val, this.Values[1][1] - val);
            }
        };
        Matrix2x2.prototype.SubtractFrom = function (val) {
            if(val._type === "Matrix2x2") {
                return new Matrix2x2(val.Values[0][0] - this.Values[0][0], val.Values[0][1] - this.Values[0][1], val.Values[1][0] - this.Values[1][0], val.Values[1][1] - this.Values[1][1]);
            } else {
                return new Matrix2x2(val - this.Values[0][0], val - this.Values[0][1], val - this.Values[1][0], val - this.Values[1][1]);
            }
        };
        Matrix2x2.prototype.Divide = function (val) {
            if(val._type === "Matrix2x2") {
                return new Matrix2x2(this.Values[0][0] / val.Values[0][0], this.Values[0][1] / val.Values[0][1], this.Values[1][0] / val.Values[1][0], this.Values[1][1] / val.Values[1][1]);
            } else {
                return new Matrix2x2(this.Values[0][0] / val, this.Values[0][1] / val, this.Values[1][0] / val, this.Values[1][1] / val);
            }
        };
        Matrix2x2.prototype.DivideFrom = function (val) {
            if(val._type === "Matrix2x2") {
                return new Matrix2x2(val.Values[0][0] / this.Values[0][0], val.Values[0][1] / this.Values[0][1], val.Values[1][0] / this.Values[1][0], val.Values[1][1] / this.Values[1][1]);
            } else {
                return new Matrix2x2(val / this.Values[0][0], val / this.Values[0][1], val / this.Values[1][0], val / this.Values[1][1]);
            }
        };
        Matrix2x2.prototype.Transform = /**
        * Returns a Vector2d that has been transformed by the current Matrix2x2.
        * @param vector The vector to transform.
        */
        function (vector) {
            return new EndGate.Vector2d(this.Values[0][0] * vector.X + this.Values[0][1] * vector.Y, this.Values[1][0] * vector.X + this.Values[1][1] * vector.Y);
        };
        Matrix2x2.prototype.Transpose = /**
        * Returns the transpose of the current Matrix2x2.
        */
        function () {
            return new Matrix2x2(this.Values[0][0], this.Values[1][0], this.Values[0][1], this.Values[1][1]);
        };
        Matrix2x2.prototype.Determinant = /**
        * Returns the determinant of the current Matrix2x2.
        */
        function () {
            return this.Values[0][0] * this.Values[1][1] - this.Values[0][1] * this.Values[1][0];
        };
        Matrix2x2.prototype.Inverse = /**
        * Returns the inverse of the current Matrix2x2.
        */
        function () {
            return new Matrix2x2(this.Values[1][1], -this.Values[0][1], -this.Values[1][0], this.Values[0][0]).Multiply(1 / this.Determinant());
        };
        Matrix2x2.prototype.Clone = /**
        * Returns a Matrix2x2 that has identical rows and columns as the current Matrix2x2.
        */
        function () {
            return new Matrix2x2(this.Values[0][0], this.Values[0][1], this.Values[1][0], this.Values[1][1]);
        };
        Matrix2x2.prototype.Equivalent = /**
        * Determines whether this Matrix2x2 has the same row and column values as the provided Matrix2x2.
        * @param matrix The Matrix2x2 to compare the current Matrix2x2 to.
        */
        function (matrix) {
            return this.Values[0][0] === matrix.Values[0][0] && this.Values[0][1] === matrix.Values[0][1] && this.Values[1][0] === matrix.Values[1][0] && this.Values[1][1] === matrix.Values[1][1];
        };
        Matrix2x2.prototype.toString = /**
        * Overridden toString method to display Matrix2x2 in easy to read format: "[topLeft, topRight] [botLeft, botRight]"
        */
        function () {
            return this.Values[0].toString() + " " + this.Values[1].toString();
        };
        Matrix2x2.Scale = /**
        * Creates a scaling matrix based off the provided Vector2d.
        * @param vector The vector used to determine the X and Y scaling values.
        */
        function Scale(vector) {
            return new Matrix2x2(vector.X, 0, 0, vector.Y);
        };
        Matrix2x2.Zero = /**
        * Creates a Matrix2x2 with all its rows and columns initialized to 0.
        */
        function Zero() {
            return new Matrix2x2();
        };
        Matrix2x2.Identity = /**
        * Returns the identity matrix for a 2x2.
        */
        function Identity() {
            return new Matrix2x2(1, 0, 0, 1);
        };
        return Matrix2x2;
    })();
    EndGate.Matrix2x2 = Matrix2x2;    
})(EndGate || (EndGate = {}));
