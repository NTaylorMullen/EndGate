/// <reference path="../../Scripts/endGate.core.client.ts" />

class MovingShape implements IUpdateable {
    // Rotate 180 deg every second
    private static RotationSpeed: number = Math.PI;

    public Graphic: EndGate.Core.Graphics.Graphic2d;
    private _velocity: EndGate.Core.Assets.Vector2d;
    private _directionInterval: number;
    private _lastChangedDirection: number;
    private _rotationMultiplier: number;

    constructor(graphic: EndGate.Core.Graphics.Graphic2d, velocity: EndGate.Core.Assets.Vector2d, directionInterval: number) {
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
    }

    public Update(gameTime: EndGate.Core.GameTime): void {
        var percentOfSecond = gameTime.Elapsed / 1000;

        if (gameTime.Now.getTime() - this._lastChangedDirection >= this._directionInterval) {
            this._velocity = this._velocity.Multiply(-1);
            this._rotationMultiplier *= -1;
            this._lastChangedDirection = gameTime.Now.getTime();
        }

        this.Graphic.Rotation += percentOfSecond * MovingShape.RotationSpeed * this._rotationMultiplier;
        this.Graphic.Position = this.Graphic.Position.Add(this._velocity.Multiply(percentOfSecond));
    }
}

class GraphicsRenderer extends EndGate.Core.Game {
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

    public Update(gameTime: EndGate.Core.GameTime): void {
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
            rect = new EndGate.Core.Graphics.Shapes.Rectangle(randomPos.X, randomPos.Y, randomSize.Width, randomSize.Height, this.GetRandomColor()),
            shape;

        shape = new MovingShape(rect, randomVel, randomChange);
        this._shapes.push(shape);
        this.Scene.Add(rect);
    }

    public AddRandomCircle(): void {
        var randomPos = this.GetRandomPosition(),
            randomRadius = this.GetRandomRadius(),
            randomVel = this.GetRandomVelocity(),
            randomChange = this.GetRandomIntervalChange(),
            circle = new EndGate.Core.Graphics.Shapes.Circle(randomPos.X, randomPos.Y, randomRadius, this.GetRandomColor()),
            shape;

        shape = new MovingShape(circle, randomVel, randomChange);
        this._shapes.push(shape);
        this.Scene.Add(circle);
    }

    private GetRandomPosition(): EndGate.Core.Assets.Vector2d {
        return new EndGate.Core.Assets.Vector2d(Math.floor((Math.random() * this._width) + 1), Math.floor((Math.random() * this._height) + 1));
    }

    private GetRandomSize(): EndGate.Core.Assets.Size2d {
        return new EndGate.Core.Assets.Size2d(Math.floor((Math.random() * this._width * .1) + 5), Math.floor((Math.random() * this._height * .1) + 5));
    }

    private GetRandomRadius(): number {
        return Math.floor(Math.random() * this._width * .05) + 5
    }

    private GetRandomColor(): string {
        return "rgb(" + (Math.floor(Math.random() * 250) + 1) + ", " + (Math.floor(Math.random() * 250) + 1) + ", " + (Math.floor(Math.random() * 250) + 1) + ")";
    }

    private GetRandomVelocity(): EndGate.Core.Assets.Vector2d {
        var axi = ["X", "Y"][Math.floor(Math.random() * 2)],
            velocity = EndGate.Core.Assets.Vector2d.Zero();

        velocity[axi] = Math.floor(Math.random() * GraphicsRenderer.MaxVelocity) + GraphicsRenderer.MinVelocity

        return velocity;
    }

    private GetRandomIntervalChange(): number {
        return Math.floor(Math.random() * GraphicsRenderer.MaxIntervalChange) + GraphicsRenderer.MinIntervalChange;
    }
}