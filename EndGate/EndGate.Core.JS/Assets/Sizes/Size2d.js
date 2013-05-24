/// <reference path="../Vectors/Vector2d.ts" />
/// <reference path="../../Interfaces/ITyped.ts" />
var EndGate;
(function (EndGate) {
    var Size2d = (function () {
        function Size2d(width, height) {
            this._type = "Size2d";
            this.Width = width || 0;
            this.Height = typeof height !== "undefined" ? height : this.Width;
        }
        Size2d.Zero = function Zero() {
            return new Size2d(0, 0);
        };
        Size2d.One = function One() {
            return new Size2d(1, 1);
        };
        Size2d.prototype.Radius = function () {
            return .5 * Math.sqrt(this.Width * this.Width + this.Height * this.Height);
        };
        Size2d.prototype.HalfWidth = function () {
            return this.Width / 2;
        };
        Size2d.prototype.HalfHeight = function () {
            return this.Height / 2;
        };
        Size2d.prototype.Apply = function (action) {
            this.Width = action(this.Width);
            this.Height = action(this.Height);
        };
        Size2d.prototype.Trigger = function (action) {
            action(this.Width);
            action(this.Height);
        };
        Size2d.prototype.Add = function (val) {
            if(val._type === "Size2d") {
                return new Size2d(this.Width + val.Width, this.Height + val.Height);
            } else if(val._type === "Vector2d") {
                return new Size2d(this.Width + val.X, this.Height + val.Y);
            } else {
                return new Size2d(this.Width + val, this.Height + val);
            }
        };
        Size2d.prototype.Multiply = function (val) {
            if(val._type === "Size2d") {
                return new Size2d(this.Width * val.Width, this.Height * val.Height);
            } else if(val._type === "Vector2d") {
                return new Size2d(this.Width * val.X, this.Height * val.Y);
            } else {
                return new Size2d(this.Width * val, this.Height * val);
            }
        };
        Size2d.prototype.Subtract = function (val) {
            if(val._type === "Size2d") {
                return new Size2d(this.Width - val.Width, this.Height - val.Height);
            } else if(val._type === "Vector2d") {
                return new Size2d(this.Width - val.X, this.Height - val.Y);
            } else {
                return new Size2d(this.Width - val, this.Height - val);
            }
        };
        Size2d.prototype.SubtractFrom = function (val) {
            if(val._type === "Size2d") {
                return new Size2d(val.Width - this.Width, val.Height - this.Height);
            } else if(val._type === "Vector2d") {
                return new Size2d(val.X - this.Width, val.Y - this.Height);
            } else {
                return new Size2d(val - this.Width, val - this.Height);
            }
        };
        Size2d.prototype.Divide = function (val) {
            if(val._type === "Size2d") {
                return new Size2d(this.Width / val.Width, this.Height / val.Height);
            } else if(val._type === "Vector2d") {
                return new Size2d(this.Width / val.X, this.Height / val.Y);
            } else {
                return new Size2d(this.Width / val, this.Height / val);
            }
        };
        Size2d.prototype.DivideFrom = function (val) {
            if(val._type === "Size2d") {
                return new Size2d(val.Width / this.Width, val.Height / this.Height);
            } else if(val._type === "Vector2d") {
                return new Size2d(val.X / this.Width, val.Y / this.Height);
            } else {
                return new Size2d(val / this.Width, val / this.Height);
            }
        };
        Size2d.prototype.Negate = function () {
            return new Size2d(this.Width * -1, this.Height * -1);
        };
        Size2d.prototype.Equivalent = function (v) {
            return this.Width === v.Width && this.Height === v.Height;
        };
        Size2d.prototype.Clone = function () {
            return new Size2d(this.Width, this.Height);
        };
        Size2d.prototype.toString = // toString override
        function () {
            return "(" + this.Width + ", " + this.Height + ")";
        };
        return Size2d;
    })();
    EndGate.Size2d = Size2d;    
})(EndGate || (EndGate = {}));
