var EndGate;
(function (EndGate) {
    (function (Core) {
        (function (Graphics) {
            var Graphic2d = (function () {
                function Graphic2d(bounds) {
                    this._type = "Graphic2d";
                    for(var property in bounds) {
                        this[property] = bounds[property];
                    }
                    this.ZIndex = 0;
                    this.State = new Graphics.Graphic2dState();
                }
                Graphic2d.prototype.StartDraw = function (context) {
                    context.save();
                    this.State.SetContextState(context);
                    if(this.Rotation !== 0) {
                        context.translate(this.Position.X, this.Position.Y);
                        context.rotate(this.Rotation);
                        context.translate(-this.Position.X, -this.Position.Y);
                    }
                };
                Graphic2d.prototype.EndDraw = function (context) {
                    context.restore();
                };
                Graphic2d.prototype.Draw = function (context) {
                };
                Graphic2d.prototype.ContainsPoint = function (point) {
                    throw new Error("This method is abstract!");
                };
                Graphic2d.prototype.Intersects = function (obj) {
                    if(obj._type === "BoundingCircle") {
                        return this.IntersectsCircle(obj);
                    } else if(obj._type === "BoundingRectangle") {
                        return this.IntersectsRectangle(obj);
                    } else {
                        throw new Error("Cannot intersect with unidentifiable object, must be BoundingCircle or BoundingRectangle");
                    }
                };
                Graphic2d.prototype.IntersectsCircle = function (circle) {
                    throw new Error("This method is abstract!");
                };
                Graphic2d.prototype.IntersectsRectangle = function (rectangle) {
                    throw new Error("This method is abstract!");
                };
                return Graphic2d;
            })();
            Graphics.Graphic2d = Graphic2d;            
        })(Core.Graphics || (Core.Graphics = {}));
        var Graphics = Core.Graphics;
    })(EndGate.Core || (EndGate.Core = {}));
    var Core = EndGate.Core;
})(EndGate || (EndGate = {}));
//@ sourceMappingURL=Graphic2d.js.map
