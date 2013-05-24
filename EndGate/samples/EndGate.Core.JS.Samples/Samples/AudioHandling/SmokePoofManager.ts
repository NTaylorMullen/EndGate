/// <reference path="../../Scripts/endgate.d.ts" />
/// <reference path="SmokePoof.ts" />

// Wrap in module to keep code out of global scope
module AudioHandling {

    export class SmokePoofManager implements eg.IUpdateable {
        private _smokePoofs: { [id: number]: SmokePoof; };
        private _smokePoofIds: number = 0;

        constructor(private _mouse: eg.Input.MouseHandler, private _scene: eg.Rendering.Scene2d, private _onClickSound: eg.Sound.AudioPlayer) {
            var that = this;

            this._smokePoofs = <any>{};
            // Trigger when any mouse button is clicked over the game area
            this._mouse.OnClick.Bind((event: eg.Input.IMouseClickEvent) => {
                var smokePoofId = that._smokePoofIds++,
                    // Create SmokePoof at the mouse position, note this assumes that the camera has not moved.
                    // If camera moves you will need to translate the mouse position to a camera relative position (function on the game camera).
                    smokePoof = new SmokePoof(event.Position.X, event.Position.Y, () => {
                        // This is the on animation completed callback
                        // We want to remove  the explosions from our list of active explosions (so we don't update it anymore)
                        delete that._smokePoofs[smokePoofId];
                        // And we want to remove it from the scene so we don't draw it anymore
                        that._scene.Remove(smokePoof.Graphic);
                    });

                // Play the smoke poof sound.  Since the sound clip has a bit of dead silence at the start we want to seek to 100ms where the actual poof sound starts
                this._onClickSound.Play().Seek(.1);
                // Save the created explosion so we can now update/draw it
                that._smokePoofs[smokePoofId] = smokePoof;
                that._scene.Add(smokePoof.Graphic);
            });
        }

        public Update(gameTime: eg.GameTime): void {
            // Need to update our animations to make them transition through frames
            for (var id in this._smokePoofs) {
                this._smokePoofs[id].Update(gameTime);
            }
        }
    }

}