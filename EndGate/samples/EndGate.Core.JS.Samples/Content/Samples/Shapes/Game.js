/// <reference path="../../../Scripts/jquery.d.ts" />
/// <reference path="../../../Scripts/endgate.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
// Wrap in module to keep code out of global scope
var Shapes;
(function (Shapes) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game(_canvas, targetBuilders) {
            _super.call(this, _canvas);
            this._canvas = _canvas;
            var that = this, builderClicked = function () {
                if (!$(this).hasClass("disabled")) {
                    targetBuilders.removeClass("disabled");
                    $(this).addClass("disabled");
                    that.BuildShape($(this)[0]);
                }
            };

            // Bind all of the click events for the builders
            $.each(targetBuilders, function (index, val) {
                $(val).click(builderClicked);
            });

            // Apply default builder
            $(targetBuilders[0]).click();
        }
        // Used to go from circle to rectangle or vice versa
        Game.prototype.BuildShape = function (builder) {
            var shapeTypeName = $(builder).attr("shape"), shapeType = eg.Graphics[shapeTypeName], newShape;

            // If there is no current shape
            if (!this.Shape) {
                newShape = new shapeType(this._canvas.width / 2, this._canvas.height / 2, 200, 200);
            } else {
                // Need to special case circles because of the Size difference (Size2d vs Radius)
                if (shapeTypeName !== "Circle") {
                    newShape = new shapeType(this.Shape.Position.X, this.Shape.Position.Y, this.Shape.Radius * 2, this.Shape.Radius * 2);
                } else {
                    newShape = new shapeType(this.Shape.Position.X, this.Shape.Position.Y, Math.min(this.Shape.Size.Width, this.Shape.Size.Height) / 2);
                }

                // Copy all of the previous shapes settings over to the new shape
                newShape.Color = this.Shape.Color;
                newShape.Border(this.Shape.BorderThickness, this.Shape.BorderColor);
                newShape.Shadow(this.Shape.ShadowX, this.Shape.ShadowY, this.Shape.ShadowColor, this.Shape.ShadowBlur);
                newShape.Opacity = this.Shape.Opacity;
                newShape.Rotation = this.Shape.Rotation;

                // Remove the current shape from the draw area so we can start drawing the new one
                this.Scene.Remove(this.Shape);
            }

            // Get new shape instantiated and drawing
            this.Shape = newShape;
            this.Scene.Add(this.Shape);
        };
        return Game;
    })(eg.Game);
    Shapes.Game = Game;
})(Shapes || (Shapes = {}));
//# sourceMappingURL=Game.js.map
