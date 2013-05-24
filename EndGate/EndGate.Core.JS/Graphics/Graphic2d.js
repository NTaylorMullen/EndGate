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
            var Graphic2d = (function () {
                function Graphic2d(position) {
                    this._type = "Graphic2d";
                    this.Position = position;
                    this.Rotation = 0;
                    this.ZIndex = 0;
                    this.State = new Graphics.Assets.Graphic2dState();
                    this._children = [];
                }
                Graphic2d._zindexSort = function (a, b) {
                    return a.ZIndex - b.ZIndex;
                };
                Graphic2d.prototype.AddChild = function (graphic) {
                    this._children.push(graphic);
                    this._children.sort(Graphic2d._zindexSort);
                };
                Graphic2d.prototype.RemoveChild = function (graphic) {
                    var index = this._children.indexOf(graphic);
                    if(index >= 0) {
                        this._children.splice(index, 1);
                        return true;
                    }
                    return false;
                };
                Graphic2d.prototype.Children = function () {
                    return this._children;
                };
                Graphic2d.prototype.StartDraw = function (context) {
                    context.save();
                    this.State.SetContextState(context);
                    context.translate(this.Position.X, this.Position.Y);
                    if(this.Rotation !== 0) {
                        context.rotate(this.Rotation);
                    }
                };
                Graphic2d.prototype.EndDraw = function (context) {
                    for(var i = 0; i < this._children.length; i++) {
                        this._children[i].Draw(context);
                    }
                    context.restore();
                };
                Graphic2d.prototype.Draw = function (context) {
                };
                Graphic2d.prototype.GetDrawBounds = function () {
                    throw new Error("GetDrawBounds is abstract, it must be implemented.");
                };
                return Graphic2d;
            })();
            Abstractions.Graphic2d = Graphic2d;            
        })(Graphics.Abstractions || (Graphics.Abstractions = {}));
        var Abstractions = Graphics.Abstractions;
    })(EndGate.Graphics || (EndGate.Graphics = {}));
    var Graphics = EndGate.Graphics;
})(EndGate || (EndGate = {}));
//@ sourceMappingURL=Graphic2d.js.map
