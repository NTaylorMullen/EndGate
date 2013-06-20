var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../../../Scripts/jquery.d.ts" />
/// <reference path="../../../Scripts/endgate.d.ts" />
// Wrap in module to keep code out of global scope
var CollisionInspector;
(function (CollisionInspector) {
    var CollidableShape = (function (_super) {
        __extends(CollidableShape, _super);
        function CollidableShape(Graphic) {
            _super.call(this, Graphic.GetDrawBounds());
            this.Graphic = Graphic;
            this._collisionBorderColor = "black";
            this._collisionBorderThickness = 4;
            this._lastCollision = null;

            // Set the position to be 0,0 because the text position will be a child of the graphic
            this.TextPosition = new eg.Graphics.Text2d(0, 0, Graphic.Position.toString());

            // Set the default border color and thickness.  On Collision the border thickness gets set to a visible thickness.
            this.Graphic.BorderColor(this._collisionBorderColor);
            this.Graphic.BorderThickness(0);

            // All children of Graphic will have a relative position to the graphic
            // Hence the reason why TextPosition is at 0,0 (the center of the graphic)
            this.Graphic.AddChild(this.TextPosition);
        }
        CollidableShape.prototype.Move = function (position) {
            // Update the graphic location and the bounds location
            this.Bounds.Position = this.Graphic.Position = position;

            // Round the position and then update its text
            this.Graphic.Position.Apply(Math.round);
            this.TextPosition.Text(this.Graphic.Position.toString());
        };

        CollidableShape.prototype.Rotate = function (rotation) {
            // Update bounds and position rotation
            this.Bounds.Rotation = this.Graphic.Rotation = this.Graphic.Rotation + rotation;
        };

        // Triggered when shapes collide with each other
        CollidableShape.prototype.Collided = function (data) {
            // Make border thickness visible on collision
            this.Graphic.BorderThickness(this._collisionBorderThickness);

            // Save last collision so we can determine when we're no longer colliding
            this._lastCollision = data;

            _super.prototype.Collided.call(this, data);
        };

        CollidableShape.prototype.Update = function (gameTime) {
            if (this._lastCollision !== null) {
                if (!this._lastCollision.With.IsCollidingWith(this)) {
                    // Reset the border thickness to 0 (invisible)
                    this.Graphic.BorderThickness(0);
                    this._lastCollision = null;
                }
            }
        };
        return CollidableShape;
    })(eg.Collision.Collidable);
    CollisionInspector.CollidableShape = CollidableShape;
})(CollisionInspector || (CollisionInspector = {}));
//@ sourceMappingURL=CollidableShape.js.map
