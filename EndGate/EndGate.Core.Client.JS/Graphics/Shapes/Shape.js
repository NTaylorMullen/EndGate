var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var EndGate;
(function (EndGate) {
    (function (Core) {
        (function (Graphics) {
            (function (Shapes) {
                var Shape = (function (_super) {
                    __extends(Shape, _super);
                    function Shape(position, size, color) {
                                        _super.call(this, position, size);
                        this._type = "Shape";
                        if(typeof color !== "undefined") {
                            this.Color(color);
                        }
                    }
                    Shape.prototype.Color = function (color) {
                        return this.State.FillStyle(color);
                    };
                    return Shape;
                })(Graphics.Graphic2d);
                Shapes.Shape = Shape;                
            })(Graphics.Shapes || (Graphics.Shapes = {}));
            var Shapes = Graphics.Shapes;
        })(Core.Graphics || (Core.Graphics = {}));
        var Graphics = Core.Graphics;
    })(EndGate.Core || (EndGate.Core = {}));
    var Core = EndGate.Core;
})(EndGate || (EndGate = {}));
//@ sourceMappingURL=Shape.js.map
