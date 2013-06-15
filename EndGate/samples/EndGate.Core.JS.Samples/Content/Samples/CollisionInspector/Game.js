var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../../../Scripts/endgate.d.ts" />
/// <reference path="CollidableShape.ts" />
// Wrap in module to keep code out of global scope
var CollisionInspector;
(function (CollisionInspector) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game(canvas) {
            var _this = this;
                _super.call(this, canvas);
            this._collidableShapes = [];
            this._draggingObject = null;
            this._rotatingObject = null;
            this._decreasingZIndex = 0;
            // Triggers when any button gets pressed down within the game area
            this.Input.Mouse.OnDown.Bind(function (clickEvent) {
                // Find what shape we've clicked
                var obj = _this.GetShapeAt(clickEvent.Position);
                // If we've actually clicked an object
                if(obj !== null) {
                    // Move on left click
                    if(clickEvent.Button === "Left") {
                        _this._draggingObject = obj;
                        // Calculate where we clicked the shape
                        _this._dragOffset = clickEvent.Position.Subtract(obj.Bounds.Position);
                    } else // Rotate on right click
                    if(clickEvent.Button === "Right") {
                        _this._rotatingObject = obj;
                    }
                }
            });
            // Triggers when any button gets released within the game area
            this.Input.Mouse.OnUp.Bind(function (clickEvent) {
                // Reset all the dragging behaviors
                _this._draggingObject = null;
                _this._dragOffset = null;
                _this._rotatingObject = null;
            });
            // Triggers when the mouse is moved within the game area
            this.Input.Mouse.OnMove.Bind(function (mouseEvent) {
                // Update the current mouse position (so we can track it)
                _this._currentMousePosition = mouseEvent.Position;
            });
        }
        Game.prototype.Add = function (shape) {
            // For finding mouse clicks and who they intersect
            this._collidableShapes.push(shape);
            // Keep decreasing the zindex so the highest value is always closest to the front, meaning
            // we will always return items that are in the viewing area even if they overlap.
            shape.Graphic.ZIndex = shape.TextPosition.ZIndex = this._decreasingZIndex--;
            // For drawing the shape
            this.Scene.Add(shape.Graphic);
            // For detecting collision amongst the shapes
            this.CollisionManager.Monitor(shape);
        };
        Game.prototype.Update = function (gameTime) {
            var rotateSpeed, rotateDirection, difference;
            // If we're currently dragging an object
            if(this._draggingObject !== null) {
                this._draggingObject.Move(this._currentMousePosition.Add(this._dragOffset.Negate()));
            } else // If we're currently rotating an object
            if(this._rotatingObject !== null) {
                // Rotate faster the further away the mouse is from the center of the rotating object
                difference = this._currentMousePosition.Subtract(this._rotatingObject.Bounds.Position);
                rotateSpeed = difference.Magnitude() / 100;
                // Will rotate different directions based on what side of the axis the X is on
                rotateDirection = difference.Sign().X;
                this._rotatingObject.Rotate(rotateSpeed * gameTime.ElapsedSecond * rotateDirection);
            }
            for(var i = 0; i < this._collidableShapes.length; i++) {
                this._collidableShapes[i].Update(gameTime);
            }
        };
        Game.prototype.GetShapeAt = // Find the shape that we click
        function (position) {
            for(var i = 0; i < this._collidableShapes.length; i++) {
                if(this._collidableShapes[i].Bounds.ContainsPoint(position)) {
                    return this._collidableShapes[i];
                }
            }
            return null;
        };
        return Game;
    })(eg.Game);
    CollisionInspector.Game = Game;    
})(CollisionInspector || (CollisionInspector = {}));
//@ sourceMappingURL=Game.js.map
