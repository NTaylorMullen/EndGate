var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var CollisionDetection = (function (_super) {
    __extends(CollisionDetection, _super);
    function CollisionDetection(canvas) {
        _super.call(this, canvas);
        this._size = new eg.Size2d(canvas.width, canvas.height);
        this._shapes = [];
    }
    CollisionDetection.MaxVelocity = 100;
    CollisionDetection.MinVelocity = 30;
    CollisionDetection.MinIntervalChange = 1000;
    CollisionDetection.MaxIntervalChange = 4000;
    CollisionDetection.prototype.Update = function (gameTime) {
        for(var i = 0; i < this._shapes.length; i++) {
            this._shapes[i].Update(gameTime);
        }
    };
    CollisionDetection.prototype.Clear = function () {
        for(var i = 0; i < this._shapes.length; i++) {
            this.Scene.Remove(this._shapes[i].Graphic);
            this.CollisionManager.Unmonitor(this._shapes[i]);
        }
        this._shapes = [];
    };
    CollisionDetection.prototype.AddRandomRectangle = function () {
        var randomPos = this.GetRandomPosition(), randomSize = this.GetRandomSize();
        this.AddShape(new MovingShape(new eg.Graphics.Rectangle(randomPos.X, randomPos.Y, randomSize.Width, randomSize.Height, this.GetRandomColor()), this.GetRandomVelocity(), this.GetRandomIntervalChange()));
    };
    CollisionDetection.prototype.AddRandomCircle = function () {
        var randomPos = this.GetRandomPosition();
        this.AddShape(new MovingShape(new eg.Graphics.Circle(randomPos.X, randomPos.Y, this.GetRandomRadius(), this.GetRandomColor()), this.GetRandomVelocity(), this.GetRandomIntervalChange()));
    };
    CollisionDetection.prototype.AddShape = function (shape) {
        this.CollisionManager.Monitor(shape);
        this._shapes.push(shape);
        this.Scene.Add(shape.Graphic);
    };
    CollisionDetection.prototype.GetRandomPosition = function () {
        return new eg.Vector2d(Math.floor((Math.random() * this._size.Width) + 1), Math.floor((Math.random() * this._size.Height) + 1));
    };
    CollisionDetection.prototype.GetRandomSize = function () {
        return new eg.Size2d(Math.floor((Math.random() * this._size.Width * .1) + 5), Math.floor((Math.random() * this._size.Height * .1) + 5));
    };
    CollisionDetection.prototype.GetRandomRadius = function () {
        return Math.floor(Math.random() * this._size.Width * .05) + 5;
    };
    CollisionDetection.prototype.GetRandomColor = function () {
        return "rgb(" + (Math.floor(Math.random() * 250) + 1) + ", " + (Math.floor(Math.random() * 250) + 1) + ", " + (Math.floor(Math.random() * 250) + 1) + ")";
    };
    CollisionDetection.prototype.GetRandomVelocity = function () {
        var axi = [
            "X", 
            "Y"
        ][Math.floor(Math.random() * 2)], velocity = eg.Vector2d.Zero();
        velocity[axi] = Math.floor(Math.random() * CollisionDetection.MaxVelocity) + CollisionDetection.MinVelocity;
        return velocity;
    };
    CollisionDetection.prototype.GetRandomIntervalChange = function () {
        return Math.floor(Math.random() * CollisionDetection.MaxIntervalChange) + CollisionDetection.MinIntervalChange;
    };
    return CollisionDetection;
})(eg.Game);
//@ sourceMappingURL=CollisionDetection.js.map
