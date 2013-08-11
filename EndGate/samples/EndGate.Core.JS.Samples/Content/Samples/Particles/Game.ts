/// <reference path="../../../Scripts/jquery.d.ts" />
/// <reference path="../../../Scripts/endgate.d.ts" />

// Wrap in module to keep code out of global scope
module Particles {

    export class Game extends eg.Game {
        public Emitter: eg.Particles.Emitter;

        constructor(private _canvas: HTMLCanvasElement, private _tweenFunctionSelect: JQuery) {
            super(_canvas);

            this.Emitter = new eg.Particles.Emitter(this._canvas.width / 2, this._canvas.height / 2, eg.Tweening.Functions.Linear.EaseNone);

            // Emitters randomly select Graphic2d's that are part of their texture pool.
            this.Emitter.AddTexture(new eg.Graphics.Circle(0, 0, 3, "#1A1EB2"));
            this.Emitter.AddTexture(new eg.Graphics.Circle(0, 0, 1.5, "#4E51D8"));
            this.Emitter.AddTexture(new eg.Graphics.Rectangle(0, 0, 3, 5, "#7375D8"));
            this.Emitter.AddTexture(new eg.Graphics.Rectangle(0, 0, 7, 5, "rgb(4,199,255)"));

            // Starts auto emitting based on the EmissionInterval.  Emissions can be forced via emitter.Emit().
            this.Emitter.Start();

            // Emitters are just like any other Graphic2d's, so they can be positioned and rotated.
            this.Scene.Add(this.Emitter);

            // Populate Tweening function select.
            this.LoadTweeningFunctions();
        }

        public Update(gameTime: eg.GameTime): void {
            this.Emitter.Update(gameTime);
        }

        // Finds all of the tweening functions and their types and adds them to the tween function select
        private LoadTweeningFunctions(): void {
            for (var fn in eg.Tweening.Functions) {
                if (fn.indexOf("_") === -1) {
                    for (var fnEase in eg.Tweening.Functions[fn]) {
                        if (fnEase.indexOf("_") === -1) {
                            // Default function is Linear
                            if (fn === "Linear") {
                                this._tweenFunctionSelect.append($("<option value='" + fn + " - " + fnEase + "' selected='selected'>" + fn + " - " + fnEase + "</option>"));
                            }
                            else {
                                this._tweenFunctionSelect.append($("<option value='" + fn + " - " + fnEase + "'>" + fn + " - " + fnEase + "</option>"));
                            }
                        }
                    }
                }
            }

            this._tweenFunctionSelect.change(() => {
                var tweeningFunctionSplit = (<string>this._tweenFunctionSelect.val()).split(" - ");

                this.Emitter.EmissionFunction = eg.Tweening.Functions[tweeningFunctionSplit[0]][tweeningFunctionSplit[1]];
            });
        }
    }

}