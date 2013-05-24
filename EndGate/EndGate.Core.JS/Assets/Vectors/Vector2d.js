/// <reference path="../../Interfaces/ITyped.ts" />
/// <reference path="../Sizes/Size2d.ts" />
/// <reference path="../../Extensions/MathExtensions.ts" />
var EndGate;
(function (EndGate) {
    var Vector2d = (function () {
        function Vector2d(x, y) {
            this._type = "Vector2d";
            this.X = x || 0;
            this.Y = y || 0;
        }
        Vector2d.Zero = function Zero() {
            return new Vector2d(0, 0);
        };
        Vector2d.One = function One() {
            return new Vector2d(1, 1);
        };
        Vector2d.prototype.ProjectOnto = function (v) {
            return v.Multiply(this.Dot(v) / v.Dot(v));
        };
        Vector2d.prototype.RotateAround = function (point, angle, precision) {
            if (typeof precision === "undefined") { precision = 2; }
            var ca = Math.cos(angle);
            var sa = Math.sin(angle);
            return new Vector2d(Math.roundTo(ca * (this.X - point.X) - sa * (this.Y - point.Y) + point.X, precision), Math.roundTo(sa * (this.X - point.X) + ca * (this.Y - point.Y) + point.Y, precision));
        };
        Vector2d.prototype.Apply = function (action) {
            this.X = action(this.X);
            this.Y = action(this.Y);
        };
        Vector2d.prototype.Trigger = function (action) {
            action(this.X);
            action(this.Y);
        };
        Vector2d.prototype.Normalized = function () {
            var magnitude = this.Magnitude();
            return new Vector2d(this.X / magnitude, this.Y / magnitude);
        };
        Vector2d.prototype.Magnitude = function () {
            return Math.sqrt(this.X * this.X + this.Y * this.Y);
        };
        Vector2d.prototype.Length = function () {
            return this.Magnitude();
        };
        Vector2d.prototype.Dot = function (v1) {
            return v1.X * this.X + v1.Y * this.Y;
        };
        Vector2d.prototype.Abs = function () {
            return new Vector2d(Math.abs(this.X), Math.abs(this.Y));
        };
        Vector2d.prototype.Sign = function () {
            return new Vector2d(this.X / Math.abs(this.X), this.Y / Math.abs(this.Y));
        };
        Vector2d.prototype.Distance = function (v1) {
            return new Vector2d(Math.abs(v1.X - this.X), Math.abs(v1.Y - this.Y));
        };
        Vector2d.prototype.Add = function (val) {
            if(val._type === "Vector2d") {
                return new Vector2d(this.X + val.X, this.Y + val.Y);
            } else if(val._type === "Size2d") {
                return new Vector2d(this.X + val.Width, this.Y + val.Height);
            } else {
                return new Vector2d(this.X + val, this.Y + val);
            }
        };
        Vector2d.prototype.Multiply = function (val) {
            if(val._type === "Vector2d") {
                return new Vector2d(this.X * val.X, this.Y * val.Y);
            } else if(val._type === "Size2d") {
                return new Vector2d(this.X * val.Width, this.Y * val.Height);
            } else {
                return new Vector2d(this.X * val, this.Y * val);
            }
        };
        Vector2d.prototype.Subtract = function (val) {
            if(val._type === "Vector2d") {
                return new Vector2d(this.X - val.X, this.Y - val.Y);
            } else if(val._type === "Size2d") {
                return new Vector2d(this.X - val.Width, this.Y - val.Height);
            } else {
                return new Vector2d(this.X - val, this.Y - val);
            }
        };
        Vector2d.prototype.SubtractFrom = function (val) {
            if(val._type === "Vector2d") {
                return new Vector2d(val.X - this.X, val.Y - this.Y);
            } else if(val._type === "Size2d") {
                return new Vector2d(val.Width - this.X, val.Height = this.Y);
            } else {
                return new Vector2d(val - this.X, val - this.Y);
            }
        };
        Vector2d.prototype.Divide = function (val) {
            if(val._type === "Vector2d") {
                return new Vector2d(this.X / val.X, this.Y / val.Y);
            } else if(val._type === "Size2d") {
                return new Vector2d(this.X / val.Width, this.Y / val.Height);
            } else {
                return new Vector2d(this.X / val, this.Y / val);
            }
        };
        Vector2d.prototype.DivideFrom = function (val) {
            if(val._type === "Vector2d") {
                return new Vector2d(val.X / this.X, val.Y / this.Y);
            } else if(val._type === "Size2d") {
                return new Vector2d(val.Width / this.X, val.Height / this.Y);
            } else {
                return new Vector2d(val / this.X, val / this.Y);
            }
        };
        Vector2d.prototype.IsZero = function () {
            return this.X === 0 && this.Y === 0;
        };
        Vector2d.prototype.Negate = function () {
            return new Vector2d(this.X * -1, this.Y * -1);
        };
        Vector2d.prototype.Equivalent = function (v) {
            return this.X === v.X && this.Y === v.Y;
        };
        Vector2d.prototype.Clone = function () {
            return new Vector2d(this.X, this.Y);
        };
        Vector2d.prototype.toString = // toString override
        function () {
            return "(" + this.X + ", " + this.Y + ")";
        };
        return Vector2d;
    })();
    EndGate.Vector2d = Vector2d;    
})(EndGate || (EndGate = {}));
//@ sourceMappingURL=Vector2d.js.map
