/// <reference path="../../../Scripts/endgate.d.ts" />
/// <reference path="MovingShape.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
// Wrap in module to keep code out of global scope
var CollisionDetection;
(function (CollisionDetection) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game(canvas) {
            _super.call(this, canvas);

            // Save size of game area
            this._size = new eg.Size2d(canvas.width, canvas.height);

            this._shapes = [];
        }
        Game.prototype.Update = function (gameTime) {
            for (var i = 0; i < this._shapes.length; i++) {
                this._shapes[i].Update(gameTime);
            }
        };

        // Remove all the shapes from the shape list (so they're not updated), Scene so they're not drawn, and CollisionManager so they don't collide
        Game.prototype.Clear = function () {
            for (var i = 0; i < this._shapes.length; i++) {
                this.Scene.Remove(this._shapes[i].Graphic);
                this.CollisionManager.Unmonitor(this._shapes[i]);
            }

            this._shapes = [];
        };

        Game.prototype.AddRandomRectangle = function () {
            var randomPos = this.GetRandomPosition(), randomSize = this.GetRandomSize();

            // Build shape with a rectangle graphic and supply it with random values
            this.AddShape(new CollisionDetection.MovingShape(new eg.Graphics.Rectangle(randomPos.X, randomPos.Y, randomSize.Width, randomSize.Height, this.GetRandomColor()), this.GetRandomVelocity(), this.GetRandomIntervalChange()));
        };

        Game.prototype.AddRandomCircle = function () {
            var randomPos = this.GetRandomPosition();

            // Build shape with a circle graphic and supply it with random values
            this.AddShape(new CollisionDetection.MovingShape(new eg.Graphics.Circle(randomPos.X, randomPos.Y, this.GetRandomRadius(), this.GetRandomColor()), this.GetRandomVelocity(), this.GetRandomIntervalChange()));
        };

        // Helper function to add shapes to all the necessary monitors
        Game.prototype.AddShape = function (shape) {
            // Monitor the moving shapes so that the MovingShape Collided functions get triggered on collisions
            this.CollisionManager.Monitor(shape);

            // Add the MovingShape to the list of shapes we're monitoring (so we can update it) and then move the shape throughout the play area.
            this._shapes.push(shape);

            // Add the graphic of the Moving Shape to the Scene so it's drawn
            this.Scene.Add(shape.Graphic);
        };

        // Helper functions to generate random values for all of the MovingShapeparameters
        Game.prototype.GetRandomPosition = function () {
            return new eg.Vector2d(Math.floor((Math.random() * this._size.Width) + 1), Math.floor((Math.random() * this._size.Height) + 1));
        };

        Game.prototype.GetRandomSize = function () {
            return new eg.Size2d(Math.floor((Math.random() * this._size.Width * .1) + 5), Math.floor((Math.random() * this._size.Height * .1) + 5));
        };

        Game.prototype.GetRandomRadius = function () {
            return Math.floor(Math.random() * this._size.Width * .05) + 5;
        };

        Game.prototype.GetRandomColor = function () {
            return new eg.Graphics.Color((Math.floor(Math.random() * 250) + 1), (Math.floor(Math.random() * 250) + 1), (Math.floor(Math.random() * 250) + 1));
        };

        Game.prototype.GetRandomVelocity = function () {
            var axi = ["X", "Y"][Math.floor(Math.random() * 2)], velocity = eg.Vector2d.Zero;

            velocity[axi] = Math.floor(Math.random() * Game.MaxVelocity) + Game.MinVelocity;

            return velocity;
        };

        Game.prototype.GetRandomIntervalChange = function () {
            return Math.floor(Math.random() * Game.MaxIntervalChange) + Game.MinIntervalChange;
        };
        Game.MaxVelocity = 100;
        Game.MinVelocity = 30;
        Game.MinIntervalChange = 1000;
        Game.MaxIntervalChange = 4000;
        return Game;
    })(eg.Game);
    CollisionDetection.Game = Game;
})(CollisionDetection || (CollisionDetection = {}));
//# sourceMappingURL=Game.js.map
