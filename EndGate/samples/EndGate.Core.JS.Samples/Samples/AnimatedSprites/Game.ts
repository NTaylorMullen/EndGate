/// <reference path="../../Scripts/endgate.d.ts" />
/// <reference path="FireExplosionManager.ts" />
/// <reference path="ElectricPulseManager.ts" />

// Wrap in module to keep code out of global scope
module AnimatedSprites {

    export class Game extends eg.Game {
        private _fireExplosionManager: FireExplosionManager;
        private _electricPulseManager: ElectricPulseManager;

        constructor(canvas: HTMLCanvasElement) {
            super(canvas);

            this._fireExplosionManager = new FireExplosionManager(this.Input.Mouse, this.Scene);
            this._electricPulseManager = new ElectricPulseManager(this.Input.Mouse, this.Scene);
        }

        public Update(gameTime: eg.GameTime): void {
            this._fireExplosionManager.Update(gameTime);
            this._electricPulseManager.Update(gameTime);
        }
    }

}