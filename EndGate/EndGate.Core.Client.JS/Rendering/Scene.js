var EndGate;
(function (EndGate) {
    (function (Core) {
        (function (Rendering) {
            var Scene = (function () {
                function Scene(drawArea) {
                    this._type = "Scene";
                    this._actors = [];
                    if(typeof drawArea === "undefined") {
                        drawArea = this.CreateDefaultDrawArea();
                    }
                    this._renderer = new Rendering.Renderer2d(drawArea);
                    this._disposed = false;
                }
                Scene.prototype.Add = function (actor) {
                    this._actors.push(actor);
                };
                Scene.prototype.Remove = function (actor) {
                    for(var i = 0; i < this._actors.length; i++) {
                        if(this._actors[i] === actor) {
                            this._actors.splice(i, 1);
                            return;
                        }
                    }
                };
                Scene.prototype.Draw = function () {
                    this._renderer.Render(this._actors);
                };
                Scene.prototype.Dispose = function () {
                    if(!this._disposed) {
                        this._disposed = true;
                        this._actors = [];
                        this._renderer.Dispose();
                    }
                };
                Scene.prototype.CreateDefaultDrawArea = function () {
                    var drawArea = document.createElement("canvas");
                    drawArea.width = window.innerWidth;
                    drawArea.height = window.innerHeight;
                    document.getElementsByTagName('body')[0].appendChild(drawArea);
                    return drawArea;
                };
                return Scene;
            })();
            Rendering.Scene = Scene;            
        })(Core.Rendering || (Core.Rendering = {}));
        var Rendering = Core.Rendering;
    })(EndGate.Core || (EndGate.Core = {}));
    var Core = EndGate.Core;
})(EndGate || (EndGate = {}));
