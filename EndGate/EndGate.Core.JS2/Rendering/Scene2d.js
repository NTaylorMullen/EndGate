var EndGate;
(function (EndGate) {
    (function (Rendering) {
        var Scene2d = (function () {
            function Scene2d(drawArea, onDraw) {
                this._type = "Scene";
                this._actors = [];
                if(typeof drawArea === "undefined") {
                    drawArea = this.CreateDefaultDrawArea();
                }
                if(typeof onDraw === "undefined") {
                    this._onDraw = function (_) {
                    };
                } else {
                    this._onDraw = onDraw;
                }
                this.ApplyStyles(drawArea);
                this.DrawArea = drawArea;
                this.Camera = new Rendering.Camera2d(new EndGate.Vector2d(this.DrawArea.width / 2, this.DrawArea.height / 2), new EndGate.Size2d(this.DrawArea.width, this.DrawArea.height));
                this._renderer = new Rendering.Camera2dRenderer(this.DrawArea, this.Camera);
                this._disposed = false;
            }
            Scene2d.prototype.Add = function (actor) {
                this._actors.push(actor);
            };
            Scene2d.prototype.Remove = function (actor) {
                for(var i = 0; i < this._actors.length; i++) {
                    if(this._actors[i] === actor) {
                        this._actors.splice(i, 1);
                        return;
                    }
                }
            };
            Scene2d.prototype.Draw = function () {
                this._onDraw(this._renderer.Render(this._actors));
            };
            Scene2d.prototype.Dispose = function () {
                if(!this._disposed) {
                    this._disposed = true;
                    this._actors = [];
                    this._renderer.Dispose();
                }
            };
            Scene2d.prototype.ApplyStyles = function (drawArea) {
                drawArea.style.position = "absolute";
                drawArea.style.zIndex = "2";
                drawArea.parentElement.style.position = "relative";
            };
            Scene2d.prototype.CreateDefaultDrawArea = function () {
                var drawArea = document.createElement("canvas");
                drawArea.width = window.innerWidth;
                drawArea.height = window.innerHeight;
                document.getElementsByTagName('body')[0].appendChild(drawArea);
                return drawArea;
            };
            return Scene2d;
        })();
        Rendering.Scene2d = Scene2d;        
    })(EndGate.Rendering || (EndGate.Rendering = {}));
    var Rendering = EndGate.Rendering;
})(EndGate || (EndGate = {}));
//@ sourceMappingURL=Scene2d.js.map
