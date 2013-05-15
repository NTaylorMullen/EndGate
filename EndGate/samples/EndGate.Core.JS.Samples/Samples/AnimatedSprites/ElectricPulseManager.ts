/// <reference path="../../Scripts/endgate.ts" />
/// <reference path="ElectricPulse.ts" />

class ElectricPulseManager {
    private _electricPulses: { [id: number]: ElectricPulse; };
    private _electricPulseIds: number = 0;

    // Pulse every 100 ms
    private _pulseFrequency: number = 100;
    private _lastPulse: number = 0;

    constructor(private _mouse: eg.Input.MouseHandler, private _scene: eg.Rendering.Scene2d) {
        var that = this;

        this._electricPulses = <any>{};
        // Triggered when the mouse is moved over the game area
        this._mouse.OnMove.Bind((event: eg.Input.IMouseEvent) => {
            var electricPulseId,
                electricPulse,
                now = new Date().getTime();

            // Check how long it's been since we last created an electric pulse If it's been more then 
            // X milliseconds(_pulseFrequency) then create a new ElectricPulse
            if (now - that._lastPulse >= that._pulseFrequency) {
                that._lastPulse = now;
                electricPulseId = that._electricPulseIds++;

                // Create ElectricPulse at the mouse position, note this assumes that the camera has not moved.
                // If camera moves you will need to translate the mouse position to a camera relative position (function on the game camera).                
                electricPulse = new ElectricPulse(event.Position.X, event.Position.Y, () => {
                    // This is the on animation completed callback
                    // We want to remove  the electric pulse from our list of active pulses (so we don't update it anymore)
                    delete that._electricPulses[electricPulseId];
                    // And we want to remove it from the scene so we don't draw it anymore
                    that._scene.Remove(electricPulse.Graphic);
                });

                // Save the created electric pulse so we can now update/draw it
                that._electricPulses[electricPulseId] = electricPulse;
                that._scene.Add(electricPulse.Graphic);
            }
        });
    }

    public Update(gameTime: eg.GameTime): void {
        // Need to update our animations to make them transition through frames
        for (var id in this._electricPulses) {
            this._electricPulses[id].Update(gameTime);
        }
    }
}