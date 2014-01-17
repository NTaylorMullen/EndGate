class MovingSquare extends eg.Graphics.Sprite2d {
    public static Size: eg.Size2d = new eg.Size2d(26, 37);
    public static SceneSize: eg.Size2d = new eg.Size2d(800, 600);

    public Position: eg.Vector2d;
    public Velocity: eg.Vector2d;
    private _lastPosition: eg.Vector2d;

    constructor(startPosition: eg.Vector2d, private _sceneSize: eg.Size2d) {
        super(startPosition.X, startPosition.Y, new eg.Graphics.ImageSource("bunny.png", MovingSquare.Size.Width, MovingSquare.Size.Height));

        this.Velocity = new eg.Vector2d(Math.random() * 10, (Math.random() * 10) - 5);
        this._lastPosition = new eg.Vector2d(-1000, -1000);
        
    }

    public Render(): void {
        if (!this._lastPosition.Equivalent(this.Position)) {
            this._lastPosition = this.Position;
            this.Position = this.Position.Add(this.Velocity);
            this.Velocity.Y += .75;

            if (this.Position.X > this._sceneSize.Width) {
                this.Velocity = this.Velocity.Negate();
                this.Position.X = this._sceneSize.Width;
            }
            else if (this.Position.X < 0) {
                this.Velocity = this.Velocity.Negate();
                this.Position.X = 0;
            }

            if (this.Position.Y > this._sceneSize.Height) {
                this.Velocity.Y *= -0.85;
                this.Position.Y = this._sceneSize.Height;
                if (Math.random() > 0.5) {
                    this.Velocity.Y -= Math.random() * 6;
                }
            }
            else if (this.Position.Y < 0) {
                this.Velocity.Y = 0;
                this.Position.Y = 0;
            }
        }
    }
} 