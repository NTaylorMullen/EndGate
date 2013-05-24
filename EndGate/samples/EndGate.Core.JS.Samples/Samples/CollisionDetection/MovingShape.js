var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../../Scripts/endgate.d.ts" />
// Wrap in module to keep code out of global scope
var CollisionDetection;
(function (CollisionDetection) {
    var MovingShape = (function (_super) {
        __extends(MovingShape, _super);
        function MovingShape(Graphic, _velocity, _directionInterval) {
                _super.call(this, Graphic.GetDrawBounds());
            this.Graphic = Graphic;
            this._velocity = _velocity;
            this._directionInterval = _directionInterval;
            // Shape moves linearly, and this represents when the last time the shape changed directions
            this._lastChangedDirection = new Date().getTime();
            // 1 is clock wise, -1 is counter clock wise
            this._rotationMultiplier = 1;
            // 1 represents 100% opacity, so if we set fade speed to 2 that means we will fade in or out
            // in a half a second.
            this._fadeSpeed = 2;
            this._collisionBorderThickness = 5;
            this._collisionColorAlpha = 0;
            this._collisionColor = [
                255, 
                0, 
                0
            ];
            this.Graphic.Border(this._collisionBorderThickness, "rgba(" + this._collisionColor + ",0,0," + this._collisionColorAlpha + ")");
        }
        MovingShape.RotationSpeed = Math.PI;
        MovingShape.prototype.Collided = // Triggered when shapes collide with each other
        function (data) {
            // Reset the collision alpha to be 1
            this._collisionColorAlpha = 1;
            // Parse the rgb color into an array
            var strColor = (data.With).Graphic.Color().replace("rgb(", "").replace(")", "").split(",");
            // Update the border color array
            for(var i = 0; i < strColor.length; i++) {
                this._collisionColor[i] = parseInt(strColor[i]);
            }
            // When we call the base Collided function it essentially triggers the OnCollision function of the Collidable
            _super.prototype.Collided.call(this, data);
        };
        MovingShape.prototype.Update = function (gameTime) {
            // Check if it's time to switch directions
            if(gameTime.Now.getTime() - this._lastChangedDirection >= this._directionInterval) {
                // Reverse our velocity
                this._velocity = this._velocity.Multiply(-1);
                // Reverse our rotation direction
                this._rotationMultiplier *= -1;
                // Save the date so we know when to change directions next
                this._lastChangedDirection = gameTime.Now.getTime();
            }
            // Update the alpha of the border, we multiply by ElapsedSecond so that we at most traverse this._fadeSpeed points per second
            this._collisionColorAlpha = Math.max(this._collisionColorAlpha - gameTime.ElapsedSecond * this._fadeSpeed, 0);
            this.Graphic.BorderColor("rgba(" + this._collisionColor[0] + "," + this._collisionColor[1] + "," + this._collisionColor[2] + "," + this._collisionColorAlpha + ")");
            // Update the graphic and bounds rotation and position.
            this.Graphic.Rotation = this.Bounds.Rotation = this.Graphic.Rotation + gameTime.ElapsedSecond * MovingShape.RotationSpeed * this._rotationMultiplier;
            this.Graphic.Position = this.Bounds.Position = this.Graphic.Position.Add(this._velocity.Multiply(gameTime.ElapsedSecond));
        };
        return MovingShape;
    })(eg.Collision.Collidable);
    CollisionDetection.MovingShape = MovingShape;    
})(CollisionDetection || (CollisionDetection = {}));
//@ sourceMappingURL=MovingShape.js.map
