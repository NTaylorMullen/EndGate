var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var CollisionInspector = (function (_super) {
    __extends(CollisionInspector, _super);
    function CollisionInspector(canvas) {
        var _this = this;
        _super.call(this, canvas);
        this._collidableShapes = [];
        this._draggingObject = null;
        this._rotatingObject = null;
        this._decreasingZIndex = 0;
        this.Input.Mouse.OnDown.Bind(function (clickEvent) {
            var obj = _this.GetShapeAt(clickEvent.Position);
            if(obj !== null) {
                if(clickEvent.Button === "Left") {
                    _this._draggingObject = obj;
                    _this._dragOffset = clickEvent.Position.Subtract(obj.Bounds.Position);
                } else if(clickEvent.Button === "Right") {
                    _this._rotatingObject = obj;
                }
            }
        });
        this.Input.Mouse.OnUp.Bind(function (clickEvent) {
            _this._draggingObject = null;
            _this._dragOffset = null;
            _this._rotatingObject = null;
        });
        this.Input.Mouse.OnMove.Bind(function (mouseEvent) {
            _this._currentMousePosition = mouseEvent.Position;
        });
    }
    CollisionInspector.prototype.Add = function (shape) {
        this._collidableShapes.push(shape);
        shape.Graphic.ZIndex = shape.TextPosition.ZIndex = this._decreasingZIndex--;
        this.Scene.Add(shape.Graphic);
        this.CollisionManager.Monitor(shape);
    };
    CollisionInspector.prototype.Update = function (gameTime) {
        var rotateSpeed, rotateDirection, difference;
        if(this._draggingObject !== null) {
            this._draggingObject.Move(this._currentMousePosition.Add(this._dragOffset.Negate()));
        } else if(this._rotatingObject !== null) {
            difference = this._currentMousePosition.Subtract(this._rotatingObject.Bounds.Position);
            rotateSpeed = difference.Magnitude() / 100;
            rotateDirection = difference.Sign().X;
            this._rotatingObject.Rotate(rotateSpeed * gameTime.ElapsedSecond * rotateDirection);
        }
        for(var i = 0; i < this._collidableShapes.length; i++) {
            this._collidableShapes[i].Update(gameTime);
        }
    };
    CollisionInspector.prototype.GetShapeAt = function (position) {
        for(var i = 0; i < this._collidableShapes.length; i++) {
            if(this._collidableShapes[i].Bounds.ContainsPoint(position)) {
                return this._collidableShapes[i];
            }
        }
        return null;
    };
    return CollisionInspector;
})(eg.Game);
//@ sourceMappingURL=CollisionInspector.js.map
