var EndGate;
(function (EndGate) {
    (function (Map) {
        var SceneryHandler = (function () {
            function SceneryHandler(foregroundCanvas, camera) {
                this._camera = camera;
                this._layers = [];
                this._sceneryCanvas = this.BuildSceneryCanvas(foregroundCanvas);
                this._renderer = new EndGate.Rendering.Camera2dRenderer(this._sceneryCanvas, this._camera);
            }
            SceneryHandler.prototype.AddLayer = function (layer) {
                this._layers.push(layer);
            };
            SceneryHandler.prototype.RemoveLayer = function (layer) {
                this._layers.splice(this._layers.indexOf(layer), 1);
            };
            SceneryHandler.prototype.Draw = function () {
                this._layers.sort(EndGate.Graphics.Abstractions.Graphic2d._zindexSort);
                this._renderer.Render(this._layers);
            };
            SceneryHandler.prototype.BuildSceneryCanvas = function (foreground) {
                var sceneryCanvas = document.createElement("canvas"), baseElement = foreground;
                sceneryCanvas.width = foreground.width;
                sceneryCanvas.height = foreground.height;
                sceneryCanvas.style.position = "absolute";
                sceneryCanvas.style.zIndex = "1";
                foreground.parentElement.insertBefore(sceneryCanvas, foreground);
                return sceneryCanvas;
            };
            return SceneryHandler;
        })();
        Map.SceneryHandler = SceneryHandler;        
    })(EndGate.Map || (EndGate.Map = {}));
    var Map = EndGate.Map;
})(EndGate || (EndGate = {}));
//@ sourceMappingURL=SceneryHandler.js.map
