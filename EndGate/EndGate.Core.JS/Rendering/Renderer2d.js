var EndGate;
(function (EndGate) {
    /// <reference path="IRenderer.ts" />
    /// <reference path="IRenderable.ts" />
    /// <reference path="../Utilities/EventHandler.ts" />
    /// <reference path="../Assets/Sizes/Size2d.ts" />
    (function (Rendering) {
        var Renderer2d = (function () {
            function Renderer2d(renderOnto) {
                this._visibleCanvas = renderOnto;
                this._visibleContext = renderOnto.getContext("2d");
                // Create an equally sized canvas for a buffer
                this._bufferCanvas = document.createElement("canvas");
                this._bufferContext = this._bufferCanvas.getContext("2d");
                this.OnRendererSizeChange = new EndGate.EventHandler();
                this.UpdateBufferSize();
                this._disposed = false;
            }
            Renderer2d._zindexSort = function (a, b) {
                return a.ZIndex - b.ZIndex;
            };
            Renderer2d.prototype.Render = function (renderables) {
                // Check if our visible canvas has changed size
                if(this._bufferCanvas.width !== this._visibleCanvas.width || this._bufferCanvas.height !== this._visibleCanvas.height) {
                    this.UpdateBufferSize();
                }
                // Push buffer to screen
                this._visibleContext.clearRect(0, 0, this._visibleCanvas.width, this._visibleCanvas.height);
                this._visibleContext.drawImage(this._bufferCanvas, 0, 0);
                // Clear our buffer to prepare it for new drawings
                this._ClearBuffer();
                // Sort the renderables by the ZIndex so we draw in the correct order (for layering);
                renderables.sort(Renderer2d._zindexSort);
                // We do not save or restore the canvas state because we want to let the
                // dev decide how they manipulate the canvas
                for(var i = 0; i < renderables.length; i++) {
                    renderables[i].Draw(this._bufferContext);
                }
                return this._bufferContext;
            };
            Renderer2d.prototype.Dispose = function () {
                if(!this._disposed) {
                    this._disposed = true;
                    this._visibleCanvas.parentNode.removeChild(this._visibleCanvas);
                }
            };
            Renderer2d.prototype._ClearBuffer = function () {
                this._bufferContext.clearRect(0, 0, this._bufferCanvas.width, this._bufferCanvas.height);
            };
            Renderer2d.prototype.UpdateBufferSize = function () {
                this._bufferCanvas.width = this._visibleCanvas.width;
                this._bufferCanvas.height = this._visibleCanvas.height;
                this.OnRendererSizeChange.Trigger(new EndGate.Size2d(this._visibleCanvas.width, this._visibleCanvas.height));
            };
            return Renderer2d;
        })();
        Rendering.Renderer2d = Renderer2d;        
    })(EndGate.Rendering || (EndGate.Rendering = {}));
    var Rendering = EndGate.Rendering;
})(EndGate || (EndGate = {}));
//@ sourceMappingURL=Renderer2d.js.map
