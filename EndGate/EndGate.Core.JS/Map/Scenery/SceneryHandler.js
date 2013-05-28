var EndGate;
(function (EndGate) {
    /// <reference path="../../Rendering/Camera/Camera2d.ts" />
    /// <reference path="../../Rendering/Camera/Camera2dRenderer.ts" />
    /// <reference path="../../Rendering/IRenderer.ts" />
    /// <reference path="../../Graphics/Graphic2d.ts" />
    (function (Map) {
        /**
        * Defines a SceneryHandler which specializes in drawing large background type layers to depict scenery.
        */
        var SceneryHandler = (function () {
            /**
            * Creates a new instance of the SceneryHandler object.
            * @param scene The primary scene that this SceneryHandler will play behind.
            */
            function SceneryHandler(scene) {
                this._camera = scene.Camera;
                this._layers = [];
                this._sceneryCanvas = this.BuildSceneryCanvas(scene.DrawArea);
                this._renderer = new EndGate.Rendering.Camera2dRenderer(this._sceneryCanvas, this._camera);
            }
            SceneryHandler.prototype.AddLayer = /**
            * Adds a layer to the scenery.
            * @param layer The layer to add.
            */
            function (layer) {
                this._layers.push(layer);
            };
            SceneryHandler.prototype.RemoveLayer = /**
            * Removes a layer from the scenery.
            * @param layer The layer to remove.
            */
            function (layer) {
                this._layers.splice(this._layers.indexOf(layer), 1);
            };
            SceneryHandler.prototype.Draw = /**
            * Draws all layers onto the given context.  If this is used via a MapManager object, Draw will automatically be called.
            * @param context The canvas context to draw the scenery onto.
            */
            function () {
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
