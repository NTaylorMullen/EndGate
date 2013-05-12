/// <reference path="../../Scripts/endgate.ts" />

class MovingShape implements eg.IUpdateable extends eg.Collision.Collidable {
    // Rotate 180 deg every second
    private static RotationSpeed: number = Math.PI;

    public Graphic: eg.Graphics.Abstractions.Graphic2d;
    private _velocity: eg.Vector2d;
    private _directionInterval: number;
    private _lastChangedDirection: number;
    private _rotationMultiplier: number;

    private _fadeSpeed: number = 2;
    private _collisionBorderThickness: number = 5;
    private _collisionColorAlpha: number = 0;
    private _collisionColor: number[] = [255,0,0];

    constructor(graphic: eg.Graphics.Abstractions.Graphic2d, velocity: eg.Vector2d, directionInterval: number) {
        super(null);

        if (graphic._type === "Rectangle") {
            this.Bounds = new eg.Bounds.BoundingRectangle(graphic.Position, (<eg.Graphics.Rectangle>graphic).Size);
        }
        else if (graphic._type === "Circle") {
            this.Bounds = new eg.Bounds.BoundingCircle(graphic.Position, (<eg.Graphics.Circle>graphic).Radius);
        }

        this.Graphic = graphic;
        this._velocity = velocity;
        this._directionInterval = directionInterval;
        this._lastChangedDirection = new Date().getTime();

        // No need to rotate circles
        if (graphic._type === "Circle") {
            this._rotationMultiplier = 0;
        }
        else {
            this._rotationMultiplier = 1;
        }

        (<eg.Graphics.Abstractions.Shape>this.Graphic).Border(this._collisionBorderThickness, "rgba(" + this._collisionColor + ",0,0," + this._collisionColorAlpha + ")");
    }

    public Collided(data: eg.Collision.Assets.CollisionData): void {
        this._collisionColorAlpha = 1;

        var strColor = (<eg.Graphics.Abstractions.Shape>(<MovingShape>data.With).Graphic).Color().replace("rgb(", "").replace(")", "").split(",");

        for (var i = 0; i < strColor.length; i++) {
            this._collisionColor[i] = parseInt(strColor[i]);
        }

        super.Collided(data);
    }

    public Update(gameTime: eg.GameTime): void {
        if (gameTime.Now.getTime() - this._lastChangedDirection >= this._directionInterval) {
            this._velocity = this._velocity.Multiply(-1);
            this._rotationMultiplier *= -1;
            this._lastChangedDirection = gameTime.Now.getTime();
        }

        this._collisionColorAlpha = Math.max(this._collisionColorAlpha - gameTime.ElapsedSecond * this._fadeSpeed, 0);

        (<eg.Graphics.Abstractions.Shape>this.Graphic).BorderColor("rgba(" + this._collisionColor[0] + "," + this._collisionColor[1] + "," + this._collisionColor[2] + "," + this._collisionColorAlpha + ")");

        this.Graphic.Rotation = this.Bounds.Rotation = this.Graphic.Rotation + gameTime.ElapsedSecond * MovingShape.RotationSpeed * this._rotationMultiplier;
        this.Graphic.Position = this.Bounds.Position = this.Graphic.Position.Add(this._velocity.Multiply(gameTime.ElapsedSecond));
    }
}

class GraphicsRenderer extends eg.Game {
    private static MaxVelocity: number = 100;
    private static MinVelocity: number = 30;
    private static MinIntervalChange: number = 1000;
    private static MaxIntervalChange: number = 4000;
    private _shapes: MovingShape[];
    private _width: number;
    private _height: number;

    constructor(canvas: HTMLCanvasElement) {
        super(canvas);

        this._width = canvas.width;
        this._height = canvas.height;
        this._shapes = [];
    }

    public Update(gameTime: eg.GameTime): void {
        for (var i = 0; i < this._shapes.length; i++) {
            this._shapes[i].Update(gameTime);
        }
    }

    public Clear(): void {
        for (var i = 0; i < this._shapes.length; i++) {
            this.Scene.Remove(this._shapes[i].Graphic);
        }

        this._shapes = [];
    }

    public AddRandomRectangle(): void {
        var randomPos = this.GetRandomPosition(),
            randomSize = this.GetRandomSize(),
            randomVel = this.GetRandomVelocity(),
            randomChange = this.GetRandomIntervalChange(),
            rect = new eg.Graphics.Rectangle(randomPos.X, randomPos.Y, randomSize.Width, randomSize.Height, this.GetRandomColor()),
            shape;

        shape = new MovingShape(rect, randomVel, randomChange);
        this._shapes.push(shape);

        this.Scene.Add(rect);

        this.CollisionManager.Monitor(shape);
    }

    public AddRandomCircle(): void {
        var randomPos = this.GetRandomPosition(),
            randomRadius = this.GetRandomRadius(),
            randomVel = this.GetRandomVelocity(),
            randomChange = this.GetRandomIntervalChange(),
            circle = new eg.Graphics.Circle(randomPos.X, randomPos.Y, randomRadius, this.GetRandomColor()),
            shape;

        shape = new MovingShape(circle, randomVel, randomChange);
        this._shapes.push(shape);
        this.Scene.Add(circle);

        this.CollisionManager.Monitor(shape);
    }

    private GetRandomPosition(): eg.Vector2d {
        return new eg.Vector2d(Math.floor((Math.random() * this._width) + 1), Math.floor((Math.random() * this._height) + 1));
    }

    private GetRandomSize(): eg.Size2d {
        return new eg.Size2d(Math.floor((Math.random() * this._width * .1) + 5), Math.floor((Math.random() * this._height * .1) + 5));
    }

    private GetRandomRadius(): number {
        return Math.floor(Math.random() * this._width * .05) + 5
    }

    private GetRandomColor(): string {
        return "rgb(" + (Math.floor(Math.random() * 250) + 1) + ", " + (Math.floor(Math.random() * 250) + 1) + ", " + (Math.floor(Math.random() * 250) + 1) + ")";
    }

    private GetRandomVelocity(): eg.Vector2d {
        var axi = ["X", "Y"][Math.floor(Math.random() * 2)],
            velocity = eg.Vector2d.Zero();

        velocity[axi] = Math.floor(Math.random() * GraphicsRenderer.MaxVelocity) + GraphicsRenderer.MinVelocity

        return velocity;
    }

    private GetRandomIntervalChange(): number {
        return Math.floor(Math.random() * GraphicsRenderer.MaxIntervalChange) + GraphicsRenderer.MinIntervalChange;
    }
}