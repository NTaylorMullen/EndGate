/// <reference path="../../../Scripts/endgate.d.ts" />
/// <reference path="FireExplosion.ts" />
/// <reference path="ElectricPulse.ts" />
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

        // This method is triggered at the end of the "super" call within the constructor, it's called once per game and should contain all image/audio loading resources.
        public LoadContent(): void {
            // The LoadImage functions return the loaded image.
            FireExplosion.BaseGraphic = this.Content.LoadImage("firePulse", "/Content/Samples/AnimatedSprites/images/fire_explosion.png", 1152, 128);
            ElectricPulse.BaseGraphic = this.Content.LoadImage("electricPulse", "/Content/Samples/AnimatedSprites/images/electric_pulse.png", 1152, 128);            
        }

        public Update(gameTime: eg.GameTime): void {
            this._fireExplosionManager.Update(gameTime);
            this._electricPulseManager.Update(gameTime);
        }
    }

}