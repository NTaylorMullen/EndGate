var EndGate;
(function (EndGate) {
    (function (Core) {
        (function (Assets) {
            var Size2d = (function () {
                function Size2d(width, height) {
                    this._typed = "Size2d";
                    this.Width = width || 0;
                    this.Height = typeof height !== "undefined" ? height : this.Width;
                }
                Size2d.prototype.Radius = function () {
                    return .5 * Math.sqrt(this.Width * this.Width + this.Height * this.Height);
                };
                Size2d.prototype.Add = function (val) {
                    if(val._type === "Size2d") {
                        return new Size2d(this.X + val.X, this.Y + val.Y);
                    } else {
                        return new Size2d(this.X + val, this.Y + val);
                    }
                };
                Size2d.prototype.Multiply = function (val) {
                    if(val._type === "Size2d") {
                        return new Size2d(this.X * val.X, this.Y * val.Y);
                    } else {
                        return new Size2d(this.X * val, this.Y * val);
                    }
                };
                Size2d.prototype.Subtract = function (val) {
                    if(val._type === "Size2d") {
                        return new Size2d(this.X - val.X, this.Y - val.Y);
                    } else {
                        return new Size2d(this.X - val, this.Y - val);
                    }
                };
                Size2d.prototype.SubtractFrom = function (val) {
                    if(val._type === "Size2d") {
                        return new Size2d(val.X - this.X, val.Y - this.Y);
                    } else {
                        return new Size2d(val - this.X, val - this.Y);
                    }
                };
                Size2d.prototype.Divide = function (val) {
                    if(val._type === "Size2d") {
                        return new Size2d(this.X / val.X, this.Y / val.Y);
                    } else {
                        return new Size2d(this.X / val, this.Y / val);
                    }
                };
                Size2d.prototype.DivideFrom = function (val) {
                    if(val._type === "Size2d") {
                        return new Size2d(val.X / this.X, val.Y / this.Y);
                    } else {
                        return new Size2d(val / this.X, val / this.Y);
                    }
                };
                Size2d.prototype.Negate = function () {
                    return new Size2d(this.X * -1, this.Y * -1);
                };
                Size2d.prototype.Equivalent = function (v) {
                    return this.X === v.X && this.Y === v.Y;
                };
                Size2d.prototype.Clone = function () {
                    return new Size2d(this.X, this.Y);
                };
                Size2d.prototype.toString = function () {
                    return "(" + this.X + ", " + this.Y + ")";
                };
                return Size2d;
            })();
            Assets.Size2d = Size2d;            
        })(Core.Assets || (Core.Assets = {}));
        var Assets = Core.Assets;
    })(EndGate.Core || (EndGate.Core = {}));
    var Core = EndGate.Core;
})(EndGate || (EndGate = {}));
