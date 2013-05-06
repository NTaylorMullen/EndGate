var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var EndGate;
(function (EndGate) {
    (function (Graphics) {
        var Line = (function (_super) {
            __extends(Line, _super);
            function Line(fromX, fromY, toX, toY, color) {
                _super.call(this, Vector2d.Zero(), color);
                this._type = "Line";
                this._from = new Vector2d(fromX, fromY);
                this._to = new Vector2d(toX, toY);
                this.UpdatePosition();
            }
            Line.prototype.From = function (newPosition) {
                return this.GetOrSetLinePoint("from", newPosition);
            };
            Line.prototype.To = function (newPosition) {
                return this.GetOrSetLinePoint("to", newPosition);
            };
            Line.prototype.BuildPath = function (context) {
                context.moveTo(this._from.X - this.Position.X, this._from.Y - this.Position.Y);
                context.lineTo(this._to.X - this.Position.X, this._to.Y - this.Position.Y);
                context.stroke();
            };
            Line.prototype.GetDrawBounds = function () {
                var bounds = new Bounds.BoundingRectangle(this.Position, new Size2d(1, 1));
                bounds.Rotation = this.Rotation;
                return bounds;
            };
            Line.prototype.UpdatePosition = function () {
                this.Position = ((this._from.Add(this._to)).Divide(2));
            };
            Line.prototype.GetOrSetLinePoint = function (name, newPosition) {
                if(typeof newPosition === "undefined") {
                    this["_" + name] = newPosition;
                    this.UpdatePosition();
                }
                return this["_" + name];
            };
            return Line;
        })(Abstractions.Shape);
        Graphics.Line = Line;        
    })(EndGate.Graphics || (EndGate.Graphics = {}));
    var Graphics = EndGate.Graphics;
})(EndGate || (EndGate = {}));
//@ sourceMappingURL=Line.js.map
