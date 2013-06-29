/// <reference path="../../../Scripts/endgate.d.ts" />

// Wrap in module to keep code out of global scope
module CollisionDetection {

    export class MovingShape extends eg.Collision.Collidable implements eg.IUpdateable {
        // Rotate 180 degrees every second
        private static RotationSpeed: number = Math.PI;

        // Shape moves linearly, and this represents when the last time the shape changed directions
        private _lastChangedDirection: number = new Date().getTime();
        // 1 is clock wise, -1 is counter clock wise
        private _rotationMultiplier: number = 1;
        // 1 represents 100% opacity, so if we set fade speed to 2 that means we will fade in or out
        // in a half a second.
        private _fadeSpeed: number = 2;

        private _collisionBorderThickness: number = 5;
        private _collisionColorAlpha: number = 0;
        private _collisionColor: number[] = [255, 0, 0];

        constructor(public Graphic: eg.Graphics.Abstractions.Shape, private _velocity: eg.Vector2d, private _directionInterval: number) {
            super(Graphic.GetDrawBounds());

            this.Graphic.Border(this._collisionBorderThickness, "rgba(" + this._collisionColor + ",0,0," + this._collisionColorAlpha + ")");
        }

        // Triggered when shapes collide with each other
        public Collided(data: eg.Collision.Assets.CollisionData): void {
            // Reset the collision alpha to be 1
            this._collisionColorAlpha = 1;

            // Parse the rgb color into an array
            var strColor = (<MovingShape>data.With).Graphic.Color.replace("rgb(", "").replace(")", "").split(",");

            // Update the border color array
            for (var i = 0; i < strColor.length; i++) {
                this._collisionColor[i] = parseInt(strColor[i]);
            }

            // When we call the base Collided function it essentially triggers the OnCollision function of the Collidable
            super.Collided(data);
        }

        public Update(gameTime: eg.GameTime): void {
            // Check if it's time to switch directions
            if (gameTime.Now.getTime() - this._lastChangedDirection >= this._directionInterval) {
                // Reverse our velocity
                this._velocity = this._velocity.Multiply(-1);
                // Reverse our rotation direction 
                this._rotationMultiplier *= -1;
                // Save the date so we know when to change directions next
                this._lastChangedDirection = gameTime.Now.getTime();
            }

            // Update the alpha of the border, we multiply by Elapsed.Seconds so that we at most traverse this._fadeSpeed points per second
            this._collisionColorAlpha = Math.max(this._collisionColorAlpha - gameTime.Elapsed.Seconds * this._fadeSpeed, 0);

            this.Graphic.BorderColor = "rgba(" + this._collisionColor[0] + "," + this._collisionColor[1] + "," + this._collisionColor[2] + "," + this._collisionColorAlpha + ")";

            // Update the graphic and bounds rotation and position.
            this.Graphic.Rotation = this.Bounds.Rotation = this.Graphic.Rotation + gameTime.Elapsed.Seconds * MovingShape.RotationSpeed * this._rotationMultiplier;
            this.Graphic.Position = this.Bounds.Position = this.Graphic.Position.Add(this._velocity.Multiply(gameTime.Elapsed.Seconds));
        }
    }

}