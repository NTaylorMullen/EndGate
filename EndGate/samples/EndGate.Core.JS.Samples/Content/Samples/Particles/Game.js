/// <reference path="../../../Scripts/jquery.d.ts" />
/// <reference path="../../../Scripts/endgate.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
// Wrap in module to keep code out of global scope
var Particles;
(function (Particles) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game(_canvas, _tweenFunctionSelect) {
            _super.call(this, _canvas);
            this._canvas = _canvas;
            this._tweenFunctionSelect = _tweenFunctionSelect;

            this.Emitter = new eg.Particles.Emitter(this._canvas.width / 2, this._canvas.height / 2, eg.Tweening.Functions.Linear.EaseNone);

            // Emitters randomly select Graphic2d's that are part of their texture pool.
            this.Emitter.AddTexture(new eg.Graphics.Circle(0, 0, 3, new eg.Graphics.Color("#1A1EB2")));
            this.Emitter.AddTexture(new eg.Graphics.Circle(0, 0, 1.5, new eg.Graphics.Color("#4E51D8")));
            this.Emitter.AddTexture(new eg.Graphics.Rectangle(0, 0, 3, 5, new eg.Graphics.Color("#7375D8")));
            this.Emitter.AddTexture(new eg.Graphics.Rectangle(0, 0, 7, 5, new eg.Graphics.Color("rgb(4,199,255)")));

            // Starts auto emitting based on the EmissionInterval.  Emissions can be forced via emitter.Emit().
            this.Emitter.Start();

            // Emitters are just like any other Graphic2d's, so they can be positioned and rotated.
            this.Scene.Add(this.Emitter);

            // Populate Tweening function select.
            this.LoadTweeningFunctions();
        }
        Game.prototype.Update = function (gameTime) {
            this.Emitter.Update(gameTime);
        };

        // Finds all of the tweening functions and their types and adds them to the tween function select
        Game.prototype.LoadTweeningFunctions = function () {
            var _this = this;
            for (var fn in eg.Tweening.Functions) {
                if (fn.indexOf("_") === -1) {
                    for (var fnEase in eg.Tweening.Functions[fn]) {
                        if (fnEase.indexOf("_") === -1) {
                            if (fn === "Linear") {
                                this._tweenFunctionSelect.append($("<option value='" + fn + " - " + fnEase + "' selected='selected'>" + fn + " - " + fnEase + "</option>"));
                            } else {
                                this._tweenFunctionSelect.append($("<option value='" + fn + " - " + fnEase + "'>" + fn + " - " + fnEase + "</option>"));
                            }
                        }
                    }
                }
            }

            this._tweenFunctionSelect.change(function () {
                var tweeningFunctionSplit = (_this._tweenFunctionSelect.val()).split(" - ");

                _this.Emitter.EmissionFunction = eg.Tweening.Functions[tweeningFunctionSplit[0]][tweeningFunctionSplit[1]];
            });
        };
        return Game;
    })(eg.Game);
    Particles.Game = Game;
})(Particles || (Particles = {}));
//# sourceMappingURL=Game.js.map
