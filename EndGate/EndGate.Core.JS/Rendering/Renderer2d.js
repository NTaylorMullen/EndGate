var EndGate;
(function (EndGate) {
    /// <reference path="IRenderer.ts" />
    /// <reference path="IRenderable.ts" />
    /// <reference path="../Utilities/EventHandler.ts" />
    /// <reference path="../Assets/Sizes/Size2d.ts" />
    (function (Rendering) {
        /**
        * Defines a 2d renderer that uses a double buffer to draw graphics.
        */
        var Renderer2d = (function () {
            /**
            * Creates a new instance of the Renderer2d object.
            * @param renderOnto The canvas to render onto.
            */
            function Renderer2d(renderOnto) {
                this._visibleCanvas = renderOnto;
                this._visibleContext = renderOnto.getContext("2d");
                // Create an equally sized canvas for a buffer
                this._BufferCanvas = document.createElement("canvas");
                this._BufferContext = this._BufferCanvas.getContext("2d");
                this.OnRendererSizeChange = new EndGate.EventHandler();
                this.UpdateBufferSize();
                this._disposed = false;
            }
            Renderer2d._zindexSort = function (a, b) {
                return a.ZIndex - b.ZIndex;
            };
            Renderer2d.prototype.Render = /**
            * Renders the provided renderables onto the renderOnto canvas.  Returns the canvas that was rendered onto.
            * @param renderables Array of items that are to be rendered.
            */
            function (renderables) {
                // Check if our visible canvas has changed size
                if(this._BufferCanvas.width !== this._visibleCanvas.width || this._BufferCanvas.height !== this._visibleCanvas.height) {
                    this.UpdateBufferSize();
                }
                // Push buffer to screen
                this._visibleContext.clearRect(0, 0, this._visibleCanvas.width, this._visibleCanvas.height);
                this._visibleContext.drawImage(this._BufferCanvas, 0, 0);
                // Clear our buffer to prepare it for new drawings
                this._ClearBuffer();
                // Sort the renderables by the ZIndex so we draw in the correct order (for layering);
                renderables.sort(Renderer2d._zindexSort);
                // We do not save or restore the canvas state because we want to let the
                // dev decide how they manipulate the canvas
                for(var i = 0; i < renderables.length; i++) {
                    renderables[i].Draw(this._BufferContext);
                }
                return this._BufferContext;
            };
            Renderer2d.prototype.Dispose = /**
            * Destroys the visible canvas.
            */
            function () {
                if(!this._disposed) {
                    this._disposed = true;
                    this._visibleCanvas.parentNode.removeChild(this._visibleCanvas);
                }
            };
            Renderer2d.prototype._ClearBuffer = function () {
                this._BufferContext.clearRect(0, 0, this._BufferCanvas.width, this._BufferCanvas.height);
            };
            Renderer2d.prototype.UpdateBufferSize = function () {
                this._BufferCanvas.width = this._visibleCanvas.width;
                this._BufferCanvas.height = this._visibleCanvas.height;
                this.OnRendererSizeChange.Trigger(new EndGate.Size2d(this._visibleCanvas.width, this._visibleCanvas.height));
            };
            return Renderer2d;
        })();
        Rendering.Renderer2d = Renderer2d;        
    })(EndGate.Rendering || (EndGate.Rendering = {}));
    var Rendering = EndGate.Rendering;
})(EndGate || (EndGate = {}));
