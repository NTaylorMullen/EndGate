/// <reference path="../Scripts/endGate.core.client.ts" />

class UpdateTester extends EndGate.Core.Game {

    public UpdateCount: number;

    private _onUpdateLimit: Function;
    private _updateLimit: number;

    constructor(updateRate: number, onUpdateLimit: Function, updateLimit: number)
    {
        super();

        this.Configuration.UpdateRate(updateRate);
        this.UpdateCount = 0;
        this._onUpdateLimit = onUpdateLimit;
        this._updateLimit = updateLimit;
    }

    public Update(gameTime: EndGate.Core.GameTime) {
        this.UpdateCount++;
        if (this.UpdateCount === this._updateLimit) {
            this._onUpdateLimit();
        }
    }
}

class DrawTester extends EndGate.Core.Game {
    public DrawCount: number;

    private _onDrawLimit: Function;
    private _drawLimit: number;

    constructor(onDrawLimit: Function, drawLimit: number) {
        super();

        this.DrawCount = 0;
        this._onDrawLimit = onDrawLimit;
        this._drawLimit = drawLimit;
    }

    public Draw(context: CanvasRenderingContext2D) {
        this.DrawCount++;
        if (this.DrawCount === this._drawLimit) {
            this._onDrawLimit();
        }
    }
}

class CollisionManagerGame extends EndGate.Core.Game
{
    constructor() {
        super();
    }
    public MonitorCollision(obj: EndGate.Core.Collision.Collidable): void
    {
        this.CollisionManager.Monitor(obj);
    }

    public RegisterCollisionEvent(e: Function): void
    {
        this.CollisionManager.OnCollision.Bind(e);
    }
}