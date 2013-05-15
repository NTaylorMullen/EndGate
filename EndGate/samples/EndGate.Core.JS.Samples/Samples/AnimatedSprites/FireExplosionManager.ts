/// <reference path="../../Scripts/endgate.ts" />
/// <reference path="FireExplosion.ts" />

class FireExplosionManager implements eg.IUpdateable {
    private _explosions: { [id: number]: FireExplosion; };
    private _explosionIds: number = 0;

    constructor(private _mouse: eg.Input.MouseHandler, private _scene: eg.Rendering.Scene2d) {
        var that = this;

        this._explosions = <any>{};
        // Trigger when any mouse button is clicked over the game area
        this._mouse.OnClick.Bind((event: eg.Input.IMouseClickEvent) => {
            var explosionId = that._explosionIds++,
                // Create FireExplosion at the mouse position, note this assumes that the camera has not moved.
                // If camera moves you will need to translate the mouse position to a camera relative position (function on the game camera).
                explosion = new FireExplosion(event.Position.X, event.Position.Y, () => {
                    // This is the on animation completed callback
                    // We want to remove  the explosions from our list of active explosions (so we don't update it anymore)
                    delete that._explosions[explosionId];
                    // And we want to remove it from the scene so we don't draw it anymore
                    that._scene.Remove(explosion.Graphic);
                });

            // Save the created explosion so we can now update/draw it
            that._explosions[explosionId] = explosion;
            that._scene.Add(explosion.Graphic);
        });
    }

    public Update(gameTime: eg.GameTime): void {
        // Need to update our animations to make them transition through frames
        for (var id in this._explosions) {
            this._explosions[id].Update(gameTime);
        }
    }
}