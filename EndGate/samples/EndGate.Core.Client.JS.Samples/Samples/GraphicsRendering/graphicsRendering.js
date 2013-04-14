var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MovingShape = (function () {
    function MovingShape(graphic, velocity, directionInterval) {
        this.Graphic = graphic;
        this._velocity = velocity;
        this._directionInterval = directionInterval;
        this._rotationMultiplier = 1;
        this._lastChangedDirection = new Date().getTime();
    }
    MovingShape.RotationSpeed = Math.PI;
    MovingShape.prototype.Update = function (gameTime) {
        var percentOfSecond = gameTime.Elapsed / 1000;
        if(gameTime.Now.getTime() - this._lastChangedDirection >= this._directionInterval) {
            this._velocity = this._velocity.Multiply(-1);
            this._rotationMultiplier *= -1;
            this._lastChangedDirection = gameTime.Now.getTime();
        }
        this.Graphic.Rotation += percentOfSecond * MovingShape.RotationSpeed * this._rotationMultiplier;
        this.Graphic.Position = this.Graphic.Position.Add(this._velocity.Multiply(percentOfSecond));
    };
    return MovingShape;
})();
var GraphicsRenderer = (function (_super) {
    __extends(GraphicsRenderer, _super);
    function GraphicsRenderer(canvas) {
        _super.call(this, canvas);
        this._width = canvas.width;
        this._height = canvas.height;
        this._shapes = [];
    }
    GraphicsRenderer.MaxVelocity = 100;
    GraphicsRenderer.MinVelocity = 30;
    GraphicsRenderer.MinIntervalChange = 1000;
    GraphicsRenderer.MaxIntervalChange = 4000;
    GraphicsRenderer.prototype.Update = function (gameTime) {
        for(var i = 0; i < this._shapes.length; i++) {
            this._shapes[i].Update(gameTime);
        }
    };
    GraphicsRenderer.prototype.Clear = function () {
        for(var i = 0; i < this._shapes.length; i++) {
            this.Scene.Remove(this._shapes[i].Graphic);
        }
        this._shapes = [];
    };
    GraphicsRenderer.prototype.AddRandomRectangle = function () {
        var randomPos = this.GetRandomPosition(), randomSize = this.GetRandomSize(), randomVel = this.GetRandomVelocity(), randomChange = this.GetRandomIntervalChange(), rect = new EndGate.Core.Graphics.Shapes.Rectangle(randomPos.X, randomPos.Y, randomSize.Width, randomSize.Height), randomColor = this.GetRandomColor(), shape;
        rect.Color(randomColor);
        shape = new MovingShape(rect, randomVel, randomChange);
        this._shapes.push(shape);
        this.Scene.Add(rect);
    };
    GraphicsRenderer.prototype.AddRandomCircle = function () {
        var randomPos = this.GetRandomPosition(), randomRadius = this.GetRandomRadius(), randomVel = this.GetRandomVelocity(), randomChange = this.GetRandomIntervalChange(), circle = new EndGate.Core.Graphics.Shapes.Circle(randomPos.X, randomPos.Y, randomRadius), randomColor = this.GetRandomColor(), shape;
        circle.Color(randomColor);
        shape = new MovingShape(circle, randomVel, randomChange);
        this._shapes.push(shape);
        this.Scene.Add(circle);
    };
    GraphicsRenderer.prototype.GetRandomPosition = function () {
        return new EndGate.Core.Assets.Vector2d(Math.floor((Math.random() * this._width) + 1), Math.floor((Math.random() * this._height) + 1));
    };
    GraphicsRenderer.prototype.GetRandomSize = function () {
        return new EndGate.Core.Assets.Size2d(Math.floor((Math.random() * this._width * .1) + 5), Math.floor((Math.random() * this._height * .1) + 5));
    };
    GraphicsRenderer.prototype.GetRandomRadius = function () {
        return Math.floor(Math.random() * this._width * .1) + 5;
    };
    GraphicsRenderer.prototype.GetRandomColor = function () {
        return "rgb(" + (Math.floor(Math.random() * 250) + 1) + ", " + (Math.floor(Math.random() * 250) + 1) + ", " + (Math.floor(Math.random() * 250) + 1) + ")";
    };
    GraphicsRenderer.prototype.GetRandomVelocity = function () {
        var axi = [
            "X", 
            "Y"
        ][Math.floor(Math.random() * 2)], velocity = EndGate.Core.Assets.Vector2d.Zero();
        velocity[axi] = Math.floor(Math.random() * GraphicsRenderer.MaxVelocity) + GraphicsRenderer.MinVelocity;
        return velocity;
    };
    GraphicsRenderer.prototype.GetRandomIntervalChange = function () {
        return Math.floor(Math.random() * GraphicsRenderer.MaxIntervalChange) + GraphicsRenderer.MinIntervalChange;
    };
    return GraphicsRenderer;
})(EndGate.Core.Game);
//@ sourceMappingURL=graphicsRendering.js.map
