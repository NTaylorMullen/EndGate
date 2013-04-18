var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var CollidableShape = (function (_super) {
    __extends(CollidableShape, _super);
    function CollidableShape(graphic, bounds) {
        _super.call(this, bounds);
        this._collisionBorderColor = "black";
        this._collisionBorderThickness = 4;
        this._lastCollision = null;
        this.Graphic = graphic;
        this.TextPosition = new EndGate.Core.Graphics.Text.Text2d(graphic.Position, graphic.Position.toString());
        this.Graphic.BorderColor(this._collisionBorderColor);
        this.Graphic.BorderThickness(0);
    }
    CollidableShape.prototype.Move = function (position) {
        this.Bounds.Position = this.Graphic.Position = this.TextPosition.Position = position;
        this.TextPosition.Position.Apply(Math.round);
        this.TextPosition.Text(this.TextPosition.Position.toString());
    };
    CollidableShape.prototype.Rotate = function (rotation) {
        this.Bounds.Rotation = this.Graphic.Rotation = this.TextPosition.Rotation = this.Graphic.Rotation + rotation;
    };
    CollidableShape.prototype.Collided = function (data) {
        this.Graphic.BorderThickness(this._collisionBorderThickness);
        this._lastCollision = data;
        _super.prototype.Collided.call(this, data);
    };
    CollidableShape.prototype.Update = function (gameTime) {
        if(this._lastCollision !== null) {
            if(!this._lastCollision.With.IsCollidingWith(this)) {
                this.Graphic.BorderThickness(0);
                this._lastCollision = null;
            }
        }
    };
    return CollidableShape;
})(EndGate.Core.Collision.Collidable);
var CollidableRectangle = (function (_super) {
    __extends(CollidableRectangle, _super);
    function CollidableRectangle(x, y, width, height, color) {
        _super.call(this, new EndGate.Core.Graphics.Shapes.Rectangle(x, y, width, height, color), new EndGate.Core.BoundingObject.BoundingRectangle(new EndGate.Core.Assets.Vector2d(x, y), new EndGate.Core.Assets.Size2d(width, height)));
    }
    return CollidableRectangle;
})(CollidableShape);
var CollidableCircle = (function (_super) {
    __extends(CollidableCircle, _super);
    function CollidableCircle(x, y, radius, color) {
        _super.call(this, new EndGate.Core.Graphics.Shapes.Circle(x, y, radius, color), new EndGate.Core.BoundingObject.BoundingCircle(new EndGate.Core.Assets.Vector2d(x, y), radius));
    }
    return CollidableCircle;
})(CollidableShape);
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
        this.Scene.Add(shape.TextPosition);
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
})(EndGate.Core.Game);
//@ sourceMappingURL=assetsCollisionInspector.js.map
