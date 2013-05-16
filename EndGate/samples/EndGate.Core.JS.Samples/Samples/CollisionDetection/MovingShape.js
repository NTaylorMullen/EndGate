var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MovingShape = (function (_super) {
    __extends(MovingShape, _super);
    function MovingShape(Graphic, _velocity, _directionInterval) {
        _super.call(this, Graphic.GetDrawBounds());
        this.Graphic = Graphic;
        this._velocity = _velocity;
        this._directionInterval = _directionInterval;
        this._lastChangedDirection = new Date().getTime();
        this._rotationMultiplier = 1;
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
    MovingShape.prototype.Collided = function (data) {
        this._collisionColorAlpha = 1;
        var strColor = (data.With).Graphic.Color().replace("rgb(", "").replace(")", "").split(",");
        for(var i = 0; i < strColor.length; i++) {
            this._collisionColor[i] = parseInt(strColor[i]);
        }
        _super.prototype.Collided.call(this, data);
    };
    MovingShape.prototype.Update = function (gameTime) {
        if(gameTime.Now.getTime() - this._lastChangedDirection >= this._directionInterval) {
            this._velocity = this._velocity.Multiply(-1);
            this._rotationMultiplier *= -1;
            this._lastChangedDirection = gameTime.Now.getTime();
        }
        this._collisionColorAlpha = Math.max(this._collisionColorAlpha - gameTime.ElapsedSecond * this._fadeSpeed, 0);
        this.Graphic.BorderColor("rgba(" + this._collisionColor[0] + "," + this._collisionColor[1] + "," + this._collisionColor[2] + "," + this._collisionColorAlpha + ")");
        this.Graphic.Rotation = this.Bounds.Rotation = this.Graphic.Rotation + gameTime.ElapsedSecond * MovingShape.RotationSpeed * this._rotationMultiplier;
        this.Graphic.Position = this.Bounds.Position = this.Graphic.Position.Add(this._velocity.Multiply(gameTime.ElapsedSecond));
    };
    return MovingShape;
})(eg.Collision.Collidable);
//@ sourceMappingURL=MovingShape.js.map
