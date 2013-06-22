/// <reference path="../../Interfaces/ITyped.ts" />
/// <reference path="../Sizes/Size2d.ts" />
/// <reference path="../../Extensions/MathExtensions.ts" />
var eg;
(function (eg) {
    /**
    * Defines a two dimensional vector object which specifies an X and Y.
    */
    var Vector2d = (function () {
        function Vector2d(x, y) {
            this._type = "Vector2d";
            this.X = x || 0;
            this.Y = y || 0;
        }
        /**
        * Returns a Vector2d that's reflected over the normal.
        * @param normal The normal to reflect over.
        */
        Vector2d.prototype.Reflect = function (normal) {
            var normalUnit = normal.Unit(), num = this.Dot(normalUnit) * 2;

            return new Vector2d(this.X - num * normalUnit.X, this.Y - num * normalUnit.Y);
        };

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
    eg.Vector2d = Vector2d;
})(eg || (eg = {}));
