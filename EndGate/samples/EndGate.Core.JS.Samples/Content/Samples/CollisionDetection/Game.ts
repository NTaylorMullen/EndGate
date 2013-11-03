/// <reference path="../../../Scripts/endgate.d.ts" />
/// <reference path="MovingShape.ts" />

// Wrap in module to keep code out of global scope
module CollisionDetection {

    export class Game extends eg.Game {
        private static MaxVelocity: number = 100;
        private static MinVelocity: number = 30;
        private static MinIntervalChange: number = 1000;
        private static MaxIntervalChange: number = 4000;
        private _shapes: MovingShape[];
        private _size: eg.Size2d;

        constructor(canvas: HTMLCanvasElement) {
            super(canvas);

            // Save size of game area
            this._size = new eg.Size2d(canvas.width, canvas.height);

            this._shapes = [];
        }

        public Update(gameTime: eg.GameTime): void {
            // We update all the shapes so that they move across the play area
            for (var i = 0; i < this._shapes.length; i++) {
                this._shapes[i].Update(gameTime);
            }
        }

        // Remove all the shapes from the shape list (so they're not updated), Scene so they're not drawn, and CollisionManager so they don't collide
        public Clear(): void {
            for (var i = 0; i < this._shapes.length; i++) {
                this.Scene.Remove(this._shapes[i].Graphic);
                this.CollisionManager.Unmonitor(this._shapes[i]);
            }

            this._shapes = [];
        }

        public AddRandomRectangle(): void {
            var randomPos = this.GetRandomPosition(),
                randomSize = this.GetRandomSize();

            // Build shape with a rectangle graphic and supply it with random values
            this.AddShape(new MovingShape(new eg.Graphics.Rectangle(randomPos.X, randomPos.Y, randomSize.Width, randomSize.Height, this.GetRandomColor()), this.GetRandomVelocity(), this.GetRandomIntervalChange()));
        }

        public AddRandomCircle(): void {
            var randomPos = this.GetRandomPosition();

            // Build shape with a circle graphic and supply it with random values
            this.AddShape(new MovingShape(new eg.Graphics.Circle(randomPos.X, randomPos.Y, this.GetRandomRadius(), this.GetRandomColor()), this.GetRandomVelocity(), this.GetRandomIntervalChange()));
        }

        // Helper function to add shapes to all the necessary monitors
        private AddShape(shape: MovingShape): void {
            // Monitor the moving shapes so that the MovingShape Collided functions get triggered on collisions
            //this.CollisionManager.Monitor(shape);

            // Add the MovingShape to the list of shapes we're monitoring (so we can update it) and then move the shape throughout the play area.
            this._shapes.push(shape);

            // Add the graphic of the Moving Shape to the Scene so it's drawn
            this.Scene.Add(shape.Graphic);
        }

        // Helper functions to generate random values for all of the MovingShapeparameters

        private GetRandomPosition(): eg.Vector2d {
            return new eg.Vector2d(Math.floor((Math.random() * this._size.Width) + 1), Math.floor((Math.random() * this._size.Height) + 1));
        }

        private GetRandomSize(): eg.Size2d {
            return new eg.Size2d(Math.floor((Math.random() * this._size.Width * .1) + 5), Math.floor((Math.random() * this._size.Height * .1) + 5));
        }

        private GetRandomRadius(): number {
            return Math.floor(Math.random() * this._size.Width * .05) + 5
        }

        private GetRandomColor(): eg.Graphics.Color {
            return new eg.Graphics.Color((Math.floor(Math.random() * 250) + 1), (Math.floor(Math.random() * 250) + 1), (Math.floor(Math.random() * 250) + 1));
        }

        private GetRandomVelocity(): eg.Vector2d {
            var axi = ["X", "Y"][Math.floor(Math.random() * 2)],
                velocity = eg.Vector2d.Zero;

            velocity[axi] = Math.floor(Math.random() * Game.MaxVelocity) + Game.MinVelocity

            return velocity;
        }

        private GetRandomIntervalChange(): number {
            return Math.floor(Math.random() * Game.MaxIntervalChange) + Game.MinIntervalChange;
        }
    }

}