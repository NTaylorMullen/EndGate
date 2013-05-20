var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ShapeGame = (function (_super) {
    __extends(ShapeGame, _super);
    function ShapeGame(_canvas, targetBuilders, targetAnimators, defaultPosition, defaultSize, defaultRotation, defaultOpacity, _syncSliders) {
        _super.call(this, _canvas);
        this._canvas = _canvas;
        this._syncSliders = _syncSliders;
        var that = this, builderClicked = function () {
            if(!$(this).hasClass("disabled")) {
                targetBuilders.removeClass("disabled");
                $(this).addClass("disabled");
                that.BuildShape($(this)[0]);
            }
        };
        $.each(targetBuilders, function (index, val) {
            $(val).click(builderClicked);
        });
        $(targetBuilders[0]).click();
        this._shapeAnimator = new ShapeAnimator(targetAnimators, defaultPosition, defaultSize, defaultRotation, defaultOpacity, this._syncSliders);
    }
    ShapeGame.prototype.Update = function (gameTime) {
        this._shapeAnimator.ApplyAnimation(this.Shape, gameTime);
    };
    ShapeGame.prototype.BuildShape = function (builder) {
        var shapeTypeName = $(builder).attr("shape"), shapeType = eg.Graphics[shapeTypeName], newShape;
        if(!this.Shape) {
            newShape = new shapeType(this._canvas.width / 2, this._canvas.height / 2, 200, 200);
        } else {
            if(shapeTypeName !== "Circle") {
                newShape = new shapeType(this.Shape.Position.X, this.Shape.Position.Y, (this.Shape).Radius * 2, (this.Shape).Radius * 2);
            } else {
                newShape = new shapeType(this.Shape.Position.X, this.Shape.Position.Y, Math.min((this.Shape).Size.Width, (this.Shape).Size.Height) / 2);
                window.setTimeout((function (sizeSync) {
                    return function () {
                        sizeSync("Size");
                    };
                })(this._syncSliders), 0);
            }
            newShape.Color(this.Shape.Color());
            newShape.Border(this.Shape.BorderThickness(), this.Shape.BorderColor());
            newShape.Shadow(this.Shape.ShadowX(), this.Shape.ShadowY(), this.Shape.ShadowColor(), this.Shape.ShadowBlur());
            newShape.Opacity(this.Shape.Opacity());
            newShape.Rotation = this.Shape.Rotation;
            this.Scene.Remove(this.Shape);
        }
        this.Shape = newShape;
        this.Scene.Add(this.Shape);
    };
    return ShapeGame;
})(eg.Game);
//@ sourceMappingURL=ShapeGame.js.map
