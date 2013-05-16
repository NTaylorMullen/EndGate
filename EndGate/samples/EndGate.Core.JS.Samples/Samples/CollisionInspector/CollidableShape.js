var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var CollidableShape = (function (_super) {
    __extends(CollidableShape, _super);
    function CollidableShape(Graphic) {
        _super.call(this, Graphic.GetDrawBounds());
        this.Graphic = Graphic;
        this._collisionBorderColor = "black";
        this._collisionBorderThickness = 4;
        this._lastCollision = null;
        this.TextPosition = new eg.Graphics.Text2d(0, 0, Graphic.Position.toString());
        this.Graphic.BorderColor(this._collisionBorderColor);
        this.Graphic.BorderThickness(0);
        this.Graphic.AddChild(this.TextPosition);
    }
    CollidableShape.prototype.Move = function (position) {
        this.Bounds.Position = this.Graphic.Position = position;
        this.TextPosition.Position.Apply(Math.round);
        this.TextPosition.Text(this.Graphic.Position.toString());
    };
    CollidableShape.prototype.Rotate = function (rotation) {
        this.Bounds.Rotation = this.Graphic.Rotation = this.Graphic.Rotation + rotation;
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
})(eg.Collision.Collidable);
//@ sourceMappingURL=CollidableShape.js.map
