﻿/// <reference path="Camera2d.ts" />
/// <reference path="../Renderer2d.ts" />
/// <reference path="../../Assets/Sizes/Size2d.ts" />
/// <reference path="Camera2dCanvasContextBuilder.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var EndGate;
(function (EndGate) {
    (function (Rendering) {
        /**
        * Defines a camera rendering object that when used in conjunction with a Camera2d draws all objects in a camera relative position.
        */
        var Camera2dRenderer = (function (_super) {
            __extends(Camera2dRenderer, _super);
            /**
            * Creates a new instance of the Camera2dRenderer.
            * @param renderOnto The canvas to render onto.
            * @param camera The camera that ultimately decides what is drawn to the renderOnto canvas.
            */
            function Camera2dRenderer(renderOnto, camera) {
                var _this = this;
                _super.call(this, renderOnto);

                this._camera = camera;
                this._contextBuilder = new EndGate.Rendering._.Camera2dCanvasContextBuilder(this._camera);

                this.OnRendererSizeChange.Bind(function (newSize) {
                    _this._contextBuilder._UpdateCanvasCenter(newSize);
                    _this._camera.Size = newSize;
                });

                this._contextBuilder._UpdateCanvasCenter(new EndGate.Size2d(renderOnto.width, renderOnto.height));
                this._BufferContext = this._contextBuilder.Build(this._BufferContext);
            }
            /**
            * Renders the provided renderables onto the renderOnto canvas.  Returns the canvas that was rendered onto.
            * @param renderables Array of items that are to be rendered.
            */
            Camera2dRenderer.prototype.Render = function (preRender, renderables) {
                if (typeof preRender === "undefined") { preRender = function (_) {
                }; }
                if (typeof renderables === "undefined") { renderables = []; }
                var context, inverseScale = this._camera._GetInverseDistanceScale();

                this._BufferContext.save();
                this._BufferContext.scale(inverseScale, inverseScale);

                context = _super.prototype.Render.call(this, preRender, this.GetOnScreenRenderables(renderables));

                this._BufferContext.restore();

                return context;
            };

            Camera2dRenderer.prototype._ClearBuffer = function () {
                var cameraScale = this._camera._GetDistanceScale();
                this._BufferContext.unModifiedClearRect(0, 0, this._BufferCanvas.width * cameraScale, this._BufferCanvas.height * cameraScale);
            };

            Camera2dRenderer.prototype.GetOnScreenRenderables = function (allRenderables) {
                var onscreen = [], scale = this._camera._GetDistanceScale(), unscale = 1 / scale;

                // Scale camera size to our zoom level
                this._camera.Scale(scale, scale);

                for (var i = 0; i < allRenderables.length; i++) {
                    if (allRenderables[i].Visible && this._camera.Intersects(allRenderables[i].GetDrawBounds())) {
                        onscreen.push(allRenderables[i]);
                    }
                }

                this._camera.Scale(unscale, unscale);

                return onscreen;
            };
            return Camera2dRenderer;
        })(EndGate.Rendering.Renderer2d);
        Rendering.Camera2dRenderer = Camera2dRenderer;
    })(EndGate.Rendering || (EndGate.Rendering = {}));
    var Rendering = EndGate.Rendering;
})(EndGate || (EndGate = {}));
