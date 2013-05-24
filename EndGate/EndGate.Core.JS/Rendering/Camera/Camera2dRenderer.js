var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var EndGate;
(function (EndGate) {
    /// <reference path="Camera2d.ts" />
    /// <reference path="../Renderer2d.ts" />
    /// <reference path="../../Assets/Sizes/Size2d.ts" />
    /// <reference path="Camera2dCanvasContextBuilder.ts" />
    (function (Rendering) {
        var Camera2dRenderer = (function (_super) {
            __extends(Camera2dRenderer, _super);
            function Camera2dRenderer(renderOnto, camera) {
                        _super.call(this, renderOnto);
                this._camera = camera;
                this._contextBuilder = new Rendering._.Camera2dCanvasContextBuilder(this._camera);
                this.OnRendererSizeChange.Bind(this._contextBuilder.UpdateCanvasCenter);
                this._contextBuilder.UpdateCanvasCenter(new EndGate.Size2d(renderOnto.width, renderOnto.height));
                this._bufferContext = this._contextBuilder.BuildFrom(this._bufferContext);
            }
            Camera2dRenderer.prototype.Render = function (renderables) {
                var context, inverseScale = this._camera.GetInverseDistanceScale();
                this._bufferContext.save();
                this._bufferContext.scale(inverseScale, inverseScale);
                context = _super.prototype.Render.call(this, this.GetOnScreenRenderables(renderables));
                this._bufferContext.restore();
                return context;
            };
            Camera2dRenderer.prototype._ClearBuffer = function () {
                var cameraScale = this._camera.GetDistanceScale();
                (this._bufferContext).unModifiedClearRect(0, 0, this._bufferCanvas.width * cameraScale, this._bufferCanvas.height * cameraScale);
            };
            Camera2dRenderer.prototype.GetOnScreenRenderables = function (allRenderables) {
                var onscreen = [], scale = this._camera.GetDistanceScale(), unscale = 1 / scale;
                // Scale camera size to our zoom level
                this._camera.Scale(scale, scale);
                for(var i = 0; i < allRenderables.length; i++) {
                    if(this._camera.Intersects(allRenderables[i].GetDrawBounds())) {
                        onscreen.push(allRenderables[i]);
                    }
                }
                this._camera.Scale(unscale, unscale);
                return onscreen;
            };
            return Camera2dRenderer;
        })(Rendering.Renderer2d);
        Rendering.Camera2dRenderer = Camera2dRenderer;        
    })(EndGate.Rendering || (EndGate.Rendering = {}));
    var Rendering = EndGate.Rendering;
})(EndGate || (EndGate = {}));
