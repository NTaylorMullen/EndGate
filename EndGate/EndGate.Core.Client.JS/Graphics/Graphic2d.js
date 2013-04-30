var EndGate;
(function (EndGate) {
    (function (Graphics) {
        (function (Abstractions) {
            var Graphic2d = (function () {
                function Graphic2d(position) {
                    this._type = "Graphic2d";
                    this.Position = position;
                    this.Rotation = 0;
                    this.ZIndex = 0;
                    this.State = new Graphics.Assets.Graphic2dState();
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
