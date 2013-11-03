/// <reference path="../Scripts/endgate.d.ts" />

class UpdateTester extends eg.Game {

    public UpdateCount: number;

    private _onUpdateLimit: Function;
    private _updateLimit: number;

    constructor(updateRate: number, onUpdateLimit: Function, updateLimit: number)
    {
        super();

        this.Configuration.UpdateRate = updateRate;
        this.UpdateCount = 0;
        this._onUpdateLimit = onUpdateLimit;
        this._updateLimit = updateLimit;
    }

    public Update(gameTime: eg.GameTime) {
        this.UpdateCount++;
        if (this.UpdateCount === this._updateLimit) {
            this._onUpdateLimit();
        }
    }
}

class DrawTester extends eg.Game {
    public DrawCount: number;

    private _onDrawLimit: Function;
    private _drawLimit: number;

    constructor(onDrawLimit: Function, drawLimit: number) {
        super();

        this.DrawCount = 0;
        this._onDrawLimit = onDrawLimit;
        this._drawLimit = drawLimit;
    }

    public Draw() {
        this.DrawCount++;
        if (this.DrawCount === this._drawLimit) {
            this._onDrawLimit();
        }
    }
}

class CollisionManagerGame extends eg.Game
{
    constructor() {
        super();
    }
    public MonitorCollision(obj: eg.Collision.Collidable): void
    {
        this.CollisionManager.Monitor(obj);
    }

    public RegisterCollisionEvent(e: (first: eg.Collision.Collidable, second: eg.Collision.Collidable) => void): void
    {
        this.CollisionManager.OnCollision.Bind(e);
    }
}