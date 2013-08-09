/// <reference path="../../../Scripts/jquery.d.ts" />
/// <reference path="../../../Scripts/endgate.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
// Wrap in module to keep code out of global scope
var MouseInput;
(function (MouseInput) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game(canvas, lastMouseEvent) {
            var _this = this;
            _super.call(this, canvas);
            // Default values
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

            this.Input.Mouse.OnClick = null;

            // Bind each of the mouse events individually to draw different color circles
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

            // When we move the cursor draw a small circle to represent where the mouse is
            this.Input.Mouse.OnMove.Bind(function (clickEvent) {
                _this.MarkLocationWithCircle(clickEvent.Position, 1, _this._onMoveColor);
                lastMouseEvent.text("Mouse move at " + clickEvent.Position.toString());
            });

            this.Input.Mouse.OnScroll.Bind(function (scrollEvent) {
                for (var i = 0; i < _this._shapes.length; i++) {
                    _this._shapes[i].Position = _this._shapes[i].Position.Add(scrollEvent.Direction.Multiply(_this._scrollSpeed));
                }

                lastMouseEvent.text("Mouse scroll at " + scrollEvent.Position.toString() + " in the direction: " + scrollEvent.Direction.toString());
            });
        }
        // Helper function to add shapes to our managed shapes list and to the scene simultaneously
        Game.prototype.MarkLocationWithCircle = function (position, radius, color) {
            var shape = new eg.Graphics.Circle(position.X, position.Y, radius, color);

            this._shapes.push(shape);
            this.Scene.Add(shape);
        };

        // Helper function to add shapes to our managed shapes list and to the scene simultaneously
        Game.prototype.MarkLocationWithRectangle = function (position, size, color) {
            var shape = new eg.Graphics.Rectangle(position.X, position.Y, size.Width, size.Height, color);

            this._shapes.push(shape);
            this.Scene.Add(shape);
        };
        return Game;
    })(eg.Game);
    MouseInput.Game = Game;
})(MouseInput || (MouseInput = {}));
//# sourceMappingURL=Game.js.map
