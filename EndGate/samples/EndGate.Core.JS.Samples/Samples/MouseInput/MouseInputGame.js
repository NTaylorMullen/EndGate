var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MouseInputGame = (function (_super) {
    __extends(MouseInputGame, _super);
    function MouseInputGame(canvas, lastMouseEvent) {
        var _this = this;
        _super.call(this, canvas);
        this._radiusSize = 5;
        this._scrollSpeed = 5;
        this._clickColors = {
            Left: "#ff0000",
            Middle: "#00ff00",
            Right: "#0000ff"
        };
        this._inbetweenColors = {
            Left: "#ffa5a5",
            Middle: "#a5ffa5",
            Right: "#a5a5ff"
        };
        this._doubleClickColor = "#000000";
        this._onMoveColor = "#000000";
        this._shapes = [];
        this.Input.Mouse.OnClick.Bind(function (clickEvent) {
            lastMouseEvent.text(clickEvent.Button + " Click at " + clickEvent.Position.toString());
            _this.MarkLocationWithCircle(clickEvent.Position, _this._radiusSize, _this._clickColors[clickEvent.Button]);
        });
        this.Input.Mouse.OnDoubleClick.Bind(function (clickEvent) {
            lastMouseEvent.text(clickEvent.Button + " Double Click at " + clickEvent.Position.toString());
            _this.MarkLocationWithCircle(clickEvent.Position, _this._radiusSize, _this._doubleClickColor);
        });
        this.Input.Mouse.OnDown.Bind(function (clickEvent) {
            lastMouseEvent.text(clickEvent.Button + " button down at " + clickEvent.Position.toString());
            _this.MarkLocationWithCircle(clickEvent.Position, _this._radiusSize, _this._inbetweenColors[clickEvent.Button]);
        });
        this.Input.Mouse.OnUp.Bind(function (clickEvent) {
            lastMouseEvent.text(clickEvent.Button + " button up at " + clickEvent.Position.toString());
            _this.MarkLocationWithRectangle(clickEvent.Position, new eg.Size2d(_this._radiusSize * 4, _this._radiusSize * 4), _this._inbetweenColors[clickEvent.Button]);
        });
        this.Input.Mouse.OnMove.Bind(function (clickEvent) {
            _this.MarkLocationWithCircle(clickEvent.Position, 1, _this._onMoveColor);
            lastMouseEvent.text("Mouse move at " + clickEvent.Position.toString());
        });
        this.Input.Mouse.OnScroll.Bind(function (scrollEvent) {
            for(var i = 0; i < _this._shapes.length; i++) {
                _this._shapes[i].Position = _this._shapes[i].Position.Add(scrollEvent.Direction.Multiply(_this._scrollSpeed));
            }
            lastMouseEvent.text("Mouse scroll at " + scrollEvent.Position.toString() + " in the direction: " + scrollEvent.Direction.toString());
        });
    }
    MouseInputGame.prototype.MarkLocationWithCircle = function (position, radius, color) {
        var shape = new eg.Graphics.Circle(position.X, position.Y, radius, color);
        this._shapes.push(shape);
        this.Scene.Add(shape);
    };
    MouseInputGame.prototype.MarkLocationWithRectangle = function (position, size, color) {
        var shape = new eg.Graphics.Rectangle(position.X, position.Y, size.Width, size.Height, color);
        this._shapes.push(shape);
        this.Scene.Add(shape);
    };
    return MouseInputGame;
})(eg.Game);
//@ sourceMappingURL=MouseInputGame.js.map
