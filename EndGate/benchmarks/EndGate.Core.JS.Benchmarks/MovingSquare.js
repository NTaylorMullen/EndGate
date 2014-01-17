var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MovingSquare = (function (_super) {
    __extends(MovingSquare, _super);
    function MovingSquare(startPosition, _sceneSize) {
        _super.call(this, startPosition.X, startPosition.Y, new eg.Graphics.ImageSource("bunny.png", MovingSquare.Size.Width, MovingSquare.Size.Height));
        this._sceneSize = _sceneSize;

        this.Velocity = new eg.Vector2d(Math.random() * 10, (Math.random() * 10) - 5);
        this._lastPosition = new eg.Vector2d(-1000, -1000);
    }
    MovingSquare.prototype.Render = function () {
        if (!this._lastPosition.Equivalent(this.Position)) {
            this._lastPosition = this.Position;
            this.Position = this.Position.Add(this.Velocity);
            this.Velocity.Y += .75;

            if (this.Position.X > this._sceneSize.Width) {
                this.Velocity = this.Velocity.Negate();
                this.Position.X = this._sceneSize.Width;
            } else if (this.Position.X < 0) {
                this.Velocity = this.Velocity.Negate();
                this.Position.X = 0;
            }

            if (this.Position.Y > this._sceneSize.Height) {
                this.Velocity.Y *= -0.85;
                this.Position.Y = this._sceneSize.Height;
                if (Math.random() > 0.5) {
                    this.Velocity.Y -= Math.random() * 6;
                }
            } else if (this.Position.Y < 0) {
                this.Velocity.Y = 0;
                this.Position.Y = 0;
            }
        }
    };
    MovingSquare.Size = new eg.Size2d(26, 37);
    MovingSquare.SceneSize = new eg.Size2d(800, 600);
    return MovingSquare;
})(eg.Graphics.Sprite2d);
//# sourceMappingURL=MovingSquare.js.map
