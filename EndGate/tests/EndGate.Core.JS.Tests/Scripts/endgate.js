/// <reference path="../Vectors/Vector2d.ts" />
/// <reference path="../../Interfaces/ICloneable.ts" />
/// <reference path="../../Interfaces/ITyped.ts" />
var EndGate;
(function (EndGate) {
    /**
    * Defines a two dimensional size object which specifies a Width and Height.
    */
    var Size2d = (function () {
        function Size2d(first, second) {
            this._type = "Size2d";
            this.Width = first || 0;
            this.Height = typeof second !== "undefined" ? second : this.Width;
        }
        Object.defineProperty(Size2d, "Zero", {
            get: /**
            * Returns a Size2d with all its components set to zero.
            */
            function () {
                return new Size2d(0, 0);
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Size2d, "One", {
            get: /**
            * Returns a Size2d with all its components set to one.
            */
            function () {
                return new Size2d(1, 1);
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Size2d.prototype, "Radius", {
            get: /**
            * Gets the radius that encompasses the two dimensional size of this Size2d.
            */
            function () {
                return .5 * Math.sqrt(this.Width * this.Width + this.Height * this.Height);
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Size2d.prototype, "HalfWidth", {
            get: /**
            * Gets half of the Width component of this Size2d.
            */
            function () {
                return this.Width / 2;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Size2d.prototype, "HalfHeight", {
            get: /**
            * Gets half of the Height component of this Size2d.
            */
            function () {
                return this.Height / 2;
            },
            enumerable: true,
            configurable: true
        });

        /**
        * Executes the action with the Width and Height of this Size2d and sets the Width and Height to the corresponding return values.
        * @param action The function used to modify the Width and Height.
        */
        Size2d.prototype.Apply = function (action) {
            this.Width = action(this.Width);
            this.Height = action(this.Height);
        };

        /**
        * Executes the action with the Width and Height of this Size2d.
        * @param action The function to pass the Width and Height components to.
        */
        Size2d.prototype.Trigger = function (action) {
            action(this.Width);
            action(this.Height);
        };

        Size2d.prototype.Add = function (val) {
            if (val._type === "Size2d") {
                return new Size2d(this.Width + val.Width, this.Height + val.Height);
            } else if (val._type === "Vector2d") {
                return new Size2d(this.Width + val.X, this.Height + val.Y);
            } else {
                return new Size2d(this.Width + val, this.Height + val);
            }
        };

        Size2d.prototype.Multiply = function (val) {
            if (val._type === "Size2d") {
                return new Size2d(this.Width * val.Width, this.Height * val.Height);
            } else if (val._type === "Vector2d") {
                return new Size2d(this.Width * val.X, this.Height * val.Y);
            } else {
                return new Size2d(this.Width * val, this.Height * val);
            }
        };

        Size2d.prototype.Subtract = function (val) {
            if (val._type === "Size2d") {
                return new Size2d(this.Width - val.Width, this.Height - val.Height);
            } else if (val._type === "Vector2d") {
                return new Size2d(this.Width - val.X, this.Height - val.Y);
            } else {
                return new Size2d(this.Width - val, this.Height - val);
            }
        };

        Size2d.prototype.SubtractFrom = function (val) {
            if (val._type === "Size2d") {
                return new Size2d(val.Width - this.Width, val.Height - this.Height);
            } else if (val._type === "Vector2d") {
                return new Size2d(val.X - this.Width, val.Y - this.Height);
            } else {
                return new Size2d(val - this.Width, val - this.Height);
            }
        };

        Size2d.prototype.Divide = function (val) {
            if (val._type === "Size2d") {
                return new Size2d(this.Width / val.Width, this.Height / val.Height);
            } else if (val._type === "Vector2d") {
                return new Size2d(this.Width / val.X, this.Height / val.Y);
            } else {
                return new Size2d(this.Width / val, this.Height / val);
            }
        };

        Size2d.prototype.DivideFrom = function (val) {
            if (val._type === "Size2d") {
                return new Size2d(val.Width / this.Width, val.Height / this.Height);
            } else if (val._type === "Vector2d") {
                return new Size2d(val.X / this.Width, val.Y / this.Height);
            } else {
                return new Size2d(val / this.Width, val / this.Height);
            }
        };

        /**
        * Returns a Size2d that is the negated version of this Size2d.
        */
        Size2d.prototype.Negate = function () {
            return new Size2d(this.Width * -1, this.Height * -1);
        };

        /**
        * Determines whether this Size2d has the same Width and Height of another Size2d.
        * @param size The Size2d to compare the current Size2d to.
        */
        Size2d.prototype.Equivalent = function (size) {
            return this.Width === size.Width && this.Height === size.Height;
        };

        /**
        * Returns a Size2d that has identical Width's and Height's as the current Size2d.
        */
        Size2d.prototype.Clone = function () {
            return new Size2d(this.Width, this.Height);
        };

        /**
        * Overridden toString method to display Size2d in the (Width, Height) format.
        */
        Size2d.prototype.toString = function () {
            return "(" + this.Width + ", " + this.Height + ")";
        };
        return Size2d;
    })();
    EndGate.Size2d = Size2d;
})(EndGate || (EndGate = {}));
Math.roundTo = function (val, decimals) {
    var multiplier = Math.pow(10, decimals);

    return Math.round(val * multiplier) / multiplier;
};

(Math).twoPI = Math.PI * 2;
/// <reference path="../../Interfaces/ITyped.ts" />
/// <reference path="../../Interfaces/ICloneable.ts" />
/// <reference path="../Sizes/Size2d.ts" />
/// <reference path="../../Extensions/MathExtensions.ts" />
var EndGate;
(function (EndGate) {
    /**
    * Defines a two dimensional vector object which specifies an X and Y.
    */
    var Vector2d = (function () {
        function Vector2d(x, y) {
            this._type = "Vector2d";
            this.X = x || 0;
            this.Y = y || 0;
        }
        Object.defineProperty(Vector2d, "Zero", {
            get: /**
            * Returns a Vector2d with all its components set to zero.
            */
            function () {
                return new Vector2d(0, 0);
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Vector2d, "One", {
            get: /**
            * Returns a Vector2d with all its components set to one.
            */
            function () {
                return new Vector2d(1, 1);
            },
            enumerable: true,
            configurable: true
        });

        /**
        * Returns a Vector2d that's reflected over the normal.
        * @param normal The normal to reflect over.
        */
        Vector2d.prototype.Reflect = function (normal) {
            var normalUnit = normal.Unit(), num = this.Dot(normalUnit) * 2;

            return new Vector2d(this.X - num * normalUnit.X, this.Y - num * normalUnit.Y);
        };

        /**
        * Returns a Vector2d that represents the current Vector2d projected onto the provided Vector2d.
        * @param vector Source vector.
        */
        Vector2d.prototype.ProjectOnto = function (vector) {
            return vector.Multiply(this.Dot(vector) / vector.Dot(vector));
        };

        Vector2d.prototype.RotateAround = function (point, angle, precision) {
            if (typeof precision === "undefined") { precision = 2; }
            var ca = Math.cos(angle);
            var sa = Math.sin(angle);

            return new Vector2d(Math.roundTo(ca * (this.X - point.X) - sa * (this.Y - point.Y) + point.X, precision), Math.roundTo(sa * (this.X - point.X) + ca * (this.Y - point.Y) + point.Y, precision));
        };

        /**
        * Executes the action with the X and Y components of this Vector2d and sets the X and Y components to the corresponding return values.
        * @param action The function used to modify the X and Y components.
        */
        Vector2d.prototype.Apply = function (action) {
            this.X = action(this.X);
            this.Y = action(this.Y);
        };

        /**
        * Executes the action with the X and Y components of this Vector2d.
        * @param action The function to pass the X and Y components to.
        */
        Vector2d.prototype.Trigger = function (action) {
            action(this.X);
            action(this.Y);
        };

        /**
        * Returns the current vector as a unit vector. The result is a vector one unit in length pointing in the same direction as the original vector.
        */
        Vector2d.prototype.Normalized = function () {
            var magnitude = this.Magnitude();
            return new Vector2d(this.X / magnitude, this.Y / magnitude);
        };

        /**
        * Calculates the magnitude or length of the vector
        */
        Vector2d.prototype.Magnitude = function () {
            return Math.sqrt(this.X * this.X + this.Y * this.Y);
        };

        /**
        * Calculates the length or magnitude of the vector
        */
        Vector2d.prototype.Length = function () {
            return this.Magnitude();
        };

        /**
        * Calculates dot product.
        * @param vector Source vector.
        */
        Vector2d.prototype.Dot = function (vector) {
            return vector.X * this.X + vector.Y * this.Y;
        };

        /**
        * Returns a Vector2d that has the current Vector2d's X and Y components as positive values.
        */
        Vector2d.prototype.Abs = function () {
            return new Vector2d(Math.abs(this.X), Math.abs(this.Y));
        };

        /**
        * Returns a Vector2d that has its X and Y components converted to -1, 0 or 1 depending on the current Vector2d's component values.
        */
        Vector2d.prototype.Sign = function () {
            return new Vector2d(this.X / Math.abs(this.X), this.Y / Math.abs(this.Y));
        };

        /**
        * Returns the unit vector of the current vector.
        */
        Vector2d.prototype.Unit = function () {
            var magnitude = this.Magnitude();

            return new Vector2d(this.X / magnitude, this.Y / magnitude);
        };

        /**
        * Calculates the distance between the current vector and the provided one.
        */
        Vector2d.prototype.Distance = function (vector) {
            return new Vector2d(Math.abs(vector.X - this.X), Math.abs(vector.Y - this.Y));
        };

        Vector2d.prototype.Add = function (val) {
            if (val._type === "Vector2d") {
                return new Vector2d(this.X + val.X, this.Y + val.Y);
            } else if (val._type === "Size2d") {
                return new Vector2d(this.X + val.Width, this.Y + val.Height);
            } else {
                return new Vector2d(this.X + val, this.Y + val);
            }
        };

        Vector2d.prototype.Multiply = function (val) {
            if (val._type === "Vector2d") {
                return new Vector2d(this.X * val.X, this.Y * val.Y);
            } else if (val._type === "Size2d") {
                return new Vector2d(this.X * val.Width, this.Y * val.Height);
            } else {
                return new Vector2d(this.X * val, this.Y * val);
            }
        };

        Vector2d.prototype.Subtract = function (val) {
            if (val._type === "Vector2d") {
                return new Vector2d(this.X - val.X, this.Y - val.Y);
            } else if (val._type === "Size2d") {
                return new Vector2d(this.X - val.Width, this.Y - val.Height);
            } else {
                return new Vector2d(this.X - val, this.Y - val);
            }
        };

        Vector2d.prototype.SubtractFrom = function (val) {
            if (val._type === "Vector2d") {
                return new Vector2d(val.X - this.X, val.Y - this.Y);
            } else if (val._type === "Size2d") {
                return new Vector2d(val.Width - this.X, val.Height = this.Y);
            } else {
                return new Vector2d(val - this.X, val - this.Y);
            }
        };

        Vector2d.prototype.Divide = function (val) {
            if (val._type === "Vector2d") {
                return new Vector2d(this.X / val.X, this.Y / val.Y);
            } else if (val._type === "Size2d") {
                return new Vector2d(this.X / val.Width, this.Y / val.Height);
            } else {
                return new Vector2d(this.X / val, this.Y / val);
            }
        };

        Vector2d.prototype.DivideFrom = function (val) {
            if (val._type === "Vector2d") {
                return new Vector2d(val.X / this.X, val.Y / this.Y);
            } else if (val._type === "Size2d") {
                return new Vector2d(val.Width / this.X, val.Height / this.Y);
            } else {
                return new Vector2d(val / this.X, val / this.Y);
            }
        };

        /**
        * Determines whether this Vector2d's X and Y components are zero.
        */
        Vector2d.prototype.IsZero = function () {
            return this.X === 0 && this.Y === 0;
        };

        /**
        * Returns a Vector2d that is the negated version of this Vector2d.
        */
        Vector2d.prototype.Negate = function () {
            return new Vector2d(this.X * -1, this.Y * -1);
        };

        /**
        * Determines whether this Vector2d has the same X and Y of the provided Vector2d.
        * @param vector The Vector2d to compare the current Vector2d to.
        */
        Vector2d.prototype.Equivalent = function (vector) {
            return this.X === vector.X && this.Y === vector.Y;
        };

        /**
        * Returns a Vector2d that has an identical X and Y component as the current Vector2d.
        */
        Vector2d.prototype.Clone = function () {
            return new Vector2d(this.X, this.Y);
        };

        /**
        * Overridden toString method to display Vector2d in the (X, Y) format.
        */
        Vector2d.prototype.toString = function () {
            return "(" + this.X + ", " + this.Y + ")";
        };
        return Vector2d;
    })();
    EndGate.Vector2d = Vector2d;
})(EndGate || (EndGate = {}));
/// <reference path="../../Interfaces/ITyped.ts" />
/// <reference path="../../Interfaces/ICloneable.ts" />
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
                [topLeft, topRight],
                [botLeft, botRight]
            ];
        }
        Object.defineProperty(Matrix2x2, "Zero", {
            get: /**
            * Creates a Matrix2x2 with all its rows and columns initialized to 0.
            */
            function () {
                return new Matrix2x2();
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Matrix2x2, "Identity", {
            get: /**
            * Returns the identity matrix for a 2x2.
            */
            function () {
                return new Matrix2x2(1, 0, 0, 1);
            },
            enumerable: true,
            configurable: true
        });

        /**
        * Executes the action with each row and column item of this Matrix2x2 and modifies their values.
        * @param action The function used to modify each row and column items.
        */
        Matrix2x2.prototype.Apply = function (action) {
            this.Values[0][0] = action(this.Values[0][0]);
            this.Values[0][1] = action(this.Values[0][1]);
            this.Values[1][0] = action(this.Values[1][0]);
            this.Values[1][1] = action(this.Values[1][1]);
        };

        /**
        * Executes the action with each row and column item of this Matrix2x2.
        * @param action The function to pass the row column item to.
        */
        Matrix2x2.prototype.Trigger = function (action) {
            action(this.Values[0][0]);
            action(this.Values[0][1]);
            action(this.Values[1][0]);
            action(this.Values[1][1]);
        };

        Matrix2x2.prototype.Add = function (val) {
            if (val._type === "Matrix2x2") {
                return new Matrix2x2(this.Values[0][0] + val.Values[0][0], this.Values[0][1] + val.Values[0][1], this.Values[1][0] + val.Values[1][0], this.Values[1][1] + val.Values[1][1]);
            } else {
                return new Matrix2x2(this.Values[0][0] + val, this.Values[0][1] + val, this.Values[1][0] + val, this.Values[1][1] + val);
            }
        };

        Matrix2x2.prototype.Multiply = function (val) {
            if (val._type === "Matrix2x2") {
                return new Matrix2x2(this.Values[0][0] * val.Values[0][0] + this.Values[0][1] * val.Values[1][0], this.Values[0][0] * val.Values[0][1] + this.Values[0][1] * val.Values[1][1], this.Values[1][0] * val.Values[0][0] + this.Values[1][1] * val.Values[1][0], this.Values[1][0] * val.Values[0][1] + this.Values[1][1] * val.Values[1][1]);
            } else {
                return new Matrix2x2(this.Values[0][0] * val, this.Values[0][1] * val, this.Values[1][0] * val, this.Values[1][1] * val);
            }
        };

        Matrix2x2.prototype.Subtract = function (val) {
            if (val._type === "Matrix2x2") {
                return new Matrix2x2(this.Values[0][0] - val.Values[0][0], this.Values[0][1] - val.Values[0][1], this.Values[1][0] - val.Values[1][0], this.Values[1][1] - val.Values[1][1]);
            } else {
                return new Matrix2x2(this.Values[0][0] - val, this.Values[0][1] - val, this.Values[1][0] - val, this.Values[1][1] - val);
            }
        };

        Matrix2x2.prototype.SubtractFrom = function (val) {
            if (val._type === "Matrix2x2") {
                return new Matrix2x2(val.Values[0][0] - this.Values[0][0], val.Values[0][1] - this.Values[0][1], val.Values[1][0] - this.Values[1][0], val.Values[1][1] - this.Values[1][1]);
            } else {
                return new Matrix2x2(val - this.Values[0][0], val - this.Values[0][1], val - this.Values[1][0], val - this.Values[1][1]);
            }
        };

        Matrix2x2.prototype.Divide = function (val) {
            if (val._type === "Matrix2x2") {
                return new Matrix2x2(this.Values[0][0] / val.Values[0][0], this.Values[0][1] / val.Values[0][1], this.Values[1][0] / val.Values[1][0], this.Values[1][1] / val.Values[1][1]);
            } else {
                return new Matrix2x2(this.Values[0][0] / val, this.Values[0][1] / val, this.Values[1][0] / val, this.Values[1][1] / val);
            }
        };

        Matrix2x2.prototype.DivideFrom = function (val) {
            if (val._type === "Matrix2x2") {
                return new Matrix2x2(val.Values[0][0] / this.Values[0][0], val.Values[0][1] / this.Values[0][1], val.Values[1][0] / this.Values[1][0], val.Values[1][1] / this.Values[1][1]);
            } else {
                return new Matrix2x2(val / this.Values[0][0], val / this.Values[0][1], val / this.Values[1][0], val / this.Values[1][1]);
            }
        };

        /**
        * Returns a Vector2d that has been transformed by the current Matrix2x2.
        * @param vector The vector to transform.
        */
        Matrix2x2.prototype.Transform = function (vector) {
            return new EndGate.Vector2d(this.Values[0][0] * vector.X + this.Values[0][1] * vector.Y, this.Values[1][0] * vector.X + this.Values[1][1] * vector.Y);
        };

        /**
        * Returns the transpose of the current Matrix2x2.
        */
        Matrix2x2.prototype.Transpose = function () {
            return new Matrix2x2(this.Values[0][0], this.Values[1][0], this.Values[0][1], this.Values[1][1]);
        };

        /**
        * Returns the determinant of the current Matrix2x2.
        */
        Matrix2x2.prototype.Determinant = function () {
            return this.Values[0][0] * this.Values[1][1] - this.Values[0][1] * this.Values[1][0];
        };

        /**
        * Returns the inverse of the current Matrix2x2.
        */
        Matrix2x2.prototype.Inverse = function () {
            return new Matrix2x2(this.Values[1][1], -this.Values[0][1], -this.Values[1][0], this.Values[0][0]).Multiply(1 / this.Determinant());
        };

        /**
        * Returns a Matrix2x2 that has identical rows and columns as the current Matrix2x2.
        */
        Matrix2x2.prototype.Clone = function () {
            return new Matrix2x2(this.Values[0][0], this.Values[0][1], this.Values[1][0], this.Values[1][1]);
        };

        /**
        * Determines whether this Matrix2x2 has the same row and column values as the provided Matrix2x2.
        * @param matrix The Matrix2x2 to compare the current Matrix2x2 to.
        */
        Matrix2x2.prototype.Equivalent = function (matrix) {
            return this.Values[0][0] === matrix.Values[0][0] && this.Values[0][1] === matrix.Values[0][1] && this.Values[1][0] === matrix.Values[1][0] && this.Values[1][1] === matrix.Values[1][1];
        };

        /**
        * Overridden toString method to display Matrix2x2 in easy to read format: "[topLeft, topRight] [botLeft, botRight]"
        */
        Matrix2x2.prototype.toString = function () {
            return this.Values[0].toString() + " " + this.Values[1].toString();
        };

        Matrix2x2.Scale = /**
        * Creates a scaling matrix based off the provided Vector2d.
        * @param vector The vector used to determine the X and Y scaling values.
        */
        function (vector) {
            return new Matrix2x2(vector.X, 0, 0, vector.Y);
        };
        return Matrix2x2;
    })();
    EndGate.Matrix2x2 = Matrix2x2;
})(EndGate || (EndGate = {}));
/// <reference path="../Interfaces/ITyped.ts" />
/// <reference path="../Interfaces/ICloneable.ts" />
var EndGate;
(function (EndGate) {
    /**
    * Defines a time interval.
    */
    var TimeSpan = (function () {
        function TimeSpan(milliseconds, seconds, minutes) {
            if (typeof seconds === "undefined") { seconds = 0; }
            if (typeof minutes === "undefined") { minutes = 0; }
            this._type = "TimeSpan";
            this.Milliseconds = milliseconds + seconds * TimeSpan._secondsMultiplier + minutes * TimeSpan._minutesMultiplier;
        }
        Object.defineProperty(TimeSpan.prototype, "Milliseconds", {
            get: /**
            * Gets or sets the number of milliseconds the TimeSpan represents.
            */
            function () {
                return this._milliseconds;
            },
            set: function (val) {
                this._milliseconds = val;
                this._seconds = val / TimeSpan._secondsMultiplier;
                this._minutes = val / TimeSpan._minutesMultiplier;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(TimeSpan.prototype, "Seconds", {
            get: /**
            * Gets or sets the number of seconds the TimeSpan represents.
            */
            function () {
                return this._seconds;
            },
            set: function (val) {
                this._seconds = val;
                this._milliseconds = val * TimeSpan._secondsMultiplier;
                this._minutes = this._milliseconds / TimeSpan._minutesMultiplier;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(TimeSpan.prototype, "Minutes", {
            get: /**
            * Gets or sets the number of minutes the TimeSpan represents.
            */
            function () {
                return this._minutes;
            },
            set: function (val) {
                this._minutes = val;
                this._seconds = val * 60;
                this._milliseconds = this._seconds * TimeSpan._secondsMultiplier;
            },
            enumerable: true,
            configurable: true
        });

        TimeSpan.prototype.Add = function (val) {
            if (val._type === "TimeSpan") {
                return new TimeSpan(this.Milliseconds + val.Milliseconds);
            } else {
                return new TimeSpan(this.Milliseconds + val);
            }
        };

        TimeSpan.prototype.Multiply = function (val) {
            if (val._type === "TimeSpan") {
                return new TimeSpan(this.Milliseconds * val.Milliseconds);
            } else {
                return new TimeSpan(this.Milliseconds * val);
            }
        };

        TimeSpan.prototype.Subtract = function (val) {
            if (val._type === "TimeSpan") {
                return new TimeSpan(this.Milliseconds - val.Milliseconds);
            } else {
                return new TimeSpan(this.Milliseconds - val);
            }
        };

        TimeSpan.prototype.SubtractFrom = function (val) {
            if (val._type === "TimeSpan") {
                return new TimeSpan(val.Milliseconds - this.Milliseconds);
            } else {
                return new TimeSpan(val - this.Milliseconds);
            }
        };

        TimeSpan.prototype.Divide = function (val) {
            if (val._type === "TimeSpan") {
                return new TimeSpan(this.Milliseconds / val.Milliseconds);
            } else {
                return new TimeSpan(this.Milliseconds / val);
            }
        };

        TimeSpan.prototype.DivideFrom = function (val) {
            if (val._type === "TimeSpan") {
                return new TimeSpan(val.Milliseconds / this.Milliseconds);
            } else {
                return new TimeSpan(val / this.Milliseconds);
            }
        };

        /**
        * Determines whether this TimeSpan represents the same amount of time as the provided TimeSpan.
        * @param timeSpan The TimeSpan to compare the current TimeSpan to.
        */
        TimeSpan.prototype.Equivalent = function (timeSpan) {
            return this.Milliseconds === timeSpan.Milliseconds;
        };

        /**
        * Returns a TimeSpan that represents the same time interval.
        */
        TimeSpan.prototype.Clone = function () {
            return new TimeSpan(this.Milliseconds);
        };

        /**
        * Overridden toString method to display TimeSpan in the ms:s:m format.
        */
        TimeSpan.prototype.toString = function () {
            return this.Milliseconds + ":" + this.Seconds + ":" + this.Minutes;
        };

        TimeSpan.FromMilliseconds = /**
        * Returns a TimeSpan that represents the specified number of milliseconds.
        * @param val Number of milliseconds.
        */
        function (val) {
            return new TimeSpan(val);
        };

        TimeSpan.FromSeconds = /**
        * Returns a TimeSpan that represents the specified number of seconds.
        * @param val Number of seconds.
        */
        function (val) {
            return new TimeSpan(0, val);
        };

        TimeSpan.FromMinutes = /**
        * Returns a TimeSpan that represents the specified number of minutes.
        * @param val Number of minutes.
        */
        function (val) {
            return new TimeSpan(0, 0, val);
        };

        TimeSpan.DateSpan = /**
        * Returns a TimeSpan that represents the time between the two dates.
        * @param from The from date.
        * @param to The to date.
        */
        function (from, to) {
            return new TimeSpan(to.getTime() - from.getTime());
        };

        Object.defineProperty(TimeSpan, "Zero", {
            get: /**
            * Gets a TimeSpan that represents a 0 millisecond time interval.
            */
            function () {
                return new TimeSpan(0);
            },
            enumerable: true,
            configurable: true
        });
        TimeSpan._secondsMultiplier = 1000;
        TimeSpan._minutesMultiplier = TimeSpan._secondsMultiplier * 60;
        return TimeSpan;
    })();
    EndGate.TimeSpan = TimeSpan;
})(EndGate || (EndGate = {}));
var EndGate;
(function (EndGate) {
    (function (_) {
        var MinMax = (function () {
            function MinMax(min, max) {
                this.Min = min;
                this.Max = max;
            }
            return MinMax;
        })();
        _.MinMax = MinMax;
    })(EndGate._ || (EndGate._ = {}));
    var _ = EndGate._;
})(EndGate || (EndGate = {}));
var EndGate;
(function (EndGate) {
    /// <reference path="../Vector2d.ts" />
    /// <reference path="MinMax.ts" />
    (function (_) {
        var Vector2dHelpers = (function () {
            function Vector2dHelpers() {
            }
            Vector2dHelpers.GetMinMaxProjections = function (axis, vertices) {
                var min = vertices[0].ProjectOnto(axis).Dot(axis);
                var max = min;

                for (var i = 1; i < vertices.length; i++) {
                    var vertex = vertices[i];
                    var value = vertex.ProjectOnto(axis).Dot(axis);

                    if (value < min) {
                        min = value;
                    } else if (value > max) {
                        max = value;
                    }
                }

                return new _.MinMax(min, max);
            };
            return Vector2dHelpers;
        })();
        _.Vector2dHelpers = Vector2dHelpers;
    })(EndGate._ || (EndGate._ = {}));
    var _ = EndGate._;
})(EndGate || (EndGate = {}));
var EndGate;
(function (EndGate) {
    (function (Bounds) {
        /// <reference path="../Interfaces/IMoveable.ts" />
        /// <reference path="../Assets/Vectors/Vector2d.ts" />
        /// <reference  path="BoundingRectangle.ts" />
        /// <reference  path="BoundingCircle.ts" />
        (function (Abstractions) {
            /**
            * Abstract bounds type that is used to detect intersections.
            */
            var Bounds2d = (function () {
                function Bounds2d(position, rotation) {
                    this._boundsType = "Bounds2d";
                    this.Position = position;
                    this.Rotation = rotation || 0;
                }
                /**
                * Abstract: Scales the size of the bounded object.
                * @param x Value to multiply the horizontal component by.
                * @param y Value to multiply the vertical component by.
                */
                Bounds2d.prototype.Scale = function (x, y) {
                    throw new Error("This method is abstract!");
                };

                /**
                * Abstract: Determines if the current bounded object contains the provided Vector2d.
                * @param point A point.
                */
                Bounds2d.prototype.ContainsPoint = function (point) {
                    throw new Error("This method is abstract!");
                };

                Bounds2d.prototype.Intersects = function (obj) {
                    if (obj._boundsType === "BoundingCircle") {
                        return this.IntersectsCircle(obj);
                    } else if (obj._boundsType === "BoundingRectangle") {
                        return this.IntersectsRectangle(obj);
                    } else {
                        throw new Error("Cannot intersect with unidentifiable object, must be BoundingCircle or BoundingRectangle");
                    }
                };

                /**
                * Abstract: Determines if the current bounded object is intersecting the provided BoundingCircle.
                * @param circle BoundingCircle to check intersection with.
                */
                Bounds2d.prototype.IntersectsCircle = function (circle) {
                    throw new Error("This method is abstract!");
                };

                /**
                * Abstract: Determines if the current bounded object is intersecting the provided BoundingRectangle.
                * @param rectangle BoundingRectangle to check intersection with.
                */
                Bounds2d.prototype.IntersectsRectangle = function (rectangle) {
                    throw new Error("This method is abstract!");
                };
                return Bounds2d;
            })();
            Abstractions.Bounds2d = Bounds2d;
        })(Bounds.Abstractions || (Bounds.Abstractions = {}));
        var Abstractions = Bounds.Abstractions;
    })(EndGate.Bounds || (EndGate.Bounds = {}));
    var Bounds = EndGate.Bounds;
})(EndGate || (EndGate = {}));
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var EndGate;
(function (EndGate) {
    /// <reference path="../Assets/Vectors/Helpers/Vector2dHelpers.ts" />
    /// <reference path="../Assets/Sizes/Size2d.ts" />
    /// <reference path="BoundingCircle.ts" />
    /// <reference path="Bounds2d.ts" />
    (function (Bounds) {
        /**
        * Defines a rectangle that can be used to detect intersections.
        */
        var BoundingRectangle = (function (_super) {
            __extends(BoundingRectangle, _super);
            /**
            * Creates a new instance of BoundingRectangle.
            * @param position Initial Position of the BoundingRectangle.
            * @param size Initial Size of the BoundingRectangle.
            */
            function BoundingRectangle(position, size) {
                _super.call(this, position);
                this._type = "BoundingRectangle";
                this._boundsType = "BoundingRectangle";
                this.Size = size;
            }
            /**
            * Scales the width and height of the BoundingRectangle.
            * @param x Value to multiply the width by.
            * @param y Value to multiply the height by.
            */
            BoundingRectangle.prototype.Scale = function (x, y) {
                this.Size.Width *= x;
                this.Size.Height *= y;
            };

            Object.defineProperty(BoundingRectangle.prototype, "TopLeft", {
                get: /**
                * Gets the top left corner of the BoundingRectangle.
                */
                function () {
                    if (this.Rotation === 0) {
                        return new EndGate.Vector2d(this.Position.X - this.Size.HalfWidth, this.Position.Y - this.Size.HalfHeight);
                    }

                    return new EndGate.Vector2d(this.Position.X - this.Size.HalfWidth, this.Position.Y - this.Size.HalfHeight).RotateAround(this.Position, this.Rotation);
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(BoundingRectangle.prototype, "TopRight", {
                get: /**
                * Gets the top right corner of the BoundingRectangle.
                */
                function () {
                    if (this.Rotation === 0) {
                        return new EndGate.Vector2d(this.Position.X + this.Size.HalfWidth, this.Position.Y - this.Size.HalfHeight);
                    }

                    return new EndGate.Vector2d(this.Position.X + this.Size.HalfWidth, this.Position.Y - this.Size.HalfHeight).RotateAround(this.Position, this.Rotation);
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(BoundingRectangle.prototype, "BotLeft", {
                get: /**
                * Gets the bottom left corner of the BoundingRectangle.
                */
                function () {
                    if (this.Rotation === 0) {
                        return new EndGate.Vector2d(this.Position.X - this.Size.HalfWidth, this.Position.Y + this.Size.HalfHeight);
                    }

                    return new EndGate.Vector2d(this.Position.X - this.Size.HalfWidth, this.Position.Y + this.Size.HalfHeight).RotateAround(this.Position, this.Rotation);
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(BoundingRectangle.prototype, "BotRight", {
                get: /**
                * Gets the bottom right corner of the BoundingRectangle.
                */
                function () {
                    if (this.Rotation === 0) {
                        return new EndGate.Vector2d(this.Position.X + this.Size.HalfWidth, this.Position.Y + this.Size.HalfHeight);
                    }

                    return new EndGate.Vector2d(this.Position.X + this.Size.HalfWidth, this.Position.Y + this.Size.HalfHeight).RotateAround(this.Position, this.Rotation);
                },
                enumerable: true,
                configurable: true
            });

            /**
            * Returns a list of vertices that are the locations of each corner of the BoundingRectangle. Format: [TopLeft, TopRight, BotLeft, BotRight].
            */
            BoundingRectangle.prototype.Corners = function () {
                return [this.TopLeft, this.TopRight, this.BotLeft, this.BotRight];
            };

            /**
            * Determines if the current BoundingRectangle is intersecting the provided BoundingCircle.
            * @param circle BoundingCircle to check intersection with.
            */
            BoundingRectangle.prototype.IntersectsCircle = function (circle) {
                return circle.IntersectsRectangle(this);
            };

            /**
            * Determines if the current BoundingRectangle is intersecting the provided BoundingRectangle.
            * @param rectangle BoundingRectangle to check intersection with.
            */
            BoundingRectangle.prototype.IntersectsRectangle = function (rectangle) {
                if (this.Rotation === 0 && rectangle.Rotation === 0) {
                    var myTopLeft = this.TopLeft, myBotRight = this.BotRight, theirTopLeft = rectangle.TopLeft, theirBotRight = rectangle.BotRight;

                    return theirTopLeft.X <= myBotRight.X && theirBotRight.X >= myTopLeft.X && theirTopLeft.Y <= myBotRight.Y && theirBotRight.Y >= myTopLeft.Y;
                } else if (rectangle.Position.Distance(this.Position).Magnitude() <= rectangle.Size.Radius + this.Size.Radius) {
                    var axisList = [this.TopRight.Subtract(this.TopLeft), this.TopRight.Subtract(this.BotRight), rectangle.TopLeft.Subtract(rectangle.BotLeft), rectangle.TopLeft.Subtract(rectangle.TopRight)];
                    var myVertices = this.Corners();
                    var theirVertices = rectangle.Corners();

                    for (var i = 0; i < axisList.length; i++) {
                        var axi = axisList[i];
                        var myProjections = EndGate._.Vector2dHelpers.GetMinMaxProjections(axi, myVertices);
                        var theirProjections = EndGate._.Vector2dHelpers.GetMinMaxProjections(axi, theirVertices);

                        if (theirProjections.Max < myProjections.Min || myProjections.Max < theirProjections.Min) {
                            return false;
                        }
                    }

                    return true;
                }

                return false;
            };

            /**
            * Determines if the current BoundingRectangle contains the provided Vector2d.
            * @param point A point.
            */
            BoundingRectangle.prototype.ContainsPoint = function (point) {
                var savedRotation = this.Rotation;

                if (this.Rotation !== 0) {
                    this.Rotation = 0;
                    point = point.RotateAround(this.Position, -savedRotation);
                }

                var myTopLeft = this.TopLeft, myBotRight = this.BotRight;

                this.Rotation = savedRotation;

                return point.X <= myBotRight.X && point.X >= myTopLeft.X && point.Y <= myBotRight.Y && point.Y >= myTopLeft.Y;
            };
            return BoundingRectangle;
        })(Bounds.Abstractions.Bounds2d);
        Bounds.BoundingRectangle = BoundingRectangle;
    })(EndGate.Bounds || (EndGate.Bounds = {}));
    var Bounds = EndGate.Bounds;
})(EndGate || (EndGate = {}));
var EndGate;
(function (EndGate) {
    /// <reference path="../Assets/Vectors/Vector2d.ts" />
    /// <reference path="BoundingRectangle.ts" />
    /// <reference path="Bounds2d.ts" />
    (function (Bounds) {
        /**
        * Defines a circle that can be used to detect intersections.
        */
        var BoundingCircle = (function (_super) {
            __extends(BoundingCircle, _super);
            /**
            * Creates a new instance of BoundingCircle.
            * @param position Initial Position of the BoundingCircle.
            * @param radius Initial Radius of the BoundingCircle.
            */
            function BoundingCircle(position, radius) {
                _super.call(this, position);
                this._type = "BoundingCircle";
                this._boundsType = "BoundingCircle";

                this.Radius = radius;
            }
            /**
            * Scales the radius of the BoundingCircle.
            * @param scale Value to multiply the radius by.
            */
            BoundingCircle.prototype.Scale = function (scale) {
                // This is an overloaded version of Bounds2d Scale but we don't care
                // about the second parameter within a BoundingCircle
                this.Radius *= scale;
            };

            /**
            * Calculates the area of the BoundingCircle.
            */
            BoundingCircle.prototype.Area = function () {
                return Math.PI * this.Radius * this.Radius;
            };

            /**
            * Calculates the circumference of the BoundingCircle.
            */
            BoundingCircle.prototype.Circumference = function () {
                return 2 * Math.PI * this.Radius;
            };

            /**
            * Determines if the current BoundingCircle is intersecting the provided BoundingCircle.
            * @param circle BoundingCircle to check intersection with.
            */
            BoundingCircle.prototype.IntersectsCircle = function (circle) {
                return this.Position.Distance(circle.Position).Length() < this.Radius + circle.Radius;
            };

            /**
            * Determines if the current BoundingCircle is intersecting the provided BoundingRectangle.
            * @param rectangle BoundingRectangle to check intersection with.
            */
            BoundingCircle.prototype.IntersectsRectangle = function (rectangle) {
                var translated = (rectangle.Rotation === 0) ? this.Position : this.Position.RotateAround(rectangle.Position, -rectangle.Rotation);

                var circleDistance = translated.Distance(rectangle.Position);

                if (circleDistance.X > (rectangle.Size.HalfWidth + this.Radius)) {
                    return false;
                }
                if (circleDistance.Y > (rectangle.Size.HalfHeight + this.Radius)) {
                    return false;
                }

                if (circleDistance.X <= (rectangle.Size.HalfWidth)) {
                    return true;
                }
                if (circleDistance.Y <= (rectangle.Size.HalfHeight)) {
                    return true;
                }

                var cornerDistance_sq = Math.pow(circleDistance.X - rectangle.Size.HalfWidth, 2) + Math.pow(circleDistance.Y - rectangle.Size.HalfHeight, 2);

                return (cornerDistance_sq <= (this.Radius * this.Radius));
            };

            /**
            * Determines if the current BoundingCircle contains the provided Vector2d.
            * @param point A point.
            */
            BoundingCircle.prototype.ContainsPoint = function (point) {
                return this.Position.Distance(point).Magnitude() < this.Radius;
            };
            return BoundingCircle;
        })(Bounds.Abstractions.Bounds2d);
        Bounds.BoundingCircle = BoundingCircle;
    })(EndGate.Bounds || (EndGate.Bounds = {}));
    var Bounds = EndGate.Bounds;
})(EndGate || (EndGate = {}));
/// <reference path="../Interfaces/IDisposable.ts" />
/// <reference path="../Interfaces/ITyped.ts" />
var EndGate;
(function (EndGate) {
    /**
    * Defines a type constrained event handler object that can maintain bound functions which take in a value T and trigger them on demand.
    */
    var EventHandler1 = (function () {
        /**
        * Creates a new instance of the EventHandler object.
        */
        function EventHandler1() {
            this._type = "Event";
            this._actions = [];
            this._hasBindings = false;
        }
        /**
        * Binds the provided action to the EventHandler1.  Trigger will execute all bound functions.
        * @param action Function to execute on EventHandler Trigger.
        */
        EventHandler1.prototype.Bind = function (action) {
            this._actions.push(action);
            this._hasBindings = true;
        };

        /**
        * Unbinds the provided action from the EventHandler1.
        * @param action Function to unbind.  The action will no longer be executed when the EventHandler gets Triggered.
        */
        EventHandler1.prototype.Unbind = function (action) {
            for (var i = 0; i < this._actions.length; i++) {
                if (this._actions[i] === action) {
                    this._actions.splice(i, 1);

                    this._hasBindings = this._actions.length > 0;
                    return;
                }
            }
        };

        /**
        * Determines if the EventHandler1 has active bindings.
        */
        EventHandler1.prototype.HasBindings = function () {
            return this._hasBindings;
        };

        /**
        * Executes all bound functions and passes the provided args to each.
        * @param val The argument to pass to the bound functions.
        */
        EventHandler1.prototype.Trigger = function (val) {
            for (var i = 0; i < this._actions.length; i++) {
                this._actions[i](val);
            }
        };
        return EventHandler1;
    })();
    EndGate.EventHandler1 = EventHandler1;
})(EndGate || (EndGate = {}));
var EndGate;
(function (EndGate) {
    (function (Collision) {
        /// <reference path="../Assets/Vectors/Vector2d.ts" />
        /// <reference path="Collidable.ts" />
        (function (Assets) {
            /**
            * Defines a data object that is used to describe a collision event.
            */
            var CollisionData = (function () {
                /**
                * Creates a new instance of the CollisionData object.
                * @param at Initial value of the At component of CollisionData.
                * @param w Initial value of the With component of CollisionData.
                */
                function CollisionData(at, w) {
                    this.At = at;
                    this.With = w;
                }
                return CollisionData;
            })();
            Assets.CollisionData = CollisionData;
        })(Collision.Assets || (Collision.Assets = {}));
        var Assets = Collision.Assets;
    })(EndGate.Collision || (EndGate.Collision = {}));
    var Collision = EndGate.Collision;
})(EndGate || (EndGate = {}));
var EndGate;
(function (EndGate) {
    /// <reference path="../Interfaces/IDisposable.ts" />
    /// <reference path="../Interfaces/ITyped.ts" />
    /// <reference path="../Bounds/Bounds2d.ts" />
    /// <reference path="../Utilities/EventHandler1.ts" />
    /// <reference path="../Assets/Vectors/Vector2d.ts" />
    /// <reference path="CollisionData.ts" />
    (function (Collision) {
        /**
        * Defines a collidable object that can be used to detect collisions with other objects.
        */
        var Collidable = (function () {
            /**
            * Creates a new instance of Collidable.
            * @param bounds Initial bounds for the Collidable.
            */
            function Collidable(bounds) {
                this._type = "Collidable";
                this._disposed = false;
                this.Bounds = bounds;
                this._id = Collidable._collidableIDs++;

                this._onCollision = new EndGate.EventHandler1();
                this._onDisposed = new EndGate.EventHandler1();
            }
            Object.defineProperty(Collidable.prototype, "OnCollision", {
                get: /**
                * Gets an event that is triggered when a collision happens.  Functions can be bound or unbound to this event to be executed when the event triggers.
                */
                function () {
                    return this._onCollision;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Collidable.prototype, "OnDisposed", {
                get: /**
                * Gets an event that is triggered when the Collidable has been disposed.  Functions can be bound or unbound to this event to be executed when the event triggers.
                */
                function () {
                    return this._onDisposed;
                },
                enumerable: true,
                configurable: true
            });

            /**
            * Determines if the provided collidable is colliding with this Collidable.
            * @param other Collidable to check collision with.
            */
            Collidable.prototype.IsCollidingWith = function (other) {
                return this.Bounds.Intersects(other.Bounds);
            };

            /**
            * Triggers the OnCollision event.  Can also be overridden from derived classes to be called when a collision occurs if the collidable is being used with a CollisionManager
            * @param data Collision information related to the collision.
            */
            Collidable.prototype.Collided = function (data) {
                this.OnCollision.Trigger(data);
            };

            /**
            * Triggers the OnDisposed event.  If this Collidable is used with a CollisionManager it will be unmonitored when disposed.
            */
            Collidable.prototype.Dispose = function () {
                if (!this._disposed) {
                    this._disposed = true;
                    this.OnDisposed.Trigger(this);
                } else {
                    throw new Error("Cannot dispose collidable more than once.");
                }
            };
            Collidable._collidableIDs = 0;
            return Collidable;
        })();
        Collision.Collidable = Collidable;
    })(EndGate.Collision || (EndGate.Collision = {}));
    var Collision = EndGate.Collision;
})(EndGate || (EndGate = {}));
/// <reference path="Interfaces/ITyped.ts" />
/// <reference path="Assets/TimeSpan.ts" />
var EndGate;
(function (EndGate) {
    /**
    * Defines a game time class that is used to manage update timing execution as well as total game time.
    */
    var GameTime = (function () {
        /**
        * Creates a new instance of the GameTime object.
        */
        function GameTime() {
            this._type = "GameTime";
            this._start = this._lastUpdate = new Date();

            this.Update();
        }
        Object.defineProperty(GameTime.prototype, "Elapsed", {
            get: /**
            * Gets the elapsed time since the last update.
            */
            function () {
                return this._elapsed;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(GameTime.prototype, "Now", {
            get: /**
            * Gets the current date time at the start of the update.
            */
            function () {
                return this._lastUpdate;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(GameTime.prototype, "Total", {
            get: /**
            * Gets the total amount of time surpassed since construction.
            */
            function () {
                return EndGate.TimeSpan.DateSpan(this._start, new Date());
            },
            enumerable: true,
            configurable: true
        });

        /**
        * Updates the game time object.  Causes the gameTime to refresh all its components.
        */
        GameTime.prototype.Update = function () {
            var now = new Date();

            this._elapsed = new EndGate.TimeSpan(now.getTime() - this._lastUpdate.getTime());
            this._lastUpdate = now;
        };
        return GameTime;
    })();
    EndGate.GameTime = GameTime;
})(EndGate || (EndGate = {}));
/// <reference path="../Interfaces/IDisposable.ts" />
/// <reference path="../Interfaces/ITyped.ts" />
var EndGate;
(function (EndGate) {
    /**
    * Defines a type constrained event handler object that can maintain bound functions which take in a value T and U and trigger them on demand.
    */
    var EventHandler2 = (function () {
        /**
        * Creates a new instance of the EventHandler2 object.
        */
        function EventHandler2() {
            this._type = "Event";
            this._actions = [];
            this._hasBindings = false;
        }
        /**
        * Binds the provided action to the EventHandler2.  Trigger will execute all bound functions.
        * @param action Function to execute on EventHandler2 Trigger.
        */
        EventHandler2.prototype.Bind = function (action) {
            this._actions.push(action);
            this._hasBindings = true;
        };

        /**
        * Unbinds the provided action from the EventHandler2.
        * @param action Function to unbind.  The action will no longer be executed when the EventHandler gets Triggered.
        */
        EventHandler2.prototype.Unbind = function (action) {
            for (var i = 0; i < this._actions.length; i++) {
                if (this._actions[i] === action) {
                    this._actions.splice(i, 1);

                    this._hasBindings = this._actions.length > 0;
                    return;
                }
            }
        };

        /**
        * Determines if the EventHandler2 has active bindings.
        */
        EventHandler2.prototype.HasBindings = function () {
            return this._hasBindings;
        };

        /**
        * Executes all bound functions and passes the provided args to each.
        * @param val1 The first argument to pass to the bound functions.
        * @param val2 The second argument to pass to the bound functions.
        */
        EventHandler2.prototype.Trigger = function (val1, val2) {
            for (var i = 0; i < this._actions.length; i++) {
                this._actions[i](val1, val2);
            }
        };
        return EventHandler2;
    })();
    EndGate.EventHandler2 = EventHandler2;
})(EndGate || (EndGate = {}));
var EndGate;
(function (EndGate) {
    /// <reference path="../Interfaces/IUpdateable.ts" />
    /// <reference path="../Interfaces/ITyped.ts" />
    /// <reference path="Collidable.ts" />
    /// <reference path="CollisionData.ts" />
    /// <reference path="../Utilities/EventHandler2.ts" />
    /// <reference path="../GameTime.ts" />
    (function (Collision) {
        /**
        * Defines a manager that will check for collisions between objects that it is monitoring.
        */
        var CollisionManager = (function () {
            /**
            * Creates a new instance of CollisionManager.
            */
            function CollisionManager() {
                this._type = "CollisionManager";
                this._collidables = [];
                this._enabled = false;

                this._onCollision = new EndGate.EventHandler2();
            }
            Object.defineProperty(CollisionManager.prototype, "OnCollision", {
                get: /**
                * Gets an event that is triggered when a collision happens among two of the monitored objects.  Functions can be bound or unbound to this event to be executed when the event triggers.
                */
                function () {
                    return this._onCollision;
                },
                enumerable: true,
                configurable: true
            });

            /**
            * Monitors the provided collidable and will trigger its Collided function and OnCollision event whenever a collision occurs with it and another Collidable.
            * If the provided collidable gets disposed it will automatically become unmonitored.
            * @param obj Collidable to monitor.
            */
            CollisionManager.prototype.Monitor = function (obj) {
                var _this = this;
                this._enabled = true;

                obj.OnDisposed.Bind(function () {
                    _this.Unmonitor(obj);
                });

                this._collidables.push(obj);
            };

            /**
            * Unmonitors the provided collidable.  The Collided function and OnCollision event will no longer be triggered when an actual collision may have occurred.
            * Disposing a monitored collidable will automatically be unmonitored
            * @param obj Collidable to unmonitor.
            */
            CollisionManager.prototype.Unmonitor = function (obj) {
                for (var i = 0; i < this._collidables.length; i++) {
                    if (this._collidables[i]._id === obj._id) {
                        this._collidables.splice(i, 1);
                        break;
                    }
                }
            };

            /**
            * Checks for collisions within its monitored objects.  Games CollisionManager's automatically have their Update functions called at the beginning of each update loop.
            * @param gameTime The current game time object.
            */
            CollisionManager.prototype.Update = function (gameTime) {
                var first, second;

                if (this._enabled) {
                    for (var i = 0; i < this._collidables.length; i++) {
                        first = this._collidables[i];

                        for (var j = i + 1; j < this._collidables.length; j++) {
                            second = this._collidables[j];

                            if (first.IsCollidingWith(second)) {
                                first.Collided(new Collision.Assets.CollisionData(first.Bounds.Position.Clone(), second));
                                second.Collided(new Collision.Assets.CollisionData(second.Bounds.Position.Clone(), first));
                                this.OnCollision.Trigger(first, second);
                            }
                        }
                    }
                }
            };
            return CollisionManager;
        })();
        Collision.CollisionManager = CollisionManager;
    })(EndGate.Collision || (EndGate.Collision = {}));
    var Collision = EndGate.Collision;
})(EndGate || (EndGate = {}));
var EndGate;
(function (EndGate) {
    (function (_) {
        /// <reference path="../Interfaces/ITyped.ts" />
        (function (Loopers) {
            var LooperCallback = (function () {
                function LooperCallback(callback) {
                    this._type = "LooperCallback";
                    this.Callback = callback;
                    this.ID = LooperCallback._ids++;
                }
                LooperCallback._ids = 0;
                return LooperCallback;
            })();
            Loopers.LooperCallback = LooperCallback;
        })(_.Loopers || (_.Loopers = {}));
        var Loopers = _.Loopers;
    })(EndGate._ || (EndGate._ = {}));
    var _ = EndGate._;
})(EndGate || (EndGate = {}));
var EndGate;
(function (EndGate) {
    (function (_) {
        /// <reference path="LooperCallback.ts" />
        /// <reference path="../Interfaces/ITyped.ts" />
        (function (Loopers) {
            var TimedCallback = (function (_super) {
                __extends(TimedCallback, _super);
                function TimedCallback(fps, callback) {
                    _super.call(this, callback);
                    this._type = "TimedCallback";

                    this.Fps = fps;
                    this.TimeoutID = 0;
                    this.Active = false;
                }
                return TimedCallback;
            })(Loopers.LooperCallback);
            Loopers.TimedCallback = TimedCallback;
        })(_.Loopers || (_.Loopers = {}));
        var Loopers = _.Loopers;
    })(EndGate._ || (EndGate._ = {}));
    var _ = EndGate._;
})(EndGate || (EndGate = {}));
var EndGate;
(function (EndGate) {
    (function (_) {
        /// <reference path="../Interfaces/ITyped.ts" />
        /// <reference path="ILooper.ts" />
        /// <reference path="TimedCallback.ts" />
        (function (Loopers) {
            var Looper = (function () {
                function Looper() {
                    this._type = "Looper";
                    this._running = false;
                    this._callbacks = [];
                }
                Looper.prototype.AddCallback = function (timedCallback) {
                    var _this = this;
                    this._callbacks.push(timedCallback);
                    timedCallback.Active = true;

                    if (this._running) {
                        // Let initial call stack unwind before initiating the loop
                        window.setTimeout(function () {
                            _this.Loop(timedCallback);
                        }, 0);
                    }
                };

                Looper.prototype.RemoveCallback = function (timedCallback) {
                    for (var i = 0; i < this._callbacks.length; i++) {
                        if (this._callbacks[i].ID === timedCallback.ID) {
                            window.clearTimeout(timedCallback.TimeoutID);
                            timedCallback.Active = false;
                            this._callbacks.splice(i, 1);
                            return;
                        }
                    }
                };

                Looper.prototype.Start = function () {
                    this._running = true;

                    this.Run();
                };

                Looper.prototype.Run = function () {
                    var _this = this;
                    for (var i = 0; i < this._callbacks.length; i++) {
                        window.setTimeout((function (index) {
                            return function () {
                                _this.Loop(_this._callbacks[index]);
                            };
                        })(i), 0);
                    }
                };

                Looper.prototype.Loop = function (timedCallback) {
                    var that = this, msTimer = 1000 / timedCallback.Fps;

                    timedCallback.Callback();

                    if (timedCallback.Active) {
                        timedCallback.TimeoutID = window.setTimeout(function () {
                            that.Loop(timedCallback);
                        }, msTimer);
                    }
                };

                Looper.prototype.Dispose = function () {
                    for (var i = this._callbacks.length - 1; i >= 0; i--) {
                        this.RemoveCallback(this._callbacks[i]);
                    }

                    this._callbacks = [];
                    this._running = false;
                };
                return Looper;
            })();
            Loopers.Looper = Looper;
        })(_.Loopers || (_.Loopers = {}));
        var Loopers = _.Loopers;
    })(EndGate._ || (EndGate._ = {}));
    var _ = EndGate._;
})(EndGate || (EndGate = {}));
window.OnRepaintCompleted = (function () {
    return (window.requestAnimationFrame || (window).webkitRequestAnimationFrame || (window).mozRequestAnimationFrame || (window).oRequestAnimationFrame || (window).msRequestAnimationFrame || function (callback) {
        window.setTimeout(callback, 0);
    });
})();
var EndGate;
(function (EndGate) {
    (function (_) {
        /// <reference path="ILooper.ts" />
        /// <reference path="../Extensions/WindowExtensions.ts" />
        /// <reference path="LooperCallback.ts" />
        (function (Loopers) {
            // This looper uses the request animation frame to run its internal loop
            // The method has been aliased as "OnRepaintCompleted" via the WindowExtensions
            var RepaintLooper = (function () {
                function RepaintLooper() {
                    this._type = "RepaintLooper";
                    this._running = false;
                    this._callbacksModified = false;
                    this._callbacks = [];
                }
                RepaintLooper.prototype.Start = function () {
                    this._running = true;
                    this.Run();
                };

                RepaintLooper.prototype.Run = function () {
                    var _this = this;
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
                        window.OnRepaintCompleted(function () {
                            _this.Run();
                        });
                    }
                };

                RepaintLooper.prototype.AddCallback = function (looperCallback) {
                    // This doesn't necessarily need to be here (it wont do any harm) but in order for
                    // consistency sake I'm putting it in
                    this._callbacksModified = true;

                    this._callbacks.push(looperCallback);
                };

                RepaintLooper.prototype.RemoveCallback = function (looperCallback) {
                    for (var i = 0; i < this._callbacks.length; i++) {
                        if (this._callbacks[i].ID === looperCallback.ID) {
                            this._callbacksModified = true;
                            this._callbacks.splice(i, 1);
                            return;
                        }
                    }
                };

                RepaintLooper.prototype.Dispose = function () {
                    this._callbacksModified = true;
                    this._callbacks = [];
                    this._running = false;
                };
                return RepaintLooper;
            })();
            Loopers.RepaintLooper = RepaintLooper;
        })(_.Loopers || (_.Loopers = {}));
        var Loopers = _.Loopers;
    })(EndGate._ || (EndGate._ = {}));
    var _ = EndGate._;
})(EndGate || (EndGate = {}));
var EndGate;
(function (EndGate) {
    /// <reference path="Interfaces/ITyped.ts" />
    /// <reference path="Loopers/Looper.ts" />
    /// <reference path="Loopers/RepaintLooper.ts" />
    /// <reference path="Loopers/TimedCallback.ts" />
    /// <reference path="Game.ts" />
    (function (_) {
        var GameRunner = (function () {
            function GameRunner() {
                this._type = "GameRunner";
                this._updateCallbacks = {};
                this._drawCallbacks = {};
                this._updateLoop = null;
                this._drawLoop = null;
                this._callbackCount = 0;
            }
            GameRunner.prototype.Register = function (game) {
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
            };

            GameRunner.prototype.Unregister = function (game) {
                var updateCallback, drawCallback;

                if (this._updateCallbacks[game._ID]) {
                    updateCallback = this._updateCallbacks[game._ID];
                    drawCallback = this._drawCallbacks[game._ID];

                    this._updateLoop.RemoveCallback(updateCallback);
                    this._drawLoop.RemoveCallback(drawCallback);
                    delete this._updateCallbacks[game._ID];
                    delete this._drawCallbacks[game._ID];

                    this._callbackCount--;

                    this.TryLoopStop();
                }
            };

            GameRunner.prototype.TryLoopStart = function () {
                if (this._callbackCount === 1) {
                    this._updateLoop = new _.Loopers.Looper();
                    this._updateLoop.Start();
                    this._drawLoop = new _.Loopers.RepaintLooper();
                    this._drawLoop.Start();
                }
            };

            GameRunner.prototype.TryLoopStop = function () {
                if (this._callbackCount === 0 && this._updateLoop != null) {
                    this._updateLoop.Dispose();
                    this._updateLoop = null;
                    this._drawLoop.Dispose();
                    this._drawLoop = null;
                }
            };

            GameRunner.prototype.CreateAndCacheUpdateCallback = function (game) {
                var updateCallback = new _.Loopers.TimedCallback(0, function () {
                    game._PrepareUpdate();
                });

                this._updateCallbacks[game._ID] = updateCallback;

                return updateCallback;
            };

            GameRunner.prototype.CreateAndCacheDrawCallback = function (game) {
                var drawCallback = new _.Loopers.LooperCallback(function () {
                    game._PrepareDraw();
                });

                this._drawCallbacks[game._ID] = drawCallback;

                return drawCallback;
            };

            GameRunner.prototype.CreateUpdateRateSetter = function (callback) {
                return function (updateRate) {
                    callback.Fps = updateRate;
                };
            };
            return GameRunner;
        })();
        _.GameRunner = GameRunner;
    })(EndGate._ || (EndGate._ = {}));
    var _ = EndGate._;
})(EndGate || (EndGate = {}));

var GameRunnerInstance = new EndGate._.GameRunner();
var EndGate;
(function (EndGate) {
    /**
    * Defines a GameConfiguration object that is used to represent the current state of a Game object.
    */
    var GameConfiguration = (function () {
        /**
        * Creates a new instance of the GameConfiguration object.
        * @param updateRateSetter A function that updates the rate of "Update" execution.
        */
        function GameConfiguration(updateRateSetter) {
            this._defaultUpdateRate = 40;
            this._updateRateSetter = updateRateSetter;
            this._updateRate = this._defaultUpdateRate;
        }
        Object.defineProperty(GameConfiguration.prototype, "UpdateRate", {
            get: /**
            * Gets or sets the UpdateRate of the game.  Update rates are represented as X many updates per second.
            */
            function () {
                return this._updateRate;
            },
            set: function (updateRate) {
                this._updateRate = updateRate;
                this._updateRateSetter(this._updateRate);
            },
            enumerable: true,
            configurable: true
        });
        return GameConfiguration;
    })();
    EndGate.GameConfiguration = GameConfiguration;
})(EndGate || (EndGate = {}));
var EndGate;
(function (EndGate) {
    (function (Graphics) {
        (function (Assets) {
            /// <reference path="../Interfaces/ITyped.ts" />
            (function (_) {
                var Graphic2dState = (function () {
                    function Graphic2dState() {
                        this._cachedState = {};
                    }
                    Object.defineProperty(Graphic2dState.prototype, "StrokeStyle", {
                        get: function () {
                            return this._cachedState["strokeStyle"];
                        },
                        set: function (value) {
                            this._cachedState["strokeStyle"] = value;
                        },
                        enumerable: true,
                        configurable: true
                    });

                    Object.defineProperty(Graphic2dState.prototype, "FillStyle", {
                        get: function () {
                            return this._cachedState["fillStyle"];
                        },
                        set: function (value) {
                            this._cachedState["fillStyle"] = value;
                        },
                        enumerable: true,
                        configurable: true
                    });

                    Object.defineProperty(Graphic2dState.prototype, "GlobalAlpha", {
                        get: function () {
                            return this._cachedState["globalAlpha"];
                        },
                        set: function (value) {
                            this._cachedState["globalAlpha"] = value;
                        },
                        enumerable: true,
                        configurable: true
                    });

                    Object.defineProperty(Graphic2dState.prototype, "LineWidth", {
                        get: function () {
                            return this._cachedState["lineWidth"];
                        },
                        set: function (value) {
                            this._cachedState["lineWidth"] = value;
                        },
                        enumerable: true,
                        configurable: true
                    });

                    Object.defineProperty(Graphic2dState.prototype, "LineCap", {
                        get: function () {
                            return this._cachedState["lineCap"];
                        },
                        set: function (value) {
                            this._cachedState["lineCap"] = value;
                        },
                        enumerable: true,
                        configurable: true
                    });

                    Object.defineProperty(Graphic2dState.prototype, "LineJoin", {
                        get: function () {
                            return this._cachedState["lineJoin"];
                        },
                        set: function (value) {
                            this._cachedState["lineJoin"] = value;
                        },
                        enumerable: true,
                        configurable: true
                    });

                    Object.defineProperty(Graphic2dState.prototype, "MiterLimit", {
                        get: function () {
                            return this._cachedState["miterLimit"];
                        },
                        set: function (value) {
                            this._cachedState["miterLimit"] = value;
                        },
                        enumerable: true,
                        configurable: true
                    });

                    Object.defineProperty(Graphic2dState.prototype, "ShadowOffsetX", {
                        get: function () {
                            return this._cachedState["shadowOffsetX"];
                        },
                        set: function (value) {
                            this._cachedState["shadowOffsetX"] = value;
                        },
                        enumerable: true,
                        configurable: true
                    });

                    Object.defineProperty(Graphic2dState.prototype, "ShadowOffsetY", {
                        get: function () {
                            return this._cachedState["shadowOffsetY"];
                        },
                        set: function (value) {
                            this._cachedState["shadowOffsetY"] = value;
                        },
                        enumerable: true,
                        configurable: true
                    });

                    Object.defineProperty(Graphic2dState.prototype, "ShadowBlur", {
                        get: function () {
                            return this._cachedState["shadowBlur"];
                        },
                        set: function (value) {
                            this._cachedState["shadowBlur"] = value;
                        },
                        enumerable: true,
                        configurable: true
                    });

                    Object.defineProperty(Graphic2dState.prototype, "ShadowColor", {
                        get: function () {
                            return this._cachedState["shadowColor"];
                        },
                        set: function (value) {
                            this._cachedState["shadowColor"] = value;
                        },
                        enumerable: true,
                        configurable: true
                    });

                    Object.defineProperty(Graphic2dState.prototype, "GlobalCompositeOperation", {
                        get: function () {
                            return this._cachedState["globalCompositeOperation"];
                        },
                        set: function (value) {
                            this._cachedState["globalCompositeOperation"] = value;
                        },
                        enumerable: true,
                        configurable: true
                    });

                    Object.defineProperty(Graphic2dState.prototype, "Font", {
                        get: function () {
                            return this._cachedState["font"];
                        },
                        set: function (value) {
                            this._cachedState["font"] = value;
                        },
                        enumerable: true,
                        configurable: true
                    });

                    Object.defineProperty(Graphic2dState.prototype, "TextAlign", {
                        get: function () {
                            return this._cachedState["textAlign"];
                        },
                        set: function (value) {
                            this._cachedState["textAlign"] = value;
                        },
                        enumerable: true,
                        configurable: true
                    });

                    Object.defineProperty(Graphic2dState.prototype, "TextBaseline", {
                        get: function () {
                            return this._cachedState["textBaseline"];
                        },
                        set: function (value) {
                            this._cachedState["textBaseline"] = value;
                        },
                        enumerable: true,
                        configurable: true
                    });

                    Graphic2dState.prototype.SetContextState = function (context) {
                        for (var key in this._cachedState) {
                            context[key] = this._cachedState[key];
                        }
                    };
                    return Graphic2dState;
                })();
                _.Graphic2dState = Graphic2dState;
            })(Assets._ || (Assets._ = {}));
            var _ = Assets._;
        })(Graphics.Assets || (Graphics.Assets = {}));
        var Assets = Graphics.Assets;
    })(EndGate.Graphics || (EndGate.Graphics = {}));
    var Graphics = EndGate.Graphics;
})(EndGate || (EndGate = {}));
var EndGate;
(function (EndGate) {
    (function (Graphics) {
        /// <reference path="../Interfaces/ITyped.ts" />
        /// <reference path="../Interfaces/IMoveable.ts" />
        /// <reference path="../Rendering/IRenderable.ts" />
        /// <reference path="../Assets/Sizes/Size2d.ts" />
        /// <reference path="../Assets/Vectors/Vector2d.ts" />
        /// <reference path="../Bounds/Bounds2d.ts" />
        /// <reference path="Graphic2dState.ts" />
        (function (Abstractions) {
            /**
            * Abstract drawable graphic type that is used create the base for graphics.
            */
            var Graphic2d = (function () {
                function Graphic2d(position) {
                    this._type = "Graphic2d";
                    this.Position = position;
                    this.Rotation = 0;
                    this.ZIndex = 0;
                    this.Visible = true;
                    this._State = new Graphics.Assets._.Graphic2dState();
                    this._children = [];
                    this._disposed = false;
                    this._onDisposed = new EndGate.EventHandler1();
                }
                Object.defineProperty(Graphic2d.prototype, "OnDisposed", {
                    get: /**
                    * Gets an event that is triggered when the Graphic2d has been disposed.  Functions can be bound or unbound to this event to be executed when the event triggers.
                    */
                    function () {
                        return this._onDisposed;
                    },
                    enumerable: true,
                    configurable: true
                });

                /**
                * Adds a child to the Graphic2d.  Children are drawn with relative positions to the parent Graphic2d.  Children
                * of a Graphic2d should not be added to the Scene, parent Graphic2d's are responsible for drawing their children.
                * @param graphic Child to add.
                */
                Graphic2d.prototype.AddChild = function (graphic) {
                    this._children.push(graphic);
                    this._children.sort(Graphic2d._zindexSort);
                };

                /**
                * Removes a child from the Graphic2d.  Returns a Boolean value indicating whether or not the child was able to be removed.
                * @param graphic Child to remove.
                */
                Graphic2d.prototype.RemoveChild = function (graphic) {
                    var index = this._children.indexOf(graphic);

                    if (index >= 0) {
                        this._children.splice(index, 1);
                        return true;
                    }

                    return false;
                };

                /**
                * Returns the list of children for the current Graphic2d.
                */
                Graphic2d.prototype.Children = function () {
                    return this._children;
                };

                Graphic2d.prototype._StartDraw = function (context) {
                    context.save();
                    this._State.SetContextState(context);

                    context.translate(this.Position.X, this.Position.Y);

                    if (this.Rotation !== 0) {
                        context.rotate(this.Rotation);
                    }
                };

                Graphic2d.prototype._EndDraw = function (context) {
                    for (var i = 0; i < this._children.length; i++) {
                        if (this._children[i].Visible) {
                            this._children[i].Draw(context);
                        }
                    }

                    context.restore();
                };

                /**
                * Abstract: Should be overridden to draw the derived class onto the context.  If this graphic is part of a scene the Draw function will be called automatically.
                * @param context The canvas context to draw the graphic onto.
                */
                Graphic2d.prototype.Draw = function (context) {
                    throw new Error("The Draw method is abstract on Graphic2d and should not be called.");
                };

                /**
                * Abstract: Should be overridden to return the bounding area that represents where the graphic will draw.
                */
                Graphic2d.prototype.GetDrawBounds = function () {
                    throw new Error("GetDrawBounds is abstract, it must be implemented.");
                };

                /**
                * Triggers the OnDisposed event.  If this Graphic2d is used with a Scene2d it will be removed from the scene when disposed.
                */
                Graphic2d.prototype.Dispose = function () {
                    if (!this._disposed) {
                        this._disposed = true;
                        this.OnDisposed.Trigger(this);
                    } else {
                        throw new Error("Cannot dispose graphic more than once.");
                    }
                };
                Graphic2d._zindexSort = function (a, b) {
                    return a.ZIndex - b.ZIndex;
                };
                return Graphic2d;
            })();
            Abstractions.Graphic2d = Graphic2d;
        })(Graphics.Abstractions || (Graphics.Abstractions = {}));
        var Abstractions = Graphics.Abstractions;
    })(EndGate.Graphics || (EndGate.Graphics = {}));
    var Graphics = EndGate.Graphics;
})(EndGate || (EndGate = {}));
var EndGate;
(function (EndGate) {
    /// <reference path="../../Assets/Sizes/Size2d.ts" />
    /// <reference path="../../Assets/Vectors/Vector2d.ts" />
    /// <reference path="../../Bounds/BoundingRectangle.ts" />
    (function (Rendering) {
        /**
        * Defines a camera that is used to define a viewport.  Should be used in conjunction with a Camera2dRenderer to render graphics as if being viewed through a camera.
        */
        var Camera2d = (function (_super) {
            __extends(Camera2d, _super);
            /**
            * Creates a new instance of the Camera2d object.
            * @param position Initial position of the camera.
            * @param size Initial size of the camera.
            */
            function Camera2d(position, size) {
                _super.call(this, position, size);
                this._type = "Camera2d";

                this.Distance = Camera2d.DefaultDistance;
            }
            /**
            * Converts an absolute position (0 to cameras Size) to a camera relative position.  Most useful when used to convert mouse click coordinates to scene coordinates.
            * @param position The absolute position to convert.  0 position represents the top or left hand side of the camera.
            */
            Camera2d.prototype.ToCameraRelative = function (position) {
                var scaledTopLeft = this.Position.Subtract(this.Size.Multiply(this._GetDistanceScale() * .5));
                return scaledTopLeft.Add(position.Multiply(this._GetDistanceScale()));
            };

            Camera2d.prototype._GetInverseDistanceScale = function () {
                return Camera2d.DefaultDistance / this.Distance;
            };

            Camera2d.prototype._GetDistanceScale = function () {
                return this.Distance / Camera2d.DefaultDistance;
            };
            Camera2d.DefaultDistance = 1000;
            return Camera2d;
        })(EndGate.Bounds.BoundingRectangle);
        Rendering.Camera2d = Camera2d;
    })(EndGate.Rendering || (EndGate.Rendering = {}));
    var Rendering = EndGate.Rendering;
})(EndGate || (EndGate = {}));
var EndGate;
(function (EndGate) {
    /// <reference path="IRenderer.ts" />
    /// <reference path="IRenderable.ts" />
    /// <reference path="../Utilities/EventHandler1.ts" />
    /// <reference path="../Assets/Sizes/Size2d.ts" />
    (function (Rendering) {
        /**
        * Defines a 2d renderer that uses a double buffer to draw graphics.
        */
        var Renderer2d = (function () {
            /**
            * Creates a new instance of the Renderer2d object.
            * @param renderOnto The canvas to render onto.
            */
            function Renderer2d(renderOnto) {
                this._visibleCanvas = renderOnto;
                this._visibleContext = renderOnto.getContext("2d");

                // Create an equally sized canvas for a buffer
                this._BufferCanvas = document.createElement("canvas");
                this._BufferContext = this._BufferCanvas.getContext("2d");
                this._onRendererSizeChange = new EndGate.EventHandler1();
                this.UpdateBufferSize();

                this._disposed = false;
            }
            Object.defineProperty(Renderer2d.prototype, "OnRendererSizeChange", {
                get: /**
                * Gets an event that is triggered when the renderOnto canvas changes size.  Functions can be bound or unbound to this event to be executed when the event triggers.
                */
                function () {
                    return this._onRendererSizeChange;
                },
                enumerable: true,
                configurable: true
            });

            /**
            * Renders the provided renderables onto the renderOnto canvas.  Returns the canvas that was rendered onto.
            * @param renderables Array of items that are to be rendered, assumes Visible is set to true.
            */
            Renderer2d.prototype.Render = function (renderables) {
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

                for (var i = 0; i < renderables.length; i++) {
                    renderables[i].Draw(this._BufferContext);
                }

                return this._BufferContext;
            };

            /**
            * Destroys the visible canvas.
            */
            Renderer2d.prototype.Dispose = function () {
                if (!this._disposed) {
                    this._disposed = true;

                    this._visibleCanvas.parentNode.removeChild(this._visibleCanvas);
                }
            };

            Renderer2d.prototype._ClearBuffer = function () {
                this._BufferContext.clearRect(0, 0, this._BufferCanvas.width, this._BufferCanvas.height);
            };

            Renderer2d.prototype.UpdateBufferSize = function () {
                this._BufferCanvas.width = this._visibleCanvas.width;
                this._BufferCanvas.height = this._visibleCanvas.height;
                this.OnRendererSizeChange.Trigger(new EndGate.Size2d(this._visibleCanvas.width, this._visibleCanvas.height));
            };
            Renderer2d._zindexSort = function (a, b) {
                return a.ZIndex - b.ZIndex;
            };
            return Renderer2d;
        })();
        Rendering.Renderer2d = Renderer2d;
    })(EndGate.Rendering || (EndGate.Rendering = {}));
    var Rendering = EndGate.Rendering;
})(EndGate || (EndGate = {}));
var EndGate;
(function (EndGate) {
    (function (Rendering) {
        /// <reference path="../../Assets/Vectors/Vector2d.ts" />
        /// <reference path="../../Assets/Sizes/Size2d.ts" />
        /// <reference path="Camera2d.ts" />
        (function (_) {
            /**
            * Defines a builder that is used to build a camera sensitive CanvasRenderingContext2d so that anything drawn to it becomes relative to the Camera2d.
            */
            var Camera2dCanvasContextBuilder = (function () {
                /**
                * Creates a new instance of the Camera2dCanvasContextBuilder object.
                * @param camera Camera to link to built CanvasRenderingContext2d's (Cannot change after construction).
                */
                function Camera2dCanvasContextBuilder(camera) {
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
                Camera2dCanvasContextBuilder.prototype.Build = function (context) {
                    var that = this, savedCreateRadialGradient = context.createRadialGradient, savedTranslate = context.translate, savedSave = context.save, savedRestore = context.restore, savedDrawImage1 = this.BuildPositionReplacer(context.drawImage, 1), savedDrawImage2 = this.BuildPositionReplacer(context.drawImage, 5);

                    (context).unModifiedClearRect = context.clearRect;

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
                    context.drawImage = function () {
                        if (arguments.length <= 5) {
                            savedDrawImage1.apply(this, arguments);
                        } else {
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
                };

                Camera2dCanvasContextBuilder.prototype._UpdateCanvasCenter = function (newSize) {
                    this._canvasCenter.X = newSize.Width / 2;
                    this._canvasCenter.Y = newSize.Height / 2;
                };

                Camera2dCanvasContextBuilder.prototype.BuildPositionReplacer = function (replacee, positionArgOffset, argCount) {
                    if (typeof positionArgOffset === "undefined") { positionArgOffset = 0; }
                    if (typeof argCount === "undefined") { argCount = 2; }
                    var that = this, axiList = ["X", "Y"];

                    return function () {
                        var scale, axi;

                        if (!that._translated) {
                            scale = that._camera._GetDistanceScale();
                            for (var i = 0; i < argCount; i++) {
                                axi = axiList[i % 2];
                                arguments[positionArgOffset + i] += -that._camera.Position[axi] + that._canvasCenter[axi] * scale;
                            }
                        }

                        return replacee.apply(this, arguments);
                    };
                };
                return Camera2dCanvasContextBuilder;
            })();
            _.Camera2dCanvasContextBuilder = Camera2dCanvasContextBuilder;
        })(Rendering._ || (Rendering._ = {}));
        var _ = Rendering._;
    })(EndGate.Rendering || (EndGate.Rendering = {}));
    var Rendering = EndGate.Rendering;
})(EndGate || (EndGate = {}));
var EndGate;
(function (EndGate) {
    /// <reference path="Camera2d.ts" />
    /// <reference path="../Renderer2d.ts" />
    /// <reference path="../../Assets/Sizes/Size2d.ts" />
    /// <reference path="Camera2dCanvasContextBuilder.ts" />
    (function (Rendering) {
        /**
        * Defines a camera rendering object that when used in conjunction with a Camera2d draws all objects in a camera relative position.
        */
        var Camera2dRenderer = (function (_super) {
            __extends(Camera2dRenderer, _super);
            /**
            * Creates a new instance of the Camera2dRenderer.
            * @param renderOnto The canvas to render onto.
            * @param camera The camera that ultimately decides what is drawn to the renderOnto canvas.
            */
            function Camera2dRenderer(renderOnto, camera) {
                _super.call(this, renderOnto);

                this._camera = camera;
                this._contextBuilder = new Rendering._.Camera2dCanvasContextBuilder(this._camera);

                this.OnRendererSizeChange.Bind(this._contextBuilder._UpdateCanvasCenter);
                this._contextBuilder._UpdateCanvasCenter(new EndGate.Size2d(renderOnto.width, renderOnto.height));
                this._BufferContext = this._contextBuilder.Build(this._BufferContext);
            }
            /**
            * Renders the provided renderables onto the renderOnto canvas.  Returns the canvas that was rendered onto.
            * @param renderables Array of items that are to be rendered.
            */
            Camera2dRenderer.prototype.Render = function (renderables) {
                var context, inverseScale = this._camera._GetInverseDistanceScale();

                this._BufferContext.save();
                this._BufferContext.scale(inverseScale, inverseScale);

                context = _super.prototype.Render.call(this, this.GetOnScreenRenderables(renderables));

                this._BufferContext.restore();

                return context;
            };

            Camera2dRenderer.prototype._ClearBuffer = function () {
                var cameraScale = this._camera._GetDistanceScale();
                (this._BufferContext).unModifiedClearRect(0, 0, this._BufferCanvas.width * cameraScale, this._BufferCanvas.height * cameraScale);
            };

            Camera2dRenderer.prototype.GetOnScreenRenderables = function (allRenderables) {
                var onscreen = [], scale = this._camera._GetDistanceScale(), unscale = 1 / scale;

                // Scale camera size to our zoom level
                this._camera.Scale(scale, scale);

                for (var i = 0; i < allRenderables.length; i++) {
                    if (allRenderables[i].Visible && this._camera.Intersects(allRenderables[i].GetDrawBounds())) {
                        onscreen.push(allRenderables[i]);
                    }
                }

                this._camera.Scale(unscale, unscale);

                return onscreen;
            };
            return Camera2dRenderer;
        })(Rendering.Renderer2d);
        Rendering.Camera2dRenderer = Camera2dRenderer;
    })(EndGate.Rendering || (EndGate.Rendering = {}));
    var Rendering = EndGate.Rendering;
})(EndGate || (EndGate = {}));
var EndGate;
(function (EndGate) {
    /// <reference path="../Interfaces/IDisposable.ts" />
    /// <reference path="../Interfaces/ITyped.ts" />
    /// <reference path="../GameTime.ts" />
    /// <reference path="../Graphics/Graphic2d.ts" />
    /// <reference path="../Assets/Sizes/Size2d.ts" />
    /// <reference path="../Assets/Vectors/Vector2d.ts" />
    /// <reference path="Camera/Camera2d.ts" />
    /// <reference path="IRenderer.ts" />
    /// <reference path="Camera/Camera2dRenderer.ts" />
    (function (Rendering) {
        /**
        * Defines a scene object that is used to maintain a list of renderable objects that are rendered onto a joint game area.
        */
        var Scene2d = (function () {
            function Scene2d(onDraw, drawArea) {
                if (typeof onDraw === "undefined") { onDraw = function (_) {
                }; }
                this._actors = [];

                if (typeof drawArea === "undefined") {
                    drawArea = this.CreateDefaultDrawArea();
                }

                this._onDraw = onDraw;

                this.ApplyStyles(drawArea);

                this._drawArea = drawArea;
                this._camera = new Rendering.Camera2d(new EndGate.Vector2d(this._drawArea.width / 2, this._drawArea.height / 2), new EndGate.Size2d(this._drawArea.width, this._drawArea.height));
                this._renderer = new Rendering.Camera2dRenderer(this._drawArea, this._camera);
                this._disposed = false;
            }
            Object.defineProperty(Scene2d.prototype, "DrawArea", {
                get: /**
                * Gets the canvas that the Scene2d uses as its game area.
                */
                function () {
                    return this._drawArea;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Scene2d.prototype, "Camera", {
                get: /**
                * Gets the game camera.
                */
                function () {
                    return this._camera;
                },
                enumerable: true,
                configurable: true
            });

            /**
            * Adds an actor to the scene.  All actors added to the scene have their Draw function called automatically.
            * @param actor The graphic to add to the scene.
            */
            Scene2d.prototype.Add = function (actor) {
                var _this = this;
                actor.OnDisposed.Bind(function (graphic) {
                    _this.Remove(graphic);
                });

                this._actors.push(actor);
            };

            /**
            * Removes an actor from the scene.  The actor will no longer have its Draw called.
            * @param actor The graphic to remove from the scene.
            */
            Scene2d.prototype.Remove = function (actor) {
                for (var i = 0; i < this._actors.length; i++) {
                    if (this._actors[i] === actor) {
                        this._actors.splice(i, 1);
                        return;
                    }
                }
            };

            /**
            * Draws all actors within the Scene and triggers the Scene2d's onDraw callback.
            */
            Scene2d.prototype.Draw = function () {
                this._onDraw(this._renderer.Render(this._actors));
            };

            /**
            * Destroys the game canvas and clears the Scene2d's actors.
            */
            Scene2d.prototype.Dispose = function () {
                if (!this._disposed) {
                    this._disposed = true;
                    this._actors = [];
                    this._renderer.Dispose();
                } else {
                    throw new Error("Scene2d cannot be disposed more than once");
                }
            };

            Scene2d.prototype.ApplyStyles = function (drawArea) {
                drawArea.style.position = "absolute";
                drawArea.style.zIndex = "2";
                drawArea.parentElement.style.position = "relative";
            };

            Scene2d.prototype.CreateDefaultDrawArea = function () {
                var drawArea = document.createElement("canvas"), body = document.getElementsByTagName('body')[0];

                drawArea.width = window.innerWidth;
                drawArea.height = window.innerHeight;

                body.appendChild(drawArea);
                body.style.margin = "0px";
                body.style.padding = "0px";

                return drawArea;
            };
            return Scene2d;
        })();
        Rendering.Scene2d = Scene2d;
    })(EndGate.Rendering || (EndGate.Rendering = {}));
    var Rendering = EndGate.Rendering;
})(EndGate || (EndGate = {}));
var EndGate;
(function (EndGate) {
    (function (Input) {
        (function (_) {
            var MouseButton = (function () {
                function MouseButton() {
                }
                MouseButton.Left = "Left";
                MouseButton.Middle = "Middle";
                MouseButton.Right = "Right";
                return MouseButton;
            })();
            _.MouseButton = MouseButton;
        })(Input._ || (Input._ = {}));
        var _ = Input._;
    })(EndGate.Input || (EndGate.Input = {}));
    var Input = EndGate.Input;
})(EndGate || (EndGate = {}));
var EndGate;
(function (EndGate) {
    /// <reference path="../../Assets/Vectors/Vector2d.ts" />
    /// <reference path="../../Utilities/EventHandler1.ts" />
    /// <reference path="MouseButton.ts" />
    /// <reference path="IMouseEvent.ts" />
    /// <reference path="IMouseClickEvent.ts" />
    /// <reference path="IMouseScrollEvent.ts" />
    (function (Input) {
        /**
        * Defines a handler that will monitor mouse events over a specified area and will execute appropriate functions based on the events.
        */
        var MouseHandler = (function () {
            /**
            * Creates a new instance of the MouseHandler object.
            * @param target The object to monitor mouse events for.
            */
            function MouseHandler(target) {
                var _this = this;
                this._target = target;

                this._onClick = new EndGate.EventHandler1();
                this._onDoubleClick = new EndGate.EventHandler1();
                this._onDown = new EndGate.EventHandler1();
                this._onUp = new EndGate.EventHandler1();
                this._onMove = new EndGate.EventHandler1();
                this._onScroll = new EndGate.EventHandler1();

                // Generic flags to check mouse state
                this._leftIsDown = false;
                this._middleIsDown = false;
                this._rightIsDown = false;

                this.Wire();

                this.OnDown.Bind(function (e) {
                    _this._isDown = true;
                    _this[e.Button + "IsDown"] = true;
                });

                this.OnUp.Bind(function (e) {
                    _this._isDown = false;
                    _this[e.Button + "IsDown"] = false;
                });
            }
            Object.defineProperty(MouseHandler.prototype, "LeftIsDown", {
                get: /**
                * Indicates if the left mouse button is down
                */
                function () {
                    return this._leftIsDown;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(MouseHandler.prototype, "MiddleIsDown", {
                get: /**
                * Indicates if the middle mouse button is down
                */
                function () {
                    return this._middleIsDown;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(MouseHandler.prototype, "RightIsDown", {
                get: /**
                * Indicates if the right mouse button is down
                */
                function () {
                    return this._rightIsDown;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(MouseHandler.prototype, "IsDown", {
                get: /**
                * Indicates if any mouse button is down.
                */
                function () {
                    return this._isDown;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(MouseHandler.prototype, "OnClick", {
                get: /**
                * Gets an event that is triggered when a mouse click occurs.  Functions can be bound or unbound to this event to be executed when the event triggers.
                */
                function () {
                    return this._onClick;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(MouseHandler.prototype, "OnDoubleClick", {
                get: /**
                * Gets an event that is triggered when a mouse double click occurs.  Functions can be bound or unbound to this event to be executed when the event triggers.
                */
                function () {
                    return this._onDoubleClick;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(MouseHandler.prototype, "OnDown", {
                get: /**
                * Gets an event that is triggered when a mouse down event occurs.  Functions can be bound or unbound to this event to be executed when the event triggers.
                */
                function () {
                    return this._onDown;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(MouseHandler.prototype, "OnUp", {
                get: /**
                * Gets an event that is triggered when a mouse up event occurs.  Functions can be bound or unbound to this event to be executed when the event triggers.
                */
                function () {
                    return this._onUp;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(MouseHandler.prototype, "OnMove", {
                get: /**
                * Gets an event that is triggered when a mouse move event occurs.  Functions can be bound or unbound to this event to be executed when the event triggers.
                */
                function () {
                    return this._onMove;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(MouseHandler.prototype, "OnScroll", {
                get: /**
                * Gets an event that is triggered when a mouse scroll event occurs.  Functions can be bound or unbound to this event to be executed when the event triggers.
                */
                function () {
                    return this._onScroll;
                },
                enumerable: true,
                configurable: true
            });

            MouseHandler.prototype.Wire = function () {
                var _this = this;
                this._target.addEventListener("click", this._target.oncontextmenu = this.BuildEvent(this._onClick, this.BuildMouseClickEvent), false);
                this._target.addEventListener("dblclick", this.BuildEvent(this._onDoubleClick, this.BuildMouseClickEvent), false);
                this._target.addEventListener("mousedown", this.BuildEvent(this._onDown, this.BuildMouseClickEvent), false);
                this._target.addEventListener("mouseup", this.BuildEvent(this._onUp, this.BuildMouseClickEvent), false);
                this._target.addEventListener("mousemove", this.BuildEvent(this._onMove, this.BuildMouseEvent), false);

                if ((/MSIE/i.test(navigator.userAgent))) {
                    this._target.addEventListener("wheel", this.BuildEvent(this._onScroll, function (e) {
                        e.wheelDeltaX = -e.deltaX;
                        e.wheelDeltaY = -e.deltaY;
                        return _this.BuildMouseScrollEvent(e);
                    }), false);
                } else if ((/Firefox/i.test(navigator.userAgent))) {
                    this._target.addEventListener("DOMMouseScroll", this.BuildEvent(this._onScroll, function (e) {
                        e.wheelDeltaX = e.axis === 1 ? -e.detail : 0;
                        e.wheelDeltaY = e.axis === 2 ? -e.detail : 0;
                        return _this.BuildMouseScrollEvent(e);
                    }), false);
                } else {
                    this._target.addEventListener("mousewheel", this.BuildEvent(this._onScroll, this.BuildMouseScrollEvent), false);
                }
            };

            MouseHandler.prototype.BuildEvent = function (eventHandler, mouseEventBuilder, returnValue) {
                if (typeof returnValue === "undefined") { returnValue = false; }
                var _this = this;
                return function (e) {
                    if (eventHandler.HasBindings()) {
                        eventHandler.Trigger(mouseEventBuilder.call(_this, e));
                        e.preventDefault();
                    }

                    return returnValue;
                };
            };

            MouseHandler.prototype.BuildMouseScrollEvent = function (event) {
                return {
                    Position: this.GetMousePosition(event),
                    Direction: this.GetMouseScrollDierction(event)
                };
            };

            MouseHandler.prototype.BuildMouseEvent = function (event) {
                return {
                    Position: this.GetMousePosition(event)
                };
            };

            MouseHandler.prototype.BuildMouseClickEvent = function (event) {
                return {
                    Position: this.GetMousePosition(event),
                    Button: this.GetMouseButton(event)
                };
            };

            MouseHandler.prototype.GetMousePosition = function (event) {
                return new EndGate.Vector2d(event.offsetX ? (event.offsetX) : event.pageX - this._target.offsetLeft, event.offsetY ? (event.offsetY) : event.pageY - this._target.offsetTop);
            };

            MouseHandler.prototype.GetMouseButton = function (event) {
                if (event.which) {
                    return MouseHandler.MouseButtonArray[event.which];
                }

                return Input._.MouseButton.Right;
            };

            MouseHandler.prototype.GetMouseScrollDierction = function (event) {
                return new EndGate.Vector2d(-Math.max(-1, Math.min(1, event.wheelDeltaX)), -Math.max(-1, Math.min(1, event.wheelDeltaY)));
            };
            MouseHandler.MouseButtonArray = [null, Input._.MouseButton.Left, Input._.MouseButton.Middle, Input._.MouseButton.Right];
            return MouseHandler;
        })();
        Input.MouseHandler = MouseHandler;
    })(EndGate.Input || (EndGate.Input = {}));
    var Input = EndGate.Input;
})(EndGate || (EndGate = {}));
/// <reference path="../Interfaces/IDisposable.ts" />
/// <reference path="../Interfaces/ITyped.ts" />
var EndGate;
(function (EndGate) {
    /**
    * Defines an event handler object that can maintain bound functions and trigger them on demand.
    */
    var EventHandler = (function () {
        /**
        * Creates a new instance of the EventHandler object.
        */
        function EventHandler() {
            this._type = "Event";
            this._actions = [];
            this._hasBindings = false;
        }
        /**
        * Binds the provided action to the EventHandler.  Trigger will execute all bound functions.
        * @param action Function to execute on EventHandler Trigger.
        */
        EventHandler.prototype.Bind = function (action) {
            this._actions.push(action);
            this._hasBindings = true;
        };

        /**
        * Unbinds the provided action from the EventHandler.
        * @param action Function to unbind.  The action will no longer be executed when the EventHandler gets Triggered.
        */
        EventHandler.prototype.Unbind = function (action) {
            var foo = this._actions[i];

            for (var i = 0; i < this._actions.length; i++) {
                if (this._actions[i] === action) {
                    this._actions.splice(i, 1);

                    this._hasBindings = this._actions.length > 0;
                    return;
                }
            }
        };

        /**
        * Determines if the EventHandler has active bindings.
        */
        EventHandler.prototype.HasBindings = function () {
            return this._hasBindings;
        };

        /**
        * Executes all bound functions and passes the provided args to each.
        */
        EventHandler.prototype.Trigger = function () {
            for (var i = 0; i < this._actions.length; i++) {
                this._actions[i]();
            }
        };
        return EventHandler;
    })();
    EndGate.EventHandler = EventHandler;
})(EndGate || (EndGate = {}));
var EndGate;
(function (EndGate) {
    (function (_) {
        (function (Utilities) {
            var NoopTripInvoker = (function () {
                function NoopTripInvoker(action, tripped) {
                    if (typeof tripped === "undefined") { tripped = false; }
                    this._invoker = NoopTripInvoker._noop;
                    this._action = action;

                    if (tripped) {
                        this.Trip();
                    }
                }
                NoopTripInvoker.prototype.Invoke = function () {
                    var args = [];
                    for (var _i = 0; _i < (arguments.length - 0); _i++) {
                        args[_i] = arguments[_i + 0];
                    }
                    this._invoker.apply(this, args);
                };

                NoopTripInvoker.prototype.InvokeOnce = function () {
                    var args = [];
                    for (var _i = 0; _i < (arguments.length - 0); _i++) {
                        args[_i] = arguments[_i + 0];
                    }
                    this._invoker.apply(this, args);
                    this.Reset();
                };

                NoopTripInvoker.prototype.Trip = function () {
                    this._invoker = this._action;
                };

                NoopTripInvoker.prototype.Reset = function () {
                    this._invoker = NoopTripInvoker._noop;
                };
                NoopTripInvoker._noop = function () {
                };
                return NoopTripInvoker;
            })();
            Utilities.NoopTripInvoker = NoopTripInvoker;
        })(_.Utilities || (_.Utilities = {}));
        var Utilities = _.Utilities;
    })(EndGate._ || (EndGate._ = {}));
    var _ = EndGate._;
})(EndGate || (EndGate = {}));
var EndGate;
(function (EndGate) {
    (function (Input) {
        /// <reference path="KeyboardCommand.ts" />
        (function (Assets) {
            /**
            * Defines an object that is used to represent a keyboard modifier state to determine if Ctrl, Alt, or Shift is being pressed.
            */
            var KeyboardModifiers = (function () {
                /**
                * Creates a new instance of the KeyboardModifiers object.
                * @param ctrl The initial value of the Ctrl component.
                * @param alt The initial value of the Alt component.
                * @param shift The initial value of the Shift component.
                */
                function KeyboardModifiers(ctrl, alt, shift) {
                    this.Ctrl = ctrl;
                    this.Alt = alt;
                    this.Shift = shift;
                }
                /**
                * Determines whether this KeyboardModifiers object has the same ctrl, alt, and shift states as the provided KeyboardModifiers.
                * @param modifier The KeyboardModifiers to compare the current modifiers to.
                */
                KeyboardModifiers.prototype.Equivalent = function (modifier) {
                    return this.Ctrl === modifier.Ctrl && this.Alt === modifier.Alt && this.Shift === modifier.Shift;
                };

                KeyboardModifiers.BuildFromCommandString = /**
                * Builds a KeyboardModifiers object to represent the state of an expected keyCommand
                * @param keyCommand The command to analyze.
                */
                function (keyCommand) {
                    var ctrl = (keyCommand.toLowerCase().indexOf("ctrl+") >= 0) ? true : false, alt = (keyCommand.toLowerCase().indexOf("alt+") >= 0) ? true : false, shift = (keyCommand.toLowerCase().indexOf("shift+") >= 0) ? true : false;

                    return new KeyboardModifiers(ctrl, alt, shift);
                };
                return KeyboardModifiers;
            })();
            Assets.KeyboardModifiers = KeyboardModifiers;
        })(Input.Assets || (Input.Assets = {}));
        var Assets = Input.Assets;
    })(EndGate.Input || (EndGate.Input = {}));
    var Input = EndGate.Input;
})(EndGate || (EndGate = {}));
var EndGate;
(function (EndGate) {
    /// <reference path="KeyboardModifiers.ts" />
    /// <reference path="KeyboardCommand.ts" />
    (function (Input) {
        var shiftValues = {
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
        }, specialKeys = {
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
        var KeyboardCommandEvent = (function () {
            /**
            * Creates a new instance of the KeyboardCommandEvent object.
            * @param keyEvent The raw key event from the DOM.
            */
            function KeyboardCommandEvent(keyEvent) {
                var code, character;

                this.Modifiers = new Input.Assets.KeyboardModifiers(keyEvent.ctrlKey, keyEvent.altKey, keyEvent.shiftKey);

                if (keyEvent.keyCode) {
                    code = keyEvent.keyCode;
                } else if (keyEvent.which) {
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
            KeyboardCommandEvent.prototype.Matches = function (command) {
                return this.Key.toLowerCase() === command.Key.toLowerCase() && command.Modifiers.Equivalent(this.Modifiers);
            };
            return KeyboardCommandEvent;
        })();
        Input.KeyboardCommandEvent = KeyboardCommandEvent;
    })(EndGate.Input || (EndGate.Input = {}));
    var Input = EndGate.Input;
})(EndGate || (EndGate = {}));
var EndGate;
(function (EndGate) {
    (function (Input) {
        /// <reference path="KeyboardCommand.ts" />
        /// <reference path="KeyboardCommandEvent.ts" />
        (function (_) {
            var KeyboardCommandHelper = (function () {
                function KeyboardCommandHelper() {
                }
                KeyboardCommandHelper.ParseKey = function (command) {
                    var arr = command.split("+");

                    if (arr.length > 1) {
                        return arr[arr.length - 1];
                    }

                    return arr[0];
                };
                return KeyboardCommandHelper;
            })();
            _.KeyboardCommandHelper = KeyboardCommandHelper;
        })(Input._ || (Input._ = {}));
        var _ = Input._;
    })(EndGate.Input || (EndGate.Input = {}));
    var Input = EndGate.Input;
})(EndGate || (EndGate = {}));
var EndGate;
(function (EndGate) {
    (function (Input) {
        /// <reference path="../../Interfaces/IDisposable.ts" />
        /// <reference path="../../Utilities/EventHandler.ts" />
        /// <reference path="../../Utilities/NoopTripInvoker.ts" />
        /// <reference path="KeyboardCommandHelper.ts" />
        /// <reference path="KeyboardModifiers.ts" />
        (function (Assets) {
            /**
            * Defines a class that is used to represent a keyboard command.
            */
            var KeyboardCommand = (function () {
                /**
                * Creates a new instance of the KeyboardCommand object.
                * @param command Initial command required to trigger the action function.
                * @param action Initial action to be triggered when the command is executed..
                */
                function KeyboardCommand(command, action) {
                    var _this = this;
                    this.Action = action;
                    this.Modifiers = Input.Assets.KeyboardModifiers.BuildFromCommandString(command);
                    this.Key = Input._.KeyboardCommandHelper.ParseKey(command);

                    this._onDisposed = new EndGate.EventHandler();
                    this._onDisposeInvoker = new EndGate._.Utilities.NoopTripInvoker(function () {
                        _this._onDisposed.Trigger();
                    }, true);
                }
                Object.defineProperty(KeyboardCommand.prototype, "OnDispose", {
                    get: /**
                    * Gets an event that is triggered when a KeyboardCommand has been disposed.  If this KeyboardCommand is used with a KeyboardHandler it will no longer trigger the Action function.  Functions can be bound or unbound to this event to be executed when the event triggers.
                    */
                    function () {
                        return this._onDisposed;
                    },
                    enumerable: true,
                    configurable: true
                });

                /**
                * Triggers the OnDisposed event.  If this KeyboardCommand is used with a KeyboardHandler it will no longer trigger the Action function.
                */
                KeyboardCommand.prototype.Dispose = function () {
                    this._onDisposeInvoker.InvokeOnce();
                };
                return KeyboardCommand;
            })();
            Assets.KeyboardCommand = KeyboardCommand;
        })(Input.Assets || (Input.Assets = {}));
        var Assets = Input.Assets;
    })(EndGate.Input || (EndGate.Input = {}));
    var Input = EndGate.Input;
})(EndGate || (EndGate = {}));
var EndGate;
(function (EndGate) {
    /// <reference path="KeyboardCommand.ts" />
    /// <reference path="KeyboardCommandEvent.ts" />
    /// <reference path="../../Utilities/EventHandler1.ts" />
    (function (Input) {
        /**
        * Defines a handler that will check for keyboard commands and execute appropriate functions.
        */
        var KeyboardHandler = (function () {
            /**
            * Creates a new instance of the KeyboardHandler object.
            */
            function KeyboardHandler() {
                this._onPressCommands = ({});
                this._onDownCommands = ({});
                this._onUpCommands = ({});

                this._onKeyPress = new EndGate.EventHandler1();
                this._onKeyDown = new EndGate.EventHandler1();
                this._onKeyUp = new EndGate.EventHandler1();

                this.Wire();
            }
            Object.defineProperty(KeyboardHandler.prototype, "OnKeyPress", {
                get: /**
                * Gets an event that is triggered when any key press occurs.  Functions can be bound or unbound to this event to be executed when the event triggers.
                */
                function () {
                    return this._onKeyPress;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(KeyboardHandler.prototype, "OnKeyDown", {
                get: /**
                *Gets an event that is triggered when any key goes down.  Functions can be bound or unbound to this event to be executed when the event triggers.
                */
                function () {
                    return this._onKeyDown;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(KeyboardHandler.prototype, "OnKeyUp", {
                get: /**
                * Gets an event that is triggered when any key comes up.  Functions can be bound or unbound to this event to be executed when the event triggers.
                */
                function () {
                    return this._onKeyUp;
                },
                enumerable: true,
                configurable: true
            });

            /**
            * Binds function to be called when the keyCommand is pressed.  To unbind the function, dispose of the returned KeyboardCommand.
            * @param keyCommand The command string required to execute the action.
            * @param action The action to execute when the keyCommand has been pressed.
            */
            KeyboardHandler.prototype.OnCommandPress = function (keyCommand, action) {
                return this.UpdateCache(keyCommand, action, this._onPressCommands);
            };

            /**
            * Binds function to be called when the keyCommand goes down.  To unbind the function, dispose of the returned KeyboardCommand.
            * @param keyCommand The command string required to execute the action.
            * @param action The action to execute when the keyCommand has is down.
            */
            KeyboardHandler.prototype.OnCommandDown = function (keyCommand, action) {
                return this.UpdateCache(keyCommand, action, this._onDownCommands);
            };

            /**
            * Binds function to be called when the keyCommand comes up.  To unbind the function, dispose of the returned KeyboardCommand.
            * @param keyCommand The command string required to execute the action.
            * @param action The action to execute when the keyCommand comes up.
            */
            KeyboardHandler.prototype.OnCommandUp = function (keyCommand, action) {
                return this.UpdateCache(keyCommand, action, this._onUpCommands);
            };

            KeyboardHandler.prototype.UpdateCache = function (keyCommand, action, store) {
                var command = new Input.Assets.KeyboardCommand(keyCommand, action), commandId = KeyboardHandler._keyboardCommandIds++;

                command.OnDispose.Bind(function () {
                    delete store[commandId];
                });

                store[commandId] = command;

                return command;
            };

            KeyboardHandler.prototype.Wire = function () {
                document.addEventListener("keypress", this.BuildKeyEvent(this._onPressCommands, this.OnKeyPress), false);

                document.addEventListener("keydown", this.BuildKeyEvent(this._onDownCommands, this.OnKeyDown), false);

                document.addEventListener("keyup", this.BuildKeyEvent(this._onUpCommands, this.OnKeyUp), false);
            };

            KeyboardHandler.prototype.FocusingTextArea = function (ke) {
                var element;

                if (ke.target) {
                    element = ke.target;
                } else if (ke.srcElement) {
                    element = ke.srcElement;
                }

                if (element.nodeType === 3) {
                    element = element.parentNode;
                }

                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    return true;
                }

                return false;
            };

            KeyboardHandler.prototype.BuildKeyEvent = function (store, eventHandler) {
                var _this = this;
                return function (ke) {
                    var keyboardCommandEvent, propogate = true;

                    if (_this.FocusingTextArea(ke)) {
                        return;
                    }

                    keyboardCommandEvent = new Input.KeyboardCommandEvent(ke);

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
            };
            KeyboardHandler._keyboardCommandIds = 0;
            return KeyboardHandler;
        })();
        Input.KeyboardHandler = KeyboardHandler;
    })(EndGate.Input || (EndGate.Input = {}));
    var Input = EndGate.Input;
})(EndGate || (EndGate = {}));
var EndGate;
(function (EndGate) {
    /// <reference path="Mouse/MouseHandler.ts" />
    /// <reference path="Keyboard/KeyboardHandler.ts" />
    (function (Input) {
        /**
        * Defines an all around Input handler which manages mouse and keyboard events.
        */
        var InputManager = (function () {
            /**
            * Creates a new instance of the InputManager object.
            * @param target The object through which mouse events will be monitored on.
            */
            function InputManager(target) {
                this.Mouse = new Input.MouseHandler(target);
                this.Keyboard = new Input.KeyboardHandler();
            }
            return InputManager;
        })();
        Input.InputManager = InputManager;
    })(EndGate.Input || (EndGate.Input = {}));
    var Input = EndGate.Input;
})(EndGate || (EndGate = {}));
var EndGate;
(function (EndGate) {
    /// <reference path="../Interfaces/ICloneable.ts" />
    (function (Sound) {
        /**
        * Defines a set of settings that are used to play AudioClip's a custom way.
        */
        var AudioSettings = (function () {
            function AudioSettings(repeat, volume, autoplay, preload) {
                if (typeof repeat === "undefined") { repeat = false; }
                if (typeof volume === "undefined") { volume = 100; }
                if (typeof autoplay === "undefined") { autoplay = false; }
                if (typeof preload === "undefined") { preload = "auto"; }
                this.Repeat = repeat;
                this.Volume = volume;
                this.AutoPlay = autoplay;
                this.Preload = preload;
            }
            /**
            * Returns a new AudioSettings object that is identical to the current AudioSettings object.
            */
            AudioSettings.prototype.Clone = function () {
                return new AudioSettings(this.Repeat, this.Volume, this.AutoPlay, this.Preload);
            };
            AudioSettings.Default = new AudioSettings();
            return AudioSettings;
        })();
        Sound.AudioSettings = AudioSettings;
    })(EndGate.Sound || (EndGate.Sound = {}));
    var Sound = EndGate.Sound;
})(EndGate || (EndGate = {}));
var EndGate;
(function (EndGate) {
    /// <reference path="../Utilities/EventHandler1.ts" />
    /// <reference path="AudioSettings.ts" />
    (function (Sound) {
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
        var AudioClip = (function () {
            function AudioClip(source, settings) {
                if (typeof settings === "undefined") { settings = Sound.AudioSettings.Default; }
                this._settings = settings.Clone();
                this._audio = document.createElement("audio");
                this.SetAudioSource(source);
                this.ApplySettings();

                this._onComplete = new EndGate.EventHandler1();
            }
            Object.defineProperty(AudioClip.prototype, "OnComplete", {
                get: /**
                * Gets an event that is triggered when the audio clip has completed, will not trigger if the audio clip is repeating.  Functions can be bound or unbound to this event to be executed when the event triggers.
                */
                function () {
                    return this._onComplete;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(AudioClip.prototype, "Volume", {
                get: /**
                * Gets or sets the audio clip volume.
                */
                function () {
                    return this._settings.Volume;
                },
                set: function (percent) {
                    this._settings.Volume = percent;
                    this._audio.volume = Math.max(Math.min(percent / 100, 1), 0);
                },
                enumerable: true,
                configurable: true
            });

            /**
            * Determines if the AudioClip is currently playing.
            */
            AudioClip.prototype.IsPlaying = function () {
                return !this._audio.paused;
            };

            /**
            * Determines if the AudioClip has completed.
            */
            AudioClip.prototype.IsComplete = function () {
                return this._audio.ended;
            };

            /**
            * Plays the current audio clip.
            */
            AudioClip.prototype.Play = function () {
                var _this = this;
                if (this._audio.readyState === 0) {
                    this._audio.addEventListener("canplay", function () {
                        _this._audio.play();
                    }, true);
                } else {
                    this._audio.play();
                }
            };

            /**
            * Pauses the current audio clip.
            */
            AudioClip.prototype.Pause = function () {
                this._audio.pause();
            };

            /**
            * Seeks the audio clip to the provided time.
            * @param time The time to seek to.
            */
            AudioClip.prototype.Seek = function (time) {
                var _this = this;
                if (this._audio.readyState === 0) {
                    this._audio.addEventListener("canplay", function () {
                        _this._audio.currentTime = time;
                    }, true);
                } else {
                    this._audio.currentTime = time;
                }
            };

            /**
            * Stops the current audio clip and seeks back to time 0.
            */
            AudioClip.prototype.Stop = function () {
                this.Seek(0);
                this._audio.pause();
            };

            AudioClip.prototype.SetAudioSource = function (source) {
                var sourceHolder, sourceType;

                if (!(source instanceof Array)) {
                    source = [source];
                }

                for (var i = 0; i < source.length; i++) {
                    sourceHolder = document.createElement("source");
                    sourceHolder.src = source[i];

                    sourceType = supportedAudioTypes[source[i].split('.').pop()];

                    if (typeof sourceType !== "undefined") {
                        sourceHolder.type = sourceType;
                    }

                    this._audio.appendChild(sourceHolder);
                }
            };

            AudioClip.prototype.ApplySettings = function () {
                var _this = this;
                this._audio.loop = this._settings.Repeat;
                this._audio.autoplay = this._settings.AutoPlay;
                this._audio.preload = this._settings.Preload;
                this.Volume = this._settings.Volume;

                this._audio.addEventListener("ended", function (e) {
                    _this.OnComplete.Trigger(e);
                }, true);
            };
            return AudioClip;
        })();
        Sound.AudioClip = AudioClip;
    })(EndGate.Sound || (EndGate.Sound = {}));
    var Sound = EndGate.Sound;
})(EndGate || (EndGate = {}));
var EndGate;
(function (EndGate) {
    /// <reference path="AudioClip.ts" />
    /// <reference path="AudioSettings.ts" />
    (function (Sound) {
        /**
        * Defines an AudioPlayer that is mapped to a specific source.  Ultimately used to play the same sound simultaneously.
        */
        var AudioPlayer = (function () {
            function AudioPlayer(source) {
                this._source = source;
            }
            AudioPlayer.prototype.Play = function (settings) {
                if (typeof settings === "undefined") { settings = Sound.AudioSettings.Default; }
                var clip = new Sound.AudioClip(this._source, settings);

                clip.Play();

                return clip;
            };
            return AudioPlayer;
        })();
        Sound.AudioPlayer = AudioPlayer;
    })(EndGate.Sound || (EndGate.Sound = {}));
    var Sound = EndGate.Sound;
})(EndGate || (EndGate = {}));
var EndGate;
(function (EndGate) {
    /// <reference path="AudioPlayer.ts" />
    /// <reference path="AudioSettings.ts" />
    (function (Sound) {
        /**
        * Defines an audio manager that is used to preload AudioClip's that can be played at any time.
        */
        var AudioManager = (function () {
            /**
            * Creates a new instance of the AudioManager object.
            */
            function AudioManager() {
                this._audioPlayers = {};
            }
            AudioManager.prototype.Load = function (name, src) {
                this._audioPlayers[name] = new Sound.AudioPlayer(src);

                return this._audioPlayers[name];
            };

            /**
            * Unload player that is mapped to the provided name.
            * @param name The mapped name of the AudioPlayer to unload.
            */
            AudioManager.prototype.Unload = function (name) {
                var player = this._audioPlayers[name];

                delete this._audioPlayers[name];

                return player;
            };

            AudioManager.prototype.Play = function (name, settings) {
                if (typeof settings === "undefined") { settings = Sound.AudioSettings.Default; }
                return this._audioPlayers[name].Play(settings);
            };

            /**
            * Retrieves a loaded audio player under the provided name.
            * @param name The mapped name of the AudioPlayer to retrieve.
            */
            AudioManager.prototype.GetAudioPlayer = function (name) {
                return this._audioPlayers[name];
            };
            return AudioManager;
        })();
        Sound.AudioManager = AudioManager;
    })(EndGate.Sound || (EndGate.Sound = {}));
    var Sound = EndGate.Sound;
})(EndGate || (EndGate = {}));
var EndGate;
(function (EndGate) {
    /// <reference path="../../Rendering/Camera/Camera2d.ts" />
    /// <reference path="../../Rendering/Scene2d.ts" />
    /// <reference path="../../Rendering/Camera/Camera2dRenderer.ts" />
    /// <reference path="../../Rendering/IRenderer.ts" />
    /// <reference path="../../Graphics/Graphic2d.ts" />
    (function (Map) {
        /**
        * Defines a SceneryHandler which specializes in drawing large background type layers to depict scenery.
        */
        var SceneryHandler = (function () {
            /**
            * Creates a new instance of the SceneryHandler object.
            * @param scene The primary scene that this SceneryHandler will play behind.
            */
            function SceneryHandler(scene) {
                this._camera = scene.Camera;
                this._layers = [];
                this._sceneryCanvas = this.BuildSceneryCanvas(scene.DrawArea);
                this._renderer = new EndGate.Rendering.Camera2dRenderer(this._sceneryCanvas, this._camera);
                this._disposed = false;
            }
            /**
            * Adds a layer to the scenery.
            * @param layer The layer to add.
            */
            SceneryHandler.prototype.AddLayer = function (layer) {
                this._layers.push(layer);
            };

            /**
            * Removes a layer from the scenery.
            * @param layer The layer to remove.
            */
            SceneryHandler.prototype.RemoveLayer = function (layer) {
                this._layers.splice(this._layers.indexOf(layer), 1);
            };

            /**
            * Draws all layers onto the given context.  If this is used via a MapManager object, Draw will automatically be called.
            */
            SceneryHandler.prototype.Draw = function () {
                this._layers.sort(EndGate.Graphics.Abstractions.Graphic2d._zindexSort);

                this._renderer.Render(this._layers);
            };

            /**
            * Destroys the games map canvas and the Scenery layers.
            */
            SceneryHandler.prototype.Dispose = function () {
                if (!this._disposed) {
                    this._disposed = true;
                    this._layers = [];
                    this._renderer.Dispose();
                } else {
                    throw new Error("Scene2d cannot be disposed more than once");
                }
            };

            SceneryHandler.prototype.BuildSceneryCanvas = function (foreground) {
                var sceneryCanvas = document.createElement("canvas"), baseElement = foreground;

                sceneryCanvas.width = foreground.width;
                sceneryCanvas.height = foreground.height;
                sceneryCanvas.style.position = "absolute";
                sceneryCanvas.style.zIndex = "1";

                foreground.parentElement.insertBefore(sceneryCanvas, foreground);

                return sceneryCanvas;
            };
            return SceneryHandler;
        })();
        Map.SceneryHandler = SceneryHandler;
    })(EndGate.Map || (EndGate.Map = {}));
    var Map = EndGate.Map;
})(EndGate || (EndGate = {}));
var EndGate;
(function (EndGate) {
    /// <reference path="../Rendering/Camera/Camera2d.ts" />
    /// <reference path="Scenery/SceneryHandler.ts" />
    /// <reference path="../Rendering/Scene2d.ts" />
    /// <reference path="../Interfaces/IDisposable.ts" />
    (function (Map) {
        /**
        * Defines a map manager that is used to manage Scenery.  Will eventually be expanded to handle obstacles.
        */
        var MapManager = (function () {
            /**
            * Creates a new instance of the MapManager object.
            * @param scene The Scene2d that is used to draw smaller objects within the game (the foreground scene).
            */
            function MapManager(scene) {
                this.Scenery = new Map.SceneryHandler(scene);
            }
            /**
            * Destroys the games map assets.
            */
            MapManager.prototype.Dispose = function () {
                this.Scenery.Dispose();
            };
            return MapManager;
        })();
        Map.MapManager = MapManager;
    })(EndGate.Map || (EndGate.Map = {}));
    var Map = EndGate.Map;
})(EndGate || (EndGate = {}));
/// <reference path="Interfaces/IDisposable.ts" />
/// <reference path="Interfaces/ITyped.ts" />
/// <reference path="Interfaces/IUpdateable.ts" />
/// <reference path="Rendering/IRenderable.ts" />
/// <reference path="GameRunner.ts" />
/// <reference path="GameConfiguration.ts" />
/// <reference path="Collision/CollisionManager.ts" />
/// <reference path="Rendering/Scene2d.ts" />
/// <reference path="Input/InputManager.ts" />
/// <reference path="Sound/AudioManager.ts" />
/// <reference path="Map/MapManager.ts" />
var EndGate;
(function (EndGate) {
    /**
    * Defines a virtual Game object that is meant to be derived from.  Games contain a multitude of management objects to control every aspect of the game.
    */
    var Game = (function () {
        function Game(gameCanvas) {
            var _this = this;
            this._type = "Game";
            this._gameTime = new EndGate.GameTime();
            this._ID = Game._gameIds++;

            this.Scene = new EndGate.Rendering.Scene2d(function (context) {
                _this.Draw(context);
            }, gameCanvas);

            this.Input = new EndGate.Input.InputManager(this.Scene.DrawArea);
            this.Audio = new EndGate.Sound.AudioManager();
            this.CollisionManager = new EndGate.Collision.CollisionManager();
            this.Configuration = new EndGate.GameConfiguration(GameRunnerInstance.Register(this));
            this.Map = new EndGate.Map.MapManager(this.Scene);
        }
        Game.prototype._PrepareUpdate = function () {
            this._gameTime.Update();

            this.Update(this._gameTime);
            this.CollisionManager.Update(this._gameTime);
        };

        /**
        * Triggered on a regular interval defined by the GameConfiguration.
        * @param gameTime The global game time object.  Used to represent total time running and used to track update interval elapsed speeds.
        */
        Game.prototype.Update = function (gameTime) {
        };

        Game.prototype._PrepareDraw = function () {
            this.Map.Scenery.Draw();
            this.Scene.Draw();
        };

        /**
        * Triggered as fast as possible.  Determined by the current browsers repaint rate.
        */
        Game.prototype.Draw = function (context) {
        };

        /**
        * Removes game canvas and disposes all tracked objects.
        */
        Game.prototype.Dispose = function () {
            this.Scene.Dispose();
            this.Map.Dispose();
            GameRunnerInstance.Unregister(this);
        };
        Game._gameIds = 0;
        return Game;
    })();
    EndGate.Game = Game;
})(EndGate || (EndGate = {}));
var EndGate;
(function (EndGate) {
    (function (MovementControllers) {
        (function (Assets) {
            /**
            * Defines a direction management object that represents directional state.
            */
            var LinearDirections = (function () {
                /**
                * Creates a new instance of the LinearDirection object with all directions= indicators initially set to false.
                */
                function LinearDirections() {
                    this.Left = false;
                    this.Right = false;
                    this.Up = false;
                    this.Down = false;
                }
                return LinearDirections;
            })();
            Assets.LinearDirections = LinearDirections;
        })(MovementControllers.Assets || (MovementControllers.Assets = {}));
        var Assets = MovementControllers.Assets;
    })(EndGate.MovementControllers || (EndGate.MovementControllers = {}));
    var MovementControllers = EndGate.MovementControllers;
})(EndGate || (EndGate = {}));
var EndGate;
(function (EndGate) {
    (function (MovementControllers) {
        /// <reference path="../Assets/Vectors/Vector2d.ts" />
        /// <reference path="../Interfaces/IMoveable.ts" />
        /// <reference path="../Interfaces/IUpdateable.ts" />
        /// <reference path="../GameTime.ts" />
        (function (Abstractions) {
            /**
            * Abstract class that holds moveable objects and synchronizes positions across them.
            */
            var MovementController = (function () {
                /**
                * Should only ever be called by derived classes.
                * @param moveables Moveable objects to synchronize.
                */
                function MovementController(moveables) {
                    this.Position = moveables.length > 0 ? moveables[0].Position : EndGate.Vector2d.Zero;
                    this.Velocity = EndGate.Vector2d.Zero;
                    this.Rotation = 0;
                    this._frozen = false;

                    this._moveables = moveables;
                }
                /**
                * Prevents the MovementController from updating object locations.
                */
                MovementController.prototype.Freeze = function () {
                    this._frozen = true;
                };

                /**
                * Used to re-enable movement within the MovementController.
                */
                MovementController.prototype.Thaw = function () {
                    this._frozen = false;
                };

                /**
                * Determines if the MovementController is moving.  Frozen MovementControllers are not considered moving.
                */
                MovementController.prototype.IsMoving = function () {
                    return !this._frozen && !this.Velocity.IsZero();
                };

                /**
                * Synchronizes the current position with all tracked moveable objects.  MovementController's must be updated in order to move.
                * @param gameTime The current game time object.
                */
                MovementController.prototype.Update = function (gameTime) {
                    for (var i = 0; i < this._moveables.length; i++) {
                        this._moveables[i].Position = this.Position;
                        this._moveables[i].Rotation = this.Rotation;
                    }
                };
                return MovementController;
            })();
            Abstractions.MovementController = MovementController;
        })(MovementControllers.Abstractions || (MovementControllers.Abstractions = {}));
        var Abstractions = MovementControllers.Abstractions;
    })(EndGate.MovementControllers || (EndGate.MovementControllers = {}));
    var MovementControllers = EndGate.MovementControllers;
})(EndGate || (EndGate = {}));
var EndGate;
(function (EndGate) {
    /// <reference path="../Assets/Vectors/Vector2d.ts" />
    /// <reference path="../Interfaces/IMoveable.ts" />
    /// <reference path="../Utilities/NoopTripInvoker.ts" />
    /// <reference path="../Extensions/MathExtensions.ts" />
    /// <reference path="../GameTime.ts" />
    /// <reference path="../Utilities/EventHandler1.ts" />
    /// <reference path="LinearDirections.ts" />
    /// <reference path="IMoveEvent.ts" />
    /// <reference path="MovementController.ts" />
    (function (MovementControllers) {
        /**
        * Defines a LinearMovementController that can move objects Up, Right, Left, Down or a combination.
        */
        var LinearMovementController = (function (_super) {
            __extends(LinearMovementController, _super);
            function LinearMovementController(movables, moveSpeed, rotateWithMovements, multiDirectional) {
                if (typeof rotateWithMovements === "undefined") { rotateWithMovements = true; }
                if (typeof multiDirectional === "undefined") { multiDirectional = true; }
                var _this = this;
                _super.call(this, movables);

                this._moveSpeed = moveSpeed;
                this._moving = new MovementControllers.Assets.LinearDirections();
                this.OnMove = new EndGate.EventHandler1();
                this._rotationUpdater = new EndGate._.Utilities.NoopTripInvoker(function () {
                    _this.UpdateRotation();
                }, rotateWithMovements);

                if (multiDirectional) {
                    this._velocityUpdater = this.UpdateVelocityWithMultiDirection;
                } else {
                    this._velocityUpdater = this.UpdateVelocityNoMultiDirection;
                }
            }
            /**
            * Determines if the movement controller is moving in the provided direction.
            * @param direction The direction to check.
            */
            LinearMovementController.prototype.IsMovingInDirection = function (direction) {
                return this._moving[direction] || false;
            };

            /**
            * Starts moving the movement controller in the specified direction.
            * @param direction The direction to start moving.
            */
            LinearMovementController.prototype.StartMoving = function (direction) {
                this.Move(direction, true);
            };

            /**
            * Stops the movement controller from moving in the specified direction.
            * @param direction The direction to stop moving.
            */
            LinearMovementController.prototype.StopMoving = function (direction) {
                this.Move(direction, false);
            };

            LinearMovementController.prototype.MoveSpeed = function (speed) {
                if (typeof speed !== "undefined") {
                    this._moveSpeed = speed;
                    this._velocityUpdater();
                }

                return this._moveSpeed;
            };

            /**
            * Moves the LinearMovementController in the currently active directions.  MovementController's must be updated in order to move.
            * @param gameTime The current game time object.
            */
            LinearMovementController.prototype.Update = function (gameTime) {
                if (!this._frozen) {
                    this.Position = this.Position.Add(this.Velocity.Multiply(gameTime.Elapsed.Seconds));

                    _super.prototype.Update.call(this, gameTime);
                }
            };

            /**
            * Triggers a move event on the MovementController.
            * @param direction The direction to start or stop moving.
            * @param startMoving Whether the movement is starting or stopping.
            */
            LinearMovementController.prototype.Move = function (direction, startMoving) {
                if (typeof this._moving[direction] !== "undefined") {
                    this._moving[direction] = startMoving;
                    this._velocityUpdater();
                    this._rotationUpdater.Invoke();
                    this.OnMove.Trigger({
                        Direction: direction,
                        StartMoving: startMoving
                    });
                } else {
                    throw new Error(direction + " is an unknown direction.");
                }
            };

            LinearMovementController.prototype.UpdateVelocityNoMultiDirection = function () {
                var velocity = EndGate.Vector2d.Zero;

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
            };

            LinearMovementController.prototype.UpdateVelocityWithMultiDirection = function () {
                var velocity = EndGate.Vector2d.Zero;

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
            };

            LinearMovementController.prototype.UpdateRotation = function () {
                if (!this.Velocity.IsZero()) {
                    this.Rotation = Math.atan2(this.Velocity.Y, this.Velocity.X);
                }
            };
            return LinearMovementController;
        })(MovementControllers.Abstractions.MovementController);
        MovementControllers.LinearMovementController = LinearMovementController;
    })(EndGate.MovementControllers || (EndGate.MovementControllers = {}));
    var MovementControllers = EndGate.MovementControllers;
})(EndGate || (EndGate = {}));
var EndGate;
(function (EndGate) {
    /// <reference path="../Input/Keyboard/KeyboardHandler.ts" />
    /// <reference path="../MovementControllers/LinearDirections.ts" />
    (function (InputControllers) {
        /**
        * Defines a DirectionalInputController that will monitor Up, Right, Left, and Down movement attempts.
        */
        var DirectionalInputController = (function () {
            function DirectionalInputController(keyboard, onMove, upKeys, rightKeys, downKeys, leftKeys) {
                if (typeof upKeys === "undefined") { upKeys = ["w", "Up"]; }
                if (typeof rightKeys === "undefined") { rightKeys = ["d", "Right"]; }
                if (typeof downKeys === "undefined") { downKeys = ["s", "Down"]; }
                if (typeof leftKeys === "undefined") { leftKeys = ["a", "Left"]; }
                this._keyboard = keyboard;
                this._onMove = onMove;
                this._directions = new EndGate.MovementControllers.Assets.LinearDirections();

                this.BindKeys(upKeys, "OnCommandDown", "Up", true);
                this.BindKeys(rightKeys, "OnCommandDown", "Right", true);
                this.BindKeys(downKeys, "OnCommandDown", "Down", true);
                this.BindKeys(leftKeys, "OnCommandDown", "Left", true);
                this.BindKeys(upKeys, "OnCommandUp", "Up", false);
                this.BindKeys(rightKeys, "OnCommandUp", "Right", false);
                this.BindKeys(downKeys, "OnCommandUp", "Down", false);
                this.BindKeys(leftKeys, "OnCommandUp", "Left", false);
            }
            DirectionalInputController.prototype.BindKeys = function (keyList, bindingAction, direction, startMoving) {
                var _this = this;
                for (var i = 0; i < keyList.length; i++) {
                    this._keyboard[bindingAction](keyList[i], function () {
                        if (_this._directions[direction] != startMoving) {
                            _this._directions[direction] = startMoving;
                            _this._onMove(direction, startMoving);
                        }
                    });
                }
            };
            return DirectionalInputController;
        })();
        InputControllers.DirectionalInputController = DirectionalInputController;
    })(EndGate.InputControllers || (EndGate.InputControllers = {}));
    var InputControllers = EndGate.InputControllers;
})(EndGate || (EndGate = {}));
var EndGate;
(function (EndGate) {
    (function (Graphics) {
        (function (Assets) {
            /**
            * Defines valid FontFamilies that can be used to display Text2d's differently.
            */
            (function (FontFamily) {
                FontFamily[FontFamily["Antiqua"] = 0] = "Antiqua";
                FontFamily[FontFamily["Arial"] = 1] = "Arial";
                FontFamily[FontFamily["Avqest"] = 2] = "Avqest";
                FontFamily[FontFamily["Blackletter"] = 3] = "Blackletter";
                FontFamily[FontFamily["Calibri"] = 4] = "Calibri";
                FontFamily[FontFamily["ComicSans"] = 5] = "ComicSans";
                FontFamily[FontFamily["Courier"] = 6] = "Courier";
                FontFamily[FontFamily["Decorative"] = 7] = "Decorative";
                FontFamily[FontFamily["Fraktur"] = 8] = "Fraktur";
                FontFamily[FontFamily["Frosty"] = 9] = "Frosty";
                FontFamily[FontFamily["Garamond"] = 10] = "Garamond";
                FontFamily[FontFamily["Georgia"] = 11] = "Georgia";
                FontFamily[FontFamily["Helvetica"] = 12] = "Helvetica";
                FontFamily[FontFamily["Impact"] = 13] = "Impact";
                FontFamily[FontFamily["Minion"] = 14] = "Minion";
                FontFamily[FontFamily["Modern"] = 15] = "Modern";
                FontFamily[FontFamily["Monospace"] = 16] = "Monospace";
                FontFamily[FontFamily["Palatino"] = 17] = "Palatino";
                FontFamily[FontFamily["Roman"] = 18] = "Roman";
                FontFamily[FontFamily["Script"] = 19] = "Script";
                FontFamily[FontFamily["Swiss"] = 20] = "Swiss";
                FontFamily[FontFamily["TimesNewRoman"] = 21] = "TimesNewRoman";

                FontFamily[FontFamily["Verdana"] = 22] = "Verdana";
            })(Assets.FontFamily || (Assets.FontFamily = {}));
            var FontFamily = Assets.FontFamily;
            ;
        })(Graphics.Assets || (Graphics.Assets = {}));
        var Assets = Graphics.Assets;
    })(EndGate.Graphics || (EndGate.Graphics = {}));
    var Graphics = EndGate.Graphics;
})(EndGate || (EndGate = {}));
var EndGate;
(function (EndGate) {
    (function (Graphics) {
        (function (Assets) {
            /**
            * Defines valid FontVariant's that can be used to change the appearance of Text2d's.
            */
            (function (FontVariant) {
                FontVariant[FontVariant["Normal"] = 0] = "Normal";

                FontVariant[FontVariant["SmallCaps"] = 1] = "SmallCaps";
            })(Assets.FontVariant || (Assets.FontVariant = {}));
            var FontVariant = Assets.FontVariant;
            ;
        })(Graphics.Assets || (Graphics.Assets = {}));
        var Assets = Graphics.Assets;
    })(EndGate.Graphics || (EndGate.Graphics = {}));
    var Graphics = EndGate.Graphics;
})(EndGate || (EndGate = {}));
var EndGate;
(function (EndGate) {
    (function (Graphics) {
        (function (Assets) {
            /**
            * Defines valid FontStyles that can be used to modify the font's style for Text2d's.
            */
            (function (FontStyle) {
                FontStyle[FontStyle["Normal"] = 0] = "Normal";
                FontStyle[FontStyle["Italic"] = 1] = "Italic";

                FontStyle[FontStyle["Oblique"] = 2] = "Oblique";
            })(Assets.FontStyle || (Assets.FontStyle = {}));
            var FontStyle = Assets.FontStyle;
        })(Graphics.Assets || (Graphics.Assets = {}));
        var Assets = Graphics.Assets;
    })(EndGate.Graphics || (EndGate.Graphics = {}));
    var Graphics = EndGate.Graphics;
})(EndGate || (EndGate = {}));
var EndGate;
(function (EndGate) {
    (function (Graphics) {
        /// <reference path="FontFamily.ts" />
        /// <reference path="FontVariant.ts" />
        /// <reference path="FontStyle.ts" />
        (function (Assets) {
            /**
            * Defines a set of font settings that are used to modify the appearance of text that is drawn via Text2d's.
            */
            var FontSettings = (function () {
                /**
                * Creates a new instance of the FontSettings object with the following default values.
                * FontSize: 10px
                * FontFamily: Times New Roman
                */
                function FontSettings() {
                    this._cachedState = {
                        fontSize: "10px",
                        fontFamily: Assets.FontFamily.TimesNewRoman,
                        fontVariant: Assets.FontVariant.Normal,
                        fontWeight: "",
                        fontStyle: Assets.FontStyle.Normal
                    };

                    this._refreshCache = true;
                    this._BuildFont();
                }
                Object.defineProperty(FontSettings.prototype, "FontSize", {
                    get: /**
                    * Gets or sets the current font size.  Values can be things such as 20px.
                    */
                    function () {
                        return this._cachedState["fontSize"];
                    },
                    set: function (size) {
                        this._refreshCache = true;
                        this._cachedState["fontSize"] = size;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(FontSettings.prototype, "FontFamily", {
                    get: /**
                    * Gets or sets the font family.
                    */
                    function () {
                        return this._cachedState["fontFamily"];
                    },
                    set: function (family) {
                        this._refreshCache = true;
                        this._cachedState["fontFamily"] = family;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(FontSettings.prototype, "FontVariant", {
                    get: /**
                    * Gets or sets the font variant.
                    */
                    function () {
                        return this._cachedState["fontVariant"];
                    },
                    set: function (variant) {
                        this._refreshCache = true;
                        this._cachedState["fontVariant"] = variant;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(FontSettings.prototype, "FontWeight", {
                    get: /**
                    * Gets or sets the current font weight.
                    */
                    function () {
                        return this._cachedState["fontWeight"];
                    },
                    set: function (weight) {
                        this._refreshCache = true;
                        this._cachedState["fontWeight"] = weight;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(FontSettings.prototype, "FontStyle", {
                    get: /**
                    * Gets or sets the current font style.
                    */
                    function () {
                        return this._cachedState["fontStyle"];
                    },
                    set: function (style) {
                        this._refreshCache = true;
                        this._cachedState["fontStyle"] = style;
                    },
                    enumerable: true,
                    configurable: true
                });

                FontSettings.prototype._BuildFont = function () {
                    var font;

                    if (this._refreshCache) {
                        font = this._cachedState["fontWeight"] + " " + Assets.FontStyle[this._cachedState["fontStyle"]].replace("Normal", "") + " " + Assets.FontVariant[this._cachedState["fontVariant"]].replace("Normal", "") + " " + this._cachedState["fontSize"];

                        if (this._cachedState["fontFamily"] !== undefined) {
                            font += " " + Assets.FontFamily[this._cachedState["fontFamily"]];
                        }

                        this._cachedFont = font.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
                        this._refreshCache = false;
                    }

                    return this._cachedFont;
                };
                return FontSettings;
            })();
            Assets.FontSettings = FontSettings;
        })(Graphics.Assets || (Graphics.Assets = {}));
        var Assets = Graphics.Assets;
    })(EndGate.Graphics || (EndGate.Graphics = {}));
    var Graphics = EndGate.Graphics;
})(EndGate || (EndGate = {}));
var EndGate;
(function (EndGate) {
    /// <reference path="../../Assets/Vectors/Vector2d.ts" />
    /// <reference path="../Graphic2d.ts" />
    /// <reference path="../../Utilities/NoopTripInvoker.ts" />
    /// <reference path="../../Bounds/BoundingRectangle.ts" />
    /// <reference path="Font/FontSettings.ts" />
    (function (Graphics) {
        /**
        * Defines a drawable text element.
        */
        var Text2d = (function (_super) {
            __extends(Text2d, _super);
            function Text2d(x, y, text, color) {
                if (typeof color === "undefined") { color = "black"; }
                var _this = this;
                _super.call(this, new EndGate.Vector2d(x, y));
                this._type = "Text2d";

                this._text = text;
                this._stroker = new EndGate._.Utilities.NoopTripInvoker(function (context) {
                    context.strokeText(_this._text, 0, 0);
                });

                this._drawBounds = new EndGate.Bounds.BoundingRectangle(this.Position, EndGate.Size2d.One);
                this._recalculateBoundsSize = true;

                this._fontSettings = new Graphics.Assets.FontSettings();
                this.Align = "center";
                this.Baseline = "middle";
                this.Color = color;
            }
            Object.defineProperty(Text2d.prototype, "Align", {
                get: /**
                * Gets or sets the text alignment of the Text2d.  Values can be "start", "end", "left", "center", or "right".
                */
                function () {
                    return this._State.TextAlign;
                },
                set: function (alignment) {
                    this._State.TextAlign = alignment;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Text2d.prototype, "Baseline", {
                get: /**
                * Gets or sets the text baseline of the Text2d.  Values can be "top", "hanging", "middle", "alphabetic", "ideographic", and "bottom".
                */
                function () {
                    return this._State.TextBaseline;
                },
                set: function (baseline) {
                    this._State.TextBaseline = baseline;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Text2d.prototype, "Color", {
                get: /**
                * Gets or sets the current text color.  Valid colors are strings like "red" or "rgb(255,0,0)".
                */
                function () {
                    return this._State.FillStyle;
                },
                set: function (color) {
                    this._State.FillStyle = color;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Text2d.prototype, "ShadowColor", {
                get: /**
                * Gets or sets the current shadow color.  Valid colors are strings like "red" or "rgb(255,0,0)".
                */
                function () {
                    return this._State.ShadowColor;
                },
                set: function (color) {
                    this._State.ShadowColor = color;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Text2d.prototype, "ShadowX", {
                get: /**
                * Gets or sets the current horizontal shadow position.
                */
                function () {
                    return this._State.ShadowOffsetX;
                },
                set: function (x) {
                    this._State.ShadowOffsetX = x;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Text2d.prototype, "ShadowY", {
                get: /**
                * Gets or sets the current vertical shadow position.
                */
                function () {
                    return this._State.ShadowOffsetY;
                },
                set: function (y) {
                    this._State.ShadowOffsetY = y;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Text2d.prototype, "ShadowBlur", {
                get: /**
                * Gets or sets the current shadow blur.
                */
                function () {
                    return this._State.ShadowBlur;
                },
                set: function (blur) {
                    this._State.ShadowBlur = blur;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Text2d.prototype, "Opacity", {
                get: /**
                * Gets or sets the current opacity.  Value is between 0 and 1.
                */
                function () {
                    return this._State.GlobalAlpha;
                },
                set: function (alpha) {
                    this._State.GlobalAlpha = alpha;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Text2d.prototype, "FontSettings", {
                get: /**
                * Gets the Text2d's FontSetting's.
                */
                function () {
                    this._recalculateBoundsSize = true;

                    return this._fontSettings;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Text2d.prototype, "BorderThickness", {
                get: /**
                * Gets or sets the current border thickness.
                */
                function () {
                    return this._State.LineWidth;
                },
                set: function (thickness) {
                    if (thickness === 0) {
                        this._stroker.Reset();
                    } else {
                        this._stroker.Trip();
                    }

                    this._State.LineWidth = thickness;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Text2d.prototype, "BorderColor", {
                get: /**
                * Gets or sets the current border color.  Valid colors are strings like "red" or "rgb(255,0,0)".
                */
                function () {
                    return this._State.StrokeStyle;
                },
                set: function (color) {
                    this._stroker.Trip();
                    this._State.StrokeStyle = color;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Text2d.prototype, "Text", {
                get: /**
                * Gets or sets the current Text2d's text.
                */
                function () {
                    return this._text;
                },
                set: function (text) {
                    this._recalculateBoundsSize = true;
                    this._text = text;
                },
                enumerable: true,
                configurable: true
            });

            Text2d.prototype.Shadow = function (x, y, color, blur) {
                this.ShadowX = x;
                this.ShadowY = y;
                this.ShadowColor = color;
                this.ShadowBlur = blur;
            };

            /**
            * Sets the current borders thickness and color.
            * @param thickness The new border thickness in pixels.
            * @param color The new border color.  Can be valid color strings, like "red" or "rgb(255,0,0)".
            */
            Text2d.prototype.Border = function (thickness, color) {
                this.BorderThickness = thickness;
                this.BorderColor = color;
            };

            /**
            * Draws the text onto the given context.  If this Text2d is part of a scene the Draw function will be called automatically.
            * @param context The canvas context to draw the text onto.
            */
            Text2d.prototype.Draw = function (context) {
                var textSize;

                this._State.Font = this._fontSettings._BuildFont();

                _super.prototype._StartDraw.call(this, context);

                context.fillText(this._text, 0, 0);
                this._stroker.Invoke(context);

                if (this._recalculateBoundsSize) {
                    this._recalculateBoundsSize = false;
                    textSize = context.measureText(this._text);
                    this._drawBounds.Size.Width = textSize.width;
                    this._drawBounds.Size.Height = parseInt(this._fontSettings.FontSize) * 1.5;
                }

                _super.prototype._EndDraw.call(this, context);
            };

            /**
            * The bounding area that represents where the Text2d will draw.
            */
            Text2d.prototype.GetDrawBounds = function () {
                this._drawBounds.Rotation = this.Rotation;
                this._drawBounds.Position = this.Position;

                return this._drawBounds;
            };
            return Text2d;
        })(Graphics.Abstractions.Graphic2d);
        Graphics.Text2d = Text2d;
    })(EndGate.Graphics || (EndGate.Graphics = {}));
    var Graphics = EndGate.Graphics;
})(EndGate || (EndGate = {}));
var EndGate;
(function (EndGate) {
    (function (Graphics) {
        /// <reference path="../../Assets/Vectors/Vector2d.ts" />
        /// <reference path="../../Assets/Sizes/Size2d.ts" />
        /// <reference path="../../Utilities/EventHandler1.ts" />
        (function (Assets) {
            /**
            * Defines an image resource that can be used within Sprite's, SpriteAnimation's and other drawable graphics.
            */
            var ImageSource = (function () {
                function ImageSource(imageLocation, width, height, clipX, clipY, clipWidth, clipHeight) {
                    if (typeof clipX === "undefined") { clipX = 0; }
                    if (typeof clipY === "undefined") { clipY = 0; }
                    if (typeof clipWidth === "undefined") { clipWidth = width; }
                    if (typeof clipHeight === "undefined") { clipHeight = height; }
                    var _this = this;
                    var setSize = typeof width !== "undefined";

                    this._loaded = false;
                    this._onLoaded = new EndGate.EventHandler1();
                    this.Source = new Image();

                    this.Source.onload = function () {
                        _this._loaded = true;

                        if (!setSize) {
                            _this._size = new EndGate.Size2d(_this.Source.width, _this.Source.height);
                            _this.ClipLocation = EndGate.Vector2d.Zero;
                            _this.ClipSize = _this._size.Clone();
                        }

                        _this._onLoaded.Trigger(_this);
                    };

                    this.Source.src = imageLocation;
                    this._imageLocation = imageLocation;

                    if (setSize) {
                        this._size = new EndGate.Size2d(width, height);
                        this.ClipLocation = new EndGate.Vector2d(clipX, clipY);
                        this.ClipSize = new EndGate.Size2d(clipWidth, clipHeight);
                    }
                }
                Object.defineProperty(ImageSource.prototype, "OnLoaded", {
                    get: /**
                    * Gets an event that is triggered when the base image is finished loading.  Functions can be bound or unbound to this event to be executed when the event triggers.
                    */
                    function () {
                        return this._onLoaded;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(ImageSource.prototype, "Size", {
                    get: /**
                    * Returns the base Size of the image source.
                    */
                    function () {
                        return this._size.Clone();
                    },
                    enumerable: true,
                    configurable: true
                });

                /**
                * Determines if the ImageSource has been loaded.
                */
                ImageSource.prototype.Loaded = function () {
                    return this._loaded;
                };

                /**
                * Returns an ImageSource that is extracted from the current ImageSource based on the provided clip location and clip size.
                * @param clipX The horizontal location of the clip.
                * @param clipY The vertical location of the clip.
                * @param clipWidth The width of the clip.
                * @param clipHeight The height of the clip.
                */
                ImageSource.prototype.Extract = function (clipX, clipY, clipWidth, clipHeight) {
                    return new ImageSource(this._imageLocation, this._size.Width, this._size.Height, clipX, clipY, clipWidth, clipHeight);
                };
                return ImageSource;
            })();
            Assets.ImageSource = ImageSource;
        })(Graphics.Assets || (Graphics.Assets = {}));
        var Assets = Graphics.Assets;
    })(EndGate.Graphics || (EndGate.Graphics = {}));
    var Graphics = EndGate.Graphics;
})(EndGate || (EndGate = {}));
var EndGate;
(function (EndGate) {
    /// <reference path="../../Assets/Vectors/Vector2d.ts" />
    /// <reference path="../../Assets/Sizes/Size2d.ts" />
    /// <reference path="../Graphic2d.ts" />
    /// <reference path="ImageSource.ts" />
    (function (Graphics) {
        /**
        * Defines a drawable sprite.  Sprites are used to draw images to the game screen.
        */
        var Sprite2d = (function (_super) {
            __extends(Sprite2d, _super);
            function Sprite2d(x, y, image, width, height) {
                if (typeof width === "undefined") { width = image.ClipSize.Width; }
                if (typeof height === "undefined") { height = image.ClipSize.Height; }
                _super.call(this, new EndGate.Vector2d(x, y));
                this._type = "Sprite2d";

                this.Image = image;
                this.Size = new EndGate.Size2d(width, height);
            }
            Object.defineProperty(Sprite2d.prototype, "Opacity", {
                get: /**
                * Gets or sets the current opacity.  Value is between 0 and 1.
                */
                function () {
                    return this._State.GlobalAlpha;
                },
                set: function (alpha) {
                    this._State.GlobalAlpha = alpha;
                },
                enumerable: true,
                configurable: true
            });

            /**
            * Draws the sprite onto the given context.  If this sprite is part of a scene the Draw function will be called automatically.
            * @param context The canvas context to draw the sprite onto.
            */
            Sprite2d.prototype.Draw = function (context) {
                _super.prototype._StartDraw.call(this, context);

                context.drawImage(this.Image.Source, this.Image.ClipLocation.X, this.Image.ClipLocation.Y, this.Image.ClipSize.Width, this.Image.ClipSize.Height, -this.Size.HalfWidth, -this.Size.HalfHeight, this.Size.Width, this.Size.Height);

                _super.prototype._EndDraw.call(this, context);
            };

            /**
            * The bounding area that represents where the Sprite2d will draw.
            */
            Sprite2d.prototype.GetDrawBounds = function () {
                var bounds = new EndGate.Bounds.BoundingRectangle(this.Position, this.Size);

                bounds.Rotation = this.Rotation;

                return bounds;
            };
            return Sprite2d;
        })(Graphics.Abstractions.Graphic2d);
        Graphics.Sprite2d = Sprite2d;
    })(EndGate.Graphics || (EndGate.Graphics = {}));
    var Graphics = EndGate.Graphics;
})(EndGate || (EndGate = {}));
var EndGate;
(function (EndGate) {
    /// <reference path="../../../Utilities/EventHandler.ts" />
    /// <reference path="../../../Assets/Vectors/Vector2d.ts" />
    /// <reference path="../../../Assets/Sizes/Size2d.ts" />
    /// <reference path="../../../Interfaces/IUpdateable.ts" />
    /// <reference path="../../../GameTime.ts" />
    /// <reference path="../ImageSource.ts" />
    (function (Graphics) {
        /**
        * Defines an animation that can be drawn to the screen.
        */
        var SpriteAnimation = (function () {
            function SpriteAnimation(imageSource, fps, frameSize, frameCount, startOffset) {
                if (typeof startOffset === "undefined") { startOffset = EndGate.Vector2d.Zero; }
                this._imageSource = imageSource;
                this._frameSize = frameSize;
                this._frameCount = frameCount;
                this._startOffset = startOffset;
                this._playing = false;
                this._repeating = false;
                this._currentFrame = 0;
                this._framesPerRow = Math.min(Math.floor((imageSource.ClipSize.Width - startOffset.X) / frameSize.Width), frameCount);
                this._lastStepAt = 0;

                this._onComplete = new EndGate.EventHandler();

                this.Fps = fps;
            }
            Object.defineProperty(SpriteAnimation.prototype, "OnComplete", {
                get: /**
                * Gets an event that is triggered when the animation has completed, will not trigger if the animation is repeating.  Functions can be bound or unbound to this event to be executed when the event triggers.
                */
                function () {
                    return this._onComplete;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(SpriteAnimation.prototype, "Fps", {
                get: /**
                * Gets or sets the current frames per second.
                */
                function () {
                    return this._fps;
                },
                set: function (newFps) {
                    this._fps = newFps;
                    this._stepEvery = 1000 / this._fps;
                },
                enumerable: true,
                configurable: true
            });

            /**
            * Determines if the animation is currently playing.
            */
            SpriteAnimation.prototype.IsPlaying = function () {
                return this._playing;
            };

            SpriteAnimation.prototype.Play = function (repeat) {
                if (typeof repeat === "undefined") { repeat = false; }
                this._lastStepAt = new Date().getTime();
                this._repeating = repeat;
                this._playing = true;
                this.UpdateImageSource();
            };

            /**
            * Pauses the animation.
            */
            SpriteAnimation.prototype.Pause = function () {
                this._playing = false;
            };

            SpriteAnimation.prototype.Step = function (count) {
                if (typeof count === "undefined") { count = 1; }
                this._currentFrame += count;

                if (this._currentFrame >= this._frameCount) {
                    if (this._repeating) {
                        this._currentFrame %= this._frameCount;
                    } else {
                        this._currentFrame = this._frameCount - 1;
                        this.OnComplete.Trigger();
                        this.Stop(false);
                    }
                }

                if (count !== 0) {
                    this.UpdateImageSource();
                }
            };

            SpriteAnimation.prototype.Stop = function (resetFrame) {
                if (typeof resetFrame === "undefined") { resetFrame = true; }
                this._playing = false;
                if (resetFrame) {
                    this.Reset();
                }
            };

            /**
            * Resets the current animation frame to 0.
            */
            SpriteAnimation.prototype.Reset = function () {
                this._currentFrame = 0;
                this.UpdateImageSource();
            };

            /**
            * Updates the animations current frame.  Needs to be updated in order to play the animation.
            * @param gameTime The current game time object.
            */
            SpriteAnimation.prototype.Update = function (gameTime) {
                var timeSinceStep = gameTime.Now.getTime() - this._lastStepAt, stepCount = 0;

                if (this._playing) {
                    stepCount = Math.floor(timeSinceStep / this._stepEvery);
                    if (stepCount !== 0) {
                        this._lastStepAt = gameTime.Now.getTime();
                        this.Step(stepCount);
                    }
                }
            };

            SpriteAnimation.prototype.UpdateImageSource = function () {
                var row = this.GetFrameRow(), column = this.GetFrameColumn();

                this._imageSource.ClipLocation.X = this._startOffset.X + column * this._frameSize.Width;
                this._imageSource.ClipLocation.Y = this._startOffset.Y + row * this._frameSize.Height;
                this._imageSource.ClipSize = this._frameSize;
            };

            SpriteAnimation.prototype.GetFrameRow = function () {
                return Math.floor(this._currentFrame / this._framesPerRow);
            };

            SpriteAnimation.prototype.GetFrameColumn = function () {
                return Math.ceil(this._currentFrame % this._framesPerRow);
            };
            return SpriteAnimation;
        })();
        Graphics.SpriteAnimation = SpriteAnimation;
    })(EndGate.Graphics || (EndGate.Graphics = {}));
    var Graphics = EndGate.Graphics;
})(EndGate || (EndGate = {}));
var EndGate;
(function (EndGate) {
    (function (Graphics) {
        /// <reference path="../../Assets/Vectors/Vector2d.ts" />
        /// <reference path="../Graphic2d.ts" />
        (function (Abstractions) {
            /**
            * Abstract drawable shape type that is used create customizable drawable graphics.
            */
            var Shape = (function (_super) {
                __extends(Shape, _super);
                function Shape(position, color) {
                    _super.call(this, position);
                    this._type = "Shape";

                    this._fill = false;
                    this._stroke = false;

                    if (typeof color !== "undefined") {
                        this.Color = color;
                    }
                }
                Object.defineProperty(Shape.prototype, "Color", {
                    get: /**
                    * Gets or sets the current shape color.  Valid colors are strings like "red" or "rgb(255,0,0)".
                    */
                    function () {
                        return this._State.FillStyle;
                    },
                    set: function (color) {
                        this._fill = true;
                        this._State.FillStyle = color;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(Shape.prototype, "BorderThickness", {
                    get: /**
                    * Gets or sets the current border thickness.
                    */
                    function () {
                        return this._State.LineWidth;
                    },
                    set: function (thickness) {
                        this._State.LineWidth = thickness;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(Shape.prototype, "BorderColor", {
                    get: /**
                    * Gets or sets the current border color.  Valid colors are strings like "red" or "rgb(255,0,0)".
                    */
                    function () {
                        return this._State.StrokeStyle;
                    },
                    set: function (color) {
                        this._stroke = true;
                        this._State.StrokeStyle = color;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(Shape.prototype, "ShadowColor", {
                    get: /**
                    * Gets or sets the current shadow color.  Valid colors are strings like "red" or "rgb(255,0,0)".
                    */
                    function () {
                        return this._State.ShadowColor;
                    },
                    set: function (color) {
                        this._fill = true;
                        this._State.ShadowColor = color;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(Shape.prototype, "ShadowX", {
                    get: /**
                    * Gets or sets the current horizontal shadow position.
                    */
                    function () {
                        return this._State.ShadowOffsetX;
                    },
                    set: function (x) {
                        this._State.ShadowOffsetX = x;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(Shape.prototype, "ShadowY", {
                    get: /**
                    * Gets or sets the current vertical shadow position.
                    */
                    function () {
                        return this._State.ShadowOffsetY;
                    },
                    set: function (y) {
                        this._State.ShadowOffsetY = y;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(Shape.prototype, "ShadowBlur", {
                    get: /**
                    * Gets or sets the current shadow blur.
                    */
                    function () {
                        return this._State.ShadowBlur;
                    },
                    set: function (blur) {
                        this._State.ShadowBlur = blur;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(Shape.prototype, "Opacity", {
                    get: /**
                    * Gets or sets the current opacity.  Value is between 0 and 1.
                    */
                    function () {
                        return this._State.GlobalAlpha;
                    },
                    set: function (alpha) {
                        this._State.GlobalAlpha = alpha;
                    },
                    enumerable: true,
                    configurable: true
                });

                /**
                * Sets the current borders thickness and color.
                * @param thickness The new border thickness in pixels.
                * @param color The new border color.  Can be valid color strings, like "red" or "rgb(255,0,0)".
                */
                Shape.prototype.Border = function (thickness, color) {
                    this.BorderThickness = thickness;
                    this.BorderColor = color;
                };

                Shape.prototype.Shadow = function (x, y, color, blur) {
                    this.ShadowX = x;
                    this.ShadowY = y;
                    this.ShadowColor = color;
                    this.ShadowBlur = blur;
                };

                Shape.prototype._StartDraw = function (context) {
                    _super.prototype._StartDraw.call(this, context);
                    context.beginPath();
                };

                Shape.prototype._EndDraw = function (context) {
                    if (this._fill) {
                        context.fill();
                    }

                    if (this._stroke) {
                        context.stroke();
                    } else {
                        context.closePath();
                    }

                    _super.prototype._EndDraw.call(this, context);
                };

                // This should be overridden if you want to build a proper shape
                Shape.prototype._BuildPath = function (context) {
                };

                /**
                * Draws the shape onto the given context.  If this shape is part of a scene the Draw function will be called automatically.
                * @param context The canvas context to draw the shape onto.
                */
                Shape.prototype.Draw = function (context) {
                    this._StartDraw(context);
                    this._BuildPath(context);
                    this._EndDraw(context);
                };
                return Shape;
            })(Abstractions.Graphic2d);
            Abstractions.Shape = Shape;
        })(Graphics.Abstractions || (Graphics.Abstractions = {}));
        var Abstractions = Graphics.Abstractions;
    })(EndGate.Graphics || (EndGate.Graphics = {}));
    var Graphics = EndGate.Graphics;
})(EndGate || (EndGate = {}));
var EndGate;
(function (EndGate) {
    /// <reference path="../../Assets/Sizes/Size2d.ts" />
    /// <reference path="../../Assets/Vectors/Vector2d.ts" />
    /// <reference path="../../Bounds/BoundingCircle.ts" />
    /// <reference path="Shape.ts" />
    (function (Graphics) {
        /**
        * Defines a drawable circle.
        */
        var Circle = (function (_super) {
            __extends(Circle, _super);
            function Circle(x, y, radius, color) {
                _super.call(this, new EndGate.Vector2d(x, y), color);
                this._type = "Circle";

                this.Radius = radius;
            }
            /**
            * The bounding area that represents where the Circle will draw.
            */
            Circle.prototype.GetDrawBounds = function () {
                var bounds = new EndGate.Bounds.BoundingCircle(this.Position, this.Radius);

                bounds.Rotation = this.Rotation;

                return bounds;
            };

            Circle.prototype._BuildPath = function (context) {
                context.arc(0, 0, this.Radius, 0, (Math).twoPI);
            };
            return Circle;
        })(Graphics.Abstractions.Shape);
        Graphics.Circle = Circle;
    })(EndGate.Graphics || (EndGate.Graphics = {}));
    var Graphics = EndGate.Graphics;
})(EndGate || (EndGate = {}));
var EndGate;
(function (EndGate) {
    /// <reference path="../../Assets/Sizes/Size2d.ts" />
    /// <reference path="../../Assets/Vectors/Vector2d.ts" />
    /// <reference path="../../Bounds/BoundingRectangle.ts" />
    /// <reference path="Shape.ts" />
    (function (Graphics) {
        /**
        * Defines a drawable rectangle.
        */
        var Rectangle = (function (_super) {
            __extends(Rectangle, _super);
            function Rectangle(x, y, width, height, color) {
                _super.call(this, new EndGate.Vector2d(x, y), color);
                this._type = "Rectangle";

                this.Size = new EndGate.Size2d(width, height);
            }
            /**
            * The bounding area that represents where the Rectangle will draw.
            */
            Rectangle.prototype.GetDrawBounds = function () {
                var bounds = new EndGate.Bounds.BoundingRectangle(this.Position, this.Size);

                bounds.Rotation = this.Rotation;

                return bounds;
            };

            Rectangle.prototype._BuildPath = function (context) {
                context.rect(-this.Size.HalfWidth, -this.Size.HalfHeight, this.Size.Width, this.Size.Height);
            };
            return Rectangle;
        })(Graphics.Abstractions.Shape);
        Graphics.Rectangle = Rectangle;
    })(EndGate.Graphics || (EndGate.Graphics = {}));
    var Graphics = EndGate.Graphics;
})(EndGate || (EndGate = {}));
var EndGate;
(function (EndGate) {
    /// <reference path="../Assets/Sizes/Size2d.ts" />
    /// <reference path="../Assets/Vectors/Vector2d.ts" />
    /// <reference path="../Bounds/BoundingRectangle.ts" />
    /// <reference path="Graphic2d.ts" />
    (function (Graphics) {
        /**
        * Defines a drawable 2d line element.
        */
        var Line2d = (function (_super) {
            __extends(Line2d, _super);
            function Line2d(fromX, fromY, toX, toY, lineWidth, color) {
                if (typeof lineWidth === "undefined") { lineWidth = 1; }
                _super.call(this, EndGate.Vector2d.Zero);
                this._type = "Line2d";

                this._from = new EndGate.Vector2d(fromX, fromY);
                this._to = new EndGate.Vector2d(toX, toY);
                this.LineWidth = lineWidth;
                this.UpdatePosition();

                if (typeof color !== "undefined") {
                    this.Color = color;
                }
            }
            Object.defineProperty(Line2d.prototype, "From", {
                get: /**
                * Gets or sets the From location of the Line2d.
                */
                function () {
                    return this._from;
                },
                set: function (newPosition) {
                    this._from = newPosition;
                    this.UpdatePosition();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Line2d.prototype, "To", {
                get: /**
                * Gets or sets the To location of the Line2d.
                */
                function () {
                    return this._to;
                },
                set: function (newPosition) {
                    this._to = newPosition;
                    this.UpdatePosition();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Line2d.prototype, "Color", {
                get: /**
                * Gets or sets the line color.  Valid colors are strings like "red" or "rgb(255,0,0)".
                */
                function () {
                    return this._State.StrokeStyle;
                },
                set: function (color) {
                    this._State.StrokeStyle = color;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Line2d.prototype, "LineWidth", {
                get: /**
                * Gets or sets the line width.
                */
                function () {
                    return this._State.LineWidth;
                },
                set: function (width) {
                    this._State.LineWidth = width;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Line2d.prototype, "LineCap", {
                get: /**
                * Gets or sets the line cap.  Values can be "butt", "round", "square".
                */
                function () {
                    return this._State.LineCap;
                },
                set: function (cap) {
                    this._State.LineCap = cap;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Line2d.prototype, "Opacity", {
                get: /**
                * Gets or sets the current opacity.  Value is between 0 and 1.
                */
                function () {
                    return this._State.GlobalAlpha;
                },
                set: function (alpha) {
                    this._State.GlobalAlpha = alpha;
                },
                enumerable: true,
                configurable: true
            });

            /**
            * Draws the line onto the given context.  If this Line2d is part of a scene the Draw function will be called automatically.
            * @param context The canvas context to draw the line onto.
            */
            Line2d.prototype.Draw = function (context) {
                _super.prototype._StartDraw.call(this, context);

                if (!this._cachedPosition.Equivalent(this.Position)) {
                    this.RefreshCache();
                }

                // Context origin is at the center point of the line
                context.beginPath();
                context.moveTo(this._from.X - this.Position.X, this._from.Y - this.Position.Y);
                context.lineTo(this._to.X - this.Position.X, this._to.Y - this.Position.Y);
                context.stroke();

                _super.prototype._EndDraw.call(this, context);
            };

            /**
            * The bounding area that represents where the Line2d will draw.
            */
            Line2d.prototype.GetDrawBounds = function () {
                var bounds = new EndGate.Bounds.BoundingRectangle(this.Position, new EndGate.Size2d(this._boundsWidth, this.LineWidth));

                bounds.Rotation = Math.atan2(this._difference.Y, this._difference.X) + this.Rotation;

                return bounds;
            };

            Line2d.prototype.UpdatePosition = function () {
                this.Position = ((this._from.Add(this._to)).Divide(2));
                this._difference = this._to.Subtract(this._from);
                this._boundsWidth = this._from.Distance(this._to).Length();
                this._cachedPosition = this.Position.Clone();
            };

            Line2d.prototype.RefreshCache = function () {
                var difference = this.Position.Subtract(this._cachedPosition);
                this._from.X += difference.X;
                this._from.Y += difference.Y;
                this._to.X += difference.X;
                this._to.Y += difference.Y;
                this._cachedPosition = this.Position.Clone();
            };
            return Line2d;
        })(Graphics.Abstractions.Graphic2d);
        Graphics.Line2d = Line2d;
    })(EndGate.Graphics || (EndGate.Graphics = {}));
    var Graphics = EndGate.Graphics;
})(EndGate || (EndGate = {}));
var EndGate;
(function (EndGate) {
    /// <reference path="../../Assets/Vectors/Vector2d.ts" />
    /// <reference path="../../Assets/Sizes/Size2d.ts" />
    /// <reference path="../Graphic2d.ts" />
    /// <reference path="../Line2d.ts" />
    (function (Graphics) {
        /**
        * Defines a drawable grid that can be used to store other graphics in a grid like structure.
        */
        var Grid = (function (_super) {
            __extends(Grid, _super);
            function Grid(x, y, rows, columns, tileWidth, tileHeight, drawGridLines, gridLineColor) {
                if (typeof drawGridLines === "undefined") { drawGridLines = false; }
                if (typeof gridLineColor === "undefined") { gridLineColor = "gray"; }
                _super.call(this, new EndGate.Vector2d(x, y));
                this._type = "Grid";
                var halfSize, topLeft, bottomRight;

                this._size = new EndGate.Size2d(tileWidth * columns, tileHeight * rows);
                this._tileSize = new EndGate.Size2d(tileWidth, tileHeight);
                this._grid = [];
                this._rows = rows;
                this._columns = columns;
                this.DrawGridLines = drawGridLines;
                this._gridLines = [];

                halfSize = this._size.Multiply(.5);
                topLeft = new EndGate.Vector2d(-halfSize.Width, -halfSize.Height);
                bottomRight = new EndGate.Vector2d(halfSize.Width, halfSize.Height);

                for (var i = 0; i < rows; i++) {
                    this._grid[i] = [];
                    this._gridLines.push(new Graphics.Line2d(topLeft.X, topLeft.Y + i * this._tileSize.Height, bottomRight.X, topLeft.Y + i * this._tileSize.Height, 1));

                    for (var j = 0; j < columns; j++) {
                        if (i === 0) {
                            this._gridLines.push(new Graphics.Line2d(topLeft.X + j * this._tileSize.Width, topLeft.Y, topLeft.X + j * this._tileSize.Width, bottomRight.Y, 1));
                        }

                        this._grid[i].push(null);
                    }
                }

                this._gridLines.push(new Graphics.Line2d(topLeft.X, bottomRight.Y, bottomRight.X, bottomRight.Y, 1));
                this._gridLines.push(new Graphics.Line2d(bottomRight.X, topLeft.Y, bottomRight.X, bottomRight.Y, 1));

                this.GridLineColor = gridLineColor;
            }
            Object.defineProperty(Grid.prototype, "GridLineColor", {
                get: /**
                * Gets or sets the current grid line color.  Grid lines are only drawn of DrawGridLines is set to true.  Valid colors are strings like "red" or "rgb(255,0,0)".
                */
                function () {
                    return this._gridLineColor;
                },
                set: function (color) {
                    this._gridLineColor = color;

                    for (var i = 0; i < this._gridLines.length; i++) {
                        this._gridLines[i].Color = color;
                    }
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Grid.prototype, "Size", {
                get: /**
                * Gets the size of the grid.
                */
                function () {
                    return this._size.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Grid.prototype, "TileSize", {
                get: /**
                * Gets the size of the tiles.
                */
                function () {
                    return this._tileSize.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Grid.prototype, "Rows", {
                get: /**
                * Gets the number of rows.
                */
                function () {
                    return this._rows;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Grid.prototype, "Columns", {
                get: /**
                * Gets the number of columns.
                */
                function () {
                    return this._columns;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Grid.prototype, "Opacity", {
                get: /**
                * Gets or sets the current opacity.  Value is between 0 and 1.
                */
                function () {
                    return this._State.GlobalAlpha;
                },
                set: function (alpha) {
                    this._State.GlobalAlpha = alpha;
                },
                enumerable: true,
                configurable: true
            });

            /**
            * Fills a tile with the provided graphic.
            * @param row The row.
            * @param column The column.
            * @param graphic The graphic to fill the tile with.
            */
            Grid.prototype.Fill = function (row, column, graphic) {
                if (!this.ValidRow(row) || !this.ValidColumn(column)) {
                    return;
                }

                graphic.Position = this.GetInsideGridPosition(row, column);

                this._grid[row][column] = graphic;
                this.AddChild(graphic);
            };

            Grid.prototype.FillRow = function (row, graphicList, columnOffset) {
                if (typeof columnOffset === "undefined") { columnOffset = 0; }
                var graphic;

                for (var i = 0; i < graphicList.length; i++) {
                    graphic = graphicList[i];
                    graphic.Position = this.GetInsideGridPosition(row, i + columnOffset);

                    this._grid[row][i + columnOffset] = graphic;
                    this.AddChild(graphic);
                }
            };

            Grid.prototype.FillColumn = function (column, graphicList, rowOffset) {
                if (typeof rowOffset === "undefined") { rowOffset = 0; }
                var graphic;

                for (var i = 0; i < graphicList.length; i++) {
                    graphic = graphicList[i];
                    graphic.Position = this.GetInsideGridPosition(i + rowOffset, column);

                    this._grid[i + rowOffset][column] = graphic;
                    this.AddChild(graphic);
                }
            };

            /**
            * Fills a tile with the provided graphic.
            * @param row The row to start filling at.
            * @param column The column to start filling at.
            * @param graphicList The list of graphics to fill the space with.  The space will be filled with as many elements that are contained within the multi-dimensional graphicList.
            */
            Grid.prototype.FillSpace = function (row, column, graphicList) {
                var graphic;

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
            };

            /**
            * Gets a graphic within the grid.
            * @param row The row.
            * @param column The column.
            */
            Grid.prototype.Get = function (row, column) {
                if (!this.ValidRow(row) || !this.ValidColumn(column)) {
                    return null;
                }

                return this._grid[row][column];
            };

            Grid.prototype.GetRow = function (row, columnOffset) {
                if (typeof columnOffset === "undefined") { columnOffset = 0; }
                var rowList = [];

                for (var i = columnOffset; i < this._columns; i++) {
                    rowList.push(this._grid[row][i]);
                }

                return rowList;
            };

            Grid.prototype.GetColumn = function (column, rowOffset) {
                if (typeof rowOffset === "undefined") { rowOffset = 0; }
                var columnList = [];

                for (var i = rowOffset; i < this._rows; i++) {
                    columnList.push(this._grid[i][column]);
                }

                return columnList;
            };

            /**
            * Retrieves graphics within row column cross section.
            * @param rowStart The row to start pulling graphics from.
            * @param columnStart The column to start pulling graphics from.
            * @param rowEnd The row to stop pulling graphics from.
            * @param columnEnd The column to stop pulling graphics from.
            */
            Grid.prototype.GetSpace = function (rowStart, columnStart, rowEnd, columnEnd) {
                var space = [], rowIncrementor = (rowEnd >= rowStart) ? 1 : -1, columnIncrementor = (columnEnd >= columnStart) ? 1 : -1;

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
            };

            /**
            * Clear a grid tile.
            * @param row The row.
            * @param column The column.
            */
            Grid.prototype.Clear = function (row, column) {
                if (!this.ValidRow(row) || !this.ValidColumn(column)) {
                    return null;
                }

                var val = this._grid[row][column];

                this._grid[row][column] = null;
                this.RemoveChild(val);

                return val;
            };

            Grid.prototype.ClearRow = function (row, columnOffset) {
                if (typeof columnOffset === "undefined") { columnOffset = 0; }
                var vals = [];

                for (var i = 0; i < this._columns; i++) {
                    vals.push(this._grid[row][i]);
                    this.RemoveChild(this._grid[row][i]);
                    this._grid[row][i] = null;
                }

                return vals;
            };

            Grid.prototype.ClearColumn = function (column, rowOffset) {
                if (typeof rowOffset === "undefined") { rowOffset = 0; }
                var vals = [];

                for (var i = 0; i < this._rows; i++) {
                    vals.push(this._grid[i][column]);
                    this.RemoveChild(this._grid[i][column]);
                    this._grid[i][column] = null;
                }

                return vals;
            };

            /**
            * Clears graphics within row column cross section.
            * @param rowStart The row to start clearing graphics from.
            * @param columnStart The column to start clearing graphics from.
            * @param rowEnd The row to stop clearing graphics from.
            * @param columnEnd The column to stop clearing graphics from.
            */
            Grid.prototype.ClearSpace = function (rowStart, columnStart, rowEnd, columnEnd) {
                var space = [], rowIncrementor = (rowEnd >= rowStart) ? 1 : -1, columnIncrementor = (columnEnd >= columnStart) ? 1 : -1;

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
            };

            /**
            * Draws the grid onto the given context.  If this grid is part of a scene the Draw function will be called automatically.
            * @param context The canvas context to draw the grid onto.
            */
            Grid.prototype.Draw = function (context) {
                _super.prototype._StartDraw.call(this, context);

                context.save();
                _super.prototype._EndDraw.call(this, context);

                if (this.DrawGridLines) {
                    for (var i = 0; i < this._gridLines.length; i++) {
                        this._gridLines[i].Draw(context);
                    }
                }
                context.restore();
            };

            /**
            * The bounding area that represents where the grid will draw.
            */
            Grid.prototype.GetDrawBounds = function () {
                var bounds = new EndGate.Bounds.BoundingRectangle(this.Position, this._size);

                bounds.Rotation = this.Rotation;

                return bounds;
            };

            /**
            * Converts the provided vertical coordinate to a row number that is based on the current grid.
            * @param y The vertical coordinate to convert to a row.
            */
            Grid.prototype.ConvertToRow = function (y) {
                return Math.floor((y - (this.Position.Y - this._size.HalfHeight)) / this._tileSize.Height);
            };

            /**
            * Converts the provided horizontal coordinate to a column number that is based on the current grid.
            * @param x The horizontal component to convert to a column.
            */
            Grid.prototype.ConvertToColumn = function (x) {
                return Math.floor((x - (this.Position.X - this._size.HalfWidth)) / this._tileSize.Width);
            };

            Grid.prototype.GetInsideGridPosition = function (row, column) {
                return new EndGate.Vector2d(column * this._tileSize.Width - this._size.HalfWidth + this._tileSize.HalfWidth, row * this._tileSize.Height - this._size.HalfHeight + this._tileSize.HalfHeight);
            };

            Grid.prototype.ValidRow = function (row) {
                return row >= 0 && row < this._rows;
            };

            Grid.prototype.ValidColumn = function (column) {
                return column >= 0 && column < this._columns;
            };
            return Grid;
        })(Graphics.Abstractions.Graphic2d);
        Graphics.Grid = Grid;
    })(EndGate.Graphics || (EndGate.Graphics = {}));
    var Graphics = EndGate.Graphics;
})(EndGate || (EndGate = {}));
var EndGate;
(function (EndGate) {
    /// <reference path="../../Assets/Vectors/Vector2d.ts" />
    /// <reference path="../../Graphics/Graphic2d.ts" />
    /// <reference path="../../Graphics/Sprites/ImageSource.ts" />
    (function (Map) {
        /**
        * Defines an abstract class TileMap that takes an array of resources to be mapped to tiles.
        */
        var TileMap = (function (_super) {
            __extends(TileMap, _super);
            /**
            * Creates a new instance of the TileMap object.
            * @param x Initial horizontal location of the tile map.
            * @param y Initial vertical location of the tile map.
            * @param resources A one dimensional array of image resources that make up the tile map (this cannot change after construction).
            */
            function TileMap(x, y, resources) {
                _super.call(this, new EndGate.Vector2d(x, y));

                this._Resources = resources;
            }
            return TileMap;
        })(EndGate.Graphics.Abstractions.Graphic2d);
        Map.TileMap = TileMap;
    })(EndGate.Map || (EndGate.Map = {}));
    var Map = EndGate.Map;
})(EndGate || (EndGate = {}));
var EndGate;
(function (EndGate) {
    /// <reference path="../../Graphics/Sprites/ImageSource.ts" />
    /// <reference path="../../Graphics/Sprites/Sprite2d.ts" />
    (function (Map) {
        /**
        * Defines a SquareTile that is used by the SquareTileMap.  Represents one tile within the tile map.
        */
        var SquareTile = (function (_super) {
            __extends(SquareTile, _super);
            /**
            * Creates a new instance of the SquareTile object.
            * @param image The image that is within the tile.
            * @param width The width of the tile.
            * @param height The height of the tile.
            */
            function SquareTile(image, width, height) {
                _super.call(this, 0, 0, image, width, height);
            }
            return SquareTile;
        })(EndGate.Graphics.Sprite2d);
        Map.SquareTile = SquareTile;
    })(EndGate.Map || (EndGate.Map = {}));
    var Map = EndGate.Map;
})(EndGate || (EndGate = {}));
var EndGate;
(function (EndGate) {
    /// <reference path="../../Assets/Sizes/Size2d.ts" />
    /// <reference path="../../Graphics/Sprites/ImageSource.ts" />
    /// <reference path="../../Graphics/Grid/Grid.ts" />
    /// <reference path="TileMap.ts" />
    /// <reference path="SquareTile.ts" />
    (function (Map) {
        /**
        * Defines a structure that is proficient at creating diverse tile maps based off of a resource image.  Best drawn via a SceneryHandler.
        */
        var SquareTileMap = (function (_super) {
            __extends(SquareTileMap, _super);
            function SquareTileMap(x, y, tileWidth, tileHeight, resources, mappings, staticMap, drawGridLines) {
                if (typeof staticMap === "undefined") { staticMap = true; }
                if (typeof drawGridLines === "undefined") { drawGridLines = false; }
                _super.call(this, x, y, resources);

                this._grid = new EndGate.Graphics.Grid(0, 0, mappings.length, mappings[0].length, tileWidth, tileHeight, drawGridLines);
                this._staticMap = staticMap;

                this.FillGridWith(mappings);

                if (this._staticMap) {
                    this.BuildCache();
                }
            }
            SquareTileMap.ExtractTiles = /**
            * Helper function used to take a SpriteSheet image and create a one dimensional resource tile array.
            * @param imageSource The sprite sheet to extract the tile resources from.
            * @param tileWidth The width of the sprite sheet tiles.
            * @param tileHeight The height of the sprite sheet tiles.
            */
            function (imageSource, tileWidth, tileHeight) {
                var resources = [], framesPerRow = Math.floor(imageSource.ClipSize.Width / tileWidth), rows = Math.floor(imageSource.ClipSize.Height / tileHeight);

                for (var i = 0; i < rows; i++) {
                    for (var j = 0; j < framesPerRow; j++) {
                        resources.push(imageSource.Extract(j * tileWidth, i * tileHeight, tileWidth, tileHeight));
                    }
                }

                return resources;
            };

            /**
            * Draws the SquareTileMap onto the given context.  If the SquareTileMap is part of a Scene2d or SceneryHandler the Draw function will be called automatically.
            * @param context The canvas context to draw the SquareTileMap onto.
            */
            SquareTileMap.prototype.Draw = function (context) {
                _super.prototype._StartDraw.call(this, context);

                if (!this._staticMap) {
                    this._grid.Draw(context);
                } else {
                    context.drawImage(this._mapCache, -this._mapCache.width / 2, -this._mapCache.height / 2);
                }

                _super.prototype._EndDraw.call(this, context);
            };

            /**
            * The bounding area that represents where the SquareTileMap will draw.
            */
            SquareTileMap.prototype.GetDrawBounds = function () {
                var bounds = this._grid.GetDrawBounds();

                bounds.Position = this.Position;

                return bounds;
            };

            SquareTileMap.prototype.BuildCache = function () {
                var size = this._grid.Size, originalPosition = this._grid.Position;

                this._mapCache = document.createElement("canvas");
                this._mapCache.width = size.Width;
                this._mapCache.height = size.Height;

                // Draw the grid onto the cached map
                this._grid.Position = new EndGate.Vector2d(size.HalfWidth, size.HalfHeight);
                this._grid.Draw(this._mapCache.getContext("2d"));
                this._grid.Position = originalPosition;
            };

            SquareTileMap.prototype.FillGridWith = function (mappings) {
                var tiles = [];

                for (var i = 0; i < mappings.length; i++) {
                    tiles[i] = [];
                    for (var j = 0; j < mappings[i].length; j++) {
                        if (mappings[i][j] >= 0) {
                            tiles[i].push(new Map.SquareTile(this._Resources[mappings[i][j]], this._grid.TileSize.Width, this._grid.TileSize.Height));
                        } else {
                            tiles[i].push(null);
                        }
                    }
                }

                this._grid.FillSpace(0, 0, tiles);
            };
            return SquareTileMap;
        })(Map.TileMap);
        Map.SquareTileMap = SquareTileMap;
    })(EndGate.Map || (EndGate.Map = {}));
    var Map = EndGate.Map;
})(EndGate || (EndGate = {}));
/// <reference path="Game.ts" />
/// <reference path="GameConfiguration.ts" />
/// <reference path="GameTime.ts" />
/// <reference path="Utilities/EventHandler.ts" />
/// <reference path="Utilities/EventHandler1.ts" />
/// <reference path="Utilities/EventHandler2.ts" />
/// <reference path="Rendering/Scene2d.ts" />
/// <reference path="Rendering/Camera/Camera2d.ts" />
/// <reference path="MovementControllers/LinearMovementController.ts" />
/// <reference path="InputControllers/DirectionalInputController.ts" />
/// <reference path="Graphics/Graphic2d.ts" />
/// <reference path="Graphics/Text/Text2d.ts" />
/// <reference path="Graphics/Sprites/Sprite2d.ts" />
/// <reference path="Graphics/Sprites/ImageSource.ts" />
/// <reference path="Graphics/Sprites/Animation/SpriteAnimation.ts" />
/// <reference path="Graphics/Shapes/Shape.ts" />
/// <reference path="Graphics/Shapes/Circle.ts" />
/// <reference path="Graphics/Shapes/Rectangle.ts" />
/// <reference path="Graphics/Line2d.ts" />
/// <reference path="Graphics/Grid/Grid.ts" />
/// <reference path="Collision/Collidable.ts" />
/// <reference path="Bounds/BoundingCircle.ts" />
/// <reference path="Bounds/BoundingRectangle.ts" />
/// <reference path="Sound/AudioClip.ts" />
/// <reference path="Sound/AudioPlayer.ts" />
/// <reference path="Sound/AudioSettings.ts" />
/// <reference path="Assets/Sizes/Size2d.ts" />
/// <reference path="Assets/Vectors/Vector2d.ts" />
/// <reference path="Assets/Matrixes/Matrix2x2.ts" />
/// <reference path="Map/MapManager.ts" />
/// <reference path="Map/Scenery/SceneryHandler.ts" />
/// <reference path="Map/Scenery/SquareTileMap.ts" />
/// <reference path="Map/Scenery/TileMap.ts" />
// When this file is compiled into a declaration file it does not include this line,
// therefore in the build.ps1 we have to append this aliasing module.
var eg = EndGate;
Number.prototype.Clone = function () {
    return this;
};
var EndGate;
(function (EndGate) {
    (function (Tweening) {
        /// <reference path="ITweeningFunction.ts" />
        (function (Functions) {
            /**
            * Defines a Back tweening function collection that has an EaseIn, EaseOut, and EaseInOut function that can be used with Tween's.
            */
            var Back = (function () {
                function Back() {
                }
                Object.defineProperty(Back, "EaseIn", {
                    get: /**
                    * Gets the Back EaseIn function.
                    */
                    function () {
                        return Back._easeIn;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(Back, "EaseOut", {
                    get: /**
                    * Gets the Back EaseOut function.
                    */
                    function () {
                        return Back._easeOut;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(Back, "EaseInOut", {
                    get: /**
                    * Gets the Back EaseInOut function.
                    */
                    function () {
                        return Back._easeInOut;
                    },
                    enumerable: true,
                    configurable: true
                });
                Back._easeIn = function (from, to, elapsed, duration) {
                    var change = to - from, elapsedMilliseconds = elapsed.Milliseconds;

                    return change * (elapsedMilliseconds /= duration.Milliseconds) * elapsedMilliseconds * ((1.70158 + 1) * elapsedMilliseconds - 1.70158) + from;
                };
                Back._easeOut = function (from, to, elapsed, duration) {
                    var change = to - from, elapsedMilliseconds = elapsed.Milliseconds;

                    return change * ((elapsedMilliseconds = elapsedMilliseconds / duration.Milliseconds - 1) * elapsedMilliseconds * ((1.70158 + 1) * elapsedMilliseconds + 1.70158) + 1) + from;
                };
                Back._easeInOut = function (from, to, elapsed, duration) {
                    var change = to - from, elapsedMilliseconds = elapsed.Milliseconds, constant = 1.70158;

                    if ((elapsedMilliseconds /= duration.Milliseconds / 2) < 1) {
                        return change / 2 * (elapsedMilliseconds * elapsedMilliseconds * (((constant *= (1.525)) + 1) * elapsedMilliseconds - constant)) + from;
                    }
                    return change / 2 * ((elapsedMilliseconds -= 2) * elapsedMilliseconds * (((constant *= (1.525)) + 1) * elapsedMilliseconds + constant) + 2) + from;
                };
                return Back;
            })();
            Functions.Back = Back;
        })(Tweening.Functions || (Tweening.Functions = {}));
        var Functions = Tweening.Functions;
    })(EndGate.Tweening || (EndGate.Tweening = {}));
    var Tweening = EndGate.Tweening;
})(EndGate || (EndGate = {}));
var EndGate;
(function (EndGate) {
    (function (Tweening) {
        /// <reference path="ITweeningFunction.ts" />
        (function (Functions) {
            /**
            * Defines a Bounce tweening function collection that has an EaseIn, EaseOut, and EaseInOut function that can be used with Tween's.
            */
            var Bounce = (function () {
                function Bounce() {
                }
                Object.defineProperty(Bounce, "EaseIn", {
                    get: /**
                    * Gets the Bounce EaseIn function.
                    */
                    function () {
                        return Bounce._easeIn;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(Bounce, "EaseOut", {
                    get: /**
                    * Gets the Bounce EaseOut function.
                    */
                    function () {
                        return Bounce._easeOut;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(Bounce, "EaseInOut", {
                    get: /**
                    * Gets the Bounce EaseInOut function.
                    */
                    function () {
                        return Bounce._easeInOut;
                    },
                    enumerable: true,
                    configurable: true
                });
                Bounce._easeIn = function (from, to, elapsed, duration) {
                    var change = to - from;

                    return change - Bounce.EaseOut(0, change, duration.Subtract(elapsed), duration) + from;
                };
                Bounce._easeOut = function (from, to, elapsed, duration) {
                    var change = to - from, elapsedMilliseconds = elapsed.Milliseconds;

                    if ((elapsedMilliseconds /= duration.Milliseconds) < (1 / 2.75)) {
                        return change * (7.5625 * elapsedMilliseconds * elapsedMilliseconds) + from;
                    } else if (elapsedMilliseconds < (2 / 2.75)) {
                        return change * (7.5625 * (elapsedMilliseconds -= (1.5 / 2.75)) * elapsedMilliseconds + .75) + from;
                    } else if (elapsedMilliseconds < (2.5 / 2.75)) {
                        return change * (7.5625 * (elapsedMilliseconds -= (2.25 / 2.75)) * elapsedMilliseconds + .9375) + from;
                    } else {
                        return change * (7.5625 * (elapsedMilliseconds -= (2.625 / 2.75)) * elapsedMilliseconds + .984375) + from;
                    }
                };
                Bounce._easeInOut = function (from, to, elapsed, duration) {
                    var change = to - from;

                    if (elapsed.Milliseconds < duration.Milliseconds / 2) {
                        return Bounce.EaseIn(0, change, elapsed.Multiply(2), duration) * 0.5 + from;
                    } else {
                        return Bounce.EaseOut(0, change, elapsed.Multiply(2).Subtract(duration), duration) * .5 + change * 0.5 + from;
                    }
                };
                return Bounce;
            })();
            Functions.Bounce = Bounce;
        })(Tweening.Functions || (Tweening.Functions = {}));
        var Functions = Tweening.Functions;
    })(EndGate.Tweening || (EndGate.Tweening = {}));
    var Tweening = EndGate.Tweening;
})(EndGate || (EndGate = {}));
var EndGate;
(function (EndGate) {
    (function (Tweening) {
        /// <reference path="ITweeningFunction.ts" />
        (function (Functions) {
            /**
            * Defines a Circular tweening function collection that has an EaseIn, EaseOut, and EaseInOut function that can be used with Tween's.
            */
            var Circular = (function () {
                function Circular() {
                }
                Object.defineProperty(Circular, "EaseIn", {
                    get: /**
                    * Gets the Circular EaseIn function.
                    */
                    function () {
                        return Circular._easeIn;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(Circular, "EaseOut", {
                    get: /**
                    * Gets the Circular EaseOut function.
                    */
                    function () {
                        return Circular._easeOut;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(Circular, "EaseInOut", {
                    get: /**
                    * Gets the Circular EaseInOut function.
                    */
                    function () {
                        return Circular._easeInOut;
                    },
                    enumerable: true,
                    configurable: true
                });
                Circular._easeIn = function (from, to, elapsed, duration) {
                    var change = to - from, elapsedMilliseconds = elapsed.Milliseconds;

                    return -change * (Math.sqrt(1 - (elapsedMilliseconds /= duration.Milliseconds) * elapsedMilliseconds) - 1) + from;
                };
                Circular._easeOut = function (from, to, elapsed, duration) {
                    var change = to - from, elapsedMilliseconds = elapsed.Milliseconds;

                    return change * Math.sqrt(1 - (elapsedMilliseconds = elapsedMilliseconds / duration.Milliseconds - 1) * elapsedMilliseconds) + from;
                };
                Circular._easeInOut = function (from, to, elapsed, duration) {
                    var change = to - from, elapsedMilliseconds = elapsed.Milliseconds;

                    if ((elapsedMilliseconds /= duration.Milliseconds / 2) < 1) {
                        return -change / 2 * (Math.sqrt(1 - elapsedMilliseconds * elapsedMilliseconds) - 1) + from;
                    }
                    return change / 2 * (Math.sqrt(1 - (elapsedMilliseconds -= 2) * elapsedMilliseconds) + 1) + from;
                };
                return Circular;
            })();
            Functions.Circular = Circular;
        })(Tweening.Functions || (Tweening.Functions = {}));
        var Functions = Tweening.Functions;
    })(EndGate.Tweening || (EndGate.Tweening = {}));
    var Tweening = EndGate.Tweening;
})(EndGate || (EndGate = {}));
var EndGate;
(function (EndGate) {
    (function (Tweening) {
        /// <reference path="ITweeningFunction.ts" />
        (function (Functions) {
            /**
            * Defines a Cubic tweening function collection that has an EaseIn, EaseOut, and EaseInOut function that can be used with Tween's.
            */
            var Cubic = (function () {
                function Cubic() {
                }
                Object.defineProperty(Cubic, "EaseIn", {
                    get: /**
                    * Gets the Cubic EaseIn function.
                    */
                    function () {
                        return Cubic._easeIn;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(Cubic, "EaseOut", {
                    get: /**
                    * Gets the Cubic EaseOut function.
                    */
                    function () {
                        return Cubic._easeOut;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(Cubic, "EaseInOut", {
                    get: /**
                    * Gets the Cubic EaseInOut function.
                    */
                    function () {
                        return Cubic._easeInOut;
                    },
                    enumerable: true,
                    configurable: true
                });
                Cubic._easeIn = function (from, to, elapsed, duration) {
                    var change = to - from, elapsedMilliseconds = elapsed.Milliseconds;

                    return change * (elapsedMilliseconds /= duration.Milliseconds) * elapsedMilliseconds * elapsedMilliseconds + from;
                };
                Cubic._easeOut = function (from, to, elapsed, duration) {
                    var change = to - from, elapsedMilliseconds = elapsed.Milliseconds;

                    return change * ((elapsedMilliseconds = elapsedMilliseconds / duration.Milliseconds - 1) * elapsedMilliseconds * elapsedMilliseconds + 1) + from;
                };
                Cubic._easeInOut = function (from, to, elapsed, duration) {
                    var change = to - from, elapsedMilliseconds = elapsed.Milliseconds;

                    if ((elapsedMilliseconds /= duration.Milliseconds / 2) < 1) {
                        return change / 2 * elapsedMilliseconds * elapsedMilliseconds * elapsedMilliseconds + from;
                    }
                    return change / 2 * ((elapsedMilliseconds -= 2) * elapsedMilliseconds * elapsedMilliseconds + 2) + from;
                };
                return Cubic;
            })();
            Functions.Cubic = Cubic;
        })(Tweening.Functions || (Tweening.Functions = {}));
        var Functions = Tweening.Functions;
    })(EndGate.Tweening || (EndGate.Tweening = {}));
    var Tweening = EndGate.Tweening;
})(EndGate || (EndGate = {}));
var EndGate;
(function (EndGate) {
    (function (Tweening) {
        /// <reference path="ITweeningFunction.ts" />
        (function (Functions) {
            /**
            * Defines an Elastic tweening function collection that has an EaseIn, EaseOut, and EaseInOut function that can be used with Tween's.
            */
            var Elastic = (function () {
                function Elastic() {
                }
                Object.defineProperty(Elastic, "EaseIn", {
                    get: /**
                    * Gets the Elastic EaseIn function.
                    */
                    function () {
                        return Elastic._easeIn;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(Elastic, "EaseOut", {
                    get: /**
                    * Gets the Elastic EaseOut function.
                    */
                    function () {
                        return Elastic._easeOut;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(Elastic, "EaseInOut", {
                    get: /**
                    * Gets the Elastic EaseInOut function.
                    */
                    function () {
                        return Elastic._easeInOut;
                    },
                    enumerable: true,
                    configurable: true
                });
                Elastic._easeIn = function (from, to, elapsed, duration) {
                    var change = to - from, elapsedMilliseconds = elapsed.Milliseconds, timePartial, timePartialQuarter;

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
                Elastic._easeOut = function (from, to, elapsed, duration) {
                    var change = to - from, elapsedMilliseconds = elapsed.Milliseconds, timePartial, timePartialQuarter;

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
                Elastic._easeInOut = function (from, to, elapsed, duration) {
                    var change = to - from, elapsedMilliseconds = elapsed.Milliseconds, timePartial, timePartialQuarter;

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
                return Elastic;
            })();
            Functions.Elastic = Elastic;
        })(Tweening.Functions || (Tweening.Functions = {}));
        var Functions = Tweening.Functions;
    })(EndGate.Tweening || (EndGate.Tweening = {}));
    var Tweening = EndGate.Tweening;
})(EndGate || (EndGate = {}));
var EndGate;
(function (EndGate) {
    (function (Tweening) {
        /// <reference path="ITweeningFunction.ts" />
        (function (Functions) {
            /**
            * Defines an Exponential tweening function collection that has an EaseIn, EaseOut, and EaseInOut function that can be used with Tween's.
            */
            var Exponential = (function () {
                function Exponential() {
                }
                Object.defineProperty(Exponential, "EaseIn", {
                    get: /**
                    * Gets the Exponential EaseIn function.
                    */
                    function () {
                        return Exponential._easeIn;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(Exponential, "EaseOut", {
                    get: /**
                    * Gets the Exponential EaseOut function.
                    */
                    function () {
                        return Exponential._easeOut;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(Exponential, "EaseInOut", {
                    get: /**
                    * Gets the Exponential EaseInOut function.
                    */
                    function () {
                        return Exponential._easeInOut;
                    },
                    enumerable: true,
                    configurable: true
                });
                Exponential._easeIn = function (from, to, elapsed, duration) {
                    var change = to - from, elapsedMilliseconds = elapsed.Milliseconds;

                    return (elapsedMilliseconds == 0) ? from : change * Math.pow(2, 10 * (elapsedMilliseconds / duration.Milliseconds - 1)) + from;
                };
                Exponential._easeOut = function (from, to, elapsed, duration) {
                    var change = to - from, elapsedMilliseconds = elapsed.Milliseconds;

                    return (elapsedMilliseconds == duration.Milliseconds) ? from + change : change * (-Math.pow(2, -10 * elapsedMilliseconds / duration.Milliseconds) + 1) + from;
                };
                Exponential._easeInOut = function (from, to, elapsed, duration) {
                    var change = to - from, elapsedMilliseconds = elapsed.Milliseconds;

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
                return Exponential;
            })();
            Functions.Exponential = Exponential;
        })(Tweening.Functions || (Tweening.Functions = {}));
        var Functions = Tweening.Functions;
    })(EndGate.Tweening || (EndGate.Tweening = {}));
    var Tweening = EndGate.Tweening;
})(EndGate || (EndGate = {}));
var EndGate;
(function (EndGate) {
    (function (Tweening) {
        /// <reference path="ITweeningFunction.ts" />
        (function (Functions) {
            /**
            * Defines a Linear tweening function that has an EaseNone function that can be used with Tween's.
            */
            var Linear = (function () {
                function Linear() {
                }
                Object.defineProperty(Linear, "EaseNone", {
                    get: /**
                    * Gets the Linear EaseNone function.
                    */
                    function () {
                        return Linear._easeNone;
                    },
                    enumerable: true,
                    configurable: true
                });
                Linear._easeNone = function (from, to, elapsed, duration) {
                    var change = to - from;

                    return change * elapsed.Milliseconds / duration.Milliseconds + from;
                };
                return Linear;
            })();
            Functions.Linear = Linear;
        })(Tweening.Functions || (Tweening.Functions = {}));
        var Functions = Tweening.Functions;
    })(EndGate.Tweening || (EndGate.Tweening = {}));
    var Tweening = EndGate.Tweening;
})(EndGate || (EndGate = {}));
var EndGate;
(function (EndGate) {
    (function (Tweening) {
        /// <reference path="ITweeningFunction.ts" />
        (function (Functions) {
            /**
            * Defines a Quadratic tweening function collection that has an EaseIn, EaseOut, and EaseInOut function that can be used with Tween's.
            */
            var Quadratic = (function () {
                function Quadratic() {
                }
                Object.defineProperty(Quadratic, "EaseIn", {
                    get: /**
                    * Gets the Quadratic EaseIn function.
                    */
                    function () {
                        return Quadratic._easeIn;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(Quadratic, "EaseOut", {
                    get: /**
                    * Gets the Quadratic EaseOut function.
                    */
                    function () {
                        return Quadratic._easeOut;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(Quadratic, "EaseInOut", {
                    get: /**
                    * Gets the Quadratic EaseInOut function.
                    */
                    function () {
                        return Quadratic._easeInOut;
                    },
                    enumerable: true,
                    configurable: true
                });
                Quadratic._easeIn = function (from, to, elapsed, duration) {
                    var change = to - from, elapsedMilliseconds = elapsed.Milliseconds;

                    return change * (elapsedMilliseconds /= duration.Milliseconds) * elapsedMilliseconds + from;
                };
                Quadratic._easeOut = function (from, to, elapsed, duration) {
                    var change = to - from, elapsedMilliseconds = elapsed.Milliseconds;

                    return -change * (elapsedMilliseconds /= duration.Milliseconds) * (elapsedMilliseconds - 2) + from;
                };
                Quadratic._easeInOut = function (from, to, elapsed, duration) {
                    var change = to - from, elapsedMilliseconds = elapsed.Milliseconds;

                    if ((elapsedMilliseconds /= duration.Milliseconds / 2) < 1) {
                        return change / 2 * elapsedMilliseconds * elapsedMilliseconds + from;
                    }

                    return -change / 2 * ((--elapsedMilliseconds) * (elapsedMilliseconds - 2) - 1) + from;
                };
                return Quadratic;
            })();
            Functions.Quadratic = Quadratic;
        })(Tweening.Functions || (Tweening.Functions = {}));
        var Functions = Tweening.Functions;
    })(EndGate.Tweening || (EndGate.Tweening = {}));
    var Tweening = EndGate.Tweening;
})(EndGate || (EndGate = {}));
var EndGate;
(function (EndGate) {
    (function (Tweening) {
        /// <reference path="ITweeningFunction.ts" />
        (function (Functions) {
            /**
            * Defines a Quartic tweening function collection that has an EaseIn, EaseOut, and EaseInOut function that can be used with Tween's.
            */
            var Quartic = (function () {
                function Quartic() {
                }
                Object.defineProperty(Quartic, "EaseIn", {
                    get: /**
                    * Gets the Quartic EaseIn function.
                    */
                    function () {
                        return Quartic._easeIn;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(Quartic, "EaseOut", {
                    get: /**
                    * Gets the Quartic EaseOut function.
                    */
                    function () {
                        return Quartic._easeOut;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(Quartic, "EaseInOut", {
                    get: /**
                    * Gets the Quartic EaseInOut function.
                    */
                    function () {
                        return Quartic._easeInOut;
                    },
                    enumerable: true,
                    configurable: true
                });
                Quartic._easeIn = function (from, to, elapsed, duration) {
                    var change = to - from, elapsedMilliseconds = elapsed.Milliseconds;

                    return change * (elapsedMilliseconds /= duration.Milliseconds) * elapsedMilliseconds * elapsedMilliseconds * elapsedMilliseconds + from;
                };
                Quartic._easeOut = function (from, to, elapsed, duration) {
                    var change = to - from, elapsedMilliseconds = elapsed.Milliseconds;

                    return -change * ((elapsedMilliseconds = elapsedMilliseconds / duration.Milliseconds - 1) * elapsedMilliseconds * elapsedMilliseconds * elapsedMilliseconds - 1) + from;
                };
                Quartic._easeInOut = function (from, to, elapsed, duration) {
                    var change = to - from, elapsedMilliseconds = elapsed.Milliseconds;

                    if ((elapsedMilliseconds /= duration.Milliseconds / 2) < 1) {
                        return change / 2 * elapsedMilliseconds * elapsedMilliseconds * elapsedMilliseconds * elapsedMilliseconds + from;
                    }
                    return -change / 2 * ((elapsedMilliseconds -= 2) * elapsedMilliseconds * elapsedMilliseconds * elapsedMilliseconds - 2) + from;
                };
                return Quartic;
            })();
            Functions.Quartic = Quartic;
        })(Tweening.Functions || (Tweening.Functions = {}));
        var Functions = Tweening.Functions;
    })(EndGate.Tweening || (EndGate.Tweening = {}));
    var Tweening = EndGate.Tweening;
})(EndGate || (EndGate = {}));
var EndGate;
(function (EndGate) {
    (function (Tweening) {
        /// <reference path="ITweeningFunction.ts" />
        (function (Functions) {
            /**
            * Defines a Quintic tweening function collection that has an EaseIn, EaseOut, and EaseInOut function that can be used with Tween's.
            */
            var Quintic = (function () {
                function Quintic() {
                }
                Object.defineProperty(Quintic, "EaseIn", {
                    get: /**
                    * Gets the Quintic EaseIn function.
                    */
                    function () {
                        return Quintic._easeIn;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(Quintic, "EaseOut", {
                    get: /**
                    * Gets the Quintic EaseOut function.
                    */
                    function () {
                        return Quintic._easeOut;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(Quintic, "EaseInOut", {
                    get: /**
                    * Gets the Quintic EaseInOut function.
                    */
                    function () {
                        return Quintic._easeInOut;
                    },
                    enumerable: true,
                    configurable: true
                });
                Quintic._easeIn = function (from, to, elapsed, duration) {
                    var change = to - from, elapsedMilliseconds = elapsed.Milliseconds;

                    return change * (elapsedMilliseconds /= duration.Milliseconds) * elapsedMilliseconds * elapsedMilliseconds * elapsedMilliseconds * elapsedMilliseconds + from;
                };
                Quintic._easeOut = function (from, to, elapsed, duration) {
                    var change = to - from, elapsedMilliseconds = elapsed.Milliseconds;

                    return change * ((elapsedMilliseconds = elapsedMilliseconds / duration.Milliseconds - 1) * elapsedMilliseconds * elapsedMilliseconds * elapsedMilliseconds * elapsedMilliseconds + 1) + from;
                };
                Quintic._easeInOut = function (from, to, elapsed, duration) {
                    var change = to - from, elapsedMilliseconds = elapsed.Milliseconds;

                    if ((elapsedMilliseconds /= duration.Milliseconds / 2) < 1) {
                        return change / 2 * elapsedMilliseconds * elapsedMilliseconds * elapsedMilliseconds * elapsedMilliseconds * elapsedMilliseconds + from;
                    }
                    return change / 2 * ((elapsedMilliseconds -= 2) * elapsedMilliseconds * elapsedMilliseconds * elapsedMilliseconds * elapsedMilliseconds + 2) + from;
                };
                return Quintic;
            })();
            Functions.Quintic = Quintic;
        })(Tweening.Functions || (Tweening.Functions = {}));
        var Functions = Tweening.Functions;
    })(EndGate.Tweening || (EndGate.Tweening = {}));
    var Tweening = EndGate.Tweening;
})(EndGate || (EndGate = {}));
var EndGate;
(function (EndGate) {
    (function (Tweening) {
        /// <reference path="ITweeningFunction.ts" />
        (function (Functions) {
            /**
            * Defines a Sinusoidal tweening function collection that has an EaseIn, EaseOut, and EaseInOut function that can be used with Tween's.
            */
            var Sinusoidal = (function () {
                function Sinusoidal() {
                }
                Object.defineProperty(Sinusoidal, "EaseIn", {
                    get: /**
                    * Gets the Sinusoidal EaseIn function.
                    */
                    function () {
                        return Sinusoidal._easeIn;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(Sinusoidal, "EaseOut", {
                    get: /**
                    * Gets the Sinusoidal EaseOut function.
                    */
                    function () {
                        return Sinusoidal._easeOut;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(Sinusoidal, "EaseInOut", {
                    get: /**
                    * Gets the Sinusoidal EaseInOut function.
                    */
                    function () {
                        return Sinusoidal._easeInOut;
                    },
                    enumerable: true,
                    configurable: true
                });
                Sinusoidal._easeIn = function (from, to, elapsed, duration) {
                    var change = to - from, elapsedMilliseconds = elapsed.Milliseconds;

                    return -change * Math.cos(elapsedMilliseconds / duration.Milliseconds * (Math.PI / 2)) + change + from;
                };
                Sinusoidal._easeOut = function (from, to, elapsed, duration) {
                    var change = to - from, elapsedMilliseconds = elapsed.Milliseconds;

                    return change * Math.sin(elapsedMilliseconds / duration.Milliseconds * (Math.PI / 2)) + from;
                };
                Sinusoidal._easeInOut = function (from, to, elapsed, duration) {
                    var change = to - from, elapsedMilliseconds = elapsed.Milliseconds;

                    return -change / 2 * (Math.cos(Math.PI * elapsedMilliseconds / duration.Milliseconds) - 1) + from;
                };
                return Sinusoidal;
            })();
            Functions.Sinusoidal = Sinusoidal;
        })(Tweening.Functions || (Tweening.Functions = {}));
        var Functions = Tweening.Functions;
    })(EndGate.Tweening || (EndGate.Tweening = {}));
    var Tweening = EndGate.Tweening;
})(EndGate || (EndGate = {}));
var EndGate;
(function (EndGate) {
    /// <reference path="Functions/ITweeningFunction.ts" />
    /// <reference path="../Assets/TimeSpan.ts" />
    /// <reference path="../Utilities/EventHandler1.ts" />
    /// <reference path="../Interfaces/ICloneable.ts" />
    /// <reference path="../Interfaces/IUpdateable.ts" />
    /// <reference path="../GameTime.ts" />
    (function (Tweening) {
        /**
        * Defines a base Tween class that is used to move a value from a start value to an end value.
        */
        var Tween = (function () {
            /**
            * Creates a new instance of the Tween object.  This should only ever be called from derived classes via a super constructor call.
            * @param from Start value.
            * @param to End value.
            * @param duration How fast to move the current value from start to end.
            * @param tweeningFunction The function to use to translate the current value from start to end.  Different functions result in different translation behavior.
            */
            function Tween(from, to, duration, tweeningFunction) {
                this._from = from.Clone();
                this._to = to.Clone();
                this._current = this._from.Clone();
                this._duration = duration;
                this._elapsed = EndGate.TimeSpan.Zero;
                this._playing = false;
                this._onChange = new EndGate.EventHandler1();
                this._onComplete = new EndGate.EventHandler1();
                this._tweeningFunction = tweeningFunction;
            }
            Object.defineProperty(Tween.prototype, "OnChange", {
                get: /**
                * Gets an event that is triggered when the tween has changed its Current value, occurs directly after a tween update.  Functions can be bound or unbound to this event to be executed when the event triggers.
                */
                function () {
                    return this._onChange;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Tween.prototype, "OnComplete", {
                get: /**
                * Gets an event that is triggered when the tween has completed transitioning the Current value, once triggered Elapsed will be equivalent to Duration and Current will be equivalent to To.  Functions can be bound or unbound to this event to be executed when the event triggers.
                */
                function () {
                    return this._onComplete;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Tween.prototype, "From", {
                get: /**
                * Gets or sets the From component of the tween.
                */
                function () {
                    return this._from;
                },
                set: function (from) {
                    this._from = from;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Tween.prototype, "To", {
                get: /**
                * Gets or sets the To component of the tween.
                */
                function () {
                    return this._to;
                },
                set: function (to) {
                    this._to = to;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Tween.prototype, "Current", {
                get: /**
                * Gets or sets the Current component of the tween.  The Current is the current value of the tween, the final value of Current will be equivalent to To when the tween has completed.
                */
                function () {
                    return this._current;
                },
                set: function (current) {
                    this._current = current;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Tween.prototype, "Duration", {
                get: /**
                * Gets or sets the Duration component of the tween.  The Duration is how long the tween will take to go From -> To.
                */
                function () {
                    return this._duration;
                },
                set: function (duration) {
                    this._duration = duration;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Tween.prototype, "Elapsed", {
                get: /**
                * Gets or the Elapsed component of the tween.  Elapsed represents how far along the tween is.  When Elapsed equals Duration the tween is completed.
                */
                function () {
                    return this._elapsed.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Tween.prototype, "TweeningFunction", {
                get: /**
                * Gets or sets the TweeningFunction of the tween.  The TweeningFunction controls how the tween translates the Current value to the To value.
                */
                function () {
                    return this._tweeningFunction;
                },
                set: function (fn) {
                    this._tweeningFunction = fn;
                },
                enumerable: true,
                configurable: true
            });

            /**
            * Determines if the tween is playing.
            */
            Tween.prototype.IsPlaying = function () {
                return this._playing;
            };

            /**
            * Starts playing the tween.  The tween will only start translating the value if Update is called.
            */
            Tween.prototype.Play = function () {
                this._playing = true;
            };

            /**
            * Pauses the tween.  Calls to update will not translate the tween when paused.
            */
            Tween.prototype.Pause = function () {
                this._playing = false;
            };

            /**
            * Resets the tween to the To location and resets the Elapsed time.  This does not stop or start the tween.
            */
            Tween.prototype.Reset = function () {
                this._elapsed.Milliseconds = 0;
                this._current = this._from.Clone();
            };

            /**
            * Stops the tween from playing.  This also resets the tween to its To value.
            */
            Tween.prototype.Stop = function () {
                this._playing = false;
                this.Reset();
            };

            /**
            * Restarts the tween.  Essentially calls Reset and then Play.
            */
            Tween.prototype.Restart = function () {
                this.Reset();
                this.Play();
            };

            /**
            * Reverses the tween from the Current value back to the From value.  This changes the To component to equal the From value and the From value to equal the Current value.
            */
            Tween.prototype.Reverse = function () {
                this._elapsed = EndGate.TimeSpan.Zero;
                this._to = this._from;
                this._from = this.Current.Clone();
            };

            /**
            * Updates the tweens Current and Elapsed component if the tween is playing.
            * @param gameTime The global game time object.  Used to represent total time running and used to track update interval elapsed speeds.
            */
            Tween.prototype.Update = function (gameTime) {
                if (!this._playing || (this._elapsed.Equivalent(this._duration))) {
                    return;
                }

                this._elapsed = this._elapsed.Add(gameTime.Elapsed);

                if (this._elapsed.Milliseconds >= this._duration.Milliseconds) {
                    this._elapsed = this._duration.Clone();

                    this._current = this._to.Clone();
                    this._playing = false;

                    this._onChange.Trigger(this._current.Clone());
                    this._onComplete.Trigger(this);
                } else {
                    this._UpdateTween();
                    this._onChange.Trigger(this._current.Clone());
                }
            };

            Tween.prototype._UpdateTween = function () {
            };
            return Tween;
        })();
        Tweening.Tween = Tween;
    })(EndGate.Tweening || (EndGate.Tweening = {}));
    var Tweening = EndGate.Tweening;
})(EndGate || (EndGate = {}));
var EndGate;
(function (EndGate) {
    /// <reference path="Tween.ts" />
    /// <reference path="../Extensions/NumberExtensions.ts" />
    (function (Tweening) {
        /**
        * Defines a NumberTween class that is used to move a number from a start value to an end value.
        */
        var NumberTween = (function (_super) {
            __extends(NumberTween, _super);
            /**
            * Creates a new instance of the NumberTween object.
            * @param from Start number.
            * @param to End number.
            * @param duration How fast to move the current number from start to end.
            * @param tweeningFunction The function to use to translate the current number from start to end.  Different functions result in different translation behavior.
            */
            function NumberTween(from, to, duration, tweeningFunction) {
                _super.call(this, from, to, duration, tweeningFunction);
            }
            NumberTween.prototype._UpdateTween = function () {
                this.Current = this.TweeningFunction(this.From, this.To, this.Elapsed, this.Duration);
            };
            return NumberTween;
        })(Tweening.Tween);
        Tweening.NumberTween = NumberTween;
    })(EndGate.Tweening || (EndGate.Tweening = {}));
    var Tweening = EndGate.Tweening;
})(EndGate || (EndGate = {}));
var EndGate;
(function (EndGate) {
    /// <reference path="Tween.ts" />
    /// <reference path="../Assets/Sizes/Size2d.ts" />
    (function (Tweening) {
        /**
        * Defines a Size2dTween class that is used to move a Size2d from a start value to an end value.
        */
        var Size2dTween = (function (_super) {
            __extends(Size2dTween, _super);
            /**
            * Creates a new instance of the Size2dTween object.
            * @param from Start Size2d.
            * @param to End Size2d.
            * @param duration How fast to move the current Size2d from start to end.
            * @param tweeningFunction The function to use to translate the current Size2d from start to end.  Different functions result in different translation behavior.
            */
            function Size2dTween(from, to, duration, tweeningFunction) {
                _super.call(this, from, to, duration, tweeningFunction);
            }
            Size2dTween.prototype._UpdateTween = function () {
                this.Current = new EndGate.Size2d(this.TweeningFunction(this.From.Width, this.To.Width, this.Elapsed, this.Duration), this.TweeningFunction(this.From.Height, this.To.Height, this.Elapsed, this.Duration));
            };
            return Size2dTween;
        })(Tweening.Tween);
        Tweening.Size2dTween = Size2dTween;
    })(EndGate.Tweening || (EndGate.Tweening = {}));
    var Tweening = EndGate.Tweening;
})(EndGate || (EndGate = {}));
var EndGate;
(function (EndGate) {
    /// <reference path="Tween.ts" />
    /// <reference path="../Assets/Vectors/Vector2d.ts" />
    (function (Tweening) {
        /**
        * Defines a Vector2dTween class that is used to move a Vector2d from a start value to an end value.
        */
        var Vector2dTween = (function (_super) {
            __extends(Vector2dTween, _super);
            /**
            * Creates a new instance of the Vector2dTween object.
            * @param from Start Vector2d.
            * @param to End Vector2d.
            * @param duration How fast to move the current Vector2d from start to end.
            * @param tweeningFunction The function to use to translate the current Vector2d from start to end.  Different functions result in different translation behavior.
            */
            function Vector2dTween(from, to, duration, tweeningFunction) {
                _super.call(this, from, to, duration, tweeningFunction);
            }
            Vector2dTween.prototype._UpdateTween = function () {
                this.Current = new EndGate.Vector2d(this.TweeningFunction(this.From.X, this.To.X, this.Elapsed, this.Duration), this.TweeningFunction(this.From.Y, this.To.Y, this.Elapsed, this.Duration));
            };
            return Vector2dTween;
        })(Tweening.Tween);
        Tweening.Vector2dTween = Vector2dTween;
    })(EndGate.Tweening || (EndGate.Tweening = {}));
    var Tweening = EndGate.Tweening;
})(EndGate || (EndGate = {}));
/// <reference path="../Interfaces/IDisposable.ts" />
/// <reference path="../Interfaces/ITyped.ts" />
var EndGate;
(function (EndGate) {
    /**
    * Defines a type constrained event handler object that can maintain bound functions which take in a value T, U and V and trigger them on demand.
    */
    var EventHandler3 = (function () {
        /**
        * Creates a new instance of the EventHandler3 object.
        */
        function EventHandler3() {
            this._type = "Event";
            this._actions = [];
            this._hasBindings = false;
        }
        /**
        * Binds the provided action to the EventHandler3.  Trigger will execute all bound functions.
        * @param action Function to execute on EventHandler3 Trigger.
        */
        EventHandler3.prototype.Bind = function (action) {
            this._actions.push(action);
            this._hasBindings = true;
        };

        /**
        * Unbinds the provided action from the EventHandler3.
        * @param action Function to unbind.  The action will no longer be executed when the EventHandler gets Triggered.
        */
        EventHandler3.prototype.Unbind = function (action) {
            for (var i = 0; i < this._actions.length; i++) {
                if (this._actions[i] === action) {
                    this._actions.splice(i, 1);

                    this._hasBindings = this._actions.length > 0;
                    return;
                }
            }
        };

        /**
        * Determines if the EventHandler3 has active bindings.
        */
        EventHandler3.prototype.HasBindings = function () {
            return this._hasBindings;
        };

        /**
        * Executes all bound functions and passes the provided args to each.
        * @param val1 The first argument to pass to the bound functions.
        * @param val2 The second argument to pass to the bound functions.
        * @param val3 The third argument to pass to the bound functions.
        */
        EventHandler3.prototype.Trigger = function (val1, val2, val3) {
            for (var i = 0; i < this._actions.length; i++) {
                this._actions[i](val1, val2, val3);
            }
        };
        return EventHandler3;
    })();
    EndGate.EventHandler3 = EventHandler3;
})(EndGate || (EndGate = {}));
