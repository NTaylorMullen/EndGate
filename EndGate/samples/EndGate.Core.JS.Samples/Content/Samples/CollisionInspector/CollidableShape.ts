/// <reference path="../../../Scripts/jquery.d.ts" />
/// <reference path="../../../Scripts/endgate.d.ts" />

// Wrap in module to keep code out of global scope
module CollisionInspector {

    export class CollidableShape extends eg.Collision.Collidable implements eg.IUpdateable {
        // Represents the text location within the shape
        public TextPosition: eg.Graphics.Text2d;

        private _collisionBorderColor: string = "black";
        private _collisionBorderThickness: number = 4;
        private _lastCollision: eg.Collision.Assets.CollisionData = null;

        constructor(public Graphic: eg.Graphics.Abstractions.Shape) {
            super(Graphic.GetDrawBounds());

            // Set the position to be 0,0 because the text position will be a child of the graphic 
            this.TextPosition = new eg.Graphics.Text2d(0, 0, Graphic.Position.toString());

            // Set the default border color and thickness.  On Collision the border thickness gets set to a visible thickness.
            this.Graphic.BorderColor = this._collisionBorderColor;
            this.Graphic.BorderThickness = 0;

            // All children of Graphic will have a relative position to the graphic
            // Hence the reason why TextPosition is at 0,0 (the center of the graphic)
            this.Graphic.AddChild(this.TextPosition);
        }

        public Move(position: eg.Vector2d): void {
            // Update the graphic location and the bounds location
            this.Bounds.Position = this.Graphic.Position = position;

            // Round the position and then update its text
            this.Graphic.Position.Apply(Math.round);
            this.TextPosition.Text = this.Graphic.Position.toString();
        }

        public Rotate(rotation: number) {
            // Update bounds and position rotation
            this.Bounds.Rotation = this.Graphic.Rotation = this.Graphic.Rotation + rotation;
        }

        // Triggered when shapes collide with each other
        public Collided(data: eg.Collision.Assets.CollisionData): void {
            // Make border thickness visible on collision
            this.Graphic.BorderThickness = this._collisionBorderThickness;

            // Save last collision so we can determine when we're no longer colliding
            this._lastCollision = data;

            super.Collided(data);
        }

        public Update(gameTime: eg.GameTime): void {
            // If we're currently colliding
            if (this._lastCollision !== null) {
                // Check if we're no longer colliding 
                if (!this._lastCollision.With.IsCollidingWith(this)) {
                    // Reset the border thickness to 0 (invisible)
                    this.Graphic.BorderThickness = 0;
                    this._lastCollision = null;
                }
            }
        }
    }

}