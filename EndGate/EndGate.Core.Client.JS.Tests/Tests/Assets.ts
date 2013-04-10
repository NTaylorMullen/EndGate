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