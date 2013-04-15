var EndGate;
(function (EndGate) {
    (function (Core) {
        (function (Graphics) {
            var Graphic2d = (function () {
                function Graphic2d(position, size) {
                    this._type = "Graphic2d";
                    this.Position = position;
                    this.Size = size;
                    this.ZIndex = 0;
                    this.Rotation = 0;
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
                return Graphic2d;
            })();
            Graphics.Graphic2d = Graphic2d;            
        })(Core.Graphics || (Core.Graphics = {}));
        var Graphics = Core.Graphics;
    })(EndGate.Core || (EndGate.Core = {}));
    var Core = EndGate.Core;
})(EndGate || (EndGate = {}));
//@ sourceMappingURL=Graphic2d.js.map
