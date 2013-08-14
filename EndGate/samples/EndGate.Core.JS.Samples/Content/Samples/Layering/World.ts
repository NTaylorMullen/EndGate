/// <reference path="../../../Scripts/endgate.d.ts" />

// Wrap in module to keep code out of global scope
module Layering {

    export class World {
        public RedRectangle;
        public GreenRectangle;
        public BlueCircle;

        private _rectangleSize: eg.Size2d = new eg.Size2d(150, 325);
        private _circleRadius: number = 100;

        constructor(gameScene: eg.Rendering.Scene2d, canvasCenter: eg.Vector2d) {
            // Create our layering graphics
            this.RedRectangle = new eg.Graphics.Rectangle(canvasCenter.X - this._rectangleSize.Width / 3, canvasCenter.Y, this._rectangleSize.Width, this._rectangleSize.Height, eg.Graphics.Color.Red);
            this.RedRectangle.Rotation = Math.PI / 4;
            this.GreenRectangle = new eg.Graphics.Rectangle(canvasCenter.X + this._rectangleSize.Width / 3, canvasCenter.Y, this._rectangleSize.Width, this._rectangleSize.Height, eg.Graphics.Color.Green);
            this.GreenRectangle.Rotation = -Math.PI / 4;
            this.BlueCircle = new eg.Graphics.Circle(canvasCenter.X, canvasCenter.Y, this._circleRadius, eg.Graphics.Color.Blue);

            // Add them to the scene so they're drawn
            gameScene.Add(this.RedRectangle);
            gameScene.Add(this.GreenRectangle);
            gameScene.Add(this.BlueCircle);
        }
    }

}