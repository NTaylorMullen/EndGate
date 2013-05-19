var World = (function () {
    function World(gameScene, canvasCenter) {
        this._rectangleSize = new eg.Size2d(150, 325);
        this._circleRadius = 100;
        this.RedRectangle = new eg.Graphics.Rectangle(canvasCenter.X - this._rectangleSize.Width / 3, canvasCenter.Y, this._rectangleSize.Width, this._rectangleSize.Height, "red");
        this.RedRectangle.Rotation = Math.PI / 4;
        this.GreenRectangle = new eg.Graphics.Rectangle(canvasCenter.X + this._rectangleSize.Width / 3, canvasCenter.Y, this._rectangleSize.Width, this._rectangleSize.Height, "green");
        this.GreenRectangle.Rotation = -Math.PI / 4;
        this.BlueCircle = new eg.Graphics.Circle(canvasCenter.X, canvasCenter.Y, this._circleRadius, "blue");
        gameScene.Add(this.RedRectangle);
        gameScene.Add(this.GreenRectangle);
        gameScene.Add(this.BlueCircle);
    }
    return World;
})();
//@ sourceMappingURL=World.js.map
